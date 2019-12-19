<template>
  <div>
    <div style="display: flex">
      <div>
          <el-avatar class="avatarSize" :src="avatarOf({avatar:$store.state.user.avatar,name:$store.getters.usersName})" />
      </div>
      <h1 style="color: white" class="h3 person-header">
        <b>{{ $store.getters.usersName }}</b>
      </h1>
    </div>
  </div>
</template>

<script>
import { avatarOf } from "@/common";

export default {
  name: "person_head",
  data() {
    return {
    };
  },
  methods:{
    avatarOf
  }
};
</script>

<style scoped>
.avatarSize {
  width: 140px;
  height: 140px;
}

.h3.person-header {
  font-weight: bold;
  font-size: 36px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
  margin-top: 3%;
  width: 50%;
}

a.search-tag-line {
  font-size: 20px;
  line-height: 28px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
}

p.button {
  margin-top: 1.5%;
  text-align: left;
  margin-left: 10%;
}

.bg {
  background: #353b65;
}

.co {
  background: greenyellow;
  border: 0px;
}
</style>
