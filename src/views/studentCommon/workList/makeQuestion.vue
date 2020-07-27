<template>
  <div class="activityCenter mt72">
    <div class="homeWork" id="homeWork">
      <div class="myimg">
        <img src="../../../static/images/学生作业.png" alt />
      </div>
      <p class="title">作业: &nbsp;&nbsp;&nbsp; {{ homeWorkName }}</p>
      <div class="work" :id="'work'+index" v-for="(item, index) in homeworkList" :key="index">
        <div class="workTitle">
          <span class="daoru">导入</span>
          <span class="code">此题编码:{{item.code}}</span>
          <span class="number">分值:{{ item.score }}</span>
        </div>
        <div class="workConten">
          <span style="float:left;">题目内容:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span class="conten">
            <span>{{ item.typeName }}：</span>
            <span v-html="item.content"></span>
          </span>
        </div>
        <div class="workAnswer">
          <span style="color:#2bb7b3">学生回答:</span>
          <!-- <span v-if="item.typeName==='选择题'" style="margin-bottom:10px">{{item.studentAnswer}}</span> -->
          <el-select
            v-model="item.answer"
            placeholder="请选择"
            v-if="item.typeId==52"
            style="margin-bottom:10px"
          >
            <!-- @change="getAnswer" -->
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input type="textarea" :rows="6" placeholder="请输入答案" v-model="item.answer" v-else></el-input>
        </div>
        <div class="answerBtn">
          <!-- <el-button
                size="mini"
                style="background-color:#fb8b22;color:#fff;margin-top:3px;margin-left:90%"
                @click="stundentAnswer(item,index)"
          >确定</el-button>-->
        </div>
      </div>
      <div class="btns">
        <div class="dtk">
          <span
            @click="tiTiao(index)"
            :class="item.answer?'dtk_active dtk_item':'dtk_item'"
            v-for="(item,index) in this.homeworkList"
            :key="index"
          >{{index+1}}</span>
        </div>
        <el-button
          style="background-color: #ff8a00;color:#fff;border:0"
          @click="submitHomework(item)"
        >提交作业</el-button>
        <el-button style="background-color: #ff8a00;color:#fff;border:0">保存作业</el-button>
        <el-button style="background-color: #159484;color:#fff;border:0">学生自批</el-button>
        <el-button style="background-color: #ff8a00;color:#fff;border:0">分享</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from "../../../static/js/util";
