<template>
  <div>
    <p style="color:white; font-size: 20px; font-weight: bold;">评论区</p>
    <comments
      :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
      :comments="comments"
      :currentUser="currentUser"
      @submit-comment="submitComment"
    />
  </div>
</template>

<script>
import Comments from "./comments.vue";
import { getPaper, writeCommentOp } from "../../graphql/Article";
import { avatarOf } from "../../common";

export default {
  name: "app",
  components: {
    Comments
  },
  props: {
    comments: { type: Array, required: true }
  },
  data() {
    return {
      id: "",
      likes: 15,
      creator: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "exampleCreator"
      },
      currentUser: {
        avatar: "",
        user: ""
      }
    };
  },

  async mounted() {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].body !== null) {
        let len = this.comments.length + 1;
        this.comments.push({
          id: len,
          user:
            this.comments[i].author === null
              ? "无名氏"
              : this.comments[i].author.name,
          email:
            this.comments[i].author.email === null
              ? "该用户暂无邮箱"
              : this.comments[i].author.email,
          avatar: avatarOf({
            name: this.comments[i].author.name,
            avatar: null
          }),
          text: this.comments[i].body
        });
      }
    }

    this.currentUser.user = this.$store.getters.usersName;
    this.currentUser.avatar = avatarOf({
      name: this.$store.getters.usersName,
      avatar: null
    });
  },

  methods: {
    submitComment: async function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.currentUser.user,
        avatar: this.currentUser.avatar,
        text: reply
      });
      await writeCommentOp({
        paperId: this.id,
        body: reply
      });
    }
  }
};
</script>
