var addConfig = require('./addConfig')
var fs = require('fs')
var path = require('path')

//输出
console.log('开始新建页面')
addConfig.forEach((ele) => {
    if (ele.open) {
        buildPage(ele)
    }
})
function buildPage(config) {
    var paths = path.resolve(`../src/views/${config.fileName}`);
    //构建目录
    fs.mkdir(paths, { recursive: true }, function (err) {
        if(err) throw err; // 如果出现错误就抛出错误信息
        var str = ''
        //表格页面
        fs.readFile(path.resolve(config.templatePath), 'utf8', (err, data) => {
            if (err) throw err;
            str = handleStr(data, config)
            fs.writeFile(paths + config.createFileName, str,(err) =>{})
            //路由地址  开始新增路由……
            if(config.isRoute){
                addRou(paths + config.createFileName, config)
            }
        })

    })
}
// 读取文件
function handleStr(str, config) {
    if (config.helloworld) {
        return str
    }
    str = str.replace('%addUrl%', config.requestPath.add)
    str = str.replace('%editUrl%', config.requestPath.edit)
    str = str.replace('%searchUrl%', config.requestPath.search)
    str = str.replace('%detailUrl%', config.requestPath.detail)

    return str
}
/**
 * 
 * @param {*} paths 路由文件路径
 * @param {*} config 路由
 */
function addRou(paths, config) {
    fs.readFile(path.resolve('./template-route.txt'), 'utf8', (err, data) => {
        if (err) throw err;
        var templateStr = handleRouStr(data, config, paths);
         // 添加到路由文件
        addToConf(templateStr)
    })
}

function handleRouStr(str, config, paths) {
    //路由访问路径
    str = str.replace(/%path%/g, `${config.routeName}/${config.fileName}`)
    //路由元信息设置
    str = str.replace(/%navTitle%/g, `${config.navTitle}`)
    str = str.replace(/%title%/g, `${config.title}`)
    //路由模块地址设置
    str = str.replace(/%component%/g, `@/views/${config.fileName + config.createFileName}`)
    return str
}

// 将路由添加到vue项目src下的routes.js文件里面：
function addToConf(str) {
    str += '// add-flag' // 添加的位置标记
    // addRoute.js 文件必须存在
    fs.readFile(path.resolve('../src/views/auto-build-page/addRoute.js'), 'utf8',(err,data) => {
        if (err) throw err;
        var confStr = handleConfRouStr(data, str);
        fs.writeFile(path.resolve('../src/views/auto-build-page/addRoute.js'), confStr  ,(err) =>{})
        console.log('结束生成页面')
        console.log('>>>>>>')
    })
   
}
function handleConfRouStr(ori, str) {
    ori = ori.replace('// add-flag', str)
    return ori
}