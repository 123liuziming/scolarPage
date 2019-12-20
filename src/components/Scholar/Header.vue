<template>
  <div class="headAnimate">
    <div style="float: left">
      <div style="display: flex">
        <div style="width: 50vw;margin-top:5vh">
          <h1 style="color: white" class="h1">
            <b>{{scholarinfo.name}}</b>
          </h1>
          <h4 style="color: white" class="h4">
            <a class="lineLimit">{{scholarinfo.orgs[0]}}</a>
          </h4>
          <p class="button" style="margin-top: 3vh">
            <el-button
              class="co"
              type="success"
              round
              size="mini"
              v-if="authenticateFlag"
              :disabled="sendMsgFlag"
              @click="$emit('message', $route.query.ID)"
            >
              <font color="black">
                <strong>发送私信</strong>
              </font>
            </el-button>
            <el-button
              class="co"
              :type="isFollowed"
              round
              size="mini"
              @click="followScholar"
              :disabled="followDisalbeFlag"
            >
              <font color="black">
                <strong>{{ followBtnVal }}</strong>
              </font>
            </el-button>
            <el-button
              class="co"
              type="success"
              round
              size="mini"
              v-if="!authenticateFlag"
              @click="$emit('auth')"
            >
              <font color="black">
                <strong>认领</strong>
              </font>
            </el-button>
          </p>
        </div>
        <div style="padding-top: 5vh; padding-left: 10vw">
          <el-avatar class="avatarSize" :src="avatarOf(scholarinfo)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {followScholarOp} from "../../graphql/scholar";
    import { avatarOf } from "@/common";


    export default {
        name: "Header",
        components: {},
        props: ["scholarinfo", "isself", "isfollowing"],
        mounted() {
            this.isFollowed = this.isfollowing === false ? "success" : "info";
            this.followBtnVal = this.isfollowing === true ? "取消关注" : "关注 +";
            this.isFollowDisabled = this.isfollowing;
        },
        data() {
            return {
                msg: "good",
                bigAvatar: "../static/image/is1.jpg",
                bigAvatarSize: 190,
                // 是否已关注
                isFollowed: "success",
                isFollowDisabled: false,
                followBtnVal: ""
                // 私信内容
            };
        },
        computed: {
            followDisalbeFlag() {
                return !this.$store.getters.hasLoggedIn;
            },
            sendMsgFlag(){
                return this.isself || !this.$store.getters.hasLoggedIn;
            },
            authenticateFlag(){
                return this.isself || !this.$store.getters.hasLoggedIn || this.scholarinfo.userId != null;
            }
        },
        methods: {
            avatarOf,
            async followScholar() {
                //var that = this;
                const re = await followScholarOp(this.$route.query.ID);
                if(this.isFollowed === "success"){
                    this.isFollowed = "info";
                    this.followBtnVal = "取消关注";
                    this.$message({
                        type: "success",
                        message: "成功关注该学者"
                    });
                } else{
                    this.isFollowed = "success";
                    this.followBtnVal = "关注 +";
                    this.$message({
                        type: "success",
                        message: "成功取消关注"
                    });
                }
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
    font-family: "Roboto Mono", "Microsoft YaHei", monospace;
    font-size: 70px;
    font-weight: 900;
    line-height: 1.1;
  }

  .h4 {
    font-family: "Roboto Mono", "Microsoft YaHei", monospace;
    font-size: 20px;
    padding-top: 1vh;
  }

  .h5 {
    font-family: "Roboto Mono", "Microsoft YaHei", monospace;
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

  .lineLimit {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
