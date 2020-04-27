<template>
  <b-container>
    <h1>个人中心</h1>
    <hr>
    <b-row>
      <b-col cols="3">
        <b-img rounded="circle" class="avatar" :src="userAccount.avatar"></b-img>
        <b-form-file v-model="avatarselect" placeholder="选择头像" @change="up_avatar" class="avatar"></b-form-file>
      </b-col>
      <b-col cols="9">
        <b-row class="info">
          <b-col sm="2">地址</b-col>
          <b-col sm="10">{{ userAccount.address }}</b-col>
          <b-col sm="2">Hash</b-col>
          <b-col sm="10">{{ userAccount.userHash }}</b-col>
        </b-row>
        <b-row class="info">
          <b-col sm="2"><label for="nickname">昵称</label></b-col>
          <b-col sm="10">
            <b-input-group>
              <b-form-input id="nickname" v-model="userAccount.nickname" v-on:blur="savetoipfs"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="info">
          <b-col sm="2"><label for="description">简介</label></b-col>
          <b-col sm="10">
            <b-input-group>
              <b-form-textarea id="description"
                               v-model="userAccount.description"
                               :rows="1"
                               :max-rows="6" v-on:blur="savetoipfs">
              </b-form-textarea>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="info">
          <b-button variant="success" @click="save">保存</b-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Axios from "axios";
  export default {
    name: "Userinfo",
    data () {
      return {
        userAccount:{
          address:null,
          userHash:'',
          nickname:'',
          avatar: '',
          description:'',
        },
        file:null,
        avatarselect:null,
      }
    },
    methods: {
      async init() {
        if(!this.$store.state.isloginEth || !this.$store.state.isconnectEth){
          console.log('未登录');
          this.$router.push({path:'/'});
        }
        this.userAccount.address = this.$store.state.userAccount;
        const dikTok = this.$store.state.dikTok;
        const user = await dikTok.methods.getUserInfo(this.userAccount.address).call();
        if(user.userHash === ''){
          const ipfs = this.$ipfs;
          const us = await ipfs.add(Buffer.from(JSON.stringify({avatar:'',nickname:'',description:''})));
          this.userAccount.userHash = us[0].hash;
        }else{
          this.userAccount.userHash = user.userHash;
          const userjson = await Axios.get('/ipfs/'+this.userAccount.userHash).then((res)=>{
            return res.data;
          });
          this.userAccount.avatar = userjson.avatar;
          this.userAccount.nickname = userjson.nickname;
          this.userAccount.description = userjson.description;
        }
      },
      up_avatar(){
        setTimeout(async()=>{
          if(this.avatarselect){
            const ipfs = await this.$ipfs;
            for await (const file of ipfs.add(this.avatarselect)) {
              this.userAccount.avatar = '/ipfs/'+file.path;
              this.savetoipfs();
            }
          }
        },50);
      },
      async savetoipfs(){
        const ipfs = await this.$ipfs;
        for await (const result of ipfs.add(JSON.stringify({
            avatar: this.userAccount.avatar,
            nickname: this.userAccount.nickname,
            description: this.userAccount.description
        }))) {
          this.userAccount.userHash = result.path;
        }
      },
      async save(){
        console.log(this.userAccount.userHash);
        const dikTok = this.$store.state.dikTok;
        dikTok.methods.setMyProfile(this.userAccount.userHash)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                });
      }
    },
    created() {
      this.init();
    },
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