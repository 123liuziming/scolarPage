<template>
  <div>
    <div>
      <h3 class="article-header">The rise of the machines: <br>Artificial intelligence meets<br> scholarly content</h3>
      <a class="search-tag-line" href="main.html">{{ author }}</a>
      <p class="button">
        <el-button class="co" type="success" round><font color="black"><strong>收藏</strong></font></el-button>
        <el-button style="border:0px" disabled type="info" round>已收藏</el-button>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'article_head',
        data() {
            return {
                author: "AD Wade, K Wang"
            }
        }
    }
</script>

<style scoped>

  h3.article-header {
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 36px;
    color: #fff;
    text-align: left;
    margin-left: 10%;
    margin-top: 3%;
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

  .bg {
    background: #353b65;
  }

  .co {
    background: greenyellow;
    border: 0px;
  }
</style>
