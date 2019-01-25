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
            <b-form-file v-model="file" :state="Boolean(file)" placeholder="选择头像"></b-form-file>
            <b-button variant="warning" @click="uploadAvatar">上传头像</b-button>
            <b-button variant="outline-success" @click="saveAvatar">仅保存头像</b-button>
          </b-button-group>
        </p>
        <p>
          <b-button variant="success" @click="saveAll">全部保存</b-button>
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
            <b-form-input id="nickname" v-model="userAccount.nickname"></b-form-input>
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
        },
        file:null,
      }
    },
    methods: {
      init() {
        //获取登陆的账号地址和合约实例
        this.userAccount.address = this.$store.state.userAccount;
        const videoShare = this.$store.state.videoShare;
        //查询用户是否设置过自己的属性，如果设置过就显示出来
        videoShare.methods.getUserInfo(this.$store.state.userAccount).call().then((res)=>{
          if(res.avatar!=="")this.userAccount.avatar = res.avatar;
          if(res.nickname!=="")this.userAccount.nickname = res.nickname;
          if(res.profile!=="")this.userAccount.profile = res.profile;
        });
      },
      saveNickname(){
        //获取合约实例
        const videoShare = this.$store.state.videoShare;
        //setMyNickname的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setMyNickname(this.userAccount.nickname)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })
      },
      saveProfile(){
        //获取合约实例
        const videoShare = this.$store.state.videoShare;
        //setMyProfile的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setMyProfile(this.userAccount.profile)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
                  console.log(error);
                })
      },
      uploadAvatar(){
        //获取ipfs节点
        const ipfsNode = this.$store.state.ipfsNode;
        //new一个文件对象
        const reader = new FileReader();
        const userAccount = this.userAccount;
        reader.readAsArrayBuffer(this.file);
        reader.onloadend = function(e){
          //将文件内存转成buffer对象
          const buffer = Buffer.from(reader.result);
          //调用ipfs的api上传文件
          ipfsNode.files.add(buffer).then((response)=>{
            userAccount.avatar = response[0].hash;
            console.log(response);
          })
        }
      },
      saveAvatar(){
        //获取合约实例
        const videoShare = this.$store.state.videoShare;
        //setAvatar的调用方式需要传入设置的值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setMyAvatar(this.userAccount.avatar)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
                  alert("上链成功，区块高度："+receipt.blockNumber);
                  console.log(receipt);
                }).on("error", function(error) {
          console.log(error);
        })
      },
      saveAll(){
        //获取合约实例
        const videoShare = this.$store.state.videoShare;
        //setMyInfo的调用方式需要传入以上3个值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
        videoShare.methods.setMyInfo(this.userAccount.nickname,this.userAccount.profile,this.userAccount.avatar)
                .send({ from: this.userAccount.address })
                .on("receipt", function(receipt) {
                  //返回成功上链的信息
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