import subject from "../../components/grade/subject";
import FullCalendar from "./FullCalendar.vue";
import eleCalendar from "ele-calendar";
import moment from "moment";
import "ele-calendar/dist/vue-calendar.css";
export default {
  components: {
    FullCalendar,
    eleCalendar,
    subject
  },
  data() {
    return {
      pagecount1: "",
      currentPage1: 1,
      typ_id: 0,
      selectType: [
        { id: 0, name: "全部" },
        { id: 1, name: "未提交" },
        { id: 2, name: "已提交" },
        { id: 3, name: "已批改" }
      ],
      homeworkList: [], //作业列表
      workAnswer: [], //回答作业
      workAnswes: "", //回答作业
      homeWorkId: "", //作业id
      SubjectName: "", //学科名
      SubjectId: 0, //学科id
      teacherList: [], //学科列表
      homeWorkName: "", //作业名称
      list: [],
      period: "", //学段
      allTotal: 1, //页数
      totalS: 1,
      sujectList: "",
      liid: -1,
      pid: "",
      value: new Date(),
      datedef: [
        { date: "2019-11-27", content: "ccc", cid: null },
        { date: "2019-11-29", content: "cccaaaa", cid: null }
      ],
      prop: "2020-2-28", //对应日期字段名,
      calendarData: [
        { months: ["2"], days: ["25"], things: "未完成" },
        { months: ["2"], days: ["26"], things: "未完成" },
        { months: ["2"], days: ["27"], things: "已完成" },
        { months: ["2"], days: ["28"], things: "已完成" },
        { months: ["2"], days: ["29"], things: "已完成" }
      ],
      options: [
        { value: "A", id: 1 },
        { value: "B", id: 2 },
        { value: "C", id: 3 },
        { value: "D", id: 4 }
      ],
      workDataList: [],
      chaxuntype: ""
    };
  },
  created() {
    this.getSubject();
    this.getDate();
    this.getSubjectId(5);
    // this.getworkList();
  },
  mounted() {
    this.getworkList();
    let that = this;
    Utils.$on("getData", function(msg) {
      that.pid = msg.id;
      that.getworkList();
    });
  },
  watch: {
    value(value) {
      this.getDate(
        moment(value)
          .locale("zh-cn")
          .format("YYYY-MM-DD")
      );
    }
  },
  methods: {
    change(value) {
      alert(value);
    },
    tiTiao(index) {
      document.getElementById(`work${index}`).scrollIntoView();
    },
    changeStatus(key, key2) {
      this.typ_id = key;
      if (key == 0) {
        this.chaxuntype = "";
        this.currentPage1 = 1;
        this.getworkList();
      }
      if (key == 1) {
        this.chaxuntype = 0;
        this.currentPage1 = 1;
        this.getworkList();
      }
      if (key == 2) {
        this.chaxuntype = 1;
        this.currentPage1 = 1;
        this.getworkList();
      }
      if (key == 3) {
        this.chaxuntype = 2;
        this.currentPage1 = 1;
        this.getworkList();
      }
    },
    getDateApi(date) {
      let data = { date, indexNo: 1, rows: 100 };
      this.$get("/user/homework/findListByDay", data).then(res => {
        if (res.code == 5000) {
          this.list = res.data.date;
          // this.allTotal = res.data.total;
          this.pagecount1 = res.data.count;
        }
      });
    },
    //获取当前选择答案
    getAnswer(value) {
      console.log(value);
      this.workAnswers = value;
      console.log(this.workAnswers);
    },
    //根据月份获取课程时间
    getDate(
      days = moment()
        .locale("zh-cn")
        .format("YYYY-MM-DD")
    ) {
      // var time = new Date();
      // var year = time.getFullYear(); //获取完整的年份(4位)
      // var mon = time.getMonth(); //获取当前月份(0-11,0代表1月)
      // var day = time.getDate(); //获取当前日(1-31)

      // var now = year + "-" + mon + "-" + day;
      let data = { date: days, indexNo: 1, rows: 100 };
      this.$get("/user/homework/findDateByMonth", data).then(res => {
        if (res.code == 5000) {
          this.workDataList = res.data;
        }
      });
    },
    renderContent(h, parmas) {
      //设置lunarcalendar=true,parmas返回值包含农历
      const loop = data => {
        return data.defvalue.value ? (
          <div>
            <div>{data.defvalue.text}</div>
            <span>备选项</span>
          </div>
        ) : (
          <div>{data.defvalue.text}</div>
        );
      };
      return <div style="min-height:60px;background:red">{loop(parmas)}</div>;
    },

    //获取作业列表
    getworkList(value) {
      let data = {
        subjectId: this.SubjectId,
        rows: 10,
        pid: this.pid,
        indexNo: this.currentPage1,
        state: this.chaxuntype
      };
      this.$get("/user/homework/findListBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.list = res.data.date;
          // this.allTotal = res.data.total;
          this.pagecount1 = res.data.count;
        }
      });
    },
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;
      this.getworkList();
      Utils.$emit("subjectIds", value);
    },
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.SubjectName = res.data[1].id;
        Utils.$emit("subjectIds", this.SubjectName);
      });
    },
    //页面变化
    handleCurrentChanges(val) {
      console.log(val, "handleCurrentChanges");
      this.currentPage1 = val;
      this.getworkList();
    },
    //获取作业id
    getWork(item) {
      this.homeWorkName = item.name;
      this.homeWorkId = item.id;
      document.getElementById("homeWork").scrollIntoView();
      this.getWorkByid();
    },
    // //获取月份
    // getMounth(item) {
    //   this.$get("/user/homework/findDateByMonth", {
    //     date: "2020-03-27",
    //     indexNo: 1,
    //     rows: 1
    //   }).then(res => {
    //     console.log(res);
    //   });
    // },
    //根据id获取作业
    getWorkByid() {
      this.$get("/user/homework/answer/findDetailById", {
        id: this.homeWorkId
      }).then(res => {
        if (res.code == "5000") {
          for (let i of res.data.list) {
            i.answer = "";
          }
          this.homeworkList = res.data.list;
        }
      });
    },
    //学生回答
    stundentAnswer(item, index) {
      let data = { questionId: item.id };
      if (this.workAnswers == "") {
        data.answer = this.workAnswer[index];
      } else if ((this.workAnswes = !"")) {
        data.answer = this.workAnswers;
      }
      this.$post("/user/homework/answer/answerQuestion", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "提交成功" });
        }
      });
    },
    //提交作业
    submitHomework() {
      // console.log(this.homeWorkId);
      console.log(this.homeworkList);
      let list = this.homeworkList.map(item => {
        return {
          questionId: item.id,
          answer: item.answer
        };
      });
      if (list.find(item => item.answer == "")) {
        this.$message("请检查是否有题目未答");
        return false;
      }
      let data = {
        homeworkId: this.homeWorkId,
        leftTime: 120,
        list
      };
      this.$axios
        .post(
          "http://data.ikeshen.com/homework/answer/intersectionHomework",
          data,
          {
            headers: {
              "JSON-TYPE": "1111"
            }
          }
        )
        .then(response => {
          if (response.data.code == "5000") {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.getworkList();
          } else {
            this.$message.error(response.data.message);
          }
        });
      // this.$posts("/homework/answer/intersectionHomework", data).then(res => {
      //   if (res.code == "5000") {
      //     this.$message({ type: "success", message: "提交成功" });
      //   }
      // });
    }
  }
};
</script>
<style lang="less">
.dtk {
  display: inline-block;
  margin-right: 15px;
}
.dtk_item {
  cursor: pointer;
  border: 1px solid black;
  padding: 5px 8px 5px 8px;
}
.dtk_active {
  background: rgb(236, 110, 81);
}
.homeWork {
  border-left: 10px solid #f8f8f8;
  display: inline-block;
  padding: 10px;
  background-color: #fff;
  flex: 1;
  height: auto;
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
        margin-left: 75%;
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
    }
  }
  .btns {
    float: right;
    margin-right: 97px;
    margin-top: 15px;
  }
}
</style>
