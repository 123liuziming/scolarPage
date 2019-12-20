<template>
  <div class="body bodyPerson" id="body">
    <el-dialog
      :modal-append-to-body="false"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="我们正在联系服务器…"
      title="修改密码"
      :visible.sync="isChangePwdVisible"
      top="10vh"
    >
      <el-form :model="newUserInfo" :rules="pwdChangeRules" ref="pwdChangeRules">
        <el-form-item label="原密码">
          <el-input v-model="newUserInfo.password" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="newPwd" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="newPwdConfirm" type="password" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template>
          <el-button type="primary" @click="handleChangePwd">确认</el-button>
          <el-button @click="closeChangePwd">取消</el-button>
        </template>
      </div>
    </el-dialog>
    <el-dialog
      :modal-append-to-body="false"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="我们正在联系服务器…"
      title="修改用户信息"
      :visible.sync="isUserInfoChangeVisible"
      top="10vh"
    >
      <el-form :model="newUserInfo">
        <el-form-item label="新用户名">
          <el-input
            placeholder="输入新用户名"
            v-model="newUserInfo.userName"
            auto-complete="off"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template>
          <el-button type="primary" @click="handleChangeUserInfo">确认</el-button>
          <el-button @click="closeUserInfoChange">取消</el-button>
        </template>
      </div>
    </el-dialog>
    <el-container>
      <el-aside :span="6">
        <el-menu class="el-menu">
          <el-menu-item index="1" @click="toPersonalPage">
            <i class="el-icon-user"></i>个人信息
          </el-menu-item>
          <el-menu-item index="2" @click="toSubscribe">
            <i class="el-icon-menu"></i>收藏文章
          </el-menu-item>
          <el-menu-item index="3" @click="toFollows">
            <i class="el-icon-star-on"></i>关注学者
          </el-menu-item>
          <el-menu-item index="5" v-if="ScholarId" @click="$router.push({ name: 'Main', query: { ID: ScholarId } })">
            <i class="el-icon-s-home"></i>个人主页
          </el-menu-item>
          <el-menu-item index="4" @click="logout">
            <i class="el-icon-lock"></i>注销
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :span="18" id="el_main">
        <div v-if="currentPage.personalInfo">
          <el-header style="text-align: left; font-size: 12px">
            <h2 style="color: white">个人信息</h2>
          </el-header>
          <div style="margin-left: 20px;">
            <h4 style="color: white">管理您的登录信息</h4>
            <el-button @click="changePwd" size="small">修改密码</el-button>
            <el-button @click="changeUserName" size="small">修改用户名</el-button>
            <h4 style="color: white; margin-top: 30px">修改头像</h4>
            <Pulpload @castImage="getImageUrl" />
          </div>
        </div>
        <div v-if="currentPage.subscribePage">
          <el-header style="text-align: left; font-size: 12px">
            <h2 style="color: white">收藏文章</h2>
          </el-header>
          <div id="search-results--results" v-if="favoritePage.length">
            <div
              v-for="(item, ind) in favoritePage"
              :key="`paper${ind}`"
              style="margin-bottom: 20px;"
            >
              <PaperItem :item="item" />
              <el-divider v-if="ind !== favoritePage.length - 1" />
            </div>
          </div>
          <p v-else style="padding-left: 20px; color: white">您当前没有收藏任何文章。</p>
        </div>
        <div v-if="currentPage.followPage">
          <el-header style="text-align: left; font-size: 12px">
            <h2 style="color: white">关注学者</h2>
          </el-header>
          <div id="search-results--results" v-if="followScholars.length">
            <div
              v-for="(item, ind) in followScholars"
              :key="`scholar${ind}`"
              style="margin-bottom: 20px;"
            >
              <ScholarItem :item="item" />
              <el-divider v-if="ind !== followScholars.length - 1" />
            </div>
          </div>
          <p v-else style="padding-left: 20px; color: white">您当前没有收藏任何学者。</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PaperItem from "../Search/PaperItem";
import ScholarItem from "../Search/ScholarItem";
import { Loading } from "element-ui";
import {
  gql_getFavoritePapers,
  gql_getFollows,
  gql_changePassword,
  gql_updateUserInfo,
  gql_updateUserAvatar,
  gql_getScholar
} from "@/graphql/personal";
import Pulpload from "../Scholar/Plupload";
import { updateUser } from "../../store";

