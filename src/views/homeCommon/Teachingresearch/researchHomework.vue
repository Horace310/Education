<template>
  <div class="classList mt72 bf bx">
    <div class="bigBox">
      <div class="boxLeft">
        <div class="xueke">
          <!-- <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader> -->
        </div>
        <div class="three">
          <subject />
        </div>
      </div>
      <div class="boxRight">
        <div class="imgBox">
          <img src="../../../../static/images/作业列表.png" alt />
        </div>
        <div class="table">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8;">
                <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">作业名称</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">展示类型</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">功能</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">来源</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">时间</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                style="margin-bottom:5px"
                class="trHover"
              >
                <td style="padding:10px;font-size:16px">{{ index + 1 }}</td>
                <td style="padding:10px;font-size:16px">
                  <a href="javascript:void(0);" @click="toDetail">{{item.name}}</a>
                </td>
                <td style="padding:10px;font-size:16px">{{item.showType}}</td>
                <td style="padding:10px;font-size:16px">{{item.type}}</td>
                <td style="padding:10px;font-size:16px">{{item.source}}</td>
                <td style="padding:10px;font-size:16px">{{item.createTime}}</td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            class="page"
            style="color: #2ab8b3;"
            @current-change="handleCurrentChanges"
          ></el-pagination>
          <!-- <paginationVue /> -->
        </div>
        <div class="navImgBox">
          <img src="../../../../static/images/题目来源 .png" alt />
        </div>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="navBox">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="2" class="elItem" @click="number=1">
                  <img src="../../../../static/images/daoru.png" alt />
                  <span>Word导入</span>
                </el-menu-item>
                <el-menu-item index="3" class="elItem" @click="number=2">
                  <img src="../../../../static/images/tk.png" alt />
                  <span>平台题库</span>
                </el-menu-item>
                <el-menu-item index="4" class="elItem">
                  <img src="../../../../static/images/已往作业.png" alt />
                  <span>以往作业</span>
                </el-menu-item>
                <el-menu-item index="5" class="elItem">
                  <img src="../../../../static/images/专家购买.png" alt />
                  <span>专家购买</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row :gutter="24">
      <el-col :span="24">
        <!-- word导入 -->
        <div class="bigBox" v-if="number==1">
          <div class="testBox">
            <div class="wordBox">
              <iframe :src="url" frameborder="1" style="width:100%;height:600px"></iframe>
            </div>
            <div class="upload">
              <el-button class="myElBtn">读取文件</el-button>
              <input
                class="myInput"
                type="file"
                @change="changeFile"
                accept="application/msword, application/pdf, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style
              />
            </div>
          </div>
          <div class="problem">
            <div class="example">
              <div class="number">
                <span>导入</span>
                此题编码:
                <span class="Elastic">赋予每道题的编码实现智能化精准化</span>
                <el-button @click="addWordTest">加题</el-button>
              </div>

              <div class="analysis">
                <div class="myWord" v-for="(item,index) in myList " :key="index">
                  <span style="font-size: 0.296296rem;color: #159484;">题目：</span>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textarea"
                    style="width:98%"
                  ></el-input>
                </div>
                <div class="myWord">
                  <span style="font-size: 0.296296rem;color: #159484;">答案：</span>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textAnswer"
                    style="width:98%"
                  ></el-input>
                </div>
                <div class="myWord">
                  <span style="font-size: 0.296296rem;color: #159484;">解析：</span>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textresoul"
                    style="width:98%"
                  ></el-input>
                </div>
                <div class="item nature">
                  <div class="label"></div>
                  <div class="sort">
                    <div class="li" style="margin-top:20px">
                      <div class="head">题目属性:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item,index) in QuestionType"
                          :key="index"
                          :class="{active:typeNum==index}"
                          @click="wordType(item,index)"
                        >{{item.name}}</el-button>
                      </div>
                    </div>
                    <div class="li">
                      <div class="head">题目难度:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item, index) in difficulty"
                          :class="{ active: num2 == index }"
                          :key="index"
                          @click="chooseDifficulty(item, index)"
                        >{{ item.name }}</el-button>
                      </div>
                    </div>

                    <div class="li">
                      <div class="head">题目目标:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item, index) in target"
                          :key="index"
                          :class="{ active: targetNum == index }"
                          @click="chooseTarget(item, index)"
                        >{{ item.name }}</el-button>
                      </div>
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
                        @click="submitWord"
                      >确定</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Release">
              <el-button @click="release">发布预览</el-button>
            </div>
          </div>
        </div>
        <!-- 平台题库 -->
        <div class="bigBox" v-if="number==2">
          <div class="testBox">
            <div class="titles">
              <el-button
                @click="chooseAll"
                :type="type == 0 ? 'warning' : ''"
                style=" margin-left: 10px;"
              >全部</el-button>
              <el-button
                v-for="(item, index) in QuestionType"
                :key="index"
                @click="chooseType2(item, index)"
              >{{ item.name }}</el-button>
            </div>
            <div class="timu">
              <div class="list" v-for="(item, index) in tiku" :key="index">
                <span class="index">{{ index + 1 }}、</span>
                <div class="head" v-html="item.content"></div>
                <div class="answer" v-html="item.answer"></div>

                <div class="foot">
                  <p class="left">
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
                  <p class="right">
                    <span @click="addTest(item, index)" class="cursor">+试题篮</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="page">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :layout="layout"
                :total="countPage"
              ></el-pagination>
            </div>
          </div>
          <div class="problem">
            <div class="example" v-for="(item, index) in problem" :key="index">
              <div class="number">
                <span>导入</span>
                此题编码:
                <span class="Elastic">赋予每道题的编码实现智能化精准化</span>
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
                  <div class="label">解析:</div>
                  <div class="input">
                    <div class="contentTitle">
                      <ul>
                        <li>
                          <i class="el-icon-picture"></i>
                        </li>
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
                    <el-input v-model="questionScore" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="item nature">
                  <div class="label"></div>
                  <div class="sort">
                    <div class="li">
                      <div class="head">题目属性:</div>
                      <div class="btn">
                        <el-button style="background: #ff8a00;color:#fff">{{item.typeName}}</el-button>
                      </div>
                    </div>
                    <div class="li">
                      <div class="head">题目难度:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item, index) in difficulty"
                          :class="{ active: num2 == index }"
                          :key="index"
                          @click="chooseDifficulty(item, index)"
                        >{{ item.name }}</el-button>
                      </div>
                    </div>
                    <!-- <div class="li">
                      <div class="head">题目时间:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item, index) in time"
                          :key="index"
                          :class="{ active: timeNum == index }"
                          @click="chooseTime(item, index)"
                        >{{ item.name }}</el-button>
                      </div>
                    </div>-->
                    <div class="li">
                      <div class="head">题目目标:</div>
                      <div class="btn">
                        <el-button
                          v-for="(item, index) in target"
                          :key="index"
                          :class="{ active: targetNum == index }"
                          @click="chooseTarget(item, index)"
                        >{{ item.name }}</el-button>
                      </div>
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
            <div class="Release">
              <el-button @click="release">发布预览</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Utils from "../../../../static/js/util";
