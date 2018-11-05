<?php
/**
 * JWT初步拦截类
 */
namespace lib;
use think\request;

use lib\jwtTool;
use lib\common;

class ValidJWT
{  
   //injectToken - 外部传入的token，可以直接使用方法验证
   public static function valid($injectToken = false) {
      $token = $injectToken ? $injectToken : (request()->header('token') ? request()->header('token') : request()->post('token'));
      
      $common = new Common();

      //如果token为空，则返回false
      if(!$token || empty($token)) {
         $common->setResponse(21,'token为空！');
         return false;
      }

      //如果token不为空，则解析token
      $decToken = [];

      $jwt = new JwtTool();
      $decToken = $jwt->dec($token);
      if(is_string($decToken)) {
         //如果是现有的token来验证，则为true，告诉解密那边不提示过期
         if($injectToken) return false; 

         $decToken = $decToken == 'Signature verification failed' ? '无效的token，请重新登录！':$decToken;
         $common->setResponse(21,$decToken);
         return false;
      }else {
         return $decToken;
      }
   }
}
