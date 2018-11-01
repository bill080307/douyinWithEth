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
    methods: {
      init() {
        if(localStorage.getItem("lang")==null){
          let lang = navigator.language;
          lang = lang.toLowerCase();
          lang = lang.replace('-','_');
          //TODO 判断语言是否在国际化内，如果不在则是指为en。
          localStorage.setItem("lang",lang)
        }
        this.$i18n.locale = localStorage.getItem("lang");
        if ((typeof web3 !== 'undefined') && (typeof window.ipfs !== 'undefined')) {
          var Web3 = require('web3');
          var web3js = new Web3(web3.currentProvider);
          var video = new web3js.eth.Contract(this.$store.state.videoAbi, this.$store.state.videoAddress);
          this.$store.commit('setVideo', video);
          this.$store.commit('setDatabaseConnect', true);
          web3.eth.getAccounts((error, result) => {
            if (result.length > 0) {
              this.$store.commit('setUserAccount', result[0]);
            }
          })
        }
      }
    },
    created: function () {
      this.init();
    }
  }
</script>

<style>
  body, html {
    padding: 0;
    margin: 0;
  }

  #app {
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 800px;
  }

  #video {
    position: absolute;
    width: calc(100% - 360px);
    height: calc(100% - 150px);
    overflow: auto;
  }

  #videolist {
    position: absolute;
    width: calc(100% - 360px);
    height: 150px;
    bottom: 0;
    left: 0;
  }

  #userinfo {
    position: absolute;
    width: 360px;
    height: 130px;
    top: 0;
    right: 0;
  }

  #comment {
    position: absolute;
    width: 360px;
    height: calc(100% - 130px);
    top: 130px;
    right: 0;
  }

</style>
