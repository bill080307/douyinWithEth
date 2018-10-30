<template>
  <div class="videolist" v-show="databaseConnect">
    <ul>
      <li v-for="item in list">
        <router-link :to="'/video/'+item.videoid">
          <img :src="item.cover">
          <p class="title">{{ item.title }}</p>
          <p class="info">
            <span class="time">{{ item.time | formatDate }}</span>
            <span class="gratuity">{{ item.gratuity }}</span>
            <span class="comment">{{ item.comment }}</span>
          </p>
        </router-link>
      </li>
    </ul>
    <div class="button">
      <button @click="previous">Previous</button>
      <button @click="next">Next</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Videolist',
    data() {
      return {
        videoNum: 0,
        list: [],
      }
    },
    methods: {
      init() {
        const video = this.$store.state.video;
        video.methods.videoNum().call().then((res) => {
          console.log(res);
          this.videoNum = res;
          this.refresh();
        });
      },
      refresh() {
        const video = this.$store.state.video;
        let num = this.videoNum - 1;

        this.list = [];
        while ( num > this.videoNum - 5 && num >= 0) {
          let cnum = num;
          video.methods.getVideoPreview(num).call().then((res) => {
            this.list.push({
              title: res.title,
              cover: '/ipfs/'+res.cover,
              time: res.timestamp,
              gratuity: res.gratuityNum,
              comment: res.commentsNum,
              videoid: cnum
            });
          });
          num--;
        }
      },
      previous() {
        if (this.videoNum - 5 > 0) this.videoNum -= 5;
        console.log(this.videoNum);
        this.refresh();
      },
      next() {
        const video = this.$store.state.video;
        video.methods.videoNum().call().then((res) => {
          console.log(this.videoNum);
          if (this.videoNum + 5 < res) this.videoNum += 5;
          this.refresh();
        });

      }
    },
    created: function () {
      if (this.$store.state.databaseConnect) {
        this.init();
      }
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      }
    },
    filters: {}
  }
</script>

<style scoped>
  .videolist {
  }

  .videolist ul {
    list-style-type: none;
    padding: 0;
    overflow: auto;
    height: 400px;
  }

  .videolist li {
    width: 200px;
    float: left;
    margin: 0;
  }

  .videolist img {
    max-width: 100px;
    max-width: 60px;
  }

  .button {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
