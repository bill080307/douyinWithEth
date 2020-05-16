<template>
  <div class="demo">
    <b-container>
      <b-row>
        <b-card class="video-card">
          <video id="demoplayer" :poster="video.cover" controls autoplay class="video-js vjs-big-play-centered">
          </video>
          <b-row>
            <b-col cols="7">
              📺: {{ 10000 | random }}
              👍: {{ 1000 | random }}
              🎁: {{ 100000 | random }}
              ⏳: {{ video.duration }}
            </b-col>
          </b-row>
          <h2 class="title">{{ video.title }}</h2>
        </b-card>
      </b-row>
      <b-row>
        <b-col sm="6" md="4" lg="3" xl="2" v-for="v in demoVideos" :key="v.videoHash">
          <b-card class="video-card videolist"
                  :img-src="v.cover"
                  img-top
                  @click="playvideo(v)"
          >
            <b-badge variant="dark" class="duration">{{ v.duration }}</b-badge>
            <b-card-body>
              <b-card-title><h4>{{ v.title }}</h4></b-card-title>
              <b-card-text>📺: {{ 99 |random }} 👍: {{ 99 |random }} 🎁: {{ 999 |random }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import Axios from 'axios'
    import VideoPlayer from "../components/VideoPlayer";
    import VideoCard from "../components/VideoCard";
    import videojs from "video.js";
    import {formatDate, formatdurationtime, formatETH} from "../utils/assist";
    export default {
        name: "Demo",
        components: {VideoCard, VideoPlayer},
        data(){
            return {
                demoVideos:[],
                video:{
                    cover: '',
                    title: '',
                    duration: 0,
                    url:''
                }

            }
        },
        methods: {
            async init() {
                let video = await Axios.get('./demo.json');
                console.log(video);
                this.demoVideos = video.data.demoVideos;
            },
            playvideo(v){
                this.video = v;
                const sources = [{
                    type:"video/mp4",
                    src:v.url
                }];
                const player = videojs('demoplayer');
                player.ready(function(){
                    const obj  = this;
                    obj.src(sources);
                    obj.load();
                });
                console.log(v);
            }
        },
        filters: {
            random(max) {
                let min = max * 0.8;
                return parseInt(Math.random() * ( max - min + 1 ) + min);
            }
        },
        created(){
            this.init();
        },
    }
</script>

<style scoped>
  .video-card{
    width: 100%;
  }
  #demoplayer{
    width: 100%;
    height: calc(57vw);
  }
  .row >.col-sm-6, .row >.col-md-4, .row >.col-lg-3, .row >.col-xl-2 {
    padding-left:1px;
    padding-right:1px;
    padding-bottom: 15px;
  }
  .card-body{
    padding: 0.1rem;
  }
  h4{
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 0;

  }
  .duration{
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(52,58,64,0.5);
  }
  .videolist:hover{
    cursor: pointer;
    transition-duration: 0.5s;
    color: #0000ff;
  }
</style>