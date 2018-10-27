import Vue from 'vue'
import Router from 'vue-router'
import Weclome from '@/components/Welcome'
import Video from '@/components/Video'
import Setting from '@/components/Setting'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weclome',
      component: Weclome
    },
    {
      path: '/video/:id',
      name: 'Video',
      component: Video
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
    ,
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
