import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    {
      path: '/home2',
      name: 'home2',
      component: function (resolve) {
        require(['./views/Home2.vue'],resolve);
      }
    },

    {
      path: '/home3',
      name: 'home3',
      component: function (resolve) {
        require(['./views/Home3.vue'],resolve);
      }
    },

    {
      path: '/test',
      name: 'test',
      component: function(resolve){
        require(['./views/Test.vue'],resolve);
      }
    }
  ]
})
