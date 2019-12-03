<template>
  <div class="scholarPg">
    <ArticleHead />
    <ArticleBody />
  </div>
</template>

<script>
import ArticleBody from "./ArticleBody";
import ArticleHead from "./ArticleHead";

export default {
  name: "article",
  components: {
    ArticleBody,
    ArticleHead
  }
};
</script>

<style scoped></style>
