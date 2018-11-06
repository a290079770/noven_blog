<?php
/**
 * 系统权限验证类
 */
namespace lib;
use think\request;
use think\Db;

use lib\jwtTool;
use lib\common;

class authValid
{  
   //暂时规则 - appCode 为4 为admin，需要userType > 1
   public static function valid() {
      // $appCode = request()->header('appCode') ? request()->header('appCode') : request()->post('appCode');
      $common = new Common();

      //如果token为空，则返回false
      // if(!$appCode || empty($appCode)) {
      //    $common->setResponse(21,'appCode为空！');
      //    return false;
      // }

      //验证token,获取到userId
      $tokenData = validJWT::valid();
      if(!$tokenData) return false;

      $uid = $tokenData['uid'];

      //根据userId获取用户信息，主要是userType,如果大于1，则可以操作任意平台，否则需要验证appCode
      $userInfo = Db::name('users')
              ->where('Id',$uid)
              ->find();

      //暂时只验证userType
      if($userInfo['UserType'] < 2) {
         $common->setResponse(21,'您无权进行此操作！');
         return false;
      }
      return $userInfo['UserType'] ;        

      // if($userInfo['UserType'] > 1) return true;

      //获取appCode
      // $platFormInfo = Db::name('appcode')
      //         ->where('AppCode',$appCode)
      //         ->find();

      // if(!$platFormInfo) {
      //    $common->setResponse(21,'appCode错误！');
      //    return false;
      // }

      // if($platFormInfo['PlatForm'] == 'admin') {
      //    $common->setResponse(21,'您无权进行此操作');
      //    return false;
      // }    

      // return true;
   }
}
