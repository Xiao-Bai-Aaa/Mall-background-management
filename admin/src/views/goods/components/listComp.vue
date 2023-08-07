<template>
  <div style="margin-top: 20px">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column
        prop="firstcatename"
        label="一级分类名称"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="secondcatename"
        label="二级分类名称"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="商品市场价"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status == 1 ? 'success' : 'warning'"
            plain
            size="mini"
            >{{ scope.row.status == 1 ? "上架" : "下架" }}</el-button
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
  props: ["list", "pagination"],
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val;
      this.$emit("getList");
    },
    handleCurrentChange(val) {
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
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
