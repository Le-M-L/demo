
const { Tapable, SyncBailHook } = require('Tapable')
class Compiler extends Tapable {
    constructor(context){
        super();
        this.context = context;
        this.hooks = {
            done: new AsyncSeriesHook(['stats']),// 当变异完成后会触发这个钩子执行
            // context 项目根目录的绝对路径 entry入口文件路径   加起来等于文件路径
            entryOption: new SyncBailHook(['context', 'entry']),
            make: new AsyncParallelHook(['compilation']), 
            beforeRun: new AsyncSeriesHook(['compiler']), // 运行前
            run: new AsyncSeriesHook(['compiler']), // 运行
            beforeCompile: new AsyncSeriesHook(['params']), // 编译前
            compile: new SyncBailHook(['params']), // 编译
            make: new AsyncParallelHook(['compilation']),    // 构建
            thisCompilation: new SyncBailHook(['compilation','params']),// 开始一次新的编译
            compilation: new SyncBailHook(['compilation','params']),// 创建完成一个新的compilation
            afterCompile: new AsyncSeriesHook(['compilation']) // 编译完成
        }
    }

    // run 方法是开始编译的入口
    run(callback){
        // 编译完成最终的回调
        const finalCallbakc = (err,stats) => {
            callback(err,stats)
        }
        // 完成编译
        const onCompiled = (err, compilation) => {
            finalCallbakc(err, {
                entries: [], // 显示所有的入口
                chunks: [], // 显示所有的代码块
                modules: [], // 显示所有模块
                assets: [], // 显示所有打包后的资源, 也就是文件
            })
        }
        this.hooks.beforeRun.callAsync(this, err => {
            this.hooks.run.callAsync(this, err => {
                this.compile(onCompiled)
            })
        })
    }

    compile(callback){

    }
}

module.exports = Compiler