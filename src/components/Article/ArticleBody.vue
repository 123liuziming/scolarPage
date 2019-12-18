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
          <PDF id="PDF"></PDF>
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
      <div id="infoScolar">作者信息<el-divider ></el-divider>
        <el-link  :underline="false" style="color:#808080;font-size:20px" v-for="a in author.slice(0,5)" @click="toNewPage(a.id)">{{a.name}}<br></el-link>
        <p v-show="!author" style="color:#808080;font-size:20px">暂无学者</p>
      </div>
      <div id="relativeArticle">类似论文推荐<el-divider ></el-divider>
        <el-link :underline="false" style="color: #808080;" v-for="article in RArticles.slice(0,3)" @click="toNewPage2(article.id)">{{article.name}}</el-link>
        <p v-show="RArticles" style="color:grey;font-size:20px">暂无相关推荐</p>
      </div>
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
import {getPaper} from "../../graphql/Article";

export default {
  name: "article_body",
  components: {
    PDF,Article_Detail,comment
  },
  async mounted() {
    this.id = this.$route.query.ID;
    const item = (await getPaper(this.id)).data.getPaperById;
    this.author = item.currentPaper.authors;
    this.time_cite = item.currentPaper.nCitation===null?0:item.currentPaper.nCitation;
    this.year_publish = item.currentPaper.year===null?'???':item.currentPaper.year;
    this.RArticles = item.relatedWorks;
  },
  data() {
    return {
      author: [],
      time_cite:0,
      year_publish:0,
      id:'',
      RArticles:[]
    };
  },
  methods:{
    toNewPage(aid){
      window.location.href = "/main?ID=" + aid;
    },
    toNewPage2(aid){
      window.location.href = "/article?ID=" + aid;
    }
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
  height: 13%;
  margin-top: 21%;
  background: gray;
}
#fabu {
  width: 80%;
  height: 13%;
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
  color:greenyellow;
}
#relativeArticle{
  width: 80%;
  margin-top: 10%;
  font-size: 30px;
  color:greenyellow;
}
</style>
