const pkg = require('./package')

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Noven技术生涯经验分享',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1.0' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/n1.png' },
    ],
    script: [
      { 
        src: 'https://cdn.bootcss.com/wangEditor/10.0.13/wangEditor.min.js',
        defer:"defer"
      },
      { 
        src: 'https://cdn.bootcss.com/js-xss/0.3.3/xss.min.js',
        defer:"defer"
      },
      { 
        src: 'https://cdn.bootcss.com/js-sha1/0.6.0/sha1.min.js',
        defer:"defer"
      },
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
    '~/assets/style/App.less',
    '~/assets/iconfont/iconfont.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/http',
    '@/plugins/particles',
    '@/plugins/editorConfig',
    '@/plugins/utils',
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
    vendor: ['axios'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
