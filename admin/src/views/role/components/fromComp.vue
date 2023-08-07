<template>
  <div>
    <el-dialog
      :title="form.id ? '编辑菜单' : '添加菜单'"
      :visible="bfuuer.dialogFormVisible"
      @close="hideDialog"
      @opened="opened"
    >
      {{ form }}
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
            default-expand-all
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList } from "@/serve/index.js";
export default {
  props: { bfuuer: { type: Object } },
  data() {
    return {
      // 表单数据
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      // 表单宽度
      formLabelWidth: "120px",
      // 菜单列表
      defaultProps: {
        children: "children",
        label: "title",
      },
      tableData: [],
    };
  },
  methods: {
    async getMenu() {
      const res = await getMenuList({ istree: true });
      this.tableData = res;
    },
    // 关闭弹窗
    hideDialog() {
      this.bfuuer.dialogFormVisible = false;
      //清空表单
      // this.form = {
      //   rolename: "",
      //   menus: [],
      //   status: 1,
      // };
    },
    // 添加菜单
    async submit() {
      let arr = this.$refs.tree.getCheckedKeys(false, true).join(",");
      this.form.menus = arr;
      (!this.form.id
        ? this.$api.roleAdd(this.form)
        : this.$api.roleEdit(this.form)
      )
        .then((res) => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.$emit("updaRoleList");
          this.hideDialog();
        })
        .catch((err) => {
          console.log(err);
        });
      // if (!this.form.id) {
      //   await this.$api.roleAdd(this.form); //添加
      //   this.$message({
      //     message: "添加成功",
      //     type: "success",
      //   });
      // } else {
      //   await this.$api.roleEdit(this.form); //编辑
      //   this.$message({
      //     message: "修改成功",
      //     type: "success",
      //   });
      // }
      // this.$nextTick(() => {
      //   this.$emit("updaRoleList");
      //   this.hideDialog();
      // });
    },
    opened() {
      this.$refs.tree.setCheckedKeys(this.form.menus);
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {
    bfuuer: {
      handler(obj) {
        if (!obj.dialogFormVisible) {
          this.form = {
            rolename: "",
            menus: [],
            status: 1,
          };
        }
      },
      deep: true,
    },
  },
  created() {
    this.getMenu();
  },
  mounted() {
    this.$BUS.$on("edit", (row) => {
      this.form = JSON.parse(JSON.stringify(row));
      this.bfuuer.dialogFormVisible = true;
      this.form.menus = this.form.menus.split(",");
    });
  },
};
</script>

<style lang="scss" scoped></style>
