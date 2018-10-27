<template>
  <div class="upload" v-show="databaseConnect">
    <h1>Upload Video</h1>
    title:<input type="text" v-model="title"><br>
    cover:<input type="file" id="cover"><br>
    video file:<input type="file" id="file"><br>
    description:<br>
    <textarea v-model="description"></textarea><br>
    <button @click="upload">1.upload files</button>
    <button @click="db">2.Record data</button><br>
    extend:<br>
    <video controls="controls" id="aa"></video>
    filesize:<input type="number" v-model="filesize"><br>
    duration:<input type="number" v-model="duration"><br>
    Bit rate:<input type="number" v-model="bitRate"><br>
    Frame rate:<input type="number" v-model="FPS"><br>
    Bit depth:<input type="text" v-model="Bitdepth"><br>
    Width:<input type="number" v-model="width"><br>
    Height:<input type="number" v-model="height"><br>
    video Format:<input type="text" v-model="videoFormat"><br>
    audio Format:<input type="text" v-model="audioFormat"><br>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      description:'',
        title:'',
        cover:'',
        file:'',
        filesize:'',
        duration:'',
        // bitRate:'',
        FPS:'24',
        Bitdepth:'8',
        width:'',
        height:'',
        videoFormat:'AVC',
        audioFormat:'AAC',
    }
  },
    methods:{
        upload(){
            var self_ = this;
            var cover = document.getElementById('cover').files[0];
            var reader = new FileReader();
            reader.readAsArrayBuffer(cover);
            reader.onloadend = function(e){
                const buffer = Buffer.from(reader.result);
                ipfs.add(buffer).then((response)=>{
                    console.log(response)
                    self_.cover = response[0].hash;
                })
            }
            var file = document.getElementById('file').files[0];
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function(e){
                const buffer = Buffer.from(reader.result);
                ipfs.add(buffer).then((response)=>{
                    console.log(response);
                    self_.file = response[0].hash;
                    self_.filesize = response[0].size;
                })
            }
            var file = document.getElementById('file').files[0];
            var url = URL.createObjectURL(file);
            var video=document.getElementById("aa")
            video.src=url;
            console.log(url);
            setTimeout(()=>{
                this.width= video.videoWidth;
                this.height= video.videoHeight;
                this.duration= Math.floor(video.duration*1000);
                console.log(video.duration);
            },2000)
        },
        db(){
            const video = this.$store.state.video;
            const videoinfo = {
                size:this.filesize,
                duration:this.duration,
                rate:Math.floor(this.filesize/(this.duration/1000)),
                fps:this.FPS,
                bitdepth:this.Bitdepth,
                w:this.width,
                h:this.height,
                vc:this.videoFormat,
                ac:this.audioFormat
            }
            var a = video.methods.publish(this.title, this.cover, this.file,
                JSON.stringify(videoinfo),this.description)
                .send({ from: this.$store.state.userAccount })
                .on("receipt", function(receipt) {
                    console.log(receipt);
                }).on("error", function(error) {
                    console.log(error);
                })
            console.log(a);
        }
    },
    computed:{
        databaseConnect() {
            return this.$store.state.databaseConnect
        },
        bitRate: function () {
            return Math.floor(this.filesize/(this.duration/1000));
        }
    }
}
</script>

<style scoped>
  #aa{
    display: block;
    max-width: 400px;
  }
</style>
