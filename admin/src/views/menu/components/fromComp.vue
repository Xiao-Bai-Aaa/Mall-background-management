<template>
  <div>
    <el-dialog
      :title="form.id ? '编辑菜单' : '添加菜单'"
      :visible="bfuuer.dialogFormVisible"
      @close="hideDialog"
    >
      <el-form :model="form">
        <el-form-item label="顶级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="顶级菜单"
            @visible-change="visibleChange"
            @change="changePid"
            :disabled="!!form.id"
          >
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="(item, index) in menuList"
              :key="index"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.pid == 0"
          label="目录图标"
          :label-width="formLabelWidth"
        >
          <icon-picker v-model="form.icon"></icon-picker>
        </el-form-item>
        <el-form-item v-else label="菜单路径" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio disabled :label="1">目录</el-radio>
            <el-radio disabled :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
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
import { menuAdd, getMenuList, menuEdit } from "@/serve/index.js";
export default {
  props: ["bfuuer"],
  data() {
    return {
      // 表单数据
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      // 表单宽度
      formLabelWidth: "120px",
      // 菜单列表
      menuList: [],
    };
  },
  methods: {
    // 获取菜单列表
    async visibleChange(val) {
      if (val) {
        const res = await getMenuList({ istree: true });
        this.menuList = res;
      }
    },
    // 关闭弹窗
    hideDialog() {
      this.bfuuer.dialogFormVisible = false;
      //清空表单
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 改变pid 改变type 1目录 2菜单
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
        this.form.url = "";
      } else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    // 添加菜单
    async submit() {
      if (!this.form.id) {
        await menuAdd(this.form); //添加
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } else {
        await menuEdit(this.form); //编辑
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }
      this.$nextTick(() => {
        this.$emit("updaMenuList");
        // this.hideDialog();
        //清空表单
        // this.form = {
        //   pid: 0,
        //   title: "",
        //   icon: "",
        //   type: 1,
        //   url: "",
        //   status: 1,
        // };
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
