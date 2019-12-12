<template>
  <div class="body bodyArticle">
    <el-row>
      <el-col :span="18">
      <div id="content">
        <div style="margin:2%">
          <div style="color:white">文章信息</div>
          <Article_Detail></Article_Detail>
        </div>
        <div style="margin:2%">
          <div style="color:white;margin-bottom:1%">PDF预览</div>
          <PDF></PDF>
          </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="yinyong">
        <h1 id="fonter">
          <strong>{{time_cite}}</strong>
        </h1>
        <p id="fonter2">
          引用
        </p>
      </div>
      <div id="fabu">
        <h1 id="fonter">
          <strong>{{year_publish}}</strong>
        </h1>
        <div id="fonter2">
          发布于
        </div>
      </div>
      <div id="infoScolar">作者信息<el-divider ></el-divider></div>
    </el-col>
    </el-row>
    <el-row>
      <comment style="margin-left:10%;margin-right:10%;margin-top:5%"></comment>
    </el-row>
  </div>
</template>

<script>
import PDF from "../pdf";
import comment from "./comment"
import Article_Detail from "./ArticleDetail"
export default {
  name: "article_body",
  components: {
    PDF,Article_Detail,comment
  },
  data() {
    return {
      author: "AD Wade, K Wang",
      time_cite:0,
      year_publish:2016
    };
  }
};
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
#content {
  width: 90%;
  height: 80%;
  margin-top: 1%;
  margin-right: 0;
  margin-left: 5%;
  font-size: 25px;
  margin-bottom: 1% ;
}
#yinyong {
  width: 80%;
  height: 12%;
  margin-top: 21%;
  background: gray;
}
#fabu {
  width: 80%;
  height: 12%;
  margin-top: 8%;
  background: gray;
  margin-bottom: 12%
}
#fonter {
  margin-bottom: 0px;
  margin-right: 2%;
  font-size: 70px;
  text-align: right;
  color: white;
}
#fonter2 {
  margin-top: 0px;
  font-size: 25px;
  margin-right: 6%;
  text-align: right;
  color: white;
  margin-bottom: 10%;
}
@media (max-width: 1200px) {
  h1 strong {
    font-size: 4vmax;
  }
}
#infoScolar{
  width: 80%;
  margin-top: 1%;
  font-size: 30px;
  color:grey;
}
</style>
