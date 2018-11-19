const pkg = require('./package')
// const axios = require('axios')

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
	{ src: '~plugins/account-icon', ssr: false }
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
      target: 'http://119.3.57.66:4067',
      // target: 'http://localhost:4066',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
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
    }
  }
}
