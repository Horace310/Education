<template>
  <div class="personalInfo bf bx mt72">
    <!-- <div class="personalInfo-con bx">
          <p class="tit ft18 col39a" style="color:#f25c29">头像名字修改</p>
          <div class="header flexcenter flexbox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
              <el-form-item label="" prop="icon">
                <input style="position:absolute;opacity:0;width: 80px;height: 80px;" @change="uploadimg($event)" type="file"
                       name="file" id="Album_img" accept="image/gif,image/jpeg,image/x-png"/>
                <el-avatar :size="80" :src="ruleForm.icon"   >
                  <img :src="ruleForm.icon" alt=""  style="width:80px;object-fit: cover;">
                </el-avatar>
              </el-form-item>
              <el-form-item label="" prop="name">
                <div class="name flex">
                  <el-input
                    placeholder="请输入名字"
                    v-model="ruleForm.name"
                    clearable>
                  </el-input>
                </div>
               
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:#f25c29;color:#fff;border:none">确定修改</el-button>
                 <div class="personId" >
                  <span class="ID" style="font-size:18px;color:#f25c29;display:block;margin-top:15px">个人ID</span>
                  <el-input
                    placeholder="请输入名字"
                    v-model="identity"
                    :disabled="true"
                    clearable>
                  </el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="login_coninfo bxs"  v-if="identity!='null'">
            <p class="tit ft18 col39a" style="color:#f25c29">完善信息修改</p>
            <div class="con submit-test-dialog" >
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0"
                       class="demo-ruleForm">
                <el-form-item label="" prop="areaCode" class="bj" >
                  <el-input v-model.number="ruleForm2.areaCode" clearable placeholder="区号" ></el-input>
                </el-form-item>

                <el-form-item label="" prop="schooleName" class="pas_icon">
                  <el-input v-model.number="ruleForm2.schooleName" clearable placeholder="请输入学校或机构简称" ></el-input>
                </el-form-item>
                <div class="two">
                  <el-form-item label="" prop="firstName" class="pas_icon">
                    <el-input v-model="ruleForm2.firstName" clearable placeholder="请输入您的姓氏" ></el-input>
                  </el-form-item>
                  <el-form-item label="" prop="ids" class="pas_icon">
                    <el-input v-model.number="ruleForm2.ids" clearable maxlength="2" @input="e=>ruleForm2.ids=validNumber(e)" placeholder="请输入两位数字"></el-input>
                  </el-form-item>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForms('ruleForm2')"  style="background-color:#f25c29;color:#fff;border:none">确定修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
    </div>-->
    <div class="personalInfo-con bxs">
      <div class="bxLeft">
        <div class="infoImgBox">
          <img src="../../../../static/images/个人信息.png" alt />
        </div>
        <p style="margin-top:40px">
          <span>学生编码:</span>
          &nbsp;&nbsp;
          <span>{{studentObject.code}}</span>
        </p>
        <p>
          <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>&nbsp;&nbsp;&nbsp;
          <span>{{studentObject.username}}</span>
        </p>
        <p>
          <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校:</span>&nbsp;&nbsp;&nbsp;
          <span>{{studentObject.school}}</span>
        </p>
        <p>
          <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>&nbsp;&nbsp;&nbsp;
          <span v-if="studentObject.sex==1">男</span>
          <span v-if="studentObject.sex==2">女</span>
        </p>
        <p>
          <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;段:</span>
          &nbsp;&nbsp;&nbsp;
          <span v-if="studentObject.periodId==1">小学</span>
          <span v-if="studentObject.periodId==2">初中</span>
          <span v-if="studentObject.periodId==3">高中</span>
        </p>
        <div class="changeBtn">
          <el-button
            size="mini"
            style="background-color:rgb(255, 138, 0);color:#fff;border:0;"
            @click="changeIndex=true"
            type="primary"
          >修改</el-button>
        </div>
        <!-- <p>
          <span>身份证号:</span>
          &nbsp;&nbsp;&nbsp;
          <span>{{studentObject.identityCard}}</span>
        </p>
        <p>
        <span>政治面貌:</span>-->
        <!-- poloti: [
        { id: 1, name: "群众" },
        { id: 2, name: "党员" },
        { id: 3, name: "团员" }
        ],-->
        <!-- &nbsp;&nbsp;&nbsp;
          <span>{{studentObject.politicsFace==1?"群众":studentObject.politicsFace==2?"党员":studentObject.politicsFace==3?"团员":"未知：参数"+studentObject.politicsFace}}</span>
        </p>-->
      </div>
      <div class="bxRight" v-if="changeIndex">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width class="demo-ruleForm">
          <el-form-item label prop="icon">
            <!-- <el-upload
            action
            :http-request="fnUploadRequest"
            :show-file-list="true"
            :limit="1"
            :on-exceed="beyondFile"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
          >
            <span class="buttomStyle">上传视频</span>
            </el-upload>-->
            <input
              style="position:absolute;opacity:0;width: 80px;height: 80px;"
              @change="uploadimg($event)"
              type="file"
              name="file"
              id="Album_img"
              accept="image/gif, image/jpeg, image/x-png"
            />
            <el-avatar :size="80" :src="ruleForm.icon">
              <img :src="ruleForm.icon" alt style="width:80px" />
            </el-avatar>
          </el-form-item>
          <!-- <el-form-item>
            <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;段:</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="姓名：">
            <el-input v-model="studentForm.username" class="schoolName"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio v-model="studentForm.sex" :label="1">男</el-radio>
            <el-radio v-model="studentForm.sex" :label="2">女</el-radio>
          </el-form-item>
          <!-- <el-form-item>
            <span>政治面貌:</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级:</span>
            <el-input v-model="schooleName" class="schoolName"></el-input>
          </el-form-item>
          <el-form-item>
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</span>
            <el-input v-model="schooleName" class="schoolName" disabled></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button
              size="mini"
              @click="sumbitForm"
              style="background-color:#ff8a00;color:#fff;border:0"
            >确定</el-button>
            <el-button @click="changeIndex=false" size="mini" type="danger">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import oss from "../../../../static/js/aliOss";
