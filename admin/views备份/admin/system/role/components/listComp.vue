<template>
  <div style="margin-top: 15px">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
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
  </div>
</template>

<script>
export default {
  props: ["tableData"],
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
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
