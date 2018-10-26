import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    databaseConnect: false,
      videoAbi:[{"constant": false,"inputs": [{"name": "_videoId","type": "uint256"},{"name": "_videotimestamp","type": "uint256"},{"name": "_comment","type": "string"}],"name": "makeComment","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_videoId","type": "uint256"},{"name": "_lable","type": "string"}],"name": "makeLable","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_title","type": "string"},{"name": "_cover","type": "string"},{"name": "_videofile","type": "string"},{"name": "_videoinfo","type": "string"},{"name": "_info","type": "string"}],"name": "publish","outputs": [{"name": "articleId","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_videoId","type": "uint256"}],"name": "reward","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_nickname","type": "string"},{"name": "_profile","type": "string"},{"name": "_avatar","type": "string"}],"name": "setMyInfo","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_userAdd","type": "address"}],"name": "getUserInfo","outputs": [{"name": "nickname","type": "string"},{"name": "info","type": "string"},{"name": "avatar","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_videoId","type": "uint256"}],"name": "getVideo","outputs": [{"name": "title","type": "string"},{"name": "videofile","type": "string"},{"name": "videoinfo","type": "string"},{"name": "info","type": "string"},{"name": "timestamp","type": "uint256"},{"name": "author","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_videoId","type": "uint256"},{"name": "_commentId","type": "uint256"}],"name": "getVideoComment","outputs": [{"name": "content","type": "string"},{"name": "timestamp","type": "uint256"},{"name": "videotimestamp","type": "uint256"},{"name": "author","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_videoId","type": "uint256"},{"name": "_lableId","type": "uint256"}],"name": "getVideoLable","outputs": [{"name": "lable","type": "string"},{"name": "times","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_videoId","type": "uint256"}],"name": "getVideoPreview","outputs": [{"name": "title","type": "string"},{"name": "cover","type": "string"},{"name": "timestamp","type": "uint256"},{"name": "author","type": "address"},{"name": "commentsNum","type": "uint256"},{"name": "gratuityNum","type": "uint256"},{"name": "gratuitySum","type": "uint256"},{"name": "lableNum","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "videoNum","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}],
      videoAddress:"0x0922680980c9a2f2d41f41082c381b9f3716d8f3",
      video:null,
      userAccount:null,
  },
  mutations: {
    setDatabaseConnect(state, visible){
      state.databaseConnect = visible
    },
      setVideo(state, visible){
          state.video = visible
      },
      setUserAccount(state, visible){
          state.userAccount = visible
      }
  },
  actions: {
  }
})
