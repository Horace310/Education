<template>
  <div class="studentList mt72">
    <createTeach :dia="dia" />
    <div class="navTop">
      <div class="classBox">
        <div style="display:flex;justify-content:space-between;width:380px;padding:13px">
          <p
            @click="dia=true"
            style="box-shadow: 5px 5px 5px #C0C0C0;cursor:pointer;font-size:18px;border-radius:20px;border:1px solid #F2F2F2;width:130px;display:flex;align-items:center;justify-content:center;background:#F2F2F2"
          >
            <span style="font-size:31px;font-weight:600;color:#2DB6B3;margin-right:5px">+</span>
            <span>创建教研组</span>
          </p>
          <p
            style="box-shadow: 5px 5px 5px #C0C0C0;padding:9px 8px 9px 8px;cursor:pointer;font-size:18px;border-radius:20px;border:1px solid #F2F2F2;width:200px;display:flex;align-items:center;justify-content:center;background:#F2F2F2"
          >
            <el-input
              v-model="addCode"
              size="mini"
              placeholder="请输入邀请码"
              style="width:110px;margin-right:5px"
            ></el-input>
            <el-button
              size="mini"
              @click="addResearch"
              style="background:rgb(42, 184, 179);color:white"
            >加入教研</el-button>
          </p>
        </div>
        <div style="padding:13px">
          <div v-if="classList.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>创建的教研组</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in classList"
                :key="index"
                :class="classActive==i.id?'classStyle classActive':'classStyle'"
                @click="selectClass(i)"
              >
                <i
                  @click.stop="deleteJy(i)"
                  v-if="classActive==i.id"
                  class="el-icon-close"
                  style="position:absolute;right:2px;top:2px;font-size:13px;cursor:pointer"
                ></i>
                <span>{{ i.name?i.name:'' }}</span>
              </p>
            </div>
          </div>
          <div v-if="into.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>加入的教研组</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in into"
                :key="index"
                :class="classActive==i.id?'classStyle classActive':'classStyle'"
                @click="selectClass(i)"
              >
                <span>{{ i.name?i.name:'' }}</span>
              </p>
            </div>
          </div>
          <div v-if="classList3.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>以往的教研组</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in classList3"
                :key="index"
                :class="classActive==i.id?'classStyle classActive':'classStyle'"
                @click="selectClass(i)"
              >
                <span>{{ i.name?i.name:'' }}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="researchId">
          <div class="heard">
            <img src="../../../../static/images/教研组信息.png" alt />
          </div>
          <div class="msgBox">
            <div class="msgList">
              <span>教研组名称：</span>
              <el-input class="className" v-model="researchName"></el-input>
            </div>
            <div class="msgList">
              <span>学科：</span>
              <el-input class="className" v-model="gradeName"></el-input>
            </div>
            <div class="msgList">
              <span>邀请码：</span>
              <el-input class="className" v-model="code"></el-input>
            </div>
            <div class="msgList">
              <span>创建者：</span>
              <el-input class="className" v-model="username"></el-input>
            </div>
            <div class="msgList">
              <span>学段：</span>
              <!-- <el-input class="className" v-model="item.name"></el-input> -->
              <p
                style="display:inline-block;width:200px;height:37px;border:1px solid #DCDFE6;border-radius:3px; box-sizing: border-box;padding:10px;text-align:left"
              >
                <!-- {{
              gradeName
                }}、-->
                {{grade}}
              </p>
            </div>
            <div class="msgList">
              <span>创建时间：</span>
              <el-input class="className" v-model="createTime"></el-input>
            </div>
          </div>
          <div class="mybtns">
            <el-button
              class="btns"
              style="background-color:#ff8b00;border:0;color:#fff"
              @click="changeClassName"
              v-if="istype==0"
            >修改</el-button>
            <el-button
              class="btns"
              style="background-color:#2ab8b3;border:0;color:#fff"
              @click="changeBox=true"
              v-if="istype==0"
            >转让教研组</el-button>
            <!-- <el-button
            class="btns"
            style="background-color:#ff8b00;border:0;color:#fff"
            @click="deleteResearch"
            >退出教研组</el-button>-->
            <el-button
              class="btns"
              style="background-color:#1688f2;border:0;color:#fff"
              @click="tohomeworkResearch"
              v-if="istype!=2"
            >进入作业教研</el-button>
            <el-button
              v-if="istype!=2"
              class="btns"
              style="background-color:#1688f2;border:0;color:#fff"
              @click="outfun"
            >退出教研组</el-button>
          </div>
        </div>
        <div class="seleteBox" v-if="changeBox">
          <span style="font-size:18px">交接人员:</span>
          <el-select v-model="value" placeholder="请选择交接人员" @change="submitP">
            <el-option
              v-for="item in imgList"
              :key="item.id"
              :label="item.username"
              :value="item.userId"
            ></el-option>
          </el-select>
          <div class="seleteBtn" style="margin-top:30px">
            <el-button @click="changeBox=false">取消</el-button>
            <el-button style="background-color:#ff8b00;border:0;color:#fff" @click="changerClass">确定</el-button>
          </div>
        </div>
      </div>
      <div class="listBox" v-if="researchId">
        <div class="imgBox">
          <img src="../../../../static/images/教研组成员 .png" alt />
        </div>
        <div class="anserBox" v-if="istype==0">
          <span class="text" style="font-size:16px">允许学科老师加入</span>
          <el-radio v-model="radio" :label="0">是</el-radio>
          <el-radio v-model="radio" :label="1">否</el-radio>
        </div>
        <div class="listStundent">
          <div class="listOne">
            <p class="title">
              <span class="text" style="color:#fff;padding:5px">成员列表</span>
            </p>
            <div class="listImgBox" v-for="(item, index) in imgList" :key="index">
              <i
                v-if="istype==0"
                @click="deleteStudent(item.id)"
                style="position:absolute;right:10px;top:10px;cursor:pointer"
                class="el-icon-delete"
              ></i>
              <div class="deleteBox">
                <img :src="item.img" @mousemove="onMousteIn(index)" @mouseleave="onMousteOut()" />
                <span>{{ item.username }}</span>

                <div class="showBox" v-show="seen && index == current">
                  <p>姓名:{{ item.username }}</p>
                  <p>ID号:{{item.userId}}</p>
                  <p>访问时间：1天前</p>
                  <p>访问次数：12次</p>
                </div>
              </div>
            </div>
            <p class="title" style="margin-top:20px">
              <span style="color:#fff;padding:5px">成员分组</span>
              <span class="btnRight" v-if="istype==0">
                <el-button
                  class="elbtn"
                  size="small"
                  style="background-color:#2ab8b3"
                  @click="addteam"
                >+新增分组</el-button>
                <!-- <el-button class="elbtn" size="small" style="background-color:#ff8a05">编辑分组</el-button> -->
                <el-button
                  class="elbtn"
                  size="small"
                  style="background-color:#ff8a05"
                  @click="changeList"
                >调整分组</el-button>
              </span>
            </p>

            <div class="Grouping">
              <div class="GroupingList" v-for="(item, index) in studentListItem" :key="index">
                <div class="GroupingLeft">
                  <div>
                    <p style="margin-top:40px">{{ item.groupName }}（{{item.count}}人）</p>
                    <span
                      style="padding:5px;background-color:#ccece7;color:#56ac9e;cursor:pointer"
                      @click="editBox(item.groupId)"
                    >删除</span>
                  </div>

                  <div class="GroupingRight">
                    <div class="rightImgBox" v-for="(ites, inx) in item.children" :key="inx">
                      <img :src="ites.img" alt />
                      <span>{{ ites.username }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mymsk" v-if="Noedit">
        <div class="mybox">
          <transfer></transfer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import transfer from "../../../components/grade/MyTransfers";
import Utils from "../../../../static/js/util";
import goBack from "../../../components/common/goBack";
import createTeach from "./createTeach";
export default {
  inject: ["reload"],
  components: {
    transfer,
    goBack,
    createTeach
  },
  name: "studentList",
  data() {
    return {
      classActive: "",
      dia: false,
      researchId: "",
      into: [],
      classList: [],
      classList2: [],
      classList3: [],
      imgList: [],
      studentListItem: [],
      imgBoxList: [],
      studentList: [
        { id: 0, name: "语文A组" },
        { id: 2, name: "语文B组" },
        { id: 3, name: "语文C组" }
      ],
      checked: true,
      //  num: 0,
      value: "",
      jId: "",
      research: [],
      researchName: "",
      gradeName: "物理",
      createTime: "2019/12/29",
      username: "",
      addCode: "",
      code: "0762",
      radio: 0,
      showBox: false,
      //   subjectNames:'',
      subjectNames: "",
      activeIndex: this.$store.state.calssnav,
      classById: [],
      trial: [],
      agree: [],
      showimg: false,
      showimgs: false,
      Noedit: false,
      classId: "",
      classById: "",
      classByIds: "",
      routers: [
        { path: "/homeCommon/classManagement/studentList" },
        { path: "/homeCommon/classManagement/studentList/homeworkList" },
        { path: "/homeCommon/classManagement/studentList/classVideo" },
        { path: "/homeCommon/classManagement/studentList/courseware" },
        { path: "/homeCommon/classManagement/studentList/studentshowmework" }
      ],
      researchId: this.$route.query.id,
      lid: [], //教研组成员Id
      seen: false, //鼠标移入显示框
      current: 0,
      researchPid: 0, //转让教研组人员ID
      changeBox: false, //转让教研组弹框,
      istype: ""
    };
  },

  mounted() {
    this.getTeachingResearch();
    this.getInto();
    this.getoldTeachingResearch();
    // this.getResearch();
    // this.getResearchList();
    // this.getList();
    // this.getDetailByid();
    var that = this;
    Utils.$on("Noedit", function(msg) {
      that.Noedit = msg;
    });
    Utils.$on("Noedit2", function(msg) {
      that.Noedit = msg;
    });
  },
  methods: {
    deleteJy(value) {
      this.$confirm("此操作将永久删除该教研组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("/user/research/deleteResearch", { id: value.id }).then(
          res => {
            if (res.code == 5000) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.researchId = "";
              this.getTeachingResearch();
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          }
        );
      });
    },
    //加入教研组
    addResearch() {
      let data = {
        code: this.addCode,
        subjectId: sessionStorage.getItem("subjectId"),
        userId: sessionStorage.getItem("userId")
      };
      this.$post("/user/researchTeacher/add", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "加入成功" });
          this.getInto();
        } else {
          this.$message({ type: "error", message: res.data });
        }
      });
    },
    selectClass(value) {
      console.log(value.id);
      this.researchId = value.id;
      // this.getResearch();
      this.getResearchList();
      this.getList();
      this.getDetailByid();
      // this.chatClass();
      // this.chatStudent();
      // this.chatStudentList();
      // this.selectTeacher();
      this.classActive = value.id;
    },
    getInto() {
      this.$post("/user/researchTeacher/findById", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          this.into = res.data.children;
        }
      });
    },
    //查看用户教研组接口
    getTeachingResearch() {
      this.$post("/user/research/query", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          if (res.data.length != 0) {
            var list1 = [];
            var list2 = [];
            var list3 = [];
            res.data.forEach(element => {
              if (element.type == 0) {
                list1.push(element);
              }
              // if (element.type == 1) {
              //   list2.push(element);
              // }
              if (element.type == 2) {
                list3.push(element);
              }
            });
            this.classList = list1;
            // this.classList2 = list2;
            this.classList3 = list3;
          } else {
            this.classList = [];
            this.classList3 = [];
          }
        }
      });
    },
    getoldTeachingResearch() {
      this.$post("/class/research/exit", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          this.classList2 = res.data.children;
        }
      });
    },
    //获取教研组人员ID
    submitP(value) {
      //   console.log(value);
      this.researchPid = value;
    },

    //根据ID获取班级详情信息
    getDetailByid() {
      this.$post("/user/research/queryById", { id: this.researchId }).then(
        res => {
          if (res.code == "5000") {
            this.radio = res.data.state;
            this.researchName = res.data.name;
            //  console.log(res.data[0].name, this.researchName);
            this.code = res.data.code;
            this.createTime = res.data.createTime;
            this.gradeName = res.data.subjectName;
            this.username = res.data.username;
            this.istype = res.data.type;
            this.jId = res.data.id;
            if (res.data.grade == 1) {
              this.grade = "小学";
            } else if (res.data.grade == 2) {
              this.grade = "初中";
            } else if (res.data.grade == 3) {
              this.grade = "高中";
            }
          }
        }
      );
    },
    deleteStudent(id) {
      this.$confirm("此操作将此成员移出教研组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        this.$post("/user/research/deleteTeacher", { id }).then(res => {
          if (res.code == "5000") {
            this.$message({ type: "success", message: "移除成员成功" });
            // this.getResearch();
            this.getResearchList();
            this.getList();
            this.getDetailByid();
          } else {
            this.$message({ type: "error", message: res.message });
          }
        });
      });
    },
    outfun() {
      this.$confirm("此操作将退出教研组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        this.$post("/user/researchTeacher/delete", {
          userId: sessionStorage.getItem("userId"),
          id: this.jId
        }).then(res => {
          if (res.code == "5000") {
            this.$message({ type: "success", message: "退出成功" });
            this.getInto();
            this.getTeachingResearch();
            // this.$router.push({ path: "/homeCommon/TeachingResearch" });
          } else {
            this.$message({ type: "error", message: res.message });
          }
        });
      });
    },
    //调整分组弹框
    changeList(item) {
      this.showBox = true;
      this.Noedit = true;
    },
    //新增分组
    addteam() {
      this.$prompt("请输入分组名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let data = { rId: this.researchId, name: value };
        this.$post("/user/researchGroup/add", data).then(res => {
          if (res.code == "5000") {
            this.$message({ type: "success", message: "新增成功" });
            this.getList();
          } else {
            this.$message({ type: "error", message: "新增失败" });
          }
        });
      });
    },
    //获取教研组资料
    // getResearch() {
    //   this.$post("/user/research/query", {
    //     userId: sessionStorage.getItem("userId")
    //   }).then(res => {
    //     if (res.code == "5000") {
    //       this.research = res.data;
    //     }
    //   });
    // },
    //修改教研组
    changeClassName() {
      this.$prompt("请输入修改教研组名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let data = { name: value, id: this.researchId };
          this.$post("/user/research/update", data).then(res => {
            if (res.code == "5000") {
              this.$message({ type: "success", message: "修改成功" });
              this.getTeachingResearch();
              this.getDetailByid();
            } else {
              this.$message({ type: "error", message: "修改失败" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //转让教研组
    changerClass() {
      let data = {
        userId: sessionStorage.getItem("userId"),
        id: this.researchId,
        uid: this.value
      };
      this.$post("/user/research/transmit", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "转让成功" });
          this.getDetailByid();
          this.changeBox = false;
        }
      });
    },
    //退出教研组
    deleteResearch() {
      this.$router.push({ path: "homeCommon/TeachingResearch" });
      // this.$post("/user/research/delete", { id: this.$route.query.id }).then(
      //   res => {
      //     if (res.code == "5000") {
      //       this.$message({
      //         type: "success",
      //         message: "退出成功"
      //       });
      //       setTimeout(res => {
      //         this.$router.push({ path: "/homeCommon/TeachingResearch" });
      //       }, 3000);
      //     }
      //   }
      // );
    },
    //获取教学教研人员
    getResearchList() {
      this.$post("/user/researchTeacher/query", { id: this.researchId }).then(
        res => {
          if (res.code == "5000") {
            this.imgList = res.data;
            res.data.forEach((item, index) => {
              this.lid.push(item.id);
            });
          }
        }
      );
    },
    //获取分组
    getList() {
      this.$post("/user/researchGroup/query", { rId: this.researchId }).then(
        res => {
          this.studentListItem = res.data.children;

          console.log(this.studentListItem);
        }
      );
    },
    //编辑功能
    editBox(key) {
      this.$confirm("此操作将删除此分组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        this.$post("/user/researchGroup/delete", { id: key }).then(res => {
          if (res.code == 5000) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          }
        });
      });
    },
    //关闭编辑盒子
    closerBox() {
      this.showBox = false;
    },
    tohomeworkResearch() {
      this.$router.push({
        path: "/homeCommon/TeachingResearch/homeworkResearch",
        query: {
          id: this.researchId
        }
      });
    },
    toResearchHomework() {
      this.$router.push({
        path: "/homeCommon/TeachingResearch/ResearchHomeWork"
      });
    },
    //移入
    onMousteIn: function(index) {
      return;
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function(index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    }
  },
  computed: {
    isCreate() {
      return this.$route.query.isCreate;
    }
  },
  watch: {
    // "$route.query.isCreate": "getNavType"
  }
};
</script>

