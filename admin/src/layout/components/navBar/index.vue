<template>
  <el-header>
    <!-- 导航路由标签 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routePath.title != '首页'">{{
          routePath.parent
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ routePath.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="rigth" :style="{ color: $store.getters.mainColor }">
      <!-- 办公消息提示 -->
      <el-badge is-dot class="title_msg">
        <i class="el-icon-s-comment"></i>
      </el-badge>
      <!-- 切换主题区域 -->
      <div class="theme-select" :style="{ color: $store.getters.mainColor }">
        <span class="demonstration">{{ $t("title.theme") }}</span>
        <el-color-picker
          v-model="themeColor"
          size="mini"
          :predefine="predefineColors"
          show-alpha
        ></el-color-picker>
      </div>
      <!-- 语言国际化区域 -->
      <el-dropdown
        class="dropdown1"
        :style="{ color: $store.getters.mainColor }"
        @command="changeLang"
      >
        <span class="el-dropdown-link"
          >{{ $t("title.lang")
          }}<i class="el-icon-arrow-down el-icon--right"></i
        ></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :style="{ color: $store.getters.mainColor }"
              command="zh"
              >中文</el-dropdown-item
            >
            <el-dropdown-item
              :style="{ color: $store.getters.mainColor }"
              command="en"
              >英文</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户信息 退出登录区域 -->
      <el-dropdown
        class="dropdown2"
        :style="{ color: $store.getters.mainColor }"
        @command="changeUser"
      >
        <span class="el-dropdown-link"
          >{{ $store.getters.users.username
          }}<i class="el-icon-arrow-down el-icon--right"></i
        ></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :style="{ color: $store.getters.mainColor }"
              command="out"
              >退出</el-dropdown-item
            >
            <el-dropdown-item
              :style="{ color: $store.getters.mainColor }"
              command="edit"
              >修改信息</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 全屏服务区域 -->
      <img
        :src="screenFull ? exitImg : fullImg"
        class="fullScreen"
        :style="{ background: $store.getters.mainColor }"
        @click="changeFullScreen"
      />
    </div>
  </el-header>
</template>

<script>
import screenfull from "screenfull"; //全屏插件
import { generateNewStyle, writeNewStyle } from "@/utils/theme/index.js";
export default {
  data() {
    return {
      routePath: [], //路由路径
      themeColor: this.$store.getters.mainColor, //主题色
      screenFull: false, //全屏开关
      fullImg: require("@/assets/image/icon/index/full.svg"),
      exitImg: require("@/assets/image/icon/index/exitfull.svg"),
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  methods: {
    // 切换语言
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
    changeUser(info) {
      info == "out" ? this.loginOut() : this.editUser();
    },
    // 用户登出
    loginOut() {
      this.$confirm("是否继续本次操作?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("user/outLogin");
        this.$router.replace("/login");
      });
    },
    // 用户信息编辑
    editUser() {},
    changeFullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "您的浏览器暂不支持全屏哦！",
          type: "warning",
        });
      } else {
        // 执行切换窗口
        screenfull.toggle();
      }
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {},
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.routePath = this.$route.meta;
      },
    },
    themeColor: {
      deep: true,
      immediate: true,
      async handler(newColor) {
        // 1.1 获取主题色
        const newStyleText = await generateNewStyle(this.themeColor);
        // console.log('获取主题色:', newStyleText)
        // 1.2 写入最新主题色
        writeNewStyle(newStyleText);
        this.$store.commit("theme/setColor", newColor);
        // 2. 保存最新的主题色
      },
    },
  },
  mounted() {
    screenfull.on("change", () => {
      this.screenFull = !this.screenFull;
    });
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.rigth {
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.theme-select {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fullScreen {
  width: 25px;
  height: 25px;
}
</style>
