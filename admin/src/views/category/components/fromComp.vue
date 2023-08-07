<template>
  <el-dialog
    :title="form.id ? '修改分类' : '添加分类'"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <span>
      {{ this.form }}
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="顶级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="imageChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类状态">
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
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    imageChange(file) {
      console.log(file);
      let { name, size } = file;
      const isLt2M = size / 1024 / 1024 < 2;
      let isJp = name.split(".")[1];
      let suffixWiteList = ["png", "jpeg", "gif", "wep", "jpg"];
      if (!suffixWiteList.includes(isJp)) {
        this.$message.error("上传头像图片格式有误!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.form.img = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    subFrom() {
      (!this.form.id
        ? this.$api.cateAdd(this.form)
        : this.$api.cateEdit(this.form)
      ).then((res) => {
        console.log(res);
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.$emit("getList");
        this.dialogVisible = false;
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
            pid: 0,
            catename: "",
            img: "",
            status: 1,
          };
          this.imageUrl = "";
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$BUS.$on("edit", (row) => {
      this.dialogVisible = true;
      console.log(row);
      let obj = JSON.parse(JSON.stringify(row));
      obj.children && delete obj.children;
      this.form = obj;
      this.imageUrl = process.env.VUE_APP_BASE_URL + this.form.img;
    });
  },
};
</script>

<style scoped>
.el-form-item /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
