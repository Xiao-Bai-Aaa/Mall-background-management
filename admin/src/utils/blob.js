/* util.js */
// 把文件按照二进制进行读取
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader()
        // 把当前文件以二进制进行读取
        reader.readAsBinaryString(file)
        // 读完返回文件数据
        reader.onload = ev => {
            resolve(ev.target.result)
        }
    })
}





// 用户表字段对应表{username,password,status,roleid}
export let userCharacter = {
    username: {
        text: '管理员姓名',
        type: 'string'
    },
    password: {
        text: '管理员密码',
        type: 'string'
    },
    status: {
        text: '管理员状态',
        type: 'number'
    },
    roleid: {
        text: '管理员角色',
        type: 'number'
    }
}

// 时间字符串格式化
export function formatTime(str, template) {
    let arr = str.match(/\d+/g).map(item => {
        return item.length < 2 ? '0' + item : item
    })
    template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒'
    return template.replace(/\{(\d+)\}/g, (_, group) => {
        return arr[group] || '00'
    })
}