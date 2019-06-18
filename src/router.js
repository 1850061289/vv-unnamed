import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['./views/Home.vue'], resolve);
      }

      // component: () => import('./views/Home.vue')
      // component: import('./views/Home.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },

    {
      path: '/js',
      name: 'js',
      component: function (resolve) {
        require(['./views/JsNew.vue'], resolve);
      }
    },

    {
      path: '/eventLoop',
      name: 'eventLoop',
      component: function (resolve) {
        require(['./views/EventLoop.vue'], resolve);
      }
    },

    {
      path: '/prototype',
      name: 'prototype',
      component: function (resolve) {
        require(['./views/Prototype.vue'], resolve);
      }
    },

    {
      path: '/home3',
      name: 'home3',
      component: function (resolve) {
        require(['./views/Home3.vue'], resolve);
      }
    },

    {
      path: '/test',
      name: 'test',
      component: function (resolve) {
        require(['./views/Test.vue'], resolve);
      }
    },

    {
      path: '/qrcode',
      name: 'qrcode',
      component: function (resolve) {
        require(['./views/Qrcode.vue'], resolve);
      }
    },

    {
      path: '/smashEgg',
      name: 'smashEgg',
      component: function (resolve) {
        require(['./views/SmashEgg.vue'], resolve);
      }
    },

    {
      path: '/mvvm',
      name: 'mvvm',
      component: (resolve) => {
        require(['./views/MVVM.vue'], resolve);
      }
    },

    {
      path: '/vueCourse',
      name: 'vueCourse',
      component: (resolve) => {
        require(['./views/VueCourse.vue'], resolve);
      }
    },

    {
      path: '/foodLottery',
      name: 'foodLottery',
      component: (resolve) => {
        require(['./views/FoodLottery.vue'], resolve);
      }
    }
  ]
})