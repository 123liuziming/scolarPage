<template>
<div id="body" >
    <el-main>
    <el-row style="margin-top:5%">
        <el-col :span="18">
            <div id="content">
            </div>
        </el-col>
        <el-col :span="6" >
            <div id="yinyong">
                <h1 id="fonter">
                    <strong>710</strong>
                </h1>
                <p id="fonter2">
                    引用
                </p>
            </div>
            <div id="fabu">
                <h1 id="fonter">
                    <strong>2016</strong>
                </h1>
                <div id="fonter2">
                    发布于
                </div>
            </div>
        </el-col>
    </el-row> 
    </el-main>
</div>
</template>

<script>
export default {
  name: 'article_body',

  data(){
      return{
          author:"AD Wade, K Wang"
      }
  }
}
</script>

<style scoped>
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

#body{
    width: 70%;
    height: 1000px;
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
  #content{
      width: 90%;
      height: 80%;
      margin-top:1%;
      margin-right: 0;
      margin-left: 5%;
      font-size: 25px;
  }
  #yinyong{
      width: 80%;
      height: 12%;
      margin-top: 8%;
      background: gray;
  }
  #fabu{
      width: 80%;
      height: 12%;
      margin-top: 8%;
      background: gray;
      
  }
  #fonter{
      margin-bottom:0px; 
      margin-right: 2%;
      font-size: 70px;
      text-align: right;
      color: white;
  }
  #fonter2{
      margin-top:0px; 
      font-size: 25px;
      margin-right: 6%;
      text-align: right;
      color: white;
      margin-bottom: 10%;
  }
</style>