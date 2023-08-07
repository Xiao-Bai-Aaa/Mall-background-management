
import router from '@/router'
import store from "@/store/index.js";
import { Message } from 'element-ui';


import nprogress from 'nprogress' //引入进度条
import "nprogress/nprogress.css" //引入进度条样式


nprogress.configure({
    easing: 'ease', // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 300, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});


let menus = store.getters.users.menus // 获取用户的菜单权限
// let menus = res.menus // 获取用户的菜单权限
if (menus) { // 如果有权限，就动态添加路由
    menus.forEach((item, index) => { // 遍历菜单权限
        if (item.children && item.children.length > 0) { // 如果有子菜单
            item.children.forEach((m, i) => { // 遍历子菜单
                router.addRoute('layout', { // 添加路由
                    path: m.url.split('/')[1], // /menu
                    component: () => import(`@/views/${m.url.split('/')[1]}/index.vue`), // 路由懒加载 
                    meta: {
                        title: m.title,
                        parent: item.title
                    }
                })
            })
        }
    })
}





const routes = [
    {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/siteSettings',
        component: () => import('@/views/siteSettings/index.vue'),
        meta: {
            title: '网站设置',
            parent: '基础设置'
        }
    },
    {
        path: '/timeline',
        component: () => import('@/views/timeline/index.vue'),
        meta: {
            title: '时间轴',
            parent: '基础设置'
        }
    }
];

routes.forEach(route => {
    router.addRoute('layout', route);
});









// 前置路由守卫

router.beforeEach(async (to, from, next) => {
    nprogress.start()
    document.title = to.meta.title || '商城后台管理系统'
    let token = store.getters.users.token
    if (!token) {
        to.path == '/login' ? next() : next('/login')
    } else {

        let routerList = store.getters.routerList
        if (routerList.length == 0) {
            // console.log(routerList.length)
            await store.dispatch('routes/insertRoute', store.getters.users)
            return next(to.path)
        }

        //2.2如果已经登录但是用户取得是登录页面强制跳转回到首页
        to.path == '/login' && next('/')
        //2.3.检测是否有路由权限
        let allowPeissions = [...store.getters.users.menus_url, '/login', '/', '/home', '/404', '/siteSettings', '/timeline']
        if (!allowPeissions.includes(to.path)) {
            Message({
                type: "warning",
                message: "非法访问，速回！"
            })
            next('/')
        } else {
            next()
        }
    }
})

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    nprogress.done();
});

