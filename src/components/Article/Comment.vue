<template>
  <div class="comments">
    <div :class="comments_wrapper_classes">
      <SingleComment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
      />
    </div>
    <div v-if="hasLoggedIn" class="reply">
      <div class="avatar">
        <img :src="currentUser.avatar" alt="" />
      </div>
      <input
        type="text"
        v-model.trim="reply"
        class="reply--text"
        placeholder="输入您的评论…"
        maxlength="250"
        required
        @keyup.enter="submitComment"
      />
      <button class="reply--button" @click.prevent="submitComment">
        <font-awesome-icon :icon="['fa', 'paper-plane']" />
        发送
      </button>
    </div>
    <p style="color: white; margin-top: 10px" v-else>登录以发表评论。</p>
  </div>
</template>

<script>
import SingleComment from "./SingleComment";
import { avatarOf } from "../../common";

export default {
  name: "Comment",
  components: {
    SingleComment
  },
  data() {
    return {
      reply: ""
    };
  },
  methods: {
    submitComment() {
      if (!!this.reply) {
        this.$emit("submit-comment", this.reply);
        this.reply = "";
      }
    }
  },
  computed: {
    hasLoggedIn() {
      return this.$store.getters.hasLoggedIn;
    }
  },
  async mounted() {
    this.currentUser.avatar = this.$store.getters.avatar;
  },
  props: {
    comments: { type: Array },
    currentUser: { type: Object },
    comments_wrapper_classes: { type: Array }
  }
};
</script>

<style scoped>
.comments {
  margin-top: 20px;
  padding-top: 0;
}
.comments-wrapper {
  max-height: 250px;
  overflow-y: auto;
  padding-right: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
/* Reply component */
.reply {
  display: flex;
  position: relative;
  align-items: center;
  background-color: #222222;
  border-radius: 30px;
  padding: 5px 10px;
  overflow: hidden;
}
.reply .avatar {
  position: absolute;
}
.reply .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.reply .reply--text {
  min-height: 40px;
  padding: 10px 10px 10px 55px;
  margin-right: 10px;
  border: 0;
  color: white;
  width: 100%;
  outline: 0;
  background-color: transparent;
  box-shadow: none;
}
.reply input.reply--text:valid {
  margin-right: 71px;
}
.reply input.reply--text:valid + .reply--button {
  right: 10px;
}
.reply .reply--button {
  position: absolute;
  right: -100px;
  border: 1px solid #adff2f;
  background-color: transparent;
  color: #adff2f;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 15px;
  line-height: 1.5;
  border-radius: 30px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    right 0.25s ease-in-out;
  outline: 0;
}
.reply .reply--button:hover {
  color: #fff;
  background-color: #2a629c;
}
.reply .reply--button:focus,
.reply .reply--button:active {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
