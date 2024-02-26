const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const port = process.env.port || 8888;
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    https: false,
    open: {
      target: [`http://localhost:${port}`],
    },
    port: port,
    proxy: {
      /** 代维 */
      [process.env.VUE_APP_SERVER_PERFORM_API]: {
        target: process.env.VUE_APP_SERVER_PERFORM_Url,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_SERVER_PERFORM_API}`]: '',
        },
      },
      /** 权限 */
      [process.env.VUE_APP_SERVER_PERMISSION]: {
        target: process.env.VUE_APP_SERVER_PERMISSION_Url,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_SERVER_PERMISSION}`]: '',
        },
      },
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  },
  chainWebpack: config => {
    // 给svg规则增加⼀个排除选项
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, './src/assets/icons'));

    // 新增icons规则，设置svg-sprite-loader处理icons⽬录中的svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader');

    // config.resolve.alias.set('@img', path.resolve(__dirname, 'src/assets/img/'))
  },
});
