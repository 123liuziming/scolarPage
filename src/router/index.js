import Vue from "vue";
import Router from "vue-router";
import Header from "../components/Header";
import Main from "@/components/Main";
import Article from "@/components/Article";
import Index from "@/components/Index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/header",
      name: "Header",
      component: Header
    },
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/main",
      name: "Main",
      component: Main
    },
    {
      path: "/article",
      name: "article",
      component: Article
    }
  ],
  mode: "history"
});
