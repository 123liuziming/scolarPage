<template>
    <div class="search-area-wrapper">
        <div class="search-area container">
            <h3 class="search-header">The rise of the machines: <br>Artificial intelligence meets scholarly content</h3>
            <p class="search-tag-line">If you have any question you can ask below or enter what you are looking for!</p>
            <p>
                <a class="btn btn-primary btn-md btn-learn" href=" ">发送私信</a>
               <a class="btn btn-primary btn-md popup-vimeo btn-video" href="https://vimeo.com/channels/staffpicks/93951774">
               <i class="icon-play"></i>关注+</a>
            </p >
        </div>
    </div>
</template>

<script>
export default {
  name: 'article'
}
</script>

<style scoped>
.search-area-wrapper {
  background: #353b65 url("../../static/picture/bg.jpg") center top no-repeat;
  background-size: 100%;
  min-height: 279px;
  height: auto !important;
  height: 279px;
}
.search-area-wrapper .search-area {
  padding: 50px 0;
}
h3.search-header {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #fff;
  text-align: center;
}
p.search-tag-line {
  font-family: "Droid Serif", serif;
  font-style: italic;
  font-size: 18px;
  line-height: 28px;
  color: #fff;
  text-align: center;
}
</style>