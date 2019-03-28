const pkg = require('./package')
// const axios = require('axios')
const serverUrl = process.env.SERVER || "http://explorer_server_dposback1:4068"
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
  { src: '~plugins/account-icon', mode: 'client' },
  '~/plugins/i18n.js',
  { src: '~/plugins/vue-qart', mode: 'client' },
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
    proxy: true,
    prefix: '/api', // it only work when proxy is enabled
  },

  proxy: {
    '/api': {
      // target: 'http://119.3.57.66:4068',
      // target: 'http://localhost:4068',
      target: serverUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  router: {
    middleware: ['i18n'],
  },

  // generate: {
  //   routes: function () {
  //     return axios.get('http://119.3.57.66:4066/blocks/number/2')
  //       .then((res) => {
  //         return ['/blocks/' + res.data.Number]
  //       }) 
  //   },
  // },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.node = {
        fs: "empty"
      };
    }
  }
}
