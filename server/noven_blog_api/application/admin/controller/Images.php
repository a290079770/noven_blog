<?php
namespace app\admin\controller;
use think\Controller;
use think\request;
use think\Db;

use lib\common;
use lib\jwtTool;
use lib\validJWT;


class Images extends Controller
{   
    private $common = null;
    private $jwt = null;
    private $error = array(
                            0 => '请求方式错误！',
                            1 => '所属产品id和图片类型不能为空!',
                            2 => '未上传图片或图片数据为空!',
                            3 => '未上传图片所属分类!',
                            4 => '未上传图片所属产品ID!',
                            5 => '上传文件失败!',
                            6 => '图片保存失败!',
                            7 => '图片入库失败!',
                            8 => '图片关联类型错误，1-产品大图 2-产品首页轮播图 3-产品首页小图！',
                            9 => '没有这个ID的产品，关联失败！',
                            10 => '删除失败！',
                            11 => '删除成功！',
                            12 => '图片名称不能为空！',
                          );
    public function __construct() {
       $this->common = new Common();
       $this->jwt = new JwtTool();
    }
    
    //获取分类列表
    public function imageList()
    {
        // type - 0 获取全部  1 产品大图  2 产品首页轮播图 3 产品首页小图
        // proId - 分类id 0 - 所有产品
        
        $proId = request()->get('proId') ? request()->get('proId') : 0;
        $type = request()->get('type') ? request()->get('type') : 0;
        $cp = request()->get('cp') ? request()->get('cp') : 1;
        $ps = request()->get('ps') ? request()->get('ps') : 20;

        if($proId == 0 && $type == 0) {
           $arr = Db::name('images')
               ->order('id','desc')
               ->page($cp,$ps)
               ->select();
           //统计数
          $count = Db::name('images')
                 ->count();  
        }else if($proId !== 0 && $type == 0) {
           $arr = Db::name('images')
               ->where('pid',$proId)
               ->order('id','desc')
               ->page($cp,$ps)
               ->select();
           //统计数
           $count = Db::name('images')
                 ->where('pid',$proId)
                 ->count();    
        }else if($proId == 0 && $type !== 0) {
           $arr = Db::name('images')
               ->where('type',$type)
               ->order('id','desc')
               ->page($cp,$ps)
               ->select();
           //统计数
           $count = Db::name('images')
                 ->where('type',$type)
                 ->count();    
        }else if($proId !== 0 && $type !== 0){
           $arr = Db::name('images')
               ->where('pid',$proId)
               ->where('type',$type)
               ->order('id','desc')
               ->page($cp,$ps)
               ->select();
           //统计数
           $count = Db::name('images')
                 ->where('pid',$proId)
                 ->where('type',$type)
                 ->count();      
        }
  

        $this->common->setResponse(200,'ok',$arr,$count);
    }

    //上传文件
    public function uploadFile() 
    {
        // //参数 proId type
        // if(!request()->post()  || count(request()->file()) === 0 || !request()->post('fileData')) {
        //    $this->common->setResponse(21,$this->error[2]);
        //    return;
        // }
        //判断上传文件有没出错！
        if($_FILES['file']['error']) {
          $this->common->setResponse(21,$this->error[5]);
          return;
        }

        $fileData = json_decode(request()->post('fileData'));
        $filename = $this->randomStr(16).'_photo_'.time();
        $type = $_FILES['file']['type'];
        $type = explode('/',$type)[1];
        $size = $_FILES['file']['size'];

        $url = request()->scheme().':'.DS.DS.request()->server()['HTTP_HOST'].DS.'images'.DS.$filename.'.'.$type;
        //解决中文图片名
        $upload_file = iconv("UTF-8", "GB2312",  ROOT_PATH.'public'.DS.'images'.DS.$filename.'.'.$type);

        //存文件
        if(file_exists($upload_file)) {
          //文件已经存在
          $this->common->setResponse(200,'上传成功！',array('url'=>$url));
        }else {
          //文件不存在，则新增
          //验证通过，入库
           $res = Db::name('files')
                  ->insert([
                     'FileName'=>$filename.'.'.$type,
                     'Extension'=>$type,
                     'Url'=> $url,
                     'CreateTime'=> date('Y-m-d H:i:s',time())
                  ]);

          if($res == 1) {
             //入库成功，开始移动文件

            $info =  move_uploaded_file($_FILES['file']['tmp_name'], $upload_file);

            if($info) {
               $this->common->setResponse(200,'上传成功！',array('url'=>$url));
            }else {
               $this->common->setResponse(21,$this->error[6]);
            }

          }else {
              $this->common->setResponse(21,$this->error[7]);
          }
          
        }
                  
        
    }


    //删除一个分类
    public function delete() 
    {
        //参数 proId
        //必须post访问
        if(request()->isGet()) {
          $this->common->setResponse(21,$this->error[0]);
          return;
        }

        //根据proId删除7
        if(!request()->post('imgId')) {
           $this->common->setResponse(21,'图片ID不能为空！');
           return;
        }

        $res = Db::name('images')->where('id',request()->post('imgId'))->delete();

        if($res == 0 ) {
           $this->common->setResponse(21,$this->error[10]);
        }else {
           $this->common->setResponse(200,$this->error[11]);
        }
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


    private function randomStr($len) {
      $preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
      $str = '';

      for($i = 0 ; $i < $len ; $i ++) {
         $random = rand(0,63);
         $str .= $preinstallStr[$random];
      }

      return $str;
    }

}
