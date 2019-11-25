import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
=======
import Header from "../components/Header";
>>>>>>> 4d6329bf03252f7aa9e2e198715612bfcb53499a
import Main from "@/components/Main"
import Article from "@/components/Article"

Vue.use(Router)

export default new Router({
  routes: [
    {
<<<<<<< HEAD
      path: '/main',
      name: 'main',
=======
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/',
      name: 'Main',
>>>>>>> 4d6329bf03252f7aa9e2e198715612bfcb53499a
      component: Main
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }

  ],
  mode:"history",
})
