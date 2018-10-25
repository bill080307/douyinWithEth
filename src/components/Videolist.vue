<template>
  <div class="videolist">
    <ul>
      <li v-for="n in 5">
        <router-link to="/">
          <img src="../assets/logo.png" alt="">
          <p class="title">{{ title }}</p>
          <p class="info">
            <span class="time">{{ time | formatDate }}</span>
            <span class="gratuity">{{ gratuity }}</span>
            <span class="comment">{{ comment }}</span>
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
      title: 'video title',
      time: '1540441233',
      gratuity:'12',
      comment:'32'
    }
  },
  filters:{
    formatDate:function (inputTime) {
      var date = new Date();
      date.setTime(inputTime * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
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
    right: 230px;
    top: 0;
  }
</style>
