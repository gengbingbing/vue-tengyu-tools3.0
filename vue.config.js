'use strict';
const path = require('path');
const defaultSettings = require('./src/defaultSettings.js');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

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
  css: {
		sourceMap: false,
		loaderOptions: {
			sass: {
				prependData: '@import "@/assets/css/mixins.scss";@import "@/assets/css/theme.scss";'
			},
			stylus: {
				'resolve url': true,
				'import': [
					'./src/theme'
				]
			}
		}
	},
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
        plugins: [
            new PrerenderSPAPlugin({
                // 生成文件的路径，也可以与webpakc打包的一致。
                // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                staticDir: path.join(__dirname, 'dist'),
                // outputDir: path.join(__dirname, './'),
                // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                routes: ['/',  '/tool'],
                // 这个很重要，如果没有配置这段，也不会进行预编译
                renderer: new Renderer({
                    inject: { //默认挂在window.__PRERENDER_INJECTED对象上，可以通过window.__PRERENDER_INJECTED.foo在预渲染页面取值
                        foo: 'bar'
                    },
                    headless: false,
                    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                    renderAfterDocumentEvent: 'render-event'//等到事件触发去渲染，此处我理解为是Puppeteer获取页面的时机
                })
            })
        ]
    }
},
  configureWebpack: {
    // 在webpack的name字段中提供应用的标题，以便可以在中访问它索引.html插入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
  },
  chainWebpack(config) {
    // config.plugins = [
    //   new PrerenderSPAPlugin({
    //     // Required - Routes to render.
    //     routes: [ '/', '/about', '/some/deep/nested/route' ],
    //   })
    // ]
    // config.plugin=[
    //   new PrerenderSPAPlugin({
    //       // 需要预渲染的页面，跟router路由一致
    //       routes: [ '/', '/dgTable' ],
    //   }),
    // ]
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
