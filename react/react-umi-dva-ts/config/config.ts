import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import routes from './routes';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  hash: true,
  //   设置 node_modules 目录下依赖文件的编译方式。
  nodeModulesTransform: { type: 'none' },
  // 开启dva
  dva: {
    // 启用dva 热重载
    hmr: true,
  },
  // 路由配置
  routes,
  // Fast Refresh 热更新
  fastRefresh: {},
  // 布局配置
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // 懒加载组件
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // 兼容浏览器 最低IE11
  targets: {
    ie: 11,
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  // 使用 esbuild 作为压缩器。
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: 'hi',
  // 开启 mfsu 功能并添加相关配置。  开启该功能将会自动开启 webpack5 和 dynamicImport.
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  antd: {},
  //   忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // 配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json。
  manifest: {
    basePath: '/',
  },
});
