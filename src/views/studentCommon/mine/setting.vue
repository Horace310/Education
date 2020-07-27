<template>
  <div class="setting bf">
    <div class="setting-con bx">
      <div class="changePassword" v-show="show">
        <p class="tit ft18 col39a" style="color:#ff8a00">修改密码</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpaw">
            <el-input type="password" clearable v-model="ruleForm.oldpaw" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="paw">
            <el-input type="password" clearable v-model="ruleForm.paw" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPaw">
            <el-input type="password" clearable v-model="ruleForm.checkPaw" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="apply"
              @click="submitFormpas('ruleForm')"
              style="background-color:#ff8a00;color:#fff;border:none;"
            >确定</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm1"
          status-icon
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <p class="tit ft18 col39a" style="margin-top: 50px;color:#f25c29">{{text}}</p>
          <el-form-item label="新手机号码" prop="phone">
            <el-input
              type="text"
              clearable
              maxlength="11"
              v-model="ruleForm1.phone"
              @input="e=>ruleForm1.phone=validNumber(e)"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="输入验证码" prop="code" class="yzm">
            <el-input
              v-model="ruleForm1.code"
              maxlength="6"
              @input="e=>ruleForm1.code=validNumber(e)"
              clearable
              placeholder="验证码"
            ></el-input>
            <el-button
              style="background-color:#ff8a00;color:#fff;border:none;"
              type="text"
              @click="getCode1('phone')"
            >{{count1==60?'获取验证码':'重新获取('+count1+')'}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="apply"
              @click="submitForms('ruleForm1')"
              style="background-color:#ff8a00;color:#fff;border:none;"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="changePassword" v-show="showt">
        <p class="tit ft18 col39a" style="color:#ff8a00">绑定手机号</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新手机号码" prop="phone">
            <el-input
              type="text"
              clearable
              v-model="ruleForm2.phone"
              maxlength="11"
              @input="e=>ruleForm2.phone=validNumber(e)"
            ></el-input>
          </el-form-item>
          <el-form-item label="输入验证码" prop="code" class="yzm">
            <el-input
              v-model="ruleForm2.code"
              maxlength="6"
              @input="e=>ruleForm2.code=validNumber(e)"
              clearable
              placeholder="验证码"
            ></el-input>
            <el-button
              type="text"
              @click="getCode('phone')"
              style="border:0;background-colof:#ff8a00;color:#fff"
            >{{count==60?'获取验证码':'重新获取('+count+')'}}</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" clearable v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" clearable v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="apply"
              @click="submitForm('ruleForm2')"
              style="background-color:#ff8a00;color:#fff;border:none;"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPaw !== "") {
          this.$refs.ruleForm.validateField("checkPaw");
        }
        callback();
      }
    };
    var validatePass12 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.paw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      flag: 1, //(1-解绑 2-加绑)
      show: true,
      showt: false,
      count: 60,
      count1: 60,
      t: null,
      t1: null,
      text: "解绑手机号",
      ruleForm2: {
        oldpass: "",
        pass: "",
        checkPass: "",
        phone: "",
        code: ""
      },
      ruleForm1: {
        phone: "",
        code: ""
      },
      ruleForm: {
        oldpaw: "",
        paw: "",
        checkPaw: ""
      },
      rules: {
        oldpaw: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        paw: [{ validator: validatePass1, trigger: "blur" }],
        checkPaw: [{ validator: validatePass12, trigger: "blur" }]
      },
      rules2: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        oldpass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      rules1: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  created() {
    //判断是否绑定手机号
    this.queryHasbindMobile();
    this.$store.state.myhownav = "2"; //头部导航
    // this.$refs["ruleForm"].resetFields();
    // this.$refs["ruleForm1"].resetFields();
    // this.$refs["ruleForm2"].resetFields();
  },
  methods: {
    getAuthCode(e) {
      if (this.count == 60) {
        this.count--;
        this.t = setInterval(res => {
          this.count--;
          if (this.count == 0) {
            this.count = 60;
            clearInterval(this.t);
          }
        }, 1000);
        this.$post("/sso/GetVerificationVode.do", { mobile: e }).then(res => {
          if (res.code == "5000") {
            console.log(res);
            this.$message({
              message: "发送成功!",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    getAuthCode1(e) {
      if (this.count1 == 60) {
        this.count1--;
        this.t1 = setInterval(res => {
          this.count1--;
          if (this.count1 == 0) {
            this.count1 = 60;
            clearInterval(this.t1);
          }
        }, 1000);
        this.$post("/user/GetVerificationCode", { mobile: e }).then(res => {
          if (res.code == "5000") {
            console.log(res);
            this.$message({
              message: "发送成功!",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    //验证码
    getCode1(formName) {
      this.$refs.ruleForm1.validateField("phone", validMessage => {
        if (!validMessage) {
          let phones = this.ruleForm1.phone;
          this.getAuthCode1(phones);
        }
      });
    },
    getCode(formName) {
      this.$refs.ruleForm2.validateField("phone", validMessage => {
        if (!validMessage) {
          let phones = this.ruleForm2.phone;
          this.getAuthCode(phones);
        }
      });
    },
    //判断是否绑定手机号
    queryHasbindMobile() {
      this.$post("/sso/queryHasbindMobile.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          //（true-已绑定 false-未绑定 ）
          if (response.data == true) {
            this.show = true;
            this.showt = false;
          } else {
            this.show = false;
            this.showt = true;
          }
        }
      });
    },
    //密码
    submitFormpas(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          let formData = this.ruleForm;
          let data = {
            newPassword: formData.paw,
            password: formData.oldpaw
          };
          this.$post("/user/modify/password", data).then(response => {
            loadingObj.close();
            if (response.code == "5000") {
              this.$message({
                message: "修改成功!",
                type: "success"
              });
              this.$refs["ruleForm"].resetFields();
              this.flag = 2;
              if ((this.flag = 1)) {
                this.text = "解绑手机号";
              } else if ((this.flag = 2)) {
                this.text = "绑定手机号";
              }
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForms(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          let formData = this.ruleForm1;
          let data = {
            verificationCode: formData.code,
            mobile: formData.phone,
            flag: this.flag //(1-解绑 2-加绑)
          };
          this.$post("/sso/updateUserInfo.do", data).then(response => {
            loadingObj.close();
            if (response.code == "5000") {
              this.$message({
                message: "解绑成功!",
                type: "success"
              });
              this.count1 = 60;
              clearInterval(this.t1);
              this.$refs["ruleForm1"].resetFields();
              this.queryHasbindMobile();
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          let formData = this.ruleForm2;
          let data = {
            verificationCode: formData.code,
            phoneNumber: formData.phone
          };
          this.$post("/user/modify/phone", data).then(response => {
            loadingObj.close();
            if (response.code == "5000") {
              this.$message({
                message: "绑定成功!",
                type: "success"
              });
              this.count = 60;
              clearInterval(this.t);
              this.$refs["ruleForm2"].resetFields();
              this.queryHasbindMobile();
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.setting {
  .setting-con {
    padding: 40px 50px 80px 50px;
    .changePassword {
      height: 600px;
      .tit {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
<style>
.setting .el-input__inner,
.setting .el-input {
  width: 300px;
}
.setting .yzm .el-input__inner {
  width: 190px;
}
.setting .yzm .el-input {
  width: 190px;
}
.setting .yzm .el-button {
  width: 100px;
}
.setting .apply.el-button {
  width: 300px;
}
</style>
