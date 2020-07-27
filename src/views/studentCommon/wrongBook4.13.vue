<template>
  <div class="home">
    <div class="bgcBox">
      <img
        src="https://alipic.lanhuapp.com/ps2b0b9c71283f5585-fbf5-4ec2-bbf8-2b432ed19007?x-oss-process=image/format,webp"
        alt
      />
    </div>
    <div class="classList mt72 bf bx">
      <div class="bigBox">
        <div class="boxLeft">
          <div class="xueke">
            <el-select v-model="SubjectName" placeholder="请选择学科" @change="getSubjectId">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="three">
            <subject />
          </div>
          <div class="threeBtn">
            <el-button
              style="background-color:#2ab8b3;color:#fff;border:0"
              @click="Towrongbooklist"
            >章错题重考</el-button>
            <el-button
              style="background-color:#ff8b00;color:#fff;border:0"
              @click="correctWrongChapters"
            >错题转正</el-button>
            <el-button
              style="background-color:rgb(84, 198, 220);color:#fff;border:0"
              @click="Towrongbooksame"
            >自助出题</el-button>
          </div>
        </div>
        <div class="boxRight">
          <div class="tupu">
            <knowledge style="width:100%;height:700px" />
            <!-- <img src="../../../static/images/tupu.png" alt /> -->
          </div>
          <div class="myChoores">
            <span>错题原因:</span>
            <el-checkbox-group v-model="checkList" class="choores" @change="findStudentAnswerWrong">
              <!-- <el-checkbox label="知识记忆"></el-checkbox>
              <el-checkbox label="粗心大意"></el-checkbox>
              <el-checkbox label="运算能力"></el-checkbox>
              <el-checkbox label="逻辑混乱"></el-checkbox>
              <el-checkbox label="阅读能力"></el-checkbox>-->
              <el-checkbox
                v-for="(item,index) in wrongReath"
                :label="item.id"
                :value="item.id"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="myWrong">
            <div class="myWrongList" v-for="(itemx,indexx) in  answerWrong" :key="indexx">
              <p class="number">{{indexx+1}}.编号:{{itemx.code}}</p>
              <div style="padding:0 0 15px  15px;" v-html="itemx.content"></div>
              <!--              <img src="../../../static/images/题目.jpg" alt />-->
              <div class="worngTime">
                <span>来源:陈老师</span>
                <span style="margin-left:30px">答题时间:{{itemx.answerTime}}</span>
                <div class="myWrongBtn" v-for="(item, index) in wrongBtn" :key="index">
                  <el-button @click="ToWork(index, item,itemx.id,itemx)">{{ item.name }}</el-button>
                </div>
              </div>
              <div class="myAnswer" v-if="itemx.analysis===true">
                <div class="answerBox">
                  <img :src="itemx.url" alt />
                  <!--                  <p>-->
                  <!--                    <i class="el-icon-caret-right"></i>-->
                  <!--                    <span>我的答案：A</span>-->
                  <!--                  </p>-->
                  <!--                  <p>-->
                  <!--                    <i class="el-icon-caret-right"></i>-->
                  <!--                    <span style="color:#2ab8b3">正确答案：B</span>-->
                  <!--                  </p>-->
                </div>
                <p class="jiexi">
                  <i class="el-icon-caret-right"></i>
                  <span>解析：</span>
                  <span>{{itemx.type}}</span>
                  <!--                  <img src="../../../static/images/解析.png" alt />-->
                </p>
              </div>
              <div class="myAnswers" v-if="itemx.Tagging===true">
                <div class="answerBox">
                  <p style="margin-bottom:10px">
                    <i class="el-icon-caret-right"></i>
                    <span>我的标注：</span>
                  </p>
                  <el-checkbox-group v-model="checkList" class="choores">
                    <el-checkbox label="1">知识记忆</el-checkbox>
                    <el-checkbox label="2">粗心大意</el-checkbox>
                    <el-checkbox label="3">运算能力</el-checkbox>
                    <el-checkbox label="4">逻辑混乱</el-checkbox>
                    <el-checkbox label="5">阅读能力</el-checkbox>
                  </el-checkbox-group>
                </div>
                <el-button class="myWrongbtn" @click="errorMarking(itemx.id)">提交</el-button>
              </div>
              <div class="myAnswers" v-if="itemx.redo===true">
                <div class="answerBox">
                  <p style="margin-bottom:10px">
                    <i class="el-icon-caret-right"></i>
                    <span>类似题目：</span>
                  </p>

                  <div v-for="(itemed,indexd) in samelist" class="work">
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
                        v-model="values[indexd]"
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
                        v-model="workAnswer[indexd]"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject from "../../components/grade/subject";
