<?php
namespace app\index\controller;
use think\Controller;
use think\request;
use think\Db;

class Index extends Controller
{
    public function index()
    {

       return $this->fetch('../view/1');
    }


    public function index2($name = 'zhangsan',$place='四川')
    {   
        

     //查询数据库
     $select = Db::table('cate')->select();
               
     $select1 = Db::name('cate')->select();
     
     $select2 = Db::table('cate')
                // ->where('id','between',[1,8])
                ->order('desc')
                ->limit(10)
                ->select();

     print_r($select2);

     //新增数据 --->方式一，直接使用原生插入方式
     Db::table('cate')
         ->insert(['id'=>0,'catename'=>'zhangsan']);


     //删除数据
     Db::table('cate')
         ->where('id','between',[1,10])
         ->delete();

     //修改数据
     Db::table('cate')
         ->where('id','<',15)
         ->update(['catename'=>'li4','keywords'=>'shabi']);







     //    //设置渲染变量
     //    $this->assign('name',$user['username']);
     //    $this->assign('place',$user['age']);
        
     //    //渲染哪个模板
     //    return $this->fetch('index1');  //注意必须return
    }


    public function hello($id) {
       echo 'id='.$id;
    }


    public function requestTest() {
    	$request = Request::instance();

       	print_r($request->param());  //这是实例化抽象类获得的request对象
       	print_r($this->request->param());  //这是因为当前控制器继承了Controller，Controller有request方法返回了这个对象
       	print_r(request()->param());  //为了简介，tp5直接提供了request方法

        echo request()->url();   //相对域名
		echo request()->url(true);  //完整域名
        

        print_r(input()['name']); //为了简洁，这与$request->param()['name']用法一致

        print_r(request()->get());  //获取所有get参数
        print_r(request()->post());  //获取所有post参数
        print_r(request()->post('name'));  //获取所有post中name参数
        print_r(request()->cookie());  //获取所有cookie参数
        print_r(request()->cookie('name'));  //获取所有cookie中name参数
        print_r(request()->file());  //获取所有file参数
        print_r(request()->file('name'));  //获取所有file中name参数

    }
}

