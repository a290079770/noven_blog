<?php
namespace app\index\controller;
use think\Controller;
use think\request;
use think\Db;

class Search extends Controller
{
    public function index()
    {
        return $this->fetch('../view/search');
    }

}