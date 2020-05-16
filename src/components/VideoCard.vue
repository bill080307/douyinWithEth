<template>
  <b-card class="video-card"
          :img-src="cover"
          img-top
  >

    <b-badge variant="dark" class="duration">{{ duration }}</b-badge>
<!--    <b-badge variant="primary" class="hd">{{ hd }}</b-badge>-->
    <a :href="'#/video/'+video.videoId">
      <b-card-body>
        <b-card-title><h4>{{ title }}</h4></b-card-title>
        <b-card-text>
          {{ timestamp }} <br>
          👍: {{ gratuityNum }} 🎁: {{ gratuitySum }}
        </b-card-text>
      </b-card-body>
    </a>
  </b-card>
</template>

<script>
  import Axios from "axios";
  import {formatDate, formatdurationtime, formatETH} from "../utils/assist";
  export default {
    name: "VideoCard",
    data(){
      return {
        cover: '',
        title: '',
        duration: 0,
        // hd: '',
        timestamp:'',
        gratuityNum: 0,
        gratuitySum: 0,
      }
    },
    props:['video'],
    methods:{
      async init(){
        if(this.video.videoHash.substr(0,6)==='/ipfs/'){
          this.video.videoHash = this.video.videoHash.substr(6);
        }
        let videoinfo = await Axios.get('/ipfs/'+this.video.videoHash).then((res)=>{
          return res.data
        });
        this.cover = videoinfo.cover;
        this.title = videoinfo.title;
        this.duration = formatdurationtime(this.video.duration);
        this.timestamp = formatDate(this.video.timestamp);
        this.gratuityNum = this.video.gratuityNum;
        this.gratuitySum = formatETH(this.video.gratuitySum);
      }
    },
    created() {
      this.init()
    },
  }
</script>

<style scoped>
  .card-body{
    padding: 0.1rem;
  }
  .duration{
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(52,58,64,0.5);
  }
  /*.hd{*/
  /*   background-color: rgba(0,123,255,0.5);*/
  /* }*/
  a:hover {
    text-decoration: none;
  }
  .video-card{
    margin-left: -13px;
    margin-right: -13px;
    margin-bottom: 10px;
  }
  h4{
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
</style>