<template>
  <div style="margin-top: 15px">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :header-cell-style="{
        background: $store.getters.mainColor,
        color: 'white',
        height: '50px',
      }"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.type == 1 ? 'success' : 'warning'"
            >{{ scope.row.type == 1 ? "目录" : "菜单" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
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
      this.$emit("edit", row);
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
