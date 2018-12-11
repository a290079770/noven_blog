<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;
use think\Validate;

use lib\common;
use lib\jwtTool;
use lib\validJWT;

class Comment extends Controller
{
	private $common = null;

	public function __construct() {
     $this->common = new Common();
  }  

  /**
   * [getComments 获取评论列表]
   * @Author   罗文
   * @DateTime 2018-09-26
   * @neccessaryParam    
   * @neccessaryParam  [Number]  type  评论类型，0 - 全部或不传  1 - 留言  2 - 文章  
   * @possibleParam  [Number]  resourceId  要查询文章id下的所有评论  
   * @possibleParam  [String]  keywords  搜索关键字  
   * @possibleParam  [Number]  ps  每页条数  默认20 分页参数是针对顶层评论的
   * @possibleParam  [Number]  cp  当前页  分页参数是针对顶层评论的
   * 
   */
  public function getComments()
  { 
    $appCode = request()->header('appCode');
    if(!$appCode) {
      $this->common->setResponse(21,'未获取到平台信息！');
      return;
    }

    $keywords = request()->get('keywords') ? request()->get('keywords') : '';
    $type = request()->get('type') ? request()->get('type') : '';
    $resourceId = request()->get('resourceId') ? request()->get('resourceId') : '';

    //注意分页参数是针对顶层评论的
    $ps = request()->get('ps') ? request()->get('ps') : 20;
    $cp = request()->get('cp') ? request()->get('cp') : 1;

    //如果传入了resourceId，则$type直接设置为2
    if( $resourceId && $resourceId != -1 ) $type = 2;

    //如果设置了$type = 2文章评论，如果$appCode != 4，则必须要设置resourceId
    if( $type == 2 && $appCode != 4 && !$resourceId) {
      $this->common->setResponse(21,'未获取到要查询的文章id');
      return;
    }

    //如果appCode不为4 - admin端，则不允许同时获取留言和文章评论，且不能获取已隐藏的评论
    if($appCode != 4 ) {
      if(!$type || $type <= 0) {
        $this->common->setResponse(21,'未设置要查询的类型');
        return;
      }
    }

    $arr = [
      'Content|NickName'=> ['like','%'.$keywords.'%'],
    ];

    //其他查询条件
    if($type) $arr['Type'] = $type;
    if($resourceId) $arr['ResourceId'] = $resourceId;
    if($appCode != 4) $arr['IsShow'] = 1;

    //查询符合条件的顶层评论
    $comments = Db::name('comments')
    ->where($arr)
    ->where('Pid',0)
    ->page($cp,$ps)
    ->order('CreateTime','desc')
    ->select(); 

    //统计数，用作分页
    $count = Db::name('comments')
    ->where($arr)
    ->where('Pid',0)
    ->count(); 
    
    //统计所有评论总数，用作显示
    //注意，传入了resourceId，且不是-1，则是在统计这个文章下的所有评论
    //否则是查所有留言
    $totalQuery = [
      'type' => $type
    ];
    if( $resourceId && $resourceId != -1 ) $totalQuery['ResourceId'] = $resourceId;
    $totalCount = Db::name('comments')
    ->where($totalQuery)
    ->count();

    //同时查询这些顶层评论每一条的子评论
    foreach ($comments as $k => $v) {
      $children = Db::name('comments')
      ->where('Pid',$v['Id'])
      ->order('CreateTime','asc')
      ->select(); 

      $comments[$k]['Children'] = $children;
    }
    

    $this->common->setResponse(200,'ok',['list'=> $comments , 'recordCount' => $count , 'totalCount' => $totalCount],$count);
  }


