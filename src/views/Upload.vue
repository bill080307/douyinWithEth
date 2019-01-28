<template>
  <b-container class="upload">
    <b-row>
      <b-col>
        <h1>文件上传</h1>
        <b-tabs>
          <b-tab title="方式1" active>
            <br>
            <b-alert variant="info" show>浏览器上传(仅限小文件上传) 其中FPS需要手动输入</b-alert>
            <b-input-group>
              <b-form-file v-model="videofile" accept="video/*" :state="Boolean(videofile)" placeholder="选择视频"></b-form-file>
              <b-input-group-append>
                <b-btn variant="success" @click="upload">上传</b-btn>
              </b-input-group-append>
            </b-input-group>
            <b-btn variant="outline-success" @click="readinfo">视频已经加载，读取视频信息</b-btn>
          </b-tab>
          <b-tab title="方式2" >
            <br>
            <b-alert variant="success" show>使用工具上传(无限制)</b-alert>

          </b-tab>
        </b-tabs>
        <br>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-tabs>
          <b-tab title="视频预览" active>
            <br>
            <video id="player" controls></video>
          </b-tab>
          <b-tab title="封面" >
            <br>
            <b-img class="cover" :src="coversrc"></b-img>
            <b-button-group vertical>
              <b-form-file v-model="coverfile" :state="Boolean(coverfile)" placeholder="选择封面"></b-form-file>
              <b-button variant="warning" @click="uploadCover">上传封面</b-button>
            </b-button-group>
          </b-tab>
          <b-tab title="视频信息" >
            <br>
            <b-alert variant="info" show>推荐使用 ffprobe -v quiet -print_format json -show_streams -i videofile.mp4</b-alert>
            <b-form-textarea id="videoinfo"
                             v-model="videoinfo"
                             placeholder="视频信息"
                             :rows="3"
                             :max-rows="6">
            </b-form-textarea>
            <b-form-group
                    label="视频信息"
                    label-for="videoinfo">
            </b-form-group>
          </b-tab>
        </b-tabs>
      </b-col>
      <b-col>

        <b-form-group
                label="标题"
                label-for="title">
          <b-form-input id="title" v-model="title"></b-form-input>
        </b-form-group>
        <b-form-group
                label="视频简介"
                label-for="info">
          <b-form-input id="info" v-model="info"></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-form-group
                    label="宽度"
                    label-for="width">
              <b-form-input id="width" v-model="width"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                    label="高度"
                    label-for="height">
              <b-form-input id="height" v-model="height"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                    label="FPS"
                    label-for="fps">
              <b-form-input id="fps" v-model="fps"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                    label="文件大小"
                    label-for="size">
              <b-form-input id="size" v-model="size"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                    label="持续时间"
                    label-for="duration">
              <b-form-input id="duration" v-model="duration"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-form-group
            label="封面"
            label-for="cover">
      <b-form-input id="cover" v-model="cover"></b-form-input>
    </b-form-group>
    <b-form-group
            label="文件索引"
            label-for="filename">
      <b-form-input id="filename" v-model="filename"></b-form-input>
    </b-form-group>
    <b-form-group
            label="文件信息"
            label-for="fileinfo">
      <b-form-input id="fileinfo" v-model="fileinfo"></b-form-input>
    </b-form-group>
  </b-container>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      videofile:null,
      coverfile:null,
      title:'',
      cover:'',
      videoinfo:'',
      info:'',
      duration:0,
      filename:'',
      fileinfo:'',
      size:0,
      width:0,
      height:0,
      fps:0,
    }
  },
  methods: {
    upload(){
      //获取ipfs节点
      const ipfsNode = this.$store.state.ipfsNode;
      //new一个文件对象
      const reader = new FileReader();
      const self_ = this;
      reader.readAsArrayBuffer(this.videofile);
      reader.onloadend = function(e){
        //将文件内存转成buffer对象
        const buffer = Buffer.from(reader.result);
        //调用ipfs的api上传文件
        ipfsNode.files.add(buffer).then((response)=>{
          self_.filename = response[0].hash;
          self_.size = response[0].size;
          console.log(response);
          const video=document.getElementById("player");
          video.src = self_.$store.state.gateway.replace(':hash', self_.filename);
        })
      }
    },
    readinfo(){
      const video=document.getElementById("player");
      this.width = video.videoWidth;
      this.height= video.videoHeight;
      this.duration= Math.floor(video.duration*1000);
    },
    init(){

    },
    uploadCover(){
      //获取ipfs节点
      const ipfsNode = this.$store.state.ipfsNode;
      //new一个文件对象
      const reader = new FileReader();
      const self_ = this;
      reader.readAsArrayBuffer(this.coverfile);
      reader.onloadend = function(e){
        //将文件内存转成buffer对象
        const buffer = Buffer.from(reader.result);
        //调用ipfs的api上传文件
        ipfsNode.files.add(buffer).then((response)=>{
          self_.cover = response[0].hash;
          console.log(response);
        })
      }
    }
  },
  created() {
    this.init();
  },
  computed: {
    videosrc() {
      if(this.filename===''){
        return '';
      }else {
        return this.$store.state.gateway.replace(':hash', this.filename)
      }
    },
  }
}
</script>
<style>
#player{
  width: 100%;
}
</style>

