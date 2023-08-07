import {
    getData,
    postData
} from "./config.js"
// 1.-----------------------------post-------------------------------
export const req = (params) => { return postData('', params) }
// 2.-----------------------------get-------------------------------
export const get = (params) => { return getData('', params) }
// 登录
export const reqLogin = (params) => { return postData('/api/userlogin', params) }

//菜单管理
// 菜单列表
export const getMenuList = (params) => { return getData('/api/menulist', params) }
// 菜单管理添加
export const menuAdd = (params) => { return postData('/api/menuadd', params) }
// 菜单管理删除
export const menuDelete = (params) => { return postData('/api/menudelete', params) }
//菜单修改
export const menuEdit = (params) => { return postData('/api/menuedit', params) }


//角色管理
// 角色列表
export const getRoleList = (params) => { return getData('/api/rolelist', params) }
// 角色添加
export const roleAdd = (params) => { return postData('/api/roleadd', params) }
//角色修改
export const roleEdit = (params) => { return postData('/api/roleedit', params) }
// 角色删除
export const roleDelete = (params) => { return postData('/api/roledelete', params) }


//管理员管理
// 管理员列表
export const getUserList = (params) => { return getData('/api/userlist', params) }
// 管理员添加
export const userAdd = (params) => { return postData('/api/useradd', params) }
//管理员修改
export const userEdit = (params) => { return postData('/api/useredit', params) }
// 管理员删除
export const userDelete = (params) => { return postData('/api/userdelete', params) }
// 管理员总数
export const getUserCount = () => { return getData('/api/usercount') }


//商城管理
// 商品分类列表
export const getcateList = (params) => { return getData('/api/catelist', params) }
// 商品分类添加
export const cateAdd = (params) => { return postData('/api/cateadd', params, true) }
//商品分类修改
export const cateEdit = (params) => { return postData('/api/cateedit', params, true) }
// 商品分类删除
export const cateDelete = (params) => { return postData('/api/catedelete', params) }


//商品规格
// 商品规格列表
export const getspecsList = (params) => { return getData('/api/specslist', params) }
// 商品规格添加
export const specsAdd = (params) => { return postData('/api/specsadd', params) }
//商品规格修改
export const specsEdit = (params) => { return postData('/api/specsedit', params) }
// 商品规格删除
export const specsDelete = (params) => { return postData('/api/specsdelete', params) }
// 商品规格总数
export const getspecsCount = () => { return getData('/api/specscount') }

//商品管理
// 商品管理列表
export const getgoodsList = (params) => { return getData('/api/goodslist', params) }
// 商品管理添加
export const goodsAdd = (params) => { return postData('/api/goodsadd', params, true) }
//商品管理修改
export const goodsEdit = (params) => { return postData('/api/goodsedit', params, true) }
// 商品管理删除
export const goodsDelete = (params) => { return postData('/api/goodsdelete', params) }
// 商品管理总数
export const getgoodsCount = () => { return getData('/api/goodscount') }


// 9.-----------------------------excel-------------------------------
export const reqAddEXcel = (params, fn) => postData("/api/useradds", params, true, fn)

export const reqSend = () => getData("/api/speart") //发送请求