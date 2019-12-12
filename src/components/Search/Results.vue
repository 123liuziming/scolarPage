<template>
  <div id="search-results--background" key="srb">
    <div id="search-results--container">
      <div id="search-results--header">
        <h1 style="font-weight: bold; color: white;">
          Dive into your sea of creativeness<br />from here.
        </h1>
        <div id="search-results--search-box">
          <font-awesome-icon
            id="search-results--search-box-icon"
            :icon="['fas', 'search']"
          />
          <input type="text" @keyup.enter="search" v-model="keyword" />
        </div>
      </div>
      <div id="search-results--results" v-if="$route.query.w && results.length">
        <div
          v-for="(item, ind) in results"
          :key="`paper${ind}`"
          style="margin-bottom: 20px;"
        >
          <PaperItem :item="item" />
          <el-divider v-if="ind !== results.length - 1" />
        </div>
        <el-pagination
          :hide-on-single-page="true"
          :page-count="nResultOfResults"
          layout="prev, pager, next"
          @current-change="loadAnotherPage"
          :current-page.sync="currentPage"
        />
      </div>
      <div
        style="color:white; background: #000000; width: 100%; text-align: center; padding-bottom: 40px; border-radius: 0 0 20px 20px;"
        v-else
      >
        <span v-if="!$route.query.w">输入关键词，键入回车以开始。</span
        ><span v-else>暂无结果。</span>
      </div>
    </div>
  </div>
</template>

<script>
import { spotlight } from "@/graphql/search";
import { Loading } from "element-ui";
import PaperItem from "./PaperItem";

export default {
  name: "Results",
  components: { PaperItem },
  data() {
    return {
      currentPage: 1,
      keyword: "",
      results: [],
      nResultOfResults: 0
    };
  },
  mounted() {
    this.keyword = this.$route.query.w || "";
    this.search();
  },
  methods: {
    async loadAnotherPage() {
      if (!this.keyword) return;
      this.$router.push({ query: { w: this.keyword, p: this.currentPage } });
      const loadingInstance = Loading.service({
        fullscreen: true,
        background: "#000000"
      });
      try {
        const { papersResponse } = await spotlight(
          this.keyword,
          this.currentPage
        );
        this.results = papersResponse.papers;
        this.nResultOfResults = papersResponse.numOfPages;
      } catch (err) {
        this.$message.error("在完成您请求的过程中发生了问题。请稍后重试。");
      } finally {
        loadingInstance.close();
      }
    },

    search() {
      this.loadAnotherPage();
    }
  },
  watch: {
    "$route.query.w"(newVal) {
      if (newVal != this.keyword) this.keyword = newVal;
    }
  }
};
</script>

<style>
#search-results--background {
  width: 100%;
  height: 80vh;
  background-size: cover;
  min-height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8)),
    url("../../../static/image/bg.jpg");
}

#search-results--container {
  padding-top: 80px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
}

#search-results--header {
  background: #000000;
  margin-top: 30px;
  border-radius: 19px 19px 0 0;
  padding: 20px 40px 20px 40px;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}

#search-results--search-box {
  width: 100%;
  background: #000000;
  margin: 30px 0 40px 0;
  padding-right: 10px;
  height: 40px;
  border: 1px #aaaaaa solid;
  overflow-x: hidden;
  display: flex;
}

#search-results--search-box input {
  font-family: "Roboto Mono", "Roboto Mono", "Microsoft YaHei", monospace;
  background: none;
  border: none;
  color: white;
  width: 100%;
  height: 100%;
}

#search-results--search-box > input:focus {
  outline-width: 0;
}

#search-results--search-box-icon {
  height: 100%;
  margin: 0 15px 0 15px;
  color: white;
}

#search-results--results {
  background: #000000;
  min-height: 90vh;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  padding: 0 40px 40px 40px;
  color: white;
  border-radius: 0 0 20px 20px;
}

@media screen and (max-width: 1200px) {
  #search-results--container {
    width: 100%;
  }

  #search-results--header {
    margin-top: 0;
  }
}
</style>
