import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VueIpfs from './plugins/vue-ipfs';

Vue.use(BootstrapVue);
Vue.use(VueIpfs);

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'video.js/dist/video-js.css'
new Vue({
  router,
  store,
  filter,
  render: h => h(App)
}).$mount('#app')
