<template>
  <div id="app">
    <div class="header">
      <b-navbar type="dark">
        <b-container>
          <b-navbar-nav>
            <b-nav-item href="/ipns/QmUnZTQFJCd573goUHECvkG63UdAW9CTgZAMvp8EkGnMmJ/">主站</b-nav-item>
            <b-nav-item to="/">短视频</b-nav-item>
            <b-nav-item href="#">直播</b-nav-item>
<!--            <b-nav-item href="#">{{ ipfsSW }}</b-nav-item>-->
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template slot="button-content">更多</template>
              <b-dropdown-item v-if="loginEth" to="/userinfo">个人信息</b-dropdown-item>
              <b-dropdown-item v-if="loginEth" :to="'/user/'+$store.state.userAccount">我的空间</b-dropdown-item>
              <b-dropdown-item v-if="loginEth" to="/upload">上传视频</b-dropdown-item>
              <b-dropdown-item :href="global.news">公告</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :href="link.link" v-for="link in global.extend" :key="link.link">{{ link.title }}</b-dropdown-item>
              <b-dropdown-item :href="global.client.download">下载客户端</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
    </div>
    <b-container>
      <h1 v-if="!connectEth">未连接 ETH, 请下载浏览器插件🦊MetaMask，
        并切换到<b-badge variant="danger">Ropsten测试网络</b-badge>，
        访问<b-badge target="_blank" href="https://faucet.metamask.io" variant="light">水龙头</b-badge>以获取测试用的以太币。</h1>
      <router-view></router-view>
    </b-container>
    <div class="footer">
      <b-container>
        <b-row>
          <b-col sm="12" md="6">
            <b-row>
              <b-col cols="4" v-for="l in global.links" :key="l.link"><a :href="l.link" >{{ l.title }}</a></b-col>
            </b-row>
          </b-col>
          <b-col sm="6" md="2">
            <b-row>
              <div id="qrCodeipns" ref="qrCodeDivipns" class="qr"></div>
            </b-row>
          </b-col>
          <b-col sm="6" md="4">
            <a class="f_logo" :href="'/ipns/'+global.id+'/'"></a>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios';
  import Web3 from "web3";
  import QRCode from 'qrcodejs2';
  import Ipfs from 'ipfs';
  import {addressab, uniqueArr} from "./utils/assist";
  export default {
    name: "App",
    data(){
      return {
        global:{
          id: "",
          client: {
            download: ""
          },
          extend:[]
        },
        connectEth: false,
        loginEth: false,
        jsipfs: null,
        ipfsSW:0
      }
    },
    methods:{
      async init(){
        Axios.get('./global.json').then((res)=>{
          this.global = res.data;
            new QRCode(this.$refs.qrCodeDivipns, {
                text: '/ipns/'+res.data.id+'/',
                width: 120,
                height: 120,
                colorDark: "#333333",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }).catch((err)=>{
          console.log(err)
        });
        let web3js;
        //检查是否开启的插件
        // 新版的方式
        let web3Provider;
        if (window.ethereum) {
          web3Provider = window.ethereum;
          try {
            // 请求用户授权
            await window.ethereum.enable();
            this.connectEth = true;
            this.$store.commit('setIsconnectEth', true);
          } catch (error) {
            // 用户不授权时
            console.error("User denied account access")
          }
        } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
          web3Provider = window.web3.currentProvider;
          this.connectEth = true;
          this.$store.commit('setIsconnectEth', true);
        } else {
          // web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        if(this.connectEth){
          web3js = new Web3(web3Provider);//web3js就是你需要的web3实例
          //定义合约
          const dikTok = new web3js.eth.Contract(DikTok_Abi, config["network"][0]["contractAddress"]);
          this.$store.commit('setDikTok', dikTok);

          //检测是否登陆
          let account = await web3js.eth.getAccounts();
          if(account.length > 0) {
              this.$store.commit('setUserAccount', account[0]);
              this.loginEth = true;
              this.$store.commit('setIsloginEth', true);
          }
          if(this.$route.path==='/'){
              let vid = await dikTok.methods.videoNum().call().then((res)=>{return res});
              if(vid>0){
                  this.$router.push({path:'/video/'+(+vid-1)})
              }
          }
        }else{
            this.$router.push({path:'/demo'})
        }

        先get一下我下载下来的公共网关列表
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

        // 定义用于测试的hash和文本
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
        console.log('login:'+this.loginEth);
        if(this.loginEth){
          const ipfs = await this.$ipfs;
          // ipfs.swarm.connect("/ip4/127.0.0.1/tcp/9999/ws/ipfs/QmPKtUgdw97QS7zYoEVxY9EpuCavbtMmjSMp7usDXt1BGi");
          ipfs.swarm.connect("/dns4/ipfs-gateway.dlimba.top/tcp/9999/ws/p2p/QmWxACeyRtqCZwix8LzFwHhvkRqVpQ1cEWPN86xa7Y6moi");

          setInterval(async()=>{
            let peers = await ipfs.swarm.peers();
            this.ipfsSW = peers.length;
          },2000)
        }
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
  .f_logo{
    display: inline-block;
    width: 300px;
    height: 100px;
    background: url("/ipfs/QmSiGaJ6phBKWuDmYpEocLgZgmwfGnDP9wuHww4Skxkcfq");
  }
</style>