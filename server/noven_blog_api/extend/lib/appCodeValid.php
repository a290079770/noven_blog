<?php
/**
 * 系统权限验证类
 */
namespace lib;
use think\request;
use think\Db;

use lib\common;

class appCodeValid
{  
   //暂时规则 - appCode  1 - PC   2-H5   3- 小程序   4 - admin
   //$arcAppCode 验证文章的AppCode是否在数据库中
   public static function valid($arcAppCode = '') {
      $str = $arcAppCode ? '文章' : '';

      $appCode = $arcAppCode ? $arcAppCode : request()->header('appCode');
      $common = new Common(); 
      if( strlen(+ $appCode) != strlen($appCode)) {
        $common->setResponse(21, $str.'appCode不合法！');
        return false;
      }

      if(!$appCode) {
        $common->setResponse(21, $str.'appCode不能为空！');
        return false;
      }

      //验证合法
      $appCodeList = Db::name('appcode')
                     ->where('AppCode',$appCode) 
                     ->select();

      if(count($appCodeList) < 1) {
         $common->setResponse(21, $str.'appCode不合法！');
         return false;
      }

      return $appCodeList[0];
   }
}
