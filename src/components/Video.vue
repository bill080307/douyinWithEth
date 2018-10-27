<template>
  <div class="video">
    <video :src="videofile" controls="controls"></video>
    <div class="videoinfo">
      <h1>{{ title }}</h1>
      <p class="description">{{ description }}</p>
      <span class="fileinfo">{{ fileinfo }}</span>
      <span>
          <input type="number" v-model="textgratuity"/>finney
        <button @click="gratuity">gratuity</button>
        <input type="text" v-model="textlable"/>
        <button @click="lable">lable</button>
        <button @click="share">share</button>
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
        description: 'description',
        fileinfo: '',
        videofile: '',
        textgratuity: 1,
        textlable: '',
        videoid: 0,
      }
    }, methods: {
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
          ipfs.files.get(res.videofile, (err, files) => {
            let blob = new Blob([files[0].content]);
            this.videofile = URL.createObjectURL(blob);
          })
          console.log(res);
        });
      },
      preview() {

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
      share() {

      }
    },
    created: function () {
      if (this.$store.state.databaseConnect) {
        this.init();
      } else {
        this.preview();
      }
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      },
    }
  }
</script>

<style scoped>
  .video {
    padding-right: 360px;
    padding-bottom: 180px;
    overflow: auto;
  }

  video {
    width: 100%;
  }
</style>
