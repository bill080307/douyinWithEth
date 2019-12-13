import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Video from "./views/Video";
import Userinfo from "./views/Userinfo";
import Upload from "./views/Upload";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'video',
      component: Video
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
