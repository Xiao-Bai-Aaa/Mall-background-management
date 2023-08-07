<template>
  <el-dialog
    :title="form.id ? '修改分类' : '添加分类'"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <span>
      {{ this.form }}
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格值" v-for="(item, index) in attr" :key="index">
          <el-input v-model="item.value">
            <template slot="append">
              <el-button v-if="index == 0" @click="addDomain"
                >新增规格</el-button
              >
              <el-button v-else @click.prevent="removeAttr(index)"
                >删除</el-button
              >
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="规格状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="subFrom">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      dialogVisible: false,
      form: {
        catename: "",
        attrs: "",
        status: 1,
      },
      attr: [{ value: "" }],
    };
  },
  methods: {
    removeAttr(index) {
      this.attr.splice(index, 1);
    },
    addDomain() {
      this.attr.push({ value: "" });
    },
    subFrom() {
      this.form.attrs = this.attr.map((item) => item.value).join(",");
      (!this.form.id
        ? this.$api.specsAdd(this.form)
        : this.$api.specsEdit(this.form)
      ).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.$emit("getList");
        this.dialogVisible = false;
        if (!this.form.id) {
          this.$BUS.$emit("getCount");
        }
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {
    dialogVisible: {
      handler(obj) {
        if (!obj) {
          this.form = {
            catename: "",
            attrs: "",
            status: 1,
          };
          this.attr = [{ value: "" }];
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$BUS.$on("edit", (row) => {
      this.dialogVisible = true;
      console.log(row);
      this.form = JSON.parse(JSON.stringify(row));
      this.attr = this.form.attrs.map((item) => ({ value: item }));
    });
  },
};
</script>

<style scoped>
.add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
