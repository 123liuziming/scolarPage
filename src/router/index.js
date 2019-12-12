import Vue from "vue";
import Router from "vue-router";
import Main from "../components/Scholar/Main";
import Article from "@/components/Article";
import Index from "@/components/Index";
import Relation from "../components/Scholar/Relation";
import SearchResults from "../components/Search/SearchResults";

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
      name: "article",
      component: Article,
    },
    {
      path: "/search",
      name: "Search",
      component: SearchResults,
    }
  ],
  mode: "history"
});
