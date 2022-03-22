//路由懒加载
import lazyLoad from '@/common/lazyLoad'
import MyIcon from "../assets/icon"
//其他地址,
export const mainRoutes = [
    {
        path: '/login',
        component: lazyLoad(() => import('@/pages/Login'))
    },
    {
        path: '/404',
        component: lazyLoad(() => import('@/pages/PageNotFound'))
    }
]

export const adminRoutes = [
    // 控制面板
    {
        path: '/admin/React',//组件相对路径
        name: 'React',//路由别名
        component: lazyLoad(() => import('@/pages/Dashboard')),//组件地址
        title: 'React',
        exact: true,//全匹配
        isShow: true,//是否显示
        icon: <MyIcon type="icon-react" />
    },
    {
        path: '/admin/AntDesign',//组件相对路径
        name: 'AntDesign',//路由别名
        component: lazyLoad(() => import('@/pages/Dashboard')),//组件地址
        title: 'AntDesign',
        exact: true,//全匹配
        isShow: true,//是否显示
        icon: <MyIcon type="icon-AntDesign" />
    },
    {
        path: '/admin/Vue',//组件相对路径
        name: 'Vue',//路由别名
        component: lazyLoad(() => import('@/pages/Dashboard')),//组件地址
        title: 'Vue',
        exact: true,//全匹配
        isShow: true,//是否显示
        icon: <MyIcon type="icon-vue" />
    },
    {
        path: '/admin/Element',//组件相对路径
        name: 'Element',//路由别名
        component: lazyLoad(() => import('@/pages/Dashboard')),//组件地址
        title: 'Element',
        exact: true,//全匹配
        isShow: true,//是否显示
        icon: <MyIcon type="icon-element" />
    },
    {
        path: '/admin/NodeJs',//组件相对路径
        name: 'NodeJs',//路由别名
        component: lazyLoad(() => import('@/pages/Dashboard')),//组件地址
        title: 'NodeJs',
        exact: true,//全匹配
        isShow: true,//是否显示
        icon:  <MyIcon type="icon-node-js" />
    },
]