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
          v-for="(_, ind) in 4"
          :key="ind"
          :title="news[ind].title"
          :description="news[ind].desc"
          :pic="news[ind].keyword"
          style="margin: 0 10px 0 10px;"
        />
      </div>
    </div>
    <el-drawer
      title="Spotlight"
      :visible.sync="drawer"
      direction="btt"
      size="95%"
      :with-header="false"
    >
      <p style="color: white; margin-left: 20px;">
        为您找到 {{ spotlightLength }} 条结果<span
          v-if="spotlightLength > 10"
          >，仅显示前 10 条。</span
        ><span v-else>。</span>
      </p>
      <el-table
        v-if="spotlightResults.length"
        :show-header="false"
        :data="spotlightResults"
      >
        <el-table-column prop="title" />
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import Card from "./Card";
import { spotlightSearch } from "../graphql/spotlight";

const TEMPORARY_LENGTH_UNDERBOUND = 3;

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
      spotlightResults: [],
      spotlightLength: 0,
      news: [
        {
          title: "最新发布",
          desc: "The rise of the machines: Artificial intelligence",
          keyword: "computer"
        },
        {
          title: "编辑推荐",
          desc: "Exploring scholarly data with rexplorer",
          keyword: "book"
        },
        {
          title: "近期热门",
          desc: "Evaluating search engine models for scholarly purposes",
          keyword: "student"
        },
        {
          title: "最新发布",
          desc: "The visibility of Wikipedia in scholarly publications",
          keyword: "book"
        }
      ]
    };
  },
  methods: {
    async fetchResults() {
      if (this.spotlightInput.length < TEMPORARY_LENGTH_UNDERBOUND) {
        this.$message.info("您提供的关键词过短。请至少提供 3 个字符。");
        return;
      }
      try {
        const results = await spotlightSearch(this.spotlightInput);
        this.drawer = true;
        this.spotlightResults = results.result;
        this.spotlightLength = results.length;
      } catch (err) {
        this.$message.error(
          "我们遇到了一些问题，因此 Spotlight 目前无法为您提供服务。"
        );
      }
    }
  }
};
</script>

<style>
#index--container {
  padding: 20vh 14vw 0 14vw;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
    url("https://source.unsplash.com/1600x900/?book");
  background-size: cover;
  min-height: 400px;
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
  font-family: "Menlo", "Consolas", "Microsoft YaHei", monospace;
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
  padding-bottom: 15px;
  min-height: 100vh;
  margin-top: 30px;
  background: #000000;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}

@media (max-width: 1200px) {
  #index--container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
