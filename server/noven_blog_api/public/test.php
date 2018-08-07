<?php 

   //如果一个页面有命名空间，则在命名空间之前不能有任何非注释性的代码
   namespace kj1\jd1\tm1\tb1;

   function getmsg() {
   	echo '123';
   }

   class Animal {
      public $name = 'dog';
      static $age = 18;
   }

   const MN = 'li4';


   namespace kj2;

   const MN = 'zhangsan';
   
   function getmsg() {
   	echo '456';
   }

   
   use kj1\jd1\tm1\tb1;

   getmsg(); //456 如果直接调用的话，依然访问的是kj2的命名空间

   tb1\getmsg();//123 如果是用的use里的最后一个路径，则访问的是 kj1\jd1\tm1\tb1 里的getmsg();

   // tm1\tb1\getmsg(); ----->//Call to undefined function kj2\tm1\tb1\getmsg()  报错，所以只能是最后一个路径
   

   //-----------命名空间里的类的引入 ----------------
   //可以直接把类名写在最后一个路径
   //这是TP5最常用的方式！！
   
   use  kj1\jd1\tm1\tb1\Animal;

   echo Animal::$age;   //18
   
   

?>