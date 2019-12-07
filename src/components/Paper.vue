<template>
  <div>
    <el-button-group style="padding-left: 28vw;margin-bottom: 3vh">
      <el-button :type="yearSel" size="mini" @click="sortByYear">按年份排序</el-button>
      <el-button :type="refSel" size="mini" @click="sortByRef">按引用量排序</el-button>
    </el-button-group>
    <div style="width: 65vw;margin-left: 1vw">
      <ul class="articles" v-for="article in articles.slice(5 * (pageNow - 1), 5 * pageNow)">
        <li class="article-entry standard">
          <h4>
            <a class="title">{{ article.title }}({{article.year}})</a>
          </h4>
          <div>
            <a class="other" v-for="author in article.authors">{{ author.name }}</a>
            <a>lzm</a>
          </div>
          <el-button
            size="mini"
            class="conference align"
            v-for="(tag, index) in article.keywords" v-if="index < 3" :key="index">
            {{ tag }}
          </el-button>
          <span>{{article.doi}}</span>
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
            <span style="color: yellow">已被引{{ article.nCititation === null ? 0 : article.nCititation }}次</span>
          </div>
        </li>
      </ul>
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

        mounted() {

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
    margin-left: 2%;
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
  }

  a.nav {
    color: #9d9d9d;
    font-size: larger;
  }

  ul.articles {
    list-style: none;
    margin: 0;
  }

  ul.articles .article-entry {
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0 0 24px;
    background: url("../../static/image/standard.png") no-repeat 0 3px;
  }

  ul.articles .article-entry.standard {
    background: url("../../static/image/standard.png") no-repeat 0 3px;
  }

  .align {
    margin-left: 1.5vh;
    margin-bottom: 2vh;
  }

  .conference {
    margin-top: 1%;
  }
</style>
