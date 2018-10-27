<template>
  <div class="videolist" v-show="databaseConnect">
    <ul>
      <li v-for="item in list">
        <router-link :to="{path:'/video',query:{id:item.videoid}}">
          <img :src="item.cover">
          <p class="title">{{ item.title }}</p>
          <p class="info">
            <span class="time">{{ item.time | formatDate }}</span>
            <span class="gratuity">{{ item.gratuity }}</span>
            <span class="comment">{{ item.comment }}</span>
          </p>
        </router-link>
      </li>
    </ul>
    <div class="button">
      <button>Previous</button>
      <button>Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Videolist',
  data () {
    return {
        videoNum:0,
        list:[],
    }
  },
    methods:{
        init(){
            const video = this.$store.state.video;
            video.methods.videoNum().call().then((res)=>{
                this.videoNum = res;
                var num = this.videoNum-1;
                this.list = [];
                while (num>this.videoNum-5&&num>=0){
                    var cnum=num;
                    video.methods.getVideoPreview(num).call().then((res)=>{
                        ipfs.files.get(res.cover, (err, files)=> {
                            let blob = new Blob([files[0].content]);
                            this.list.push({
                                title:res.title,
                                cover:URL.createObjectURL(blob),
                                time:res.timestamp,
                                gratuity:res.gratuityNum,
                                comment:res.commentsNum,
                                videoid:cnum
                            });
                        })

                    });
                    num--;
                }
            });
        }
    },
    created:function () {
        if(this.$store.state.databaseConnect){
            this.init();
        }
    },
  computed:{
    databaseConnect() {
      return this.$store.state.databaseConnect
    }
  },

  filters:{
  }
}
</script>

<style scoped>
  .videolist{
  }
  .videolist ul{
    list-style-type: none;
    padding: 0;
    overflow: auto;
    height: 400px;
  }
  .videolist li{
    width: 200px;
    float: left;
    margin: 0;
  }
  .videolist img{
    max-width: 100px;
    max-width: 60px;
  }
  .button{
    position: absolute;
    right: 360px;
    top: 0;
  }
</style>
