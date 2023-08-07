<template>
  <div>
    <el-row type="flex" justify="space-oround">
      <el-col :span="6">
        <el-input
          placeholder="请搜索输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
          size="small"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="11"></el-col>
      <el-col :span="7">
        <el-button type="primary" size="small" @click="add">添加</el-button>
      </el-col>
    </el-row>
    <div>
      <listComp
        :list="list"
        @del="del"
        ref="paginationRefs"
        @getList="getList"
      ></listComp>
      <fromComp ref="fromRefs" @getList="getList" :list="list"></fromComp>
    </div>
  </div>
</template>

<script>
import fromComp from "./components/fromComp.vue";
import listComp from "./components/listComp.vue";
export default {
  data() {
    return {
      input2: "",
      list: [],
    };
  },
  methods: {
    async getList() {
      let { page, size } = this.$refs.paginationRefs.pagination;
      let res = await this.$api.getspecsList({ page, size });
      this.list = res;
    },
    add() {
      this.$refs.fromRefs.dialogVisible = true;
    },
    async del(row) {
      let res = await this.$api.specsDelete({ id: row.id });
      this.$message({
        message: "删除成功",
        type: "success",
      });
      this.$refs.paginationRefs.getCount();
      this.getList();
    },
  },
  computed: {},
  components: { listComp, fromComp },
  filters: {},
  watch: {},
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped></style>
