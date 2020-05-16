import Vue from 'vue'
import Router from 'vue-router'
import Demo from './views/Demo.vue'
import Video from "./views/Video";
import User from "./views/User";
import Userinfo from "./views/Userinfo";
import Upload from "./views/Upload";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/video/:id',
      name: 'Video',
      component: Video
    },
    {
      path: '/user/:address',
      name: 'User',
      component: User
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
