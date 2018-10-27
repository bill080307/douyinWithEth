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

        if (this.$store.state.databaseConnect) {
          ipfs.files.get(this.languages[this.languageSelected].path, (err, files) => {
            this.content = files[0].content.toString('utf8')
          })
        } else {
          Axios.get('/ipfs/' + this.languages[this.languageSelected].path).then((res) => {
            console.log(res)
          })
        }

      }
    },
    created() {
      this.languageSelected = this.languages[0].lang;
    },
  }
</script>

<style scoped>

</style>
