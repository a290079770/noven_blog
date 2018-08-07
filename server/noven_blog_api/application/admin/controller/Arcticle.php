<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use think\Validate;
use lib\common;

class Arcticle extends Controller
{   

	private $common = null;

	public function __construct() {
       $this->common = new Common();
    }  

    public function arcticleList()
    {
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';
        $authorId = request()->get('authorId') ? request()->get('authorId') : '';
        
        //时间范围筛选
        $startTime = request()->get('startTime');
        $endTime = request()->get('endTime');
    
        $time = null;
        
        if($startTime && $endTime) {
           $time = ['CreateTime','between',[$startTime,$endTime]];
        }else if($startTime && !$endTime) {
           $time = ['CreateTime','>=',$startTime];
        }

        // 支持标题，简介，作者，时间范围
        $res = $this->common->getDataList('arcticles',[
            'Title|Author|Brief' => ['like','%'.$keywords.'%'],
            'AuthorId' => ['like','%'.$authorId.'%'],
          ],'Id,Title,Brief,Author,CreateTime,ReadCount,AuthorId',$time
        );

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }


    /**
     * [activeArcticleList 获取热门文章]
     * @Author   罗文
     * @DateTime 2018-04-22
     * @return   [type]     [description]
     */
    // public function activeArcticleList()
    // {
    //     $order = request()->get('order') ? request()->get('order') : 'ReadCount';
    //     $authorId = request()->get('authorId') ? request()->get('authorId') : '';

    //     // 支持标题，简介，作者，时间范围
    //     $res = $this->common->getDataListByOrder('arcticles',[
    //         'AuthorId' => ['like','%'.$authorId.'%'],
    //       ],'Id,Title,Brief,Author,CreateTime,ReadCount,AuthorId',null,null,$order
    //     );

    //     if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    // }

    /**
     * [createOrUpdate 新增或修改文章]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function createOrUpdate()
    {
       //验证请求方式和账号密码不能为空
       if(!$this->validateData()) return;
       
       $arcticle = request()->post();

       //如果有传入Id,则是修改
       if(isset($arcticle['Id'])) {
         $res = Db::name('arcticles')->where('Id',$arcticle['Id'])->update($arcticle);
   
         if($res == 1) {
           $this->common->setResponse(200,'修改成功！');
         }else {
           $this->common->setResponse(21,'修改失败！');
         }

       }else {
         $arcticle['CreateTime'] =  date('Y-m-d H:i:s',time());
         $arcticle['ReadCount'] = 0;

         $res = Db::name('arcticles')->insert($arcticle);
   
         if($res == 1) {
           $arcticleId = Db::name('arcticles')->getLastInsID();
           $this->common->setResponse(200,'新增成功！',$arcticleId);
         }else {
           $this->common->setResponse(21,'新增失败！');
         }
       }
    }


    /**
     * [detail 获取文章详情]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function detail()
    {
      if(!request()->get('Id')) {
        $this->common->setResponse(21,'缺少文章Id');
        return false;
      }

      $res = Db::name('arcticles')
          ->where('Id',request()->get('Id'))
          ->select();

      if(count($res) === 0) {
         $this->common->setResponse(21,'未获取到文章详情！');
      }else {
        //获取到了用户的基本信息，还需要获取用户标签信息
         $arcticleInfo = $res[0];

         $tagList = Db::name('tags')
          ->where('ArcTicleId',request()->get('Id'))
          ->select();

         $arcticleInfo['TagList'] = $tagList;
         $this->common->setResponse(200,'ok',$arcticleInfo);
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
       $this->common->delete('arcticles');
    }


    //验证必须的数据是否传入
    private function validateData() 
    {
        //必须post访问
        if(request()->isGet()) {
          $this->common->setResponse(21,'请求方式错误！');
          return false;
        }

        $rule = [
            'Title'  => 'require|length:1,255',
            'Author'  => 'require|length:1,20',
            'AuthorId' => 'require',
            'Content' => 'require',
        ];

        $msg = [
            'Title.require' => '文章标题不能为空！',
            'Title.length'     => '文章标题长度只能在1-255个字符之间，一个汉字为3个字符',
            'Author.require' => '文章作者不能为空！',
            'Author.length'     => '文章作者长度只能在1-20个字符之间，一个汉字为3个字符',
            'AuthorId.require'   => '作者编号不能为空！',
            'Content.require'   => '文章内容不能为空',
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
