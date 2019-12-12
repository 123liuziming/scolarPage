<template>
  <div>
    <el-button-group style="padding-left: 28vw;margin-bottom: 3vh">
      <el-button :type="yearSel" size="mini" @click="sortByYear">按年份排序</el-button>
      <el-button :type="refSel" size="mini" @click="sortByRef">按引用量排序</el-button>
    </el-button-group>
    <div style="width: 74vw;margin-left: 1vw;text-align:justify">
      <el-card class="articles" v-for="article in articles.slice(5 * (pageNow - 1), 5 * pageNow)" style="margin-top:2vh">
        <div class="article-entry standard">
          <h4>
            <a class="title">{{ article.title }}({{article.year}})</a>
          </h4>
          <div style="text-align:justify;white-space:normal;
         word-break:break-all;margin-left:1vw">
            <a>lzm</a>
            <a class="other align alignNobottom" v-for="author in article.authors" @click="goToAuthor(author.id)">{{ author.name }}</a>
          </div>
          <el-button
            size="mini"
            class="conference align"
            v-for="(tag, index) in article.keywords" v-if="index < 3" :key="index" @click="goToSearch(tag)">
            {{ tag }}
          </el-button>
          <div class="doi align">{{article.doi}}</div>
          <div>
            <span
            ><el-button type="warning" size="mini" class="align">{{
                article.lang === "zh" ? "中文":"English"
              }}</el-button></span
            >
            <el-divider direction="vertical"></el-divider>
            <span style="color: greenyellow">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="
                  [1] 王海粟.浅议会计信息披露模式[J].财政研究，2004,21(1)：56-58.
                "
              >
                <el-button slot="reference" size="mini" type="success"
                >引用</el-button
                >
              </el-popover>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: yellow">已被引{{ article.nCitation === null ? 0 : article.nCitation }}次</span>
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
      style="padding-left: 4.5vw;padding-top: 3vh"
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
        props:["articles","totalArticles"],
        data() {
            return {
                tabPosition: "right",
                pageNow: 1,
                yearSel:"primary",
                refSel:"",
            };
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
                this.sortKey(this.articles, "nCititation");
                this.refSel = "primary";
                this.yearSel = "";
            },
            goToSearch(str){
              this.$router.push({path:"/search",query:{w:str}});
            },
            goToAuthor(id){
              window.location.href = "/main?ID=" + id;
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

  a:hover,
  a:active,
  a:focus {
    color: #ea9215;
    outline: none;
    text-decoration: none;
  }

  a.other {
    color: #5cb85c;
  }

  a.title {
    color: white;
    margin-left: 1vw
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
    margin-left: 1vh;
    margin-bottom: 1.5vh;
  }
  .align.alignNobottom{
    margin-bottom: 0.5vh
  }

  .conference {
    margin-top: 1%;
  }

  .doi{
    color: yellowgreen;
  }
</style>
