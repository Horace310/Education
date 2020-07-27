<template>
  <div class="library">
    <div class="box">
      <div class="right">
        <div style="width:45%">
          <div class="add_head">
            <div @click="tiao">
              <img src="../../../../static/images/daoru.png" alt />
              文件导入
            </div>
            <div>
              <img src="../../../../static/images/tk.png" alt />
              个人数据
            </div>
            <div style="border-top:2px solid red;">
              <img src="../../../../static/images/pp.png" alt />
              平台题库
            </div>
            <div>
              <img src="../../../../static/images/bb.png" alt />
              已往作业
            </div>
            <div>
              <img src="../../../../static/images/xx.png" alt />
              精品作业
            </div>
          </div>
          <div class="word" style="width:100%;min-height:600px">
            <div class="topic">
              <div class="titles">
                <el-button @click="chooseAll" :type="type2 == 0 ? 'warning' : ''">全部</el-button>
                <el-button
                  v-for="(item, index) in QuestionType"
                  :key="index"
                  :type="QuestionType2index == index ? 'warning' : ''"
                  @click="chooseType2(item, index)"
                >{{ item.name }}</el-button>
              </div>
              <div class="timu">
                <div class="list" v-for="(item, index) in tiku" :key="index">
                  <span class="index">{{ index + 1 }}、</span>
                  <div class="head" v-html="item.content"></div>
                  <div class="answer" v-html="item.answer"></div>

                  <div class="foot">
                    <p class="_left">
                      <span>
                        组卷:
                        <span style="color:#409eff;margin-right:25px">2.6W+</span>
                      </span>
                      <span>
                        作者:
                        <span style="color:#409eff;margin-right:25px">王学峰</span>
                      </span>
                      <span>
                        平均得分率:
                        <span style="color: rgb(251, 139, 34);;margin-right:25px">55.42%</span>
                      </span>
                    </p>
                    <p class="_right">
                      <span @click="addTest(item, index)" class="cursor">+试题篮</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="page">
                <!-- <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      :layout="layout"
                      :total="countPage"
                ></el-pagination>-->
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="import-out">
          <div class="title">已导入的试题</div>
          <div class="problem">
            <div class="example" v-for="(item, index) in problem" :key="index">
              <div class="number">
                <span>导入</span>
                此题编码:
                <!-- {{ item.code }} -->
                <i class="el-icon-question query" @mouseover="mouseOver" @mouseleave="mouseLeave"></i>
                <span class="Elastic" :style="Showblock">赋予每道题的编码实现智能化精准化</span>
              </div>

              <div class="test" v-html="item.content"></div>
              <div class="analysis">
                <div class="item">
                  <div class="label">答案:</div>
                  <div class="input">
                    <div
                      class="editDemo"
                      :id="'answer' + index"
                      contenteditable="true"
                      v-html="item.answer"
                    ></div>
                  </div>
                </div>
                <div class="item">
                  <div class="label">解析ss:</div>
                  <div class="input">
                    <div class="contentTitle">
                      <ul>
                        <li>
                          <i class="el-icon-picture"></i>
                          <input
                            type="file"
                            :id="'file_' + index"
                            @change="UploadImages"
                            placeholder="图片解析"
                          />
                        </li>
                        <el-input v-model="item.jiexi" placeholder="文本解析" @change="UploadImages2"></el-input>
                      </ul>
                    </div>
                    <div
                      :id="'content' + index"
                      contenteditable="true"
                      class="editDemo"
                      v-html="item.resolution"
                    ></div>
                  </div>
                </div>
                <div class="item">
                  <div class="label">分值:</div>
                  <div class="input">
                    <el-input v-model="item.questionScore" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="item nature">
                  <div class="label"></div>
                  <div class="sort">
                    <div class="li">
                      <!-- ssss -->
                      <div class="head">题目属性:</div>
                      <div class="btn">
                        <el-button style="background: #159484;color:#fff">{{item.typeName}}</el-button>
                        <!-- <el-button
                              v-for="(items, indexs) in QuestionType"
                              :key="indexs"
                              :class="
                                QuestionType2indexs == indexs ? 'choores' : ''
                              "
                              @click="chooseType(items, indexs)"
                        >{{ items.name }}</el-button>-->
                      </div>
                    </div>
                    <div class="li">
                      <div class="head">题目难度:</div>
                      <div class="btn">
                        <el-button
                          v-for="(items, indexs) in difficulty"
                          :class="{'active':item.num2 ==indexs } "
                          :key="indexs"
                          @click="chooseDifficulty(items, indexs,item,index)"
                        >{{ items.name }}</el-button>
                      </div>
                    </div>
                    <!-- <div class="li">
                          <div class="head">题目时间:</div>
                          <div class="btn">
                            <el-button
                              v-for="(items, indexs) in time"
                              :key="indexs"
                              :class="{ active: timeNum == indexs }"
                              @click="chooseTime(items, indexs)"
                            >{{ items.name }}</el-button>
                          </div>
                    </div>-->
                    <div class="li">
                      <div class="head">题目目标:</div>
                      <div class="btn">
                        <el-button
                          v-for="(items, indexs) in target"
                          :key="indexs"
                          :class="{ active: item.targetNum == indexs }"
                          @click="chooseTarget(items, indexs,item)"
                        >{{ items.name }}</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item Voice">
                  <!-- <div class="label">
                    选择输入语音:
                    <i class="el-icon-microphone" @click="setaudio"></i>
                  </div>-->
                  <div class="btn" v-if="item.audioUrl">
                    <div class="left">
                      <audio
                        v-show="item.audioUrl != ''"
                        :src="item.audioUrl"
                        controls="controls"
                        class="content-audio"
                        style="display: none;width:160px;height:30px;"
                      >语音</audio>
                      <el-slider
                        v-show="item.audioUrl == ''"
                        v-model="item.value1"
                        :max="max"
                        disabled
                      ></el-slider>
                      <span v-show="item.audioUrl == ''" style="width:40px">{{ item.value1 }}s</span>
                    </div>
                    <div class="right">
                      <el-button @click="getChecked">
                        <i class="el-icon-microphone"></i>
                        {{ item.checked == 0 ? "完成" : "重新录制" }}
                      </el-button>
                      <el-button @click="deleteVoice">删除语音</el-button>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="btn" style="width:100%;display:flex;justify-content:flex-end;">
                    <div class="right" style>
                      <el-button
                        type="primary"
                        class="confirm"
                        id="confirmBtn"
                        @click="confirm(item, index)"
                      >确定</el-button>
                      <el-button
                        type="warning"
                        class="delete"
                        id="delateBtn"
                        @click="deleteProblem(item, index)"
                      >删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- <div>
      <knowledeg v-show="show2" :typeid="typeid" :zuoyeid="zuoyeid" />
    </div>-->
  </div>
