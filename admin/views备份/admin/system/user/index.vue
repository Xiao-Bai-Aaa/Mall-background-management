<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :span="6">
        <el-input
          placeholder="请搜索输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
          size="small"
        >
          <el-button slot="append" icon="el-icon-search"></el-button> </el-input
      ></el-col>
      <el-col :span="11"> </el-col>
      <el-col :span="7">
        <el-button size="small" @click="flushed">刷新</el-button>
        <el-button type="primary" size="small" @click="add">添加</el-button>
      </el-col>
    </el-row>
    <!-- 数据列表 -->
    <listComp
      :tableData="tableData"
      @del="del"
      :pagination="pagination"
      @getList="getList"
    ></listComp>
    <!-- 表单添加删除 -->
    <fromComp ref="fromRef" :bfuuer="bfuuer" @updagetList="getList"></fromComp>
  </div>
</template>

<script>
import listComp from "./components/listComp.vue";
import fromComp from "./components/fromComp.vue";
export default {
  data() {
    return {
      bfuuer: {
        dialogFormVisible: false,
      },
      input2: "",
      tableData: [],
      pagination: {
        page: 1,
        size: 2,
        total: 0,
      },
    };
  },
  methods: {
    async getList() {
      const res = await this.$api.getUserList({
        page: this.pagination.page,
        size: this.pagination.size,
      });
      this.getTotal();
      this.tableData = res;
    },
    // 添加菜单
    add() {
      this.bfuuer.dialogFormVisible = true;
    },
    // 删除菜单
    del(row) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api.userDelete({ id: row.id });
            this.$message.success("删除成功");
            const currentPageIndex = this.pagination.page - 1;
            const remainingDataCount =
              this.pagination.total - currentPageIndex * this.pagination.size;
            if (currentPageIndex > 0 && remainingDataCount <= 1) {
              this.pagination.page -= 1;
            }
            this.getList();
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    flushed() {
      this.tableData = [];
      setTimeout(() => {
        this.getList();
      }, 300);
    },
    getTotal() {
      this.$api.getUserCount().then((res) => {
        this.pagination.total = res[0].total;
      });
    },
  },
  computed: {},
  components: { listComp, fromComp },
  filters: {},
  watch: {},
  created() {
    this.getList();
    this.getTotal();
  },
};
</script>

<style lang="scss" scoped></style>
