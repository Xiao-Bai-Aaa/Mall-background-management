import { setItem, getItem, removeAllItem, removeItem } from '@/utils/storage.js'
import { MAIN_COLOR, DEFAULT_COLOR } from "@/utils/theme/index.js"
export default ({
    namespaced: true,
    state: {
        mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    },
    getters: {

    },
    mutations: {
        setColor(state, newColor) {
            state.mainColor = newColor
            setItem(MAIN_COLOR, newColor)
        },
    },
    actions: {
    },
    modules: {
    }
})