<template>
  <div>
    <div>
          <div class="article-header">
            {{title}}
          </div>
          <p class="button" style="margin-top: 10%">
            <el-button id="b1" class="co" type="success" round :disabled=!isLogin
                       @click="CollectIt()"><font color="black"><strong>{{ButtonCollect}}</strong></font></el-button
            >
            <el-button  class="co" type="success" round style="margin-left: 3%"
                       @click="GoToPdf()"><font color="black"><strong>查看PDF</strong></font></el-button
            >
          </p>

    </div>
  </div>
</template>

<script>
import {getFavourite,favoriteArticleOp,getPaper} from "../../graphql/Article"
export default {
  name: "article_head",
  data() {
    return {
      id:'',
      author: "",
      title:"",
      isLiked:false,
      isCollected:"",
      ButtonCollect:"收藏",
      isLogin:false
    };
  },
  methods:{
    Initial(){
      if(this.isLiked){
        this.isCollected="已收藏"
        this.ButtonCollect="取消收藏"
      }else{
         this.isCollected="未收藏"
        this.ButtonCollect="收藏"
      }
    },
    CollectIt(){
      if(!this.isLiked){
        this.isCollected="已收藏";
        this.ButtonCollect="取消收藏";
        this.isLiked=true;
        favoriteArticleOp(this.id);
      }
      else {
        this.isCollected="未收藏";
        this.ButtonCollect="收藏";
        this.isLiked=false;
        favoriteArticleOp(this.id);
      }
    },
    GoToPdf(){
      document.documentElement.scrollTop=1000;
    }
  },
  async mounted(){
    this.id = this.$route.query.ID;
    const item = (await getPaper(this.id)).data.getPaperById;
    this.title = item.currentPaper.title;
    //console.log(this.$store.getters.usersName.length);
    if(this.$store.getters.hasLoggedIn){
      this.isLogin = true;
      const paper = (await getFavourite()).data.allFavorites;
      for(let i = 0;i<paper.length;i++){
        if(paper[i].id === this.id){
          this.isLiked = true;
        }
      };
      //初始化是否收藏
      this.Initial();
    }

  }
};
</script>

<style scoped>
.article-header {
  font-weight: bold;
  font-size: 38px;
  color: #fff;
  text-align: left;
  margin-left: 5%;
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
  text-align: left;
  margin-left: 5%;

}

.bg {
  background: #353b65;
}

.co {
  background: greenyellow;
  border: 0px;
}
</style>
