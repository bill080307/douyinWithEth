<template>
  <div>
    <b-row>
      <b-col cols="9">
        <VideoPlayer :video="videoCard"></VideoPlayer>
      </b-col>
      <b-col cols="3">
        <UserCard :user="userCard"></UserCard>
        <CommentCard :comment="CommentCard" :user="userCard"></CommentCard>
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
        userCard: {
          userAddress: '0xqweqweqwedsadsad',
          userHash: 'QmPnXvWUuvAEchE1SxgpXTUXhQfUKqXgZ5XJZfxrUsP94R',
          userVideoNums: 2,
          userAlbumNum: 0,
          userGratuityCount: 15,
          userGratuitySum: 14755
        },
        videoCard: {
          videoID: 2,
          videoHash: 'QmVNAuckPWSyLfJdEAPPt8WUnJCNvowZZ1pWHcy37w4do6',
          duration: 6396000,
          timestamp: 1576336248,
          author: '0xqweqweqwedsadsad',
          commentsNum: 123,
          vlableNum: 42,
          gratuityNum: 7,
          gratuitySum: 624752,
        },
        CommentCard: {
          contentHash: 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a',
          timestamp: 1576336248,
          videotimestamp: 6396123,
          author: '0xqweqweqwedsadsad'
        },
      }
    },
    methods:{
      init(){
        this.videoId = this.$route.params.id;
        console.log(videoId);
      },
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