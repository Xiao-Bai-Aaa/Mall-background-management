<template>
  <el-aside width="auto" :style="{ background: $store.getters.mainColor }">
    <div class="top">
      <img
        @click="isCollapse = true"
        v-if="!isCollapse"
        src="@/assets//image/pic//logo/white@3x.png"
        alt=""
      />
      <i @click="isCollapse = false" v-else class="el-icon-s-unfold"></i>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :background-color="$store.getters.mainColor"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="111">
        <template slot="title">
          <i style="color: white" class="el-icon-setting"></i>
          <span>{{ $t(`menus['基础设置']`) }}</span>
        </template>
        <el-menu-item index="/siteSettings">{{
          $t("menus['网站设置']")
        }}</el-menu-item>
        <el-menu-item index="/timeline">{{
          $t('menus["时间轴"]')
        }}</el-menu-item>
      </el-submenu>
      <subMenu
        v-for="(router, index) in $store.getters.users.menus"
        :key="index"
        :router="router"
        :index="index"
      ></subMenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenuList } from "@/serve/index.js";
import subMenu from "./subMenu.vue";
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
        this.menuList = res;
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    addTags(item) {
      this.$store.dispatch("tag/addTags", item);
    },
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    },
  },
  components: { subMenu },
  filters: {},
  watch: {
    $route: {
      handler(val) {
        let item = {
          title: val.meta.title,
          path: val.path,
        };
        this.addTags(item);
      },
      immediate: true,
    },
  },
  created() {
    this.getMenu();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.el-aside {
  color: #333;
  height: 100%;
}
.top {
  height: 60px;
  width: 100%;
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
