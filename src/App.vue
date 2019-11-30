<template>
  <div id="app">
    <Navigator />
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
  margin-bottom: 5%;
  background-color: black;
  position: absolute;
  left: 10vw; /* 定位父级的50% */
  top: 30vh;
  transform: translate(-50%, -50%); /*自己的50% */
  -webkit-box-shadow: #000 0px 0px 10px;
  -moz-box-shadow: #000 0px 0px 10px;
  box-shadow: #000 0px 0px 10px;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}


.headAnimate{
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInTop;
  background-color: #444444;
}

.body.bodyScholar {
  margin-top: 5% !important;
}
</style>
