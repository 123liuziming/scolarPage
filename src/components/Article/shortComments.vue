<template>
  <div class="comment">
    <div class="avatar">
      <img :src="comment.avatar" />
    </div>
    <div class="text">
      <a class="username" @click="open">@{{ comment.user }}</a>
      <span>{{ comment.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleComment",
  props: ["comment"],
  methods: {
    open() {
      this.$msgbox({
        title: "联系" + this.comment.user,
        message: this.comment.email,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(action => {
        this.$message({
          type: "info",
          message:
            this.comment.email === "该用户暂无邮箱"
              ? "操作取消"
              : "已经复制到剪切板"
        });
      });
    }
  }
};
</script>

<style scoped>
/* Single-comment component */
.comment {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  color: white;
  background-color: #222222;
  border-radius: 30px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
.comment .avatar {
  align-self: flex-start;
}
.comment .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  align-self: start;
}
.comment .text {
  text-align: left;
  margin-left: 5px;
}
.comment .text span {
  margin-left: 5px;
}
.comment .text .username {
  font-weight: bold;
  color: #adff2f;
}
</style>
