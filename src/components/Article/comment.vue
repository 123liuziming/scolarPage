<template>
  <div id="app">
    <p style="color:greenyellow;font-size:30px">评论区</p>
    <el-divider ></el-divider>
    <comments
      :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
      :comments="comments"
      :current_user="current_user"
      @submit-comment="submitComment"
    ></comments>
  </div>
</template>

<script>
import Comments from "./comments.vue";
import { getPaper, writeCommentOp } from "../../graphql/Article";
import {avatarOf} from "../../common"
export default {
  name: "app",
  components: {
    Comments
  },
  data() {
    return {
      id: "",
      likes: 15,
      creator: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "exampleCreator"
      },
      current_user: {
        avatar: "",
        user: ""
      },
      comments: []
    };
  },

  async mounted() {
    this.id = this.$route.query.ID;
    const CommentList = (await getPaper(this.id)).data.getPaperById.comments;
    for (let i = 0; i < CommentList.length; i++) {
      if (CommentList[i].body !== null) {
        let len = this.comments.length + 1;
        this.comments.push({
          id: len,
          user:
            CommentList[i].author === null
              ? "无名氏"
              : CommentList[i].author.name,
          email:
            CommentList[i].author.email === null
              ? "该用户暂无邮箱"
              : CommentList[i].author.email,
          avatar: avatarOf({
            name:CommentList[i].author.name,
            avatar:null}),
          text: CommentList[i].body
        });
      }
    }
    //加载当前用户的信息
    this.current_user.user = this.$store.getters.usersName;
    this.current_user.avatar = avatarOf({
      name:this.$store.getters.usersName,
      avatar:null});
  },

  methods: {
    submitComment: async function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
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
