<template>
  <div style="margin-top: 20px">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="catename" label="分类名称" sortable width="180">
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
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
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
};
</script>

<style lang="scss" scoped></style>
