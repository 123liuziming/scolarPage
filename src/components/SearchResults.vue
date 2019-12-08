<template>
  <div id="search-results--container">
    <div id="search-results--header">
      <div id="search-results--search-box">
        <font-awesome-icon
          id="search-results--search-box-icon"
          :icon="['fas', 'search']"
        />
        <input type="text" v-model="keyword" />
        <el-button type="primary">搜 索</el-button>
      </div>
    </div>
    <div id="search-results--results"></div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  data() {
    return {
      keyword: ""
    };
  }
};
</script>

<style>
#search-results--container {
  padding-top: 80px;
  width: 80%;
  margin: 0 auto;
}

#search-results--header {
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#search-results--search-box {
  height: 40px;
  display: flex;
}

#search-results--search-box input {
  width: 100%;
  height: 100%;
  background: none;
  border: 1px solid #cccccc;
  border-radius: 7px;
  margin-right: 10px;
  color: white;
}

#search-results--search-box-icon {
  height: 100%;
  color: white;
  font-size: 26px;
  margin-right: 15px;
}

#search-results--results {
  background: #000000;
  min-height: 90vh;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}

@media screen and (max-width: 1200px) {
  #search-results--container {
    width: 100%;
  }
}
</style>
