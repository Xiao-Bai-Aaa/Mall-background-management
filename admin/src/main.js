import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './utils/lang/index'; //引入国际化语言包
import "../src/assets/css/reset.css";
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
Vue.use(iconPicker);



//引入权限
import "@/utils/permission.js"

//全局过滤器
import filterPlg from "@/filter/index.js";
// console.log(filterPlg);
Vue.use(filterPlg)



Vue.config.productionTip = false //阻止启动生产消息，常用作指令。

//数据请求
import * as api from "./serve/index.js";
Vue.prototype.$api = api;


Vue.prototype.$BUS = new Vue() //创建一个空的vue实例，用于组件之间的传值

import element from "./utils/element/index"
Vue.use(element)

//全局组件
import { myAaa, mycount } from "@/components/aaa.js";
Vue.use(myAaa);
Vue.use(mycount);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')