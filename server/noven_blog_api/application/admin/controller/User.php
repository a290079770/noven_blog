<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;
use think\Validate;

use lib\common;

class User extends Controller
{  
    private $common = null;
    private $error = 21;
    private $success = 200;

    private $validate = null;

    public function __construct() {
       $this->common = new Common();
    }  
    
    //用户登录
    public function login()
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
       }else {
       	 unset($arr['Password']);
         //返回数据
       	 $this->common->setResponse(200,'登录成功',$arr);

         //设置上次和本次登录的ip
         $arr['LastTime'] = $arr['ThisTime'];
         $arr['LastIp'] = $arr['ThisIp'];
         $arr['ThisTime'] = date('Y-m-d H:i:s',time());
         $arr['ThisIp'] = request()->ip();

         Db::name('users')
         ->where('Id',$arr['Id'])
         ->update($arr);
       }
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

      //验证通过，存数据库
      $res = Db::name('users')->insert(request()->post());

      if($res == 1) {
         $userId = Db::name('users')->getLastInsID();
         $this->common->setResponse(200,'注册成功！',$userId);
      }else {
         $this->common->setResponse(21,'注册失败！');
      }
  
    }

    //获取用户列表
    public function userList()
    {    
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';

        $res = $this->common->getDataList('users',[
          'Account|NickName'  =>  ['like','%'.$keywords.'%'],
         ]
        );

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }

    //获取今日登陆用户列表
    public function activeUserList()
    {
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';

        $res = $this->common->getDataList('users',[
          'Account|NickName'  =>  ['like','%'.$keywords.'%'],
        ],'',
        [
          'ThisTime','today',null
        ]
        );

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
      if(!request()->get('Id')) {
        $this->common->setResponse(21,'缺少用户Id');
        return false;
      }

      $res = Db::name('users')
          ->where('Id',request()->get('Id'))
          ->select();

      if(count($res) === 0) {
         $this->common->setResponse(21,'未获取到用户详情！');
      }else {
         //获取到了用户的基本信息，还需要获取用户标签信息
         $userInfo = $res[0];

         $tagList = Db::name('tags')
          ->where('UserId',request()->get('Id'))
          ->select();

         $userInfo['TagList'] = $tagList;
         $this->common->setResponse(200,'ok',$userInfo);
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

      $res = Db::name('users')->insert($user);

      if($res == 1) {
         $userId = Db::name('users')->getLastInsID();
         $this->common->setResponse(200,'新增管理员成功！',$userId);
      }else {
         $this->common->setResponse(21,'新增管理员失败！');
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
      if(!request()->isPost()) {
        $this->common->setResponse(21,'请求方式错误！');
        return;
      }

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
      // }
    }


    //冻结、解锁用户
    public function lockUser()
    {
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

      //修改用户的status
      $res = Db::name('users')
      ->where('Id',request()->post('Id'))
      ->update(['Status' => request()->post('Status')]);

      if($res === 1) {
         $this->common->setResponse(200,'操作成功！');
      }else {
         $this->common->setResponse(21,'操作失败！');
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