</template>
<script></script>
<script>
import knowledeg from "../../../components/homeworkCenter/knowledge3";
import Utils from "../../../../static/js/util";
import subjcet from "@/components/grade/subject.vue";
export default {
  components: {
    subjcet,
    knowledeg
  },
  data() {
    return {
      type2: 0,
      QuestionType: [],
      tiku: [],
      QuestionType2index: 99999,
      show2: false,
      list: [],
      url: "",
      currentPage: 1,
      classId: "",
      className: "",
      classList: [], //班级列表
      workList: [],
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" }
        // { name: "自定义" }
      ],
      target: [
        { name: "单一知识目标" },
        { name: "多知识目标" }
        // { name: "自定义" }
      ],
      show: false,
      totalS: "",
      pids: "",
      difficultyConter: "",
      typeid: "",
      zuoyeid: "",
      selectContent: "",
      selecter: "",
      problem: [],
      problems: [
        {
          jiexi: "",
          content: "",
          questionAnser: "",
          questionAnalysi: "",
          questionScore: "",
          QuestionType2indexs: 0,
          num2: 0,
          targetNum: 0,
          typeName: "作图题"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.QuestionTypeSelect();
    this.chooseAll();
  },
  methods: {
    tiao() {
      this.$router.push({
        path: "/homeCommon/workCenter/addHomeWork"
      });
    },
    confirm(item, index) {
      console.log(item);
      let data = {
        //  chapterId: this.chapterIds,
        storeId: "",
        content: item.content,
        answer: item.answer,
        resolution: this.resolution + "||||" + item.jiexi,
        score: item.questionScore,
        difficulty: this.difficultyConter,
        typeId: this.typeId,
        typeName: item.typeName,
        //  timeType: this.timeType,
        target: this.targetName,
        sound: this.audioUrl,
        sort: this.sort,
        chapterId: this.chapterIds
      };
      // if (this.intoId == 0) {
      // } else if (this.intoId !== 0) {
      //   data.chapterId = this.intoId;
      // }
      // console.log(this.$route.query.intoId);
      this.$post("/user/homework/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.homeworkId.push(res.data);
          var workId = JSON.stringify(this.homeworkId);
          sessionStorage.setItem("workId", workId);
          if (this.problems[0].content != "") {
            this.allProblems = this.problem.length + this.problems.length;
            this.allproblemslist = this.problem.concat(this.problems);
          } else {
            this.allProblems = this.problem.length;
            this.allproblemslist = this.problem;
          }
          // console.log(this.allproblemslist);

          // this.$router.push({
          //   path: "/homeCommon/workCenter/workable",
          //   query: {
          //     homeworkId: res.data,
          //     subjectId: this.subjectId,
          //     chapterId: this.chapterIds,
          //     pid: this.pids
          //   }
          // });
          this.$message({ type: "success", message: "更新成功" });
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    addTest(item, index) {
      this.problem.push(item);
      this.$set(item, "num2", 0);
      this.$set(item, "targetNum", 0);
      this.storeId.push(item.id);
      this.sort = index++;
      // console.log(item);
    },
    deleteProblems(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.problems.splice(index, 1);
      });
      this.allProblems = this.problem.length + this.problems.length;
    },
    queryHomework(e) {
      let data = {
        subjectId: sessionStorage.getItem("subjectId"),
        typeId: e,
        indexNo: this.currentPage4,
        rows: this.pageSize,
        pid: this.pids
      };

      Utils.$emit("bookId", this.textbookId);
      this.$get("/user/homework/store/findAllList", data).then(res => {
        if (res.code == "5000") {
          this.tiku = res.data.date;
          this.countPage = res.data.total;
          this.currentPage4 = res.data.pageNum;
        }
      });
    },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryClassHomework(); //每页条数
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryClassHomework(); //当前
    },
    chooseAll() {
      this.type2 = 0;
      this.QuestionType2index = 99999;
      this.queryHomework(this.type2);
    },
    chooseType2(item, index) {
      this.typeName = item.name;
      this.typeId = item.id;
      this.QuestionType.forEach((item, index) => {});
      this.isChoorse = index;
      // this.type2 = 1;
      this.type2 = item.id;
      this.QuestionType2index = index;
      // console.log(this.problem);
      this.queryHomework(item.id);
    },
    QuestionTypeSelect(e) {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
        }
      });
    },
    goRou() {
      this.$router.push({
        path: "/homeCommon/workCenter/ItemBank"
      });
    },
    //添加相似题型
    addSpareQuestions(id) {
      this.typeid = id;
      this.show2 = true;
      this.show = false;
    },
    changeFile(e) {
      var self = this;
      var file = event.target.files[0];
      console.log(file);
      var ext = file.name.split(".")[1];
      console.log(ext);
      // this.videoName = file.name.replace("."+ext,"");
      var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
      var storeAs = "upload-file1/abc";
      var file_name = `${new Date().getTime()}.${ext}`; //时间戳+文件后缀名
      this.client = new OSS.Wrapper({
        region: "oss-cn-shenzhen",
        secure: true,
        //endpoint: "oss-cn-shenzhen.aliyuncs.com",
        accessKeyId: "TxkBX1VgU792UUVh",
        accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
        bucket: "mixin"
      });
      this.client
        .multipartUpload(file.name, file)
        .then(result => {
          console.log(result);

          // event.target.value = "";
          if (result.res.status == 200 && result.res.statusCode == 200) {
            // self.$emit("input", result.res.requestUrls[0]);
            // this.filesUrl = result.res.requestUrls[0].split("?")[0];
            // console.log(this.filesUrl);
            this.filesUrlname = file.name;
            if (result.res.requestUrls[0].indexOf("?") != -1) {
              //判断url地址中是否包含link字符串
              this.url =
                "http://view.officeapps.live.com/op/view.aspx?src=" +
                result.res.requestUrls[0].split("?")[0];
            } else {
              this.url =
                "http://view.officeapps.live.com/op/view.aspx?src=" +
                result.res.requestUrls[0];
            }
            console.log(this.url, "this.url");
            self.$message.success("上传成功");
          } else {
            self.$message.error("上传失败，请重新上传文件");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    setaudio() {
      if (this.checked == 0) {
        //     console.log(this.checked);
        return false;
      }
      recording.get(res => {
        if (res) {
          //     console.log(res);
          this.recorder = res;
          this.t = setInterval(() => {
            if (this.value1 < this.max) {
              this.value1++;
              this.checked = 0;
            } else {
              this.checked = 1;
              // this.value1 = 0;
              this.recorder.stop();
              this.getBlob();
              clearInterval(this.t);
            }
          }, 1000);
        }
      });
    },
    addsubject(item, index) {
      this.problems.push({
        jiexi: "",
        content: "",
        questionAnser: "",
        questionAnalysi: "",
        questionScore: "",
        QuestionType2indexs: 0,
        num2: 0,
        targetNum: 0
      });
      console.log(this.problems);
      // console.log(item, index);
    },
    //查询作业详情
    getquestiondeatil(id) {
      // 作业id
      this.zuoyeid = id;
      this.$get("user/homework/findById", { id: id }).then(res => {
        if (res.code == 5000) {
          this.list = res.data.list;
          this.showBox();
        }
      });
    },
    handleCurrentChanges(val) {
      // this.currentPage = val;
      this.getWorkList();
    },
    changeClass(e) {
      this.classId = e;
      this.getWorkList();
    },
    //获取作业列表
    getWorkList() {
      let data = {
        pid: this.pids,
        rows: 10,
        indexNo: this.currentPage,
        subjectId: sessionStorage.getItem("subjectId")
      };
      if (this.classId != 0) {
        data.classId = this.classId;
      }
      this.$get("/user/homework/findListByPid", data).then(res => {
        this.workList = res.data.date;
        this.totalS = Number(res.data.count);
      });
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
    showBox() {
      this.show = true;
    }
  }
};
</script>
<style lang="less">
@color: #159484;

.library {
  .problem {
    margin-top: 20px;
    margin-bottom: 70px;
    .example {
      margin: 0 16px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      margin-bottom: 30px;
      .number {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        color: #ff8a00;
        .Elastic {
          margin-left: 5px;
          box-shadow: none;
          color: #d2d2d2;
          background-color: #fff;
          border: 1px solid #eee;
          font-size: 14px;
        }
        .query {
          font-size: 20px;
          color: #d2d2d2;
          margin-left: 5px;
        }
        span {
          padding: 4px 9px;
          background: #ff8a00;
          color: #fff;
          font-size: 14px;
          box-shadow: 3px 3px 0px rgba(255, 138, 0, 0.5);
          margin-right: 5px;
        }
      }
      .test {
        padding: 15px;
        font-size: 16px;
        color: #333;
        // margin-bottom: 30px;
        border-bottom: 1px dashed #ccc;
        .text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          margin-top: 30px;
        }
      }
      .analysis {
        padding: 15px;
        // margin-bottom: 30px;
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          .label {
            font-size: 16px;
            color: #159484;
            line-height: 34px;
            margin-right: 10px;
          }
          .input {
            flex: 1;
            #content,
            .editDemo {
              border: 1px solid #ccc;
              color: #159484;
              height: auto;
              width: 100%;
              padding: 15px;
              box-sizing: border-box;
            }
            // border: 1px solid #e5e5e5;
            input {
              color: @color;
              line-height: 34px;
            }
            .contentTitle {
              border: 1px solid #ccc;
              border-bottom: 0;
              box-sizing: border-box;
              padding: 10px;
              ul {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                margin: 0;
                padding: 0;
                li {
                  width: 30px;
                  height: 30px;
                  position: relative;
                  font-size: 26px;
                  input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
        .nature {
          align-items: flex-start;
          margin-bottom: 20px;
          .sort {
            flex: 1;
            .li {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              margin-bottom: 20px;
              .head {
                font-size: 16px;
                color: #159484;
                margin-right: 20px;
              }
              .btn {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                button {
                  padding: 8px 15px;
                  color: #fff;
                  background: #dcdcdc;
                  border-radius: 4px;
                  cursor: pointer;
                  margin: 0;
                  margin-right: 10px;
                  margin-bottom: 10px;
                }
                .active {
                  background: @color;
                }
                // .choores {
                //   background-color: #159484;
                // }
              }
            }
          }
          .custom {
            padding: 8px 15px;
            color: #fff;
            background: #dcdcdc;
            border-radius: 4px;
            cursor: pointer;
          }
        }
        .Voice {
          justify-content: space-between;
          .label {
            i {
              font-size: 26px;
              cursor: pointer;
            }
          }
          .btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            .left,
            .right {
              width: 50%;
              display: flex;
              align-items: center;
            }
            .left {
              padding-left: 20px;
              justify-content: flex-start;
            }
            .right {
              justify-content: flex-end;
            }
            .el-slider {
              width: 80px;
            }
            button {
              font-size: 14px;
              color: #fff;
              background: @color;
              padding: 9px 14px;
              border-radius: 4px;
              margin-left: 10px;
              cursor: pointer;
            }
            .confirm {
              background-color: #159484;
            }
            .delete {
              background: #ff8a00;
            }
          }
        }
      }
    }
  }
  .topic {
    padding: 0 20px;
    .titles {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .el-button {
        margin: 0;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .timu {
      .head,
      .answer {
        padding: 10px;
        padding-left: 30px;
      }
      .list {
        box-shadow: 0 0 5px #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        position: relative;
        .index {
          position: absolute;
          left: 3px;
          top: 10px;
          font-size: 14px;
          color: #ff8a00;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // height: 30px;
          background: #eee;
          border-radius: 0 0 4px 4px;
          padding: 5px 10px;
          p {
            display: flex;
          }
          ._left {
            justify-content: flex-start;
          }
          ._right {
            justify-content: flex-end;
            span {
              padding: 4px 10px;
              border-radius: 4px;
              background: rgb(255, 138, 0);
              color: #fff;
            }
          }
        }
      }
    }
    .page {
      padding-bottom: 20px;
      .el-pagination {
        text-align: center;
      }
    }
  }
  .box {
    width: 100%;
    position: relative;
    background: white;
    .left {
      width: 18%;
      margin-right: 10px;
    }
    .add_head {
      display: flex;
      width: 100%;
      margin-bottom: 15px;
      div {
        display: flex;
        width: 20%;
        padding: 15px;
        flex-direction: column;
        border: 1px solid #d8d8d8;
        align-items: center;
        img {
          width: 90%;
          height: 75px;
        }
      }
    }
    .right {
      background-color: #fff;
      flex: 1;
      display: flex;
      justify-content: space-around;
      .searchItem {
        width: 250px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    .import-out {
      width: 47%;
    }
    .wordTest {
      // margin-top: 50px;
      // margin-left: 50px;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      .anserList {
        margin: 10px;
        .leixing {
          margin: 5px;
        }
        // .choores {
        //   background-color: #159484;
        //   color: #fff;
        // }
      }
      .testNature {
        padding: 10px;
        font-size: 18px;
        color: #159484;
      }
      .analysi {
        margin-top: 10px;
        padding: 10px;
        p {
          font-size: 18px;
          color: #159484;
        }
      }
      .questionBank {
        padding: 10px;
        margin-top: 10px;
        font-size: 18px;
        color: #159484;
        border-bottom: 2px dashed #eee;
        #question-conter {
          width: 95%;
        }
      }
      .anser-conter {
        padding: 10px;
        p {
          color: #159484;
          font-size: 18px;
        }
        .Anserconter {
          width: 95%;
        }
      }
      .label {
        padding: 10px;
        font-size: 18px;
        color: #159484;
      }
      .anser-score {
        span {
          font-size: 18px;
          color: #159484;
        }
      }
    }
  }
}
</style>
