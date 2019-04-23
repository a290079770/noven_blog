<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    
    //用户相关接口路由
    '[user]' => [
        'userList'   => ['admin/user/userList', ['method' => 'get']],  // 用户列表
        'activeUserList'   => ['admin/user/activeUserList', ['method' => 'get']],  // 获取今日登录用户列表
        'detail' => ['admin/user/detail', ['method' => 'get']],  // 用户详情
        'detailSimple' => ['admin/user/detailSimple', ['method' => 'get']],  // 获取用户简略详情
        'login'   => ['admin/user/login', ['method' => 'post']], //登录
        'loginAdmin'   => ['admin/user/loginAdmin', ['method' => 'post']], //后台用户登录
        'reg'   => ['admin/user/reg', ['method' => 'post']], //注册
        'signout'   => ['admin/user/signout', ['method' => 'post']], //退出登录
        'createOrUpdate'   => ['admin/user/createOrUpdate', ['method' => 'post']],  //新增或修改
        'lockUser'   => ['admin/user/lockUser', ['method' => 'post']],  //锁定/解锁用户
        'validOldPwd'   => ['admin/user/validOldPwd', ['method' => 'post']],  //修改/验证旧密码
        'updatePwd'   => ['admin/user/updatePwd', ['method' => 'post']],  //修改/重置密码
        'delete'   => ['admin/user/delete', ['method' => 'post']],  //删除用户
        'updateUserInfo'   => ['admin/user/updateUserInfo', ['method' => 'post']],  //删除用户
    ],
    
    //文章相关接口
    '[arcticle]' => [
        'arcticleList' => ['admin/arcticle/arcticleList', ['method' => 'get']],  // 文章列表
        'activeArcticleList' => ['admin/arcticle/activeArcticleList', ['method' => 'get']],  // 热门文章列表
        'createOrUpdate'   => ['admin/arcticle/createOrUpdate', ['method' => 'post']],  //新增或修改
        'detail' => ['admin/arcticle/detail', ['method' => 'get']],  // 文章详情
        'delete'   => ['admin/arcticle/delete', ['method' => 'post']],  //删除文章
        'collect'   => ['admin/arcticle/collect', ['method' => 'post']],  //收藏文章
        'collectList'   => ['admin/arcticle/collectList', ['method' => 'get']],  //获取用户文章收藏列表
        'upOrDownShelf'   => ['admin/arcticle/upOrDownShelf', ['method' => 'post']],  //上架或下架文章
        'praise'   => ['admin/arcticle/praise', ['method' => 'post']],  //点赞文章
    ],

    //心情相关接口
    '[mood]' => [
        'moodList' => ['admin/mood/moodList', ['method' => 'get']],  // 心情列表
        'createOrUpdate'   => ['admin/mood/createOrUpdate', ['method' => 'post']],  //新增或修改
        'detail' => ['admin/mood/detail', ['method' => 'get']],  // 心情详情
        'delete'   => ['admin/mood/delete', ['method' => 'post']],  //删除心情
    ],

    //轮播图相关接口
    '[banner]' => [
        'bannerList' => ['admin/banner/bannerList', ['method' => 'get']],  // 轮播图接口
        'createOrUpdate'   => ['admin/banner/createOrUpdate', ['method' => 'post']],  //新增或修改Banner
        'publish'   => ['admin/banner/publish', ['method' => 'post']],  //删除Banner
        'delete'   => ['admin/banner/delete', ['method' => 'post']],  //删除Banner
    ],

    //标签相关接口
    '[tag]' => [
        'tagList' => ['admin/tag/tagList', ['method' => 'get']],  // 标签列表
        'delete'   => ['admin/tag/delete', ['method' => 'post']],  //删除标签
    ],

    //标签相关接口
    '[images]' => [
        'uploadFile' => ['admin/images/uploadFile', ['method' => 'post']],  // 上传文件
    ],

    //标签相关接口
    '[comment]' => [
        'getComments' => ['admin/comment/getComments', ['method' => 'get']],  // 获取评论列表
        'commentListAdmin' => ['admin/comment/commentListAdmin', ['method' => 'get']],  // 获取评论列表（后台）
        'createComment' => ['admin/comment/createComment', ['method' => 'post']],  // 新增一条评论
        'upOrDownShelf' => ['admin/comment/upOrDownShelf', ['method' => 'post']],  // 上架/下架评论
    ],


    //标签相关接口
    '[other]' => [
        'timeLine' => ['admin/other/timeLine', ['method' => 'get']],  // 时间轴列表
        'addFeedBack' => ['admin/other/addFeedBack', ['method' => 'post']],  // 意见反馈
    ],

    //重定向到这个接口
    '__miss__'  => 'admin/other/miss',

];