<style scoped lang="less">
.studentList {
  margin-top: 30px;
  background-color: #f8f8f8;
  .classStyle {
    cursor: pointer;
    border: 1px solid #e0e0e0;
    width: 130px;
    padding: 5px 8px 5px 8px;
    font-size: 15px;
    text-align: center;
    position: relative;
    margin-right: 13px;
    margin-bottom: 13px;
  }
  .classActive {
    border: 1px solid #2ab8b3;
  }
  .mymsk {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .mybox {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -450px;
    //  background-color: rgba(225, 225, 225, 1);
    border-radius: 6px;
    overflow: auto;
  }
  .navTop {
    .seleteBox {
      position: absolute;
      top: 50%;
      left: 34%;

      //  transform: translate(-50%);
      width: 517px;
      height: 244px;
      background-color: #fff;
      text-align: center;
      padding-top: 70px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 10px;
      z-index: 10;
    }
    .classBox {
      background-color: #fff;
      box-sizing: border-box;
      padding-bottom: 15px;
      .heard {
        width: 100%;
        height: 56px;
        padding-top: 20px;
      }
      .msgBox {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        .msgList {
          width: 33.333%;
          margin-bottom: 20px;
          text-align: center;
          span {
            display: inline-block;
            width: 85px;
            text-align: right;
          }
          .className {
            width: 200px;
            height: 30px;
            text-align: center;
          }
        }
      }
      .mybtns {
        width: 100%;
        height: 100px;
        text-align: center;
        .btns {
          margin-top: 40px;
        }
      }
    }
  }
  .listBox {
    margin-top: 10px;
    background-color: #fff;
    position: relative;
    .moveBox {
      width: 1000px;
      height: 830px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%;-50%);
      border: 1px solid #eee;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0px 20px;
      .moveBoxCenter {
        padding-top: 37%;
        span {
          margin-left: 40px;
          display: block;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background-color: #159484;
          text-align: center;
          margin-top: 20px;
          i {
            color: #fff;
            line-height: 65px;
            font-size: 40px;
            font-style: normal;
          }
        }
      }
      .moveBoxLeft {
        width: 428px;
        height: 100%;
        p {
          color: #159484;
          font-size: 24px;
          margin: 10px 0px;
        }
        .moveLeft {
          width: 100%;
          height: 700px;
          border: 1px solid #eee;
          overflow: auto;
          padding: 0px 20px;
          .ListBox {
            width: 50%;
            height: 73px;
            float: left;
            //   background-color: #eee;
            padding: 5px 0px;
            .mycheck {
              width: 20px;
              height: 20px;
            }
            img {
              width: 65px;
              height: 65px;
              border-radius: 50%;
              margin: 0px 5px;
            }
            span {
              font-size: 16px;
            }
          }
        }
      }
      .moveBoxRight {
        width: 428px;
        height: 100%;
        padding-top: 10px;
        .option {
          width: 150px;
        }
        .closer {
          width: 50px;
          height: 50px;
          // background-color: #13967f;
          color: #2ab8b3;
          border-radius: 50%;
          padding: 8px;
          text-align: center;
          margin-left: 39%;
          i {
            font-size: 22px;
          }
        }
        .moveRight {
          margin-top: 10px;
          width: 100%;
          height: 700px;
          border: 1px solid #eee;
          overflow: auto;
        }
      }
    }
    .imgBox {
      height: 56px;
      img {
        margin-top: 12px;
      }
    }
  }
  .anserBox {
    padding-top: 20px;
    padding-left: 140px;
    padding-bottom: 50px;
  }
  .listStundent {
    padding: 0px 20px;
    .listOne {
      .title {
        display: inline-block;
        width: 95.3%;
        border-bottom: 1px solid #d5efe6;
        span {
          padding: 4px;
          background-color: #2ab8b3;
        }
        .btnRight {
          background: rgba(0, 0, 0, 0);
          float: right;
          position: relative;
          right: 0px;
          top: -14px;
          .elbtn {
            border: 0;
            margin-left: 10px;
            color: #fff;
          }
        }
      }
      .listImgBox {
        width: 16.5%;
        height: 150px;
        position: relative;
        display: inline-block;
        text-align: center;
        border: 1px solid #eee;
        // padding-left: 28px;

        .deleteBox {
          width: 60%;
          height: 80%;
          margin: 0 auto;
          position: relative;
          .showBox {
            position: absolute;
            width: 130px;
            height: 97px;
            background-color: #7d786f;
            top: -10px;
            right: -105px;
            padding-top: 10px;
            p {
              color: #fff;
            }
          }
          //   background: url();
          img {
            // :hover {
            //   src: "../../../../static/images/删除.png";
            // }
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto;
            margin-bottom: 10px;
            margin-top: 30px;
          }
        }
      }
      .Grouping {
        // margin-top: 10px;
        width: 100%;
        border-right: 1px solid #d5efe6;
        border-left: 1px solid #d5efe6;
        .GroupingList {
          // display: flex;
          width: 100%;
          .GroupingLeft {
            border-right: 1px solid #d5efe6;
            border-bottom: 1px solid #d5efe6;
            display: flex;
            font-size: 18px;
            color: #2ab8b3;
            div {
              width: 179px;
              text-align: center;

              border-right: 1px solid #d5efe6;
              p {
                margin-bottom: 20px;
              }
              span {
                font-size: 14px;
                border-radius: 5px;
              }
            }
            .GroupingRight {
              flex: 1;
              //  border-bottom: 1px solid #d5efe6;
              box-sizing: border-box;
              //    padding-left: 30px;
              .rightImgBox {
                float: left;
                border: 1px solid #eee;
                width: 19.8%;
                //  text-align: center;
                height: 149px;
                // display: inline-block;
                img {
                  width: 60px;
                  height: 60px;
                  display: block;
                  border-radius: 50%;
                  margin: 0 auto;
                  margin-top: 36px;
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
  #my-img:hover {
    content: url("../../../../static/images/垃圾桶.jpg");
    transform: scale(0.9);
  }
}
</style>
