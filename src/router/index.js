import Vue from 'vue'
import Router from 'vue-router'
import Weclome from '@/components/Welcome'
import Video from '@/components/Video'
import Setting from '@/components/Setting'
import Upload from '@/components/Upload'
import Share from '@/components/Share'

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
      path: '/v/:path/:title',
      name: 'Video',
      component: Video
    },
    {
      path: '/share/:id',
      name: 'Share',
      component: Share
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
