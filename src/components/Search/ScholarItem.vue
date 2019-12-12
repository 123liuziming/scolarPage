<template>
  <div style="display: flex;">
    <el-avatar
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    />
    <div style="margin-left: 20px;">
      <p style="font-weight: bold; font-size: 18px;">
        {{ item.name }}
      </p>
      <p>{{ item.nCitations }} 次被引用</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScholarItem",
  props: {
    item: { type: Object, required: true }
  }
};
</script>
