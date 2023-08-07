import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import getters from './getters.js'
import tag from './modules/tag.js'
import theme from './modules/theme.js'
import routes from './modules/router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tag,
    theme,
    routes
  },
  getters
})
