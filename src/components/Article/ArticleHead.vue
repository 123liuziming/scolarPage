<template>
  <div>
    <div>
      <h3 class="article-header">
        {{title}}
      </h3>
      <a class="search-tag-line" href="main">{{ author }}</a>
      <p class="button">
        <el-button id="b1" class="co" type="success" round
          @click="CollectIt()"><font color="black"><strong>{{ButtonCollect}}</strong></font></el-button
        >
        <el-button id="b2" style="border:0px;color:grey" type="info" round disabled>{{isCollected}}</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "article_head",
  data() {
    return {
      author: "AD Wade, K Wang",
      title:"The rise of the machines: Artificial intelligence meets scholarly content",
      isLiked:false,
      isCollected:"",
      ButtonCollect:""
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
      }
      else {
        this.isCollected="未收藏"
        this.ButtonCollect="收藏"
        this.isLiked=false
        this.$message({
        type: "success",
        message: "取消收藏"
      });
      }
    }
  },
  mounted(){
    this.Initial();
  }
};
</script>

<style scoped>
h3.article-header {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #fff;
  text-align: left;
  margin-left: 10%;
  margin-top: 3%;
  width: 50%;
}

a.search-tag-line {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
