<template>
  <div style="height: 100%; width: 100%">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <div class="top">
          <img
            @click="isCollapse = true"
            v-if="!isCollapse"
            src="../../assets//image/pic//logo/white@3x.png"
            alt=""
          />
          <i @click="isCollapse = false" v-else class="el-icon-s-unfold"></i>
        </div>
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#ff6f57"
          text-color="#fff"
          router
        >
          <el-submenu index="111">
            <template slot="title">
              <i style="color: white" class="el-icon-setting"></i>
              <span>基础设置</span>
            </template>
            <el-menu-item index="/siteSettings">网站设置</el-menu-item>
            <el-menu-item index="/timeline">时间轴</el-menu-item>
          </el-submenu>
          <el-submenu
            v-for="(item1, index) in menuList"
            :key="index"
            :index="index + ''"
          >
            <template slot="title">
              <i style="color: white" :class="item1.icon"></i>
              <span>{{ item1.title }}</span>
            </template>
            <el-menu-item
              v-for="(item2, index) in item1.children"
              :key="index"
              :index="item2.url"
              >{{ item2.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="height: 100%">
        <el-header>Header</el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenuList } from "@/serve/index.js";
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
    };
  },
  methods: {
    getMenu() {
      getMenuList({ istree: true }).then((res) => {
        console.log(res);
        this.menuList = res;
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {
    this.getMenu();
  },
};
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #ff6f57;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
  height: 100%;
}
.top {
  height: 60px;
  width: 100%;
  background-color: #ff6f57;
  img {
    width: 80%;
    height: 40px;
    display: block;
    margin: 10px auto;
  }
  i {
    font-size: 50px;
    color: white;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu__title i {
  color: white;
}
</style>
