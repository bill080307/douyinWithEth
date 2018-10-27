<template>
  <div id="app">
    <div id="video">
      <router-view/>
    </div>
    <div id="videolist">
      <Videolist></Videolist>
    </div>
    <div id="userinfo">
      <Userinfo></Userinfo>
    </div>
    <div id="comment">
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
import Userinfo from "./components/Userinfo";
import Comment from "./components/Comment";
import Videolist from "./components/Videolist";
export default {
  name: 'App',
  components: {Videolist, Comment, Userinfo},
  methods:{
    init(){
        if((typeof web3 !== 'undefined')&&(typeof window.ipfs !== 'undefined')){
            var Web3 = require('web3');
            var web3js = new Web3(web3.currentProvider);
            var video = new web3js.eth.Contract(this.$store.state.videoAbi, this.$store.state.videoAddress);
            this.$store.commit('setVideo', video);
            this.$store.commit('setDatabaseConnect', true);
            web3.eth.getAccounts((error, result) => {
                if(result.length>0){
                    this.$store.commit('setUserAccount', result[0]);
                }
            })
        }
    }
  },
  created:function () {
    this.init();
  }
}
</script>

<style>
  body,html{
    padding: 0;
    margin: 0;
  }
  #app {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  #video {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-right: 100px;
  }
  #videolist{
    position: fixed;
    width: 100%;
    height: 180px;
    bottom: 0;
    right: 0;
  }
  #userinfo{
    position: fixed;
    width: 360px;
    height: 130px;
    top: 0;
    right: 0;
  }
  #comment{
    position: fixed;
    width: 360px;
    height: 100%;
    top: 0;
    right: 0;
    margin-top: 130px;
  }

</style>
