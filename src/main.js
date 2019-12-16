<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "../theme/index.css";
import echarts from "echarts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUser, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import defaultClient from "./graphql/client";
import VueApollo from "vue-apollo";

import Chat from 'vue-beautiful-chat'
import vmodal from 'vue-js-modal'
Vue.use(vmodal , { dialog: true })
Vue.use(Chat, {})

library.add(faSearch, faUser, faSyncAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

const apolloProvider = new VueApollo({ defaultClient });
Vue.use(VueApollo);

Vue.config.productionTip = false;

window.router=router;

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  components: { App },
  template: "<App/>"
});
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "../theme/index.css";
import echarts from "echarts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUser, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import defaultClient from "./graphql/client";
import VueApollo from "vue-apollo";

library.add(faSearch, faUser, faSyncAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

const apolloProvider = new VueApollo({ defaultClient });
Vue.use(VueApollo);

Vue.config.productionTip = false;

window.router=router;

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  components: { App },
  template: "<App/>"
});
>>>>>>> e7e5f632ed3942599d47f57ded3f6c703b6609d6
