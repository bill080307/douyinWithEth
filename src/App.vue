<template>
  <div id="app">
    <div class="header">
      <b-navbar type="dark">
        <b-container>
          <b-navbar-nav>
            <b-nav-item href="#">主站</b-nav-item>
            <b-nav-item to="/">短视频</b-nav-item>
            <b-nav-item href="#">直播</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template slot="button-content">更多</template>
              <b-dropdown-item :href="global.news">公告</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :href="global.dashboard">管理我的空间</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :href="link.link" v-for="link in global.extend">{{ link.title }}</b-dropdown-item>
              <b-dropdown-item :href="global.client.download">下载客户端</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
    </div>
    <b-container>
      <h1 v-if="!connectEth">未连接 ETH</h1>
      <router-view></router-view>
    </b-container>
  </div>
</template>
<script>
  import Axios from 'axios'
  import Web3 from "web3";
  import {uniqueArr} from "./utils/assist";
  export default {
    name: "App",
    data(){
      return {
        global:{
          id: "",
          dashboard: "",
          client: {
            download: ""
          },
          extend:[]
        },
        connectEth: false,
      }
    },
    methods:{
      async init(){
        Axios.get('./global.json').then((res)=>{
          this.global = res.data;
        }).catch((err)=>{
          console.log(err)
        });
        let web3js;
        //检查是否开启的插件
        if (typeof web3 !== 'undefined') {
          //使用插件的ethAPI
          web3js = new Web3(web3.currentProvider);
          this.connectEth = true;
        } else {
          //使用外置的ethAPI
          // web3js = new Web3(new Web3.providers.HttpProvider(config["network"][0]["httpApi"]));
        }
        if(this.connectEth){
          //定义合约
          const dikTok = new web3js.eth.Contract(DikTok_Abi, config["network"][0]["contractAddress"]);
          this.$store.commit('setDikTok', dikTok);
          console.log(dikTok);
          //检测是否登陆
          let account = await web3js.eth.getAccounts();
          if(account.length > 0){
            this.$store.commit('setUserAccount', account[0]);
          }
        }

        //先get一下我下载下来的公共网关列表
        let gateways = await Axios.get('./gateways.json').then((res)=>{
          return res.data;
        });
        let olgateways = await Axios.get('https://ipfs.github.io/public-gateway-checker/gateways.json').then((res)=>{
          return res.data;
        });
        const host1 = window.location.host;
        const host2 = document.domain;
        gateways = [
          "http://127.0.0.1:8080/ipfs/:hash",
          "http://" + host1 + "/ipfs/:hash",
          "http://" + host2 + ":8080/ipfs/:hash"
        ].concat(gateways);
        gateways = gateways.concat(olgateways);
        gateways = uniqueArr(gateways);

        //定义用于测试的hash和文本
        const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
        const hashString = 'Hello from IPFS Gateway Checker';
        let gatewayOnline = [];
        let num = gateways.length;
        gateways.forEach((value) => {
          //拼接hash到网关url里
          const gatewayAndHash = value.replace(':hash', hashToTest);
          try {
            Axios.get(gatewayAndHash, {timeout: 5000}).then((res) => {
              if (res.data.trim() === hashString.trim()) {
                gatewayOnline.push(value);
              }
              num --;
              if(num === 0)saveGateway(gatewayOnline);
            }).catch((err) => {
              num --;
              if(num === 0)saveGateway(gatewayOnline);
            });
          }catch (e) {
            num --;
            if(num === 0)saveGateway(gatewayOnline);
          }
        });
        const saveGateway = (gateways)=>{
            if(gateways.length < 1)return;
            this.$store.commit('setGateWay', gateways[0]);
            localStorage.setItem('GateWays', JSON.stringify(gateways));
        };
      },
    },
    created() {
      this.init()
    },
  }
</script>

<style>
  .header{
    /*height: 200px;*/
    background: url("assets/header.jpg") 50% -100px repeat-x;
  }
  .header .navbar{
    background-color: rgba(0, 0, 0, 0.6) ;
  }

  .footer{
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f6f9fa;
  }

</style>