import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),
    keepPages: ['Tabbar']
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      setItem('user', state.user)
    },
    addKeepPages (state, name) {
      const flag = state.keepPages.includes(name)
      if (!flag) {
        state.keepPages.push(name)
      }
    },
    removeKeepPages (state, name) {
      const index = state.keepPages.indexOf(name)
      if (index !== -1) {
        state.keepPages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
