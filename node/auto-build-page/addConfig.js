const addConfig = [
    {
        //测试生成表格页
        open: true,//参与生成false 表示改配置不参与生成页面
        routeName: '',//路由访问名
        isRoute:true, //是否生成路由
        fileName: 'autoTablepage',//创建的文件夹名称 和 路由访问名
        requestPath: {  //表格数据请求相关
            search: '',
            detail: '',
        },
        templatePath:'./template-table.vue', //模板地址
        createFileName:'/index.vue',//生成文件名
        navTitle:'统一分拨受理系统',//路由元信息设置  面包削
        title:'事件上报', //路由元信息设置  面包削
    },
    {
        open: true,
        fileName: 'autoTablepage',
        requestPath: {  
            edit: "",
            add: "",
        },
        templatePath:'./template-add.vue',
        createFileName:'/add.vue',
    },
    {
        open: true,
        fileName: 'autoTablepage',
        requestPath: {  
            detail: "",
        },
        templatePath:'./template-detail.vue',
        createFileName:'/detail.vue',
    },
]
module.exports = addConfig