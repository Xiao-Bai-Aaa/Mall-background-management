import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import defaultRouter from "./modules/default.js";











  //获取原型对象上的push函数
  const originalPush = VueRouter.prototype.push
  //修改原型对象中的push方法
  VueRouter.prototype.push = function push(location) {
    // 调用原来的push函数，并捕获异常
    return originalPush.call(this, location).catch(err => err)
  }
  const routes = [...defaultRouter]
  const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
  })



  export default router
