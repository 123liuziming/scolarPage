<template>
  <div>
    <el-button-group id="btnGroup" >
      <el-button :type="yearSel" size="mini" @click="sortByYear">按年份排序</el-button>
      <el-button :type="refSel" size="mini" @click="sortByRef">按引用量排序</el-button>
    </el-button-group>
    <div class = "bigDiv">
      <el-card class="articlesCard" v-for="(article, ind) in articles.slice(5 * (pageNow - 1), 5 * pageNow)" style="margin-top:2vh" :key="`ar${ind}`">
        <div class="article-entry standard">
          <h4>
            <a class="title" @click="goToPaper(article.id)">{{ article.title }}({{article.year}})</a>
          </h4>
          <div style="text-align:justify;white-space:normal;
         word-break:break-all;margin-left:0.5vw">
            <a>{{selfnames}}</a>
            <a class="other align alignNobottom" v-for="(author,ind) in article.authors" v-if="ind < 20" @click="goToAuthor(author.id)" :key="`ar${ind}`">{{ author.name }}</a>
          </div>
            <el-button
              size="mini"
              class="conference align"
              v-for="(tag, index) in article.keywords" v-if="index < 3" :key="index" @click="goToSearch(tag)">
              {{ tag }}
            </el-button>
          <div class="align" style="color: yellowgreen" v-if="article.doi">doi:{{ article.doi }}</div>
          <div class="align" style="color: coral" v-if="article.venue">期刊:{{article.venue}}</div>
          <div>
            <span
            ><el-button type="warning" size="mini" class="align">{{
                article.lang === "zh" ? "中文":"English"
              }}</el-button></span
            >
            <el-divider direction="vertical"></el-divider>
            <span style="color: yellow">已被引{{ article.nCitation === null ? 0 : article.nCitation }}次</span>
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
      style="padding-left: 1vw;padding-top: 3vh"
      layout="prev, pager, next"
      :total="totalArticles"
      :page-size="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>

    export default {
        name: "Paper",
        props:{
            articles : Array,
            totalArticles: Number,
            selfnames: String,
        },
        data() {
            return {
                tabPosition: "right",
                pageNow: 1,
                yearSel:"primary",
                refSel:"",
            };
        },
        mounted(){
        },

        methods: {
            handleCurrentChange: function (currentPage) {
                this.pageNow = currentPage;
                this.$router.push({path: '/main', query: {page: currentPage}});
            },
            sortKey(array, key) {
                return array.sort(function (a, b) {
                    let x = a[key];
                    let y = b[key];
                    return ((x > y) ? -1 : (x < y) ? 1 : 0);
                })
            },
            sortByYear:function () {
                this.sortKey(this.articles, "year");
                this.yearSel = "primary";
                this.refSel = "";
            },
            sortByRef:function () {
                this.sortKey(this.articles, "nCitation");
                this.refSel = "primary";
                this.yearSel = "";
            },
            goToSearch(str){
                this.$router.push({path:"/search",query:{w:str.substr(0,20)}});
            },
            goToAuthor(id){
                window.location.href = "/main?ID=" + id;
            },
            goToPaper(id){
              window.location.href = "/article?ID=" + id;
            }
        },
        watch: {
            $route() {
                this.pageNow = this.$route.query.page;
            }
        }
    };
</script>

<style scoped>
  a {
    color: #ea9215;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }

  a:focus {
    color: #ea9215;
  }

  a.other {
    color: #5cb85c;
  }

  a.title {
    color: white;
    margin-left: 0.5vw
  }

  a.nav {
    color: #9d9d9d;
    font-size: larger;
  }

  ul.articles {
    list-style: none;
    margin-top:2vh;
  }

  ul.articles .article-entry {
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0 0 24px;
    background: url("../../../static/image/standard.png") no-repeat 0 3px;
  }

  ul.articles .article-entry.standard {
    background: url("../../../static/image/standard.png") no-repeat 0 3px;
  }

  .align {
    margin-bottom: 1.5vh;
    margin-left: 0.5vw;
  }
  .align.alignNobottom{
    margin-bottom: 0.5vh
  }

  .conference {
    margin-top: 1%;
  }


  .articlesCard{
      width: 100%;
  }
  @media (max-width: 1200px) {
    .articlesCard{
      width: 75vw;
    }
  }
  .bigDiv{
    width: 73vw;margin-left: 1vw;text-align:justify
  }
  #btnGroup{
    margin-bottom: 3vh;
    padding-left: 30vw;
  }

  @media (max-width: 1200px) {
    .bigDiv{
      width: 80vw;
    }
    .el-card{
      width:92vw;
    }
    #btnGroup{
      padding-left: 38vw;
    }
  }
</style>
