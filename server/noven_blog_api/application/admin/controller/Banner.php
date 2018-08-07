<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use think\Validate;
use lib\common;

class Banner extends Controller
{   

	private $common = null;

	public function __construct() {
       $this->common = new Common();
    }  

    public function bannerList()
    {

        $keywords = request()->get('keywords') ? request()->get('keywords') : '';

        $query = ['Title' => ['like','%'.$keywords.'%']];
        
        //处理非必填查询条件
        if(request()->get('userId')) {
           $query['UserId'] = request()->get('userId');
        };

        if(request()->get('type')) {
           $query['Type'] = request()->get('type');
        };
        if((request()->get('isShow') == 0 || request()->get('isShow')) && request()->get('isShow') != '') {
           $query['IsShow'] = request()->get('isShow');
        };

        // 支持标题，简介，作者，时间范围
        $res = $this->common->getDataList('banners',$query);

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }


    
    /**
     * [createOrUpdate 新增或修改banner圖]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function createOrUpdate() 
    {
      //验证请求方式和banner图相关必填字段
      if(!$this->validateData()) return;

      $banner = request()->post();

      if(request()->post('Id')) {
         $banner['CreateTime'] =  date('Y-m-d H:i:s',time());

          $res = Db::name('banners')
                 ->where('Id',request()->post('Id'))
                 ->update($banner);

          if($res == 1) {
             $this->common->setResponse(200,'修改Banner成功！',$bannerId);
          }else {
             $this->common->setResponse(21,'未修改任何信息！');
          }
      }else {
         //新增banner
          $banner['CreateTime'] =  date('Y-m-d H:i:s',time());

          $res = Db::name('banners')->insert($banner);

          if($res == 1) {
             $bannerId = Db::name('banners')->getLastInsID();
             $this->common->setResponse(200,'新增Banner成功！',$bannerId);
          }else {
             $this->common->setResponse(21,'新增Banner失败！');
          }
      }
    }



    /**
     * [publish 发布/下架一个banner图]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function publish()
    {
       //验证id
      if(!request()->post('Id')) {
        $this->common->setResponse(21,'Banner编号不能为空！');
        return;
      }

      $quest = request()->post();

      //验证Status状态
      if(!isset($quest['isShow'])) {
        $this->common->setResponse(21,'要上架/下架的状态不能为空！');
        return;
      }else if($quest['isShow'] != 0 && $quest['isShow'] != 1) {
        $this->common->setResponse(21,'要上架/下架的状态只能是0或1！');
        return;
      }

      //修改用户的status
      $res = Db::name('banners')
      ->where('Id',request()->post('Id'))
      ->update(['IsShow' => request()->post('isShow')]);

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
       $this->common->delete('banners');
    }

    //验证账号和密码是否传入
    private function validateData() 
    {
        $rule = [
            'Title'  => 'require|length:1,255',
            'Type'  => 'require|in:1,2',
            'IsShow'  => 'require|in:0,1',
            'CreateTime' => 'date',
        ];

        $msg = [
            'Title.require' => 'Banner的标题不能为空',
            'Title.length'     => 'Banner的标题长度只能在1-255个字符之间，一个汉字占3个字符',
            'Type.require'   => 'Banner的类型不能为空',
            'Type.in'   => 'Banner的类型只能是1（首页）和2（用户）',
            'IsShow.require'   => '请选择Banner的上下架状态',
            'IsShow.in'   => 'Banner的上下架状态只能是0（下架）和1（上架）',
            'CreateTime.date'   => '请传入正确的创建时间',
        ];

        $validate = new Validate($rule, $msg);
        $result   = $validate->check(request()->post());

        if(!$result){
          $this->common->setResponse(21,$validate->getError());
          return false;
        };

        return true;
    }

}
