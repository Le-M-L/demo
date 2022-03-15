import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

let app = null;

/** 渲染函数 */

function render({appContent, loading} = {}){
  if(!app){

  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
