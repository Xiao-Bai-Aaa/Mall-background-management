<template>
  <el-submenu
    v-if="
      router.children &&
      Array.isArray(router.children) &&
      router.children.length > 0
    "
    :index="router.id + ''"
  >
    <template slot="title">
      <i style="color: white" :class="[router.icon, 'el-i']"></i>
      <span>{{ $t(`menus["${router.title}"]`) }}</span>
    </template>
    <subMenu v-for="(m, i) in router.children" :key="i" :index="i" :router="m">
    </subMenu>
  </el-submenu>
  <el-menu-item v-else :index="router.url">{{
    $t(`menus["${router.title}"]`)
  }}</el-menu-item>
</template>

<script>
export default {
  name: "subMenu",
  props: { router: { type: Object } },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
