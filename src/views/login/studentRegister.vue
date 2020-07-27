<template>
  <div class="login_box">
    <div class="login">
      <img src="/static/images/login_bg.jpg" alt class="login_bg" />
      <div class="login_con bxs">
        <h2 class="h2 ft20 fb cursor" @click="backLogin" title="返回登录页">学生注册</h2>
        <div class="con submit-test-dialog">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label prop="education" class="bj">
              <el-select v-model="ruleForm2.education" placeholder="学段" class="flex">
                <el-option v-for="(item, i) in sujectList" :key="i" :label="i" :value="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="account" class="zh_icon">
              <el-input v-model.number="ruleForm2.account" placeholder="请输入用户名" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label prop="phone" class="sj_icon">
              <el-input v-model.number="ruleForm2.phone" placeholder="您的手机号码"></el-input>
            </el-form-item>
            <el-form-item label prop="code" class="yzm">
              <el-input v-model.number="ruleForm2.code" placeholder="验证码"></el-input>
              <el-button type="primary" @click="getCode">{{count==60?'获取验证码':'重新获取('+count+')'}}</el-button>
            </el-form-item>
            <el-form-item label prop="pass" class="pas_icon">
              <el-input
                v-model.number="ruleForm2.pass"
                placeholder="请输入密码(6到20个字符）"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="checkPass" class="pas_icon">
              <el-input v-model.number="ruleForm2.checkPass" placeholder="请确认密码" type="password"></el-input>
            </el-form-item>
            <div class="link-login">
              <p class="forget ft16">
                <el-checkbox v-model="checked">
                  我已阅读并同意
                  <span class="col39a">爱课生服务使用协议</span>
                </el-checkbox>
              </p>
            </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="article">
      <Articles></Articles>
    </div>
    <!-- <p class="copyright tc">
      <Footers></Footers>
    </p>-->
  </div>
</template>

<script>
import Footers from "../../components/common/footers";
import Articles from "../../components/articles/articles";
export default {
  name: "login",
  components: {
    Articles,
    Footers
  },
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
      checked: true,
      sujectList: [],
      count: 60,
      ruleForm2: {
        account: "",
        phone: "",
        code: "",
        pass: "",
        checkPass: "",
        education: ""
      },
      rules2: {
        education: [
          { required: true, message: "请选择学段", trigger: "change" }
        ],
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      activeIndex: ""
    };
  },
  created() {
    this.querySujectList(); //获取首页学科体系
  },
  methods: {
    //获取首页学科体系
    querySujectList() {
      this.$post("/likework/querySujectList.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.sujectList = response.data;
        }
      });
    },
    backLogin() {
      this.$router.go(-1);
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
            mobile: formData.phone,
            username: formData.account,
            password: formData.pass,
            type: 1,
            verificationCode: formData.code,
            education: formData.education,
            icon: sessionStorage.getItem("wxicon"),
            sex: sessionStorage.getItem("sex"),
            wxcode: sessionStorage.getItem("wxcode")
          };
          this.$post("/sso/enrolment.do", data).then(response => {
            // console.log(response)
            loadingObj.close();
            if (response.code == "5000") {
              // this.$router.push()
              this.$store.commit("userInfor", {
                username: data.username,
                mobile: data.mobile
              });
              this.$message({
                message: "注册成功!",
                type: "success"
              });
              loadingObj.close();

              this.login(data);
              // this.$router.back(-1);
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
              setTimeout(() => {
                loadingObj.close();
              }, 2000);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册完成后登陆
    login(e) {
      this.$post("/login", {
        mobile: e.mobile,
        pwd: e.password
      }).then(response => {
        // console.log(response)
        if (response.code == "5000") {
          const token = response.data.Authorization;
          const icon = response.data.user.icon;
          const name = response.data.user.username;
          const identity = response.data.user.identity;
          const id = response.data.user.id;
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("icon", icon);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("identity", identity);
          sessionStorage.setItem("role", response.data.user.role);
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success"
          });
          this.$router.push({ path: "/information", query: { type: 1 } });
          //1-学生 2-老师 999-管理员
        } else {
          this.$message({
            showClose: true,
            message: response.message,
            type: "error"
          });
        }
      });
    },
    getAuthCode() {
      if (this.count == 60) {
        this.count--;
        this.t = setInterval(res => {
          this.count--;
          if (this.count == 0) {
            this.count = 60;
            clearInterval(this.t);
          }
        }, 1000);
        let phones = this.ruleForm2.phone;
        this.$post("/sso/GetVerificationVode.do", { mobile: phones }).then(
          res => {
            if (res.code == "5000") {
              // console.log(res);
              this.$message({
                message: "发送成功!",
                type: "success"
              });
            }
          }
        );
      }
    },
    getCode(formName) {
      this.$refs.ruleForm2.validateField("phone", validMessage => {
        console.log(validMessage);
        console.log(this.ruleForm2.phone);
        if (!validMessage) {
          this.getAuthCode();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login_box {
  .login {
    width: 100%;
    height: 790px;
    position: relative;
    .login_bg {
      width: 100%;
      height: 790px;
      object-fit: cover;
    }
    .login_con {
      position: absolute;
      background: #f6f6f6;
      border-radius: 4px;
      width: 400px;
      height: 500px;
      top: 8%;
      left: 78%;
      margin-left: -245px;
      padding: 30px 40px;
      padding-bottom: 130px;

      .h2 {
        color: #088dff;
        position: relative;
        padding-left: 10px;

        &::before {
          content: "";
          border-left: 3px solid #39a5ff;
          display: inline-block;
          height: 22px;
          top: 4px;
          position: absolute;
          left: 0;
        }
      }

      .con {
        margin: 40px 0 40px 0;
        .link-login {
          margin-bottom: 22px;
          .forget {
          }
        }
        .reg {
          margin-bottom: 22px;
        }
        .choose {
          .album {
            .name {
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
  .article {
    width: 100%;
    overflow-x: hidden;
    .article-con {
      padding: 0 10%;
      box-sizing: border-box;
      .grid-content {
        margin-top: 30px;
        padding-right: 10%;
        box-sizing: border-box;
        .content {
          padding-right: 10%;
          box-sizing: border-box;
          margin-top: 20px;
          border-right: 1px solid #b5b5b5;
          p {
            margin-bottom: 16px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
        }
      }
    }
  }
  .copyright {
    margin: 20px 0;
  }
}
</style>
<style>
.login_con .el-form-item__label {
  text-align: left;
}

.login_con .el-button {
  width: 100%;
  height: 50px;
}

.login_con .zh_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/my_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.login_con .sj_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/mobile_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_con .pas_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/password_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_con .yzm .el-input__inner {
  width: 100%;
  -webkit-appearance: none;
  background-color: #f3f3f3;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  text-align: left;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_con .yzm .el-input {
  width: 60%;
}
.login_con .bj .el-select {
  width: 100%;
}
.login_con .bj .el-input__inner {
  width: 100%;
  background-color: #f3f3f3;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.login_con .yzm .el-button {
  width: 36%;
  margin-left: 3%;
}
</style>
