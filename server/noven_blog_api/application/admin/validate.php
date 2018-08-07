<?php 
   	namespace app\admin\validate;

	use think\Validate;

	class add_cate extends Validate
	{
	    protected $rule = [
	        'catename'  =>  'require|max:25',
	        'keywords' =>  'max:20',
	    ];


	    protected $message  =   [
	        'catename.require' => '请输入栏目名称！',
	        'catename.max'     => '栏目名称不能超过25个字符',
	        'keywords.max'   => '栏目关键词不能超过20个字符',   
	    ];

	}


?>