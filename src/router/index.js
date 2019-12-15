import Vue from "vue";
import Router from "vue-router";
import Main from "../components/Scholar/Main";
import Article from "@/components/Article";
import Index from "@/components/Index";
import Relation from "../components/Scholar/Relation";
import Plupload from "../components/Scholar/Plupload";
import Search from "../components/Search"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/chart",
      name: "Relation",
      component: Relation
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
      name: "Article",
      component: Article,
    },
    {
      path: "/upload",
      name: "Upload",
      component: Plupload,
    },
    {
      path: '/search',
      name: "Search",
      component: Search
    }
  ],
  mode: "history"
});
