<template>
  <div id="app">
    <Navigator/>
    <router-view />
  </div>
</template>

<script>
import Navigator from "./components/Navigator";

export default {
  name: "App",
  components: {
    Navigator
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
  width: 80vw;
  min-height: 100vh;
  margin-top: 300px;
  padding-left: 3vw;
  padding-right: 3vw;
  background-color: black;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
  0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}


.scholarPg{
  padding: 20vh 10vw 0 10vw;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
  url("https://source.unsplash.com/1600x900/?book");
  background-size: cover;
  min-height: 400px;
}

.headAnimate{
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInTop;
  background-color: #444444;
  padding-left: 5vw;
}

.eChartContainer.rardar{
  width: 20vw;
  height: 40vh;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInTop;
}
.eChartContainer.relation{
  width: 75vw;
  height: 70vh;
}
</style>
