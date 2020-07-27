<template>
  <div class="mt72">
    <div class="bigBox">
      <div class="boxLeft">
        <!-- <div class="ingBox" style="margin-top:200px"></div> -->
        <img :src="imgSrc" alt class="myIcon" />
        <p>
          <span>个人编号：</span>
          <span>{{userCode}}</span>
        </p>
        <p>
          <span>姓名：</span>
          <span>{{userName}}</span>
        </p>
        <p>
          性别:
          <el-radio v-model="radio" label="1">{{sex==1?'男':"女"}}</el-radio>
        </p>
        <p>
          <span>学校:</span>
          <span>{{school}}</span>
        </p>
        <p>
          <span>学段:</span>
          <span>{{periodId==1?'小学':(periodId==2?'初中':'高中')}}</span>
        </p>
        <p>
          <span>学科:</span>
          <span>{{subject}}</span>
        </p>
        <div class="changeBtn">
          <el-button
            size="mini"
            style="background-color:#2ab8b3;color:#fff;border:0;"
            @click="changeIndex=true"
            type="primary"
          >修改</el-button>
        </div>
        <!-- <p>
          <span>身份证号码:</span>
          <span>{{identityCard}}</span>
        </p>
        <p>
          <span>年龄:</span>
          <span>{{age}}</span>
        </p>
        <p>
          <span>政治面貌:</span>
          <span>团员</span>
        </p>-->
      </div>
      <div class="boxRight" v-if="changeIndex">
        <!-- <div class="iconBox">
          <img :src="file_photourl" alt />
          <input
            id="updateLoadImage2"
            type="file"
            @change="uploadimg($event)"
            multiple="multiple"
            class="hide"
          />
   
        </div>-->
        <div class="msgBox">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            style="width:45%;padding:20px;padding-left:150px;"
          >
            <el-form-item label prop="icon">
              <input
                style="position:absolute;opacity:0;width: 80px;height: 80px;"
                @change="uploadimg($event)"
                type="file"
                name="file"
                id="Album_img"
                accept="image/gif, image/jpeg, image/x-png"
              />
              <el-avatar :size="80" :src="formLabelAlign.icon">
                <img :src="formLabelAlign.icon" alt style="width:80px" />
              </el-avatar>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="学校：">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>-->
            <el-form-item label="性别：">
              <el-radio v-model="formLabelAlign.radios" :label="1">男</el-radio>
              <el-radio v-model="formLabelAlign.radios" :label="2">女</el-radio>
            </el-form-item>
            <!-- <el-form-item label="学段：">
              <el-select v-model="formLabelAlign.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学科：">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="身份证号码：">
              <el-input v-model="formLabelAlign.id"></el-input>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input v-model="formLabelAlign.age"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌：">
              <el-input v-model="formLabelAlign.proloti"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-button
                size="mini"
                type="primary"
                @click="sumbitForm"
                style="background-color:#2ab8b3;color:#fff;border:0;"
              >提交</el-button>
              <el-button @click="changeIndex=false" size="mini" type="danger">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import oss from "../../../../static/js/aliOss";
export default {
  data() {
    return {
      statetype: false,
      changeIndex: false,
      imageUrl: "",
      userCode: "",

      file_photourl: "",
      timenum1: 0,
      time1: setInterval,
      userName: sessionStorage.getItem("username"),
      radio: "1",
      radios: "2",
      options: [
        { value: "1", label: "小学" },
        { value: "2", label: "初中" },
        { value: "3", label: "高中" }
      ],
      option: [
        { value: "1", label: "语文" },
        { value: "2", label: "数学" },
        { value: "3", label: "英语" }
      ],
      labelPosition: "right",
      value: "",
      formLabelAlign: {
        name: "",
        school: "",
        type: "",
        id: "",
        age: "",
        proloti: "",
        icon: "",
        radios: "",
        value: ""
      },
      identityCard: "", //身份证
      school: "", //学校
      age: "", //年龄
      sex: 0, //性别
      periodId: 0, //学段
      subject: "",
      imgSrc: sessionStorage.getItem("avatar") //头像
    };
  },
  created() {
    this.getUser();
    this.formLabelAlign.icon = this.imgSrc;
  },
  methods: {
    sumbitForm() {
      let data = {
        userName: this.formLabelAlign.name,
        sex: this.formLabelAlign.radios
      };
      this.$get("/user/modify/info/", data).then(res => {
        if (res.code == "5000") {
          sessionStorage.setItem("username", data.userName);
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.getUser();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    discriCard(UUserCard) {
      //获取年龄
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
      if (
        UUserCard.substring(10, 12) < month ||
        (UUserCard.substring(10, 12) == month &&
          UUserCard.substring(12, 14) <= day)
      ) {
        age++;
      }
      return age;
    },
    //获取身份详情
    getUser() {
      this.$get("/user/detail").then(res => {
        //  console.log(res.data);
        // this.identityCard = res.data.identityCard;
        // this.identityCard = this.identityCard.substring(0, 11) + "******";
        this.school = res.data.school;
        this.age = res.data.age;
        this.sex = res.data.sex;
        this.subject = res.data.subject;
        this.periodId = res.data.periodId;
        this.userCode = res.data.code;
        this.userName = res.data.username;
        //判断age
        this.age = this.discriCard(this.identityCard);
        this.formLabelAlign.name = res.data.username;
        this.formLabelAlign.region = res.data.school;
        this.formLabelAlign.age = this.age;
        this.formLabelAlign.radios = this.sex;
        this.formLabelAlign.id = this.identityCard;
      });
    },
    countDown1() {
      clearInterval(this.time1);
      this.time1 = setInterval(() => {
        this.timenum1 += 1;
        if (this.timenum == 80 || this.timenum1 >= 100) {
          clearInterval(this.time1);
        }
        //    console.log(this.timenum1);
      }, 100);
    },
    uploadimg(event) {
      console.log(event);
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
            this.formLabelAlign.icon = this.file_photourl;
            sessionStorage.setItem("avatar", this.formLabelAlign.icon);
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
    }
  }
};
</script>
<style lang="less" scoped>
.bigBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .boxLeft {
    width: 484px;
    .changeBtn {
      padding-left: 30%;
      text-align: left;
      margin: 20px;
    }
    .myIcon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-left: 40%;
      margin-top: 20px;
    }
    img {
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      padding-left: 30%;
      text-align: left;
      margin: 20px;
    }
  }
  .boxRight {
    border-left: 1px solid #eee;
    flex: 1;
    .iconBox {
      text-align: center;
      padding-top: 15px;
      width: 180px;
      height: 180px;
      margin: 0 auto;
      position: relative;
      margin-bottom: 20px;
      img {
        margin-top: 20px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #eee;
      }
      input {
        position: absolute;
        bottom: 15%;
        left: 15%;
      }
      button {
        position: absolute;
        bottom: 0;
        left: 35%;
      }
    }
  }
}
</style>