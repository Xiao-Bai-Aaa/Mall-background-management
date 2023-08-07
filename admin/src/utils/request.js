//1.引入基础模块
import axios from "axios"
import { Message } from "element-ui"
import store from "../store/index.js"
import router from "../router/index.js"
//2.创建实例
const server = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
})

let cancelArr = [] //存储取消请求的数组
//3.设置请求拦截
server.interceptors.request.use((config) => {
    let token = store.getters.users.token
    token && (config.headers.Authorization = token)
    //取消重复请求
    cancelArr = cancelArr.filter(item => {
        if (item.url == config.url && item.method == config.method && config.method == "post") {
            item.cancel()
            return false
        }
        return true
    })
    //取消请求
    config.cancelToken = new axios.CancelToken((cancel) => {
        cancelArr.push({
            url: config.url,
            method: config.method,
            cancel
        })
    })

    return config
}, (err) => { })

//4.设置响应拦截
server.interceptors.response.use(res => {
    let { msg, code, list } = res.data
    if (code === 200) {
        return list
    } else if (403 == code) {
        Message({ type: "warning", message: msg })
        store.commit("user/outLogin")
        router.replace('/login')
    } else if (500 == code) {
        Message({ type: "warning", message: msg })
        return Promise.reject(msg)
    }
}, err => {
    return err
})

export default server