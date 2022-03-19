const { EntryOptionPlugin } = require("./EntryOptionPlugin");

/**
 * 挂载各种各样的内置插件
 */
class webpackOptionsApply{
    process(options, compiler){
        // 注册插件
        new EntryOptionPlugin().apply(compiler);
        // 触发 entryOption钩子 context 也就是根目录的路径 entry入口 './src/index.js'
        compiler.hooks.entryOption.call(options.context, options.entry)
    }
}

module.exports = webpackOptionsApply;