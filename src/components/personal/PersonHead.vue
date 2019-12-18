<template>
  <div>
    <div style="display: flex">
      <div>
          <el-avatar class="avatarSize" :src="$store.state.user.avatar" />
      </div>
      <h1 style="color: white" class="h3 person-header"><b>{{$store.getters.usersName}}</b></h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "person_head",
  data() {
    return {
      bigAvatar: "../static/image/is1.jpg",
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
.avatarSize {
  width: 140px;
  height: 140px;
}

.h3.person-header {
  font-family: "Consolas", "Microsoft YaHei", monospace;
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
