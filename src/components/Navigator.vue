<template>
  <div>
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="我们正在联系服务器…"
      :title="
        isRegistering ? '注册您的 Scholarly 帐号' : '登录到 Scholarly 以继续'
      "
      :visible.sync="isLoginFormVisible"
      top="10vh"
    >
      <el-form
        :model="userInfo"
        @keyup.enter.native="isRegistering ? register() : login()"
      >
        <el-form-item label="您的 E-Mail">
          <el-input v-model="userInfo.email" />
        </el-form-item>
        <el-form-item v-if="isRegistering" label="姓名">
          <el-input v-model="userInfo.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userInfo.password"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item v-if="isRegistering" label="确认密码">
          <el-input
            v-model="userInfo.confirmedPassword"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <template v-if="isRegistering">
          <el-button @click="isRegistering = false">已有账号？登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </template>
        <template v-else>
          <el-button @click="isRegistering = true">没有账号？注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </template>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isSearchDialogVisible"
      title="Scholarly Spotlight"
      :show-close="false"
    >
      <div style="width: 100%; display: flex; height: 50px;">
        <font-awesome-icon
          :icon="['fas', 'search']"
          style="font-size: 38px; height: 100%;"
        />
        <el-input
          placeholder="输入关键词…"
          v-model="globalSearchUserInput"
          @keyup.enter.native="search"
          id="search-everything--input"
          type="text"
        />
      </div>
    </el-dialog>
    <nav id="global-nav">
      <el-menu
        id="global-nav--menu"
        mode="horizontal"
        background-color="#000000"
        text-color="#ffffff"
        active-text-color="#52e38a"
        router
      >
        <el-menu-item
          class="global-nav--menu-item"
          v-for="(el, ind) in links"
          :index="ind.toString()"
          :route="{ name: el.to }"
          :key="ind"
        >
          {{ el.name }}
        </el-menu-item>
        <div class="global-nav--menu-item" id="global-nav--menu-pad">
          &nbsp;
        </div>
      </el-menu>
      <div id="global-nav-buttons">
        <a href="#">
          <font-awesome-icon
            class="global-nav-buttons--icon"
            :icon="['fa', 'search']"
            @click="isSearchDialogVisible = true"
          />
        </a>
        <a href="#">
          <font-awesome-icon
            class="global-nav-buttons--icon"
            :icon="['fa', 'user']"
            @click="
              $store.getters.hasLoggedIn
                ? toPersonalPage()
                : (isLoginFormVisible = true)
            "
          />
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import {
  login,
  register,
  checkLoginFormValidity,
  checkRegisterFormValidity
} from "../graphql/user";
import { updateUser } from "../store";
import { Loading } from "element-ui";

export default {
  name: "Navigator",
  data() {
    return {
      loading: false,
      isSearchDialogVisible: false,
      isRegistering: false,
      isLoginFormVisible: false,
      globalSearchUserInput: "",
      links: [
        {
          name: "首页",
          to: "Index"
        }
      ],
      userInfo: {
        email: "",
        password: "",
        confirmedPassword: "",
        name: ""
      }
    };
  },
  methods: {
    search() {
      this.isSearchDialogVisible = false;
      this.$router
        .push({
          name: "Search",
          query: { w: this.globalSearchUserInput, t: "a", p: 1 }
        })
        .catch(() => {});
    },
    async login() {
      const validity = checkLoginFormValidity(this.userInfo);
      if (!validity.valid) {
        this.$message.error(validity.message);
        return;
      }

      try {
        this.loading = true;
        const result = await login(this.userInfo.email, this.userInfo.password);
        this.$store.dispatch(updateUser, result.data.login);
        this.$notify({
          type: "success",
          title: "欢迎回来",
          message: `您现在以 ${this.$store.getters.usersName} 的身份登录。`
        });
        this.isLoginFormVisible = false;
      } catch (err) {
        // A temporary implementation. DON'T IMITATE.
        console.error(JSON.parse(JSON.stringify(err)));
        if (!err.graphQLErrors)
          this.$message.error("我们暂时无法处理您的请求。");
        else
          this.$message.error(
            "您提供的用户名与密码并不匹配，因此我们无法认证您的身份。"
          );
      } finally {
        this.loading = false;
      }
    },
    async register() {
      const validity = checkRegisterFormValidity(this.userInfo);
      if (!validity.valid) {
        this.$message.error(validity.message);
        return;
      }
      try {
        this.loading = true;
        const response = await register(
          this.userInfo.email,
          this.userInfo.name,
          this.userInfo.password
        );
        this.$store.dispatch(updateUser, response.data.register);
        this.$notify({
          title: "成功",
          message: `欢迎加入 Scholarly！您现在将以 ${this.$store.getters.usersName} 的身份登录。`,
          type: "success"
        });
        this.isLoginFormVisible = false;
      } catch (err) {
        console.error(err);
        if (err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT")
          this.$message.error("您提供的 E-Mail 不正确。");
        else this.$message.error("我们暂时无法处理您的请求。");
      } finally {
        this.loading = false;
      }
    },
    toPersonalPage() {
      this.$router
        .push({
          name: "PersonalPage"
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
#global-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 45vw;
  z-index: 999;
}

#global-nav--menu {
  padding-left: 38%;
  margin-right: 120px;
  overflow-x: scroll !important;
  overflow-y: hidden;
  scrollbar-width: none; /* hide scrollbars on Firefox */
  height: 60px;
  text-overflow: ellipsis;
  border-bottom: none !important;
  background-color: #000000 !important;
  white-space: nowrap !important;
  width: 100%;
  display: flex;
}

#global-nav--menu::-webkit-scrollbar {
  display: none; /* hide scrollbars on Chromium and WebKit */
}

.global-nav--menu-item {
  display: inline-block !important;
}

#global-nav--menu-pad {
  width: 240px !important;
  height: 100%;
  padding-right: 120px;
}

#global-nav-buttons {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 120px;
  background-color: #2e2e2e;
  display: flex;
}

.global-nav-buttons--icon {
  color: white;
  height: 100%;
  margin: 0 20px 0 20px;
  font-size: 17px;
}

#search-everything--input {
  background: none;
  border: none;
  width: 98%;
  font-size: 38px;
  font-weight: bold;
  margin-left: 20px;
  padding-left: 2px !important;
  padding-right: 2px !important;
  border-bottom: #2c2c2c solid 3px;
}

#search-everything--input:focus {
  outline-width: 0px;
  border-bottom: #3fe07d solid 3px;
}

@media (max-width: 1200px) {
  #global-nav {
    width: 100vw;
  }

  #global-nav--menu {
    padding-left: 5px;
  }

  #global-nav--menu-pad {
    display: none;
  }
}
</style>
