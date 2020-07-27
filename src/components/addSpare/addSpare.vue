<template>
  <div class="addTest">
    <div class="box" style="padding-top:20px">
      <div style="width:50%;margin:0 auto">
        <TaskHeader />
      </div>
      <div class="right">
        <div style="width:45%">
          <!-- <div class="addBtn" @click="addGoods"></div>
          <div class="cart">
            这是购物车
            <div class="ball-wrapper" v-for="(ball, index) of balls" :key="index">
              <transition
                name="drop"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
              >
                <div class="ball" v-show="ball.show">
                  <div class="inner inner-hook"></div>
                </div>
              </transition>
            </div>
          </div>-->
          <div class="addimg">
            <div class="upload">
              <el-upload
                class="upload-demo"
                name="file"
                action="http://data.ikeshen.com/user/homework/wordToHtml"
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
                <el-button style="margin-top:5px" size="small" type="primary">word上传</el-button>
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
        <div class="import-out" style="margin-top:51px">
          <!-- <div class="cart">
            这是购物车
            <div class="ball-wrapper" v-for="(ball, index) of balls" :key="index">
              <transition
                name="drop"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
              >
                <div class="ball" v-show="ball.show">
                  <div class="inner inner-hook"></div>
                </div>
              </transition>
            </div>
          </div>-->
          <div class="wordTest" v-for="(item, r) in problems" :key="r">
            <div class="questionBank">
              <p>
                题目内容:
                <el-button @click="importTxt('content',r)" size="mini" style="margin-bottom:5px">引入</el-button>
              </p>
              <quill-editor :options="editorOption" v-model="form.content" style="width:100%"></quill-editor>
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
                <el-button
                  @click="importTxt('questionAnser',r)"
                  size="mini"
                  style="margin-bottom:5px"
                >引入</el-button>
              </p>
              <quill-editor :options="editorOption" v-model="form.answer" style="width:100%"></quill-editor>
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
                <el-button
                  @click="importTxt('questionAnalysi',r)"
                  size="mini"
                  style="margin-bottom:5px"
                >引入</el-button>
              </p>
              <quill-editor
                :options="editorOption"
                placeholder="请输入内容"
                v-model="form.resolution"
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

              <el-input style="width:50px" v-model="form.questionScore"></el-input>
              <span>&nbsp;分</span>
            </div>
            <div class="anserType">
              <div class="anserList">
                <span style="font-size:18px;color:#159484;display:block">题目属性:</span>
                <el-radio-group v-model="form.typeName" size="small">
                  <el-radio-button
                    v-for="(item,index) in QuestionType"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-radio-button>
                </el-radio-group>
                <!-- <el-button>{{typeName}}</el-button> -->
              </div>
              <div class="anserList">
                <span style="font-size:18px;color:#159484">难度:</span>
                <el-radio-group v-model="form.difficulty" size="small">
                  <el-radio-button
                    v-for="(item,index) in difficulty"
                    :key="index"
                    :label="item.name"
                  ></el-radio-button>
                </el-radio-group>
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
                <el-radio-group v-model="form.target" size="small">
                  <el-radio-button v-for="(item,index) in target" :key="index" :label="item.name"></el-radio-button>
                </el-radio-group>
              </div>
              <div style>
                <el-button
                  size="small"
                  type="primary"
                  class="confirm"
                  id="confirmBtn"
                  @click="confirmSd(item, r)"
                >添加备用习题</el-button>
                <!-- <el-button
                  size="small"
                  type="success"
                  class="confirm"
                  @click="addsubject(item, r)"
                >继续加题</el-button>-->
                <!-- <el-button
                  size="small"
                  type="warning"
                  class="delete"
                  id="delateBtn"
                  @click="deleteProblems(item, r)"
                >删除</el-button>-->
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import knowledeg from "@/components/homeworkCenter/knowledge3";
// import Utils from "../../../../../static/js/util";
import subjcet from "@/components/grade/subject.vue";
import TaskHeader from "@/components/homeworkCenter/taskHeader";
import recording from "../../../../../static/js/recorder";
export default {
  components: {
    subjcet,
    knowledeg,
    TaskHeader
  },
  data() {
    return {
      balls: [
        // 这里定义了多个ball,是因为可能同时有多个小球在动画中（快速点击多次或者多个商品）
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [], // 在动画中的小球集合
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
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
      form: {
        answer: "",
        resolution: "",
        target: "单一知识目标",
        QuestionType2indexs: "作图题",
        typeName: "作图题",
        score: "",
        content: "",
        answer: "",
        difficulty: "解释性"
      },
      homeworkId: [],
      showed: false,
      allProblems: 0,
      allproblemslist: [],
      chapterIds: "",
      storeId: [],
      fileList: [],
      difficultyConter: "解释性",
      typeId: "",
      typeName: "",
      timeType: "",
      targetName: "单一知识目标",
      targetNum: "单一知识目标",
      audioUrl: "",
      wordHtml: "",
      show2: false,
      selectContent: "",
      selecter: "",
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
  created() {
    if (JSON.parse(sessionStorage.getItem("workId"))) {
      this.homeworkId = JSON.parse(sessionStorage.getItem("workId"));
    }
    var that = this;
    that.getclassList();
    this.QuestionTypeSelect();
  },
  methods: {
    addGoods(e) {
      let el = e.target;
      this.balls.forEach(v => {
        if (!v.show) {
          v.show = true; // 当切换元素的display:block/none时，会触发vue的动画
          v.el = el; // 将触发点击事件的“+”号保定道小球对象上，方便获取动画初始时的位置
          this.dropBalls.push(v); // 取一个小球加入动画队列
          return;
        }
      });
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        // 将动画队列中的小球，依次处理
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //拿到点击的“+”号的位置,这里不直接取值（我是用的绝对定位，当然可以直接取值）的原因是，商品列表中每个加号的位置是不固定的，如果上下滑动了，这个位置就不确定
          let x = rect.left - 70; // 需要偏移的x向距离
          let y = -(window.innerHeight - rect.top - 65); // 需要偏移的y向距离
          el.style.display = ""; // 当前状态下，display值为none，将其置空。
          // 这里需要注意了，小球飞入的动画分两个维度，X轴和Y轴，因此
          el.style.webkitTransform = `translate3d(0px, ${y}px, 0px)`; // 首先将“ball”Y向移动至“+”好位置
          el.style.transform = `translate3d(0px, ${y}px, 0px)`;
          // 接着将“inner-hook”X向移动至“+”号处，其实此时外层“ball”的X位置没有动，但因为背景色等等样式只应用于“inner-hook”上，因此，视觉效果上，这个小球是移动到了“+”号的位置
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${-x}px, 0, 0)`;
          inner.style.transform = `translate3d(${-x}px, 0, 0)`;
        }
      }
    },
    enter(el) {
      /* eslint-disable no-unused-vars */

      let rf = el.offsetHeight; // 主动触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0, 0, 0)"; //接着将小球位置置为初始值，但css中设置了transition .8s,因此，动画效果就出来了
        el.style.transform = "translate3d(0, 0, 0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0, 0, 0)";
        el.style.transform = "translate3d(0, 0, 0)";
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift(); //结束后，将这个活动中的小球删除
      if (ball) {
        ball.show = false;
        el.style.display = "none"; // 并且将其设为不可见
      }
    },
    onEditorChange(eve) {
      console.log(eve.html);
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
    chooseTypes(items, index, item, r) {
      this.typeId = items.id;
      this.$set(item, "QuestionType2indexs", index);
      this.$set(item, "typeName", items.name);
      // this.QuestionType2indexs = index;
      this.typeName = items.name;
      // console.log(this.typeName);
    },
    importTxt(type, index) {
      console.log(this.selectContent);
      if (type === "content") {
        this.form.content = this.selectContent;
      } else if (type === "questionAnser") {
        this.form.answer = this.selectContent;
      } else if (type == "questionAnalysi") {
        this.form.resolution = this.selectContent;
      }
    },
    confirmSd(item, index) {
      let data = {
        sameId: sessionStorage.getItem("sameId"),
        storeId: this.storeId.join(","),
        content: this.form.content,
        answer: this.form.answer,
        resolution: this.form.resolution,
        score: this.form.questionScore,
        difficulty: this.form.difficulty,
        typeId: this.QuestionType.find(item => item.name == this.form.typeName)
          .id,
        typeName: this.form.typeName,
        timeType: this.timeType,
        target: this.form.target,
        sound: this.audioUrl,
        sort: 1
      };
      this.$post(this.$parent.api, data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "添加到备用习题成功" });
        } else {
          this.$message({ type: "error", message: res.data });
        }
      });
    },
    QuestionTypeSelect(e) {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
          this.typeId = this.QuestionType[0].id;
          this.typeName = this.QuestionType[0].name;
        }
      });
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
      console.log(one);
      this.wordHtml = one.data;
    },
    tiao() {
      this.$router.push({
        path: "/homeCommon/workCenter/library"
      });
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
    change() {
      this.showed = !this.showed;
    },
    releases() {
      if (this.homeworkId) {
        // Utils.$emit("seenTo", this.allproblemslist);
        var list = JSON.stringify(this.allproblemslist);
        sessionStorage.setItem("list", [list]);
        var totals = this.allproblemslist.length * this.questionScore;
        sessionStorage.setItem("total", totals);
        this.$router.push({
          path: "/homeCommon/workCenter/workable",
          query: {
            homeworkId: this.homeworkId,
            subjectId: this.subjectId,
            chapterId: sessionStorage.getItem("pid"),
            pids: sessionStorage.getItem("pid")
          }
        });
      } else {
        this.$message({ type: "error", message: "请点击确定并选择题目属性" });
      }
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
.addBtn {
  // position: absolute;
  top: 50px;
  right: 50px;
  width: 20px;
  height: 20px;
  background: blue;
  border-radius: 50%;
}
.cart {
  position: absolute;
  left: 30px;
  bottom: 30px;
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: 1px solid #ccc;
}
.ball {
  position: fixed;
  z-index: 100;
  left: 70px;
  bottom: 45px;
}
&.drop-enter-active {
  transition: all 0.8s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.inner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  transition: all 0.8s;
}
.addTest {
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: rgb(21, 148, 132);
  }
  .task-basket {
    cursor: pointer;
    position: absolute;
    right: -60px;
    top: 20%;
    .basket-con {
      position: absolute;
      width: 210px;
      background: #ffffff;
      right: 60px;
      top: 0;
      box-shadow: 6px 4px 10px rgba(224, 224, 220, 0.5);
    }
  }
  .addimg {
    margin-bottom: 15px;
  }
  .Releases {
    font-size: 15px;
    color: #fff;
    background: #159484;
    margin: 0 20px;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    text-align: center;
  }
  .box {
    width: 100%;
    position: relative;
    background: white;
    .active {
      background: #159484;
      color: #fff;
    }
    .title {
      text-align: center;
      color: rgb(242, 92, 41);
      font-size: 16px;
    }
    .word {
      width: 100%;
      height: 800px;
      border: 1px solid #e8e8e8;
      overflow-y: auto;
    }
    .left {
      width: 18%;
      margin-right: 10px;
    }
    .right {
      background-color: #fff;
      flex: 1;
      position: relative;
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
