<?php
//引入jwt第三方类库，进行包装
namespace lib;
use firebase\JWT\JWT;
use think\Db;

class JwtTool
{
   private $key = '7C4A8D09CA3762AF61E59520943DC26494F8941B';
   // private $token = array(
   //    'uid' => 10201,
   //    'username' => 'zhangsan'
   // );

   /**
    * [enc 生成token]
    * @Author   xxx
    * @DateTime 2018-08-06T18:25:42+0800
    * @param    array                    $saveData [要额外存储的字段，如id，username等]
    * @return   [type]                             [token]
    */
   public function enc($saveData = []) {
   	  if(!is_array($saveData)) $saveData = [];

   	  $com = [
   	  	//创建时间
        "createTime"       => time(),
        //过期时间
        "expireTime"       => time() + 7200 ,
   	  ];

   	  $arr = array_merge($com,$saveData);

   	  return JWT::encode($arr,$this->key);
   }

   /**
    * [dec 解密token]
    * @Author   xxx
    * @DateTime 2018-08-06T18:26:19+0800
    * @param    string                   $str [要解密的token]
    * @return   [type]                        [解密出的原始数据]
    */
   public function dec($str = '') {
   	  if(!is_string($str)) return '无效的token，请重新登录！';

      $decoded = null;

      //先查询数据库，看有没有这条token
      $res = Db::name('tokens')->where('token',$str)->find();

      if(!$res) return '无效的token，请重新登录！';

      try {
        $decoded = JWT::decode($str, $this->key, array('HS256'));

        $decoded = (array)$decoded;

        //比较过期时间
        if(time() > $decoded['expireTime']) {
           throw new \Exception("token过期，请重新登录！", 1);
        }

      }catch(\Exception $e){
        $decoded = $e->getMessage();
      }

   	  return $decoded;
   }
}
