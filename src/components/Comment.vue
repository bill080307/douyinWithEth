<template>
  <div class="comment" v-show="databaseConnect">
    <p>{{ $t("message.comment") }}</p>
    <ul>
      <li v-for="item in list">
        <div class="user">
          <router-link to="/">{{ item.author | addressab }}</router-link>
        </div>
        <div class="date">
          <span class="pub">{{ item.pubtime | formatDate }}</span>
          <span class="vidoe">{{ item.vidoetime | formatvideotime }}</span>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </li>
    </ul>
    <div class="newcomment">
      <textarea v-model="content"></textarea><br>
      <input type="number" v-model="vidoetime" :max="duration"/>
      <button @click="publish">publish</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    data() {
      return {
        vidoetime: 0,
        duration: 0,
        content: '',
        videoid: null,
        commentsNum: null,
        list: [],
      }
    },
    methods: {
      init() {

        this.videoid = this.$store.state.videoId;
        const video = this.$store.state.video;
        video.methods.getVideoPreview(this.videoid).call().then((res) => {
          this.commentsNum = res.commentsNum;
          this.list = [];
          for (var i = 0; i < this.commentsNum; i++) {
            video.methods.getVideoComment(this.videoid, i).call().then((res) => {
              this.list.push({
                author: res.author,
                content: res.content,
                pubtime: res.timestamp,
                vidoetime: res.videotimestamp,
              });
            });
          }
        });
      },
      publish() {
        const v=document.getElementById("player");
        this.vidoetime = Math.floor(v.currentTime*1000);
        if (this.content == '') return;
        if (this.vidoetime > this.$store.state.videoTime) return;
        const video = this.$store.state.video;
        video.methods.makeComment(this.videoid, this.vidoetime, this.content).send({
          from: this.$store.state.userAccount
        }).then();
      }
    },
    created: function () {
      if (this.$store.state.databaseConnect && this.$store.state.videoId) {
        this.init();
      }
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      },
      videoId() {
        return this.$store.state.videoId
      }
    },
    watch: {
      videoId() {
        if (this.$store.state.videoId) {
          this.init();
        }
      }
    }
  }
</script>

<style scoped>
  .comment {

  }

  .comment ul {
    list-style-type: none;
    padding: 0;
    overflow: auto;
  }

  .newcomment {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 80px;
    width: 360px;
  }
</style>
