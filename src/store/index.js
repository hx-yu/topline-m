import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
