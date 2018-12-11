<?php
namespace lib;
require(ROOT_PATH . 'extend/firebase/HTMLPurifier/library/HTMLPurifier.includes.php');
require(ROOT_PATH . 'extend/firebase/HTMLPurifier/library/HTMLPurifier.autoload.php');

class HTMLXssFilter
{
  public static function filter($html = '') {
    $html = '<p>1111<script>alert(111)</script></p>';

    $config = HTMLPurifier_Config::createDefault();
    var_dump($config);
    return;

    $html_purifier = new HTMLPurifier($config);
    $clean_html = $html_purifier->purify($html);

    echo $clean_html;
  }
}