import subject from "../../../components/grade/subjects.vue";
import paginationVue from "../../../components/pagination/pagination";
// r富文本域
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
//
export default {
  name: "ResearchHomeWork",
  components: {
    subject,
    quillEditor
  },
  data() {
    return {
      number: 2,
      myList: [1],
      list: [],
      activeIndex: "2",
      activeIndex2: "1",
      input: "",
      client: null,
      videoName: "",
      timenum1: 0,
      activeIndex: this.$store.state.resnav,
      wordtypeName: "", //word题目类型名
      worddifficulty: "", //
      typeNum: 0, //word下标
      wordtypeId: 0,
      type: 0, //类型
      QuestionType: [], //类型列表
      tiku: [], //题库
      countPage: 1, //页数
      pageSize: 10, //页容量
      currentPage4: 1, //页数变化
      total: 1,
      QuestionType2index: "", //变化色块
      problem: [], //右边题目
      storeId: [], // 题库ID
      questionScore: 5, //分值
      num2: 0, //难度选择下标
      timeNum: 0, //时间选择下标
      targetNum: 0, //目标选择下标
      difficultyConter: "", //难度选择
      timeType: "", //时间选择
      targetName: "", //目标选择
      chapterId: 0, //章节ID
      sort: 1, //题顺序
      insertId: [], //确题目Id
      url: "", //word路径
      textarea: "", //题目
      textAnswer: "", //题目答案
      textresoul: "", //题目解析
      audioUrl: "",
      workId: 0, //wordId
      researchId: this.$route.query.id,
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" }
        // { name: "自定义" }
      ],
      time: [
        { name: "宽松" },
        { name: "合适" },
        { name: "超时" }
        // { name: "自定义" }
      ],
      target: [
        { name: "单一知识目标" },
        { name: "多知识目标" }
        // { name: "自定义" }
      ],
      layout: "prev, pager, next, jumper",
      routers: [
        { path: "/homeCommon/resourceTools" },
        { path: "/homeCommon/resourceTools/uploadVideo" },
        { path: "/homeCommon/resourceTools/researchResult" },
        { path: "/homeCommon/resourceTools/academicCircle" },
        { path: "/homeCommon/resourceTools/sb" }
      ]
    };
  },
  created() {
    this.getType();
    this.getWorkList();
    var that = this;
    Utils.$on("getData", function(msg) {
      that.chapterId = msg.id;
      that.getWorkList();
    });
  },
  methods: {
    addWordTest() {
      var i = 1;
      i++;
      this.myList.push(i);
      console.log(this.myList);
    },
    handleCurrentChanges(v) {
      //  console.log(v);
      this.countPage = v;
      this.getWorkList();
    },
    //获取作业列表
    getWorkList() {
      let data = {
        rid: this.$route.query.id,
        userId: sessionStorage.getItem("userId"),
        indexNo: this.countPage,
        rows: 10,
        pid: this.chapterId
      };
      this.$get("/user/research/homework/findListByPid", data).then(res => {
        if (res.code == "5000") {
          this.list = res.data.date;
          this.total = res.data.total;
          //  console.log(this.list);
        }
      });
    },
    //选择word属性
    wordType(item, index) {
      this.wordtypeName = item.name;
      this.wordtypeId = item.id;
      this.typeNum = index;
    },
    //读取word
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
    chooseDifficulty(item, index) {
      this.difficultyConter = item.name;
      this.num2 = index;
    },
    chooseTime(item, index) {
      this.timeType = item.name;
      this.timeNum = index;
    },
    chooseTarget(item, index) {
      this.targetName = item.name;
      this.targetNum = index;
    },
    toDetail() {},
    //选择全部
    chooseAll() {
      this.type = 0;
      this.queryHomework();
    },
    //点击类型
    chooseType2(item, index) {
      this.type = item.id;
      this.QuestionType2index = index;
      this.queryHomework();
    },
    //获取选择类型
    getType() {
      this.$get("/user/homework/store/findTypeBySubjectId", {
        subjectId: sessionStorage.getItem("subjectId")
      }).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
        }
      });
    },
    //根据类型查找作业
    queryHomework(e) {
      let data = {
        subjectId: sessionStorage.getItem("subjectId"),
        typeId: this.type,
        indexNo: this.currentPage4,
        rows: this.pageSize
      };
      this.$get("/user/homework/store/findAllList", data).then(res => {
        if (res.code == "5000") {
          this.tiku = res.data.date;
          this.countPage = res.data.total;
        }
      });
    },
    //题库下一页
    handleCurrentChange(e) {
      this.currentPage4 = e;
      this.queryHomework();
    },
    //加题
    addTest(item, index) {
      this.$message({ type: "success", message: "添加成功" });
      this.problem.push(item);
      this.storeId.push(item.id);
      this.sort = index++;
      // console.log(item);
    },
    //平台题库确认题目
    confirm(item, index) {
      let data = {
        storeId: item.id,
        content: item.content,
        answer: item.answer,
        resolution: item.resolution,
        typeName: item.typeName,
        score: this.questionScore,
        typeId: this.type,
        difficulty: this.difficultyConter,
        //  timeType: this.timeType,
        target: this.targetName,
        //   sound: this.audioUrl,
        sort: this.sort,
        chapterId: this.chapterId
      };
      this.$post("/user/research/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.insertId.push(res.data);
          var workId = JSON.stringify(this.insertId);
          sessionStorage.setItem("researchWorkId", workId);
          this.$message({ type: "success", message: "更新成功" });
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    //文档确定题目
    submitWord() {
      let data = {
        chapterId: this.chapterId,
        typeId: this.wordtypeId,
        typeName: this.wordtypeName,
        content: this.textarea,
        answer: this.textAnswer,
        resolution: this.textresoul,
        score: this.questionScore,
        difficulty: this.difficultyConter,
        timeType: this.timeType,
        target: this.targetName,
        sort: this.sort
      };
      this.$post("/user/research/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "成功" });
          this.workId = res.data;
        } else {
          this.$message({ type: "error", message: "请选择章节" });
        }
      });
    },
    //删除题目
    deleteProblem(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.problem.splice(index, 1);
      });
    },
    //发布
    release() {
      if (this.number == 1) {
        this.$router.push({
          path: "/homeCommon/TeachingResearch/researchRelease",
          query: {
            id: this.workId,
            chapterId: this.chapterId,
            rid: this.researchId
          }
        });
      }
      if (this.number == 2) {
        var totals = this.problem.length * this.questionScore;
        sessionStorage.setItem("researchTotal", totals);
        var list = JSON.stringify(this.problem);
        sessionStorage.setItem("researchList", list);
        //  console.log(this.chapterId, this.researchId);

        this.$router.push({
          path: "/homeCommon/TeachingResearch/researchRelease",
          query: {
            chapterId: this.chapterId,
            rid: this.researchId
          }
        });
      }
    }
  },
  watch: {
    "$store.state.resnav": "getNavType"
  }
};
</script>

