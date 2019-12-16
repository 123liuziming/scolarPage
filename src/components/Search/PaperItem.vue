<template>
  <div>
    <el-link
      :underline="false"
      class="paper-item--title"
      @click="goToArticle(item.id)"
    >
      {{
        item.title.substring(0, 140) + (item.title.length > 140 ? "..." : "")
      }}
    </el-link>
    <p>
      <span
        style="color: #808080;"
        v-for="(author, ind) in item.authors.slice(0, 5)"
        :key="`au${ind}`"
        ><el-link
          style="color: #808080;"
          :underline="false"
          @click="goToScholar(author.id)"
          >{{ author.name }}</el-link
        ><span v-if="ind !== 4 && ind !== item.authors.length - 1"
          >,
        </span> </span
      ><span style="color: #808080;" v-if="item.authors.length > 5">
        et al.</span
      >
    </p>
    <p>
      <el-tag
        color="#666666"
        @click="$router.push({ name: 'Search', query: { w: keyword } })"
        size="mini"
        style="color: #ffffff; border: none;"
        v-for="(keyword, ind) in item.keywords
          .filter(el => el.length <= 20)
          .slice(0, 5)"
        :key="`kw${ind}`"
        class="paper-item--tag"
        :disable-transitions="true"
        >{{ keyword }}</el-tag
      >
    </p>
    <p class="paper-item--hide-overflow paper-item--abstract">
      <span v-if="item.abstract">{{ item.abstract }}</span>
      <span v-else>应版权方要求，我们暂时不能提供此文章的摘要信息。</span>
    </p>
    <p>
      <span v-if="item.venue"
        >{{ item.venue }}<span v-if="item.year">, </span></span
      ><span v-if="item.year">{{ item.year }} | </span>被引用
      {{ item.nCitation || 0 }} 次
    </p>
  </div>
</template>

<script>
export default {
  name: "PaperItem",
  props: {
    item: { type: Object, required: true }
  },
  methods: {
    goToArticle(id) {
      this.$router.push({ name: "Article", query: { ID: id } });
    },

    goToScholar(id) {
      this.$router.push({ name: "Main", query: { ID: id } });
    }
  }
};
</script>

<style>
.paper-item--tag {
  margin-right: 5px;
}

.paper-item--title {
  font-weight: bold !important;
  font-size: 18px !important;
}

.paper-item--hide-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.paper-item--abstract {
  -webkit-line-clamp: 3;
  color: #aaaaaa;
}
</style>
