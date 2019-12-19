<template>
  <div>
    <p style="color:white; font-size: 20px; font-weight: bold;">评论区</p>
    <Comment
      :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
      :comments="comments"
      :currentUser="currentUser"
      @submit-comment="submitComment"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import { getPaper, writeCommentOp } from "../../graphql/Article";
import { avatarOf } from "../../common";

export default {
  name: "CommentList",
  components: {
    Comment
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
        name: ""
      }
    };
  },

  mounted() {
    this.currentUser.name = this.$store.getters.usersName;
    this.currentUser.avatar = avatarOf(this.currentUser);
  },

  methods: {
    submitComment: async function(reply) {
      this.comments.push({
        author: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        },
        body: reply
      });
      await writeCommentOp({
        paperId: this.$route.query.ID,
        body: reply
      });
    }
  }
};
</script>
