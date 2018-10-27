<template>
  <div class="video">
    <video :src="videofile" controls="controls"></video>
    <div class="videoinfo">
      <h1>{{ title }}</h1>
      <p class="description">{{ description }}</p>
      <span class="fileinfo">{{ fileinfo }}</span>
      <span>
        <button>gratuity</button>
        <button>lable</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
        title:'',
      description:'description',
      fileinfo: '',
        videofile:'',
    }
  },methods:{
        init(){
            const videoid=this.$route.query.id;
            const video = this.$store.state.video;
            video.methods.getVideo(videoid).call().then((res)=>{
                this.title = res.title;
                this.description = res.info;
                const info = JSON.parse(res.videoinfo);
                //TODO 视频信息显示
                ipfs.files.get(res.videofile, (err, files)=> {
                    let blob = new Blob([files[0].content]);
                    this.videofile= URL.createObjectURL(blob);
                })
                console.log(res);
            });
        },
        preview(){

        }
    },
    created:function () {
        if(this.$store.state.databaseConnect){
            this.init();
        }else {
            this.preview();
        }
    },
    computed:{
        databaseConnect() {
            return this.$store.state.databaseConnect
        },
    }
}
</script>

<style scoped>
  .video{
    padding-right: 230px;
    padding-bottom: 180px;
    overflow: auto;
  }
  video{
    width: 100%;
  }
</style>
