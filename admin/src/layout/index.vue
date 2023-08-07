<template>
  <div v-if="isThemeColorLoaded == true" style="height: 100%; width: 100%">
    <el-container style="height: 100%">
      <!--  -->
      <asideBar></asideBar>
      <el-container style="flex-direction: column">
        <navBar></navBar>
        <tagsView></tagsView>
        <appMain></appMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tagsView from "./components/tagsView/index.vue";
import navBar from "./components/navBar/index.vue";
import asideBar from "./components/asideBar/index.vue";
import appMain from "./components/appMain/index.vue";
import { generateNewStyle, writeNewStyle } from "@/utils/theme/index.js";
export default {
  data() {
    return {
      isThemeColorLoaded: false,
    };
  },
  methods: {},
  computed: {},
  components: { tagsView, navBar, asideBar, appMain },
  filters: {},
  watch: {},
  async mounted() {
    // 1.1 获取主题色
    const newStyleText = await generateNewStyle(this.$store.getters.mainColor);
    // console.log('获取主题色:', newStyleText)
    // 1.2 写入最新主题色
    writeNewStyle(newStyleText);
    this.isThemeColorLoaded = true;
  },
};
</script>
<style lang="scss">
.el-container {
  height: 100%;
  width: 100%;
}
</style>
