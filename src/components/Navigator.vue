<template>
  <nav id="global-nav">
    <el-menu
      id="global-nav--menu"
      default-active="1"
      mode="horizontal"
      background-color="#000000"
      text-color="#ffffff"
      active-text-color="#ACEE18"
      :router="true"
    >
      <el-menu-item
        class="global-nav--menu-item"
        v-for="(el, ind) in links"
        :index="ind"
        :route="{ name: el.to }"
        :key="ind"
      >
        {{ el.name }}
      </el-menu-item>
      <div class="global-nav--menu-item" id="global-nav--menu-pad">&nbsp;</div>
    </el-menu>
    <div id="global-nav-buttons"></div>
  </nav>
</template>

<script>
export default {
  name: "Navigator",
  data() {
    return {
      links: [
        {
          name: "Beijing",
          to: "Main"
        },
        {
          name: "Shanghai",
          to: "article"
        },
        {
          name: "Chongqing",
          to: "Header"
        }
      ]
    };
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
  height: 60px;
  text-overflow: ellipsis;
  border-bottom: none !important;
  background-color: #000000 !important;
  white-space: nowrap !important;
  width: 100%;
  display: flex;
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
