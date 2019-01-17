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
      init(){
        Axios.get('./gateways.json').then((res) =>{
          let gateways = res.data;
          const host1 = window.location.host;
          const host2 = document.domain;
          gateways = [
            "http://127.0.0.1:8080/ipfs/:hash",
            "http://"+host1+"/ipfs/:hash",
            "http://"+host2+":8080/ipfs/:hash"
          ].concat(gateways);
          const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
          const hashString = 'Hello from IPFS Gateway Checker';
          const gatewayOnline = [];
          gateways.forEach((value) =>{
            const gatewayAndHash = value.replace(':hash', hashToTest);
            Axios.get(gatewayAndHash,{timeout:5000}).then((res)=>{
              const matched = res.data.trim() === hashString.trim();
              if(matched){
                const url = res.config.url.replace(hashToTest, ':hash');
                gatewayOnline.push(url);
                if(this.$store.state.gateway=='')this.$store.commit('setGateWay', url);
              }
            }).catch((err)=>{
            })
          });
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>
<style>

</style>
