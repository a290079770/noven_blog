<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;
use lib\common;
use lib\jwtTool;
use lib\validJWT;

class Other extends Controller
{
	private $common = null;

	public function __construct() {
       $this->common = new Common();
    }  

    //重定向接口
    public function miss()
    { 
      $this->common->setResponse(21,'请求的接口不存在，请检查请求方式或联系后台大哥！');
    }


    //获取用户时间轴
    public function timeLine()
    { 

      //验证token
      // $tokenData = validJWT::valid();
      // if(!$tokenData) return;
      // $uid = $tokenData['uid'];
      $uid = 1;

      //获取用户所有的文章和心情
      $arcticleList = $this->getDataList('arcticles',1,$uid);
      $moodList = $this->getDataList('moods',2,$uid);
      
      //得到所有文章和心情的数组
      $combine = array_merge($arcticleList,$moodList);

      if(count($combine) == 0) {
        $this->common->setResponse(200,'ok',[]);
        return;
      }

      //对时间数组进行拍讯，采用倒序输出时间
      $sort = [];
      foreach($combine as $key=>$v){    
        $sort[] = strtotime($v['CreateTime']);    
      }

      array_multisort($sort,SORT_DESC,$combine);
      
      //设置一个空数组，保存用户的所有时间点，防止重复
      $timeArr = [];

      foreach ($combine as $k => $v) {
        array_push($timeArr, date('Y-m-d',strtotime($v['CreateTime'])));
      }
      //去重
      $timeArr = array_unique($timeArr);

      //获取到所有的年份、月份
      $year = []; 
      $month = [];

      foreach($timeArr as $key=>$v){    
         $year[] = substr($v,0,4);
         $month[] = substr($v,0,7);
      }

      $year = array_unique($year);
      $month = array_unique($month);
      
      //最终结果数组，组合年份、月份数组
      $result = [];
      foreach ($year as $k => $v) {
        //2018
        $item = [];
        $item['Year'] = $v;
        $item['Children'] = [];
        foreach ($month as $ck => $cv) {
          //2018-04
          if(strpos($cv, $v) !== false) {
            //匹配成功，如果2018-04-18 匹配到了 2018，则放入2018这个数组里
            $citem = [];
            $citem['Month'] = substr($cv,5);
            $citem['Children'] = [];
            
            foreach ($combine as $nk => $nv) {
               //2018-04-22
               if(strpos($nv['CreateTime'], $cv) !== false) {
                  array_push($citem['Children'], $nv);
               }
            }

            array_push($item['Children'],$citem);
          }
        }

        $result[] = $item;
      }

      $this->common->setResponse(200,'ok',$result);

    }
    
    /**
     * [getDataList 获取该用户的所有相关数据]
     * @Author   罗文
     * @DateTime 2018-04-22
     * @param    [string]     $table [要查询的表名]
     * @param    [int]     $type  [1 - 文章  2 - 心情]
     * @param    [int]     $uid  [用户id]
     * @return   [type]            [description]
     */
    private function getDataList($table,$type,$uid)
    { 
       $fieldStr = $type == 1 ? 'Id,Title,CreateTime,AuthorId,Author' : 'Id,Content,CreateTime,AuthorId';

       $res = Db::name($table)
              ->field($fieldStr)
              ->where('AuthorId',$uid)
              ->select();
       
       //处理结果数组，只保留Id,标题，创建时间，作者，减少字节数
       return $res;       
    }


    /**
     * [addFeedBack 意见反馈]
     * @Author   罗文
     * @DateTime 2018-04-22
     * @param    [string]     token []
     * @param    [string]     Text  [意见文本]
     * @return   [string]     ImgUrls  [意见图片链接字符串，多个链接用英文逗号隔开]
     */
    public function addFeedBack()
    { 
       //验证token
       $tokenData = validJWT::valid();
       if(!$tokenData) return;
       $uid = $tokenData['uid'];

       $post = request()->post();
       //验证必填字段      
       if(!isset($post['Text']) || !$post['Text']) {
          $this->common->setResponse(21,'意见内容不能为空');
          return;
       }

       $post['UserId'] = $uid;

       //写入数据库
       // 启动事务
       Db::startTrans();
       try{
          $res = Db::name('feedbacks')->insert($post);

          $this->common->setResponse(200,'提交成功');
          // 提交事务
          Db::commit();    
       } catch (\Exception $e) {
          $this->common->setResponse(21,'操作数据库失败！');
          // 回滚事务
          Db::rollback();
       }
    }
}
