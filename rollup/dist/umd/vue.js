(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  /** 初始化 */
  let uid = 0;
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm._uid = uid++;

      vm._isVue = true; // merge optios

      if (options && options._isComponent) ;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
