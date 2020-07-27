<template>
  <div class="problem">
    <el-container>
      <el-main>
        <div class="arrangement" v-show="ShowBox">
          <div class="con submit-test-dialog">
            <p style="text-align:center;color:red;" v-if="!identity">请完善您的身份信息,以便布置作业</p>
            <el-form
              :model="weknow"
              status-icon
              ref="ruleForm2"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="知识点：" prop="desc">
                <el-input
                  type="textarea"
                  :disabled="true"
                  v-model="weknow.knowledge"
                  placeholder="知识点"
                ></el-input>
              </el-form-item>
              <el-form-item label="解决问题:" prop="question">
                <el-input
                  type="textarea"
                  :disabled="true"
                  v-model="weknow.solveProblem"
                  placeholder="解决问题"
                ></el-input>
              </el-form-item>
              <el-form-item label="作业名称:" prop="question">
                <el-input
                  type="textarea"
                  :disabled="true"
                  v-model="weknow.homeworkName"
                  placeholder="作业类型"
                ></el-input>
              </el-form-item>
              <el-form-item label="预计用时:" prop="number" class="zh_icon">
                <el-input :disabled="true" v-model="weknow.expectTime">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div id="subOutputRank-print">
          <div class="example" v-for="(item, index) in subjects" :key="index">
            <div class="number">
              <span>导入</span>
              此题编码:{{ item.code }}
              <i
                class="el-icon-question query"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
              ></i>
              <span class="Elastic" :style="Showblock">赋予每道题的编码实现智能化精准化</span>
            </div>
            <div class="TestBox" style="border:1px solid #eee;">
              <div class="test" v-html="item.content"></div>
            </div>
          </div>
          <!-- <div class="test" v-html="item.content"></div> -->
          <!-- <div class="analysis" v-show="dayinSow">
            <div class="item">
              <div class="label">答案:</div>
              <div class="input">
                <div class="content" style="min-height:50px;" v-html="item.answer"></div>
              </div>
            </div>
            <div class="item">
              <div class="label">分值:</div>
              <div class="input">
                <el-input v-model="item.score" disabled placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="item nature">
              <div class="label">题目属性:</div>
              <div class="sort">
                <div class="li">
                  <div class="head">类型:</div>
                  <div class="btn" style>
                    <el-button
                      v-for="(items, indexs) in types"
                      :key="indexs"
                      :class="item.QuestionTypeindex == indexs ? 'choores' : ''"
                      @click="chooseTypes(item, indexs)"
                    >{{ items.typeName }}</el-button>
                  </div>
                </div>
                <div class="li">
                  <div class="head">难度:</div>
                  <div class="btn">
                    <el-button
                      v-for="(items, indexs) in difficulty"
                      :class="item.difficultyindex == indexs ? 'choores' : ''"
                      :key="indexs"
                      @click="chooseDifficulty(item, indexs)"
                    >{{ items.name }}</el-button>
                  </div>
                </div>
                <div class="li">
                  <div class="head">时间:</div>
                  <div class="btn">
                    <el-button
                      v-for="(items, indexs) in time"
                      :key="indexs"
                      :class="item.timeindex == indexs ? 'choores' : ''"
                      @click="chooseTime(item, indexs)"
                    >{{ items.name }}</el-button>
                  </div>
                </div>
                <div class="li">
                  <div class="head">目标:</div>
                  <div class="btn">
                    <el-button
                      v-for="(items, index) in target"
                      :key="index"
                      :class="item.targetindex == index ? 'choores' : ''"
                      @click="chooseTarget(item, index)"
                    >{{ items.name }}</el-button>
                  </div>
                </div>
                <span class="custom">自定义属性</span>
              </div>
            </div>
            <div class="item Voice">
              <div class="label">
                选择输入语音:
                <i class="el-icon-microphone" @click="chooseVoice(item, index)"></i>
              </div>
              <div class="btn">
                <div class="left">
                  <audio
                    v-show="item.sound != ''"
                    :src="item.sound"
                    :preload="audio.preload"
                    controls="controls"
                    class="content-audio"
                    style="display: none;width:160px;height:30px;"
                  >语音</audio>
                  <el-slider v-show="item.sound == ''" v-model="value1" :max="max" disabled></el-slider>
                  <span v-show="item.sound == ''" style="width:40px">{{ value1 }}s</span>
                </div>
                <div class="right">
                  <el-button @click="getChecked(item, index)" class="activeBtn">
                    <i class="el-icon-microphone"></i>
                    {{ checked == 0 ? "完成" : "重新录制" }}
                  </el-button>
                  <el-button @click="deleteVoice(item, index)" class="deleteBtn">删除语音</el-button>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </el-main>
      <el-aside width="200px">
        <div class="erweima">
          <div class="imgbox">
            <!-- <i class="el-icon-question Query" @mouseover="mouseOvers" @mouseleave="mouseLeaves"></i> -->
            <i class="homeWorkCode">作业题码:</i>
            <span style="color:#ff8a00">{{homeworkCode}}</span>
            <!-- <img src="../../../static/images/erweima2.jpg" alt /> -->
          </div>
          <!-- <div class="input-sure" v-if="ShowBox">
            <div class="item2">
              <div class="anser" id="anser1">
                <p>&nbsp;&nbsp;知识点:</p>
                <el-input
                  class="anserinput"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="weknow.knowledge"
                ></el-input>
              </div>

              <div class="anser">
                <p>解决问题:</p>
                <el-input
                  class="anserinput"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="weknow.solveProblem"
                ></el-input>
              </div>
              <div class="anser">
                <p>作业类型:</p>
                <el-input
                  class="workType"
                  size="mini"
                  v-model="weknow.homeworkName"
                  placeholder="作业类型"
                ></el-input>
              </div>
              <div class="anser">
                <p>预计用时:</p>
                <el-input
                  class="workType"
                  v-model="weknow.expectTime"
                  size="mini"
                  placeholder="预计用时"
                >秒</el-input>
              </div>
            </div>
          </div>-->
        </div>
      </el-aside>
    </el-container>

    <div class="layer" :style="show?'display:block':''">
      <div class="model">
        <div class="arrangement">
          <h4 class="tit tc ft20 fb col39a">
            作业布置
            <img @click="close" src="../../../static/images/close.png" alt />
          </h4>
          <div class="con submit-test-dialog">
            <p style="text-align:center;color:red;" v-if="!identity">请完善您的身份信息,以便布置作业</p>
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="作业类型" prop="type" class="bj">
                <el-select v-model="ruleForm2.type" placeholder="请选择作业类型" @change="chooseWork">
                  <el-option label="结构化作业" value="1"></el-option>
                  <el-option label="非结构化作业(扩散性或探究型作业)" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择班级" prop="classIdList" class="yzm">
                <el-select
                  v-model="ruleForm2.classIdList"
                  placeholder="请选择班级"
                  multiple
                  @change="changeClass"
                >
                  <el-option
                    v-for="(item, i) in createClass"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="createClassed">创建班级</el-button>
              </el-form-item>
              <el-form-item label="作业名称" prop="account" class="zh_icon">
                <el-input
                  v-model.number="ruleForm2.account"
                  placeholder="请输入作业名称"
                  @input="e => ruleForm2.account = validForbid(e)"
                ></el-input>
              </el-form-item>
              <el-form-item label="截止时间" prop="date1" class="zh_icon">
                <div class="block">
                  <el-date-picker v-model="ruleForm2.date1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="知识点" prop="desc">
                <el-input type="textarea" v-model="ruleForm2.desc" placeholder="知识点"></el-input>
              </el-form-item>
              <el-form-item label="解决问题" prop="question">
                <el-input type="textarea" v-model="ruleForm2.question" placeholder="解决问题"></el-input>
              </el-form-item>
              <el-form-item label="知识水平" prop="horizontal" class="bj">
                <el-select v-model="ruleForm2.horizontal" placeholder="请选择知识水平">
                  <el-option label="初级" value="1"></el-option>
                  <el-option label="中级" value="2"></el-option>
                  <el-option label="高级" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预计用时" prop="number" class="zh_icon">
                <el-input
                  v-model.number="ruleForm2.number"
                  @input="e=>ruleForm2.number=validNumber(e)"
                  placeholder="请输入用时"
                >
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
              <el-form-item class="dt">
                <el-button type="primary" @click="questions('ruleForm2','0')">确定</el-button>
                <el-button type="primary" @click="questions('ruleForm2','1')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 创建班级-->
    <div class="creatClass" v-show="centerDialogVisible">
      <creatClass
        :centerDialogVisible="centerDialogVisible"
        @callOf="callOfa"
        @closeDialog="closeDialog"
        @submitForm="submitFormq"
      ></creatClass>
    </div>
  </div>
