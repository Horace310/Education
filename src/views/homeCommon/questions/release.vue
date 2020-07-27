<template>
  <div id="printMe">
    <div class="main mt72">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/homeCommon/questions?homeworkId=${this.$route.query.homeworkId}&title=${this.$route.query.title}&subjectId=${this.$route.query.subjectId}&update=2` }"
        >作业模板</el-breadcrumb-item>
        <el-breadcrumb-item>发布试题</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="formwork">
        <img class="code" :src="code" alt />
        <h3 class="title">作业模板</h3>
        <p class="work_name">
          <span>{{title[0]}}-</span>
          <span>{{title[1]}}-</span>
          <span>{{title[2]}}-</span>
          <span>{{title[3]}}</span>
          <span v-show="title[4]!=''">-{{title[4]}}</span>
          <span v-show="title[5]!=''">-{{title[5]}}</span>
          <span v-show="title[6]!=''">-{{title[6]}}</span>
        </p>
        <div class="establish">
          <div class="left">
            <div class="item">
              <div class="label">布置班级</div>
              <div class="input">
                <el-select v-model="value" @change="changeValue" placeholder="请选择" multiple>
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <el-button type="primary" @click="createClassed">创建班级</el-button>
            </div>
            <div class="item">
              <div class="label">作业名称</div>
              <div class="input">
                <el-input v-model="homeworkName" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="label">截止时间</div>
              <div class="input">
                <el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <!-- <el-input v-model="value" placeholder=""></el-input> -->
              </div>
            </div>
            <div class="item">
              <div class="label">认识水平</div>
              <div class="input">
                <el-select v-model="level" placeholder="请选择认识水平">
                  <el-option label="初级" value="1"></el-option>
                  <el-option label="中级" value="2"></el-option>
                  <el-option label="高级" value="3"></el-option>
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="label">作业类型</div>
              <div class="input">
                <el-select v-model="type" placeholder="请选择作业类型">
                  <el-option label="结构化作业" value="0"></el-option>
                  <el-option label="非结构化作业(扩散性或探究型作业)" value="1"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <div class="label">解决问题</div>
              <div class="input">
                <el-input type="textarea" v-model="solveProblem"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="label">知识点</div>
              <div class="input">
                <el-input type="textarea" v-model="knowledge"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="label">预计用时</div>
              <div class="input">
                <el-input type="text" v-model="expectTime">
                  <template slot="append">分钟</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="subject">
        <div class="import-out">
          <div class="title">已导入的试题</div>
          <Subjects :questionList="questionList"></Subjects>
          <div class="Release" v-if="false">
            <span @click="release">发布预览</span>
            <span>选择视频</span>
          </div>
          <div class="nodata" v-if="false">
            <img src="../../../../static/images/nodata.png" alt />
            <span>暂无导入试题</span>
          </div>
        </div>
      </div>

      <div class="video" v-show="order">
        <div class="title">已导入的视频</div>
        <div class="order">
          <div class="list" v-for="(item, index) in order" :key="index">
            <img :src="item.src" alt />
            <p class="name">{{ item.name }}</p>
            <div class="foot">
              <span class>{{ item.creatTime }}</span>
              <span @click="deleteVideo(item, index)">删除</span>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm">
        <el-button type="warning" @click="confirm" v-if="update != 3">
          {{
          update == 1 ? "确定发布" : update == 2 ? "更新发布" : ""
          }}
        </el-button>
        <el-button type="primary" @click="againEdit">重新编辑</el-button>
        <el-button type="primary" v-print="'#printMe'">打印</el-button>
        <el-button type="primary">下载</el-button>
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
//  import creatClass from '../../../components/creatClass/creatClass'
import recording from "../../../../static/js/recorder.js";
import Subjects from "../../../components/subject/subject.vue";
export default {
  components: {
    Subjects,
    creatClass
  },
  filters: {
    levels(e) {
      console.log(e);
      return e == 1 ? "初级" : e == 2 ? "中级" : "高级";
    },
    types(e) {
      return e == 1 ? "结构化作业" : "非结构化作业";
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      value1: 0,
      value: [],
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
      test:
        "1.（2019•海南模拟）2018年6月3日，海南宣布设立海南自贸区海口江东新区，总面积约298000000平方米．数据298000000用科学记数法表示为（　　）",
      answerNum: ["A", "B", "C", "D"],
      number: "1145740",
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
      questionList: [],
      endTime: "",
      classlist: [],
      solveProblem: "",
      expectTime: "",
      knowledge: "",
      type: "",
      types: [],
      level: "",
      order: "",
      update: this.$route.query.update
    };
  },
  created() {
    this.homeworkId = this.$route.query.homeworkId;
    this.title = this.$route.query.title.split(",");
    this.getHomework();
    this.QuestionType();
    this.queryCreateClass();
  },
  methods: {
    //选择班级
    changeValue(e) {
      console.log(e);
      console.log(this.value);
    },
    // 获取创建的班级列表接口
    queryCreateClass(e) {
      this.$post("/likework/queryCreateClass.do").then(res => {
        if (res.code == "5000") {
          this.options = res.data;
        }
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
    // 重新编辑
    againEdit(e) {
      this.$router.push({
        path: "/homeCommon/questions",
        query: {
          homeworkId: this.$route.query.homeworkId,
          title: this.$route.query.title,
          subjectId: this.$route.query.subjectId,
          update: 2
        }
      });
    },
    // 确认发布
    confirm(e) {
      if (this.update == 1) {
        let data = { homeworkId: this.homeworkId };
        this.$post("/likework/publishHomeworkById.do", data).then(res => {
          if (res.code == "5000") {
            this.$message({ message: "发布成功!", type: "success" });
          }
        });
      } else {
        let data = {
          id: this.homeworkId,
          classIdList: this.value.join(":"),
          homeworkName: this.homeworkName,
          solveProblem: this.solveProblem,
          knowledge: this.knowledge,
          endTime: this.endTime,
          expectTime: this.expectTime,
          level: this.level,
          type: this.type
        };
        this.$post("/likework/updateClassHomework.do", data).then(res => {
          if (res.code == "5000") {
            this.$message.success("更新成功!");
          }
        });
      }
    },
    getHomework() {
      let data = { homeworkId: this.homeworkId };
      this.$post("/likework/queryHomeworkById.do", data).then(res => {
        if (res.code == "5000") {
          console.log(res);
          let data = res.data;
          this.homeworkId = data.id;
          this.homeworkName = data.homeworkName;
          this.endTime = data.endTime;
          this.knowledge = data.knowledge;
          //this.classlist = data.classList;
          let value = [],
            name = [];
          data.classList.forEach((item, index) => {
            value.push(item.id);
            name.push(item.name);
          });
          this.value = value;
          this.classId = value.join(":");
          //this.type = data.type==1?'结构化作业':'非结构化作业';
          //this.level = data.level==1?'初级':data.level==2?'中级':'高级';
          this.type = String(res.data.type);
          this.level = String(res.data.level);
          this.expectTime = data.expectTime;
          this.solveProblem = data.solveProblem;
          this.code = data.code;

          // this.audioUrl = data.url;
          data.questionList.forEach((item, index) => {
            item.t = null;
            item.recorder = null;
            item.value = "";
            item.checked = 1;
            if (item.property === null) {
              (item.difficultyindex = 0),
                (item.timeindex = 0),
                (item.targetindex = 0),
                (item.QuestionTypeindex = 0);
              return false;
            }
            item.propertys = JSON.parse(item.property);
            this.time.forEach((items, indexs) => {
              if (item.propertys["时间"] == items.name) {
                item.timeindex = indexs;
              }
            });
            this.target.forEach((items, indexs) => {
              if (item.propertys["目标"] == items.name) {
                item.targetindex = indexs;
              }
            });
            this.difficulty.forEach((items, indexs) => {
              if (item.propertys["难度"] == items.name) {
                item.difficultyindex = indexs;
              }
            });
            console.log(item);
            // item.propertys.forEach((items,indexs)=>{
            //   console.log(items);
            // })
          });
          this.questionList = data.questionList;
          this.order = data.videoList;
        }
      });
    },
    // 获取题目全部题型接口
    QuestionType(e) {
      this.$post("/likework/queryQuestionTypeSelect.do").then(res => {
        if (res.code == "5000") {
          this.types = res.data;
        }
      });
    },
    tabs(e) {
      this.tabsNum = e;
    },
    chooseTypes(item, index) {
      item.type = index;
    },
    chooseDifficulty(item, index) {
      item.difficultyindex = index;
    },
    chooseTime(item, index) {
      item.timeindex = index;
    },
    chooseTarget(item, index) {
      console.log(item);
      item.targetindex = index;
    },
    release(e) {
      this.$router.push({ path: "/home/questions/release" });
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
        console.log(item.checked);
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
    }
  }
};
</script>
<style lang="less">
@color: #2592e7;
#printMe {
  .main {
    .el-breadcrumb {
      font-size: 16px;
      color: #333;
      height: 45px;
      line-height: 45px;
    }
    .formwork {
      width: 100%;
      background: #fff;
      position: relative;
      .code {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 60px;
        height: 60px;
      }
      .title {
        font-size: 20px;
        color: #333;
        padding-top: 22px;
        margin-bottom: 10px;
        text-align: center;
      }
      .work_name {
        font-size: 14px;
        color: @color;
        text-align: center;
      }
      .establish {
        display: flex;
        justify-content: flex-start;
        padding: 30px 50px;
        .left {
          padding-right: 40px;
          .item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 40px;
            margin-bottom: 30px;
            .label {
              font-size: 16px;
              color: #000;
              margin-right: 20px;
            }
            .input {
              width: 300px;
              margin-right: 20px;
              input {
                width: 100%;
              }
              .el-select {
                width: 100%;
              }
            }
          }
        }
        .right {
          flex: 1;
          .item {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 30px;
            .label {
              font-size: 16px;
              color: #333;
              min-width: 90px;
              line-height: 40px;
              margin-right: 20px;
            }
            .input {
              flex: 1;
              textarea {
                width: 100%;
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 10px;
                min-height: 90px !important;
                border-color: #aaa;
              }
            }
          }
        }
      }
      .template {
        padding: 43px 93px;
        padding-bottom: 0;
        display: flex;
        justify-content: flex-start;
        //   align-items: center;
        .left {
          width: 50%;
          .item {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 39px;
            .label {
              //   margin-right: 15px;
              font-size: 16px;
              color: #333;
              min-width: 90px;
            }
            .input {
              font-size: 14px;
              color: #666;
            }
          }
        }
        .right {
          width: 50%;
          box-sizing: border-box;
          padding-left: 93px;
          .item {
            display: flex;
            justify-content: flex-start;
            .label {
              min-width: 90px;
              font-size: 16px;
              color: #333;
            }
            .input {
              font-size: 14px;
              color: #666;
              flex: 1;
              min-height: 100px;
              span {
                display: block;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
    .subject {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      width: 100%;
      background: #fff;
      .import-out {
        flex: 0.6;
        background: #fff;
        position: relative;
        // width: 50%;
        .title {
          font-size: 18px;
          color: @color;
          text-align: center;
          padding-top: 26px;
        }
        .nodata {
          margin-top: 100px;
          text-align: center;
          img {
            width: 258px;
            height: 207px;
          }
          span {
            display: block;
            font-size: 16px;
            color: #b3b3b3;
            margin-top: 10px;
          }
        }
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
                  color: @color;
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
        .Release {
          position: absolute;
          bottom: 20px;
          width: 100%;
          text-align: center;
          span {
            font-size: 18px;
            color: #fff;
            background: @color;
            margin: 0 30px;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
    }
    .confirm {
      width: 100%;
      display: flex;
      background: #fff;
      justify-content: center;
      padding-bottom: 40px;
      .el-button {
        min-width: 98px;
        margin: 0 20px;
      }
    }
  }
}
</style>
