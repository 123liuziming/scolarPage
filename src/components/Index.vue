<template>
  <div id="index--container">
    <div>
      <p class="index--container-h1">站在巨人的肩膀上，</p>
      <p class="index--container-h1">创造你的价值。</p>
      <div id="index--container-search-box">
        <font-awesome-icon
          id="index--container-search-box-icon"
          :icon="['fas', 'search']"
        />
        <input
          type="text"
          @keyup.enter="fetchResults"
          v-model="spotlightInput"
        />
      </div>
    </div>
    <div id="index--container-content">
      <div style="display: flex;">
        <Card
          v-for="(item, ind) in news"
          :key="ind"
          :title="item.kind"
          :description="item.title"
          :pic="item.keyword"
          style="margin: 0 10px 0 10px; width: 25%;"
          :articleId="item.id"
        />
      </div>
      <div style="width: 100%; padding-top: 20px; text-align: right;">
        <el-button type="primary" @click="loadRecommendations"
          ><font-awesome-icon
            :icon="['fas', 'sync-alt']"
            style="margin-right: 8px;"
          />换一组</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Scholar/Card";
import { Loading } from "element-ui";
import { getRecommendations } from "@/graphql/user";

const keywords = [
  "computer",
  "book",
  "student",
  "machine",
  "earth",
  "sun",
  "NASA",
  "money",
  "phone",
  "study",
  "weekend",
  "see",
  "world"
];
const kinds = ["猜你喜欢", "近期热门"];

export default {
  name: "Index",
  components: {
    Card
  },
  data() {
    return {
      timer: null,
      drawer: false,
      spotlightInput: "",
      news: [
        {
          kind: "最新发布",
          title: "The rise of the machines: Artificial intelligence",
          keyword: "computer"
        },
        {
          kind: "编辑推荐",
          title: "Exploring scholarly data with rexplorer",
          keyword: "book"
        },
        {
          kind: "近期热门",
          title: "Evaluating search engine models for scholarly purposes",
          keyword: "student"
        },
        {
          kind: "最新发布",
          title: "The visibility of Wikipedia in scholarly publications",
          keyword: "machine"
        }
      ]
    };
  },
  methods: {
    fetchResults() {
      this.$router
        .push({
          name: "Search",
          query: { w: this.spotlightInput }
        })
        .catch(() => {});
    },
    async loadRecommendations() {
      this.news = (await getRecommendations()).data.recommendation
        .slice(0, 4)
        .map((el, index) => ({
          ...el,
          kind: kinds[Math.floor(Math.random() * 2)],
          keyword: keywords[Math.floor(Math.random() * keywords.length)]
        }));
    }
  },

  async beforeMount() {
    this.loadRecommendations();
  }
};
</script>

<style>
#index--container {
  padding: 20vh 14vw 0 14vw;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
    url("../../static/image/bg.jpg");
  background-size: cover;
}

#index--container > * {
  padding-left: 3vw;
  padding-right: 3vw;
}

.index--container-h1 {
  color: white;
  font-size: 40px;
  font-weight: 900;
  line-height: 1.1;
}

#index--container-search-box {
  width: 100%;
  background: #000000;
  margin: 30px 0 40px 0;
  padding-right: 10px;
  height: 40px;
  border: 1px #aaaaaa solid;
  overflow-x: hidden;
  display: flex;
}

#index--container-search-box-icon {
  height: 100%;
  margin: 0 15px 0 15px;
  color: white;
}

#index--container-search-box > input {
  font-family: "Roboto Mono", "Microsoft YaHei", monospace;
  background: none;
  border: none;
  color: white;
  width: 100%;
  height: 100%;
}

#index--container-search-box > input:focus {
  outline-width: 0;
}

#index--container-content {
  padding-top: 30px;
  padding-bottom: 40px;
  margin-top: 30px;
  background: #000000;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  width: 100%;
}

@media (max-width: 1200px) {
  #index--container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
