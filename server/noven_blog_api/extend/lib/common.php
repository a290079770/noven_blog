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
     * @param    [array]     $field     [要取出的字段]
     * @param    array     $query  [要查询的数组，注意是and查询]
     * @param    integer    $cp        [当前第几页]
     * @param    integer    $ps        [每页多少条]
     * @param    string     $orderCol   [排序的列，newest - CreateTime  hot - ReadCount  choose - CollectCount]
     * @param    string     $order      [排序方式]
     * @return   [Boolean]                [description]
     */
    public function getDataList($table,$query = array(),$field=array(),$timeQuery=array('CreateTime','>=','1970-10-1'),$cp = 1,$ps = 20,$orderCol= "Id" , $order = "desc") 
    {

        if(!$table) return false;

        $cp = request()->get('cp') ? request()->get('cp') : 1;
        $ps = request()->get('ps') ? request()->get('ps') : 20;
        $orderCol = request()->get('order') ? request()->get('order') : 'Id';
        if(!in_array($orderCol, ['Id','CreateTime','ReadCount','CollectCount'])) {
          // $this->setResponse(21,'要order的有效值是CreateTime、ReadCount、CollectCount');
          return false;
        }

        //如果传入个null，就需要处理
        $timeQuery = isset($timeQuery) ? $timeQuery : array('CreateTime','>=','1970-10-1');

        //处理时间范围查询,解构数组
        list($timeFields,$timeCondition,$timeArea) = $timeQuery;

        list($isRuledOut) = $field;

        if(is_bool( $isRuledOut)) {
          //如果数组的第一项是布尔值，则说明是用来确定是剔除指定列的，此时需要删除第一项
          array_shift($field);
        }else {
          $isRuledOut = false;
        }

        $arr = Db::name($table)
               ->field($field,$isRuledOut)
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

        $this->setResponse(200,'ok',['list'=> $arr , 'recordCount' => $count],$count);

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
        return false;
      }

      //验证id
      if(!request()->post('Id')) {
        $this->setResponse(21,'要删除的编号不能为空！');
        return false;
      }

      //验证token
      $tokenData = validJWT::valid();
      if(!$tokenData) return false;
      //获取用户id，且必须是该用户所写的文章才能删除，管理员除外
      $uid = $tokenData['uid'];
      //获取用户信息,主要获取角色信息
      $userInfo = Db::name('users')
          ->where('Id',$uid)
          ->find();

      //查找该文章
      $find = Db::name($table)
          ->where('Id',request()->post('Id'))
          ->find(); 

      if($find) {
        //验证作者id
        if($uid != $find['AuthorId'] && $userInfo['UserType'] == 1) {
          $this->setResponse(21,'您无权删除该文章！');
          return false;
        }
      }else {
        $this->setResponse(21,'未获取到要删除的资源');
        return false;
      }    
          
      //安全验证通过，执行删除   
      // 启动事务
      Db::startTrans();
      try{
          $res = Db::name($table)
          ->where('Id',request()->post('Id'))
          ->delete();

          if($res < 1) {
            $this->setResponse(21,'删除失败！');
            Db::rollback();
            return false;
          }

          // 提交事务
          Db::commit();
          return true;
      } catch (\Exception $e) {
          $this->setResponse(21,'删除失败！');
          // 回滚事务
          Db::rollback();

          return false;
      }
    }


    /**
     * [collect 收藏资源]
     * @param  [Number] $id   [资源id]
     * @param  [Number] $type [1 - 文章  2 - 心情 ]
     * @param  [Boolean] isCollect [true - 收藏  false - 取消收藏]
     * @return [type]       [description]
     */
    public function collect($id,$type = 1,$isCollect) 
    {
      //获取用户uid
      //验证token
      $tokenData = validJWT::valid();

      if(!$tokenData) return false;
      $uid = $tokenData['uid'];
      $arr = Db::name('collections')
            ->where('CollectionId', $id)
            ->where('UserId',$uid)
            ->where('CollectionType',$type)
            ->select();

      $dataArr = Db::name('arcticles')
                ->where('Id', $id)
                ->select();   
      if(count($dataArr) < 1) {
         $this->setResponse(21,'未找到要收藏的资源！');
         return;
      }

      $resData = $dataArr[0];        

      //判断是新增还是移除      
      if(!$isCollect) {
         //移除
         if(count($arr) > 0) {
            Db::startTrans();
            try{
                $number = Db::name('collections')
                ->where('CollectionId', $id)
                ->where('UserId',$uid)
                ->where('CollectionType',$type)
                ->delete();

                if( $number < 1) {
                  $this->setResponse(21,'取消收藏失败！');
                  Db::rollback();
                  return;
                }

                //该资源收藏量减1
                $count = Db::name('arcticles')
                ->where('Id', $id)
                ->setDec('CollectCount');

                if($count < 1) {
                  $this->setResponse(21,'修改收藏量失败！');
                  Db::rollback();
                  return;
                }

                $resData['HasCollect'] = false;
                $resData['CollectCount'] --;
                $this->setResponse(200,'取消收藏成功！',$resData);
                // 提交事务
                Db::commit();    
            } catch (\Exception $e) {
                $this->setResponse(21,'操作数据库失败！');
                // 回滚事务
                Db::rollback();
            }
            
         } else {
           $this->setResponse(21,'您还未收藏过该资源！');
         }
         return;
      }      


      //新增
      if(count($arr) > 0) {
        //已经收藏过该资源
        $typeName = $type == 1 ? '文章' : '心情';
        $this->setResponse(21,'您已经收藏过该'.$typeName);  
      }else {
        //添加收藏
        Db::startTrans();
        try{
            $res = Db::name('collections')
                   ->insert([ 
                     'CollectionId' => $id,
                     'UserId' => $uid,
                     'CollectionType' => $type,
                     'CreateTime' => date('Y-m-d H:i:s',time()),
                   ]);

            //该资源收藏量加1
            $count = Db::name('arcticles')
            ->where('Id', $id)
            ->setInc('CollectCount');

            if($count < 1) {
              $this->setResponse(21,'修改收藏量失败！');
              Db::rollback();
              return;
            }

            $resData['HasCollect'] = true;       
            $resData['CollectCount'] ++;       
            $this->setResponse(200,'收藏成功！',$resData);
            // 提交事务
            Db::commit();    
        } catch (\Exception $e) {
            $this->setResponse(21,'操作数据库失败！');
            // 回滚事务
            Db::rollback();
        }
      }
    }


    /**
     * [getCollectList 获取用户收藏资源]
     * @param  [Number] $type [0 - 全部 1 - 文章  2 - 心情 ]
     * @return [type]       [description]
     */
    public function getCollectList($type = 0) 
    {
      //获取用户uid
      //验证token
      $tokenData = validJWT::valid();

      if(!$tokenData) return false;
      $uid = $tokenData['uid'];

      $cp = request()->get('cp') ? request()->get('cp') : 1;
      $ps = request()->get('ps') ? request()->get('ps') : 20;

      $arr = Db::name('collections')
             ->where('userId',$uid)
             ->where('CollectionType',$type)
             ->order('CreateTime','desc')
             ->page($cp,$ps)
             ->select();  

      $count = Db::name('collections')
             ->where('userId',$uid)
             ->where('CollectionType',$type)
             ->order('CreateTime','desc')
             ->count();      


      //注意这是获取到了所有收藏资源的id，需要收集这些id，去查询真正的资源详情
      $collectionIds = [];
      foreach ($arr as $key => $value) {
        array_push($collectionIds, $value['CollectionId']);
      };  

      //查询真正的资源集合
      $resourceList = Db::name('arcticles')
             ->where('Id','in',$collectionIds)
             ->select();

      //数据库对in表达式，不是按照id顺序依次返回，需要手动排序
      $sort = [];
      for( $i = 0 ; $i < count($collectionIds) ; $i ++) {
         for( $j = 0 ; $j < count($resourceList) ; $j ++) {
           if($resourceList[$j]['Id'] == $collectionIds[$i]) {
             array_push($sort,$resourceList[$j]);
             break;
           }
         }
      }

      $this->setResponse(200,'ok',['list'=>$sort, 'recordCount' => $count],$count);       
    }
}

?>