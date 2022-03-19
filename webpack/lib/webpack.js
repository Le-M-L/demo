const Compiler = require("./Compiler");
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require("./WebpackOptionsApply");
const webpack = (options, callback) => {
  const compiler =   new Compiler(); // 创建一个Compiler 实例
  compiler.options = options;   // 给它赋于一个options属性
  new NodeEnvironmentPlugin().apply(compiler);// 让Compiler可以读文件和写文件
  // 挂载配置文件里提供的所有的plugins
  if(options.plugins && Array.isArray(options.plugins)){
      for(const plugin of options.plugin){
          plugin.apply(compiler)
      }
  }
  new WebpackOptionsApply().apply(compiler)
  return compiler
}

exports = module.exports = webpack;