<template>
  <div class="scholarPg">
    <ArticleHead :info="item" />
    <ArticleBody :info="item" />
  </div>
</template>

<script>
import ArticleBody from "./ArticleBody";
import ArticleHead from "./ArticleHead";
import { getPaper } from "../../graphql/Article";

export default {
  name: "article",
  components: {
    ArticleBody,
    ArticleHead
  },
  data() {
    return {
    item: {
        currentPaper: {
          url: [],
        },
        comments: [],
        relatedWorks: []
      }
    };
  },
  async mounted() {
    this.item = (await getPaper(this.$route.query.ID)).data.getPaperById;
  }
};
</script>
