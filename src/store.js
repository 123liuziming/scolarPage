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
      if (payload.token)
        localStorage.setItem("token", payload.token);
    },
    clearUser(state) {
      state.user = {
        name: "",
        avatar: "",
        role: 0,
        id: "",
      };
      localStorage.setItem("token", "");
    }
  },
  actions: {
    updateUser(context, userInfo) {
      if (!userInfo) context.commit("clearUser");
      else context.commit("updateUser", userInfo);
    }
  },
  getters: {
    userId: state => {
      return state.user.id;
    },
    usersName: state => state.user.name,
    hasLoggedIn: state => !!state.user.id,
    isAdmin: state => !!state.user.role,
  }
});

export default store;

/* available actions */

const updateUser = "updateUser";

export { updateUser };
