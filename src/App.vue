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
import global_ from "./components/Global";
export default {
  name: 'App',
  components: {Videolist, Comment, Userinfo},
  methods:{
    init(){
      global_.databaseConnect = true
    }
  },
  created:function () {
    this.init();
    console.log(this.$store.state.menuVisible)
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
    width: 230px;
    height: 130px;
    top: 0;
    right: 0;
  }
  #comment{
    position: fixed;
    width: 230px;
    height: 100%;
    top: 0;
    right: 0;
    margin-top: 130px;
  }

</style>
