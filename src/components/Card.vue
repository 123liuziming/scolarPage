<template>
  <div>
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
    <p
      style="color: white; margin-top: 3%; font-family: 'Consolas', monospace; font-weight: bold;"
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
    pic: { required: true, type: String }
  }
};
</script>

