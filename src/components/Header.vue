<template>
  <div>
  <div class="fh5co-loader"></div>
    <header id="fh5co-header" class="fh5co-cover" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="display-tc animate-box" data-animate-effect="fadeIn">
        <div class="container" style="width: 55%;float: left">
          <h1 style="color: white"><b>Feifei Li:</b></h1>
          <h4 style="color: white">StandFord University(2016-now)</h4>
          <h5><a>ffl@standford.edu</a></h5>
          <p class="button">
            <el-button class="co" type="success" round size="mini"><font color="black"><strong>发送私信</strong></font></el-button>
            <el-button class="co" type="success" round size="mini"><font color="black"><strong>关注+</strong></font></el-button>
            <el-button disabled type="info" round size="mini">已关注</el-button>
          </p>
        </div>
        <div style="float: left;"><Avatar></Avatar></div>
      </div>
    </header>
  </div>

</template>

<script>
    import Avatar from "./Avatar";

    export default {
        name: "Main",
        components: {Avatar},
        data(){
            return{
                msg:"good"
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
  h1, h2, h3, h4, h5, h6, figure {
    color: #000;
    font-family: "Work Sans", Arial, sans-serif;
    font-weight: 400;
    margin: 0 0 20px 0;
  }
  .fh5co-cover {
    height: 200px;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    position: relative;
  }
  .fh5co-cover .overlay {
    z-index: 0;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: rgba(64, 64, 64, 0.9);
  }

  .fh5co-cover .display-tc {
    z-index: 9;
    height: 200px;
    padding-top: 5%;
    padding-left: 20%;

  }

</style>
