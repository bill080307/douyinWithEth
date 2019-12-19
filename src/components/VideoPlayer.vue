<template>
  <b-card>
    <video id="player" controls autoplay class="video-js vjs-big-play-centered">
    </video>
    <b-row>
      <b-col cols="7">
        ⏱: {{ timestamp }}
        👍: {{ gratuityNum }}
        🎁: {{ gratuitySum }}
        ⏳: {{ duration }}
        🗄: <b-badge pill variant="success" id="fileinfo">{{ fileinfo.height }}P</b-badge>
        <b-tooltip target="fileinfo" triggers="hover">
          {{ fileinfo.width }} * {{ fileinfo.height }} * {{ fileinfo.fps }}fps / {{ fileinfo.rate | formatRate }}
        </b-tooltip>
      </b-col>
      <b-col cols="5">
        <b-form-select
                v-model="selected"
                :options="selectlist"
                size="sm"
                @change="playfile(selected)"
        >
        </b-form-select>
      </b-col>
    </b-row>
    <h2 class="title">{{ title }}</h2>
    <p>{{ description }}</p>
  </b-card>
</template>

<script>
  import Axios from "axios";
  import videojs from 'video.js'
  import {formatDate, formatdurationtime, formatETH} from "../utils/assist";

  export default {
    name: "VideoPlayer",
    data(){
      return {
        cover: '',
        title: '',
        duration: 0,
        description: '',
        // hd: '',
        timestamp:'',
        gratuityNum: 0,
        gratuitySum: 0,
        filelist: [],
        selectlist: [],
        selected: 0,
        fileinfo: {
          width: 0,
          height: 0,
          fps: 0,
          rate: 0,
        },
      }
    },
    props:['video'],
    methods:{
      async init(){
        let videoinfo = await Axios.get('/ipfs/'+this.video.videoHash+'/files.json').then((res)=>{
          return res.data
        });
        this.cover = videoinfo.cover;
        this.title = videoinfo.title;
        this.description = videoinfo.description;
        this.filelist = videoinfo.files;
        for (let i = 0; i < this.filelist.length; i++) {
          this.selectlist.push({
            value: i,
            text: this.filelist[i].title
          });
        }
        this.duration = formatdurationtime(this.video.duration);
        this.timestamp = formatDate(this.video.timestamp);
        this.gratuityNum = this.video.gratuityNum;
        this.gratuitySum = formatETH(this.video.gratuitySum);
        const vplayer = window.document.getElementById('player');
        vplayer.style.height = vplayer.offsetWidth * 9 / 16 + 'px';
        this.playfile(0);
      },
      playfile(index){
        const item = this.filelist[index];
        const sources = [{
          type:"video/mp4",
          src:item.url
        }];
        const player = videojs('player');
        player.ready(function(){
          const obj  = this;
          obj.src(sources);
          obj.load();
        });
        const info = item.mediainfo.format;
        this.fileinfo.rate = info.size / info.duration;
        const streams = item.mediainfo.streams;
        for (let i = 0; i < streams.length; i++) {
          if(streams[i]['codec_type'] === 'video'){
            this.fileinfo.width = streams[i]['width'];
            this.fileinfo.height = streams[i]['height'];
            this.fileinfo.fps = eval(streams[i]['r_frame_rate']).toFixed(2);
          }
        }
      }
    },
    created() {
      this.init()
    },
    filters: {
      formatRate(bit) {
        let kbit = bit * 8 / 1024;
        let mbit = kbit / 1024;
        return mbit.toFixed(2) + 'Mbps';
      }
    }
  }
</script>

<style scoped>
  .card-body{
    padding: 0.2rem;
  }
</style>