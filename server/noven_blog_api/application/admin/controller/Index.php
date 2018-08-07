<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

class Index extends Controller
{
    public function index()
    {
        echo '欢迎来到tp5构建的api服务器';
    }
}
