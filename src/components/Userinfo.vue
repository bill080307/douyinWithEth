<template>
  <div class="userinfo">
    <div v-show="databaseConnect">
      <div class="avatar"><img :src="avatarfile"></div>
      <p class="nickname">{{ nickname }}</p>
      <p class="info">{{ info }}</p>
      <p>
        <router-link to="/">{{ $t("message.welcome") }}</router-link>
        <router-link to="/setting" v-show="userAccount">{{ $t("message.setting") }}</router-link>
        <router-link to="/upload" v-show="userAccount">{{ $t("message.upload") }}</router-link>
      </p>
    </div>
    <div v-show="!databaseConnect">
      No database connect. Please click
      <router-link to="/">Welcome</router-link>
      to connect.
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Userinfo',
    data() {
      return {
        nickname: this.$t("message.nickname_default"),
        info: this.$t("message.userinfo_default"),
        avatar: 'QmbApgSEbuX3dQGXornrDNhASxBWEFPgYxGYKzvNxKMhcY',
        avatarfile: null
      }
    },
    methods: {
      init() {
        if (this.$store.state.databaseConnect && this.$store.state.userAccount) {
          const video = this.$store.state.video;
          video.methods.getUserInfo(this.$store.state.userAccount).call().then((res) => {
            if (res.nickname != '') this.nickname = res.nickname;
            if (res.info != '') this.info = res.profile;
            if (res.avatar != '') this.avatar = res.avatar;
            this.avatarfile = '/ipfs/'+this.avatar;
          });
        } else if(this.$store.state.databaseConnect) {
          this.avatarfile = '/ipfs/'+this.avatar;
        }
      }
    },
    created: function () {
      this.init();
    },
    computed: {
      databaseConnect() {
        return this.$store.state.databaseConnect
      },
      userAccount() {
        return this.$store.state.userAccount
      },
    },
    watch: {
      userAccount() {
        this.init();
      }
    }
  }
</script>

<style scoped>
  .userinfo {
  }

  .avatar {
    display: inline-block;
    width: 60px;
    height: 60px;
    float: left;
  }
  .avatar img{
    max-width: 60px;
    max-height: 60px;
  }
  .nickname {
    font-weight: bolder;
    margin-left: 60px;
  }

  .info {
    clear: both;
  }
</style>
