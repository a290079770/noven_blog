<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

//引入xss过滤
require_once ROOT_PATH . 'extend/firebase/HTMLPurifier/library/HTMLPurifier.auto.php';
require_once ROOT_PATH . 'extend/firebase/HTMLPurifier/library/HTMLPurifier.php';

// 应用公共文件

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Credentials:false');


$resultCode = [
  21 => '统一错误返回',
  201 => 'token相关错误'
];


//根据tp5规则，第三方类库没有namespace则需要在这里写全局方法
function HTMLXssFilter($html = '') {
	$config = HTMLPurifier_Config::createDefault();

	$config->set('HTML.Allowed','div,b,strong,i,em,a[href|title],ul,ol,li,p[style],br,span[style],img[width|height|alt|src],code,pre,blockquote,table[border],tr,thead,th,tbody,td');
    $config->set('CSS.AllowedProperties', 'font,font-size,font-weight,font-style,font-family,text-decoration,padding-left,color,background-color,text-align');
    $config->set('HTML.TargetBlank', TRUE);

	$html_purifier = new HTMLPurifier($config);
	$clean_html = $html_purifier->purify($html);

	return $clean_html;
}

