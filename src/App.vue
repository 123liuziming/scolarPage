<template>
  <div id="app">
    <Navigator />
    <router-view />
  </div>
</template>

<script>
import Navigator from "./components/Navigator";
import gql from "graphql-tag";
import { fetchUserInfo } from "@/store";

export default {
  name: "App",
  components: {
    Navigator
  },
  mounted() {
    if (!this.$store.getters.hasLoggedIn && !!localStorage.getItem("token")) {
      this.$store.dispatch(fetchUserInfo);
    }
  }
};
</script>

<style>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.body {
  min-height: 125vh;
  background-color: black;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
  margin-bottom: 10px;
}
.body.bodyScholar{
  margin-top: 300px;
}

.body.bodyArticle {
  margin-top: 100px;
}

.scholarPg {
  padding: 15vh 10vw 0 10vw;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8)),
    url("../static/image/bg.jpg");
  background-size: cover;
  min-height: 400px;
}

@media (max-width: 1200px) {
  .scholarPg {
    padding-left: 0;
    padding-right: 0;
    font-size: 20px;
  }
}

.headAnimate {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInTop;
  background-color: #444444;
  padding-left: 4vw;
}

.eChartContainer.relation {
  width: 75vw;
  height: 590px;
}

</style>
