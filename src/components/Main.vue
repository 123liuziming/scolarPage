<template>
  <div class="container">
  <div class="fh5co-loader"></div>
    <header id="fh5co-header" class="fh5co-cover" data-stellar-background-ratio="0.5">
      <div class="overlay" style="float: left"></div>
      <div class="display-tc animate-box" data-animate-effect="fadeIn">
        <h1>Feifei Li</h1>
        <h2>StandFord University(2016-now)</h2>
        <a>ffl@standford.edu</a>
        <div style="margin-top: 3%">
          <p><a class="btn btn-primary btn-md btn-learn" href="#">发送私信</a> <a class="btn btn-primary btn-md popup-vimeo btn-video" href="https://vimeo.com/channels/staffpicks/93951774"><i class="icon-play"></i>关注+</a></p>
        </div>
      </div>
      <div style="float: left; margin-left: 50%; padding-top: 5%">
        <div style="margin-left: 30%">
          <el-avatar>USR</el-avatar>
        </div>
      </div>
    </header>
  </div>

</template>

<script>
    import Avatar from "./avatar";
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

</style>
