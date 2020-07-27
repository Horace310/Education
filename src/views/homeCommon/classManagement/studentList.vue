<template>
  <div class="studentList mt72">
    <createClass :dia="dia" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="teacherId" placeholder="请选择老师">
        <el-option
          v-for="item in imgList_"
          :key="item.id"
          :label="item.username"
          :value="item.userId"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changerClass">确 定</el-button>
      </span>
    </el-dialog>
    <div class="navTop">
      <div class="classBox">
        <div style="display:flex;justify-content:space-between;width:380px;padding:13px">
          <p
            @click="dia=true"
            style="box-shadow: 5px 5px 5px #C0C0C0;cursor:pointer;font-size:18px;border-radius:20px;border:1px solid #F2F2F2;width:130px;display:flex;align-items:center;justify-content:center;background:#F2F2F2"
          >
            <span style="font-size:31px;font-weight:600;color:#2DB6B3;margin-right:5px">+</span>
            <span>创建班级</span>
          </p>
          <p
            style="box-shadow: 5px 5px 5px #C0C0C0;padding:9px 8px 9px 8px;cursor:pointer;font-size:18px;border-radius:20px;border:1px solid #F2F2F2;width:200px;display:flex;align-items:center;justify-content:center;background:#F2F2F2"
          >
            <el-input
              v-model="code"
              size="mini"
              placeholder="请输入邀请码"
              style="width:110px;margin-right:5px"
            ></el-input>
            <el-button
              size="mini"
              style="background:rgb(42, 184, 179);color:white"
              @click="addResearch"
            >加入班级</el-button>
          </p>
        </div>
        <div style="padding:13px">
          <div v-if="list1.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>当前执教班级</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in list1"
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
          <div v-if="list2.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>当前加入班级</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in list2"
                :key="index"
                :class="classActive==i.id?'classStyle classActive':'classStyle'"
                @click="selectClass(i)"
              >
                <span>{{ i.name?i.name:'' }}</span>
              </p>
            </div>
          </div>
          <div v-if="list3.length>0">
            <p
              style="background:#F2F2F2;width:130px;padding:5px 8px 5px 8px;font-size:17px;display:flex;align-items:center;justify-content:space-around"
            >
              <span style="width:7px;height:20px;display:inline-block;background:rgb(42, 184, 179)"></span>
              <span>曾经执教班级</span>
            </p>
            <div style="width:100%;display:flex;flex-wrap:wrap;padding-top:15px">
              <p
                v-for="(i,index) in list3"
                :key="index"
                :class="classActive==i.id?'classStyle classActive':'classStyle'"
                @click="selectClass(i)"
              >
                <span>{{ i.name?i.name:'' }}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="cid">
          <div class="heard">
            <img src="../../../../static/images/班级信息.png" alt />
          </div>
          <div class="msgBox">
            <div class="msgList">
              <span style="margin-left:155px;margin-right:5px">班级名称</span>
              <el-input class="className" v-model="classMsg.name" :disabled="flag==0?true:false"></el-input>
            </div>
            <div class="msgList">
              <span style="margin-left:70px;margin-right:5px">学段</span>

              <span
                style="display:inline-block;width:200px;height:37px;border:1px solid #DCDFE6;border-radius:3px; box-sizing: border-box;padding:10px"
              >
                {{
                classMsg.grade == 1 ? "小学" : classMsg.grade == 2 ? "初中" : "高中"
                }}
              </span>
            </div>
            <div class="msgList">
              <span style="margin-left:14px;margin-right:5px">邀请码</span>
              <el-input class="className" v-model="classMsg.code" :disabled="flag==0?true:false"></el-input>
            </div>
            <div class="msgList">
              <span style="margin-left:141px;margin-right:5px">班级创建者</span>
              <el-input
                class="className"
                v-model="classMsg.creatorUsername"
                :disabled="flag==0?true:false"
              ></el-input>
            </div>
            <!-- <div class="msgList"> -->
            <!-- <span style="margin-left:43px;margin-right:5px">学科老师</span>
            <el-input class="className" v-model="classMsg.creatorUsername"></el-input>  
            <span
              style="display:inline-block;width:200px;height:37px;border:1px solid #DCDFE6;border-radius:3px; box-sizing: border-box;padding:10px"
            >
              {{
              classMsg.subjectName
              }}{{classMsg.creatorUsername}}
            </span>-->
            <!-- </div> -->
            <div class="msgList2">
              <span style="margin-right:5px">创建时间</span>
              <el-input
                class="className"
                v-model="classMsg.createTime"
                :disabled="flag==0?true:false"
              ></el-input>
            </div>
          </div>
          <div class="mybtns">
            <el-button
              class="btns"
              style="background-color:#ff8b00;border:0;color:#fff"
              @click="changeClassName"
              v-if="roleType==0"
            >修改班级名称</el-button>
            <el-button
              v-if="roleType==0&&roleType!=2"
              class="btns"
              style="background-color:#2ab8b3;border:0;color:#fff"
              @click="dialogVisible=true"
            >班级转让</el-button>
            <el-button
              v-if="roleType!=0&&roleType!=2"
              class="btns"
              style="background-color:#ff8b00;border:0;color:#fff"
              @click="outClass"
              :disabled="flag3"
            >退出班级</el-button>
            <!-- <el-button
            class="btns"
            style="background-color:#2ab8b3;border:0;color:#fff"
            @click="addTearch"
            :disabled="flag==0?true:false"
            >添加学科老师</el-button>-->
          </div>
        </div>
      </div>
    </div>
    <div class="listBox" v-if="cid">
      <div class="listStundent">
        <div class="listOne">
          <p class="title">
            <span class="text" style="color:#fff;padding:5px">学科教师</span>
          </p>
          <div
            class="listImgBox"
            style="position:relative"
            v-for="(item, index) in imgList_"
            :key="index"
          >
            <i
              v-if="roleType==0"
              style="position:absolute;right:10px;top:10px;cursor:pointer"
              @click="openTeacher(item.id)"
              class="el-icon-delete"
            ></i>
            <div class="deleteBox">
              <img :src="item.img" @mousemove="onMousteInO(index)" @mouseleave="onMousteOut()" />
              <span>{{ item.username }}</span>
              <div class="showBox" v-show="seenTwo && index == currentOne">
                <p>姓名:{{ item.username }}</p>
                <p>学科:{{ item.subjectName }}</p>
                <!-- <p>访问次数：12次</p> -->
              </div>
              <p>学科:{{ item.subjectName }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="imgBox">
        <img src="../../../../static/images/班级学生.png" alt />
      </div>
      <div class="anserBox" v-if="roleType==0">
        <span class="text" style="font-size:16px">允许学生加入</span>
        <el-radio v-model="radio" label="0" @change="getIn">是</el-radio>
        <el-radio v-model="radio" label="1" @change="outTo">否</el-radio>
      </div>
      <div class="listStundent">
        <div class="listOne">
          <p class="title">
            <span class="text" style="color:#fff;padding:5px">学生列表</span>
          </p>
          <div
            class="listImgBox"
            style="position:relative"
            v-for="(item, index) in imgList"
            :key="index"
          >
            <i
              v-if="roleType==0"
              style="position:absolute;right:10px;top:10px;cursor:pointer"
              @click="open2(item.id)"
              class="el-icon-delete"
            ></i>
            <div class="deleteBox">
              <img :src="item.img" alt @mousemove="onMousteIn(index)" @mouseleave="onMousteOut()" />

              <span>{{ item.username }}</span>
              <div class="showBox" v-show="seen && index == current">
                <p>姓名:{{ item.username }}</p>
                <p>班级:{{ item.className }}</p>
                <p>学号:{{ item.studentId }}</p>
                <!-- <p>访问次数：12次</p> -->
              </div>
            </div>
          </div>
          <p class="title" style="margin-top:30px">
            <span style="color:#fff;padding:5px">学生分组</span>
            <span class="btnRight" v-if="roleType==0?true:false">
              <el-button
                class="elbtn"
                size="small"
                style="background-color:#2ab8b3"
                @click="addTeam"
              >+新增分组</el-button>
              <el-button
                class="elbtn"
                size="small"
                style="background-color:#ff8a05"
                @click="changeList"
              >调整分组</el-button>
            </span>
          </p>
          <div class="Grouping" v-for="(item, index) in studentListItem" :key="index">
            <div class="GroupingList" v-for="(items, indexs) in item" :key="indexs">
              <div class="GroupingLeft">
                <div>
                  <p style="margin-top:40px">{{ items.name }}（{{items.count}}人）</p>
                  <span
                    style="padding:5px;background-color:#ccece7;color:#56ac9e; cursor: pointer;"
                    @click="editBox(items,indexs)"
                    v-if="flag==0?false:true"
                  >删除分组</span>
                </div>

                <div class="GroupingRight">
                  <div class="rightImgBox" v-for="(ites, inx) in items.children" :key="inx">
                    <img :src="ites.img" alt />
                    <!-- <span>{{ites}}</span> -->
                    <span>{{ ites.studentName }}</span>
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
import transfer from "../../../components/grade/MyTransfer";
import Utils from "../../../../static/js/util";
import goBack from "../../../components/common/goBack";
import createClass from "./createClass";
export default {
  inject: ["reload"],
  components: {
    transfer,
    goBack,
    createClass
  },
  name: "studentList",
  data() {
    return {
      dia: false,
      classActive: "",
      list1: [],
      list2: [],
      list3: [],
      teacherId: "",
      options: [],
      imgList_: [],
      dialogVisible: false,
      Noedit: false,
      seen: false, //鼠标移入显示框
      current: 0, //鼠标移入index
      currentOne: 0,
      imgList: [],
      listId: 0, //分组Id
      value1: "", //分组弹框model
      studentListItem: [],
      stundentImgList: [],
      checked: true,
      value: "",
      classname: "",
      gradeName: "",
      createTime: "",
      code: "",
      seenTwo: false,
      radio: 0,
      showBox: false,
      subjectNames: "",
      activeIndex: this.$store.state.calssnav,
      classById: [],
      trial: [],
      agree: [],
      showimg: false,
      showimgs: false,
      classId: "",
      classByIds: "",
      classById: "",
      routers: [
        { path: "/homeCommon/classManagement/studentList" },
        { path: "/homeCommon/classManagement/studentList/homeworkList" },
        { path: "/homeCommon/classManagement/studentList/classVideo" },
        { path: "/homeCommon/classManagement/studentList/courseware" },
        { path: "/homeCommon/classManagement/studentList/studentshowmework" }
      ],
      cid: this.cid, //班级id
      roleType: "",
      flag2: this.$route.query.flag2,
      //班级信息
      classMsg: {
        name: "",
        grade: "",
        subjectName: "",
        code: "",
        state: "",
        creatorUsername: "",
        createTime: ""
      },
      t: null,
      count: 5,
      value: "",
      lid: [],
      imgBoxList: [],
      flag3: false
    };
  },
  created() {
    this.getclassList();
    this.getInfoClass();
    this.getoldInfoClass();
    //获取创建的班级列表
    // this.chatClass();
    // this.chatStudent();
    // this.chatStudentList();
    var that = this;
    Utils.$on("Noedit", function(msg) {
      that.Noedit = msg;
    });
    Utils.$on("Noedit2", function(msg) {
      that.Noedit = msg;
    });
    // this.selectTeacher();
  },
  mounted() {},
  computed: {
    isCreate() {
      return this.$route.query.isCreate;
    }
  },
  methods: {
    //加入班级管理，邀请码
    addResearch() {
      if (!this.code) {
        this.$message.error("请输入邀请码");
        return;
      }
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
            this.cid = "";
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    selectClass(value) {
      this.cid = value.id;
      this.chatClass();
      this.chatStudent();
      this.chatStudentList();
      this.selectTeacher();
      this.classActive = value.id;
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
    getInfoClass() {
      this.$post("/user/classes/findByJoinId", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          this.list2 = res.data.filter(i => i != null);
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
    selectChange(value) {},
    // /user/classes/selectTeacher
    selectTeacher() {
      this.$post("/user/classes/selectTeacher", { cid: this.cid }).then(res => {
        if (res.code == 5000) {
          this.imgList_ = res.data;
          console.log(this.imgList_);
        }
        // console.log(res,"ressss")
      });
    },

    //查看班级学生分组
    chatStudentList() {
      let data = {
        classId: this.cid,
        userId: sessionStorage.getItem("userId")
      };
      this.$post("/user/group", data).then(res => {
        this.studentListItem = res.data;
        console.log(this.studentListItem);

        this.imgBoxList = res.data.children;
      });
    },
    //新增分组
    addTeam() {
      this.$prompt("请输入分组名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let data = {
          classId: this.cid,
          subjectId: sessionStorage.getItem("subjectId"),
          userId: sessionStorage.getItem("userId"),
          // list: this.lid,
          name: value
        };
        this.$post("/user/group/add", data).then(res => {
          if (res.code == "5000") {
            this.chatStudentList();
            this.$message({ type: "success", message: "新增成功" });
          } else {
            this.$message({ type: "error", message: "新增失败" });
          }
        });
      });
    },
    //查看分组情况
    chatList() {},
    //调整分组弹框
    changeList(item) {
      this.showBox = true;
      this.Noedit = true;
    },
    //查看班级学生
    chatStudent() {
      let data = { id: this.cid };

      this.$post("/user/students/query", data).then(res => {
        if (res.code == "5000") {
          this.imgList = res.data;
          res.data.forEach((item, index) => {
            this.lid.push(item.id);
          });
          //   console.log(this.lid);
        }
      });
    },
    //控制学生进入
    getIn(v) {
      let data = { cid: this.cid, state: "0" };
      this.$post("/user/classes/updateState", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "设置成功" });
        }
      });
    },
    outTo() {
      let data = { cid: this.cid, state: "1" };
      this.$post("/user/classes/updateState", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "设置成功" });
        }
      });
    },
    openTeacher(id) {
      this.$confirm("此操作将移除此教师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        this.$get("/user/classes/deleteTeacher", { id }).then(res => {
          if (res.code == "5000") {
            this.$message({ type: "success", message: "移除成功" });
            this.selectTeacher();
          } else {
            this.$message({ type: "error", message: "移除失败" });
          }
        });
      });
    },
    //添加老师
    addTearch() {
      this.$prompt("请输入添加教师ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let data = { userId: value, cid: this.cid };
        this.$post("/user/classes/addTeacher", data).then(res => {
          if (res.code == "5000") {
            this.$message({ type: "success", message: "添加成功" });
          } else {
            this.$message({ type: "error", message: "添加失败" });
          }
        });
      });
    },
    //修改班级
    changeClassName() {
      this.$prompt("请输入修改班级名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let data = { name: value, id: this.classMsgid };
        this.$post("/user/classes/update", data).then(res => {
          if (res.code == "5000") {
            // this.cid = "";
            this.$message({ type: "success", message: "修改成功" });
            this.chatClass();
            this.getclassList();
          } else {
            this.$message({ type: "error", message: "修改失败" });
          }
        });
      });
    },
    //根据ID查询班级信息
    chatClass() {
      let data = {
        id: this.cid
      };
      this.$post("/user/classes/findById", data).then(res => {
        if (res.code == "5000") {
          this.classMsg.name = res.data.name;
          this.classMsg.grade = res.data.grade;
          this.classMsg.subjectName = res.data.subjectName;
          this.classMsg.code = res.data.code;
          this.classMsg.state = res.data.state;
          this.classMsg.creatorUsername = res.data.creatorUsername;
          this.classMsg.createTime = res.data.createTime;
          this.classMsgid = res.data.id;
          this.radio = this.classMsg.state;
          this.roleType = res.data.type;
          // res.data.forEach((item, index) => {
          //   this.radio = item.state;
          // });
        }
      });
    },
    //转让班级
    changerClass() {
      if (!this.teacherId) {
        this.$message({ type: "error", message: "请选择转让老师" });
        return false;
      }
      let data = {
        uid: this.teacherId,
        userId: sessionStorage.getItem("userId"),
        cid: this.classMsgid
      };
      this.$post("/user/classes/transmit", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "转让成功" });
          this.dialogVisible = false;
          this.selectTeacher();
          this.chatClass();
        } else {
          this.$message({ type: "error", message: "转让失败" });
        }
      });
    },
    //退出班级
    outClass() {
      let data = {
        cid: this.cid,
        userId: sessionStorage.getItem("userId")
      };
      this.$post("/user/classes/delete", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "退出班级成功" });
          this.getInfoClass();
          this.getoldInfoClass();
          this.chatClass();
          this.t = setInterval(() => {
            this.count--;
            if (this.count == 0) {
              clearInterval(this.t);
            }
          });
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    //点击关闭分组
    closerBox() {
      this.showBox = false;
    },
    //学生分组选择
    chooresFx(index) {
      this.num = index;
      //   console.log(this.num);
    },
    //弹出删除
    open2(id) {
      this.$confirm("确认移除该同学吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/user/students/delete", { id: id }).then(res => {
            if (res.code == 5000) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.chatStudent();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //移入
    onMousteIn: function(index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteInO: function(index) {
      this.seenTwo = true; //鼠标移入显示
      this.currentOne = index;
    },
    onMousteOut: function(index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
      this.seenTwo = false;
      this.currentOne = false;
    },
    //点击编辑弹框
    editBox(item, index) {
      this.$confirm("此操作将删除该分组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/user/group/delete", { id: item.id }).then(res => {
            if (res.code == "5000") {
              this.$message({ type: "success", message: "删除成功" });
              this.chatStudentList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.msgList2 {
  margin-left: 42px;
  width: 33.33%;
  margin-bottom: 20px;
  .className {
    width: 200px;
    height: 30px;
    text-align: center;
  }
}
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
.studentList {
  background-color: #f8f8f8;
  margin-top: 30px;
  .active {
    background-color: #2ab8b3;
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
        flex-wrap: wrap;
        .msgList {
          width: 33.33%;
          margin-bottom: 20px;
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
        display: inline-block;
        text-align: center;
        border: 1px solid #eee;
        position: relative;
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
        width: 100%;
        border-right: 1px solid #d5efe6;
        border-left: 1px solid #d5efe6;
        .GroupingList {
          //  display: flex;
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
