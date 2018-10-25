<template>
  <div class="userinfo">
    <div v-show="databaseConnect">
      <img class="avatar" src="../assets/logo.png" alt="">
      <p class="nickname">{{ nickname }}</p>
      <p class="info">{{ info }}</p>
      <p>
        <router-link to="/">Welcome</router-link>
        <router-link to="/video">video</router-link>
        <router-link to="/setting">Setting</router-link>
        <router-link to="/upload">Upload</router-link>
      </p>
    </div>
    <div v-show="!databaseConnect">
      No database connect. Please click <router-link to="/">Welcome</router-link> to connect.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userinfo',
  data () {
    return {
      nickname: 'nickname',
      info: 'My info.'
    }
  },
  computed:{
    databaseConnect() {
      return this.$store.state.databaseConnect
    }
  }
}
</script>

<style scoped>
  .userinfo{
  }
  .avatar{
    display: inline-block;
    max-width:60px;
    max-height:60px;
    float: left;
  }
  .nickname{
    font-weight: bolder;
  }
  .info{
    clear: both;
  }
</style>
