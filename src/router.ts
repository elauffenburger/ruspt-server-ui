import Vue from 'vue';
import Router from 'vue-router';
import Sandbox from './views/Sandbox.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'sandbox',
    },
    {
      path: '/sandbox',
      name: 'sanbox',
      component: Sandbox,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
