<template>
  <div class="SharingBoxS">
    <!-- <el-container>
      <el-header height="23%" style="margin-bottom:30px">
        <grade />
      </el-header>
      <el-aside width="15%" style="display: inline-block;">
        <subject />
      </el-aside>
      <el-main class="main">
        <div class="homeWorkList"></div>
      </el-main>
    </el-container>-->
    <div class="container">
      <div class="heard">
        <!-- <grade /> -->
      </div>
      <div class="left">
        <subject :addShow="true" class="subj" />
      </div>
      <div class="right">
        <div class="imgbox">
          <img src="../../../../static/images/微信图片_20191205174809.png" alt />
          <div style="margin-left:20px">
            <label for>选择班级：</label>
            <el-select
              v-model="className"
              size="small"
              clearable
              placeholder="请选择班级"
              id="select"
              style="margin-right:10px"
              @change="getClassId"
            >
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="workList">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8">
                <td style="color:#2ab8b3;font-size:16px;padding:5px">序号</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">作业名称</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">展示类型</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">作业类型</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">来源</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">时间</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in hwlist"
                :key="index"
                @click="chooseHomework(item)"
                class="trHover"
              >
                <td style="padding:10px">{{ index + 1 }}</td>
                <td style="padding:10px;color:#f88869">{{ item.name }}</td>
                <td style="padding:10px">{{ item.showType }}</td>
                <td style="padding:10px">{{ item.type }}</td>
                <td style="padding:10px">{{ item.topic }}</td>
                <td style="padding:10px">{{ item.createTime }}</td>
              </tr>
            </tbody>
          </table>
          <paginationVue class="page" />
        </div>
      </div>
    </div>
    <div class="takeWork">
      <div class="homeWork">
        <img src="../../../../static/images/作业状态.png" alt />
        <div class="NumBox">
          <span>已交：{{yijiao}}人</span>
          <span>未交：{{weijiao}}人</span>
          <span>已批改：{{yipigai}}人</span>
        </div>
      </div>
      <div class="yijiao">
        <div class="takeName">学生列表:</div>
        <div class="imgBox">
          <div
            class="ListBox"
            v-for="(item, index) in sutList"
            :key="index"
            @click="getStuId(item)"
          >
            <a href=" javascript: void ( 0 ); ">
              <img :src="item.avatar" alt />
              <span>{{ item.username }}</span>
              <span class="pigai">
                {{
                item.state == 0
                ? "未提交"
                : item.state == 1
                ? "未批改"
                : "已批改"
                }}
              </span>
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="yijiao">
        <div class="takeName">未交作业的学生:</div>
        <div class="imgBox">
          <div class="ListBox" v-for="(item, index) in list" :key="index">
            <img src="../../../../static/images/erweima2.jpg" alt />
            <span>小陈</span>
          </div>
        </div>
      </div>-->
    </div>
    <!-- <div class="homeWorks" id="homeWork">
      <div class="myimg">
        <img src="../../../../static/images/作业批改.png" alt />
      </div>
      <div v-for="(item, index) in homeworkList" :key="index">
        <div class="work">
          <div class="workTitle">
            <span class="daoru">导入</span>
            <span class="code">此题编码:{{ item.code }}</span>
            <span class="number">此题分值:{{ item.score }}</span>
          </div>
          <div class="workConten">
            <span style="float:left;">题目内容:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="conten">
              <span v-if="homeworkList.length<1">{{item.content}}</span>
              <span v-if="homeworkList.length>0">
                <span v-html="item.content"></span>
              </span>
            </span>
          </div>
          <div class="workAnswer">
            <span style="color:#2bb7b3;display:block">正确答案:</span>
            <el-input
              style="width:600px;"
              placeholder="正确答案"
              :disabled="true"
              v-if="homeworkList.length>1"
              v-html="item.answer"
            ></el-input>
            <el-input
              style="width:600px;"
              placeholder="正确答案"
              :disabled="true"
              v-if="homeworkList.length<1"
              v-model="item.answer"
            ></el-input>
            <span style="color:#2bb7b3;display:block">解析:</span>
            <el-input
              style="width:600px;"
              placeholder="解析"
              :disabled="true"
              v-html=" resolutions[index]"
            ></el-input>
            <span style="color:#2bb7b3;display:block">学生回答:</span>
            <el-input
              style="width:600px;"
              type="textarea"
              :rows="3"
              placeholder="学生回答"
              :disabled="true"
              v-model="item.studentAnswer"
            ></el-input>
            <span style="color:#2bb7b3;display:block">教师评分:</span>
            <el-input
              placeholder="教师评分"
              v-model="teacherNumber[index]"
              style="width:600px;"
              @blur="toEvaluate(item,index)"
            ></el-input>
            <el-input
              style="width:600px;margin-top:20px"
              type="textarea"
              :rows="3"
              placeholder="教师解析"
              :disabled="true"
              v-model="teachertAnswer[index]"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="answerBtn">
        <el-button
          size="mini"
          style="background-color:#fb8b22;color:#fff;margin-top:3px;margin-left:50%"
          @click="evaluate()"
        >确定</el-button>
      </div>
    </div>-->
  </div>
