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
        @getList="getList"
        :pagination="pagination"
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
      pagination: {
        page: 1,
        size: 2,
        total: 0,
      },
    };
  },
  methods: {
    async getCount() {
      let res = await this.$api.getgoodsCount();
      this.pagination.total = res[0].total;
    },
    async getList() {
      let res = await this.$api.getgoodsList({
        page: this.pagination.page,
        size: this.pagination.size,
      });
      this.list = res;
      await this.getCount();
    },
    add() {
      this.$refs.fromRefs.dialogVisible = true;
    },
    async del(row) {
      console.log(row);
      let res = await this.$api.goodsDelete({ id: row.id });
      this.$message({
        message: "删除成功",
        type: "success",
      });
      const currentPageIndex = this.pagination.page - 1;
      const remainingDataCount =
        this.pagination.total - currentPageIndex * this.pagination.size;
      if (currentPageIndex > 0 && remainingDataCount <= 1) {
        this.pagination.page -= 1;
      }
      this.getList();
    },
  },
  computed: {},
  components: { listComp, fromComp },
  filters: {},
  watch: {},
  mounted() {
    this.getList();
    this.getCount();
  },
};
</script>

<style lang="scss" scoped></style>
