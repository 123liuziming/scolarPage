<template>
  <div id="card">
    <div style="color: gray; font-size: 18px; font-weight: bold;">
      {{ title }}
    </div>
    <div style="margin: 5px 0 12px 0; border: 1px #aaaaaa solid;" />
    <el-image
      v-if="!pic.startsWith('http')"
      style="width: 100%;"
      :src="`https://source.unsplash.com/400x200/?${pic}`"
      fit="fit"
    />
    <el-image v-else style="width: 100%;" :src="pic" :fit="fit" />
    <el-link
      v-if="articleId"
      style="color: white; margin-top: 3%; font-family: 'Roboto Mono', monospace; font-weight: bold;"
      :underline="false"
      @click="$router.push({ name: 'Article', query: { ID: articleId } })"
    >
      {{ description }}
    </el-link>
    <p
      v-else
      style="color: white; margin-top: 3%; font-family: 'Roboto Mono', monospace; font-weight: bold;"
      class="hideWhenOverflow"
    >
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: { required: true, type: String },
    description: { type: String },
    pic: { required: true, type: String },
    articleId: { required: false, type: String }
  },
};
</script>

<style>
.hideWhenOverflow {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
