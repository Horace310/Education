<template>
  <div class="box">
    <div class="heard">
      <img src="../../../static/images/akslogo.png" alt />
    </div>
    <div class="phoneBox">
      <el-form
        :label-position="labelPosition"
        :model="ruleForm2"
        status-icon
        :rules="rules"
        ref="ruleForm2"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model.number="ruleForm2.phone" placeholder="您的手机号码" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证：" prop="code">
          <el-input
            v-model="ruleForm2.code"
            placeholder="验证码"
            maxlength="6"
            @input="e => (ruleForm2.code = validNumber(e))"
            style="width:260px"
          ></el-input>
          <el-button
            style="width:120px;background-color:#2ab8b3;color:#fff;border:0"
            @click="getCodes"
          >{{ count1 == 60 ? "获取验证码" : "重新获取(" + count1 + ")" }}</el-button>
        </el-form-item>
        <el-form-item>
          <p style="color:#2ab8b3;">提示:验证短信可能会有些延迟,请耐心等待。</p>
        </el-form-item>
        <el-form-item>
          <el-button
            style="background-color:#2ab8b3;color:#fff;height:49px;width:354px"
            @click="submitForms('ruleForm')"
          >立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="articles">
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
        //   console.log(reg.test(value));
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
      labelPosition: "right",
      ruleForm2: {
        phone: "",
        code: "",
        password: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      codes: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      },
      count1: 60,
      t: null,
      t1: null
    };
  },
  methods: {
    submitForms(formName) {
      let formData = this.ruleForm2;
      let data = {
        mobile: formData.phone,
        password: formData.pass,
        code: formData.code
      };

      this.$post("/user/register", data).then(res => {
        if (res.code == "5000") {
          sessionStorage.setItem("userid", res.data);
          sessionStorage.setItem("registerPhone", formData.phone);
          sessionStorage.setItem("registerPassword", formData.pass);
          this.$router.push({ path: "/teacherRegister" });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getAuthCodes() {
      if (this.count1 == 60) {
        this.count1--;
        this.t1 = setInterval(res => {
          this.count1--;
          if (this.count1 == 0) {
            this.count1 = 60;
            clearInterval(this.t1);
          }
        }, 1000);

        let phones = this.ruleForm2.phone;
        console.log(phones);
        this.$get("/user/GetVerificationCode", {
          mobile: phones
        }).then(res => {
          if (res.code == "5000") {
            //console.log(res);
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
    //获取验证码
    getCodes(formName) {
      if (
        this.ruleForm2.phone &&
        this.ruleForm2.pass &&
        this.ruleForm2.checkPass != ""
      ) {
        this.getAuthCodes();
      }
      this.$refs.ruleForm2.validateField("phone", validMessage => {
        if (!validMessage) {
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  .heard {
    background-color: #0f8c83;
    width: 100%;
    height: 66px;
    margin-bottom: 100px;
    img {
      margin-left: 310px;
      margin-top: 7px;
    }
  }
  .phoneBox {
    width: 608px;
    height: 550px;
    background-color: #fff;
    margin: 0 auto;
    padding: 100px 60px;
    box-sizing: border-box;
  }
  .articles {
    margin-top: 130px;
    background-color: #0f8c83;

    color: #fff;
  }
}
</style>