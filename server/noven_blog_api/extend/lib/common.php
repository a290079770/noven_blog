<?php 
namespace lib;

use think\Db;
use think\request;

class Common
{
    public function setResponse($code,$description,$data='',$recordCount=0) 
    {
        $res = array();
        switch ($code) {
            case 200:
                $res = array(
                     'code'=>$code,
                     'success'=>true,
                     'description'=>$description,
                     'data'=>$data,
                  );
                if(is_array($data)) {
                  $res['recordCount'] = $recordCount;
                }
                break;
            default:
                $res = array(
                   'code'=>$code,
                   'success'=>false,
                   'description'=>$description
                );
                break;
        }

        print_r(json_encode($res,JSON_UNESCAPED_UNICODE ));
        // print_r($res);
    }

    /**
     * [getDataList 获取数据列表]
     * @Author   罗文
     * @DateTime 2018-04-26
     * @param    [String]     $table     [要查询的表名]
     * @param    [String]     $field     [要取出的字段]
     * @param    array     $query  [要查询的数组，注意是and查询]
     * @param    integer    $cp        [当前第几页]
     * @param    integer    $ps        [每页多少条]
     * @param    string     $orderCol   [排序的列]
     * @param    string     $order      [排序方式]
     * @return   [Boolean]                [description]
     */
    public function getDataList($table,$query = array(),$field='',$timeQuery=array('CreateTime','>=','1970-10-1'),$cp = 1,$ps = 20,$orderCol= "Id" , $order = "desc") 
    {

        if(!$table) return false;

        $cp = request()->get('cp') ? request()->get('cp') : 1;
        $ps = request()->get('ps') ? request()->get('ps') : 20;
        $orderCol = request()->get('order') ? request()->get('order') : 'Id';

        //如果传入个null，就需要处理
        $timeQuery = isset($timeQuery) ? $timeQuery : array('CreateTime','>=','1970-10-1');

        //处理时间范围查询,解构数组
        list($timeFields,$timeCondition,$timeArea) = $timeQuery;

        $arr = Db::name($table)
               ->field($field)
               ->where($query)
               ->whereTime($timeFields,$timeCondition,$timeArea)
               ->order($orderCol,$order)
               ->page($cp,$ps)
               ->select();       

        //统计数
         $count = Db::name($table)
             ->where($query)
             ->whereTime($timeFields,$timeCondition,$timeArea)  
             ->count();        

        $this->setResponse(200,'ok',$arr,$count);

        return true;
    }


    /**
     * [getDataListByOrder 根据排序获取数据列表]
     * @Author   罗文
     * @DateTime 2018-04-26
     * @param    [String]     $table     [要查询的表名]
     * @param    [String]     $field     [要取出的字段]
     * @param    array     $query  [要查询的数组，注意是and查询]
     * @param    integer    $cp        [当前第几页]
     * @param    integer    $ps        [每页多少条]
     * @param    string     $orderCol   [排序的列]
     * @param    string     $order      [排序方式]
     * @return   [Boolean]                [description]
     */
    public function getDataListByOrder($table,$query = array(),$field='',$cp = 1,$ps = 20,$orderCol= "ReadCount" , $order = "desc") 
    {

        if(!$table) return false;

        $cp = request()->get('cp') ? request()->get('cp') : 1;
        $ps = request()->get('ps') ? request()->get('ps') : 20;

        $arr = Db::name($table)
               ->field($field)
               ->where($query)
               ->order($orderCol,$order)
               ->page($cp,$ps)
               ->select();       

        //统计数
         $count = Db::name($table)
             ->where($query)
             ->count();        

        $this->setResponse(200,'ok',$arr,$count);

        return true;
    }

    /**
     * [delete 删除操作]
     * @Author   罗文
     * @DateTime 2018-04-26
     * @param    [String]     $table [要操作的表名]
     * @return   [type]            [description]
     */
    public function delete($table)
    {
       if(!request()->isPost()) {
        $this->setResponse(21,'请求方式错误！');
        return;
      }

      //验证id
      if(!request()->post('Id')) {
        $this->setResponse(21,'要删除的编号不能为空！');
        return;
      }


      // 启动事务
      Db::startTrans();
      try{
          $res = Db::name($table)
          ->where('Id',request()->post('Id'))
          ->delete();

          if($res) {
            $this->setResponse(200,'删除成功！');
          }else {
            $this->setResponse(21,'删除失败！');
          }
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          $this->setResponse(21,'删除失败！');
          // 回滚事务
          Db::rollback();
      }
    }
}

?>