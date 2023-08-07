import server from "@/utils/request";
import qs from "qs"; //引入qs模块，用来序列化post类型的数据
/**
 * get 请求封装
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const getData = (url, params) => {
    return server.get((url), { params })
}

/**
 * post请求封装
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const postData = (url, params, isFile = false, onUploadProgress = () => { }) => {

    let data = null
    //检测是否有文件上传请求
    if (isFile) {
        data = new FormData()
        for (let key in params) {
            data.append(key, params[key])
        }
    } else {
        data = qs.stringify(params)
    }
    // return server.post(url, data)
    return server({
        method: "post",
        url,
        data,
        onUploadProgress //上传进度
    })
}
