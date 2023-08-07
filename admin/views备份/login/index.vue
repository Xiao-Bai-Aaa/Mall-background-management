<template>
  <div class="login">
    <div class="bg">
      <div class="content">
        <img src="../../assets//image/pic//logo/orange@3x.png" alt="" />
        <p>优质甄选·高枕无忧</p>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                placeholder="请输入您的用户名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="请输入相应的密码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                style="width: 100%"
                round
                @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "@/serve/index.js";

import { Message } from "element-ui";
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123123",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");

          let res = await reqLogin(this.ruleForm);
          this.$store.commit("user/setAdmin", res);
          Message({
            message: "登录成功",
            type: "success",
          });
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {},
};
</script>

<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #ff6345 0%, #ff8679 100%);
  .bg {
    width: 750px;
    height: 70%;
    background: url("../../assets/image//pic//bg//login@3x.png") no-repeat
      center center;
    background-size: 100% 100%;
    position: absolute;
    right: 10%;
    top: 15%;
    .content {
      width: 300px;
      height: 600px;
      margin-left: 380px;
      img {
        height: 80px;
        width: 100%;
        margin: 100px 0 0;
      }
      p {
        margin: 40px 0;
        text-align: center;
        font-size: 20px;
        color: gray;
        letter-spacing: 10px;
      }
    }
  }
}
.el-input__inner {
  border: 0;
  border-radius: 0;
  background-color: #fff8f6;
  border-bottom: 1px solid #ff6345;
  padding: 0;
}
</style>