import knowledge from "../../views/homeCommon/resourceTools/sb4";
import Utils from "../../../static/js/util";

export default {
  components: {
    knowledge,
    subject
  },
  data() {
    return {
      options: [
        { value: "A", id: 1 },
        { value: "B", id: 2 },
        { value: "C", id: 3 },
        { value: "D", id: 4 }
      ],
      workAnswer: [], //回答作业
      values: [],
      samelist: [],
      answerWrong: [],
      analysis: true, //解析框
      Tagging: false, //错题标注
      redo: false,
      input: "", //标注
      wrongBtn: [
        { name: "错题转正", index: 0 },
        { name: "相似重做", index: 1 },
        { name: "错因标注", index: 2 },
        { name: "错题解析", index: 3 }
      ],
      checkList: [],
      teacherList: [], //学科列表
      SubjectName: "",
      SubjectId: "", //学科ID
      data: [
        {
          label: "章",
          children: [
            {
              label: "节",
              children: [
                {
                  label: "单元"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      List: [
        {
          index: 1,
          labels: "完整图谱"
        },
        {
          index: 2,
          labels: "单元图谱"
        },
        {
          index: 3,
          labels: "作业图谱"
        }
      ],
      list1: [
        {
          index: 1,
          label: "未完成"
        },
        {
          index: 2,
          label: "已完成"
        }
      ],
      num: 0,
      num2: 0,
      selectedOptions: [],
      wrongReath: [
        { name: "知识记忆", id: 1 },
        { name: "粗心大意", id: 2 },
        { name: "运算能力", id: 3 },
        { name: "逻辑混乱", id: 4 },
        { name: "阅读能力", id: 5 }
      ]
    };
  },
  created() {
    var that = this;
    that.getSubject();
    that.findStudentAnswerWrong(); //查询学生的错题
    Utils.$on("getData", function(msg) {
      that.pids = msg.id;
    });
  },
  watch: {
    pids: function() {
      //   console.log(this.pids);
    }
  },
  methods: {
    //章错题转正
    correctWrongChapters() {
      let data = { textbookDetailId: this.pids };
      this.$post("/user/homework/answer/correctWrongChapters", data).then(
        res => {
          if (res.code == "5000") {
            this.$message({
              showClose: true,
              message: "转正成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        }
      );
    },
    //学生回答
    stundentAnswer(item, index) {
      if (this.workAnswer == "") {
        this.$message({
          showClose: true,
          message: "回答不能为空",
          type: "error"
        });
        return false;
      }
      let data = { questionId: item.id, answer: this.workAnswer[index] };

      this.$post("/user/homework/answer/answerQuestion", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "提交成功" });
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
    },
    errorMarking(id) {
      if (this.checkList == "") {
        this.$message({
          showClose: true,
          message: "请标准您的错题",
          type: "error"
        });
        return false;
      }
      let data = { id: id, type: this.checkList.join(",") };
      this.$post("/user/homework/answer/errorMarking", data).then(res => {
        console.log(res);
        // if(res.code = '5000'){
        this.$message({
          showClose: true,
          message: "提交成功",
          type: "success"
        });
        // }
      });
    }, //错误标注
    findStudentAnswerWrong() {
      let data = {
        subjectId: this.SubjectId,
        wrongReasonType: this.checkList.join(",")
      };
      this.$get("/user/homework/answer/findStudentAnswerWrong", data).then(
        res => {
          if ((res.code = "5000")) {
            res.data.forEach((item, index) => {
              item.Tagging = false;
              item.analysis = true;
              item.redo = false;
            });
            this.answerWrong = res.data;
          }
        }
      );
    }, //查询学生的错题

    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;
      this.findStudentAnswerWrong();
      Utils.$emit("subjectIds", value);
    },
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.SubjectName = res.data[1].id;
        Utils.$emit("subjectIds", this.SubjectName);
        // console.log(this.SubjectName);
      });
    },
    Towrongbooklist() {
      this.$router.push("/studentCommon/wrongbooklist");
    },
    Towrongbooksame() {
      this.$router.push("/studentCommon/wrongbooksame");
    }, //自助出题
    Tochart(index, item) {
      this.num = index;
    },
    ToWork(index, item, id, itemx) {
      this.num2 = index;
      let data = { id: id };
      if (index == 1) {
        itemx.redo = !itemx.redo;
        itemx.analysis = false;
        itemx.Tagging = false;
        this.$get("/user/homework/question/findSameById", data).then(res => {
          if (res.code == "5000") {
            this.samelist = res.data;
          }
        });
      }
      if (index == 2) {
        itemx.Tagging = !itemx.Tagging;
        itemx.analysis = false;
        itemx.redo = false;
      }
      if (index == 3) {
        itemx.analysis = !itemx.analysis;
        itemx.redo = false;
        itemx.Tagging = false;
      }
      if (index == 0) {
        itemx.redo = false;
        itemx.Tagging = false;
        itemx.analysis = false;
        this.$post("/user/homework/answer/wrongTransferCard", data).then(
          res => {
            if (res.code == "5000") {
              this.$message({
                showClose: true,
                message: "转正成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: "error"
              });
            }
          }
        );
      }
    },
    handleChange(value) {
      // console.log(value);
    }
  }
};
</script>
<style lang="less" scoped>
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

.classList {
  border: 1px solid #eee;

  // padding: 15px 0px;
  .active {
    background: #2ab8b3;
    color: #fff;
  }

  .active2 {
    // background: #2ab8b3;
    // color: #fff;
    background-color: black;
  }

  .bigBox {
    width: 100%;
    height: 100%;
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // overflow: hidden;
    .boxLeft {
      width: 17%;
      // border-right: 1px solid #eee;
      padding: 10px;
      box-sizing: border-box;
      border-right: 10px solid #eee;

      .xueke {
        width: 100%;
        padding: 3px;
      }

      .three {
        padding: 10px 0px;
        border-top: 1px solid #eee;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
      }

      .threeBtn {
        button {
          margin-top: 15px;
          margin-left: 40px;
        }
      }
    }

    .boxRight {
      flex: 1;
      padding: 15px;

      .tupu {
        width: 95%;
        height: 700px;
        border: 1px solid #ccc;
        margin: 0 auto;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .myChoores {
        height: 90px;
        border-top: 1px solid #eee;
        margin: 0 25px;
        //  padding-top: 10px;
        line-height: 90px;

        .choores {
          display: inline-block;
          margin-left: 10px;
        }
      }

      .myWrong {
        margin: 0 30px;
        border: 1px solid #2ab8b3;

        .myWrongList {
          .number {
            margin-left: 15px;
            display: block;
            padding: 15px 0;
            color: #f2cca0;
          }

          .worngTime {
            height: 53px;
            background-color: #f8f8f8;
            line-height: 53px;
            padding-left: 15px;

            .myWrongBtn {
              height: 100%;
              float: right;
              background-color: #f8f8f8;

              button {
                height: 99%;
                margin-bottom: 2px;
                border: 0;
                border-right: 1px solid #eee;
              }
            }
          }

          .myAnswer {
            padding: 0px 15px;
            box-sizing: border-box;

            i {
              color: #febb50;
            }

            .answerBox {
              height: 95px;
              border-bottom: 1px solid #eee;
              line-height: 42.5px;
            }

            .jiexi {
              padding: 20px 0;
            }
          }

          .myAnswers {
            padding: 10px 15px;

            i {
              color: #febb50;
            }

            .myWrongbtn {
              background-color: #2ab8b3;
              color: #fff;
              border: 0;
              margin-top: 10px;
              margin-left: 93%;
            }
          }
        }
      }
    }
  }
}
</style>
