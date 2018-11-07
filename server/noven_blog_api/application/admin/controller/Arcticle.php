<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use think\Validate;
use lib\common;
use lib\jwtTool;
use lib\validJWT;
use lib\authValid;

class Arcticle extends Controller
{   

  private $common = null;
	private $jwt = null;

	public function __construct() {
       $this->common = new Common();
       $this->jwt = new JwtTool();
    }

    /**
     * [arcticleList 获取文章列表]
     * @Author   罗文
     * @DateTime 2018-09-26
     * @neccessaryParam    
     * @possibleParam  [Number]  ps  每页条数  
     * @possibleParam  [Number]  cp  当前页  
     * @possibleParam  [String]  keywords  搜索关键字  
     * @possibleParam  [Number]  authorId  要查询的作者id  
     * @possibleParam  [Boolean]  isMy  是否是查当前用户  
     * @possibleParam  [Date]  startTime  搜索开始时间  
     * @possibleParam  [Date]  endTime  搜索结束时间  
     * @possibleParam  [String]  order  排序方式  精选 - CollectCount  热门 - ReadCount  
     */
    public function arcticleList()
    {
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';
        $authorId = request()->get('authorId') ? request()->get('authorId') : '';

        //如果传入了isMy，则需要计算token，优先级比authorId高
        if( request()->get('isMy') === 'true') {
          //获取用户uid
          //验证token
          $tokenData = validJWT::valid();

          if(!$tokenData) return;
          $uid = $tokenData['uid'];
          $authorId = $uid;
        }


        //时间范围筛选
        $startTime = request()->get('startTime');
        $endTime = request()->get('endTime');

        $time = null;

        if($startTime && $endTime) {
           $time = ['CreateTime','between',[$startTime,$endTime]];
        }else if($startTime && !$endTime) {
           $time = ['CreateTime','>=',$startTime];
        }

        //数组的第一项可以是布尔值，用来指定是否是剔除，true - 是
        $field = [true,'Content'];

        //如果当前有传入token，则验证该用户是否是管理员，如果是，则返回所有文章，如果不是，则只返回上架的文章
        $query = [
          'Title|Author|Brief' => ['like','%'.$keywords.'%'],
          'AuthorId' => ['like','%'.$authorId.'%'],
        ];

        $token = request()->header('token') ? request()->header('token') : request()->post('token');
        if($token) {
          //验证token
          $tokenData = $this->jwt->decPure($token);
          if(!$tokenData || $tokenData['expireTime'] < time()) {
            $query['IsUpShelf'] = 1;
          }else {
            //此时去查询下这个用户的权限，如果是管理员则可以看到所有的，包括下架了的
            $uid = $tokenData['uid'];
            $userInfo = Db::name('users')
            ->where('Id',$uid)
            ->find();

            if($userInfo['UserType'] < 2) $query['IsUpShelf'] = 1;
          }
        }else {
          $query['IsUpShelf'] = 1;
        }

        // 支持标题，简介，作者，时间范围
        $res = $this->common->getDataList('arcticles',$query,$field,$time);
        

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }


    /**
     * [activeArcticleList 获取热门文章]
     * @Author   罗文
     * @DateTime 2018-04-22
     * @return   [type]     [description]
     */
    // public function activeArcticleList()
    // {
    //     $order = request()->get('order') ? request()->get('order') : 'ReadCount';
    //     $authorId = request()->get('authorId') ? request()->get('authorId') : '';

    //     // 支持标题，简介，作者，时间范围
    //     $res = $this->common->getDataListByOrder('arcticles',[
    //         'AuthorId' => ['like','%'.$authorId.'%'],
    //       ],'Id,Title,Brief,Author,CreateTime,ReadCount,AuthorId',null,null,$order
    //     );

    //     if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    // }

