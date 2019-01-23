<template>
  <b-container>
    <h1>个人中心</h1>
    <hr>
    <b-row>
      <b-col cols="3">
        <p>
          <b-img rounded="circle" class="avatar" :src="avatarsrc"></b-img>
        </p>
        <p>
          <b-button-group vertical>
            <b-button variant="warning">上传头像</b-button>
            <b-button variant="outline-success">仅保存头像</b-button>
          </b-button-group>
        </p>
        <p>
          <b-button variant="success">全部保存</b-button>
        </p>
      </b-col>
      <b-col cols="9">
        <b-row class="info">
          <b-col sm="2">地址</b-col>
          <b-col sm="10">{{ userAccount.address }}</b-col>
        </b-row>
        <b-row class="info">
          <b-col sm="2"><label for="nickname">昵称</label></b-col>
          <b-col sm="10">
            <b-input-group>
            <b-form-input id="nickname"v-model="userAccount.nickname"></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" @click="saveNickname">仅保存昵称</b-btn>
            </b-input-group-append>
          </b-input-group>
          </b-col>
        </b-row>
        <b-row class="info">
          <b-col sm="2"><label for="profile">简介</label></b-col>
          <b-col sm="10">
            <b-input-group>
              <b-form-textarea id="profile"
                               v-model="userAccount.profile"
                               :rows="1"
                               :max-rows="6">
              </b-form-textarea>
              <b-input-group-append>
                <b-btn variant="outline-success" @click="saveProfile">仅保存简介</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "Userinfo",
    data () {
      return {
        userAccount:{
          address:null,
          nickname:'',
          avatar: 'QmbApgSEbuX3dQGXornrDNhASxBWEFPgYxGYKzvNxKMhcY',
          profile:'',
        }
      }
    },
    methods: {
      init() {
        this.userAccount.address = this.$store.state.userAccount;
        const videoShare = this.$store.state.videoShare;
        videoShare.methods.getUserInfo(this.$store.state.userAccount).call().then((res)=>{
          if(res.avatar!=="")this.userAccount.avatar = res.avatar;
          if(res.nickname!=="")this.userAccount.nickname = res.nickname;
          if(res.profile!=="")this.userAccount.profile = res.profile;
        });
      },
      saveNickname(){
        const videoShare = this.$store.state.videoShare;
        videoShare.methods.setMyNickname(this.userAccount.nickname)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })
      },
      saveProfile(){
        const videoShare = this.$store.state.videoShare;
        videoShare.methods.setMyProfile(this.userAccount.profile)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })
      }
    },
    created() {
      this.init();
    },
    computed: {
      avatarsrc() {
        return this.$store.state.gateway.replace(':hash', this.userAccount.avatar)
      },
    }
  }
</script>

<style scoped>
  .avatar{
    width: 100%;
  }
  .info {
    padding: 5px;
  }
</style>