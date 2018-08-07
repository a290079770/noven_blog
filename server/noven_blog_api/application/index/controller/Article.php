<?php
namespace app\index\controller;
use think\Controller;
use think\request;
use think\Db;

class Article extends Controller
{
    public function index()
    {
        return $this->fetch('../view/article');
    }

}