<template>
  <div class="userinfo">
    <div v-show="databaseConnect">
      <img class="avatar" :src="avatarfile" alt="">
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
      info: 'My info.',
        avatar:'QmbApgSEbuX3dQGXornrDNhASxBWEFPgYxGYKzvNxKMhcY',
        avatarfile:null
    }
  },
    methods:{
        init(){
            const video = this.$store.state.video;
            video.methods.getUserInfo(this.$store.state.userAccount).call().then((res)=>{
                if(res.nickname!='')this.nickname = res.nickname;
                if(res.info!='')this.info = res.info;
                ipfs.files.get(this.avatar, (err, files)=> {
                    let blob = new Blob([files[0].content], {type:'image/jpeg'});
                    this.avatarfile= URL.createObjectURL(blob);
                })
            });
        }
    },
    created:function () {
      if(this.$store.state.databaseConnect&&this.$store.state.userAccount){
          this.init();
      }
    },
  computed:{
    databaseConnect() {
      return this.$store.state.databaseConnect
    },
      userAccount() {
          return this.$store.state.userAccount
      },
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
