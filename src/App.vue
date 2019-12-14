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
      <b-row>
        <b-col cols="9">
        </b-col>
        <b-col cols="3">
          <UserCard :user="userCard"></UserCard>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">
          <VideoCard :video="videoCard"></VideoCard>
        </b-col>
        <b-col cols="3">
          <VideoCard :video="videoCard"></VideoCard>
        </b-col>
        <b-col cols="3">
          <VideoCard :video="videoCard"></VideoCard>
        </b-col>
        <b-col cols="3">
          <VideoCard :video="videoCard"></VideoCard>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Axios from 'axios'
  import UserCard from "./components/UserCard";
  import VideoCard from "./components/VideoCard";
  export default {
    name: "App",
    components: {VideoCard, UserCard},
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
        },
        videoCard: {
          videoHash: 'QmVNAuckPWSyLfJdEAPPt8WUnJCNvowZZ1pWHcy37w4do6',
          duration: 6396000,
          timestamp: 1576336248,
          author: '0xqweqweqwedsadsad',
          commentsNum: 123,
          vlableNum: 42,
          gratuityNum: 7,
          gratuitySum: 624752,
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