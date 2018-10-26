<template>
  <div class="welcome">
    language
    <select v-model="languageSelected" @change="handleLanguage">
      <option :value="coupon.lang" v-for="coupon in languages" >{{coupon.name}}</option>
    </select>
    {{ $t("message.hello")}}
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
        content: '',
        languages:[
            {
                lang:'en',
                name:'English',
                path:'QmcSXkUAdMeem6rmzb7MJPyvbshNNeT36xGihTvQb71cPu'
            },
            {
                lang:'zh_cn',
                name:'简体中文',
                path:'QmWHtd1rSyatT14SnKga7VeRy96bgVcRRz5cAnL1XwkemG'
            },
        ],
        languageSelected:'',
    }
  },
  methods:{
    handleLanguage(e){
      this.$i18n.locale = this.languageSelected;

      //TODO 取值优化
      var path = '';
      for(var i=0;i<this.languages.length;i++){
          if(this.languages[i].lang==this.languageSelected)path=this.languages[i].path;
      }

      if(this.$store.state.databaseConnect){
          ipfs.files.get(path, (err, files)=> {
              this.content = files[0].content.toString('utf8')
          })
      }else {
          //TODO 通过HTTP网关 异步获取内容。
      }

    }
  },
    created(){
        this.languageSelected = this.languages[0].lang;
    },
}
</script>

<style scoped>

</style>
