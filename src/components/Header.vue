<template>
  <div class="headAnimate">
    <div style="float: left">
      <div style="display: flex">
        <div style="width: 47vw">
          <h1 style="color: white" class="h1"><b>Feifei Li</b></h1>
          <h4 style="color: white" class="h4">
            StandFord University (2016 - now)
          </h4>
          <h5 class="h5"><a>ffl@standford.edu</a></h5>
          <p class="button" style="margin-top: 3vh">
            <el-button
              class="co"
              type="success"
              round
              size="mini"
              @click="$emit('sendprivatemsg')"
              ><font color="black"><strong>发送私信</strong></font>
            </el-button>
            <el-button
              class="co"
              :type="isFollowed"
              round
              size="mini"
              @click="followScholar"
              :disabled="isFollowDisabled"
              ><font color="black"
                ><strong>{{ followBtnVal }}</strong></font
              >
            </el-button>
          </p>
        </div>
        <div style="padding-top: 3vh; padding-left: 14vw">
          <el-avatar class="avatarSize" :src="bigAvatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {
      msg: "good",
      bigAvatar: "../static/image/is1.jpg",
      bigAvatarSize: 190,
      // 是否已关注
      isFollowed: "success",
      isFollowDisabled: false,
      followBtnVal: "关注 +"
      // 私信内容
    };
  },
  methods: {
    followScholar: function() {
      this.$message({
        type: "success",
        message: "成功关注该学者"
      });
      this.isFollowed = "info";
      this.followBtnVal = "已关注";
      this.isFollowDisabled = true;
    }
  }
};
</script>

<style scoped>
a {
  color: #ea9215;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}

a:hover,
a:active,
a:focus {
  color: #ea9215;
  outline: none;
  text-decoration: none;
}

.h1 {
  font-family: "Consolas", "Microsoft YaHei", monospace;
  font-size: 100px;
}

.h4 {
  font-family: "Consolas", "Microsoft YaHei", monospace;
  font-size: 30px;
}

.h5 {
  font-family: "Consolas", "Microsoft YaHei", monospace;
  font-size: 20px;
}

.avatarSize {
  width: 190px;
  height: 190px;
}

@media (max-width: 1200px) {
  .h1 {
    font-size: 50px;
  }
}

@media (max-width: 1200px) {
  .h2 {
    font-size: 30px;
  }
}

@media (max-width: 1200px) {
  .h3 {
    font-size: 20px;
  }
}

@media (max-width: 1200px) {
  .avatarSize {
    width: 150px;
    height: 150px;
  }
}
</style>
