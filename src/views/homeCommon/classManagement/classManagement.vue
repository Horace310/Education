<template>
  <div>
    <div class="classManagement mt72">
      <el-row :gutter="24">
        <el-col :span="9" style="padding-left:0px">
          <div class="grid-content bg-purple cp" @click="createClass">
            <p class="add">+</p>
            <p class="newClass">创建新班级</p>
          </div>
          <div class="researchCode">
            <el-input class="resCode" placeholder="请输入邀请码" v-model="code"></el-input>
            <el-button size="small" class="addRes" @click="addResearch">加入班级</el-button>
          </div>
        </el-col>

        <el-col :span="15" style="border-left:1px solid #eee;padding-left:0">
          <div class="nowBox" v-if="list1.length>0">
            <div class="title">
              <p class="nowClass">当前执教班级</p>
            </div>

            <div class="myBox" @click="studentList(item.id)" v-for="(item, i) in list1" :key="i">
              <div class="litleBox">
                <i
                  style="float:right;cursor:pointer"
                  @click.stop="deleteJy(item)"
                  class="el-icon-close"
                ></i>
                <p class="xueke">
                  <span>{{ item.name?item.name:'' }}</span>
                </p>
                <p class="myTearch">
                  创建者：
                  <span>{{ item.creatorUsername }}老师</span>
                </p>
                <div class="myTearchBox">
                  <div class="myTearchLeft">学科教师：</div>
                  <div class="myTearchRight">
                    <span>{{ item.subjectName }}科、{{ item.username }}老师</span>
                  </div>
                </div>
                <p class="yqCode" style="margin-top:10px">班级ID:{{ item.id }}</p>
                <p class="yqCode">邀请码:{{ item.code }}</p>
                <p>创建时间:{{ item.createTime }}</p>
              </div>
            </div>
          </div>
          <div class="nowBox" v-if="list2.length>0">
            <div class="title">
              <p class="nowClass">当前加入班级</p>
            </div>

            <div class="myBox" @click="studentList3(item.id)" v-for="(item, i) in list2" :key="i">
              <div class="litleBox">
                <p class="xueke">
                  <span>{{ item.name?item.name:'' }}</span>
                </p>
                <p class="myTearch">
                  创建者：
                  <span>{{ item.creatorUsername }}老师</span>
                </p>
                <div class="myTearchBox">
                  <div class="myTearchLeft">学科教师：</div>
                  <div class="myTearchRight">
                    <span>{{ item.subjectName }}科、{{ item.username }}老师</span>
                  </div>
                </div>
                <p class="yqCode" style="margin-top:10px">班级ID:{{ item.id }}</p>
                <p class="yqCode">邀请码:{{ item.code }}</p>
                <p>创建时间:{{ item.createTime }}</p>
              </div>
            </div>
          </div>
          <div class="nowBox" v-if="list3.length>0">
            <div class="title">
              <p class="nowClass">曾经执教班级</p>
            </div>

            <div class="myBox" @click="studentList2(item.id,)" v-for="(item, i) in list3" :key="i">
              <div class="litleBox">
                <p class="xueke">
                  <span>{{ item.name?item.name:'' }}</span>
                </p>
                <p class="myTearch">
                  创建者：
                  <span>{{ item.creatorUsername }}老师</span>
                </p>
                <div class="myTearchBox">
                  <div class="myTearchLeft">学科教师：</div>
                  <div class="myTearchRight">
                    <span>{{ item.subjectName }}科、{{ item.username }}老师</span>
                  </div>
                </div>
                <p class="yqCode" style="margin-top:10px">班级ID:{{ item.id }}</p>
                <p class="yqCode">邀请码:{{ item.code }}</p>
                <p>创建时间:{{ item.createTime }}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      class="articles"
      style="margin-top: 100px;
      background-color: #0f8c83;
      width: 100%;
      color: #fff;position: fixed;
      bottom: 0;"
    ></div>
    <!-- <p class="copyright tc">
      <Footers></Footers>
    </p>-->
  </div>
</template>

