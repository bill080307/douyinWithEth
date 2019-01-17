import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gateway:'',

  },
  mutations: {
    setGateWay(state, visible){
      state.gateway = visible
    },

  },
  actions: {

  }
})
