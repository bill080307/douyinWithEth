<template>
  <div class="video">
    <video src="video.mp4" controls="controls"></video>
    <div class="videoinfo">
      <p class="description">{{ description }}</p>
      <span class="fileinfo">{{ fileinfo }}</span>
      <span><button>gratuity</button><button>lable</button></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      description:'description',
      fileinfo: 'time:23min,size:34M,Bitrate:768kbps,videocoding:x264,audiocoding:mp3'
    }
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
