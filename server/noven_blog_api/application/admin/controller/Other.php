<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;
use lib\common;

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
      if(!request()->get('Id')) {
        $this->common->setResponse(21,'缺少用户Id');
        return false;
      }

      //获取用户所有的文章和心情
      $arcticleList = $this->getDataList('arcticles',1);
      $moodList = $this->getDataList('moods',2);
      
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
     * @return   [type]            [description]
     */
    private function getDataList($table,$type)
    { 
       $fieldStr = $type == 1 ? 'Id,Title,CreateTime,AuthorId' : 'Id,Content,CreateTime,AuthorId';

       $res = Db::name($table)
              ->field($fieldStr)
              ->where('AuthorId',request()->get('Id'))
              ->select();
       
       //处理结果数组，只保留Id,标题，创建时间，作者，减少字节数
       return $res;       
    }
}
