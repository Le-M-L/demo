
const { Tapable, SyncBailHook } = require('Tapable')
class Compiler extends Tapable {
    constructor(context){
        super();
        this.context = context;
        this.hooks = {
            done: new AsyncSeriesHook(['stats']),// 当变异完成后会触发这个钩子执行
            // context 项目根目录的绝对路径 entry入口文件路径   加起来等于文件路径
            entryOption: new SyncBailHook(['context', 'entry']),
            make: new AsyncParallelHook(['compilation']), // 
        }
    }

    // run 方法是开始编译的入口
    run(callback){
        callback(null,{
            toJson(){
                return {
                    entries: [], // 显示所有的入口
                    chunks: [], // 显示所有的代码块
                    modules: [], // 显示所有模块
                    assets: [], // 显示所有打包后的资源, 也就是文件
                }
            }
        })
    }
}

module.exports = Compiler