import aaa from './aaa.vue';

export const myAaa = {
    install(Vue) {
        Vue.component('my-aaa', aaa)
    }
}

const count = () => {
    console.log(111);
}


export const mycount = {
    install(Vue) {
        Vue.prototype.$count = count
    }
}