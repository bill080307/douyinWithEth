<template>
  <div class="welcome">
    {{ $t("message.language") }}:
    <select v-model="languageSelected" @change="handleLanguage">
      <option :value="coupon.lang" v-for="coupon in languages">{{coupon.name}}</option>
    </select>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'Welcome',
    data() {
      return {
        content: '',
        languages: {
          'en': {
            lang: 'en',
            name: 'English',
            path: 'QmcSXkUAdMeem6rmzb7MJPyvbshNNeT36xGihTvQb71cPu'
          },
          'zh_cn': {
            lang: 'zh_cn',
            name: '简体中文',
            path: 'QmWHtd1rSyatT14SnKga7VeRy96bgVcRRz5cAnL1XwkemG'
          }

        },
        languageSelected: '',
      }
    },
    methods: {
      handleLanguage(e) {
        this.$i18n.locale = this.languageSelected;
        localStorage.setItem("lang",this.languageSelected);
        this.getHtml(this.languages[this.languageSelected].path);
      },
      getHtml(hash){
        Axios.get('/ipfs/' + hash).then((res) => {
          this.content = res.data.toString('utf8')
        })
      }
    },
    created() {
      this.languageSelected = localStorage.getItem("lang");
      this.getHtml(this.languages[this.languageSelected].path);
    },
  }
</script>

<style scoped>

</style>
