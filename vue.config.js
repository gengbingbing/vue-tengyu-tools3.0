'use strict';
const path = require('path');
const defaultSettings = require('./src/defaultSettings.js');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'vue Element Admin'; // page title

// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || 8099; // dev port

// 对应的版本可以看package.json
const cdnMap = {
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
  ],
  js: [
    'https://unpkg.com/element-ui/lib/index.js',
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/echarts/3.7.0/echarts.min.js'
  ]
};
// 哪些资源
const externals = {
  vue: 'Vue',
  'element-ui': 'ELEMENT',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'echarts': 'echarts'
};

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用的标题，以便可以在中访问它索引.html插入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 配置cdn
    config.externals(externals);
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdnMap;
        return args;
      });

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // 配置压缩代码
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();

          // 分隔带吗
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });

          // 开启gzip
          config
            .plugin('compression')
            .use(CompressionWebpackPlugin)
            .tap(() => [
              {
                test: /\.js$|\.html$|static$|\.css/, // 匹配文件名
                threshold: 1024, // 超过10k进行压缩
                deleteOriginalAssets: false // 是否删除源文件
              }
            ]);
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single');
        }
      );
  }
};
