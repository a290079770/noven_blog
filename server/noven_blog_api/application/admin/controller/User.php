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

class User extends Controller
{
    private $common = null;
    private $jwt = null;
    private $error = 21;
    private $success = 200;

    private $validate = null;

    public function __construct() {
       $this->common = new Common();
       $this->jwt = new JwtTool();
    }
    //用户登录 - 前台
    public function login()
    {  
       //验证是否是第三方登录，如果是，走第三方登录流程
       if(request()->post('Code')) {
         $this->thirdPartyLogin();
         return;
       }

       //验证请求方式和账号密码不能为空
       if(!$this->validateAccount()) return;

       //匹配账号密码
       $arr = Db::name('users')->where('Account',request()->post('Account'))->find();

       if(!$arr) {
         $this->common->setResponse(21,'您还未注册！');
       }
       else if($arr['Status'] == 2) {
         $this->common->setResponse(21,'您的账号已被锁定，请联系管理人员！');
       }
       else if(request()->post('Password') !== $arr['Password']) {
         $this->common->setResponse(21,'账号或密码错误！');
       }else {
       	 $token = $this->updateToken($arr);

         if($token) $this->common->setResponse(200,'登录成功',['token'=>$token]);
       }
    }


    /**
     * [thirdPartyLogin 第三方登录，目前主要针对微信第三方的openId]
     * @return [type] [description]
     */
    public function thirdPartyLogin() {
      $code = request()->post('Code');
      $appId = 'wx0933eb006a76d4a5';
      $secret = 'a51ec5e2f71f5fc4b6441cfbd1d17b91';

      $url = 'https://api.weixin.qq.com/sns/jscode2session?appid='.$appId.'&secret='.$secret.'&js_code='.$code.'&grant_type=authorization_code';

      $res = file_get_contents($url);
      $res = json_decode($res);
      $openId = $res->openid;

      //获取到openId,查询数据库是否有该用户
      $arr = Db::name('users')->where('OpenId',$openId)->find();

      if(!$arr) {
         //如果没有，则需要新建一个用户
         //生成随机账号
         $account = $this->randomStr(16);

         Db::startTrans();
         try{
           $res = Db::name('users')->insert([
             'OpenId'=> $openId,
             'Account' => $account,
             'Password' =>'7C4A8D09CA3762AF61E59520943DC26494F8941B',   //123456的sha1加密
             'LastTime' => '',
             'LastIp' => '',
             'ThisTime' => date('Y-m-d H:i:s',time()),
             'ThisIp' => request()->ip(),
             'CreateTime' => date('Y-m-d H:i:s',time())
           ]);

           $userId = Db::name('users')->getLastInsID();

           //生成一个token
           $token = $this->jwt->enc(['uid' => $userId]);
           Db::name('tokens')->insert(['uid' => $userId,'token'=> $token]);

           $this->common->setResponse(200,'登录成功',['token' => $token , 'isExist' =>false]);

           // 提交事务
           Db::commit(); 
         } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->common->setResponse(21,'操作数据库失败！');
          }
       }
       else if($arr['Status'] == 2) {
         $this->common->setResponse(21,'您的账号已被锁定，请联系管理人员！');
         return;
       }else {
         unset($arr['Password']);
         //返回数据
         //生成一个token
         $token = $this->jwt->enc(['uid' => $arr['Id']]);

         //写入token到数据库
         //先查询是否有这个uid的token，如果有则更新，无则新增
         $searchRes = Db::name('tokens')->where('uid',$arr['Id'])->find();

         // 启动事务
          Db::startTrans();
          try{
             if(!$searchRes) {
                //新增
                Db::name('tokens')->insert(['uid' => $arr['Id'],'token'=> $token]);
             }else {
                //验证是否已经过期,如果是才更新，否则不更新
                $tokenData = $this->jwt->decPure($searchRes['token']);

                //不能解密或解密出的过期时间比当前小（已过期），就更新
                if(!$tokenData || $tokenData['expireTime'] < time()) {
                  Db::name('tokens')->where('uid',$arr['Id'])->setField('token', $token);
                }else {
                  //未过期，不更新token
                  $token = $searchRes['token'];
                }
             }

             //设置上次和本次登录的ip
             $arr['LastTime'] = $arr['ThisTime'];
             $arr['LastIp'] = $arr['ThisIp'];
         


              $arr['ThisTime'] = date('Y-m-d H:i:s',time());
             $arr['ThisIp'] = request()->ip();

             Db::name('users')
             ->where('Id',$arr['Id'])
             ->update($arr);
             // 提交事务
             Db::commit();    
          } catch (\Exception $e) {
              // 回滚事务
              Db::rollback();
              $this->common->setResponse(21,'操作数据库失败！');
              return;
          }

         $arr['token'] = $token; 
         $arr['isExist'] = true; 
         $this->common->setResponse(200,'登录成功',$arr);
       }
    }


    //用户登录 - 后台
    public function loginAdmin()
    {  

       //验证请求方式和账号密码不能为空
       if(!$this->validateAccount()) return;

       //匹配账号密码
       $arr = Db::name('users')->where('Account',request()->post('Account'))->find();

       if(!$arr) {
         $this->common->setResponse(21,'您还未注册！');
       }
       else if($arr['Status'] == 2) {
         $this->common->setResponse(21,'您的账号已被锁定，请联系管理人员！');
       }
       else if(request()->post('Password') !== $arr['Password']) {
         $this->common->setResponse(21,'账号或密码错误！');
       }
       else if( $arr['UserType'] < 2) {
         $this->common->setResponse(21,'您的权限不足！');
       }else {
         //更新token
         $token = $this->updateToken($arr);

         if($token) $this->common->setResponse(200,'登录成功',['token'=>$token]);
       }
    }

    //登录时的token更新函数
    //$arr 当前登录用户
    private function updateToken($arr) {
       unset($arr['Password']);
       //返回数据
       
       //生成一个token
       $token = $this->jwt->enc(['uid' => $arr['Id']]);

       //写入token到数据库
       //先查询是否有这个uid的token，如果有则更新，无则新增
       $searchRes = Db::name('tokens')->where('uid',$arr['Id'])->find();

       // 启动事务
        Db::startTrans();
        try{
           if(!$searchRes) {
              //新增
              Db::name('tokens')->insert(['uid' => $arr['Id'],'token'=> $token]);
           }else {
              //验证是否已经过期,如果是才更新，否则不更新
              $tokenData = $this->jwt->decPure($searchRes['token']);

              //不能解密或解密出的过期时间比当前小（已过期），就更新
              if(!$tokenData || $tokenData['expireTime'] < time()) {
                Db::name('tokens')->where('uid',$arr['Id'])->setField('token', $token);
              }else {
                //未过期，不更新token
                $token = $searchRes['token'];
              }
           }

           //设置上次和本次登录的ip
           $arr['LastTime'] = $arr['ThisTime'];
           $arr['LastIp'] = $arr['ThisIp'];
           $arr['ThisTime'] = date('Y-m-d H:i:s',time());
           $arr['ThisIp'] = request()->ip();

           Db::name('users')
           ->where('Id',$arr['Id'])
           ->update($arr);
           // 提交事务
           Db::commit();    
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->common->setResponse(21,'操作数据库失败！');
            return false;
        }

        return $token;
    }


    //用户注册
    public function reg()
    {
      //验证请求方式和账号密码不能为空
      if(!$this->validateAccount()) return;

      //验证账号是否注册
      $arr = Db::name('users')->where('Account',request()->post('Account'))->find();
      if(count($arr) !== 0) {
         $this->common->setResponse(21,'该账号已注册，请直接登录！');
         return;
      }

      // 启动事务
      Db::startTrans();
      try{
          //验证通过，存数据库
          $res = Db::name('users')->insert(request()->post());

          if($res == 1) {
             $userId = Db::name('users')->getLastInsID();
             $this->common->setResponse(200,'注册成功！',$userId);
          }else {
             $this->common->setResponse(21,'注册失败！');
          }
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          // 回滚事务
          Db::rollback();
          $this->common->setResponse(21,'操作数据库失败！');
      }
    }

    //获取用户列表
    public function userList()
    {
        $this->getUserList();
    }

    //获取今日登陆用户列表
    public function activeUserList()
    {    
        $this->getUserList(true);
    }

    /**
     * [detail 获取用户列表]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @param [Boolean] isGetActive 是否是获取活跃用户
     * @return   [type]     [description]
     */
    private function getUserList($isGetActive = false) {
       //操作权限验证
       $authValid = authValid::valid();
        if(!$authValid) return;

        $keywords = request()->get('keywords') ? request()->get('keywords') : '';
        $timeQuery = $isGetActive ? [
          'ThisTime','today',null
        ]:null;

        $res = $this->common->getDataList('users',[
          'Account|NickName'  =>  ['like','%'.$keywords.'%'],
        ],[true,'Password'],$timeQuery);

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }  

    /**
     * [detail 获取用户详情]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function detail()
    {
      $tokenData = validJWT::valid();
      if(!$tokenData) return;
      $uid = $tokenData['uid'];
      $findId = $uid;
      //如果有Id,则需要验证权限，如果没有，则取token里的id
      $searchId = request()->get('Id');

      if($searchId && $searchId != $uid ) {
         //此时是去查询别人的详情，需要验证权限
         $authValid = authValid::valid();
         if(!$authValid) return;

         $findId = $searchId;
      }

      $res = Db::name('users')
          ->where('Id',$findId)
          ->select();

      if(count($res) === 0) {
         $this->common->setResponse(21,'未获取到用户详情！');
      }else {
         //获取到了用户的基本信息，还需要获取用户标签信息
         $userInfo = $res[0];

         // $tagList = Db::name('tags')
         //  ->where('UserId',request()->get('Id'))
         //  ->select();

         // $userInfo['TagList'] = $tagList;
         $this->common->setResponse(200,'ok',$userInfo);
      }    
    }


    /**
     * [updateUserInfo 修改用户信息]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function updateUserInfo()
    {
      //验证token
      $tokenData = validJWT::valid();
      if(!$tokenData) return;

      $uid = $tokenData['uid'];

      //获取userInfo
      $userInfo = request()->post('userInfo/a');

      if( !$userInfo ) {
        $this->common->setResponse(21,'要更新的数据为空！'); 
        return;
      }
      //更新用户数据
      // 启动事务
      Db::startTrans();
      try{
          //验证通过，存数据库
          $res = Db::name('users')
                 ->where('Id',$uid)
                 ->update($userInfo);
          if($res > 0) {
             //业务需要，重新返回用户详情
             $arr = Db::name('users')
              ->where('Id',$uid)
              ->find();

             //修改该用户所有文章的作者名称
             Db::name('arcticles')
              ->where('AuthorId',$uid)
              ->setField('Author',$userInfo['NickName']);
              
             $this->common->setResponse(200,'修改成功！',$arr);
          }else {
             $this->common->setResponse(21,'未修改任何数据');
             Db::rollback();
             return; 
          }
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          // 回滚事务
          Db::rollback();
          $this->common->setResponse(21,$e->getMessage());
          return;
      }

    }


    /**
     * [createOrUpdate 新增或修改管理员]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function createOrUpdate() 
    {
      //验证请求方式和账号密码不能为空，账号只能为账号
      if(!$this->validateAccount()) return;

      //验证昵称
      $va = new Validate($this->NickName);

      if(!request()->post('NickName')) {
         $this->common->setResponse(21,'昵称不能为空！');
         return;
      }
      if(!$va->check(request()->post())) {
          $this->common->setResponse(21,'昵称不能含有非法字符！');
          return;
      }

      $user = request()->post();

      $user['CreateTime'] =  date('Y-m-d H:i:s',time());
      // 启动事务
      Db::startTrans();
      try{
          $res = Db::name('users')->insert($user);

          if($res == 1) {
             $userId = Db::name('users')->getLastInsID();
             $this->common->setResponse(200,'新增管理员成功！',$userId);
          }else {
             $this->common->setResponse(21,'新增管理员失败！');
          }
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          // 回滚事务
          $this->common->setResponse(200,'操作数据库失败！');
          Db::rollback();
      }

      //添加其他数据，CreateTime status  UserType  LastTime LastIp  ThisTime  ThisIp
      // $pre = array(
      //    'CreateTime'=>date('Y-m-d H:i:s',time()),
      //    'Status'=>1,
      //    'UserType'=>1,
      //    'LastTime'=>'',
      //    'LastIp'=>'',
      //    'ThisTime'=>'',
      //    'ThisIp'=>''
      // );

    }

    //验证旧密码
    public function validOldPwd() 
    {
      if(request()->isGet()) {
        $this->common->setResponse(21,'请求方式错误！');
        return;
      }

      // 验证id
      if(!request()->post('userId')) {
        $this->common->setResponse(21,'用户编号不能为空！');
        return;
      }

      //验证旧密码是否传入
      if(!request()->post('oldPwd')) {
        $this->common->setResponse(21,'原始密码不能为空！');
        return;
      }

      $arr = Db::name('users')->where('id',request()->post('userId'))->select();

      //对比数据库
      if(!$arr) {
        $this->common->setResponse(21,'未获取到用户信息！');
      }else if($arr[0]['Password'] !== request()->post('oldPwd')){
        $this->common->setResponse(21,'原始密码错误！');
      }else {
        $this->common->setResponse(200,'ok');
      }
    }

    //修改密码
    public function updatePwd()
    {
      //操作权限验证
      $authValid = authValid::valid();
      if(!$authValid) return;
      
      //验证id
      if(!request()->post('Id')) {
        $this->common->setResponse(21,'用户编号不能为空！');
        return;
      }

      //验证新密码是否传入
      if(!request()->post('Password')) {
        $this->common->setResponse(21,'新密码不能为空！');
        return;
      }

      $arr = Db::name('users')->where('Id',request()->post('Id'))->select();

      //对比数据库
      if(!$arr) {
        $this->common->setResponse(21,'未获取到用户信息，修改失败！');
      }

      // 启动事务
      Db::startTrans();
      try{
          Db::name('users')
          ->where('Id',request()->post('Id'))
          ->update(['Password'=>request()->post('Password')]);

          // else if($arr[0]['Password'] == request()->post('Password')){
          //   $this->common->setResponse(21,'新密码不能与旧密码一致');

          // }
          // else if(Db::name('users')->where('Id',request()->post('Id'))->update(['Password'=>request()->post('Password')]) == 0){
          //   $this->common->setResponse(21,'修改密码失败！');
          // }else {
            $this->common->setResponse(200,'修改成功！');
          // };
          // 提交事务
          Db::commit();    
      } catch (\Exception $e) {
          // 回滚事务
          $this->common->setResponse(200,'操作数据库失败！');
          Db::rollback();
      }
    }


    //冻结、解锁用户
    public function lockUser()
    {
      //操作权限验证
      $authValid = authValid::valid();
      if(!$authValid) return;

      //验证id
      if(!request()->post('Id')) {
        $this->common->setResponse(21,'用户编号不能为空！');
        return;
      }

      //验证Status状态
      if(!request()->post('Status')) {
        $this->common->setResponse(21,'要修改的用户状态不能为空！');
        return;
      }

      // 启动事务
      Db::startTrans();
      try{
          //修改用户的status
          $res = Db::name('users')
          ->where('Id',request()->post('Id'))
          ->update(['Status' => request()->post('Status')]);

          if($res === 1) {
             $this->common->setResponse(200,'操作成功！');
          }else {
             $this->common->setResponse(21,'操作失败！');
          }
          // 提交事务
          Db::commit();
      } catch (\Exception $e) {
          // 回滚事务
          $this->common->setResponse(21,'操作数据库失败！');
          Db::rollback();
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
       $this->common->delete('users');
    }

    //验证账号和密码是否传入
    private function validateAccount()
    {
        //必须post访问
        if(request()->isGet()) {
          $this->common->setResponse(21,'请求方式错误！');
          return false;
        }

        $rule = [
            'Account'  => 'require|length:4,20|alphaDash',
            'Password'  => 'require|length:6,64',
            'NickName'  => 'length:1,20|chsDash',
            'Age' => 'number|between:18,80',
            'Sex' => 'in:男,女,保密',
        ];

        $msg = [
            'Account.require' => '账号或密码不能为空！',
            'Account.length'     => '账号长度只能在4-20个字符之间',
            'Account.alphaDash'   => '账号只能是数字、字母、下划线_及破折号-',
            'Password.require'   => '账号或密码不能为空！',
            'Password.length'   => '账号长度只能在6-64个字符之间',
            'NickName.length'   => '昵称长度只能在1-20个字符之间',
            'NickName.chsDash'   => '昵称只能是汉字、字母、数字和下划线_及破折号-',
            'Age.number'   => '年龄只能为数字',
            'Age.between'   => '年龄只能为18-80之间的数字',
            'Sex.in'   => '性别只能是男、女或保密',
        ];

        $validate = new Validate($rule, $msg);
        $result   = $validate->check(request()->post());

        if(!$result){
          $this->common->setResponse(21,$validate->getError());
          return false;
        };

        // if(!preg_match('/^1[34578]\d{9}$/', request()->post('Account'))  ) {
        //    //验证账号
        //    $this->common->setResponse(21,'请输入正确的账号');
        //    return false;
        // }

        return true;
    }

     /**
     * [getSliceStr 生成指定长度随机字符串]
     * @Author   罗文
     * @DateTime 2018-09-30
     * @param    {[Number]}   len [指定长度]
     * @return   {[type]}   [description]
     */
    public function randomStr($len) {
      $preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$';
      $str = '';

      for($i = 0 ; $i < $len ; $i ++) {
         $random = rand(0,64);
         $str .= $preinstallStr[$random];
      }

      //查询是否有这个账号
      $find = Db::name('users')->where('Account',$str)->find();

      if($find) $this->randomStr($len);

      return $str;
    }

     
     //返回数据
    private function setResponse($code,$description,$data='',$recordCount=0) 
    {
        $res = array();
        switch ($code) {
            case 21:
                $res = array(
                   'code'=>$code,
                   'success'=>false,
                   'description'=>$description
                );
                break;
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
                # code...
                break;
        }

        print_r(json_encode($res,JSON_UNESCAPED_UNICODE ));
    }

}