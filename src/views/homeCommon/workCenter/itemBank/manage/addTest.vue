<template>
  <div class="addTests">
    <div class="box">
      <div class="left">
        <subjcet :addShow="true" style="height:100%" />
      </div>
      <div class="right" style="overflow:hidden" v-if="pid">
        <div style="width:65%">
          <div class="addimg">
            <div class="upload">
              <el-upload
                class="upload-demo"
                name="file"
                action="http://data.ikeshen.com/homework/textbook/wordToHtml"
                :headers="headers"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="successUpload"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button style="margin-bottom:10px" size="small" type="primary">word上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <!-- <input
                  type="file"
                  @change="changeFile"
                  accept="application/msword, application/pdf, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />-->
            </div>
          </div>
          <div class="word" @click="SelectText">
            <div style="width=100%;height=100%;padding:15px">
              <div v-html="wordHtml" @click="SelectText"></div>
            </div>
            <!-- <embed :src="url" type="application/pdf" width="100%" height="100%" />   -->
            <!-- <iframe
                    :src="url"
                    style="width:100%;height:100%"
                    frameborder="0"
                    scrolling="auto"
            ></iframe>-->
            <!-- <iframe :src="url" style="width:100%;height:100%" frameborder="1"></iframe> -->
          </div>
        </div>
        <div class="import-out">
          <div class="title" style="margin:6px 0 10px 0">已导入的试题</div>
          <div class="wordTest" v-for="(item, r) in problems" :key="r">
            <div class="questionBank">
              <p>
                题目内容:
                <!-- <el-button
                  @click="importTxt('content', r)"
                  size="mini"
                  style="margin-bottom:5px"
                  >引入</el-button
                >-->
              </p>
              <quill-editor :options="editorOption" v-model="item.content" style="width:100%"></quill-editor>
              <!-- <el-input
                id="question-conter"
                type="textarea"
                :rows="5"
                v-model="item.content"
                placeholder="请输入内容"
              ></el-input>-->
            </div>
            <div class="anser-conter">
              <p>
                答案:
                <!-- <el-button
                  @click="importTxt('questionAnser', r)"
                  size="mini"
                  style="margin-bottom:5px"
                  >引入</el-button
                >-->
              </p>
              <el-select v-model="item.questionAnser" v-if="typeName == '单选题'" placeholder="请选择">
                <el-option v-for="item in selectDan" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <quill-editor
                v-if="typeName != '单选题'"
                :options="editorOption"
                v-model="item.questionAnser"
                style="width:100%"
              ></quill-editor>
              <!-- <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnser"
                placeholder="请输入内容"
              ></el-input>-->
            </div>
            <div class="analysi">
              <p>
                解析:
                <!-- <el-button
                  @click="importTxt('questionAnalysi', r)"
                  size="mini"
                  style="margin-bottom:5px"
                  >引入</el-button
                >-->
              </p>
              <quill-editor
                :options="editorOption"
                placeholder="请输入内容"
                v-model="item.questionAnalysi"
                style="width:100%"
              ></quill-editor>
              <!-- <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnalysi"
                placeholder="请输入内容"
              ></el-input>-->
            </div>
            <div class="anser-score">
              <span style="margin-left:10px">分值:&nbsp;</span>

              <el-input style="width:50px" v-model="item.questionScore"></el-input>
              <span>&nbsp;分</span>
            </div>
            <div class="anserType">
              <div class="anserList">
                <span style="font-size:18px;color:#159484;display:block">题目属性:</span>
                <el-radio-group v-model="typeName" size="small" @change="radioChange">
                  <el-radio-button
                    v-for="(item, index) in QuestionType"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-radio-button>
                </el-radio-group>
                <!-- <el-button
                  class="leixing"
                  size="small"
                  v-for="(items, i) in QuestionType"
                  :key="i"
                  :class="{ choores: item.QuestionType2indexs == i }"
                  @click="chooseTypes(items, i, item, r)"
                  >{{ items.name }}</el-button
                >-->
                <!-- <el-button>{{typeName}}</el-button> -->
              </div>
              <div class="anserList">
                <span style="font-size:18px;color:#159484">难度:</span>
                <el-button
                  size="small"
                  v-for="(items, k) in difficulty"
                  :class="{ choores: item.num2 == k }"
                  :key="k"
                  @click="chooseDifficulty(items, k, item, r)"
                >{{ items.name }}</el-button>
              </div>
              <!--                  <div class="anserList">-->
              <!--                    <span style="font-size:18px;color:#159484">时间:</span>-->
              <!--                    <el-button-->
              <!--                      v-for="(items, indexs) in time"-->
              <!--                      :key="indexs"-->
              <!--                      :class="{ active: timeNums == indexs }"-->
              <!--                      @click="chooseTime(items, indexs)"-->
              <!--                    >{{ items.name }}</el-button>-->
              <!--                  </div>-->
              <div class="anserList">
                <span style="font-size:18px;color:#159484">目标:</span>
                <el-button
                  size="small"
                  v-for="(items, j) in target"
                  :key="j"
                  :class="{ choores: item.targetNum == j }"
                  @click="chooseTarget(items, j, item)"
                >{{ items.name }}</el-button>
              </div>
              <!-- <div class="label">
                选择输入语音:
                <i class="el-icon-microphone" @click="setaudio"></i>
                <audio :src="audioUrl"></audio>
              </div>-->
              <div style>
                <el-button
                  size="small"
                  type="primary"
                  class="confirm"
                  id="confirmBtn"
                  @click="confirmSd(item, r)"
                >保存题目</el-button>
                <!-- <el-button
                  size="small"
                  type="success"
                  class="confirm"
                  @click="addsubject(item, r)"
                  >继续加题</el-button
                >-->
                <!-- <el-button
                  size="small"
                  type="warning"
                  class="delete"
                  id="delateBtn"
                  @click="deleteProblems(item, r)"
                  >删除</el-button
                >-->
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<script>
import knowledeg from "../../../../../components/homeworkCenter/knowledge3";
import Utils from "../../../../../../static/js/util";
import subjcet from "@/components/grade/subject.vue";
import recording from "../../../../../../static/js/recorder";
export default {
  components: {
    subjcet,
    knowledeg
  },
  data() {
    return {
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      selectDan: ["A", "B", "C", "D"],
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
      fileList: [],
      wordHtml: "",
      difficultyConter: "解释性",
      show2: false,
      audioUrl: "",
      list: [],
      url: "",
      currentPage: 1,
      classId: "",
      className: "",
      classList: [], //班级列表
      workList: [],
      QuestionType: [],
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
      pid: "",
      typeName: "",
      typeid: "",
      zuoyeid: "",
      selectContent: "",
      selecter: "",
      targetName: "单一知识目标",
      targetNum: 0,
      audioUrl: "",
      storeId: [],
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
  created() {
    var that = this;
    this.QuestionTypeSelect();
    Utils.$on("getData", function(msg) {
      console.log(msg);
      if (msg.sectionIndex) {
        that.pid = msg.id;
      } else {
        that.pid = "";
      }
    });
  },
  mounted() {},
  methods: {
    radioChange(value) {
      if (value == "单选题") {
        this.problems[0].questionAnser = "";
      }
    },
    chooseTarget(items, indexs, item) {
      this.targetName = items.name;
      this.targetNum = indexs;
      this.targetNums = indexs;
      this.$set(item, "targetNum", indexs);
      // console.log(item,this.problem);
    },
    //题目难度
    chooseDifficulty(items, indexs, item, index) {
      this.difficultyConter = items.name;
      // item.num2 = indexs;
      this.$set(item, "num2", indexs);
      // console.log(this.problem,items,indexs,item,index);
    },
    QuestionTypeSelect(e) {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
          console.log(this.QuestionType);
          this.typeId = this.QuestionType[0].id;
          this.typeName = this.QuestionType[0].name;
        }
      });
    },
    importTxt(type, index) {
      console.log(this.selectContent);
      if (type === "content") this.problems[index].content = this.selectContent;
      else if (type === "questionAnser")
        this.problems[index].questionAnser = this.selectContent;
      else if (type === "questionAnalysi")
        this.problems[index].questionAnalysi = this.selectContent;
    },
    beforeUpload(file) {
      console.log(file);
      // this.fileData = file;
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUpload(one, two) {
      this.wORK;
      this.wordHtml = one.data;
    },
    handleMessage(event) {
      console.log(event);
      let data = event.data;
    },
    SelectText() {
      try {
        this.selecter = window.getSelection().toString();
        console.log(this.selecter);
        if (this.selecter != null && this.selecter.trim() != "") {
          this.selectContent = this.selecter;
        }
      } catch (err) {
        console.log(err);
        this.selecter = document.selection.createRange();
        var s = this.selecter.text;
        if (s != null && s.trim() != "") {
          return;
        }
      }
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
    confirmSd(item, index) {
      if (!this.pid) {
        this.$message({ type: "error", message: "请选择单元" });
        return;
      }
      let data = {
        chapterId: this.pid,
        content: item.content,
        answer: item.questionAnser,
        resolution: item.questionAnalysi,
        score: item.questionScore,
        difficulty: this.difficultyConter,
        typeId: this.QuestionType.find(item => item.name == this.typeName).id,
        typeName: this.typeName,
        timeType: this.timeType,
        target: this.targetName,
        sound: this.audioUrl,
        sort: 1
      };
      this.$post("/user/homework/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.$post("/user/homework/insertOneSelf", {
            id: res.data,
            type: 3
          }).then(res => {
            if (res.code == "5000") {
            } else {
              this.$message({ type: "error", message: res.message });
            }
          });
          this.problems = [
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
          ];
          this.$message({ type: "success", message: "添加至题库成功" });
        } else {
          this.$message({ type: "error", message: res.data });
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
    showBox() {
      this.show = true;
    }
  }
};
</script>
<style lang="less">
.addTests {
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: rgb(21, 148, 132);
  }
  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .title {
      text-align: center;
      color: rgb(242, 92, 41);
      font-size: 16px;
    }
    .left {
      width: 18%;
      margin-right: 10px;
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
      width: 30%;
    }
    .word {
      width: 100%;
      height: 800px;
      border: 1px solid #e8e8e8;
      overflow-y: auto;
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
        .choores {
          background-color: #159484;
          color: #fff;
        }
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
