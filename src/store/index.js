import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    databaseConnect: false,
  },
  mutations: {
    setDatabaseConnect(state, visible){
      state.databaseConnect = visible
    }
  },
  actions: {
  }
})
