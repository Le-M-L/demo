const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: 9091,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('com',resolve('common/src'))
  },
  // 自定义webpack配置
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     "com": resolve("../../common/src"),
    //   },
    // },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  // plugins:{
  //   'postcss-selector-namespace':{
  //     namespace(css){
  //       if(css.includes('element-variables.scss')) return '';
  //       return '.single-spa-vue'; // 返回要添加的类名
  //     }
  //   }
  // }
};