    /**
     * [createOrUpdate 新增或修改文章]
     * @Author   罗文
     * @DateTime 2018-04-17
     * 'Title'  => 'require|length:1,255',
       'Author'  => 'require|length:1,20',
       'AuthorId' => 'require',
       'Content' => 'require',
     * @return   [type]     [description]
     */
    public function createOrUpdate()
    {   
       //验证token
       $tokenData = validJWT::valid();
       if(!$tokenData) return;
       $uid = $tokenData['uid'];

       //验证必填字段      
       if(!$this->validateData()) return;

       $arcticle = request()->post();

       //如果有传入Id,则是修改
       if(isset($arcticle['Id'])) {
        if($arcticle['AuthorId'] != $uid) {
          //如果不是作者本人在进行修改操作，就需要验证权限，UserType > 2
           //获取用户信息,主要获取角色信息
          $userInfo = Db::name('users')
              ->where('Id',$uid)
              ->find();

          if($userInfo['UserType'] == 1) {
            $this->common->setResponse(21,'您无权修改该文章！');
            return;
          }
        }

        // 启动事务
        Db::startTrans();
        try{
            $res = Db::name('arcticles')->where('Id',$arcticle['Id'])->update($arcticle);

           if($res == 1) {
             $this->common->setResponse(200,'修改成功！');
           }else {
             $this->common->setResponse(21,'修改失败！');
           }
            // 提交事务
            Db::commit();    
        } catch (\Exception $e) {
            $this->common->setResponse(21,'操作数据库失败！');
            // 回滚事务
            Db::rollback();
        }

       }else {
         $arcticle['CreateTime'] = date('Y-m-d H:i:s',time());
         $arcticle['ReadCount'] = 0;
         $arcticle['CollectCount'] = 0;
         $arcticle['AuthorId'] = $uid;

         // 启动事务
         Db::startTrans();
         try{
            $res = Db::name('arcticles')->insert($arcticle);

            if($res == 1) {
             $arcticleId = Db::name('arcticles')->getLastInsID();
             $this->common->setResponse(200,'新增成功！',$arcticleId);
            }else {
             $this->common->setResponse(21,'新增失败！');
            }
            // 提交事务
            Db::commit();
         } catch (\Exception $e) {
            $this->common->setResponse(21,'操作数据库失败！');
            // 回滚事务
            Db::rollback();
         }

       }
    }


    /**
     * [detail 获取文章详情]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function detail()
    {
      if(!request()->get('Id')) {
        $this->common->setResponse(21,'缺少文章Id');
        return false;
      }

      $id = request()->get('Id');

      $res = Db::name('arcticles')
          ->where('Id',$id)
          ->select();

      if(count($res) === 0) {
         $this->common->setResponse(21,'未获取到文章详情！');
      }else {
         //该文章阅读量加1
         // 启动事务
         Db::startTrans();
         try{
            $count = Db::name('arcticles')
            ->where('Id',$id)
            ->setInc('ReadCount');

            if($count < 1) {
              $this->common->setResponse(21,'修改阅读量失败！');
              Db::rollback();
              return;
            }
            // 提交事务
            Db::commit();
         } catch (\Exception $e) {
            $this->common->setResponse(21,'修改阅读量失败！');
            // 回滚事务
            Db::rollback();
         }


         //获取到了文章相关标签信息
         $arcticleInfo = $res[0];
         $arcticleInfo['HasCollect'] = false;

         // $tagList = Db::name('tags')
         //  ->where('ArcTicleId',$id)
         //  ->select();

         // $arcticleInfo['TagList'] = $tagList;

         //如果有传入token，则需要获取该用户是否已经收藏过该资源
         $token = request()->header('token') ? request()->header('token') : request()->post('token');
         if($token) {
            //验证token
            $tokenData = validJWT::valid();
            if(!$tokenData) return;
            $uid = $tokenData['uid'];
            //返回该用户是否已经收藏过
            $res = Db::name('collections')
              ->where('CollectionId',$id)
              ->where('UserId',$uid)
              ->select();

            $arcticleInfo['HasCollect'] = count($res) > 0;
         }


         $this->common->setResponse(200,'ok',$arcticleInfo);
      }    
    }


    /**
     * [delete 删除一个用户或管理员]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function delete()
    {
       $hasDelete = $this->common->delete('arcticles');

       if($hasDelete) {
         //要移除所有用户对该资源的收藏
         // 启动事务
          Db::startTrans();
          try{
              $res = Db::name('collections')
              ->where('CollectionId',request()->post('Id'))
              ->delete();

              $this->common->setResponse(200,'删除成功！');
              // 提交事务
              Db::commit();
          } catch (\Exception $e) {
              $this->common->setResponse(21,'删除收藏失败！');
              // 回滚事务
              Db::rollback();
          }   
       }
    }

    /**
     * [collect 收藏文章]
     * @param  [Number] id [要收藏的文章id]
     * @param  [Boolean] isCollect [true - 收藏  false - 取消收藏]
     * @return [type]    [description]
     */
    public function collect()
    {   
        if(!request()->post('id')) {
           $this->common->setResponse(21,'要收藏的id为空！');
           return;
        }

        $isCollect = request()->post('isCollect');

        //添加或移除收藏
        $collectId = request()->post('id');

        $this->common->collect($collectId,1,$isCollect);
    }

