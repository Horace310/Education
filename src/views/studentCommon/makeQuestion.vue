<template>
  <div class="mt72 makeQuestion" style="position:relative">
    <div class="timeOut" v-if="state==0">
      <img src="../../../static/images/time_icon.jpg" alt />
      <p>已用时</p>
      <Time ref="time" />
      <div class="dtk">
        <span
          @click="tiTiao(index)"
          :class="item.studentAnswer?'dtk_active dtk_item':'dtk_item'"
          v-for="(item,index) in this.homeworkList"
          :key="index"
        >{{index+1}}</span>
      </div>
      <div class="timeBtn">
        <el-button
          size="mini"
          style="background-color: #ff8a00;color:#fff;border:0"
          @click="submitHomework(item)"
        >提交作业</el-button>
      </div>
      <div class="timeBtn">
        <el-button
          size="mini"
          style="background-color: #ff8a00;color:#fff;border:0"
          @click="saveHomework(item)"
        >保存作业</el-button>
      </div>
    </div>
    <div class="homeWork" id="homeWork">
      <div class="myimg">
        <img src="../../../static/images/学生作业.png" alt />
      </div>
      <goBack style="text-align:center" :direction="true" link="/studentCommon/activityCenter"></goBack>
      <p class="title">{{ name }}</p>
      <div style="display:flex;justify-content: center;margin-top:20px">
        <p
          class="title"
          style="color:black;font-size:15px;margin-right:20px"
        >作业总分：{{homeworkTotal}}分</p>
        <p
          v-if="state==2"
          class="title"
          style="color:black;font-size:15px;margin-right:20px"
        >得分：{{total}}分</p>
        <p v-if="state==2" class="title" style="color:black;font-size:15px;">用时：{{leftTime}}分钟</p>
      </div>
      <div class="work" :id="'work'+index" v-for="(item, index) in homeworkList" :key="index">
        <div class="workTitle" style="display:flex;justify-content: space-between">
          <!-- <span class="daoru">导入</span> -->
          <span class="code">此题编码:{{item.code}}</span>
          <div>
            <span class="number" v-if="state==2">得分:{{ item.studentScore }}</span>
            <span class="number" style="margin-left:20px">分值:{{ item.score }}</span>
          </div>
        </div>
        <div class="workConten">
          <span class="conten">
            <span>{{ item.typeName }}：</span>
            <span v-html="item.content"></span>
          </span>
        </div>
        <div v-if="state==2">
          <span style="color:#2bb7b3">答案：</span>
          <div style="border:1px solid #eee;min-height:50px;padding:10px" v-html="item.answer"></div>
        </div>
        <div class="workAnswer">
          <span style="color:#2bb7b3">学生回答：</span>
          <!-- <span v-if="item.typeName==='选择题'" style="margin-bottom:10px">{{item.studentAnswer}}</span> -->
          <el-select
            :disabled="state==2||state==1"
            v-model="item.studentAnswer"
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
          <quill-editor
            v-else
            :options="editorOption"
            v-model="item.studentAnswer"
            @focus="onEditorFocus($event)"
            style="width:100%"
          ></quill-editor>
          <!-- <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入答案"
            v-model="item.studentAnswer"
            v-else
          ></el-input>-->
        </div>
        <div class="answerBtn">
          <!-- <el-button
                size="mini"
                style="background-color:#fb8b22;color:#fff;margin-top:3px;margin-left:90%"
                @click="stundentAnswer(item,index)"
          >确定</el-button>-->
        </div>
      </div>
      <!-- <div class="btns">
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
      </div>-->
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
import Time from "./time";
import goBack from "@/components/common/goBack";
export default {
  components: {
    FullCalendar,
    eleCalendar,
    subject,
    Time,
    goBack
  },
  data() {
    return {
      state: "",
      homeworkTotal: "",
      total: "",
      leftTime: "",
      name: "",
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ font: [] }],
              ["image"] //上传图片、上传视频
            ]
          }
        }
      },
      options: [
        { value: "A", id: 1 },
        { value: "B", id: 2 },
        { value: "C", id: 3 },
        { value: "D", id: 4 }
      ],
      homeWorkId: "",
      homeworkList: [] //作业列表
    };
  },
  created() {
    this.homeWorkId = this.$route.query.homeWorkId;
    this.getWorkByid();
  },
  mounted() {},
  watch: {},
  methods: {
    onEditorFocus(event) {
      if (this.state != 0) {
        event.enable(false);
      }
    }, // 获得焦点事件
    tiTiao(index) {
      document.getElementById(`work${index}`).scrollIntoView();
    },
    getWorkByid() {
      this.$get("/user/homework/answer/findDetailById", {
        id: this.homeWorkId
      }).then(res => {
        if (res.code == "5000") {
          // for (let i of res.data.list) {
          //   i.answer = "";
          // }
          this.$refs.time.initTime(res.data.leftTime);
          this.state = res.data.state;
          this.name = res.data.name;
          this.total = res.data.total;
          this.leftTime = res.data.leftTime;
          this.homeworkTotal = res.data.list.reduce(function(prev, cur) {
            return prev + parseInt(cur.score);
          }, 0);
          this.homeworkList = res.data.list;
        }
      });
    },
    saveHomework() {
      let list = this.homeworkList.map(item => {
        return {
          questionId: item.id,
          answer: item.studentAnswer
        };
      });
      if (list.find(item => item.studentAnswer == "")) {
        this.$message("请检查是否有题目未答");
        return false;
      }
      let data = {
        homeworkId: this.homeWorkId,
        leftTime: this.$refs["time"].minutes + this.$refs["time"].hour * 60,
        list
      };
      this.$axios
        .post("http://data.ikeshen.com/homework/answer/saveHomework", data, {
          headers: {
            "JSON-TYPE": "1111"
          }
        })
        .then(response => {
          if (response.data.code == "5000") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              path: "/studentCommon/activityCenter",
              query: { homeWorkId: this.homeWorkId }
            });
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    //提交作业
    submitHomework() {
      let list = this.homeworkList.map(item => {
        return {
          questionId: item.id,
          answer: item.studentAnswer
        };
      });
      if (list.find(item => item.studentAnswer == "")) {
        this.$message("请检查是否有题目未答");
        return false;
      }
      let data = {
        homeworkId: this.homeWorkId,
        leftTime: this.$refs["time"].minutes + this.$refs["time"].hour * 60,
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
            this.$router.push({
              path: "/studentCommon/activityCenter",
              query: { homeWorkId: this.homeWorkId }
            });
          } else {
            this.$message.error(response.data.message);
          }
        });
    }
  }
};
</script>
<style lang="less">
.makeQuestion {
  .timeOut {
    box-sizing: border-box;
    padding: 15px 5px 0 5px;
    position: fixed;
    margin-left: -170px;
    margin-top: 120px;
    background: white;
    width: 170px;
    min-height: 300px;
    text-align: center;
    p {
      margin-top: 10px;
    }
  }
  .timeBtn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .dtk {
    display: inline-block;
    margin-right: 15px;
    word-wrap: break-word;
    line-height: 230%;
    width: 100%;
    word-break: normal;
  }
  .dtk_item {
    cursor: pointer;
    border: 1px solid #c0c0c0;
    padding: 5px 8px 5px 8px;
    box-sizing: border-box;
  }
  .dtk_active {
    background: rgb(236, 110, 81);
  }
  .homeWork {
    border-left: 10px solid #f8f8f8;
    padding: 10px;
    width: 1050px;
    background-color: #fff;
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
          // margin-left: 75%;
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
}
// @media (min-width: 1700px) {
//   .homeWork {
//     width: 1050px;
//   }
// }
</style>
