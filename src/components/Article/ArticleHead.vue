<template>
  <div>
    <div>
      <div class="article-header">
        {{ info.currentPaper.title }}
      </div>
      <p style="margin-left: 4vw; margin-top: 20px; color: white;">
        <span v-if="info.currentPaper.venue"
          >{{ info.currentPaper.venue
          }}<span v-if="info.currentPaper.issue">, </span></span
        ><span v-if="info.currentPaper.issue"
          >ISSUE {{ info.currentPaper.issue }}</span
        >
      </p>
      <p class="button" style="margin-top: 30px">
        <el-button
          v-show="hasLoggedIn"
          id="b1"
          class="co"
          type="success"
          round
          @click="CollectIt()"
          ><font color="black"
            ><strong>{{ B }}</strong></font
          ></el-button
        >
        <el-button
          class="co"
          type="success"
          round
          v-if="info.currentPaper.url[0]"
          ><el-link target="blank" :href="info.currentPaper.url[0]"
            ><font color="black"><strong>访问论文来源</strong></font></el-link
          ></el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import {
  getFavourite,
  favoriteArticleOp,
  getPaper,
} from "../../graphql/Article";

export default {
  name: "ArticleHead",
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    CollectIt() {
      this.isLiked = !isLiked;
      favoriteArticleOp(this.id);
    }
  },
  computed: {
    hasLoggedIn() {
      return this.$store.getters.hasLoggedIn;
    },
    B() {
      if (this.isLiked) {
        return "取消收藏";
      } else {
        return "收藏";
      }
    },
    id() {
      return this.$route.query.ID;
    }
  },
  props: {
    info: { type: Object, required: true }
  },
  async mounted() {
    if (this.$store.getters.hasLoggedIn) {
      const paperId = this.$route.query.ID;
      const allFavorites = (await getFavourite()).data.allFavorites;
      this.isLiked =
        allFavorites.filter(item => item.id === paperId).length > 0;
    }
  }
};
</script>

<style scoped>
.article-header {
  font-weight: bold;
  font-size: 38px;
  color: #fff;
  text-align: left;
  margin-left: 4vw;
  margin-top: 10px;
  width: 85%;
}

a.search-tag-line {
  font-size: 20px;
  line-height: 28px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
}

p.button {
  text-align: left;
  margin-left: 5%;
}

.bg {
  background: #353b65;
}

.co {
  background: greenyellow;
  border: 0px;
}
</style>
