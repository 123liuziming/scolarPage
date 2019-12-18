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
      <el-form
        :model="newUserInfo"
      >
        <el-form-item label="原密码">
          <el-input 
            v-model="newUserInfo.password" 
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="newPwd"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="newPwdConfirm"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template>
          <el-button @click="handleChangePwd">确认</el-button>
          <el-button type="primary" @click="this.isChangePwdVisible = false">取消</el-button>
        </template>
      </div>
    </el-dialog>
    <el-container>
      <el-aside :span="6">
        <el-menu class="el-menu">
          <el-menu-item index="1" @click="toPersonalPage">个人信息</el-menu-item>
          <el-menu-item index="2" @click="toSubscribe">收藏文章</el-menu-item>
          <el-menu-item index="3" @click="toFollows">关注学者</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :span="18" id="el_main">
        <div v-if="currentPage.personalInfo">
          <el-header style="text-align: left; font-size: 12px">
            <h2>个人信息</h2>
          </el-header>
          <el-button @click="changePwd">修改密码</el-button>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div v-if="currentPage.subscribePage">
          <el-header style="text-align: left; font-size: 12px">
            <h2>收藏文章</h2>
          </el-header>
          <!-- <div
            id="search-results--results"
            v-if="favoritePage.length"
          >
            <div
              v-for="(item, ind) in favoritePage"
              :key="`paper${ind}`"
              style="margin-bottom: 20px;"
            >
              <PaperItem :item="item" />
              <el-divider v-if="ind !== favoritePage.length - 1" />
            </div>
          </div> -->
        </div>
        <div v-if="currentPage.followPage">
          <el-header style="text-align: left; font-size: 12px">
            <h2>关注学者</h2>
          </el-header>
          <!-- <div
            id="search-results--results"
            v-if="followScholars.length"
          >
            <div
              v-for="(item, ind) in followScholars"
              :key="`scholar${ind}`"
              style="margin-bottom: 20px;"
            >
              <ScholarItem :item="item" />
              <el-divider v-if="ind !== followScholars.length - 1" />
            </div>
          </div> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PaperItem from "../Search/PaperItem";
import ScholarItem from "../Search/ScholarItem";
import { Loading } from 'element-ui';
import {
  gql_getFavoritePapers,
  gql_getFollows
} from "@/graphql/personal";


export default {
  name: "person_body",
  components: {
    PaperItem,
    ScholarItem
  },
  data() {
    return {
      currentPage:{
        subscribePage:true,
        personalInfo:false,
        followPage:false
      },
      input:"",
      favoritePage:[],
      followScholars:[],
      loadingOps:{
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target:'#el_main'
      },
      isChangePwdVisible:false,
      newUserInfo:{
        password:''
      },
      newPwd:'',
      newPwdConfirm:'',
      loading:false,
    }
  },
  methods: {
    closeAllPage(){
      for(const e in this.currentPage){
        this.currentPage[e] = false
      }
    },
    toPersonalPage(){
      this.closeAllPage()
      this.currentPage.personalInfo = true
    },
    changePwd(){
      this.isChangePwdVisible = true;
    },
    async handleChangePwd(){
      this.$store.dispatch(updateUser)
      this.$message.success("您退出了当前登录。")
      this.isChangePwdVisible = true
    },
    async toSubscribe(){
      this.closeAllPage()
      await this.fetchPaperData()
      this.currentPage.subscribePage = true
    },
    async toFollows(){
      this.closeAllPage()
      await this.fetchFollowsData()
      this.currentPage.followPage = true
    },
    async fetchPaperData(){
      const loading = this.$loading(this.loadingOps);
      try {
        const response = await gql_getFavoritePapers();
        this.favoritePage = response.data.allFavorites;
      } catch (err) {
        console.error(err);
        this.$notify({
          title: '读取列表失败',
          type: 'error',
          message: '无法读取相关信息，请稍后重试',
          duration: 5000
        })
      } finally {
        loading.close();
      }
    },
    async fetchFollowsData(){
      const loading = this.$loading(this.loadingOps);
      try {
        const response = await gql_getFollows();
        this.followScholars = response.data.following;
      } catch (err) {
        console.error(err);
        this.$notify({
          title: '读取列表失败',
          type: 'error',
          message: '无法读取相关信息，请稍后重试',
          duration: 5000
        })
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
