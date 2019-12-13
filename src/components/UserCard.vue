<template>
  <b-card no-body class="overflow-hidden" >
    <a :href="'/user/'+user.userAddress">
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
        let userinfo = await Axios.get('/ipfs/'+this.user.userHash+'/user.json').then((res)=>{
          return res.data
        });
        this.avatar = userinfo.avatar;
        this.username = userinfo.username;
        this.description = userinfo.description;
        console.log(user);
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
  a:hover {
    text-decoration: none;
  }
</style>