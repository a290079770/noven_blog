<?php 
 
//访问命名空间的三种方式
//1,非限定名称访问  (访问当前命名空间的xxx函数/类/const定义的常量)
//2,完全限定名称访问  (按照\xxx\xxx以绝对路径形式访问)
//3,不完全限定名称访问   (按照xxx\xxx以相对路径形式访问，实际上是访问当前命名空间下的某函数/类/const定义的常量)

//-----------------------直接调用该函数，即在最近的命名空间中找 --------------   
   namespace kj1\hello;

   function getmsg() {
   	  echo '123';
   }
   
   namespace kj2\hello1;
   function getmsg() {
   	  echo '456';
   }


   getmsg();//456   //非限定名称访问


   \kj1\hello\getmsg();  //123   //完全限定名称访问
   
   
   hello1\getmsg(); //不完全限定名称访问

   namespace zhangsan\kj2\hello1;
   function getmsg() {
        echo '456';
   }
?>