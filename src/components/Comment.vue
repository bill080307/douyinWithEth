<template>
  <div class="comment" v-show="databaseConnect">
    <ul>
      <li v-for="n in 5">
        <div class="user"><router-link to="/">{{ address | addressab }}</router-link></div>
        <div class="date">
          <span class="pub">{{ pubtime | formatDate }}</span>
          <span class="vidoe">{{ vidoetime | formatvideotime }}</span>
        </div>
        <div class="content">
          {{ content }} - {{ n }}
        </div>
      </li>
    </ul>
    <div class="newcomment">
      <textarea></textarea>
      <input type="number" :value="vidoetime"/><button>publish</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      address:'0x1234567890ABCDEF0x12345601234567890ABCDEF',
      pubtime: '1540441233',
      vidoetime: '12377598',
      content: 'This is my comment'
    }
  },
  computed:{
    databaseConnect() {
      return this.$store.state.databaseConnect
    }
  },
  filters:{
    addressab:function (address) {
      return address.substr(0,5)+'...'+address.substr(8,3);
    }
  }
}
</script>

<style scoped>
  .comment{

  }
  .comment ul{
    list-style-type: none;
    padding: 0;
    overflow: auto;
    height: 400px;
  }
  .newcomment{

  }
</style>
