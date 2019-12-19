import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/chart",
      name: "Relation",
      component: () => import(/* webpackChunkName: "Main" */ "../components/Scholar/Relation"),
    },
    {
      path: "/",
      name: "Index",
      component: () => import(/* webpackChunkName: "Index" */ "@/components/Index"),
    },
    {
      path: "/main",
      name: "Main",
      component: () => import(/* webpackChunkName: "Main" */ "@/components/Scholar/Main")
    },
    {
      path: "/article",
      name: "Article",
      component: () => import(/* webpackChunkName: "Article" */ "@/components/Article"),
    },
    {
      path: "/search",
      name: "Search",
      component: () => import(/* webpackChunkName: "Search" */ "../components/Search"),
    },
    {
      path: '/personalPage',
      name: 'PersonalPage',
      component: () => import(/* webpackChunkName: "Personal" */ "../components/personal/PersonalPage")
    },
  ],
  mode: "history"
});
