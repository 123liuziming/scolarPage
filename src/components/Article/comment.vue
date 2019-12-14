<template>
  <div id="app">
      <p  style="color:white;font-size:40px">COMMENT HERE</p>
        <comments
          :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
          :comments="comments"
          :current_user="current_user"
          @submit-comment="submitComment"
        ></comments>
    </div>
</template>

<script>
import Comments from './comments.vue'
import {getPaper,writeCommentOp} from "../../graphql/Article";
export default {
  name: 'app',
  components: {
    Comments
  },
  data() {
    return {
      id:'',
      likes: 15,
      creator: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampleCreator'
      },
      current_user: {
        avatar: '',
        user: ''
      },
      comments: [
      ]
    }
  },

  async mounted(){
    this.id = this.$route.query.ID;
    const CommentList = (await getPaper(this.id)).data.getPaperById.comments;
    for(let i = 0; i < CommentList.length;i++){
      if(CommentList[i].body!==null)
      {
        let len = this.comments.length + 1;
        this.comments.push({
          id: len,
          user:CommentList[i].author===null?"无名氏":CommentList[i].author.name,
          email:CommentList[i].author.email===null?"该用户暂无邮箱":CommentList[i].author.email,
          avatar:null,
          text:CommentList[i].body
        });
      }
    }
    //加载当前用户的信息
    this.current_user.user = this.$store.getters.usersName;

  },

  methods: {
    submitComment: async function (reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: null,
        text: reply
      });
      await writeCommentOp({
        paperId:this.id,
        body:reply
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ececec;
  margin: 1em 0;
  padding: 0;
}
.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 600px;
}
.comments-header {
  background-color: #C8C8C8;
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #333;
  min-height: 80px;
  font-size: 20px;
}
.comments-header .comments-stats span {
  margin-left: 10px;
}
.post-owner {
  display: flex;
  align-items: center;
}
.post-owner .avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.post-owner .username {
  margin-left: 5px;
}
.post-owner .username > a {
  color: #333;
}
</style>
