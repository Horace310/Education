<template>
  <div class="Analysis">
    <div class="container">
      <div class="heard">
        <!-- <grade /> -->
      </div>
      <div class="left">
        <subject :addShow="true" class="subj" />
      </div>
      <div class="right">
        <div class="imgbox">
          <img
            style="margin-right:20px"
            src="../../../../static/images/微信图片_20191205174809.png"
            alt
          />
          <span>选择班级：</span>
          <el-select
            style="margin-left:15px"
            v-model="classId"
            placeholder="请选择班级"
            size="small"
            clearable
            @change="getClassId"
          >
            <el-option
              v-for="item in studentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="workList">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8">
                <td style="color:#2ab8b3;font-size:16px;padding:5px">序号</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">作业名称</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">作业类型</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">难度</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">来源</td>
                <td style="color:#2ab8b3;font-size:16px;padding:5px">时间</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="cursor:pointer"
                v-for="(item,index) in hwlist "
                :key="index"
                @click="chooseHomework(item.id)"
                class="trHover"
              >
                <td style="padding:10px">{{ index+1 }}</td>
                <td style="padding:10px;color:#f88869">{{item.name}}</td>
                <td style="padding:10px">{{item.type}}</td>
                <td style="padding:10px">{{item.level}}</td>
                <td style="padding:10px">{{item.source}}</td>
                <td style="padding:10px">{{item.createTime}}</td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            layout="prev, pager, next"
            background
            :page-count="page.count"
            :current-page="page.page"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="takeWork">
      <el-dialog :visible.sync="dialogVisible" width="80%">
        <div class="homeWork">
          <img src="../../../../static/images/微信图片_20191205174831.png" alt />
        </div>
        <div class="workNum">
          <div class="listOne">
            <div class="listBoxs">
              <div class="border">
                <p>{{homeworkInfo.studentNum}}</p>
              </div>
              <span>
                <img src="../../../../static/images/总人数，用户.png" alt />
              </span>
              <span>总人数</span>
            </div>
          </div>
          <div class="listOne">
            <div class="listBoxs">
              <div class="border">
                <p>{{homeworkInfo.homeworkCommitNum}}</p>
              </div>
              <span>
                <img
                  src="../../../../static/images/未完成盘点任务是否允许开单.png"
                  alt
                  style="width:18px;height:14px"
                />
              </span>
              <span>已完成人数</span>
            </div>
          </div>
          <div class="listOne">
            <div class="listBoxs">
              <div class="border">
                <p>{{homeworkInfo.noHomeworkCommitNum}}</p>
              </div>
              <span>
                <img
                  src="../../../../static/images/未完成-流程-状态_jurassic.png"
                  alt
                  style="width:18px;height:14px"
                />
              </span>
              <span>未完成人数</span>
            </div>
          </div>
        </div>
        <div class="GradeBox">
          <div class="GradeOne">
            <div class="gradeImgBox">
              <img src="../../../../static/images/等级分布.png" alt />
            </div>
            <div class="tableBox">
              <table>
                <thead>
                  <tr style="background-color:#f9f9f9">
                    <!-- <td rowspan="2">班级</td> -->
                    <td
                      v-for="(item,index) in scoreRank"
                      :key="index"
                      colspan="2"
                      style="font-size:16px;font-weight: bold;"
                    >{{item.describe}}</td>
                    <!-- <td colspan="2" style="font-size:16px;font-weight: bold;">{{scoreRank_B.describe}}</td>
                  <td colspan="2" style="font-size:16px;font-weight: bold;">{{scoreRank_C.describe}}</td>
                    <td colspan="2" style="font-size:16px;font-weight: bold;">{{scoreRank_D.describe}}</td>-->
                  </tr>
                  <tr style="background-color:#f9f9f9">
                    <td
                      style="padding:5px"
                      v-for="i in (scoreRank.length?scoreRank.length*2:scoreRank.length)"
                      :key="i"
                    >{{i % 2==0?"占比":"人数"}}</td>
                  </tr>
                  <tr style="background-color:#f9f9f9">
                    <td
                      style="padding:5px"
                      v-for="(i,index) in tableList"
                      :key="index"
                    >{{index % 2==0?i.number:i.percent+"%"}}</td>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr style="background-color:#fff8f1;">
                  <td style="padding:6px">全部班级</td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
          <!-- 题目正确率 -->
          <div class="GradeOne">
            <div class="gradeImgBox">
              <img src="../../../../static/images/题目正确率.png" alt />
            </div>
            <div class="tableBox">
              <table>
                <thead>
                  <tr style="background-color:#f9f9f9">
                    <td>题号</td>
                    <td
                      style="padding:5px"
                      v-for="(item,index) in homeworkInfo.topicAnalyze"
                      :key="index"
                    >{{item.topicDescribe}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background-color:#fff8f1;">
                    <td>正确率</td>
                    <td
                      style="padding:5px"
                      v-for="(item,index) in homeworkInfo.topicAnalyze "
                      :key="index"
                    >{{item.correctPercent}}%</td>
                  </tr>
                  <tr style="background-color:#fff8f1;">
                    <td>错题人数</td>
                    <td
                      style="padding:5px"
                      v-for="(item,index) in homeworkInfo.topicAnalyze"
                      :key="index"
                    >{{item.countErrorNum}}人</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 学生正确率 -->
          <div class="GradeOne" v-if="false">
            <div class="gradeImgBox">
              <img src="../../../../static/images/学生正确率.png" alt />
            </div>
            <div class="tableBox">
              <table>
                <thead>
                  <tr style="background-color:#f9f9f9">
                    <td>姓名</td>
                    <td style="padding:5px" v-for="(item,index) in nums " :key index>陈老师</td>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background-color:#fff8f1;">
                    <td>正确率</td>
                    <td style="padding:5px" v-for="(item,index) in nums " :key="index">{{index+1}}%</td>
                  </tr>
                  <tr style="background-color:#fff8f1;">
                    <td>错题编号</td>
                    <td style="padding:5px" v-for="(item,index) in nums " :key="index">{{index+1}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import grade from "@/components/grade/grade.vue";
import subject from "@/components/grade/subject.vue";
import Utils from "../../../../static/js/util";

export default {
  components: {
    subject,
    grade,
    Utils
  },
  data() {
    return {
      dialogVisible: false, //显示弹出框
      list: [1, 1, 1, 1, 1, 1],
      nums: [],
      hwlist: [],
      subjectId: "", //学科id
      textbookId: sessionStorage.getItem("textid"), //教科书id
      chapterId: "", //章id
      barId: "", //节id
      pageSize: 1,
      pageNum: 1,
      total: 0,
      value4: "",
      classId: "",
      studentList: [],
      page: {
        page: 1,
        count: null
      },
      pid: "",
      homeworkInfo: {},
      scoreRank: {},
      scoreRank_A: {},
      scoreRank_B: {},
      scoreRank_C: {},
      scoreRank_D: {},
      tableList: [],
      className: ""
    };
  },
  mounted() {
    this.getnum();
    this.checkStudent();
    this.getSectionAndUnits();
  },
  methods: {
    //作业分析接口
    // /user/homework/achieve/info
    homeworkAnalusis(id) {
      if (!this.classId) {
        this.$message("请先选择班级");
        return false;
      }
      this.dialogVisible = true;
      this.$get("/user/homework/achieve/info", {
        classId: this.classId,
        homeworkId: id
      }).then(res => {
        if (res.code == 5000) {
          // this.homeworkInfo = res.data.homeworkInfo;
          this.homeworkInfo = res.data;
          this.scoreRank = res.data.scoreRank;
          let list = JSON.parse(JSON.stringify(this.scoreRank));
          let newList = [];
          for (let i of list) {
            newList.push(i);
            newList.push(i);
          }
          this.tableList = newList;
        }
      });
    },
    //选择某一个作业
    chooseHomework(id) {
      this.homeworkAnalusis(id);
    },
    //切换班级
    getClassId(e) {
      this.classId = e;
      this.studentList.forEach(item => {
        if (item.id == e) {
          this.className = item.name;
        }
      });
      this.checkHomework();
    },
    //获取子组件传过来的章节id
    getSectionAndUnits() {
      Utils.$on("getData", function(msg) {
        // console.log('analysis',msg)
        this.pid = msg.id;
      });
      this.checkHomework();
    },
    //分页查询
    currentChange(val) {
      this.page.page = val;
      this.checkHomework();
    },
    //查询作业

    checkHomework() {
      let data = {
        subjectId: sessionStorage.getItem("subjectId"),
        pid: this.pid,
        classId: this.classId,
        publish: 0, //查询已经发布的作业
        indexNo: this.page.page,
        rows: 10
      };
      this.$get("/user/homework/findListByPid", data).then(res => {
        if (res.code == 5000) {
          this.hwlist = res.data.date;
          this.page.count = res.data.count;
        }
      });
    },
    //查询学生
    checkStudent() {
      this.$post("/user/classes/query", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == 5000) {
          this.studentList = res.data;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getnum() {
      let num = 10;
      for (var i = 0; i < num; i++) {
        this.nums.push(i);
      }
    }
  }
};
</script>

<style lang="less">
.Analysis {
  .container {
    overflow: hidden;
    .left {
      width: 18%;
      height: 100%;
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
      // border: 1px solid #bbb;
      overflow: hidden;
      min-height: 560px;
      float: right;
      .page {
        position: relative;
        right: -350px;
        bottom: 20px;
      }
      .imgbox {
        width: 100%;
        padding: 15px 0 15px 0;
        border-bottom: 1px solid #eee;
      }
      .workList {
        text-align: center;
        padding: 15px;
        table {
          width: 100%;
          .trHover:hover {
            background-color: #faf1ed;
          }
        }
      }
    }
  }
  .takeWork {
    // border-top: 10px solid #f8f8f8;
    width: 100%;
    background-color: #fff;
    .GradeBox {
      margin-top: 10px;
      background-color: #fff;
      .GradeOne {
        border-bottom: 10px solid #f8f8f8;
        .gradeImgBox {
          .dropdown {
            margin-right: 150px;
            float: right;
            color: #fe8a00;
          }
        }
        .tableBox {
          margin-left: 240px;
          padding: 16px;
          position: relative;
          table {
            width: 70%;
            text-align: center;
            td {
              position: relative;
            }
          }
          .bubble {
            width: 150px;
            background-color: #655e53;
            border-radius: 15px;
            padding: 10px;
            position: absolute;
            right: 50%;
            top: 50%;
            span {
              color: #fff;
            }
          }
        }
      }
    }
    .homeWork {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      // background-color: #faf1ed;

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
    .workNum {
      width: 100%;
      height: 152px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .listOne {
        width: 33.33%;
        text-align: center;
        // padding: 30px;
        .listBoxs {
          border-right: 1px solid #eee;
          .border {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border-radius: 50%;
            background-color: #a8e2f6;
            p {
              font-size: 40px;
              line-height: 100px;
            }
          }
        }
      }
    }
  }
}
</style>