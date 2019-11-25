import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/components/Main"
import Article from "@/components/Article"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
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
