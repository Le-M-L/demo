import { mergeOptions } from "../util/index"


/** 初始化 */
let uid = 0;
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;

    /**
     * startTag 开始标签
     * endTag   结束标签
     */
    let startTag, endTag;

    // 用于避免被观察  observed
    vm._isVue = true;
    // merge optios
    if (options && options._isComponent) {
    } else {
      // 合并
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
  };
}


function resolveConstructorOptions(){

}