<template >
  <div class="mt72">
    <div class="myBox">
      <div class="boxLeft">
        <div class="xueke">
          <el-select v-model="value" placeholder="请选择学科" @change="getSubjectId">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <div class="subject">
            <subject />
          </div>
        </div>
      </div>
      <div class="boxRight">
        <div class="myImg">
          <img src="../../../static/images/章错题列表.png" alt />
          <span
            v-on:click="back"
            style="display: inline-block;border: 1px solid #eee;padding:6px 10px;cursor: pointer;float: right;margin: 20px 20px 0 0;"
          >返回</span>
        </div>
        <!--        <div class="backTo">-->
        <!--          -->
        <!--        </div>-->
        <div class="table">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8;">
                <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">作业名称</td>
                <!-- <td style="color:#fb8b22;font-size:16px;padding:5px">展现分类</td> -->
                <!-- <td style="color:#fb8b22;font-size:16px;padding:5px">作业类型</td> -->
                <!-- <td style="color:#fb8b22;font-size:16px;padding:5px">来源</td> -->
                <td style="color:#fb8b22;font-size:16px;padding:5px">时间</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in errorStamp"
                :key="index"
                style="margin-bottom:5px"
                class="trHover"
              >
                <td style="padding:10px;font-size:16px">{{ index + 1 }}</td>
                <td style="padding:10px;font-size:16px">
                  <a href="javascript:void(0);">{{item.name}}</a>
                </td>
                <!-- <td style="padding:10px;font-size:16px">{{item.showType}}</td> -->
                <!-- <td style="padding:10px;font-size:16px">{{item.type}}</td> -->
                <!-- <td style="padding:10px;font-size:16px">{{item.source}}</td> -->
                <td style="padding:10px;font-size:16px">{{item.resitTime}}</td>
              </tr>
            </tbody>
          </table>
          <!--          <el-pagination-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="100"-->
          <!--            class="page"-->
          <!--            style="color: #2ab8b3;"-->
          <!--          ></el-pagination>-->
        </div>
        <div class="testBox">
          <div class="testLeft">
            <div v-for="(itemed,indexd) in zhangFault" :key="indexd" class="work">
              <div class="workConten">
                <p class="number workTitle">{{indexd+1}}.编号:{{itemed.code}}</p>
                <div class="workConten">
                  <span style="float:left;">题目内容:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span class="conten">
                    <!--                          <span>{{ itemed.typeName }}：</span>-->
                    <span v-html="itemed.content"></span>
                  </span>
                </div>
              </div>
              <div class="workAnswer">
                <span style="color:#2bb7b3">学生回答:</span>
                <el-select
                  v-model="itemed.values"
                  placeholder="请选择"
                  v-if="itemed.typeName==='选择题'"
                  style="margin-bottom:10px"
                  @change="getAnswer"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入答案"
                  v-model="itemed.values"
                  v-else
                ></el-input>
              </div>
              <div class="answerBtn">
                <el-button
                  size="mini"
                  style="background-color:#fb8b22;color:#fff;margin-top:3px;margin-left:90%"
                  @click="stundentAnswer(itemed,indexd)"
                >确定</el-button>
              </div>
            </div>
            <!--            <img src="../../../static/images/test.png" alt />-->
          </div>
          <div class="testRight" style="height: 500px;">
            <el-button style="background-color:#2cb9ae;border:0;color:#fff;margin:30px auto">章错题自改</el-button>
            <el-button
              style="background-color:#ff8b00;border:0;color:#fff;margin:0px auto"
            >&nbsp;&nbsp;&nbsp;教师批改</el-button>
            <el-button
              style="background-color:#2cb9ae;border:0;color:#fff;margin:20px auto;display:block"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject from "../../components/grade/subject";
import Utils from "../../../static/js/util";
export default {
  components: {
    subject
  },
  data() {
    return {
      teacherList: [],
      errorStamp: [],
      value: "",
      SubjectId: "",
      zhangFault: [],
      workAnswer: "",
      values: "",
      options: [
        { value: "A", id: 1 },
        { value: "B", id: 2 },
        { value: "C", id: 3 },
        { value: "D", id: 4 }
      ]
    };
  },
  created() {
    var that = this;
    that.getSubject();
    that.findErrorStamp();
    Utils.$on("getData", function(msg) {
      that.pids = msg.id;
      that.findChapterSimilarity();
    });
  },
  watch: {
    pids: function() {
      //   console.log(this.pids);
    }
  },
  methods: {
    //学生回答
    stundentAnswer(item, index) {
      if (item.values == "") {
        this.$message({
          showClose: true,
          message: "回答不能为空",
          type: "error"
        });
        return false;
      }
      let data = {
        questionId: item.id,
        answer: item.values,
        sameId: item.sameId,
        storeId: item.storeId,
        code: item.code,
        content: item.content,
        resolution: item.resolution,
        score: item.score,
        difficulty: item.difficulty,
        timeType: item.timeType,
        target: item.target,
        sound: item.sound,
        sort: item.sort,
        type: item.type,
        txetName: item.txetName
      };

      this.$post("/user/homework/answer/resiSubmission", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "提交成功" });
          this.findErrorStamp();
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;

      Utils.$emit("subjectIds", value);
    },
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.value = res.data[1].id;
        Utils.$emit("subjectIds", this.value);
        // console.log(this.SubjectName);
      });
    },
    findErrorStamp() {
      let data = {};
      this.$get("/user/homework/answer/findWrongTopicResit", data).then(res => {
        if (res.code == "5000") {
          this.errorStamp = res.data;
        }
      });
    }, //查询有错误的章节
    findChapterSimilarity() {
      let data = { id: this.pids };
      this.$get("/user/homework/answer/findChapterSimilarity", data).then(
        res => {
          if (res.code == "5000") {
            this.zhangFault = res.data;
          }
        }
      );
    } //根据错误作业id查询错误题的相似题
  }
};
</script>
<style lang="less">
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
    /*height: 180px;*/
    width: 100%;
    overflow: auto;
    /*border-bottom: 1px solid #eee;*/

    .conten {
      display: inline-block;
      /*width: 88%;*/
      /*height: 90%;*/
      border: 1px solid #eee;
      padding: 20px;
    }
  }

  .workAnswer {
    padding-top: 30px;
  }
}
.mt72 {
  .myBox {
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .boxLeft {
      width: 208px;
      border-right: 10px solid #eee;
      .subject {
        border-top: 3px solid #eee;
      }
    }
    .boxRight {
      flex: 1;
      .myImg {
        height: 70px;
        img {
          margin-top: 20px;
        }
      }
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        // border: 1px solid #2ab8b3;
        //  margin-bottom: 15px;
        border-bottom: 10px solid #f8f8f8;
        table {
          width: 100%;
          height: 100%;
          // text-align: center;
          padding: 18px;
          .trHover:hover {
            background-color: #faf1ed;
          }
        }
        .page {
          position: relative;
          margin: 5px;
          right: -318px;
          bottom: 0;
        }
      }
      .testBox {
        display: flex;
        justify-content: space-between;
        .testLeft {
          flex: 1;
        }
        .testRight {
          border-left: 1px solid #eee;
          width: 194px;
          text-align: center;
        }
      }
    }
  }
}
</style>
