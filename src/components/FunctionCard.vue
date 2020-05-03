<template>
  <b-card class="fun-card">
    <b-input-group>
      <b-form-input placeholder="弹幕/评论" v-model="comment"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="makeComment">发送</b-button>
      </b-input-group-append>
    </b-input-group>
    <br>
    <b-input-group prepend="ETH">
      <b-form-input v-model="gratuity"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="gratuityeth">打赏</b-button>
        <b-button variant="outline-success" @click="gratuityeth0">赞</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-card>
</template>

<script>
  import Axios from "axios";
  import {formatDate, formatdurationtime, formatETH} from "../utils/assist";

  export default {
    name: "FunctionCard",
      data(){
          return {
              gratuity: 0,
              comment:'',
          }
      },
      props:['videoid'],
      methods:{
          async init(){
          },
          gratuityeth(){
              const dikTok = this.$store.state.dikTok;
              dikTok.methods.reward(this.videoid)
                  .send({ from: this.$store.state.userAccount, value: this.gratuity * 1E18})
                  .on("receipt", function(receipt) {
                      //返回成功上链的信息
                      alert("上链成功，区块高度："+receipt.blockNumber);
                      console.log(receipt);
                  }).on("error", function(error) {
                  console.log(error);
              });
          },
          gratuityeth0(){
              const dikTok = this.$store.state.dikTok;
              console.log(this.$store.state.userAccount, this.videoid)
              dikTok.methods.reward(this.videoid)
                  .send({ from: this.$store.state.userAccount, value: 0 })
                  .on("receipt", function(receipt) {
                      //返回成功上链的信息
                      alert("上链成功，区块高度："+receipt.blockNumber);
                      console.log(receipt);
                  }).on("error", function(error) {
                  console.log(error);
              });
          },
          async makeComment(){
              const ipfs = await this.$ipfs;
              let hash = '';
              for await (const result of ipfs.add(this.comment)) {
                  hash = result.path;
              }
              const dikTok = this.$store.state.dikTok;
              dikTok.methods.makeComment(this.videoid, 0, hash)
                  .send({ from: this.$store.state.userAccount })
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
          this.init()
      },
  }
</script>

<style scoped>
  .card-body{
    padding: 0.2rem;
  }
  .fun-card{
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 10px;
  }
</style>