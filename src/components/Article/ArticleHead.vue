<template>
  <div>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="article-header">
            {{title}}
          </div>
          <a class="search-tag-line" href="main">{{ author }}</a>
          <p class="button" style="margin-top: 10%">
            <el-button id="b1" class="co" type="success" round
                       @click="CollectIt()"><font color="black"><strong>{{ButtonCollect}}</strong></font></el-button
            >
            <el-button id="b2" style="border:0px;color:grey" type="info" round disabled>{{isCollected}}</el-button
            >
          </p>
        </el-col>
        <el-col :span="8">
          <el-image
            style="width: 60%;margin-top:5%"
            :src="`https://source.unsplash.com/300x400/?${pic}`"
            fit="fit"
          />
        </el-col>
      </el-row>
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
      ButtonCollect:"",
      pic: { required: true, type: String }
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
        this.isCollected="已收藏"
        this.ButtonCollect="取消收藏"
        this.isLiked=true
        this.$message({
        type: "success",
        message: "成功收藏"
      });
        favoriteArticleOp(this.id);
      }
      else {
        this.isCollected="未收藏"
        this.ButtonCollect="收藏"
        this.isLiked=false
        this.$message({
        type: "success",
        message: "取消收藏"
      });
        favoriteArticleOp(this.id);
      }
    }
  },
  async mounted(){
    this.id = this.$route.query.ID;
    const paper = (await getFavourite()).data.allFavorites;
    const item = (await getPaper(this.id)).data.getPaperById;
    for(let i = 0;i<paper.length;i++){
      if(paper[i].id === this.id){
        this.isLiked = true;
      }
    }
    this.title = item.currentPaper.title
    //初始化是否收藏
    this.Initial();
    //初始化标题
  }
};
</script>

<style scoped>
.article-header {
  font-weight: bold;
  font-size: 36px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
  margin-top: 3%;
  width: 80%;
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
