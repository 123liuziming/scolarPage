<template>
  <div class="body bodyArticle">
    <el-row>
      <el-col :span="18">
        <div id="content">
          <div class="column-title">摘要</div>
          <p
            style="color: #eeeeee; padding-top: 10px; line-height: 1.4; font-size: 16px;"
          >
            {{
              info.currentPaper.abstract ||
                "应版权方要求，我们暂时无法提供摘要信息。"
            }}
          </p>
          <div v-if="info.currentPaper.pdf">
            <div style="color:white;margin-bottom:1%">PDF预览</div>
            <PDF id="PDF" :pdfSrc="info.currentPaper.pdf" />
          </div>
          <Comment style="margin-top: 20px" :comments="comments" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="yinyong">
          <h1 class="fonter">
            {{ paper.nCitation || 0 }}
          </h1>
          <p class="fonter2">
            引用
          </p>
        </div>
        <div class="fabu">
          <h1 class="fonter">
            {{ paper.year }}
          </h1>
          <div class="fonter2">
            发布于
          </div>
        </div>
        <div class="column-title" style="margin-bottom: 10px">作者</div>
        <div v-for="(a, ind) in authors.slice(0, 5)" :key="`author${ind}`">
          <el-link
            :underline="false"
            style="color:#808080;font-size:20px"
            @click="toMain(a.id)"
            >{{ a.name }}</el-link
          >
          <br />
        </div>
        <div v-if="relatedWorks.length">
          <div class="column-title">类似论文推荐</div>
          <el-link
            :underline="false"
            style="color: #808080;"
            v-for="(article, ind) in relatedWorks.slice(0, 3)"
            :key="`author${ind}`"
            @click="toArticle(article.id)"
            >{{ article.name }}</el-link
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PDF from "../pdf";
import Comment from "./comment";
import { getPaper } from "../../graphql/Article";

export default {
  name: "article_body",
  components: {
    PDF,
    Comment
  },
  props: { info: { type: Object, required: true } },
  methods: {
    toMain(id) {
      this.$router.push({ name: "Main", query: { ID: id } });
    },
    toArticle(id) {
      this.$router.push({ name: "Article", query: { ID: id } });
    }
  },
  computed: {
    authors() {
      return this.info.currentPaper.authors || [];
    },
    relatedWorks() {
      return this.info.relatedWorks || {};
    },
    paper() {
      return this.info.currentPaper || {};
    },
    comments() {
      return this.info.comments || [];
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
  margin-bottom: 1%;
}
.yinyong {
  width: 80%;
  margin-top: 40px;
  padding: 1px 0 1px;
  background: #333333;
  border: 1px #4e4e4e solid;
}
.fabu {
  width: 80%;
  margin-top: 8%;
  background: #333333;
  padding: 1px 0 1px;
  margin-bottom: 12%;
  border: 1px #4e4e4e solid;
}
.fonter {
  margin-bottom: 0px;
  font-weight: 600;
  margin-right: 2%;
  font-size: 70px;
  text-align: right;
  color: white;
}
.fonter2 {
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
.column-title {
  width: 80%;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
</style>
