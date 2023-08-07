<template>
  <el-dialog
    :title="form.id ? '修改分类' : '添加分类'"
    :visible.sync="dialogVisible"
    width="60%"
    @opened="opened"
  >
    <span>
      {{ this.form }}
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="cateChange"
          >
            <el-option
              v-for="(cate, index) in cateList"
              :key="index"
              :label="cate.catename"
              :value="cate.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="(cate, index) in cateChild"
              :key="index"
              :label="cate.catename"
              :value="cate.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="specsChange"
          >
            <el-option
              v-for="(specs, index) in specsList"
              :key="index"
              :label="specs.specsname"
              :value="specs.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格值">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="(specs, index) in specsattr"
              :key="index"
              :label="specs"
              :value="specs"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="商品详情描述">
          <div ref="editor"></div>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
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
import E from "wangeditor";
export default {
  props: ["list"],
  data() {
    return {
      dialogVisible: false,
      form: {
        first_cateid: "", // 一级分类名称
        second_cateid: "", // 二级分类名称
        goodsname: "", // 商品名称
        img: "", // 商品图片
        specsid: "", // 商品规格
        specsattr: [], // 商品规格值
        price: "", // 销售价
        market_price: "", // 市场价
        description: "", // 商品详情描述
        isnew: 1, // 是否新品
        ishot: 1, // 是否热卖
        status: 1, // 是否上架
      },
      imageUrl: "",
      cateList: [], // 一级分类列表
      cateChild: [], // 二级分类列表
      specsList: [], // 商品规格列表
      specsattr: [], // 商品规格值列表
      editor: null, // 富文本编辑器
    };
  },
  methods: {
    // 一级分类列表
    getcateList() {
      this.$api.getcateList({ istree: true }).then((res) => {
        this.cateList = res;
        console.log(res);
      });
    },
    // 商品规格列表
    getspecsList() {
      this.$api.getspecsList().then((res) => {
        this.specsList = res;
        console.log(res);
      });
    },
    cateChange(id) {
      // 二级分类列表
      this.form.second_cateid = "";
      this.cateChild = this.cateList.find((item) => item.id == id).children;
    },
    specsChange(id) {
      // 商品规格值列表
      this.form.specsattr = [];
      this.specsattr = this.specsList.find((item) => item.id == id).attrs;
    },
    // 监听弹窗加载完成
    opened() {
      this.editor = new E(this.$refs.editor); // 创建编辑器实例
      this.editor.create(); // 创建编辑器实例
      this.form.id && this.editor.txt.html(this.form.description); // 编辑时回显
    },
    // 上传图片
    onChange(file) {
      let { name, size } = file;

      if (size > 1024 * 1024 * 2) {
        this.$message.error("上传图片不能超过2M!");
      }
      let imgName = name.split(".")[1];
      let imgType = ["jpg", "jpeg", "png", "gif"];
      if (!imgType.includes(imgName)) {
        this.$message.error("上传图片格式有误!");
      }
      this.form.img = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 提交表单
    subFrom() {
      this.form.description = this.editor.txt.html(); // 获取富文本编辑器内容
      (!this.form.id
        ? this.$api.goodsAdd(this.form)
        : this.$api.goodsEdit(this.form)
      ).then((res) => {
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
      handler() {
        if (this.dialogVisible == false) {
          this.form = {
            first_cateid: "", // 一级分类名称
            second_cateid: "", // 二级分类名称
            goodsname: "", // 商品名称
            img: "", // 商品图片
            specsid: "", // 商品规格
            specsattr: [], // 商品规格值
            price: "", // 销售价
            market_price: "", // 市场价
            description: "", // 商品详情描述
            isnew: 1, // 是否新品
            ishot: 1, // 是否热卖
            status: 1, // 是否上架
          };
          this.imageUrl = ""; // 商品图片
          this.cateChild = []; // 二级分类列表
          this.specsattr = []; // 商品规格值列表
          this.editor.destroy(); //销毁编辑器实例
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getcateList(); // 一级分类列表
    this.getspecsList(); // 商品规格列表
    this.$BUS.$on("edit", (row) => {
      // 监听编辑事件
      this.dialogVisible = true; // 打开弹窗
      delete row.firstcatename; // 删除一级分类名称
      delete row.secondcatename; // 删除二级分类名称
      this.form = JSON.parse(JSON.stringify(row)); // 深拷贝
      let specsattr = this.form.specsattr;
      let second_cateid = this.form.second_cateid;
      this.imageUrl = process.env.VUE_APP_BASE_URL + this.form.img; // 拼接图片地址
      this.cateChange(this.form.first_cateid); // 二级分类列表
      this.specsChange(this.form.specsid); // 商品规格值列表
      this.form.specsattr = specsattr.split(","); // 商品规格值
      this.form.second_cateid = second_cateid; // 二级分类列表
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
.avatar-uploader /deep/ .el-upload {
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
