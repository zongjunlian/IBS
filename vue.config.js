const path = require('path')
const webpack = require("webpack")

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/IBS4.1/'
  : '/'

const LogRemove = ["@vue/babel-plugin-transform-vue-jsx"]

// 生产环境移除console
if(process.env.NODE_ENV === 'production') {
  LogRemove.push("transform-remove-console")
}

module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'IBS',
   // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  assetsDir: 'static',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    plugins: LogRemove,
    presets: [
      [
        '@vue/app', {
          modules: false,
          targets: {
            browsers: ["> 1%", "last 2 versions", "not ie <= 8", "Android >= 4", "iOS >= 8"]
          },
          useBuiltIns: 'entry',
        }
      ]
    ]
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
					$:"jquery",
					jQuery:"jquery",
					"windows.jQuery":"jquery"
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('api', resolve('src/api'))
  },

  configureWebpack: (config) => {
    config.entry = ["babel-polyfill", "./src/main.js"]
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  productionSourceMap: true,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
		https: false,
		hotOnly: true, //热更新
    proxy: {
			"/IBS4.1": {
        target: "http://10.10.82.125:8081/IBS4.1",
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '/IBS4.1' : ''
        }
			},
    },
		before: app => {}
  },
}