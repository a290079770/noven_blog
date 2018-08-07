<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use think\Validate;
use lib\common;

class Mood extends Controller
{   

	private $common = null;

	public function __construct() {
       $this->common = new Common();
    }  

    public function moodList()
    {
        $keywords = request()->get('keywords') ? request()->get('keywords') : '';
        $authorId = request()->get('authorId') ? request()->get('authorId') : '';

        $startTime = request()->get('startTime');
        $endTime = request()->get('endTime');

        $time = null;

        if($startTime && $endTime) {
           $time = ['CreateTime','between',[$startTime,$endTime]];
        }else if($startTime && !$endTime) {
           $time = ['CreateTime','>=',$startTime];
        }

        // 支持标题，简介，作者，时间范围
        $res = $this->common->getDataList('moods',[
          'Content|Author' => ['like','%'.$keywords.'%'],
          'AuthorId' => ['like','%'.$authorId.'%'],
        ],'Id,Content,Author,CreateTime,ReadCount,AuthorId',$time
     );

        if(!(bool)$res) $this->common->setResponse(21,'获取列表失败，请联系管理员！');
    }


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
       
       $mood = request()->post();

       //如果有传入Id,则是修改
       if(isset($mood['Id'])) {
         // 启动事务
          Db::startTrans();
          try{
              $res = Db::name('moods')->where('Id',$mood['Id'])->update($mood);
              if($res == 1) {
               $this->common->setResponse(200,'修改成功！');
              }else {
               $this->common->setResponse(21,'修改失败！');
              }
              // 提交事务
              Db::commit();
          } catch (\Exception $e) {
              $this->common->setResponse(21,'操作数据库失败！');
              // 回滚事务
              Db::rollback();
          }


       }else {
         $mood['CreateTime'] =  date('Y-m-d H:i:s',time());
         $mood['ReadCount'] = 0;

         // 启动事务
         Db::startTrans();
         try{
            $res = Db::name('moods')->insert($mood);

            if($res == 1) {
             $moodId = Db::name('moods')->getLastInsID();
             $this->common->setResponse(200,'新增成功！',$moodId);
            }else {
             $this->common->setResponse(21,'新增失败！');
            }
            // 提交事务
            Db::commit();
         } catch (\Exception $e) {
            $this->common->setResponse(21,'操作数据库失败！');
            // 回滚事务
            Db::rollback();
         }

       }
    }


    /**
     * [delete 删除一个用户或管理员]
     * @Author   罗文
     * @DateTime 2018-04-17
     * @return   [type]     [description]
     */
    public function detail()
    {
       //必须post访问
      if(!request()->get('Id')) {
        $this->common->setResponse(21,'缺少心情Id');
        return false;
      }

      $res = Db::name('moods')
          ->where('Id',request()->get('Id'))
          ->select();

      if(count($res) === 0) {
         $this->common->setResponse(21,'未获取到心情详情！');
      }else {
         $this->common->setResponse(200,'ok',$res[0]);
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
       $this->common->delete('moods');
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
            'Content'  => 'require|length:1,255',
            'Author'  => 'require|length:1,20',
            'AuthorId' => 'require',
            'Content' => 'require',
        ];

        $msg = [
            'Content.require' => '文章标题不能为空！',
            'Content.length'     => '文章标题长度只能在1-255个字符之间，一个汉字为3个字符',
            'Author.require' => '文章作者不能为空！',
            'Author.length'     => '文章作者长度只能在1-20个字符之间，一个汉字为3个字符',
            'AuthorId.require'   => '作者编号不能为空！',
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
