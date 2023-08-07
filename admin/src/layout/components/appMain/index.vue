<template>
  <el-main>
    <transition name="fade" mode="out-in">
      <router-view v-if="show"></router-view>
    </transition>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-main {
  background-color: #f2f2f2;
  color: #333;
  height: 100%;
}
// 实现路由切换时右移淡出
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease-in-out;
}
.fade-enter {
  opacity: 0;
  transform: rotate(360deg);
}

.fade-leave-to {
  opacity: 0;
  transform: rotate(360deg);
}
</style>
