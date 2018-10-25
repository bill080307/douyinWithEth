<template>
  <div class="welcome">
    language
    <button @click="handleLanguage('en')">English</button>
    <button @click="handleLanguage('cn')">简体中文</button>
    <select>
      <option value="Qm2" @click="handleLanguage('en')">English</option>
      <option value="Qm1" @click="handleLanguage('cn')">简体中文</option>
    </select>
    <div class="content">
      <h1>First Video Share With Blockchain in Earth</h1>
      <p>First Video Share With Blockchain in Earth.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    handleLanguage(lang){
      this.$i18n.locale = lang;
    }
  }
}
</script>

<style scoped>

</style>
