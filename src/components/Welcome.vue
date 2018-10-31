<template>
  <div class="welcome">
    {{ $t("message.language") }}:
    <select v-model="languageSelected" @change="handleLanguage">
      <option :value="coupon.lang" v-for="coupon in languages">{{coupon.name}}</option>
    </select>
    <div class="content" v-html="content"></div>
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
            path: 'QmQpt23A9PZjgLq8zLfwXnXrxk9zSzMcE5y4XHtzjAmjGF'
          },
          'zh_cn': {
            lang: 'zh_cn',
            name: '简体中文',
            path: 'QmZKNuf1qd73eDZyM3ST5mjJoZAJeXW38iFyCCr6a1wrje'
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
