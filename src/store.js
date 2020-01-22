import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gateway:'',
    dikTok:null,
    userAccount:null,
    ipfsNode:null,
    isconnectEth: false,
    isloginEth:false
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
    setIsconnectEth(state, visible){
      state.isconnectEth = visible
    },
    setIsloginEth(state, visible){
      state.isloginEth = visible
    },
  },
  actions: {

  }
})
