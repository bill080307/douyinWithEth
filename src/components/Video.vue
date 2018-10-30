<template>
  <div class="video">
    <video :src="videofile" controls="controls"></video>
    <h1>{{ title }}</h1>
    <div class="videoinfo" v-show="databaseConnect">
      <p class="description">{{ description }}</p>
      <span class="fileinfo">{{ fileinfo }}</span>
      <span>
          <input type="number" v-model="textgratuity"/>finney
        <button @click="gratuity">gratuity</button>
        <input type="text" v-model="textlable"/>
        <button @click="lable">lable</button>
        <router-link :to="'/share/'+videoid">share</router-link>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Video',
    data() {
      return {
        title: '',
        description: '',
        fileinfo: '',
        videofile: '',
        textgratuity: 1,
        textlable: '',
        videoid: 0,
      }
    },
    methods: {
      init() {
        this.videoid = this.$route.params.id;
        this.$store.commit('setVideoId', this.videoid);
        const video = this.$store.state.video;
        video.methods.getVideo(this.videoid).call().then((res) => {
          this.$store.commit('setCommentsNum', res.commentsNum);
          this.title = res.title;
          this.description = res.info;
          const info = JSON.parse(res.videoinfo);
          if (info.duration > 0) {
            this.$store.commit('setVideoTime', info.duration);
          }
          //TODO 视频信息显示
          this.videofile = '/ipfs/'+res.videofile
        });
      },
      preview() {
        this.videofile = '/ipfs/'+this.$route.params.path;
        this.title=this.$route.params.title;
      },
      gratuity() {
        const video = this.$store.state.video;
        video.methods.reward(this.videoid).send({
          from: this.$store.state.userAccount,
          value: this.textgratuity * 1E+15
        }).then();
      },
      lable() {
        if (this.textlable == '') return;
        const video = this.$store.state.video;
        video.methods.makeLable(this.videoid, this.textlable).send({
          from: this.$store.state.userAccount
        }).then();
      },
    },
    created: function () {
      if (this.$store.state.databaseConnect&&this.$route.params.id) {
        this.init();
      } else {
        this.preview();
      }
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      },
    },
    watch:{
      $route(to,from){
        this.init();
      }
    }
  }
</script>

<style scoped>
  .video {

  }

  video {
    width: 100%;
  }
</style>
