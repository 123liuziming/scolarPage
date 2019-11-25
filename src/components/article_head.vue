<template>
   <div >
       <div class="search-area-wrapper">
        <div class="search-area container">
            <h3 class="article-header">The rise of the machines: <br>Artificial intelligence meets<br> scholarly content</h3>
            <a class="search-tag-line" href="main.html">{{ author }}</a>
            <p class="button">
               <el-button class="co" type="success" round><font color="black"><strong>收藏</strong></font></el-button>
               <el-button style="border:0px" disabled type="info" round>已收藏</el-button>
            </p >
        </div>
    </div>
    <div class="bg">
        
    </div>
   </div>
</template>

<script>
export default {
  name: 'article_head',
  data(){
      return{
          author:"AD Wade, K Wang"
      }
  }
}
</script>

<style scoped>
.search-area-wrapper {
  background: #353b65 url("../../static/picture/bg.jpg") top no-repeat;
  background-size: 100%;
  min-height: 450px;
  height: auto !important;
  height: 450px;
}
.search-area-wrapper .search-area {
  padding: 50px 0;
}
h3.article-header {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 40px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
  margin-top: 3%;
  width: 70%;
}
a.search-tag-line {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
  line-height: 28px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
}
p.button {
    margin-top: 1.5%;
    text-align: left;
    margin-left: 10%;
}
.bg{
    background: #353b65;
}
.co{
    background: greenyellow;
    border: 0px;
}
</style>