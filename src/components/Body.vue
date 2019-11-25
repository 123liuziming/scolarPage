<template>
<div class="body bodyScholar">
  <div id="reasearchFields">
    <h4 style="display: inline"><b style="color: white">研究方向：</b></h4>
    <el-button round size="mini" class="tag">Artificial Intelligence</el-button>
    <el-button round size="mini" class="tag">Computer Vision</el-button>
    <el-button round size="mini" class="tag">Machine Learning</el-button>
  </div>
  <Cards></Cards>
  <div><div style="margin-top: 3%;float: left;margin-left: 5%">
    <h3 style="color: gray">相关学者</h3>
    <el-divider></el-divider>
    <div style="float: left"><Avatar class="relateAvatar"></Avatar>
    </div>
    <div style="float: left;"><Avatar class="relateAvatar right"></Avatar></div>
  </div>


    <div class="container" style="float: left;background-color: gray;width: 52%; margin-left: 7%;margin-top: 5%;height: 220px">
      <div style="height: 4px;background-color: greenyellow;width: 100%"></div>
      <p class="selfIntro">I'm recruiting some students to help me with a project.If you 're interested, please contact
        me via the e-mail provided above
      </p>
      <p class="selfIntroTime">2019年5月31日,9:30 a.m.</p>
    </div>
  </div>

    <div class="scholarPaper clear">
        <Paper></Paper>
    </div>


</div>
</template>

<script>
    import Cards from "./Cards";
    import Avatar from "./Avatar";
    import Paper from "./Paper";
    export default {
        name: "Body",
        components:{
            Paper,
            Avatar,
            Cards
        }
    }
</script>

<style scoped>

  #reasearchFields{
    padding-left: 4%;
    padding-top: 3%;
  }
  .tag{
    margin-left: 5%;
    width: 18%;
  }
  .selfIntro{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: x-large;
    color: white;
    padding-top: 7%;
  }
  .selfIntroTime{
    color: #9d9d9d;
    padding-top: 3%;
  }
  .relateAvatar{
    width: 150px;
    height: 150px;
  }
  .relateAvatar.right{
    margin-left: 5%;
  }
  .scholarPaper{
    width: 90%;
    background-color: #2A2A2A;
    margin-left: 5%;
    margin-top: 3%;
    border: 1px solid gray;
  }
  .clear{
    clear: both;
  }
</style>
