<template>
  <div>
    <div class="subject">
      <goBack :direction="true" link="/homeCommon/workCenter/addHomeWork"></goBack>
      <edit :show.sync="dialogVisible" />
      <div class="import-out">
        <div class="title" ref="print">作业预览</div>
        <div class="model" v-show="Conter">
          <div class="arrangement">
            <div class="con submit-test-dialog">
              <!-- <p style="text-align:center;color:red;">请完善您的身份信息,以便布置作业</p> -->
              <el-form
                :model="ruleForm1"
                status-icon
                ref="ruleForm2"
                label-width="80px"
                class="demo-ruleForm"
                :inline="true"
                :label-position="labelPosition"
              >
                <el-form-item label="作业名称" prop="account" class="zh_icon" style="width:30%">
                  <el-input
                    v-model="$store.state.homeworkTitle"
                    placeholder="请输入作业名称"
                    @input="e => (ruleForm2.account = validForbid(e))"
                    style="width:183px"
                  ></el-input>
                </el-form-item>

                <el-form-item label="作业类型" prop="label" class="bj" style="width:30%">
                  <el-select v-model="workTypeName" placeholder="请选择作业类型" @change="changeValue">
                    <el-option
                      v-for="item in workType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="作业等级" prop="levelLabel" class="zh_icon">
                  <el-select v-model="levels" placeholder="请选作业等级" @change="changeLevel">
                    <el-option
                      v-for="item in levelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="展现分类" prop="viewType" class="bj" style="width:30%">
                  <el-select v-model="showType" placeholder="请选择作业类型" @change="changeValues">
                    <el-option
                      v-for="item in showTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="预计用时" prop="number" class="zh_icon">
                  <el-input
                    v-model.number="ruleForm2.number"
                    @input="e => (ruleForm2.number = validNumber(e))"
                    placeholder="请输入用时"
                    style="width:220px"
                  >
                    <template slot="append">分钟</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="专题"
                  prop="horizontal"
                  class="bj"
                  style="width:30%;margin-left:15px"
                >
                  <el-select v-model="topic" clearable placeholder="请选择专题" ref="selection">
                    <el-option
                      v-for="item in special"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <!-- <Subjects :questionList="questionList"></Subjects>
        <div class="nodata" v-if="false">
          <img src="../../../../static/images/nodata.png" alt />
          <span>暂无导入试题</span>
        </div>-->
        <div class="myquerstionBox" v-if="list == null">
          <div class="questionBox">
            <div class="questionItem">
              <!-- <span class="daoru">导入</span>
              <span class="code">此题编码:{{ questionsConter.code }}</span>-->
            </div>
            <div class="questionConter">
              <span style="margin-left:5px">题目内容:</span>

              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="questionsConter.content"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="myquerstionBox" v-else-if="list!=null">
          <div class="questionBox" v-for="(item,index) in list" :key="index">
            <div class="questionConter">
              <span v-html="item.content"></span>
            </div>
            <div class="footbtn clearfix">
              <div class="footbtn_right">
                <i style="cursor:pointer" @click="closeD(true,item)" class="el-icon-edit"></i>
                <i
                  style="cursor:pointer;margin-left:5px"
                  @click="open(item)"
                  class="el-icon-delete"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirms" id="printMe">
      <el-button type="warning" class="myBtn1" @click="shows(1)" v-if="contentName">保存</el-button>
      <el-button type="primary" class="myBtn" @click="againEdit">追加题目</el-button>
      <el-button type="warning" class="myBtn1" @click="shows(2)" v-if="contentName">发布</el-button>
      <el-button type="warning" class="myBtn" @click="tiao">作业列表</el-button>
      <!-- <el-button type="primary" class="myBtn" @click="printContent">打印</el-button> -->
    </div>
    <div class="show" v-if="showBox">
      <div class="showItem">
        <span style="margin-right:10px">选择班级</span>
        <el-select
          v-model="ruleForm2.classIdList"
          placeholder="请选择班级"
          @change="changeClass"
          size="mini"
        >
          <el-option
            v-for="(item, i) in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span style="margin-right:10px">选择组别</span>
        <el-select
          v-model="ruleForm2.classTeamList"
          placeholder="请选择组别"
          multiple
          size="mini"
          @change="getTeamId"
        >
          <el-option
            v-for="(item, i) in teamList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span style="margin-right:10px">学生自批</span>
        <el-select
          v-model="workKnow.label"
          placeholder="请选择作业类型"
          @change="choosecanCorrect"
          size="mini"
        >
          <el-option
            v-for="item in workKnow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span>最晚提交</span>
        <el-date-picker
          style="dislpay:inline-block;margin-left:6px"
          v-model="chooresTime"
          type="datetime"
          placeholder="选择日期时间"
          @change="getTime"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
      <div class="showItem">
        <el-button
          size="mini"
          style="border:0;margin-left:47%;display:inline-block"
          type="warning"
          @click="showBox=false"
        >取消</el-button>
        <el-button
          size="mini"
          style="background-color:#f25c29;color:#fff;border:0;display:inline-block"
          @click="saveHomeword('ruleForm2', '0')"
        >确认</el-button>
      </div>
    </div>

    <!-- 创建班级-->
    <div class="creatClass" v-show="centerDialogVisible">
      <creatClass
        :centerDialogVisible="centerDialogVisible"
        @callOf="callOfa"
        @closeDialog="closeDialog"
        @submitForm="submitFormq"
      ></creatClass>
    </div>
  </div>
