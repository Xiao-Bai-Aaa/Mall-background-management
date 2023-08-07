<template>
  <div style="margin-top: 15px">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column type="selection" prop="rolename" width="55">
      </el-table-column>
      <el-table-column prop="id" label="数据编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="管理员名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="管理员角色" sortable width="180">
      </el-table-column>
      <el-table-column label="角色状态">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.status == 1 ? 'success' : 'warning'"
            >{{ scope.row.status == 1 ? "启用" : "禁用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[2, 4, 10, 50]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["tableData", "pagination"],
  data() {
    return {};
  },
  methods: {
    del(row) {
      this.$emit("del", row);
    },
    edit(row) {
      this.$BUS.$emit("edit", row);
    },
    handleSizeChange(val) {
      this.pagination.size = val;
      this.$emit("getList", this.pagination.size);
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.$emit("getList", this.pagination.page);
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped></style>
