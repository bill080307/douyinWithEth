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
                <b-btn variant="success" @click="uploadfile">上传</b-btn>
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
            <p>
              <b-img class="cover" rounded :src="coversrc"></b-img>
            </p>
            <b-button-group vertical>
              <b-form-file v-model="coverfile" :state="Boolean(coverfile)" placeholder="选择封面"></b-form-file>
              <b-button variant="warning" @click="uploadCover">上传封面</b-button>
            </b-button-group>
          </b-tab>
          <b-tab title="文件信息" >
            <br>
            <b-alert variant="info" show>推荐使用 ffprobe -v quiet -print_format json -show_streams -i videofile.mp4</b-alert>
            <b-form-textarea id="videoinfo"
                             v-model="videoinfo"
                             placeholder="视频信息"
                             :rows="6"
                             :max-rows="10">
            </b-form-textarea>
          </b-tab>
          <b-tab title="视频信息" >
            <br>
            <b-alert variant="info" show>推荐使用第三方工具生成</b-alert>
            <b-form-textarea id="fileinfo"
                             v-model="fileinfo"
                             placeholder="文件信息"
                             :rows="8"
                             :max-rows="10">
            </b-form-textarea>
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
          <b-form-textarea id="info"
                           v-model="info"
                           placeholder="简介"
                           :rows="5"
                           :max-rows="10">
          </b-form-textarea>
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
    <b-row>
      <b-col>
        <b-button variant="success" @click="upload">已确认信息，完成上传</b-button>
      </b-col>
    </b-row>
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
    uploadfile(){
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
    },
    upload(){
      //获取合约实例
      const videoShare = this.$store.state.videoShare;
      const userAccount = this.$store.state.userAccount
      console.log(videoShare);
      //setMyInfo的调用方式需要传入以上3个值，还有send中传入用户自己的地址，价格是程序自己计算完成的，不需要输入。
      videoShare.methods.publish(this.title,this.cover,this.videoinfo,this.info,this.duration,this.filename,this.fileinfo,this.size,this.width,this.height,this.fps)
              .send({ from: userAccount })
              .on("receipt", function(receipt) {
                //返回成功上链的信息
                alert("上链成功，区块高度："+receipt.blockNumber);
                console.log(receipt);
              }).on("error", function(error) {
        console.log(error);
      })
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
    coversrc() {
      return this.$store.state.gateway.replace(':hash', this.cover)
    },
  }
}
</script>
<style>
  #player{
    width: 100%;
  }
  .cover{
    width: 100%;
  }
</style>

