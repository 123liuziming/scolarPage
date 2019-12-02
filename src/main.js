// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "../theme/index.css";
import echarts from "echarts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

library.add(faSearch);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

const defaultClient = new ApolloClient({
  uri: "http://192.144.174.132:5123/graphql"
});
const apolloProvider = new VueApollo({ defaultClient });

Vue.use();

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  apolloProvider,
  components: { App },
  template: "<App/>"
});
