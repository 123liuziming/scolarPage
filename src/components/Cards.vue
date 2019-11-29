<template>
  <div id="Cards">
    <div class="col-md-3 col-sm-8" v-for="count in 4" :key="count">
      <div class="blog-item post-2 animated zoomIn">
          <h3 style="color: gray">最新发布</h3>
          <el-divider />
          <span class="solid-line"></span>
          <el-image
            style="width: 100%;"
            :src="src"
            :fit="fit"></el-image>
          <p style="color: white;margin-top: 3%">The rise of the machines: Artificial intelligence</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Cards",
        data() {
            return {
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                fit: "contain"
            }
        }
    }
</script>

<style scoped>
  #Cards {
    height: 250px;
    width: 90%;
    margin-top: 4%;
    margin-left: 4%;
  }
  .cardEach{
    width: 20%;
  }


</style>
