<template>
  <div class="login_box">
    <div class="headers clearfix">
      <div class="grid-content logo fl">
        <img src="../../../static/images/logo.png" alt="" class="logo-icon" />
      </div>
      <div class="typelist fr"></div>
    </div>
    <div class="login">
      <!--      <img src="/static/images/login_bg.jpg" alt="" class="login_bg">-->
      <div class="login-mt72">
        <div class="login_concode bxs">
          <h2 class="h2  ft20 fb">填写班级邀请码申请加入班级</h2>
          <p class="forget  tc  col39a title" v-if="idCard === null">
            您的网站身份ID为：{{ idCard }}（也可用此号登录）
          </p>

          <div class="con submit-test-dialog">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item label="" prop="code" class="pas_icon">
                <el-input
                  v-model.number="ruleForm2.code"
                  placeholder="请输入班级邀请码"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')"
                  >确定</el-button
                >
              </el-form-item>
            </el-form>
            <!--          <div class="link-login">-->
            <p class="forget  tc ft16 col39a cp" @click="stuhome">
              跳过，进入主页
            </p>
            <!--          </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <Articles></Articles>
    </div>
    <p class="copyright tc">
      <Footers></Footers>
    </p>
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
    return {
      checked: true,
      idCard: this.$route.query.idCard,
      ruleForm2: {
        code: ""
      },
      rules2: {
        code: [{ required: true, message: "请输入班级邀请码", trigger: "blur" }]
      },
      activeIndex: ""
    };
  },
  methods: {
    stuhome() {
      this.$router.push({
        path: "/studentCommon"
      });
    },
    submitForm(formName) {
      let data = this.ruleForm2;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          this.$post("/likework/joinClassByCode.do", data).then(res => {
            loadingObj.close();
            // console.log(res);
            if (res.code == "5000") {
              this.$message({
                showClose: true,
                message: "加入成功!",
                type: "success"
              });
              this.$router.push({
                path: "/checkCode",
                query: {
                  code: data.code,
                  className: res.data.name,
                  attribute: res.data.gradeName + res.data.subjectName,
                  createTime: res.data.createTime
                }
              });
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: "error"
              });
            }
          });
        } else {
          //  console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login_box {
  overflow-x: hidden;
  .login {
    width: 100%;
    height: 702px;
    /*position: relative;*/
    background: #eff3f5;
    padding-top: 180px;
    box-sizing: border-box;
    .login_bg {
      /*width: 100%;*/
      height: 702px;
      object-fit: cover;
    }
    .login_concode {
      /*position: absolute;*/
      background: #ffffff;
      border-radius: 4px;
      width: 360px;
      // height: 104px;
      /*top: 34%;*/
      /*left: 78%;*/
      /*margin-left: -245px;*/
      padding: 20px 40px;
      // padding-bottom: 130px;

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
      .title {
        margin-top: 20px;
      }
      .info {
        margin: 8px 0 0 10px;
      }
      .con {
        margin: 20px 0 40px 0;
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
.headers {
  width: 1300px;
  height: 104px;
  margin: 0 auto 0 auto;

  .logo {
    width: 149px;
    height: 63px;
    margin-top: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .typelist {
    margin-top: 34px;
  }
}
</style>
<style>
.login_concode .el-form-item__label {
  text-align: left;
}

.login_concode .el-button {
  width: 100%;
  height: 50px;
}

.login_concode .pas_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
  outline: 0;
  padding: 0 8px 0 20px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_concode .yzm .el-input__inner {
  width: 100%;
  -webkit-appearance: none;
  background-color: #f3f3f3;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
  outline: 0;
  text-align: center;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_concode .yzm .el-input {
  width: 60%;
}
.login_concode .bj .el-select {
  width: 100%;
}
.login_concode .bj .el-input__inner {
  width: 100%;
  background-color: #f3f3f3;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
}
.login_concode .yzm .el-button {
  width: 36%;
  margin-left: 3%;
}
</style>
