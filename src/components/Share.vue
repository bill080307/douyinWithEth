<template>
  <div class="share">
    <div class="videoinfo">
      <h1>{{ title }}</h1>
      <p>{{ $t("message.gateway") }}
        <select v-model="gatewaySelect">
          <option :value="coupon.gw" v-for="coupon in gateway">{{coupon.gw}}</option>
        </select>
        <!--transitory link-->
        <!--<select v-model="tlinkSelect">-->
          <!--<option :value="coupon.server" v-for="coupon in tlink">{{coupon.server}}</option>-->
        <!--</select>-->
      </p>
      <p>{{ $t("message.player_url") }}:<a :href="weburl">{{ weburl }}</a></p>
      <p>{{ $t("message.video_url") }}:<a :href="playurl">{{ playurl }}</a></p>

    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import socialShare from 'vue-social-share'
  export default {
    name: 'Share',
    data() {
      return {
        title: '',
        description: '',
        videofile: '',
        videoid: 0,
        cover: '',
        baseUrl: '',
        WebUrl: '',
        PlayUrl: '',
        shortWebUrl: '',
        shortPlayUrl: '',
        gateway: [
          {
            gw: 'https://gateway.ipfs.guide'
          },
          {
            gw: 'https://cloudflare-ipfs.com'
          },
          {
            gw: 'https://ipfs.io'
          }
        ],
        gatewaySelect: '',
        // tlink: [
        //   {
        //     server: 'baidu.com'
        //   },
        // ],
        // tlinkSelect: '',
      }
    }, methods: {
      init() {
        this.videoid = this.$route.params.id;
        var url = document.location.toString();
        var arrUrl = url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);
        if (relUrl.indexOf("#") != -1) {
          relUrl = relUrl.split("#")[0];
        }
        this.baseUrl = relUrl;

        const video = this.$store.state.video;
        video.methods.getVideo(this.videoid).call().then((res) => {
          this.title = res.title;
          this.description = res.info;
          this.videofile = res.videofile;
        });
        // video.methods.getVideoPreview(this.videoid).call().then((res) => {
        //   this.cover = res.cover;
        // });
      },
      // getshortUrl() {
      //   if (this.tlinkSelect == 'baidu.com') {
      //     Axios.post('https://dwz.cn/admin/create', {
      //       url: this.WebUrl
      //     }).then((res) => {
      //       this.shortWebUrl = res.data.ShortUrl
      //     })
      //   }
      // },
      // showshare() {
      //   var config = {
      //     url: this.shortWebUrl,
      //     source: this.shortWebUrl,
      //     title: this.title,
      //     description: this.description,
      //     image: this.gatewaySelect + '/ipfs/' + this.cover,
      //     sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'google', 'facebook', 'twitter'],
      //     wechatQrcodeTitle   : "微信扫一扫：分享",
      //     wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
      //   };
      //   socialShare('.share-componen', config);
      // }
    },
    created: function () {
      this.gatewaySelect = this.gateway[0].gw;
      // this.tlinkSelect = this.tlink[0].server;
      this.init();
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      },
      weburl() {
        return this.gatewaySelect + this.baseUrl + '#/v/' + this.videofile + '/' + encodeURI(this.title);
      },
      playurl() {
        return this.gatewaySelect + '/ipfs/' + this.videofile;
      },
    },
    // watch: {
    //   weburl(url) {
    //     this.WebUrl = url;
    //     this.getshortUrl();
    //   }
    // }
  }
</script>

<style scoped>
</style>
