<template>
  <b-card no-body class="overflow-hidden comment-card">
    <b-tooltip target="tooltip-target-1" triggers="hover">
      <UserCard :user="user"></UserCard>
    </b-tooltip>
    <b-row no-gutters>
      <b-col md="2" id="tooltip-target-1">
        <b-card-img :src="avatar" class="rounded-0"/>
      </b-col>
      <b-col md="10">
        <b-card-body :title="username">
        </b-card-body>
      </b-col>
      <b-col md="6">
        {{ timestamp }}
      </b-col>
      <b-col md="6">
        {{ videotimestamp }}
      </b-col>
      <b-card-body>
        <b-card-text>{{ commentinfo }}</b-card-text>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
  import Axios from "axios";
  import {formatDate, formatdurationtime} from "../utils/assist";
  import UserCard from "./UserCard";

  export default {
    name: "CommentCard",
    components: {UserCard},
    data(){
      return {
        avatar: '',
        username: '',
        commentinfo: '',
        timestamp: 0,
        videotimestamp: 0,
      }
    },
    props:['comment','user'],
    methods:{
      async init(){
        console.log(this.comment);
        let userinfo = await Axios.get('/ipfs/'+this.user.userHash).then((res)=>{
          return res.data
        });
        this.avatar = userinfo.avatar;
        this.username = userinfo.username;
        await Axios.get('/ipfs/'+this.comment.contentHash).then((res)=>{
          this.commentinfo = res.data
        });
        this.timestamp = formatDate(this.comment.timestamp, 'short');
        this.videotimestamp = formatdurationtime(this.comment.videotimestamp,'millisecond');
      }
    },
    created() {
      this.init()
    },
  }
</script>

<style scoped>
  .card-body{
    padding: 0.2rem;
  }
  .comment-card{
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 10px;
  }
</style>