</template>

<script>
import grade from "@/components/grade/grade.vue";
import subject from "@/components/grade/subject.vue";
import Utils from "../../../../static/js/util";
import paginationVue from "../../../components/pagination/pagination.vue";

export default {
  components: {
    paginationVue,
    subject,
    grade,
    Utils
  },
  data() {
    return {
      resolutions: [],
      className: "", //班级姓名
      classList: [], //班级列表
      classId: 0, //班级ID
      list: [],
      hwlist: [],
      subjectId: "", //学科id
      textbookId: sessionStorage.getItem("textid"), //教科书id
      chapterId: "", //章id
      barId: "", //节id
      sutList: [1], //学生列表
      pageSize: 1,
      pageNum: 1,
      total: 0,
      value4: "",
      workID: 0, //作业id
      stuId: 0,
      homeworkList: [1],
      teacherNumber: [], //教师评分
      teachertAnswer: [], //教师解析
      answerPepole: 0, //未交人数
      swerPepole: 0, //已交人数
      weijiao: 0,
      yijiao: 0,
      yipigai: 0
    };
  },
  created() {
    if (this.$route.query.classid != "" && this.$route.query.wokrId != "") {
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
      });
      this.className = this.$route.query.classid;
      this.classId = this.$route.query.classid;
      this.workID = this.$route.query.wokrId;
      var that = this;
      setTimeout(function() {
        that.getClassId();
        that.getHomework(that.workID);
        console.log(that.classId, "this.classId");
      }, 1000);
    }
  },
  mounted() {
    this.getClass();
    this.queryClassHomework();
    Utils.$on("getData", res => {
      this.chapterId = res.id;
      this.queryClassHomework();
    });
  },
  methods: {
    //点击作业列表
    chooseHomework(item) {
      console.log(item, "itemssssss_chooseHomework");
      this.workID = item.id;
      //  console.log(this.workID);
      if (!this.classId) {
        this.$message("请先选择班级");
        return false;
      }
      this.getHomework(item.id);
    },
    //获取班级
    getClass() {
      this.$post("/user/classes/query", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          this.classList = res.data;
          console.log(this.classList);
        }
      });
    },
    //获取班级Id
    getClassId(e) {
      console.log(e, "getClassId");
      this.classId = e;
      this.queryClassHomework();
    },
    //获取作业列表
    queryClassHomework() {
      Utils.$on("subjectId", res => {});
      this.hwlist = [];
      let data = {
        pid: this.chapterId,
        subjectId: sessionStorage.getItem("subjectId"),
        indexNo: this.pageNum,
        rows: 10
      };
      if (this.classId != 0) {
        data.classId = this.classId;
      }
      this.$get("/user/homework/findListByPid", data).then(response => {
        if (response.code == "5000") {
          this.hwlist = response.data.date;
          console.log(this.hwlist);

          this.pageNum = response.data.pageNum;
        }
      });
    },
    //获取作业批改状态
    getHomework(workId) {
      if (this.$route.query.classid != undefined) {
        this.classId = this.$route.query.classid;
      }
      console.log(this.classId, "getHomework=============");
      let data = { id: workId, classId: this.classId };

      this.$get("/user/homework/findHomeworkState", data).then(res => {
        if (res.code == "5000") {
          this.sutList = res.data.list;
          var weijiao = 0;
          var yijiao = 0;
          var yipigai = 0;
          this.sutList.forEach(element => {
            if (element.state == 0) {
              ++weijiao;
            }
            if (element.state == 1) {
              ++yijiao;
            }
            if (element.state == 2) {
              ++yipigai;
            }
          });
          this.weijiao = weijiao;
          this.yijiao = yijiao;
          this.yipigai = yipigai;
        }
      });
    },
    //获取学生id
    getStuId(item) {
      this.$router.push({
        path: "/homeCommon/workCenter/readhomework",
        query: {
          sid: item.id,
          wokrId: this.workID,
          classid: this.className
        }
      });
      //  console.log(item.id);
      // this.stuId = item.id;
      // this.getHomeworkDetail(item.id);
    },
    //获取学生作业详情
    // getHomeworkDetail(id) {
    //   this.$get("/user/homework/findHomeworkCorrectDetail", {
    //     id: this.workID,
    //     userId: id
    //   }).then(res => {
    //     if (res.code == "5000") {
    //       console.log(res.data);

    //       this.homeworkList = res.data;
    //       var len = this.homeworkList.length;
    //       for (let i = 0; i < len; i++) {
    //         this.teacherNumber.push("");
    //         this.teachertAnswer.push("");
    //         console.log(this.homeworkList[i]);
    //         console.log(this.homeworkList[i].resolution);
    //         if (
    //           this.homeworkList[i].resolution.split("||||")[1] == "undefined" ||
    //           this.homeworkList[i].resolution.split("||||")[1] == ""
    //         ) {
    //           this.teachertAnswer[i].push("");
    //         } else {
    //           this.teachertAnswer[i] = this.homeworkList[i].resolution.split(
    //             "||||"
    //           )[1];
    //         }

    //         if (
    //           this.homeworkList[i].resolution.split("||||")[0] == "undefined" ||
    //           this.homeworkList[i].resolution.split("||||")[0] == ""
    //         ) {
    //           this.resolutions[i].push("");
    //         } else {
    //           this.resolutions[i] = this.homeworkList[i].resolution.split(
    //             "||||"
    //           )[0];
    //         }

    //         this.teacherNumber[i] = this.homeworkList[i].studentScore;
    //       }
    //     }
    //   });
    // },
    //教师评分
    toEvaluate(item, index) {
      // console.log(item, index);
      console.log(this.teacherNumber[index]);
      let data = { id: item.id, score: this.teacherNumber[index] };
      this.$post("/user/homework/giveScore", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "完成评分" });
        }
      });
    },
    //完成评价
    evaluate() {
      let data = { id: this.workID, userId: this.stuId };
      this.$post("/user/homework/finishScore", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "批改完成" });
          this.$router.push({ path: "/homeCommon/workCenter" });
        } else {
          this.$message({ type: erroe, message: res.message });
        }
      });
    }
  }
};
</script>

