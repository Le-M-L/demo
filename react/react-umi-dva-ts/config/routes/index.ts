import adminRoutes from './admin'; // 后台管理 路由
import gameRoutes from './game'; // 前台页面 路由

export default [
  { path: '/', redirect: '/admin' },
  // { path: '/login', component: './login', },
  ...adminRoutes,
  ...gameRoutes,
];
