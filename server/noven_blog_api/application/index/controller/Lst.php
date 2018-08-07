<?php
namespace app\index\controller;
use think\Controller;
use think\request;
use think\Db;

class Lst extends Controller
{
    public function index()
    {
        return $this->fetch('../view/list');
    }

}
