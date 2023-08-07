import { setItem, getItem, removeAllItem, removeItem } from '@/utils/storage.js'
import router from "@/router"
export default ({
    namespaced: true,
    state: {
        tags: new Set(['{ "title": "首页", "path": "/" }']),//全部路由导航标签数据
        activeIndex: 0,//默认激活导航下标
    },
    getters: {

    },
    mutations: {
        insertTags(state, tagValue) {
            // if (state.tags.has(tagValue)) {
            //     // 查找元素的索引
            //     return
            // }
            !state.tags.has(tagValue) && state.tags.add(tagValue)
            state.tags = new Set([...state.tags])
            const tagsArray = Array.from(state.tags);
            const index = tagsArray.indexOf(tagValue);
            state.activeIndex = index
        },
        deleteTags(state, tagValue) {
            state.tags.has(tagValue) && state.tags.delete(tagValue)
            state.tags = new Set([...state.tags])
            state.activeIndex = [...state.tags].length - 1
            router.push(JSON.parse([...state.tags][state.activeIndex]).path)
        },
        updateIndex(state, index) {
            state.activeIndex = index
        }
    },
    actions: {
        addTags(content, tagValue) {
            if (tagValue.title == '首页') {
                return
            }
            content.commit('insertTags', JSON.stringify(tagValue))
        },
        removeTags(content, tagValue) {
            content.commit('deleteTags', JSON.stringify(tagValue))
        },
        editIndex(content, index) {
            content.commit('updateIndex', index)
        }
    },
    modules: {
    }
})