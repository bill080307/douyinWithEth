<template>
  <div class="setting" v-show="databaseConnect">
    <h1>User Setting</h1>
      <img class="avatar" :src="avatarfile" alt="">
      <p class="nickname">{{ nickname }}</p>
      <p class="info">{{ info }}</p>
    <input type="text" v-model="nickname"><br>
    <textarea v-model="info"></textarea><br>
    <input type="file" id="file"><br>
    <button type="button" @click="save">save</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Setting',
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
                if(res.avatar!='')this.avatar = res.avatar;
                if(res.nickname!='')this.nickname = res.nickname;
                if(res.info!='')this.info = res.profile;
                ipfs.files.get(this.avatar, (err, files)=> {
                    let blob = new Blob([files[0].content]);
                    this.avatarfile= URL.createObjectURL(blob);
                })
            });
        },
        save(){
            const video = this.$store.state.video;
            var userAccount = this.$store.state.userAccount;
            var nickname = this.nickname;
            var info = this.info;
            console.log(info);
            var file = document.getElementById('file').files[0];
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function(e){
                const buffer = Buffer.from(reader.result);
                ipfs.add(buffer).then((response)=>{
                    var a = video.methods.setMyInfo(nickname, info, response[0].hash)
                                .send({ from: userAccount })
                                .on("receipt", function(receipt) {
                                    console.log(receipt);
                                }).on("error", function(error) {
                                    console.log(error);
                                })
                            console.log(a);
                })
            }
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
