import router from "@/router"
export default {
    namespaced: true,
    state: {
        routerList: [] //存储所有的路由表信息
    },
    mutations: {
        changeRoute(state, newV) { state.routerList = newV }
    },
    actions: {
        insertRoute({
            commit
        }, res) {
            return new Promise((resolve, reject) => {
                // 动态生成路由
                res.menus.forEach((item, index) => { // 遍历菜单权限
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
                // 将生成的动态路由和静态路由赋值仓库state
                commit('changeRoute', router.getRoutes())
                resolve()
            })
        }
    }
}