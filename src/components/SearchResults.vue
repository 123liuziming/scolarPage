<template>
  <div id="search-results--background" key="srb">
    <div id="search-results--container">
      <div id="search-results--header">
        <h1
          style="font-family: 'IBM Plex Sans'; font-weight: bold; color: white;"
        >
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
      <div id="search-results--results"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  data() {
    return {
      keyword: ""
    };
  },
  mounted() {
    this.keyword = this.$route.query.w || "";
  },
  methods: {
    search() {
      this.$router.push({
        query: { w: this.keyword }
      });
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
    url("../../static/image/bg.jpg");
}

#search-results--container {
  padding-top: 80px;
  width: 80%;
  margin: 0 auto;
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
  font-family: "IBM Plex Mono", "IBM Plex Mono", "Microsoft YaHei", monospace;
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
