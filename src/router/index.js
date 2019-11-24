import Vue from 'vue'
import Router from 'vue-router'
import Header from "../components/Header";
import Main from "../components/Main";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    }

  ],
  mode:"history",
})
