<template>
  <div class="addTest">
    <div class="box">
      <div class="right">
        <div style="width:45%">
          <div class="add_head">
            <div style="border-top:2px solid blue;">
              <img src="../../../../static/images/daoru.png" alt />
              文件导入
            </div>
            <div>
              <img src="../../../../static/images/tk.png" alt />
              个人数据
            </div>
            <div>
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
          <div class="word" @click="SelectText" style="width:50%;height: 620px;" v-html="htmlData">
            <!-- <embed :src="url" type="application/pdf" width="100%" height="100%" />   -->
            <!-- <iframe
                    :src="url"
                    style="width:100%;height:100%"
                    frameborder="0"
                    scrolling="auto"
            ></iframe>-->
            <!-- <iframe :src="url" style="width:100%;height:100%" frameborder="1"></iframe> -->
            <div class="addimg">
              <div class="upload">
                <input
                  type="file"
                  @change="changeFile"
                  accept="application/msword, application/pdf, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="import-out">
          <div class="title">已导入的试题</div>
          <div class="wordTest" v-for="(item, r) in problems" :key="r">
            <div class="questionBank">
              <p>题目内容:</p>
              <el-input
                id="question-conter"
                type="textarea"
                :rows="5"
                v-model="item.content"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="anser-conter">
              <p>答案:</p>
              <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnser"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="analysi">
              <p>解析:</p>
              <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnalysi"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="anser-score">
              <span style="margin-left:10px">分值:&nbsp;</span>

              <el-input style="width:50px" v-model="item.questionScore"></el-input>
              <span>&nbsp;分</span>
            </div>
            <div class="anserType">
              <div class="anserList">
                <span style="font-size:18px;color:#159484;display:block">题目属性:</span>
                <el-button
                  class="leixing"
                  v-for="(items, i) in QuestionType"
                  :key="i"
                  :class="{'choores':item.QuestionType2indexs ==i }"
                  @click="chooseTypes(items, i,item,r)"
                >{{ items.name }}</el-button>
                <!-- <el-button>{{typeName}}</el-button> -->
              </div>
              <div class="anserList">
                <span style="font-size:18px;color:#159484">难度:</span>
                <el-button
                  v-for="(items, k) in difficulty"
                  :class="{'active':item.num2 ==k }"
                  :key="k"
                  @click="chooseDifficulty(items, k,item,r)"
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
                  v-for="(items, j) in target"
                  :key="j"
                  :class="{ active: item.targetNum == j }"
                  @click="chooseTarget(items, j,item)"
                >{{ items.name }}</el-button>
              </div>
              <!-- <div class="label">
                选择输入语音:
                <i class="el-icon-microphone" @click="setaudio"></i>
              </div>-->
              <div style>
                <el-button
                  type="primary"
                  class="confirm"
                  id="confirmBtn"
                  @click="confirmSd(item, r)"
                >保存题目</el-button>
                <el-button type="success" class="confirm" @click="addsubject(item, r)">继续加题</el-button>
                <el-button
                  type="warning"
                  class="delete"
                  id="delateBtn"
                  @click="deleteProblems(item, r)"
                >删除</el-button>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
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
      htmlData: "<h1>ASDASDASDASDASDSDASD</h1>",
      show2: false,
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
      pids: "",
      typeid: "",
      zuoyeid: "",
      selectContent: "",
      selecter: "",
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
    that.getclassList();
    this.getWorkList();

    Utils.$on("getData", function(msg) {
      that.pids = msg.id;
      //获取作业列表
      that.getWorkList();
    });
  },
  methods: {
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
.addTest {
  .box {
    width: 100%;
    position: relative;
    .left {
      width: 18%;
      margin-right: 10px;
    }
    .add_head {
      display: flex;
      width: 100%;
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
        .choores {
          // background-color: #159484;
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
