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
        <input type="text" />
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
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Index",
  components: {
    Card
  },
  data() {
    return {
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
</style>
