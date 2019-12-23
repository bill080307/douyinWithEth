import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gateway:'',
    diktok:null,
    userAccount:null,
    ipfsNode:null,
  },
  mutations: {
    setGateWay(state, visible){
      state.gateway = visible
    },
    setDikTok(state, visible){
      state.dikTok = visible
    },
    setUserAccount(state, visible){
      state.userAccount = visible
    },
    setIpfsNode(state, visible){
      state.ipfsNode = visible
    },
  },
  actions: {

  }
})
