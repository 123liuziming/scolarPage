<template>
<div class="body" >
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

  #yinyong{
      width: 18%;
      height: 12%;
      margin-top: 5%;
      margin-left: 80%;
      margin-right:5%;
      background: gray;

  }
  #fabu{
      width: 18%;
      height: 12%;
      margin-top: 5%;
      margin-left: 80%;
      margin-right:5%;
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
