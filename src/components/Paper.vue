<template>
  <div>
    <div style="float: left">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation"><a class="nav">Home</a></li>
        <li role="presentation"><a class="nav">Profile</a></li>
        <li role="presentation"><a class="nav">Messages</a></li>
      </ul>
    </div>
    <div style="width: 70%;float: left">
      <h3 class="paperTitle">文章列表:</h3>
      <ul class="articles">
        <li class="article-entry standard">
          <h4><a class="title">Integrating WordPress with Your Website</a></h4>
          <div><a class="other">liuziming</a>
            <a>wsy</a></div>
          <div class="conference align">WWW '19: The Web Conference on The World Wide Web Conference WWW 2019,
            pp.94-104, (2019)
          </div>
          <div>
            <span><el-button type="warning" size="mini" class="align">EI</el-button></span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: greenyellow">引用</span>
          </div>
        </li>
        <li class="article-entry standard">
          <h4><a class="title">Integrating WordPress with Your Website</a></h4>
          <div><a class="other">liuziming</a>
            <a>wsy</a></div>
          <div class="conference align">WWW '19: The Web Conference on The World Wide Web Conference WWW 2019,
            pp.94-104, (2019)
          </div>
          <div>
            <span><el-button type="warning" size="mini" class="align">EI</el-button></span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: greenyellow">引用</span>
          </div>
        </li>
        <li class="article-entry standard">
          <h4><a class="title">Integrating WordPress with Your Website</a></h4>
          <div><a class="other">liuziming</a>
            <a>wsy</a></div>
          <div class="conference align">WWW '19: The Web Conference on The World Wide Web Conference WWW 2019,
            pp.94-104, (2019)
          </div>
          <div>
            <span><el-button type="warning" size="mini" class="align">EI</el-button></span>
            <el-divider direction="vertical"></el-divider>
            <span style="color: greenyellow">引用</span>
          </div>
        </li>
      </ul>
      <el-pagination
        class="align"
        background
        style="padding-top: 5%;padding-left: 4%;"
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>

  </div>

</template>

<script>
    export default {
        name: "Paper",
        data() {
            return {
                tabPosition: 'right',
            }
        }
    }
</script>

<style scoped>
  a {
    color: #EA9215;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
    margin-left: 2%;
  }

  a:hover, a:active, a:focus {
    color: #EA9215;
    outline: none;
    text-decoration: none;
  }

  a.other {
    color: #5cb85c;
  }

  a.title {
    color: white;
  }

  a.nav {
    color: #9d9d9d;
    font-size: larger;
  }

  ul.articles {
    list-style: none;
    margin: 0;
  }

  ul.articles .article-entry {
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0 0 24px;
    background: url("../../static/image/standard.png") no-repeat 0 3px;
  }

  ul.articles .article-entry.standard {
    background: url("../../static/image/standard.png") no-repeat 0 3px;
  }

  .paperTitle {
    margin-left: 4%;
    color: white;
  }

  .align {
    margin-left: 2%;
    margin-bottom: 2%;
  }

  .conference {
    margin-top: 1%;
    color: deepskyblue;
  }

</style>
