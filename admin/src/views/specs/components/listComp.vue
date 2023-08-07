<template>
  <div style="margin-top: 20px">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="specsname" label="属性名称" sortable width="180">
      </el-table-column>
      <el-table-column label="属性值" sortable width="180">
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in scope.row.attrs"
            :key="index"
            type="success"
            plain
            size="mini"
            >{{ item }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status == 1 ? 'success' : 'warning'"
            plain
            size="mini"
            >{{ scope.row.status == 1 ? "启用" : "禁用" }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
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
  props: ["list"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 2,
        total: 0,
      },
    };
  },
  methods: {
    async getCount() {
      let res = await this.$api.getspecsCount();
      this.pagination.total = res[0].total;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.$emit("getList");
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.page = val;
      this.$emit("getList");
    },
    handleEdit(row) {
      this.$BUS.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  mounted() {
    this.getCount();
    this.$BUS.$on("getCount", () => {
      this.getCount();
    });
  },
};
</script>

<style lang="scss" scoped></style>
