<template>
  <b-card no-body class="overflow-hidden user-card" >
    <a :href="'#/user/'+user.userAddress">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img :src="avatar" class="rounded-0"/>
        </b-col>
        <b-col md="9">
          <b-card-body :title="username">
            <b-card-text>
              📺: {{ user.userVideoNums}},
              👍: {{ user.userGratuityCount}},
              🎁: {{ user.userGratuitySum}}
            </b-card-text>
          </b-card-body>
        </b-col>
        <b-card-body>
          <b-card-text>{{ description }}</b-card-text>
        </b-card-body>
      </b-row>
    </a>
  </b-card>
</template>

<script>
  import Axios from 'axios'
  import {formatETH} from "../utils/assist";
  export default {
    name: "UserCard",
    data(){
      return {
        avatar: '',
        username: '',
        description: ''
      }
    },
    props:['user'],
    methods:{
      async init(){
        if(this.user.userHash.length<1){
            return ;
        }
        let userinfo = await Axios.get('/ipfs/'+this.user.userHash).then((res)=>{
          return res.data
        });
        this.avatar = userinfo.avatar;
        this.username = userinfo.username;
        this.description = userinfo.description;
        this.user.userGratuitySum = formatETH(this.user.userGratuitySum);
      }
    },
    created() {
      // this.init()
    },
    watch:{
      user(val, oldval){
        this.init();
      }
    }
  }
</script>

<style scoped>
  .card-body{
    padding: 0.2rem;
  }
  a:hover {
    text-decoration: none;
  }
  .user-card{
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 10px;
  }
</style>