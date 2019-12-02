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

library.add(faSearch);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

import { login } from "./API/user";

async function testLogin() {
  const data = await login("czy@buaa.edu.cn", "1234");
  console.log(data);
}

testLogin();
