import Vue from 'vue'
import Router from 'vue-router'
import Weclome from '@/components/Welcome'
import Video from '@/components/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weclome',
      component: Weclome
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    }
  ]
})