<script>
import Footers from "../../../components/common/footers";
export default {
  name: "classManagements",
  components: { Footers },
  data() {
    return {
      dd: "",
      code: "",
      show: false,
      classList: [],
      boxList: [1, 1, 1, 1],
      classIcon: sessionStorage.getItem("icon"),
      list1: [],
      list2: [],
      list3: [],
      flag1: false,
      flag2: false,
      flag3: false
    };
  },
  created() {
    //获取创建的班级列表
    this.getclassList();
    this.getInfoClass();
    this.getoldInfoClass();
  },
  methods: {
    deleteJy(value) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("/user/classes/deleteClass", { id: value.id }).then(res => {
          if (res.code == 5000) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getclassList();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    //加入班级管理，邀请码
    addResearch() {
      let data = {
        code: this.code,
        subjectId: sessionStorage.getItem("subjectId"),
        userId: sessionStorage.getItem("userId"),
        img: sessionStorage.getItem("avatar")
      };
      this.$post("/user/classes/addTeacher", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "加入成功" });
          this.getclassList();
          this.getInfoClass();
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },

    getInfoClass() {
      this.$post("/user/classes/findByJoinId", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          this.list2 = res.data.filter(i => i != null);
          if (this.list2.length != 0) {
            this.flag2 = true;
          } else {
            this.flag2 = false;
          }
        }
      });
    },
    getoldInfoClass() {
      this.$axios({
        url: "http://data.ikeshen.com/class/classes/exit",
        method: "post",
        params: { userId: sessionStorage.getItem("userId") }
      }).then(response => {
        if (response.data.code == "5000") {
          if (response.data.data.length != 0) {
            this.list3 = response.data.data.filter(item => item != null);
          }
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    //获取班级列表
    getclassList() {
      let data = { userId: sessionStorage.getItem("userId") };
      this.$post("/user/classes/query", data).then(res => {
        if (res.code == "5000") {
          console.log(res.data, "获取班级列表");

          this.classList = res.data;
          var list1 = [];
          var list2 = [];
          var list3 = [];
          res.data.forEach(element => {
            if (element.creator == 0) {
              list1.push(element);
            }
          });
          this.list1 = list1;
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },

    //获取创建的班级列表
    queryCreateClass() {
      this.$post("/likework/queryCreateClass.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.classList = response.data;
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    createClass() {
      this.$router.push({
        path: "/homeCommon/classManagement/createClass"
      });
    },
    studentList(id) {
      this.$router.push({
        path: "/homeCommon/classManagement/studentList",
        query: { id: id, isCreate: true }
      });
    },
    studentList3(id) {
      this.$router.push({
        path: "/homeCommon/classManagement/studentList",
        query: { id: id, flag: 0, flag2: 0 }
      });
    },
    studentList2(id) {
      this.$router.push({
        path: "/homeCommon/classManagement/studentList",
        query: { id: id, flag: 0 }
      });
    },
    deleteClass(item, i) {
      //  console.log(111)
      let data = {
        classId: item.id
      };
      this.$confirm("是否删除此班级", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("/likework/deleteClass.do", data).then(res => {
          if (res.code == "5000") {
            this.$message.success("删除成功!");
            this.classList.splice(i, 1);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.researchCode {
  margin-left: 50px;
  margin-top: 35px;
  width: 270px;
  height: 149px;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 5px 5px 0px 0px #eee, 5px 5px 0px 0px #eee;
  .resCode {
    margin-top: 50px;
    width: 200px;
    margin-left: 38px;
  }
  .addRes {
    margin-left: 110px;
    margin-top: 10px;
    border: 0;
    background-color: #2ab8b3;
    color: #fff;
  }
}
.classManagement {
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  .myClass {
    height: 40px;
    background-color: #f8f8f8;
    .my-i {
      color: #f25c29;
      font-size: 22px;
      font-weight: bold;
      line-height: 67px;
    }
    span {
      line-height: 67px;
      font-size: 20px;
    }
  }
  .content {
    // background: url("../../../../static/images/class_bgimg.jpg") no-repeat;
    // background: url("../../../../static/images/class_bgimg.jpg") ;
    background-color: #fff;
    height: 180px;
    text-align: center;
    padding-top: 28px;
    width: 100%;
    max-width: 270px;
    margin-top: 40px;
    position: relative;
    border-radius: 20px;
    .iconfont {
      position: absolute;
      width: 25px;
      height: 25px;
      right: 10px;
      top: 20px;
      font-size: 22px;
      display: none;
    }
    .img-icon {
      width: 65px;
      height: 65px;
      position: absolute;
      left: 10px;
      top: 80px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .iconfont:hover {
      color: #2592e7;
    }
    .name {
      font-size: 20px;
      position: relative;
      margin: 14px auto 0 auto;
      height: 34px;
    }
    .invitationCode {
      color: #b6b6b6;
      //   margin: 14px 0 0 0;
      margin-left: 25px;
    }
    .time {
      color: #b6b6b6;
      font-size: 12px;
      margin-left: 23px;
    }
  }
  .content:hover {
    .iconfont {
      display: block;
    }
  }
}

.nowBox {
  width: 100%;
  height: 100%;

  .title {
    height: 35px;
    background-color: #c7ebe7;
    .nowClass {
      margin-left: 20px;
      line-height: 35px;
      font-size: 18px;
    }
  }
  .myBox {
    display: inline-block;
    width: 50%;
    padding: 30px;
    box-sizing: border-box;
    overflow: auto;
    .litleBox {
      width: 269px;
      height: 174px;
      border: 1px solid #c7ebe7;
      box-shadow: 10px 15px 0px 0px #d9f2ef, 15px 10px 0px 0px #d9f2ef;
      padding: 12px 20px;
      border-radius: 15px;
      .xueke {
        border-bottom: 1px solid #d9f2ef;
        padding-bottom: 5px;
        font-size: 18px;
      }
      .myTearch {
        font-size: 16px;
        padding: 5px 0px;
      }
      .yqCode {
        //padding-top: 5px;
      }
      .myTearchBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d9f2ef;
        padding-bottom: 5px;
        .myTearchLeft {
          width: 30%;
          font-size: 16px;
        }
        .myTearchRight {
          width: 70%;
          span {
            float: left;
          }
        }
      }
    }
  }
}

.bg-purple {
  //  background: url("../../../../static/images/add_class2.jpg") no-repeat;
  // height: 151px;
  text-align: center;
  //  padding-top: 28px;
  height: 180px;
  width: 100%;
  max-width: 270px;
  margin-left: 50px;
  border: 1px solid #eee;
  margin-top: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 0px 0px #eee, 5px 5px 0px 0px #eee;
  .add {
    font-size: 80px;
    color: #f25c29;
    font-weight: normal;
  }
  .newClass {
    color: #b6b6b6;
  }
  // background: url(../../../../static/images/add_class2.jpg);
}
.model_title {
  width: 100%;
  text-align: center;
  position: relative;
  word-break: keep-all;
  white-space: nowrap;
  overflow: auto;
  text-overflow: ellipsis;
  border-bottom: 1px solid #eee;
  .title {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
    .tits {
      float: left;
      position: absolute;
      left: -110px;
      top: -18px;
      color: black;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%;-50%);
    }
    .icon_l {
      position: absolute;
      width: 25px;
      height: 8px;
      right: -25px;
      top: 6px;
      background: url("../../../../static/images/icon_r.png") right center
        no-repeat;
      display: inline-block;
    }
    .icon_r {
      position: absolute;
      width: 25px;
      height: 8px;
      left: -25px;
      top: 6px;
      background: url("../../../../static/images/icon_l.png") left center
        no-repeat;
      display: inline-block;
    }
  }
}

.name {
  width: 100%;
  text-align: center;
  position: relative;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .names {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .right-arrow {
    position: absolute;
    width: 9px;
    height: 17px;
    right: -9px;
    top: 6px;
    // background: url("../../../../static/images/arrow_r.png") right center
    //   no-repeat;
    display: inline-block;
  }
}
.articles {
}
</style>
