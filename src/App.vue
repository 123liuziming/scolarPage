<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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
  .body{
    width: 70%;
    margin-bottom:5%;
    background-color: black;
    position:absolute;
    left:15%;    /* 定位父级的50% */
    transform: translate(-50%,-50%); /*自己的50% */
    margin-top: 25%;
    -webkit-box-shadow: #000 0px 0px 10px;
    -moz-box-shadow: #000 0px 0px 10px;
    box-shadow: #000 0px 0px 10px;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
  }
  .body.bodyScholar{
    margin-top: 5% !important;
  }
</style>
