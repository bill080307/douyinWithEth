<template>
  <div class="welcome">
    language
    <select v-model="languageSelected" @change="handleLanguage">
      <option :value="coupon.lang" v-for="coupon in languages">{{coupon.name}}</option>
    </select>
    {{ $t("message.hello")}}
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
        Axios.get('/ipfs/' + this.languages[this.languageSelected].path).then((res) => {
          this.content = res.data.toString('utf8')
        })
      }
    },
    created() {
      this.languageSelected = this.languages['en'].lang;
    },
  }
</script>

<style scoped>

</style>