<style lang="less">
.SharingBoxS {
  .container {
    overflow: hidden;
    .left {
      width: 18%;
      height: 614px;
      display: inline-block;
      float: left;
      .subj {
        height: 100%;
      }
    }
    .right {
      background-color: #fff;
      display: inline-block;
      width: 81%;
      min-height: 580px;
      // border: 1px solid #bbb;
      overflow: hidden;
      float: right;
      #select {
        width: 150px;
      }
      .page {
        position: relative;
        right: -350px;
        bottom: 20px;
      }
      .imgbox {
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 15px 0 15px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .workList {
        text-align: center;
        padding: 15px;
        table {
          width: 100%;
          .trHover:hover {
            background-color: #faf1ed;
            cursor: pointer;
          }
        }
      }
    }
  }

  .takeWork {
    margin-top: 20px;
    border-top: 10px solid #f8f8f8;
    width: 100%;
    background-color: #fff;
    margin-bottom: 50px;
    .homeWork {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      background-color: #faf1ed;
      img {
        width: 110px;
        height: 30px;
        margin-top: 13px;
      }
      .NumBox {
        flex: 1;
        text-align: center;
        line-height: 56px;
        span {
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }
    .yijiao {
      width: 100%;
      height: 50%;
      border-bottom: 1px solid #f7f5f1;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .takeName {
        width: 10%;
        text-align: center;
        border: 1px solid #f7f5f1;
        padding-top: 40px;
        font-size: 18px;
        color: #ff8500;
      }
      .imgBox {
        flex: 1;
        .pigai {
          display: block;
          width: 50px;
          margin: 0 auto;
          //    padding: 3px;
          border: 1px solid #2bb3ba;
          color: #2bb3ba;
        }
        .ListBox {
          width: 15%;
          padding: 8px;
          float: left;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .homeWorks {
    margin-top: 20px;
    border-left: 10px solid #f8f8f8;
    display: inline-block;
    padding: 10px;
    background-color: #fff;
    flex: 1;
    width: 100%;
    .title {
      text-align: center;
      font-size: 22px;
      color: #f25c29;
    }
    .work {
      padding: 15px;
      background-color: #fff;
      width: 80%;
      height: auto;
      margin: 10px auto;
      border: 1px solid #eee;
      .workTitle {
        border-bottom: 1px dashed #eee;
        .daoru {
          font-size: 14px;
          color: #fff;
          background-color: #2bb7b3;
          padding: 2px 4px;
        }
        .code {
          color: rgb(251, 139, 34);
          font-size: 14px;
        }
        .number {
          margin-left: 60%;
        }
      }
      .workConten {
        padding-top: 15px;

        height: 180px;
        width: 100%;
        overflow: auto;
        border-bottom: 1px solid #eee;
        .conten {
          display: inline-block;
          width: 88%;
          height: 90%;
          border: 1px solid #eee;
          padding: 20px;
        }
      }
      .workAnswer {
        padding-top: 30px;
        padding-left: 10%;
      }
    }
    .btns {
      float: right;
      margin-right: 97px;
      margin-top: 15px;
    }
  }
}
</style>
