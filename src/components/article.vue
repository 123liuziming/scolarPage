<template>
    <div>
        <article_body></article_body>
        <article_head></article_head>
    </div>
</template>

<script>
import article_body from './article_body'
import article_head from './article_head'
export default {
  name: 'article',
  components:{
      article_body,
      article_head
  }
}
</script>

<style scoped>
</style>