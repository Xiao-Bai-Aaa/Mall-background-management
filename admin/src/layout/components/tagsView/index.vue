<template>
  <div class="route-tags-list">
    <el-tag
      v-for="(item, index) in tags"
      :key="index"
      :effect="$store.getters.activeIndex == index ? 'dark' : 'light'"
      :type="$store.getters.activeIndex == index ? 'primary' : ''"
      size="mini"
      :closable="item.title == '首页' ? false : true"
      @close="removeTags(item)"
      @click="editIndex(item, index)"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    removeTags(item) {
      console.log(item);
      this.$store.dispatch("tag/removeTags", item);
    },
    editIndex(item, index) {
      this.$store.dispatch("tag/editIndex", index);
      this.$router.push(item.path);
    },
  },
  computed: {
    tags() {
      return Array.from(this.$store.getters.tags).map((tag) => JSON.parse(tag));
    },
  },
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.route-tags-list {
  box-shadow: 0 0 3px #000;
  height: 40px;
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 0 5px;
}
</style>