export default {
  name: "personalInfo",
  inject: ["reload"],
  data() {
    return {
      studentForm: {
        username: "",
        sex: ""
      },
      studentObject: {},
      changeIndex: false,
      schooleName: "",
      identity: sessionStorage.getItem("identity"),
      detailInfo: [],
      fit: "cover",
      ruleForm: {
        name: sessionStorage.getItem("name"),
        icon: sessionStorage.getItem("icon")
      },
      options: [
        {
          value: "选项1",
          label: "初中"
        },
        {
          value: "选项2",
          label: "高中"
        }
      ],
      value: "",
      ruleForm2: {
        period: "",
        subject: "",
        areaCode: "",
        schooleName: "",
        ids: "",
        firstName: ""
      },
      timenum1: 0,
      statetype: false,
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        icon: [{ required: true, message: "请上传头像", trigger: "change" }]
      },
      rules2: {
        period: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        areaCode: [{ required: true, message: "请选择区号" }],
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
      }
    };
  },
  created() {
    //  console.log(this.ruleForm.icon);
    this.getPersonCode();
    this.queryUserDetailInfo(); //获取注册信息
    this.$store.state.myhownav = "3"; //头部导航
    if (sessionStorage.getItem("wxcode")) {
      this.ruleForm.icon = sessionStorage.getItem("wxicon");
      this.ruleForm.icon = sessionStorage.getItem("wxusername");
    } else {
      // this.ruleForm.icon = sessionStorage.getItem("icon");
      // this.ruleForm.icon = sessionStorage.getItem("name");
    }
  },
  methods: {
    sumbitForm() {
      let data = {
        userName: this.studentForm.username,
        sex: this.studentForm.sex
      };
      this.$get("/user/modify/info/", data).then(res => {
        if (res.code == "5000") {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.queryUserDetailInfo();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    async fnUploadRequest(option) {
      oss.ossUploadFile(option);
    },
    // 视频上传
    beforeUploadVideo(file) {
      //todo
    },
    // 视频上传成功后
    handleVideoSuccess(response, file, fileList) {
      //todo
      console.log(response, file, fileList);
    },
    // 视频添加多个视频文件事件
    beyondFile(files, fileList) {
      //todo
    },
    countDown1() {
      clearInterval(this.time1);
      this.time1 = setInterval(() => {
        this.timenum1 += 1;
        if (this.timenum1 == 80 || this.timenum1 >= 100) {
          clearInterval(this.time1);
        }
      }, 100);
    },
    uploadimg(event) {
      this.updatatype1 = true;
      this.timenum1 = 0;
      this.countDown1();
      var self = this;
      var file = event.target.files[0];
      var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
      var storeAs = "upload-file1/abc";
      var file_name = `${new Date().getTime()}`; //时间戳+文件后缀名
      this.client = new OSS.Wrapper({
        region: "oss-cn-shenzhen",
        secure: true,
        //endpoint: "oss-cn-shenzhen.aliyuncs.com",
        accessKeyId: "TxkBX1VgU792UUVh",
        accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
        bucket: "mixin"
      });
      this.client
        .multipartUpload(file_name, file)
        .then(result => {
          event.target.value = "";
          if (result.res.status == 200 && result.res.statusCode == 200) {
            self.$emit("input", result.res.requestUrls[0]);
            this.file_photourl = result.res.requestUrls[0].split("?")[0];
            //   console.log(this.file_photourl);
            this.$post("/user/changeAvatar", {
              avatar: this.file_photourl
            }).then(res => {
              if (res.code == "5000") {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              }
            });
            this.ruleForm.icon = this.file_photourl;
            sessionStorage.setItem("avatar", this.ruleForm.icon);
            this.timenum1 = 100;
            clearInterval(this.time1);
            // self.$message.success("上传成功");
            // this.addNoteAndUploadWrong();
            this.statetype = true;
          } else {
            self.$message.error("上传失败，请重新上传文件");
            this.statetype = false;
          }
        })
        .catch(function(err) {
          //  console.log(err);
        });
    },
    //获取身份标识码
    getPersonCode() {
      this.$get("/user/code", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        console.log(res);
      });
    },
    //获取注册信息
    queryUserDetailInfo() {
      //       id	是	Long	用户id
      // username	是	String	用户名
      // periodId
      this.$get("/user/detail").then(response => {
        console.log(response);
        if (response.code == "5000") {
          this.studentObject = response.data;
          this.studentForm = Object.assign(this.studentForm, response.data);
          console.log(this.studentForm);
          this.ruleForm.icon = this.studentObject.avatar;
        }
      });
    },
    errorHandler() {
      return true;
    },
    //完善信息
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
          let data = this.ruleForm2;
          let datas = {
            areaCode: data.areaCode,
            schooleName: data.schooleName,
            firstName: data.firstName,
            ids: data.ids
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
              this.reload();
              this.$refs["ruleForm2"].resetFields();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    //头像
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post("/sso/updateIconAndName.do", {
            icon: this.ruleForm.icon,
            username: this.ruleForm.name
          }).then(response => {
            //console.log(response)
            if (response.code == "5000") {
              sessionStorage.setItem("icon", this.ruleForm.icon);
              sessionStorage.setItem("name", this.ruleForm.name);
              this.$message({
                message: "修改成功!",
                type: "success"
              });
              this.reload();
              this.$refs["ruleForm"].resetFields();
            } else {
              this.$message({
                message: response.message,
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
.bxs {
  padding: 44px 0px;
  display: flex;
  justify-content: space-between;
  .changeBtn {
    padding-left: 30%;
    text-align: left;
    margin: 20px;
  }
  .bxLeft {
    display: inline-block;
    width: 483px;
    p {
      text-align: left;
      margin-bottom: 20px;
      margin-left: 100px;
      font-size: 16px;
    }
  }
  .bxRight {
    flex: 1;
    border-left: 1px solid #eee;
    display: inline-block;
    .demo-ruleForm {
      margin-left: 250px;
      width: 400px;
      margin: 0 auto;
      .schoolName {
        width: 217px;
        height: 40px;
      }
    }
  }
}

// .personalInfo{
//   .personalInfo-con{
//     padding: 40px 50px 80px 50px;
//     .header{margin-top:20px;.name{margin-top: -20px;}}
//     .login_coninfo {
//       border-radius: 4px;
//       width: 360px;
//       height: 300px;
//       margin-top: 40px;
//       .h2 {
//         color: #088dff;
//         padding-left: 10px;

//       }
//       .info{
//         margin: 8px 0 0 10px;
//       }
//       .con {
//         margin: 20px 0 40px 0;
//         .link-login{
//           margin-bottom: 22px;
//           .forget{
//           }
//         }
//         .reg{
//           margin-bottom: 22px;
//         }
//         .choose{
//           .album{
//             .name{
//               margin-top: 4px;
//             }

//           }
//         }
//       }
//     }
//   }
// }
</style>
<style>
/* .personalInfo .personalInfo-con .header .el-input {
  width: 190px;
}

.personalInfo .personalInfo-con .two {
  display: flex;
  justify-content: space-between;
}
.personalInfo .personalInfo-con .two .pas_icon {
  width: 46%;
}
.personalInfo .personalInfo-con .el-avatar > img {
  width: 80px;
} */
</style>
