<template>
  <b-container class="upload">
    <b-row>
      <b-col>
        <h1>文件上传</h1>
        <b-form-group
          label="视频hash"
          label-for="hash">
          <b-form-input id="hash" v-model="hash" @change="gethash"></b-form-input>
        </b-form-group>
        <b-form-group
          label="持续时间"
          label-for="duration">
          <b-form-input id="duration" v-model="duration"></b-form-input>
        </b-form-group>
        <b-form-group
          label="语言id"
          label-for="languageid">
          <b-form-input id="languageid" v-model="languageid"></b-form-input>
        </b-form-group>
        <b-button variant="success" @click="publish">确认上传</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    export default {
        name: "Upload",
        data(){
            return {
                hash :'',
                duration: 0,
                languageid:0,
            }
        },
        methods:{
            async init(){
            },
            async gethash(){
                const ipfs = await this.$ipfs;
                const chunks = []
                for await (const chunk of ipfs.cat(this.hash)) {
                    chunks.push(chunk)
                }
                const hashjosn = JSON.parse(Buffer.concat(chunks).toString());
                this.duration = hashjosn['files'][0]['duration'] * 1000;
            },
            async publish(){
                const dikTok = this.$store.state.dikTok;
                let up = await dikTok.methods.publish(this.hash, this.duration, this.languageid)
                    .send({ from: this.$store.state.userAccount })
                    .on("receipt", function(receipt) {
                        //返回成功上链的信息
                        alert("上链成功，区块高度："+receipt.blockNumber);
                        console.log(receipt);
                    }).on("error", function(error) {
                        console.log(error);
                    })
                console.log(up);
            }
        },
        created() {
            this.init()
        },
    }
</script>

<style scoped>

</style>