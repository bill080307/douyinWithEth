<template>
  <div class="comment">
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
    formatvideotime:function (inputTime) {
      var Millisecond = inputTime%1000;
      inputTime = Math.floor(inputTime / 1000);
      var second = inputTime % 60;
      inputTime = Math.floor(inputTime / 60);
      return inputTime+':'+second+'.'+Millisecond;
    },
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
