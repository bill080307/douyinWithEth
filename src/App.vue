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
      <b-row class="justify-content-center">
        <b-col cols="6">
          <UserCard></UserCard>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="9">
          <UserCard></UserCard>
        </b-col>
        <b-col cols="3">
          <UserCard :user="userCard"></UserCard>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Axios from 'axios'
  import UserCard from "./components/UserCard";
  export default {
    name: "App",
    components: {UserCard},
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
        // example
        userCard: {
          userAddress: '0xqweqweqwedsadsad',
          userHash: 'QmPnXvWUuvAEchE1SxgpXTUXhQfUKqXgZ5XJZfxrUsP94R',
          userVideoNums: 2,
          userAlbumNum: 0,
          userGratuityCount: 15,
          userGratuitySum: 14755
        }
      }
    },
    methods:{
      async init(){
        Axios.get('./global.json').then((res)=>{
          this.global = res.data;
        }).catch((err)=>{
          console.log(err)
        })
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