<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">
          <img src="./assets/logo.png" alt="VideoShare" height="24">
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/">/ipns/qmxxxxxxxx</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="DB:" right>
              <b-dropdown-item href="#">TEST1</b-dropdown-item>
              <b-dropdown-item href="#">TEST2</b-dropdown-item>
              <b-dropdown-item href="#">TEST3</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item-dropdown text="anonymous" right>
              <b-dropdown-item href="#">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    data () {
      return {
      }
    },
    methods: {
      init() {
        //先get一下我下载下来的公共网关列表
        Axios.get('./gateways.json').then((res) => {
          //添加3个本地网关
          let gateways = res.data;
          const host1 = window.location.host;
          const host2 = document.domain;
          gateways = [
            "http://127.0.0.1:8080/ipfs/:hash",
            "http://" + host1 + "/ipfs/:hash",
            "http://" + host2 + ":8080/ipfs/:hash"
          ].concat(gateways);
          //定义用于测试的hash和文本
          const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
          const hashString = 'Hello from IPFS Gateway Checker';
          //定义在线的网关列表
          const gatewayOnline = [];
          gateways.forEach((value) => {
            //拼接hash到网关url里
            const gatewayAndHash = value.replace(':hash', hashToTest);
            Axios.get(gatewayAndHash, {timeout: 5000}).then((res) => {
              const matched = res.data.trim() === hashString.trim();
              if (matched) {
                //重新把hash替换成占位符
                const url = res.config.url.replace(hashToTest, ':hash');
                //把在线的网关添加到列表
                gatewayOnline.push(url);
                //把第一个返回的网关记录到全局变量中。
                if (this.$store.state.gateway == '') this.$store.commit('setGateWay', url);
              }
            }).catch((err) => {
              //捕获到异常，无需处理
            })
          });
        });

        const Web3 = require('web3');
        console.log(Web3);
        let web3js;
        if (typeof web3 !== 'undefined') {
          web3js = new Web3(web3.currentProvider);
          console.log("启用插件");
        } else {
          console.log("未启用插件");
          web3js = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/82af007db9b8429eb49f7502e3938acd"));
        }
        console.log(web3js);
        const videoShare = new web3js.eth.Contract(videoShareAbi, "d334f6e742bef53d92b241ff3b7f719eda1f1d37");
        console.log(videoShare);
        videoShare.methods.videoNum().call().then((res) => {
          console.log(res);
        });

      }
    },
    created() {
      this.init();
    }
  }
</script>
<style>

</style>
