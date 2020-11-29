const pkg = require('./package')

module.exports = {
  mode: 'spa',
  // mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Noven技术生涯经验分享',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1.0' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'description', name: 'keywords', content: '文章，经验，分享，Web前端' },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatibel', content: 'IE=Edge,chrome=1' },
      { 'http-equiv': 'Cache-Control', content: 'no-siteapp' },
      { name: 'robots', content: 'all' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/n1.png' },
    ],
    script: [
      //单页应用下，这里异步加载，多页下，在需求页加载
      // { 
      //   src: 'https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.js',
      //   defer:"defer"
      // },
      // { 
      //   src: 'https://cdn.bootcss.com/js-xss/0.3.3/xss.min.js',
      //   defer:"defer"
      // },
      // { 
      //   src: 'https://cdn.bootcss.com/js-sha1/0.6.0/sha1.min.js',
      //   defer:"defer"
      // },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~theme/index.css',
    '~assets/style/App.less',
    '~assets/iconfont/iconfont.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/router', ssr: true },
    { src: '@/plugins/http', ssr: true },
    { src: '@/plugins/particles', ssr: false },
    { src: '@/plugins/editorConfig', ssr: false },
    { src: '@/plugins/utils', ssr: true },
    { src: '@/plugins/cookie', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    //css处理器
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    vendor: ['axios'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
