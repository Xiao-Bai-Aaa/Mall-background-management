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
        <el-button type="primary" size="small" @click="add">添加</el-button>
      </el-col>
    </el-row>
    <!-- 数据列表 -->
    <listComp :tableData="rolelist" @del="del"></listComp>
    <!-- 表单添加删除 -->
    <fromComp ref="fromRef" :bfuuer="bfuuer" @updaRoleList="getRole"></fromComp>
  </div>
</template>

<script>
import listComp from "./components/listComp.vue";
import fromComp from "./components/fromComp.vue";
import { roleDelete } from "@/serve/index.js";
export default {
  data() {
    return {
      bfuuer: {
        dialogFormVisible: false,
      },
      input2: "",
      rolelist: [],
    };
  },
  methods: {
    async getRole() {
      const res = await this.$api.getRoleList();
      this.rolelist = res;
    },
    // 添加菜单
    add() {
      this.bfuuer.dialogFormVisible = true;
    },
    // 删除菜单
    del(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await roleDelete({ id: row.id });
            this.$message.success("删除成功");
            this.getRole();
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
  computed: {},
  components: { listComp, fromComp },
  filters: {},
  watch: {},
  created() {
    this.getRole();
  },
};
</script>

<style lang="scss" scoped></style>
