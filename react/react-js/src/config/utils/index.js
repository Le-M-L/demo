// @ts-nocheck
import { unref } from 'vue';
import { isObject } from '/@/config/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node) {
  return node?.parentNode ?? document.body;
}
/**
 * 将对象作为参数添加到URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
//拷贝合并
export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(url, opt) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key]);
  });

  return ret;
}
/**
 * set page Title
 * @param {*} title  :page Title
 */
function setDocumentTitle(title) {
  document.title = title;
  const ua = navigator.userAgent;
  const regex = /\bMicroMessenger\/([\d.]+)/;
  // 兼容
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}

export function setTitle(title, appTitle) {
  if (title) {
    const _title = title ? ` ${title} - ${appTitle} ` : `${appTitle}`;
    setDocumentTitle(_title);
  }
}

export function getRawRoute(route) {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined,
  };
}

/**
 * 导入模块
 * require.context('./modules', false, /\.js$/)
 * @param {*} context
 */
export const importAll = (context) => {
  const map = {};
  for (const key of context.keys()) {
    if (key.indexOf('src') == -1) {
      const keyArr = key.split('/');
      keyArr.shift(); // 移除.
      map[
        keyArr
          .join('.')
          .replace(/\.js$/g, '')
          .replace(/\.vue$/g, '')
      ] = context(key);
    }
  }
  return map;
};

