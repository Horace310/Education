<template>
  <div class="login_box">
    <div class="headers clearfix">
      <div class="grid-content logo fl">
        <img src="../../../static/images/logo3.png" alt class="logo-icon" />
      </div>
      <div class="typelist fr"></div>
    </div>
    <div class="login">
      <div class="login-mt72">
        <div class="login_coninfo bxs">
          <h2 class="h2 ft20 fb">完善信息</h2>
          <p class="info col999 ft12">
            {{
              type == 2 ? "尊敬的老师，您好" : "亲爱的同学,您好"
            }}，完善下面信息您可以使用网站核心功能，且为您生成网站身份ID号
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
              <el-form-item label prop="period" class="bj" v-if="type == 2">
                <el-select
                  v-model="ruleForm2.period"
                  placeholder="学段"
                  class="flex"
                >
                  <el-option
                    v-for="(item, i) in sujectList"
                    :key="i"
                    :label="i"
                    :value="i"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label prop="subject" class="bj" v-if="type == 2">
                <el-select
                  v-model="ruleForm2.subject"
                  placeholder="学科"
                  class="flex"
                  @change="getId"
                >
                  <!-- <el-option v-for="(item, i) in sujectList[ruleForm2.period,ruleForm2.subjectId]"  :key="item.subjectName" :label="item.subjectName" :value="item.subjectName" > -->
                  <el-option
                    v-for="(item, i) in sujectList[ruleForm2.period]"
                    :key="item.subjectName"
                    :label="item.subjectName"
                    :value="item.subjectName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label
                prop="userType"
                class="bj"
                hidden="false"
                v-if="false"
              >
                <el-select
                  multiple
                  v-model="ruleForm2.userType"
                  placeholder="用户类别"
                  class="flex"
                >
                  <el-option
                    v-for="(item, i) in typeSelect"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label prop="areaCode" class="bj">
                <el-input
                  v-model="ruleForm2.areaCode"
                  maxlength="4"
                  @input="e => (ruleForm2.areaCode = validNumber(e))"
                  clearable
                  placeholder="区号"
                ></el-input>
              </el-form-item>
              <el-form-item
                label
                prop="schooleName"
                class="pas_icon"
                id="pasicon"
              >
                <input
                  type="text"
                  placeholder="请输入学校或机构简称"
                  v-model="ruleForm2.schooleName"
                  @input="SchoolName"
                  class="textInput"
                />
                <!-- <el-input v-model="ruleForm2.schooleName" @change="SchoolName" @focus="SchoolName"  clearable placeholder="请输入学校或机构简称" ></el-input> -->
                <div class="dialog" v-show="DiaShow">
                  <ul>
                    <li
                      v-for="(item, index) in SchoolNames"
                      :key="index"
                      @click="ShowName(item)"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </el-form-item>
              <div class="two">
                <el-form-item label prop="firstName" class="pas_icon">
                  <el-input
                    v-model="ruleForm2.firstName"
                    clearable
                    placeholder="请输入您的姓氏"
                    maxlength="1"
                  ></el-input>
                </el-form-item>
                <el-form-item label prop="ids" class="pas_icon">
                  <el-input
                    v-model="ruleForm2.ids"
                    clearable
                    maxlength="2"
                    @input="e => (ruleForm2.ids = validNumber(e))"
                    placeholder="请输入两位数字"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')"
                  >确定</el-button
                >
              </el-form-item>
            </el-form>
            <p class="forget link tc ft16 col39a" @click="next">
              {{ type == 2 ? "跳过，进入主页" : "跳过,进入下一步" }}
            </p>
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
      //联想框显示
      DiaShow: false,
      //学校名称
      SchoolNames: [],
      checked: true,
      stundentEducation: "",
      ruleForm2: {
        period: "",
        subject: "",
        areaCode: "",
        schooleName: "",
        ids: "",
        firstName: "",
        subjectId: ""
      },
      way: false,
      sujectList: [],
      typeSelect: [],
      rules2: {
        period: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        areaCode: [
          { required: true, message: "请选择区号" },
          { message: "区号必须为数字值" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        schooleName: [
          { required: true, message: "请输入学校或机构简称", trigger: "blur" }
        ],
        firstName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        ids: [{ required: true, message: "请输入数字", trigger: "blur" }]
      },
      activeIndex: "",
      type: this.$route.query.type
    };
  },
  created() {
    if (this.$route.query.way !== undefined) {
      //   console.log(this.$route.query.way);
      this.way = this.$route.query.way;
    }
    this.stundentEducation = sessionStorage.getItem("education");

    this.querySujectList(); //获取首页学科体系
    this.queryUserTypeSelect(); //获取用户类型下拉列表
  },
  methods: {
    //获取subjectId
    getId(e) {
      this.sujectList[this.ruleForm2.period].map((item, index) => {
        if (item.subjectName == e) {
          var i = item.id;
          this.ruleForm2.subjectId = i;
          this.$store.state.subjectId = i;
        }
      });
    },
    choores(e) {
      //console.log(this.ruleForm2)
    },
    //学校名模糊查询
    SchoolName() {
      let name = this.ruleForm2;
      this.$post("/likework/querySchoolByKeyword.do", {
        keyword: name.schooleName
      }).then(res => {
        if (res.code == "5000") {
          this.SchoolNames = res.data.splice(0, 10);
          //   console.log(this.SchoolNames)
          this.DiaShow = true;
        }
      });
    },
    //点击学校名字
    ShowName(item) {
      this.ruleForm2.schooleName = item;
      this.DiaShow = false;
    },
    //失去焦点事件
    DiaNone() {
      this.DiaShow = false;
    },
    // 进入下一步
    next() {
      if (this.type == 2) {
        this.$router.push({ path: "/homeCommon" });
      } else {
        this.$router.push({ path: "/fillCode", query: { idCard: null } });
      }
    },
    //获取首页学科体系
    querySujectList() {
      this.$post("/likework/querySujectList.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.sujectList = response.data;
        }
      });
    },
    //获取首页学科体系
    queryUserTypeSelect() {
      this.$post("/likework/queryUserTypeSelect.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.typeSelect = response.data;
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
          let data = this.ruleForm2;
          if (this.type == 2) {
            this.$post("/sso/createTeacherId.do", data).then(res => {
              loadingObj.close();
              if (res.code == "5000") {
                this.$message({
                  showClose: true,
                  message: "提交成功!",
                  type: "success"
                });
                this.$store.commit("getID", res.data);
                sessionStorage.setItem("identity", res.data);
                if (this.way === true) {
                  this.Establish();
                  return false;
                }
                this.$router.push({
                  path: "/registerSucceed",
                  query: { idCard: res.data }
                });
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "error"
                });
              }
            });
          } else if (this.type == 1) {
            let datas = {
              areaCode: data.areaCode,
              schooleName: data.schooleName,
              firstName: data.firstName,
              ids: data.ids,
              period: this.stundentEducation
            };
            this.$post("/sso/createStudentId.do", datas).then(res => {
              loadingObj.close();
              if (res.code == "5000") {
                this.$message({
                  message: "提交成功!",
                  type: "success"
                });
                this.$store.commit("getID", res.data);
                sessionStorage.setItem("identity", res.data);
                this.$router.push({
                  path: "/fillCode",
                  query: { idCard: res.data }
                });
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            });
          }
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    // 创建题目
    Establish(e) {
      let data = JSON.parse(sessionStorage.getItem("identityData"));
      this.$post("/likework/createClassHomework.do", data).then(res => {
        if (res.code == "5000") {
          this.$router.push({
            path: "/homeCommon/questions",
            query: {
              homeworkId: res.data,
              title: this.$route.query.title,
              subjectId: this.$route.query.subjectId
            }
          });
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
    background: #eff3f5;
    padding-top: 80px;
    box-sizing: border-box;
    position: relative;
    /*position: relative;*/
    .login_bg {
      /*width: 100%;*/
      height: 702px;
      object-fit: cover;
    }
    .login_coninfo {
      /*position: absolute;*/
      background: #ffffff;
      border-radius: 4px;
      width: 360px;
      height: 536px;
      /*top: 10%;*/
      /*left: 78%;*/
      /*margin-left: -245px;*/
      padding: 20px 40px 0 40px;
      position: relative;
      /*padding-bottom: 130px;*/

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
      .info {
        margin: 8px 0 0 10px;
      }
      .con {
        margin: 20px 0 40px 0;
        .textInput {
          width: 360px;
          text-indent: 15px;
          border-radius: 5px;
          background-color: #f3f3f3;
          border: 1px solid #dcdfe6;
        }
        ::-webkit-input-placeholder {
          color: #b5b5b5;
        }
        #pasicon {
          position: relative;
          .dialog {
            position: absolute;
            // bottom: -100%;
            // left: 40px;
            z-index: 100;
            width: 362px;
            padding: 5px;
            border-radius: 30px;
            background-color: #eee;
            overflow: hidden;
            box-sizing: border-box;
            ul {
              float: left;
              text-align: left;
              margin: 0;
              li {
                padding: 0px;
                border-bottom: 1px dashed #bbb;
              }
            }
          }
        }
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
.login_coninfo .el-form-item__label {
  text-align: left;
}

.login_coninfo .el-button {
  width: 100%;
  height: 50px;
}

.login_coninfo .two {
  display: flex;
  justify-content: space-between;
}
.login_coninfo .two .pas_icon {
  width: 46%;
}

.login_coninfo .link {
  cursor: pointer;
}

.login_coninfo .pas_icon .el-input__inner {
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
.login_coninfo .yzm .el-input__inner {
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
.login_coninfo .yzm .el-input {
  width: 60%;
}
.login_coninfo .bj .el-select {
  width: 100%;
}
.login_coninfo .bj .el-input__inner {
  width: 100%;
  background-color: #f3f3f3;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
}
.login_coninfo .yzm .el-button {
  width: 36%;
  margin-left: 3%;
}
</style>
