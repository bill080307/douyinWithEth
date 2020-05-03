import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
// import VueIpfs from './plugins/vue-ipfs';
import VueIpfs from './plugins/ipfs-api';
Vue.use(BootstrapVue);
// VueIpfs.install(Vue,{
//   repo: '/ipfs-' + Math.random(),
//   config: {
//     Addresses: {
//       Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/']
//     }
//   },
//   EXPERIMENTAL: {pubsub: true}
// })
VueIpfs.install(Vue,'/ip4/172.16.1.8/tcp/5001');
// Vue.use(VueIpfs);

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