  /**
   * [createComment 新增一条评论]
   * @Author   罗文
   * @DateTime 2018-09-26
   * @neccessaryParam [String]  content  评论内容  
   * @neccessaryParam [Number]  type  1 - 留言  2 - 文章  
   * @neccessaryParam [Number]  pid  0 - 第一层级   2 - 对应的父级id  
   * @neccessaryParam  [Number]  resourceId  对应的资源id  留言传 - 1 
   */
  public function createComment()
  {
    //验证登录
    $tokenData = validJWT::valid();
    if(!$tokenData) return;
    $uid = $tokenData['uid'];

    //查询用户信息
    $userInfo = Db::name('users')
    ->where('Id',$uid)
    ->find();

    if(!$userInfo) {
      $this->common->setResponse(21,'未查询到作者相关信息！');
      return;
    }

    //验证字段
    if(!$this->validateData()) return;

    //如果传入了resourceId，必须验证文章是否存在，是否下架
    if(request()->post('resourceId') && request()->post('resourceId') != -1) {
      $ArticleId = request()->post('resourceId');

      //查询文章信息
      $arcInfo = Db::name('arcticles')
      ->where('Id',$ArticleId)
      ->find();

      if(!$arcInfo) {
        $this->common->setResponse(21,'未查询到文章相关信息！');
        return;
      }

      if($arcInfo['IsUpShelf'] != 1) {
        $this->common->setResponse(21,'该文章已下架，不能评论！');
        return;
      }
    }


    //验证通过，组装数据
    $comment = [
      'Content' => request()->post('content'),
      'Type' => request()->post('type'),
      'Pid' => request()->post('pid'),
      'ResourceId' => request()->post('resourceId'),
      'NickName' => $userInfo['NickName'],
      'AuthorId' => $uid,
      'CoverUrl' => $userInfo['CoverUrl'],
      'ReplyNickName' => request()->post('replyNickName'),
      'IsShow' => 1,
      'CreateTime' => date('Y-m-d H:i:s',time()),
    ];

    //开始新增
    // 启动事务
    Db::startTrans();
    try{
      $res = Db::name('comments')->insert($comment);

      if($res == 1) {
       $commentId = Db::name('arcticles')->getLastInsID();
       $this->common->setResponse(200,'新增成功！',$commentId);
      }else {
       $this->common->setResponse(21,'新增失败！');
       Db::rollback();
       return;
      }
      // 提交事务
      Db::commit();  
    } catch (\Exception $e) {
      echo $e->getMessage();
      $this->common->setResponse(21,'操作数据库失败！');
      // 回滚事务
      Db::rollback();
    }
  }


  //验证必须的数据是否传入
  private function validateData() 
  {    
      
      $rule = [
          'content'  => 'require',
          'type'  => 'require|in:1,2',
          'pid' => 'require|>=:0',
      ];

      $msg = [
          'content.require' => '评论内容不能为空',
          'type.require' => '未设置评论类型',
          'type.in'     => '评论类型只能是1 - 留言  2 - 文章 ',
          'pid'   => '未设置评论层级',
          'pid.>='   => '评论层级必须大于0'
      ];

      $validate = new Validate($rule, $msg);
      $result   = $validate->check(request()->post());

      if(!$result){
        $this->common->setResponse(21,$validate->getError());
        return false;
      }else {
        //这里是额外验证信息
        //还需要验证content全为空字符串的情况
        if(str_replace(' ', '', request()->post('content')) == '') {
          $this->common->setResponse(21,'评论内容不能为空！');
          return false;
        }

        //验证pid不为0的情况下，必须是当前已有的评论
        //查询评论信息
        $pid = request()->post('pid');
        if($pid !== '0') {
          //如果pid不为0，则必须有replyNickName字段
          $replyNickName = request()->post('replyNickName');
          if(!$replyNickName || str_replace(' ', '', request()->post('content')) == '') {
            $this->common->setResponse(21,'未设置被回复人的昵称！');
            return;         
          }

          //验证父评论是否存在
          $commentInfo = Db::name('comments')
          ->where('Id',request()->post('pid'))
          ->find();

          if(!$commentInfo) {
            $this->common->setResponse(21,'未找到要回复的评论！');
            return;
          }
        }

        //如果传入了resourceId，但是设置的type为1，必须报错
        if(request()->post('resourceId') && request()->post('resourceId') != -1 && request()->post('type') != 2) {
          $this->common->setResponse(21,'资源id与评论类型不匹配！');
          return false;
        }

        
      }

      return true;
  }
}
