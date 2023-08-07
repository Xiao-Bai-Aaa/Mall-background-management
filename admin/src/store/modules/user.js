import { setItem, getItem, removeAllItem, removeItem } from '@/utils/storage.js'
import { reqLogin } from "@/serve/index.js";
import router from '@/router'
export default ({
    namespaced: true,
    state: {
        // token: getItem('token') || '',
        // userinfo: getItem('userinfo') || '',

        users: getItem('users') || {}
    },
    getters: {

    },
    mutations: {
        setAdmin(state, res) {
            state.users = res
            setItem('users', res)
        },
        outLogin(state) {
            state.users = {}
            removeAllItem('users')
        }
    },
    actions: {
        // 登录
        login({ commit }, newV) {
            return new Promise((resolve, reject) => {
                reqLogin(newV).then(res => {
                    commit("setAdmin", res);
                    resolve(res)
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
                })
            })
        }
    },
    modules: {
    }
})