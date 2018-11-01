<template>
  <div class="videolist" v-show="databaseConnect">
    <div class="list">
      <ul>
        <li v-for="item in sortlist">
          <router-link :to="'/video/'+item.videoid">
            <div class="img"><img :src="item.cover"></div>
            <p class="title">{{ item.title }}</p>
            <p class="info">
              <span class="time">{{ item.time | formatDate }}</span>
              <span class="gratuity">👍{{ item.gratuity }}</span>
              <span class="comment">📔{{ item.comment }}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="button">
      <button @click="previous" class="pre">{{ $t("message.previous_page") }}</button>
      <button @click="init" class="refresh">{{ $t("message.refresh") }}</button>
      <button @click="next" class="next">{{ $t("message.next_page") }}</button>
      <span class="num"><input type="number" v-model="videoIn" class="now"/> /{{ videoNum }}</span>
      <button @click="go" class="jump">{{ $t("message.jump") }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Videolist',
    data() {
      return {
        videoIn: 0,
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
          this.videoIn = res;
          this.refresh();
        });
      },
      refresh() {
        const video = this.$store.state.video;
        let num = this.videoIn - 1;

        this.list = [];
        while (num >= this.videoIn - 5 && num >= 0) {
          let cnum = num;
          video.methods.getVideoPreview(num).call().then((res) => {
            this.list.push({
              title: res.title,
              cover: '/ipfs/' + res.cover,
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
        if (this.videoIn - 5 > 0) this.videoIn -= 5;
        this.refresh();
      },
      next() {
        if (this.videoIn + 5 <= this.videoNum) this.videoIn += 5;
        this.refresh();
      },
      go() {
        if (this.videoIn > 0 && this.videoIn <= this.videoNum) {
          this.refresh();
        }
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
      },
      sortlist() {
        return this.list.sort((a, b) => {
          return a.videoid - b.videoid;
        });
      }
    },
    filters: {}
  }
</script>

<style scoped>
  .videolist {
  }
  .list{
    overflow-x: auto;
    overflow-y: hidden;
    height: 150px;
    width: calc(100% - 110px);
  }
  .list a{
    color: #000;
    text-decoration: none;
  }
  .list a:hover{
    color: red;
    text-decoration: underline;
  }
  .list a .title{
    font-weight: bolder;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .list a .info{
    color: grey;
    font-size: 0.7em;
  }
  .list a:hover .info{
    color: red;
    text-decoration: underline;
  }
  .videolist ul {
    list-style-type: none;
    padding: 0;
    height: 150px;
    width: 1000px;
    margin: 0;
  }

  .videolist li {
    width: 200px;
    float: left;
    margin: 0;
  }

  .img {
    width: 160px;
    height: 90px;
    text-align: center;
  }
  .img img{
    max-width: 100%;
    max-height: 100%;
  }
  .list p{
    margin:0;
  }

  .button {
    position: absolute;
    right: 0;
    top: 0;
    width: 110px;
  }
  .pre,.refresh,.next,.jump,.num{
    display: block;
    width: 110px;
  }
  .now{
    width: 46px;
  }
</style>
