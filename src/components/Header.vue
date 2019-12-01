<template>
  <div class="headAnimate">
  <div class="fh5co-loader"></div>
    <header id="fh5co-header">
      <div>
        <div class="container" style="width: 49vw;float: left">
          <h1 style="color: white" class="h1"><b>Feifei Li:</b></h1>
          <h4 style="color: white" class="h4">StandFord University(2016-now)</h4>
          <h5 class="h5"><a>ffl@standford.edu</a></h5>
          <p class="button" style="margin-top: 3vh">
            <el-button class="co" type="success" round size="mini"><font color="black"><strong>发送私信</strong></font></el-button>
            <el-button class="co" type="success" round size="mini"><font color="black"><strong>关注+</strong></font></el-button>
            <el-button disabled type="info" round size="mini">已关注</el-button>
          </p>
        </div>
        <div style="float: left"><el-avatar :size="bigAvatarSize" :src="bigAvatar"></el-avatar></div>
      </div>
    </header>
  </div>

</template>

<script>

    export default {
        name: "Main",
        components: {},
        data(){
            return{
                msg:"good",
                bigAvatar:"../static/image/is1.jpg",
                bigAvatarSize:190
            }
        }
    }
</script>

<style scoped>
  a {
    color: #EA9215;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }
  a:hover, a:active, a:focus {
    color: #EA9215;
    outline: none;
    text-decoration: none;
  }

  .h1{
    font-family: "Menlo", "Consolas", "Microsoft YaHei", monospace;
    font-size: 5vw;
  }
  .h4{
    font-family: "Menlo", "Consolas", "Microsoft YaHei", monospace;
    font-size: 3px;
  }
  .h5{
    font-family: "Menlo", "Consolas", "Microsoft YaHei", monospace;
    font-size: 2px;
  }
</style>
