<template>
<div id="body">
  <div id="reasearchFields">
    <h4 style="display: inline"><b style="color: white">研究方向：</b></h4>
    <el-button round size="mini" class="tag">Artificial Intelligence</el-button>
    <el-button round size="mini" class="tag">Computer Vision</el-button>
    <el-button round size="mini" class="tag">Machine Learning</el-button>
  </div>
  <Cards></Cards>
</div>
</template>

<script>
    import Cards from "./Cards";
    export default {
        name: "Body",
        components:{
            Cards
        }
    }
</script>

<style scoped>
  #body{
    width: 70%;
    height: 700px;
    background-color: black;
    position:absolute;
    left:50%;
    transform: translate(-50%,-50%);
    margin-top: 26%;
    border-radius: 15px;
  }
  #reasearchFields{
    padding-left: 4%;
    padding-top: 3%;
  }
  .tag{
    margin-left: 5%;
    width: 18%;
  }
</style>