</template>
<script>
import Subjects from "@/components/subject/subject";
import creatClass from "@/components/creatClass/creatClass";
import Utils from "../../../static/js/util";
import goBack from "@/components/common/goBack";
import edit from "./edit";
export default {
  components: {
    Subjects,
    creatClass,
    goBack,
    edit
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入预计用时"));
      } else if (!Number.isInteger(Number(value))) {
        //   console.log(value)
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      showindex: "",
      total: "",
      showBox: false,
      labelPosition: "right",
      SubjectId: JSON.parse(sessionStorage.getItem("subjectId")),
      Conter: true,
      centerDialogVisible: false,
      answerindex: 0,
      workKnow: [
        { label: "是", value: "1" },
        { label: "否", value: "2" }
      ],
      canCorrect: 0,
      workType: [
        { label: "巩固作业", value: "1" },
        { label: "测试作业", value: "2" }
      ],
      topic: "",
      workTypeName: "", //作业类型名称
      showType: "", //展示类型名称
      levels: "", //作业等级
      classIds: "", //班级id
      classList: [], //班级数据
      teamId: [], //小组ID
      teamIds: [], //小组ID
      teamList: [], //小组
      levelLabel: "", //作业等级
      showTypeLabel: "", //展示分类
      chooresTime: "", //选择时间
      lastSubmitTime: "", //最后提交时间
      showTypeList: [
        { label: "非结构化作业(扩散性或探究型作业)", value: "1" },
        { label: "结构化作业", value: "2" }
      ],
      levelList: [
        { label: "普通", value: "1" },
        { label: "中级", value: "2" },
        { label: "高级", value: "3" }
      ],
      special: [
        { label: "基础型", value: "1" },
        { label: "专题型", value: "2" },
        { label: "竞赛型", value: "3" }
      ],
      detailId: "",
      difficulty: [{ name: "解释性" }, { name: "应用性" }, { name: "拓展性" }],
      difficultyindex: "",
      time: [
        { name: "宽松" },
        { name: "合适" },
        { name: "超时" },
        { name: "自定义" }
      ],
      timeindex: "",
      target: [
        { name: "但一知识目标" },
        { name: "多知识目标" },
        { name: "自定义" }
      ],
      homeworkId: "",
      types: [],
      questionList: [],
      pid: "",
      ruleForm1: {
        pid: "",
        name: "",
        showType: "",
        type: "",
        level: "",
        subject: "",
        expectTime: "",
        topic: ""
      },
      ruleForm2: {
        type: "",
        classIdList: [],
        classTeamList: [],
        account: "",
        horizontal: "",
        date1: "",
        desc: "",
        question: "",
        number: 30
      },

      rules2: {
        viewType: [
          { required: true, message: "请选择展现分类", trigger: "change" }
        ],
        label: [
          { required: true, message: "请选择作业类型", trigger: "change" }
        ],
        classIdList: [
          { required: true, message: "请选择班级", trigger: "change" }
        ],
        account: [
          { required: true, message: "请输入作业名称", trigger: "blur" }
        ],
        levelLabel: [
          {
            required: true,
            message: "请选择作业等级",
            trigger: "change"
          }
        ],
        desc: [{ required: false, message: "请填写知识点", trigger: "blur" }],
        question: [
          { required: false, message: "请填写解决问题", trigger: "blur" }
        ],
        horizontal: [
          { required: true, message: "请选择专题", trigger: "blur" }
        ],
        number: [{ required: true, validator: checkAge, trigger: "blur" }]
      },
      createClass: [],
      show: false,
      contentName: true,
      questionsConter: [],
      list: [],
      workId: [],
      QuestionType: [],
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" }
        // { name: "自定义" }
      ]
    };
  },
  created() {
    if (this.$route.query.homeworkId) {
      this.homeworkId = this.$route.query.homeworkId;
      sessionStorage.setItem("homeworkId", this.homeworkId);
      this.getQuestion();
    }
    if (this.$route.query.pids) {
      this.pid = this.$route.query.pids;
    }
    this.ruleForm2.account = this.$route.query.contentName;
    this.getclassList();

    this.list = JSON.parse(sessionStorage.getItem("list"));
    //  console.log(this.workId);
    if (this.list != null) {
      // var workIds = sessionStorage.getItem("workId");
      // if (!workIds) return;
      // workIds = workIds.substr(1); //删除第一个字符
      // this.workId = workIds.substr(0, workIds.length - 1); //删除最后一字符
    }
    // if (this.list == null) {
    //   this.getQuestion();
    // }
  },
  destroyed() {
    // sessionStorage.removeItem("workId");
    // sessionStorage.removeItem("list");
  },
  mounted() {},
  methods: {
    tiao() {
      this.$router.push({
        path: "/homeCommon/workCenter"
      });
    },
    closeD(isOpen, item) {
      this.detailId = item.id;
      this.dialogVisible = isOpen;
    },
    open(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$deletes("/user/homework/question/delete", { id: item.id }).then(
          res => {
            if (res.code == "5000") {
              console.log(JSON.parse(sessionStorage.getItem("workId")));
              let workId = JSON.parse(sessionStorage.getItem("workId"));
              let newWorkId = workId.filter(i => i != item.id);
              sessionStorage.setItem("workId", JSON.stringify(newWorkId));
              this.list = this.list.filter(i => i.id != item.id);
              this.$store.commit("setAllproblemslist", this.list);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          }
        );
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });
    },
    //选择时间
    getTime(value) {
      // console.log(value);
      this.chooresTime = value;
    },
    //获取班级列表
    getclassList() {
      let data = { userId: sessionStorage.getItem("userId") };
      this.$post("/user/classes/query", data).then(res => {
        if (res.code == "5000") {
          this.classList = res.data;
          //  this.getTeam();
        }
      });
    },
    //获取作业类型
    changeValue(value) {
      let obj = {};
      obj = this.workType.find(item => item.value === value);
      this.workTypeName = obj.label;
      // alert(this.workTypeName);
    },
    //展现分类
    changeValues(value) {
      // let obj = {};
      // obj = this.showTypeList.find(item => {
      //   return item.value === value;
      // });
      // this.showType = obj.label;
    },
    //认知水平
    changeLevel(value) {
      let obj = {};
      obj = this.levelList.find(item => {
        return item.value === value;
      });
      this.levels = obj.label;
    },
    //选择是否可以自批
    choosecanCorrect(v) {
      this.canCorrect = v;
    },
    //打印
    printContent(e) {
      let subOutputRankPrint = document.getElementById("subOutputRank-print");
      //   console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;

      return false;
    },
    addZore(e) {
      return e < 10 ? "0" + e : e;
    },
    // 获取知识水平

    // 获取班级Id
    changeClass(e) {
      this.classIds = e;
      this.getTeam();
    },

    // 获取班级小组
    getTeam(e) {
      let data = {
        userId: sessionStorage.getItem("userId"),
        classId: this.classIds
      };
      this.$post("/user/group", data).then(res => {
        res.data.children.unshift({ name: "全班", id: 0 });
        this.teamList = res.data.children;
      });
    },
    //获取小组Id
    getTeamId(e) {
      //   console.log(e);

      // var arr = [1, 2, 3, 4];
      // // arr.push(e);
      // // this.teamId = arr.map(value => {
      // //   return parseInt(value);
      // // });
      // var n = [];
      // for (var i = 0; i < arr.length; i++) {
      //   if (n.indexOf(arr[i]) === -1) {
      //     n.push(arr[i]);
      //   }
      // }
      this.teamId = e.join(",");
      //  this.teamId = JSON.parse(JSON.stringify(this.teamIds));
      //  console.log(this.teamIds);
    },

    // 选择作业类型
    close() {
      this.show = false;
    },
    againEdit() {
      this.$router.push({
        path: "/homeCommon/workCenter/addHomeWork",
        query: { homeworkId: this.homeworkId, pid: this.pid }
      });
    },
    //创建班级
    submitFormq(data) {
      // console.log(data);
      this.centerDialogVisible = data;
      this.queryCreateClass();
    },
    //创建班级关闭弹框
    closeDialog(val) {
      this.centerDialogVisible = val;
    },
    //创建班级取消
    callOfa(val) {
      this.centerDialogVisible = val;
    },
    //创建班级弹框
    createClassed() {
      this.centerDialogVisible = true;
    },
    shows(index) {
      this.showindex = index;
      if (index == 2) {
        this.showBox = true;
      } else {
        this.saveHomeword();
      }
    },
    //根据id获取作业
    getQuestion() {
      this.$get("/user/homework/findById", {
        id: this.homeworkId
      }).then(res => {
        this.questionsConter = res.data.list;
        if (sessionStorage.getItem("list")) {
          this.list = JSON.parse(sessionStorage.getItem("list"));
        } else {
          this.list = res.data.list;
          let newList = [...res.data.list];
          this.$store.commit("setAllproblemslist", newList);
          sessionStorage.setItem(
            "workId",
            JSON.stringify(this.list.map(item => item.id))
          );
          this.workId = this.list.map(item => item.id).join();
        }
        this.pid = res.data.pid;
        sessionStorage.setItem("pid", this.pid);
        this.$store.state.homeworkTitle = res.data.name;
        this.showType = res.data.showType;
        this.workTypeName = res.data.type;
        this.levels = res.data.level;
        this.ruleForm2.number = res.data.expectTime;
        this.topic = res.data.topic;
        this.total = res.data.total;
      });
    },
    goPublish() {
      if (this.list.length === 0) {
        this.$message({
          type: "info",
          message: "未添加题目不可发布作业"
        });
        return false;
      }
      let datas = {
        classId: this.classIds,
        homeworkId: this.homeworkId,
        groupIds: this.teamId,
        canCorrect: this.canCorrect,
        lastSubmitTime: this.chooresTime
      };
      this.$post("/user/homework/publish", datas).then(res => {
        if (res.code == "5000") {
          // Util.$emit("classId", this.classIds);
          this.$message({
            message: "发布作业成功!",
            type: "success"
          });
          sessionStorage.removeItem("workId");
          sessionStorage.removeItem("homeworkId");
          sessionStorage.removeItem("list");
          this.$store.commit("setAllproblemslist", []);
          this.$router.push({ path: "/homeCommon/workCenter" });
        }
      });
    },
    saveHomeword() {
      if (!this.showType) {
        this.$message({
          message: "请选择展示类型名称",
          type: "error"
        });
        return false;
      } else if (!this.workTypeName) {
        this.$message({
          message: "请选择作业类型名称",
          type: "error"
        });
        return false;
      } else if (!this.ruleForm2.number) {
        this.$message({
          message: "请输入预计用时",
          type: "error"
        });
        return false;
      } else if (!this.topic) {
        this.$message({
          message: "请选择专题",
          type: "error"
        });
        return false;
      }
      let data = {
        pid: this.pid,
        name: this.$store.state.homeworkTitle,
        showType: this.showType,
        type: this.workTypeName,
        level: this.levels,
        subject: sessionStorage.getItem("subjectName"),
        expectTime: this.ruleForm2.number,
        topic: this.topic,
        total: this.total
      };
      if (this.homeworkId) {
        data.id = this.homeworkId;
      }
      if (this.list != null) {
        var workIds = sessionStorage.getItem("workId");
        if (!workIds) return;
        workIds = workIds.substr(1); //删除第一个字符
        this.workId = workIds.substr(0, workIds.length - 1); //删除最后一字符
        data.questionIds = this.workId;
        data.total = sessionStorage.getItem("total")
          ? sessionStorage.getItem("total")
          : this.total;
      } else if (this.list == null) {
        data.total = this.questionsConter.score;
        data.questionIds = this.questionsConter.id;
      }
      //  console.log(this.teamId);
      let api;
      this.homeworkId
        ? (api = "/user/homework/update")
        : (api = "/user/homework/insert");
      this.$post(api, data).then(res => {
        if (res.code == "5000") {
          sessionStorage.homeworkId = res.data;
          this.homeworkId = res.data;
          if (this.showindex == 2) {
            this.goPublish();
          } else {
            this.$message({
              message: "保存成功!",
              type: "success"
            });
            this.showBox = false;
            // this.$router.push({ path: "/homeCommon/workCenter" });
          }
        }
      });
    },
    //发布
    // questions(form, e) {
    //   if (this.homeworkId) {
    //     this.goPublish();
    //     return;
    //   }
    //   this.$refs["ruleForm2"].validate(valid => {
    //     if (valid) {
    //       if (!this.showType) {
    //         this.$message({
    //           message: "请选择展示类型名称",
    //           type: "error"
    //         });
    //         return false;
    //       } else if (!this.workTypeName) {
    //         this.$message({
    //           message: "请选择作业类型名称",
    //           type: "error"
    //         });
    //         return false;
    //       } else if (!this.ruleForm2.number) {
    //         this.$message({
    //           message: "请输入预计用时",
    //           type: "error"
    //         });
    //         return false;
    //       } else if (!this.workTypeName) {
    //         this.$message({
    //           message: "请选择作业类型名称",
    //           type: "error"
    //         });
    //         return false;
    //       } else if (!this.$refs.selection.selectedLabel) {
    //         this.$message({
    //           message: "请选择专题",
    //           type: "error"
    //         });
    //         return false;
    //       }
    //       let data = {
    //         pid: this.pid,
    //         name: this.$store.state.homeworkTitle,
    //         showType: this.showType,
    //         type: this.workTypeName,
    //         level: this.levels,
    //         subject: sessionStorage.getItem("subjectName"),
    //         expectTime: this.ruleForm2.number,
    //         topic: this.$refs.selection.selectedLabel
    //       };
    //       if (this.list != null) {
    //         data.questionIds = this.workId;
    //         data.total = sessionStorage.getItem("total");
    //       } else if (this.list == null) {
    //         data.total = this.questionsConter.score;
    //         data.questionIds = this.questionsConter.id;
    //       }
    //       //  console.log(this.teamId);
    //       this.$post("/user/homework/insert", data).then(res => {
    //         if (res.code == "5000") {
    //           //  this.teamId = JSON.parse(JSON.stringify(this.teamIds));
    //           //   console.log(this.teamId);

    //           if (this.showindex == 2) {
    //             // if (!this.canCorrect) {
    //             //   this.$message({
    //             //     message: "请选择组别",
    //             //     type: "error"
    //             //   });
    //             //   return false;
    //             // } else if (!this.classId) {
    //             //   this.$message({
    //             //     message: "请选择班级",
    //             //     type: "error"
    //             //   });
    //             //   return false;
    //             // }
    //             let datas = {
    //               classId: this.classIds,
    //               homeworkId: res.data,
    //               groupIds: this.teamId,
    //               canCorrect: this.canCorrect,
    //               lastSubmitTime: this.chooresTime
    //             };
    //             this.$post("/user/homework/publish", datas).then(res => {
    //               if (res.code == "5000") {
    //                 // Util.$emit("classId", this.classIds);
    //                 this.$message({
    //                   message: "发布作业成功!",
    //                   type: "success"
    //                 });
    //                 sessionStorage.removeItem("workId");
    //                 sessionStorage.removeItem("list");
    //                 this.$store.commit("setAllproblemslist", []);
    //                 this.$router.push({ path: "/homeCommon/workCenter" });
    //               }
    //             });
    //           } else {
    //             this.$message({
    //               message: "保存成功!",
    //               type: "success"
    //             });
    //             this.showBox = false;
    //             this.$router.push({ path: "/homeCommon/workCenter" });
    //           }
    //         }
    //       });
    //     }
    //   });
    // },

    release() {
      this.show = !this.show;
    },
    // 根据id发布作业接口

    // 获取题目全部题型接口

    nandu(e, callback) {
      this.difficulty.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    shijian(e, callback) {
      this.time.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    mubiao(e, callback) {
      this.target.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    leixing(e, callback) {
      this.types.forEach((item, index) => {
        if (item.id == e) {
          callback(index);
        }
      });
    }
    // 根据id查询作业详情接口
  }
};
</script>
<style lang="less">
.subject {
  background: #fff;
  padding-bottom: 20px;
  .import-out {
    width: 80%;
    margin: 0 auto;
    .myquerstionBox {
      margin-top: 81px;
      width: 100%;
      height: auto;
      span {
        font-size: 12px;
      }
      .questionBox {
        /*height: 140px;*/
        width: 830px;
        border: 1px solid #eee;
        margin: 0 auto;
        margin-bottom: 13px;
        .questionItem {
          border-bottom: 1px dashed #eee;
          padding: 3px 5px;
          .daoru {
            color: #fff;
            background-color: #f25c29;
            padding: 2px 4px;

            border-radius: 2px;
          }
          .code {
            color: #f25c29;
          }
        }
        .questionConter {
          min-height: 100px;
        }
        .footbtn {
          background: #f5f7fa;
          border-top: 1px solid #f5f7fa;
          .footbtn_right {
            padding-right: 10px;
            float: right;
          }
        }
      }
    }
    .title {
      // text-align: center;
      margin-bottom: 10px;
      font-size: 18px;
      color: #333;
      padding-top: 20px;
    }
  }
}
.confirms {
  background: #fff;
  padding-bottom: 20px;
  text-align: center;
  .myBtn {
    background-color: #159484;
    border: none;
  }
  .myBtn1 {
    background-color: #f25c29;
    border: none;
  }
}
.show {
  position: absolute;
  width: 375px;
  padding-bottom: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%;-50%);
  background-color: #fff;
  z-index: 100;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  .showItem {
    margin: 20px 20px 10px 55px;
  }
}
.layer {
  .model {
    width: 700px;
    .arrangement {
      width: 100%;
      background: #ffffff;
      margin: 0 20px;
      padding: 0 20px;
      box-sizing: border-box;
      .yzm {
        .el-select {
          width: 80%;
        }
        .el-button {
          right: 0;
        }
      }
      .el-select {
        width: 100%;
      }
      .tit {
        position: relative;
        img {
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 0;
          width: 25px;
          height: 25px;
        }
      }
      .details {
        margin: 20px;
      }
      .con {
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>
