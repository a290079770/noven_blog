<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use think\Validate;
use lib\common;

class Tag extends Controller
{   

	private $common = null;

	public function __construct() {
       $this->common = new Common();
    }  

    public function tagList()
    {
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';
        $query = ['Title' => ['like','%'.$keywords.'%']];
        
        //处理非必填查询条件
        if(request()->get('userId')) {
           $query['UserId'] = request()->get('userId');
        };

        //处理非必填查询条件
        if(request()->get('arcTicleId')) {
            echo request()->get('arcTicleId');
           $query['ArcticleId'] = request()->get('arcTicleId');
        };

        if(request()->get('type')) {
           $query['Type'] = request()->get('type');
        };

        // 支持标题，简介，作者，时间范围
        $res = $this->common->getDataList('tags',$query);

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }


    /**
     * [delete 删除一个用户或管理员]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function delete()
    {
       $this->common->delete('tags');
    }

}
