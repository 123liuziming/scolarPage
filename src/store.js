// @ts-check

import Vue from "vue";
import Vuex from "vuex";
import { getCurrentUser } from "./graphql/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: "",
      avatar: "",
      role: 0,
      id: "53f31b9edabfae9a84437e2d"
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
    },

    async fetchUserInfo(context) {
      const response = await getCurrentUser();
      context.commit("updateUser", response.data.currentUser);
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
const fetchUserInfo = "fetchUserInfo";

export { updateUser, fetchUserInfo };
