<template>
  <div style="text-align: center;font-size: 100px;">
    <div>404</div>
    <a href="###" @click="back">点击返回</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
