<template>
  <div style="display: flex;">
    <el-avatar :src="avatarOf(item)" />
    <div style="margin-left: 20px;">
      <el-link
        style="font-weight: bold; font-size: 18px;"
        :underline="false"
        @click="$router.push({ name: 'Main', query: { ID: item.id } })"
      >
        {{ item.name }}
      </el-link>
      <p>
        <el-tag
          color="#666666"
          size="mini"
          style="color: #ffffff; border: none;"
          v-for="(tag, ind) in item.tags
            .filter(el => el.t.length <= 20)
            .slice(0, 5)"
          :key="`kw${ind}`"
          class="paper-item--tag"
          :disable-transitions="true"
          >{{ tag.t }}</el-tag
        >
      </p>
      <p
        v-if="item.bulletin"
        class="paper-item--hide-overflow paper-item--abstract"
      >
        {{ bulletin }}
      </p>
      <p v-if="item.orgs.filter(el => el.length).length" style="color: #888888">
        {{ item.orgs.join(", ") }}
      </p>
      <p style="color: #888888">
        {{ item.nCitations }} 次被引用&nbsp;&nbsp;&nbsp;h-index:
        {{ item.hIndex }}
      </p>
    </div>
  </div>
</template>

<script>
import { avatarOf } from "@/common";

export default {
  name: "ScholarItem",
  props: {
    item: { type: Object, required: true }
  },
  methods: {
    avatarOf
  }
};
</script>
