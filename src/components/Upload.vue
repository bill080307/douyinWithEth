<template>
  <div class="upload" v-show="databaseConnect">
    <h1>{{ $t("message.upload_video") }}</h1>
    {{ $t("message.title") }}:<input type="text" v-model="title"><br>
    {{ $t("message.cover") }}:<input type="file" id="cover"><br>
    {{ $t("message.video_file") }}:<input type="file" id="file"><br>
    {{ $t("message.description") }}:<br>
    <textarea v-model="description"></textarea><br>
    <button @click="upload">1.{{ $t("message.upload_files") }}</button>
    <button @click="db" v-bind:disabled="dis">2.{{ $t("message.record_data") }}</button><br>
    {{ $t("message.extend") }}:<br>
    <video controls="controls" id="aa"></video>
    {{ $t("message.filesize") }}:<input type="number" v-model="filesize"><br>
    {{ $t("message.duration") }}:<input type="number" v-model="duration"><br>
    {{ $t("message.Bit_rate") }}:<input type="number" v-model="bitRate"><br>
    {{ $t("message.frame_rate") }}:<input type="number" v-model="FPS"><br>
    {{ $t("message.bit_depth") }}:<input type="text" v-model="Bitdepth"><br>
    {{ $t("message.width") }}:<input type="number" v-model="width"><br>
    {{ $t("message.height") }}:<input type="number" v-model="height"><br>
    {{ $t("message.video_format") }}:<input type="text" v-model="videoFormat"><br>
    {{ $t("message.audio_format") }}:<input type="text" v-model="audioFormat"><br>
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
      dis:true,
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
            var reader2 = new FileReader();
            reader2.readAsArrayBuffer(file);
            reader2.onloadend = function(e){
                const buffer = Buffer.from(reader2.result);
                ipfs.add(buffer).then((response)=>{
                    console.log(response);
                    self_.file = response[0].hash;
                    self_.filesize = response[0].size;
                    var video=document.getElementById("aa");
                    video.src = '/ipfs/'+self_.file;
                  setTimeout(()=>{
                    self_.width= video.videoWidth;
                    self_.height= video.videoHeight;
                    self_.duration= Math.floor(video.duration*1000);
                    console.log(video.duration);
                    self_.dis=false;
                  },2000)
                })
            }
        },
        db(){
            const video = this.$store.state.video;
            const videoinfo = {
                size:this.filesize,
                duration:this.duration,
                rate:Math.floor(this.filesize/(this.duration/1000)*8),
                fps:this.FPS,
                bitdepth:this.Bitdepth,
                w:this.width,
                h:this.height,
                vc:this.videoFormat,
                ac:this.audioFormat
            };
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