export default {
  name: "person_body",
  components: {
    PaperItem,
    ScholarItem,
    Pulpload
  },
  async mounted() {
    const response = await gql_getScholar();
    if(response.data.getOwnScholar.length)
      this.ScholarId = response.data.getOwnScholar[0].id;
  },
  data() {
    return {
      currentPage: {
        subscribePage: false,
        personalInfo: true,
        followPage: false
      },
      favoritePage: [],
      followScholars: [],
      mainLoadingOps: {
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: "#el_main"
      },
      fullScreenLoadingOps: {
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true
      },
      isChangePwdVisible: false,
      newUserInfo: {
        password: "",
        userName: "",
        email: ""
      },
      newPwd: "",
      newPwdConfirm: "",
      loading: false,
      isUserInfoChangeVisible: false,
      pwdChangeRules: {
        pass: [{ validator: this.validatePass, trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
      },
      ScholarId: ""
    };
  },
  methods: {
    logout() {
      this.$confirm(
        `确定要从 ${this.$store.getters.usersName} 注销吗？`,
        "Scholarly",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }
      )
        .then(() => {
          this.$store.dispatch(updateUser);
          this.$message.success("您退出了当前登录。");
          this.$router
            .push({
              name: "Index"
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    async getImageUrl(imageUrl) {
      const loading = this.$loading(this.fullScreenLoadingOps);
      try {
        await gql_updateUserAvatar(imageUrl);
        this.$store.dispatch(updateUser, { avatar: imageUrl });
        this.$message.success("头像更改完成。");
      } catch (err) {
        this.$notify({
          title: "更改头像失败",
          type: "error",
          message: "请稍后再试。",
          duration: 5000
        });
      } finally {
        loading.close();
      }
    },
    validatePass(rule, value, callback) {
      if (this.newPwd === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.newPwd !== "") {
          this.$refs.pwdChangeRules.validateField("checkPass");
        }
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      if (this.newPwdConfirm === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.newPwdConfirm !== this.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    closeUserInfoChange() {
      this.newUserInfo.userName = "";
      this.isUserInfoChangeVisible = false;
    },
    closeChangePwd() {
      this.newPwd = "";
      this.newPwdConfirm = "";
      this.newUserInfo.password = "";
      this.isChangePwdVisible = false;
    },
    changeUserName() {
      this.isUserInfoChangeVisible = true;
    },
    closeAllPage() {
      for (const e in this.currentPage) {
        this.currentPage[e] = false;
      }
    },
    toPersonalPage() {
      this.closeAllPage();
      this.currentPage.personalInfo = true;
    },
    changePwd() {
      this.isChangePwdVisible = true;
    },
    async handleChangeUserInfo() {
      if (!this.newUserInfo.userName) return;
      const loading = this.$loading(this.fullScreenLoadingOps);
      try {
        await gql_updateUserInfo(this.newUserInfo.userName);
        this.$store.dispatch(updateUser, { name: this.newUserInfo.userName });
        this.isUserInfoChangeVisible = false;
        this.$message.success("用户名更改完成。");
      } catch (err) {
        this.$notify({
          title: "无法重置用户信息",
          type: "error",
          message: "请稍后再试。",
          duration: 5000
        });
      } finally {
        loading.close();
      }
    },
    async handleChangePwd() {
      this.$refs.pwdChangeRules.validate(valid => {
        if (!valid) {
          this.$notify({
            title: "密码不一致",
            type: "error",
            message: "新密码两次输入不一致，请重试。",
            duration: 5000
          });
        }
      });
      const loading = this.$loading(this.fullScreenLoadingOps);
      try {
        await gql_changePassword(this.newUserInfo.password, this.newPwdConfirm);
        this.$store.dispatch(updateUser);
        this.$message.success("请重新登录。");
        this.$router
          .push({
            name: "Index"
          })
          .catch(() => {});
        this.isChangePwdVisible = true;
      } catch (err) {
        this.$notify({
          title: "无法重置密码",
          type: "error",
          message: "请稍后再试。",
          duration: 5000
        });
      } finally {
        loading.close();
      }
    },
    async toSubscribe() {
      this.closeAllPage();
      await this.fetchPaperData();
      this.currentPage.subscribePage = true;
    },
    async toFollows() {
      this.closeAllPage();
      await this.fetchFollowsData();
      this.currentPage.followPage = true;
    },
    async fetchPaperData() {
      const loading = this.$loading(this.mainLoadingOps);
      try {
        const response = await gql_getFavoritePapers();
        this.favoritePage = response.data.allFavorites;
      } catch (err) {
        console.error(err);
        this.$notify({
          title: "读取列表失败",
          type: "error",
          message: "无法读取相关信息，请稍后重试",
          duration: 5000
        });
      } finally {
        loading.close();
      }
    },
    async fetchFollowsData() {
      const loading = this.$loading(this.mainLoadingOps);
      try {
        const response = await gql_getFollows();
        this.followScholars = response.data.following;
      } catch (err) {
        console.error(err);
        this.$notify({
          title: "读取列表失败",
          type: "error",
          message: "无法读取相关信息，请稍后重试",
          duration: 5000
        });
      } finally {
        loading.close();
      }
    }
  }
};
</script>

<style scoped>
.el-menu {
  border-right: 0;
  background: none !important;
}

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
#search-results--results {
  background: #000000;
  min-height: 90vh;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.3),
    0px 16px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  padding: 0 40px 40px 40px;
  color: white;
  border-radius: 0 0 20px 20px;
}
</style>