<style lang="less" scoped>
@color: #ff8a00;
.active {
  background-color: #ff8a00;
}

.classList {
  border: 1px solid #eee;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  .problem {
    margin-top: 10px;
    margin-bottom: 70px;
    background-color: #fff;
    position: relative;
    width: 50%;
    display: inline-block;
    border: 1px solid #eee;
    .Release {
      border-top: 10px solid #eee;
      height: 70px;
      width: 100%;
      position: absolute;
      bottom: -70px;
      background-color: #fff;
      button {
        margin-top: 20px;
        margin-left: 50%;
        background: #ff8a00;
        color: #fff;
        border: 0;
      }
    }
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
  .testBox {
    width: 49%;
    border: 1px solid #eee;
    margin-top: 10px;
    display: inline-block;
    background-color: #fff;
    .upload {
      height: 80px;
      .myElBtn {
        position: absolute;
        bottom: 0;
        left: 22%;
        //   z-index: 2;
        background-color: @color;
        color: #fff;
      }
      .myInput {
        position: absolute;
        bottom: 0;
        left: 22%;
        z-index: 2;
        opacity: 0;
      }
    }
    .titles {
      padding-top: 10px;
      padding-left: 10px;
      box-sizing: border-box;
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
          .left {
            justify-content: flex-start;
          }
          .right {
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
  .bigBox {
    box-sizing: border-box;
    width: 100%;
    //  height: 1000px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // overflow: hidden;
    .boxLeft {
      width: 15%;
      //  border-right: 1px solid #eee;
      padding: 10px;
      background-color: #fff;
      border-right: 10px solid #f8f8f8;
      .xueke {
        width: 100%;
        padding: 3px;
      }
      .three {
        padding: 10px 0px;
        //    border-top: 1px solid #eee;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
      }
    }
    .boxRight {
      flex: 1;
      //   padding: 10px;
      background-color: #fff;
      .imgBox {
        width: 100%;
        height: 70px;
        img {
          margin-top: 15px;
        }
      }
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        //  border: 1px solid #2ab8b3;
        margin-bottom: 15px;
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
      .navImgBox {
        border-top: 10px solid #eee;
        height: 56px;
        img {
          margin-top: 13px;
        }
      }
      .navBox {
        width: 100%;
        .el-menu-demo {
          width: 100%;
          height: 158px;
          .elItem {
            text-align: center;
            width: 25%;
            height: 100%;
            border: 1px solid #eee;
            padding: 20px;
            img {
              display: block;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}
</style>