</template>

<script>
import recording from "../../../static/js/recorder.js";
export default {
  props: {
    questionList: {
      type: Array,
      default: []
    }
  },
  data() {
    //
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入预计用时"));
      } else if (!Number.isInteger(Number(value))) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    //
    return {
      SubJectId: JSON.parse(sessionStorage.getItem("subjectId")),
      dayinSow: true,
      ShowBox: true,
      Showblock: "",
      Showblocks: false,
      itemList: true,
      value1: 0,
      value: "",
      max: 9999,
      options: [],
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false, //是否自动播放
        muted: false, //是否静音
        speed: 1,
        waiting: true,
        preload: "auto"
      },
      audioUrl: "",
      tabsNum: 0,
      btns: ["导入试题", "图片传题", "平台题库"],
      question: "../../../../static/images/picture.jpg",
      radio: "1",
      typeindex: 0,
      answer: [
        { text: "298x10" },
        { text: "29.8x10" },
        { text: "2.98x10" },
        { text: "0.298x10" }
      ],
      answerindex: 0,
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" },
        { name: "自定义" }
      ],
      difficultyindex: 0,
      time: [
        { name: "宽松" },
        { name: "合适" },
        { name: "超时" },
        { name: "自定义" }
      ],
      timeindex: 0,
      target: [
        { name: "但一知识目标" },
        { name: "多知识目标" },
        { name: "自定义" }
      ],
      targetindex: 0,
      checked: 1,
      t: null,
      code: "",
      title: "",
      homeworkId: "",
      homeworkName: "",
      endTime: "",
      classlist: [],
      solveProblem: "",
      expectTime: "",
      knowledge: "",
      type: "",
      types: [],
      level: "",
      order: "",
      subjects: [],
      //
      questionList: [],
      centerDialogVisible: false,
      ruleForm2: {
        type: "2",
        classIdList: [],
        account: "",
        horizontal: "",
        date1: "",
        desc: "",
        question: "",
        number: 30
      },
      rules2: {
        type: [
          { required: true, message: "请选择作业类型", trigger: "change" }
        ],
        classIdList: [
          { required: true, message: "请选择班级", trigger: "change" }
        ],
        account: [
          { required: true, message: "请输入作业名称", trigger: "blur" }
        ],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        desc: [{ required: false, message: "请填写知识点", trigger: "blur" }],
        question: [
          { required: false, message: "请填写解决问题", trigger: "blur" }
        ],
        horizontal: [
          { required: true, message: "请选择只是水平", trigger: "blur" }
        ],
        number: [{ required: true, validator: checkAge, trigger: "blur" }]
      },
      identity: sessionStorage.getItem("identity"),
      createClass: [],
      show: false,
      contentName: null,
      answerKnow: [],
      weknow: {},
      //作业码
      homeworkCode: ""
    };
  },
  created() {
    // console.log(this.subject);

    this.QuestionType();
    let currentDate = new Date();
    if (this.$route.query.contentName) {
      this.contentName = this.$route.query.contentName;
      this.ShowBox = false;
    }

    this.homeworkId = this.$route.query.homeworkId;
    this.ruleForm2.account = this.$route.query.contentName;
    this.ruleForm2.date1 = `${currentDate.getFullYear()}-${this.addZore(
      Number(currentDate.getMonth()) + 1
    )}-${this.addZore(currentDate.getDate())} 23:59:59`;
    this.querySujectList();
    // this.ruleForm2.horizontal = String(this.$route.query.subjectId);
    this.QuestionType();
    this.queryCreateClass();
    this.queryHomeworkById();
    this.$store.state.textbookId = this.$route.query.textbookId;
    // console.log(this.rouer.query.textbookID)
    // console.log(this.subjectId)
  },
  mounted() {
    this.sureAnser();
    if (this.$route.query.contentName == "") {
      this.ShowBox = false;
    }
  },
  methods: {
    printContent(e) {
      let subOutputRankPrint = document.getElementById("subOutputRank-print");
      //   console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      this.dayinSow = !this.dayinSow;
      return false;
    },
    sureAnser() {
      // let data = { homeworkId: this.homeworkId };
      let data = 32;
      let that = this;
      this.$post("/likework/queryHomeworkById.do", data).then(res => {
        if (res.code === "5000") {
          this.answerKnow = res.data.questionList;
          this.$store.state.homeworkCode = res.data.code;
          this.weknow = res.data;
          this.homeworkCode = res.data.code;
        }
      });
    },
    //鼠标移入事件
    mouseLeave() {
      this.Showblock = "display:none";
    },
    //鼠标移入事件
    mouseOver() {
      this.Showblock = "display:block";
    },
    //鼠标移入事件
    mouseLeaves() {
      this.Showblocks = true;
    },
    //鼠标移入事件
    mouseOvers() {
      this.Showblocks = false;
    },
    // 获取题目全部题型接口
    QuestionType(e) {
      let data = { subjectId: this.$route.query.subjectId };
      this.$post("/likework/queryQuestionTypeSelect.do").then(res => {
        if (res.code == "5000") {
          this.types = res.data;
        }
      });
    },
    changeIndex() {
      this.subjects.forEach((item, index) => {
        if (item.property === null) {
          (item.difficultyindex = 0),
            (item.timeindex = 0),
            (item.targetindex = 0);
          this.leixing(item.type, res => {
            item.QuestionTypeindex = res;
          });
          return false;
        }
        let property = JSON.parse(item.property);
        this.nandu(property["难度"], res => {
          item.difficultyindex = res;
        });
        this.shijian(property["时间"], res => {
          item.timeindex = res;
        });
        this.mubiao(property["目标"], res => {
          item.targetindex = res;
        });
        this.leixing(item.type, res => {
          item.QuestionTypeindex = res;
        });
      });
    },
    chooseTypes(item, index) {
      item.QuestionTypeindex = index;
      this.$forceUpdate();
    },
    chooseDifficulty(item, index) {
      item.difficultyindex = index;
      this.$forceUpdate();
    },
    chooseTime(item, index) {
      item.timeindex = index;
      this.$forceUpdate();
    },
    chooseTarget(item, index) {
      item.targetindex = index;
      this.$forceUpdate();
    },
    nandu(e, callback) {
      this.difficulty.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    shijian(e, callback) {
      this.time.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    mubiao(e, callback) {
      this.target.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    leixing(e, callback) {
      this.types.forEach((item, index) => {
        if (item.id == e) {
          callback(index);
        }
      });
    },
    // 删除语音
    deleteVoice(item, index) {
      item.value = 0;
    },
    // 点击完成
    getChecked(item, index) {
      if (item.checked == 0) {
        item.checked = 1;
        clearInterval(item.t);
      } else {
        item.value = 0;
        this.chooseVoice();
      }
    },
    // 点击获取语音
    chooseVoice(item, index) {
      if (item.checked == 0) {
        //   console.log(item.checked);
        return false;
      }
      item.sound = "";
      recording.get(res => {
        if (res) {
          item.recorder = res;
          item.t = setInterval(() => {
            if (item.value < this.max) {
              item.value++;
              item.checked = 0;
              // console.log(this.value1);
            } else {
              item.checked = 1;
              clearInterval(item.t);
            }
          }, 1000);
        }
      });
    },
    /////
    addZore(e) {
      return e < 10 ? "0" + e : e;
    },
    // 获取知识水平
    querySujectList() {
      this.$post("/likework/querySujectList.do").then(res => {
        if (res.code == "5000") {
          for (var key in res.data) {
            //    console.log(key);
            res.data[key].forEach((item, index) => {
              if (item.id == this.$route.query.subjectId) {
                this.ruleForm2.horizontal =
                  key == "小学" ? "1" : key == "初中" ? "2" : "3";
              }
            });
          }
        }
      });
    },
    // 选择班级
    changeClass(e) {
      // console.log(e);
      this.ruleForm2.classIdList = e;
    },
    // 选择作业类型
    chooseWork(e) {
      this.ruleForm2.type = e;
    },
    close() {
      this.show = false;
    },
    againEdit() {
      this.$router.push({
        path: "/homeCommon/workCenter",
        query: { homeworkId: this.$route.query.homeworkId }
      });
    },
    //创建班级
    submitFormq(data) {
      // console.log(data);
      this.centerDialogVisible = data;
      this.queryCreateClass();
    },
    //创建班级关闭弹框
    closeDialog(val) {
      this.centerDialogVisible = val;
    },
    //创建班级取消
    callOfa(val) {
      this.centerDialogVisible = val;
    },
    //创建班级弹框
    createClassed() {
      this.centerDialogVisible = true;
    },
    questions(form, e) {
      if (e == 1) {
        this.show = false;
        return false;
      }
      // console.log(this.ruleForm2);
      let date = new Date(this.ruleForm2.date1);
      let data = {
        id: this.homeworkId,
        classIdList: this.ruleForm2.classIdList.join(":"),
        subjectId: this.$route.query.subjectId,
        textbookId: this.$route.query.textbookId,
        chapterId: this.$route.query.chapterId,
        barId: this.$route.query.barId,
        contentId: this.$route.query.contentId,
        homeworkName: this.ruleForm2.account,
        solveProblem: this.ruleForm2.question,
        knowledge: this.ruleForm2.desc,
        endTime: `${date.getFullYear()}-${this.addZore(
          date.getMonth() + 1
        )}-${this.addZore(date.getDate())} ${this.addZore(
          date.getHours()
        )}:${this.addZore(date.getMinutes())}:${this.addZore(
          date.getSeconds()
        )}`,
        expectTime: this.ruleForm2.number,
        level: this.ruleForm2.horizontal,
        type: this.ruleForm2.type
      };
      // console.log(data)
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$post("/likework/updateClassHomework.do", data).then(res => {
            // console.log(res);
            if (res.code == "5000") {
              this.publishHomeworkById(res.data);
              //   setTimeout(() => {
              //     this.$router.push({
              //       path: "/homeCommon/questions",
              //       query:{homeworkId:res.data,title:`${this.type},${this.subjectName},${this.book},${this.grade},${this.chapter},${this.section},${this.content}`,subjectId:this.subjectId,tabsNum:tabsNum,update:1}
              //     });
              //   }, 1500);
            }
          });
        } else {
          //    console.log("error submit!!");.
          return false;
        }
      });
    },
    //获取创建的班级列表
    queryCreateClass() {
      this.$post("/likework/queryCreateClass.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.createClass = response.data;
          this.classId = response.data[0].id;
          //   console.log(response.data[0].id, "99");
          //this.queryClassHomeworkDateRecord();//根据班级和作业查询班级数据报表
        }
      });
    },
    release() {
      this.show = !this.show;
    },
    // 根据id发布作业接口
    publishHomeworkById(e) {
      let data = {
        homeworkId: e
      };
      this.$post("/likework/publishHomeworkById.do", data).then(res => {
        if (res.code == "5000") {
          this.$message({
            showClose: true,
            message: "发布作业成功!",
            type: "success"
          });
          this.$router.push({
            path: "/homeCommon/workCenter/unworkable",
            query: {
              flag: "1"
            }
          });
        }
      });
    },
    // 获取题目全部题型接口
    QuestionType(e) {
      let data = { subjectId: this.$route.query.subjectId };
      this.$post("/likework/queryQuestionTypeSelect.do", data).then(res => {
        if (res.code == "5000") {
          this.types = res.data;
        }
      });
    },
    nandu(e, callback) {
      this.difficulty.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    shijian(e, callback) {
      this.time.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    mubiao(e, callback) {
      this.target.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    leixing(e, callback) {
      this.types.forEach((item, index) => {
        if (item.id == e) {
          callback(index);
        }
      });
    },
    // 根据id查询作业详情接口
    queryHomeworkById(e) {
      let data = { homeworkId: this.homeworkId };
      let that = this;
      this.$post("/likework/queryHomeworkById.do", data).then(res => {
        // console.log(res);
        if (res.code == "5000") {
          this.solve = res.data.solveProblem;
          this.homeworkName = res.data.homeworkName;
          // this.value = res.data.classList[0].name;
          let classId = [],
            name = [];
          res.data.classList.forEach((item, index) => {
            name.push(item.name);
            classId.push(item.id);
          });
          this.value = classId;
          // this.classId = classId.join(':');
          // this.type = res.data.type==1?'结构化作业':'非结构化作业';
          this.endTime = res.data.endTime;
          this.knowledge = res.data.knowledge;
          this.solveProblem = res.data.solveProblem;
          this.expectTime = res.data.expectTime;
          // this.level = res.data.level==1?'初级':res.data.level==2?'中级':'高级';
          this.type = String(res.data.type);
          this.level = String(res.data.level);
          res.data.questionList.forEach((item, index) => {
            item.t = null;
            item.recorder = null;
            item.value = "";
            item.checked = 1;
            if (item.property === null) {
              (item.difficultyindex = 0),
                (item.timeindex = 0),
                (item.targetindex = 0),
                that.leixing(item.type, res => {
                  item.QuestionTypeindex = res;
                });
              return false;
            }
            let property = JSON.parse(item.property);
            that.nandu(property["难度"], response => {
              //   console.log(response);
              item.difficultyindex = response;
            });
            that.shijian(property["时间"], response => {
              item.timeindex = response;
            });
            that.mubiao(property["目标"], response => {
              item.targetindex = response;
            });
            that.leixing(item.type, res => {
              item.QuestionTypeindex = res;
            });
            //    console.log(item);
          });

          this.questionList = res.data.questionList;
          this.queryCreateClass();
          this.question = res.data.code;
        }
      });
    }
    ///
  },
  computed: {},
  watch: {
    questionList(newData, oldData) {
      //   console.log(newData, oldData);
      this.subjects = newData;
      this.changeIndex();
    }
  }
};
</script>
<style lang="less">
@color: #2592e7;
.problem {
  margin-top: 20px;
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
        float: left;
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
          // border: 1px solid #e5e5e5;
          flex: 1;
          input {
            color: @color;
            line-height: 34px;
          }
          .content {
            width: 100%;
            min-height: 100px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 15px;
            outline: none;
          }
          .content:focus {
            border-color: @color;
          }
        }
      }
      .nature {
        align-items: flex-start;
        margin-bottom: 20px;
        .sort {
          flex: 1;
          padding-top: 5px;
          .li {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;
            .head {
              font-size: 16px;
              color: #333;
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
              .choores {
                // background-color: #159484;
              }
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
          font-size: 16px;
          color: @color;
          flex: 1;
          .left,
          .right {
            width: 50%;
            display: flex;
            align-items: center;
            .activeBtn {
              background-color: #159484;
            }
            .deleteBtn {
              background-color: #ff8a00;
            }
          }
          .left {
            justify-content: flex-start;
          }
          .right {
            justify-content: flex-end;
          }
          .el-slider {
            width: 160px;
            margin-right: 20px;
          }
          button {
            font-size: 14px;
            color: #fff;
            background: @color;
            // padding: 9px 24px;
            border-radius: 4px;
            margin-left: 10px;
            cursor: pointer;
          }
          .delete {
            background: #ff8a00;
          }
        }
      }
    }
  }
}
.el-slider {
  display: block;
  /deep/ .el-slider__runway {
    z-index: 0;
  }
}
.erweima {
  margin-top: 20px;
  .imgbox {
    padding: 10px;
    border: 1px solid #eee;
    .homeWorkCode {
      font-style: normal;

      color: #aaa;
    }
    .Query {
      font-size: 18px;
      color: #d2d2d2;
    }
    .Elastics {
      box-shadow: none;
      color: #d2d2d2;
      background-color: #fff;
      border: 1px solid #eee;
      font-size: 14px;
      margin-bottom: 10px;
      padding: 3px;
    }
    img {
      margin: 0 auto;
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  .item2 {
    margin-top: 10px;
    border: 1px solid #eee;
    margin-top: 20px;
    #anser1 {
      margin-top: 20px;
    }
    .anser {
      // margin-top: 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      margin-right: 10px;
      .workType {
        width: 130px;
      }
      p {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 12px;
        display: inline-block;
      }
      .anserinput {
        flex: 1;
        border: none;
      }
      .fabu {
        margin-left: 10px;
        width: 95%;
        height: 34px;
        background-color: #f25c29;
        color: #fff;
      }
    }
  }
}

.layer {
  .model {
    width: 700px;
    .arrangement {
      width: 100%;
      background: #ffffff;
      margin: 0 20px;
      padding: 0 20px;
      box-sizing: border-box;
      .yzm {
        .el-select {
          width: 80%;
        }
        .el-button {
          right: 0;
        }
      }
      .el-select {
        width: 100%;
      }
      .tit {
        position: relative;
        img {
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 0;
          width: 25px;
          height: 25px;
        }
      }
      .details {
        margin: 20px;
      }
      .con {
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>