    /**
     * [collectList 获取用户的收藏列表]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function collectList()
    {
        $this->common->getCollectList(1);
    }

    /**
     * [upOrDownShelf 上下架文章]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @param [Number] Id [要操作的文章]
     * @param [Number] isUpShelf [是否上下架   1 - 上架   -1 - 下架]
     * @return   [type]     [description]
     */
    public function upOrDownShelf()
    {
      //操作权限验证
      $authValid = authValid::valid();
      if(!$authValid) return;

      if(!request()->post('Id')) {
         $this->common->setResponse(21,'要操作的文章Id为空！');
         return;
      }

      $isUpShelf = request()->post('isUpShelf');
      if( !$isUpShelf || !in_array($isUpShelf,[-1,1]) ) {
         $this->common->setResponse(21,'操作不合法，只能上架或者下架！');
         return;
      }

      //查一下有没有这个文章
      $find = Db::name('arcticles')
          ->where('Id',request()->post('Id'))
          ->select();
      if( count($find) < 1 ) {
         $this->common->setResponse(21,'没有这个Id对应的资源！');
         return;
      }   

      Db::startTrans();
      try{
          $res = Db::name('arcticles')
          ->where('Id',request()->post('Id'))
          ->setField('IsUpShelf',$isUpShelf);

          //如果是下架文章，则需要删除对应的所有收藏
          if($isUpShelf == -1) {
            $res = Db::name('collections')
            ->where('CollectionId',request()->post('Id'))
            ->delete();
          }

          $this->common->setResponse(200,'操作成功！');
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          $this->common->setResponse(21,'操作失败！');
          // 回滚事务
          Db::rollback();
      } 
    }


    //验证必须的数据是否传入
    private function validateData() 
    {
        //必须post访问
        if(request()->isGet()) {
          $this->common->setResponse(21,'请求方式错误！');
          return false;
        }

        $rule = [
            'Title'  => 'require|length:1,255',
            'Author'  => 'require|length:1,20',
            'Content' => 'require',
        ];

        $msg = [
            'Title.require' => '文章标题不能为空！',
            'Title.length'     => '文章标题长度只能在1-255个字符之间，一个汉字为3个字符',
            'Author.require' => '文章作者不能为空！',
            'Author.length'     => '文章作者长度只能在1-20个字符之间，一个汉字为3个字符',
            'Content.require'   => '文章内容不能为空',
        ];

        $validate = new Validate($rule, $msg);
        $result   = $validate->check(request()->post());

        if(!$result){
          $this->common->setResponse(21,$validate->getError());
          return false;
        };

        return true;
    }

}
