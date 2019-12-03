<template>
  <div>
    <el-button-group style="padding-left: 28vw;margin-bottom: 3vh">
      <el-button type="primary" size="mini">按年份排序</el-button>
      <el-button size="mini">按引用量排序</el-button>
    </el-button-group>
    <div style="width: 65vw;margin-left: 1vw">
      <ul class="articles" v-for="article in articles">
        <li class="article-entry standard">
          <h4><a class="title">{{article.title}}</a></h4>
          <div><a class="other" v-for="author in article.authors">{{author}}</a>
            <a>lzm</a></div>
          <el-button size="mini" class="conference align" v-for="tag in article.tags">
            {{tag}}
          </el-button>
          <div>
            <span><el-button type="warning" size="mini" class="align">{{article.db}}</el-button></span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: greenyellow">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="
                  [1] 王海粟.浅议会计信息披露模式[J].财政研究，2004,21(1)：56-58.
                ">
    <el-button slot="reference" size="mini" type="success">引用</el-button>
  </el-popover>

            </span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: yellow">已被引{{article.referNum}}次</span>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      style="padding-left: 2.5vw;padding-top: 3vh"
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>

</template>

<script>
    import {getPaper} from "../graphql/scholar";

    export default {
        name: "Paper",
        data() {
            return {
                tabPosition: 'right',
                articles: [{
                    title: "Integrating WordPress with Your Website",
                    authors: ["lzm", "wsy"],
                    tags: ["machine learning", "data mining"],
                    db: "EI",
                    referNum: 500,
                },{
                    title: "Integrating WordPress with Your Website",
                    authors: ["lzm", "wsy"],
                    tags: ["machine learning", "data mining"],
                    db: "EI",
                    referNum: 500,
                },{
                    title: "Integrating WordPress with Your Website",
                    authors: ["lzm", "wsy"],
                    tags: ["machine learning", "data mining"],
                    db: "EI",
                    referNum: 500,
                },{
                    title: "Integrating WordPress with Your Website",
                    authors: ["lzm", "wsy"],
                    tags: ["machine learning", "data mining"],
                    db: "EI",
                    referNum: 500,
                },{
                    title: "Integrating WordPress with Your Website",
                    authors: ["lzm", "wsy"],
                    tags: ["machine learning", "data mining"],
                    db: "EI",
                    referNum: 500,
                }],
            }
        },
        async mounted() {
            const result = await getPaper("pp");
            console.log(result);
        },
        methods: {}
    }
</script>

<style scoped>
  a {
    color: #EA9215;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
    margin-left: 2%;
  }

  a:hover, a:active, a:focus {
    color: #EA9215;
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
