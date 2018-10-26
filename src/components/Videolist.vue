<template>
  <div class="videolist" v-show="databaseConnect">
    <ul>
      <li v-for="n in 5">
        <router-link to="/">
          <img src="../assets/logo.png" alt="">
          <p class="title">{{ title }}</p>
          <p class="info">
            <span class="time">{{ time | formatDate }}</span>
            <span class="gratuity">{{ gratuity }}</span>
            <span class="comment">{{ comment }}</span>
          </p>
        </router-link>
      </li>
    </ul>
    <div class="button">
      <button>Previous</button>
      <button>Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Videolist',
  data () {
    return {
        videoNum:0,
      title: 'video title',
      time: '1540441233',
      gratuity:'12',
      comment:'32'
    }
  },
    methods:{
        init(){
            const video = this.$store.state.video;
            video.methods.videoNum().call().then((res)=>{
                this.videoNum = res;
            });
        }
    },
    created:function () {
        if(this.$store.state.databaseConnect){
            this.init();
        }
    },
  computed:{
    databaseConnect() {
      return this.$store.state.databaseConnect
    }
  },

  filters:{
  }
}
</script>

<style scoped>
  .videolist{
  }
  .videolist ul{
    list-style-type: none;
    padding: 0;
    overflow: auto;
    height: 400px;
  }
  .videolist li{
    width: 200px;
    float: left;
    margin: 0;
  }
  .videolist img{
    max-width: 100px;
    max-width: 60px;
  }
  .button{
    position: absolute;
    right: 230px;
    top: 0;
  }
</style>
