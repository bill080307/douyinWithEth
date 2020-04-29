<template>
  <div>
    <b-row>
      <b-col cols="9">
        <VideoPlayer :video="videoData"></VideoPlayer>
      </b-col>
      <b-col cols="3">
        <UserCard :user="userData"></UserCard>
        <CommentCard :comment="comment" :user="userData" v-for="comment in CommentData"></CommentCard>
        <FunctionCard></FunctionCard>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import VideoPlayer from "../components/VideoPlayer";
  import UserCard from "../components/UserCard";
  import CommentCard from "../components/CommentCard";
  import FunctionCard from "../components/FunctionCard";
  export default {
    name: "Video",
    components: {FunctionCard, CommentCard, UserCard, VideoPlayer},
    data(){
      return {
        videoId :0,
        videoData: {
          videoID: 0,
          videoHash: '',
          duration: 0,
          timestamp: 0,
          author: '',
          commentsNum: 0,
          vlableNum: 0,
          gratuityNum: 0,
          gratuitySum: 0,
        },
        userData: {
          userAddress: '',
          userHash: '',
          userVideoNums: 0,
          userAlbumNum: 0,
          userGratuityCount: 0,
          userGratuitySum: 0
        },
        CommentData: [],
      }
    },
    methods:{
      async init(){
        this.videoId = this.$route.params.id;
        const wait = setInterval(()=>{
            if(this.$store.state.dikTok!=null){
                window.clearInterval(wait);
                this.initplayer();
            }
        },1000)
      },
      async initplayer(){
          const dikTok = this.$store.state.dikTok;
          this.videoData = await dikTok.methods.getVideo(this.videoId).call().then((res)=>{return res});
          this.videoData['videoID'] = this.videoId;

          this.userData = await dikTok.methods.getUserInfo(this.videoData.author).call().then((res)=>{return res});
          this.userData['userAddress'] = this.videoData.author;

          for (let i = 0; i < this.videoData.commentsNum && i < 6; i++) {
              const comment = await dikTok.methods.getVideoComment(this.videoId, i).call().then((res)=>{return res});
              this.CommentData.append({"author":this.videoData.author}.concat(comment))
          }
      }
    },
    created() {
      this.init()
    },
    watch:{
      $route(to,from){
        this.init();
      },
    }
  }
</script>

<style scoped>

</style>