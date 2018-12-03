import Vue from 'vue';
/**
 * [getEditorConfig 获取当前功能编辑器对应的配置]
 * @Author   罗文
 * @DateTime 2018-12-03
 * @param    {[Number]}   type [1 - 编辑文章  2 - 留言]
 * @return   {[type]}        [description]
 */
function getEditorConfig(type) {
  const EditMenuList = [
      'undo',  // 撤销
      'redo',  // 重复
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      // 'justify',  // 对齐方式
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'code',  // 插入代码
  ];
  const FeedbackMenuList = [
      'undo',  // 撤销
      'redo',  // 重复
      'foreColor',  // 文字颜色
      'emoticon',  // 表情
  ];

  //上传图片的配置信息
  const uploadConfig = {
    //默认限制图片大小是 5M
    uploadImgMaxSize: 5 * 1024 * 1024,
    //限制一次最多能传几张图片
    uploadImgMaxLength: 1,
    //自定义传递一些参数,如传递验证的token等。参数会被添加到formdata中
    uploadImgParams: {
        // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
        // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
        // aaa: 'xxx'
    },
    //如果 还需要 将参数拼接到 url 中，可再加上如下配置
    uploadImgParamsWithUrl: false,
    //上传图片时，可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数
    // uploadFileName:'',
    //上传图片时刻自定义设置 header
    uploadImgHeaders: {
        // 'Accept': 'text/x-json'
    },
    //跨域上传中如果需要传递 cookie 需设置 withCredentials
    withCredentials: true,
    //自定义 timeout 时间
    uploadImgTimeout: 10000,
    //监听函数，见文档
    // uploadImgHooks: {
    //   before(xhr, editor, files) {},
    //   success(xhr, editor, files) {// 图片上传并返回结果，图片插入成功之后触发},
    //   fail(xhr, editor, files) {},
    //   error(xhr, editor, files) {},
    //   timeout(xhr, editor, files) {},
    //   customInsert(xhr, editor, files) {
    //     // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //     // 但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //   },
    // }
    //自定义提示方法
    // customAlert(info) {}
    //自定义上传图片事件,如果想完全自己控制图片上传的过程，可以使用如下代码
    // customUploadImg(files, insert){ insert(imgUrl) }
  }


  let customConfig = {
     // 自定义菜单配置
     menus: type == 1 ? EditMenuList : FeedbackMenuList,
     //debug模式下，有 JS 错误会以throw Error方式提示出来。默认值为false，即不会抛出异常。
     debug: false,
     //编辑区域的z-index默认为10000，可自定义修改，代码配置如下。需改之后，编辑区域和菜单的z-index会同时生效。     
     zIndex: 999, 
     //配置其他语言，见文档   
     //lang: {}, 
     //是否开启粘贴时样式过滤，当从其他网页复制文本内容粘贴到编辑器中，编辑器会默认过滤掉复制文本中自带的样式 
     pasteFilterStyle: false,     
     //是否开启粘贴时忽略图片，即只粘贴文字不粘贴图片
     pasteIgnoreImg: false,  
     //pasteTextHandle - 自定义过滤，见文档
     // 自定义配置颜色（字体颜色、背景色）
     colors:[
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ],  
    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    emotions: [
        {
            // tab 的标题
            title: '默认',
            // type -> 'emoji' / 'image'
            type: 'image',
            // content -> 数组
            content: [
                {
                    alt: '[坏笑]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
                },
                {
                    alt: '[舔屏]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
                }
            ]
        },
        {
            // tab 的标题
            title: 'emoji',
            // type -> 'emoji' / 'image'
            type: 'emoji',
            // content -> 数组
            content: ['😀', '😃', '😄', '😁', '😆']
        }
    ],
    // 自定义字体
    fontNames: [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ],
    //默认情况下，编辑器不会显示“上传图片”的tab，必须配置上传图片的信息才会显示。
    //注意：下面的uploadImgShowBase64 和 uploadImgServer只能配置一个！！！
    //使用 base64 保存图片,
    // uploadImgShowBase64: false,
    //配置上传图片的服务器地址
    uploadImgServer: '/images/uploadFile',
    //配置图片上传的其他数据
    ...uploadConfig,
  }

  return customConfig;
}


Vue.prototype.getEditorConfig = getEditorConfig;