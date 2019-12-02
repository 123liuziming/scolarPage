<template>
  <div>
    <el-dialog
      title="登录到 Scholarly 以继续"
      :visible.sync="isLoginFormVisible"
    >
      <el-form :model="userInfo">
        <el-form-item label="您的 E-Mail">
          <el-input v-model="userInfo.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userInfo.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isLoginFormVisible = false">取消</el-button>
        <el-button type="primary" @click="placeholder">登录</el-button>
      </div>
    </el-dialog>
    <nav id="global-nav">
      <el-menu
        id="global-nav--menu"
        default-active="0"
        mode="horizontal"
        background-color="#000000"
        text-color="#ffffff"
        active-text-color="#ACEE18"
        :router="true"
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
            @click="placeholder"
          />
        </a>
        <a href="#">
          <font-awesome-icon
            class="global-nav-buttons--icon"
            :icon="['fa', 'user']"
            @click="isLoginFormVisible = true"
          />
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  data() {
    return {
      isLoginFormVisible: false,
      links: [
        {
          name: "首页",
          to: "Index"
        },
        {
          name: "作者",
          to: "Main"
        },
        {
          name: "论文",
          to: "article"
        }
      ],
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    placeholder() {
      this.$message({
        message: "我们正在开发此功能。",
        type: "warning",
        showClose: true
      });
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

@media screen and (max-width: 800px) {
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
