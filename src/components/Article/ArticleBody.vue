<template>
  <div class="body bodyArticle" id="body">
    <el-col :span="18">
      <div id="content">
        <PDF></PDF>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="yinyong">
        <h1 id="fonter">
          <strong>710</strong>
        </h1>
        <p id="fonter2">
          引用
        </p>
      </div>
      <div id="fabu">
        <h1 id="fonter">
          <strong>2016</strong>
        </h1>
        <div id="fonter2">
          发布于
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import PDF from "../pdf";

export default {
  name: "article_body",
  components: {
    PDF
  },
  data() {
    return {
      author: "AD Wade, K Wang"
    };
  }
};
</script>

<style scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
#content {
  width: 90%;
  height: 80%;
  margin-top: 1%;
  margin-right: 0;
  margin-left: 5%;
  font-size: 25px;
}
#yinyong {
  width: 80%;
  height: 12%;
  margin-top: 8%;
  background: gray;
}
#fabu {
  width: 80%;
  height: 12%;
  margin-top: 8%;
  background: gray;
}
#fonter {
  margin-bottom: 0px;
  margin-right: 2%;
  font-size: 70px;
  text-align: right;
  color: white;
}
#fonter2 {
  margin-top: 0px;
  font-size: 25px;
  margin-right: 6%;
  text-align: right;
  color: white;
  margin-bottom: 10%;
}
@media (max-width: 1200px) {
  h1 strong {
    font-size: 4vmax;
  }
}
</style>
