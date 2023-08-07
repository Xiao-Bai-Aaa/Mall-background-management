<template>
  <div>
    <el-dialog
      :title="form.id ? '编辑管理员' : '添加管理员'"
      :visible="bfuuer.dialogFormVisible"
      @close="hideDialog"
    >
      {{ form }}

      <el-form :model="form">
        <el-form-item label="管理员角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            :placeholder="form.id ? '不填写则不改' : ''"
          ></el-input>
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
export default {
  props: { bfuuer: { type: Object } },
  data() {
    return {
      // 表单数据
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      // 表单宽度
      formLabelWidth: "120px",
      // 菜单列表
      roleList: [],
    };
  },
  methods: {
    async getRole() {
      const res = await this.$api.getRoleList();
      this.roleList = res;
    },
    // 关闭弹窗
    hideDialog() {
      this.bfuuer.dialogFormVisible = false;
    },
    // 添加菜单
    async submit() {
      (!this.form.id
        ? this.$api.userAdd(this.form)
        : this.$api.userEdit(this.form)
      )
        .then((res) => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.$emit("updagetList");
          this.hideDialog();
        })
        .catch((err) => {
          console.log(err);
        });
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
            roleid: "",
            username: "",
            password: "",
            status: 1,
          };
        }
      },
      deep: true,
    },
  },
  created() {
    this.getRole();
  },
  mounted() {
    this.$BUS.$on("edit", (row) => {
      let obj = JSON.parse(JSON.stringify(row));
      delete obj.password;
      this.form = obj;
      this.bfuuer.dialogFormVisible = true;
    });
  },
};
</script>

<style lang="scss" scoped></style>
