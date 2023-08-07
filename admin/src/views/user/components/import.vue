<template>
  <div>
    <el-dialog
      title="批量导入excel数据"
      width="70%"
      :visible.sync="bfuuer.isShow"
    >
      <!-- 数据上传区域 -->
      <el-row type="flex" class="row-bg" justify="space-around">
        <!-- 上传文件区域 -->
        <el-col :span="10">
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action=""
            :auto-upload="false"
            accept=".xlsx,.xls"
            multiple
            :on-change="handleChange"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传文件，仅支持上传文件，不支持文件夹，且不超过5000kb
            </div>
          </el-upload>
        </el-col>
        <!-- 进度条区域 -->
        <el-col :span="10">
          <el-progress
            type="circle"
            :stroke-width="10"
            :percentage="process"
            v-show="processbfuuer"
          ></el-progress>
        </el-col>
      </el-row>

      <!--数据本地解析展示区域  -->
      <el-table
        :data="tableData"
        height="300"
        style="width: 100%"
        border
        :header-cell-style="{
          background: '#FF6040',
          color: 'white',
          height: '50px',
        }"
        empty-text="暂无数据...."
      >
        <el-table-column prop="username" label="管理员姓名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="管理员密码"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button size="mini" round plain>{{
              scope.row.status
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 关闭窗口区域 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="bfuuer.isShow = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">上传到服务器</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 1.引入xlsx模块
import xlsx from "xlsx";
// 2.引入读取二进制文件方法、服务端字段类型规则
import { readFile, userCharacter } from "@/utils/blob";
import { delay } from "@/utils/dounce";

export default {
  props: {
    bfuuer: Object,
  },
  data() {
    return {
      tableData: [], //表格数据
      file: {}, //上传文件原生二进制数据
      process: 0, //进度条
      processbfuuer: false,
    };
  },
  watch: {
    bfuuer: {
      handler(newV, oldV) {
        if (newV.isShow == false) {
          this.tableData = []; //赋空表格数据
          this.process = 0; //还原上传进度
          this.processbfuuer = false; //隐藏进度条
          this.$refs.upload && this.$refs.upload.clearFiles(); //清空上传列表
        }
      },
      deep: true,
    },
  },
  methods: {
    // 监听选择本地上传文件
    async handleChange(file) {
      // 获取二进制表格数据
      // console.log(file.raw)
      // 读取本次上传excel表格二进制数据
      let binaryData = await readFile(file.raw);
      // console.log(binaryData)
      let sheetBinaryData = xlsx.read(binaryData, { type: "binary" });
      // console.log(sheetBinaryData)
      let sheetData = sheetBinaryData.Sheets[sheetBinaryData.SheetNames[0]];
      // console.log(sheetData)
      // 将读取到的表格数据转换成json格式用于预览
      let tableData = xlsx.utils.sheet_to_json(sheetData);
      // console.log(tableData)
      //设置中英文对照表
      let chart = {
        username: { text: "管理员姓名", type: String },
        password: { text: "管理员密码", type: String },
        status: { text: "状态", type: Number },
      };

      // 转换数据字段
      tableData = tableData.map((item) => {
        let obj = {};
        for (let key in chart) {
          let { text } = chart[key]; //获取每一项数据的text名称
          let value = item[text]; //根据text名称作为key获取对应的value值
          obj[key] = value; //以英文key作为键存储value值
        }
        return obj;
      });

      // 将数据赋值预览(可以上传拼接多个表格数据)
      this.tableData = this.tableData.concat(tableData);
      // console.log(tableData)

      // 存储二进制元素文件数据
      this.file = file.raw;
    },

    // 上传到服务器（可以传递预览后的JSON数组数据|file.raw）
    async submitUpload() {
      // 提示文件上传中
      const loading = this.$loading({
        lock: true,
        text: "文件上传中，稍等亲！",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // 打开上传进度条
      this.processbfuuer = true;

      // 延迟（体验感）
      await delay(2000);

      // 定义文件上传监听函数
      const onUploadProgress = (proces) => {
        console.log("上传进度：", proces);
        this.process = parseInt(proces.loaded / proces.total) * 100;
      };

      // 开始上传请求
      this.$api
        .reqAddEXcel(
          { fileDataJSON: this.tableData, file: this.file },
          onUploadProgress
        )
        .then((res) => {
          console.log(res);
          loading.close();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
