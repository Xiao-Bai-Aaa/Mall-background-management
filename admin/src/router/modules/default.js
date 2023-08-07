// import home from '@/views/admin/index.vue'
import layout from '@/layout/index.vue'
export default ([
    {
        path: '/',
        name: 'layout',
        component: layout,
        redirect: '/siteSettings',  // 重定向:重新指向其它path,会改变网址
        // redirect: '/home',  // 重定向:重新指向其它path,会改变网址
        // children: [
        //     {
        //         path: '/home',
        //         name: 'home',
        //         component: () => import('@/views/admin/home/home.vue'),
        //     },
        //     {
        //         path: '/siteSettings',
        //         name: 'siteSettings',
        //         component: () => import('@/views/admin/baseSettings/siteSettings/index.vue'),
        //         meta: {
        //             title: '网站设置',
        //             parent: '基础设置'
        //         }
        //     },
        //     {
        //         path: '/timeline',
        //         name: 'timeline',
        //         component: () => import('@/views/admin/baseSettings/timeline/index.vue'),
        //         meta: {
        //             title: '时间轴',
        //             parent: '基础设置'
        //         }
        //     },
        //     {
        //         path: "/menu",
        //         name: "menu",
        //         component: () => import("@/views/admin/system/menu/index.vue"),
        //         meta: {
        //             title: '菜单管理',
        //             parent: '系统设置'
        //         }
        //     },
        //     {
        //         path: "/role",
        //         name: "role",
        //         component: () => import("@/views/admin/system/role/index.vue"),
        //         meta: {
        //             title: '角色管理',
        //             parent: '系统设置'
        //         }
        //     },
        //     {
        //         path: "/user",
        //         name: "user",
        //         component: () => import("@/views/admin/system/user/index.vue"),
        //         meta: {
        //             title: '管理员管理',
        //             parent: '系统设置'
        //         }
        //     }
        // ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/404/index.vue')
    }
])