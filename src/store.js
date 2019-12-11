// @ts-check

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: "",
      avatar: "",
      role: 0,
      id: ""
    }
  },
  mutations: {
    updateUser(state, payload) {
      for (const key of Object.keys(state.user))
        if (payload[key] !== null && payload[key] !== undefined)
          state.user[key] = payload[key];
    }
  },
  actions: {
    updateUser(context, userInfo) {
      context.commit("updateUser", userInfo);
    }
  },
  getters: {
    usersName: state => {
      return state.user.name;
    },
    userId: state => {
      return state.user.id;
    }
  }
});

export default store;

/* available actions */

const updateUser = "updateUser";

export { updateUser };
