<template>
  <div id="questions">
    <div class="main mt72">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>作业模板</el-breadcrumb-item>
        <el-breadcrumb-item>发布试题</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="formwork">
        <img class="code" :src="code" alt />
        <h3 class="title">作业模板</h3>
        <p class="work_name">
          <span>{{ title[0] }}-</span>
          <span>{{ title[1] }}-</span>
          <span>{{ title[2] }}-</span>
          <span>{{ title[3] }}</span>
          <span v-show="title[4] != ''">-{{ title[4] }}</span>
          <span v-show="title[5] != ''">-{{ title[5] }}</span>
          <span v-show="title[6] != ''">-{{ title[6] }}</span>
        </p>
        <div class="establish" v-if="true">
          <div class="left">
            <div class="item">
              <div class="label">布置班级</div>
              <div class="input">
                <el-select v-model="value" multiple placeholder="请选择">
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
        <!-- <div class="template" v-else>
          <div class="left">
            <div class="item">
              <div class="label">布置班级</div>
              <div class="input">
                <span v-for="item in classlist">{{ item.name }}</span>
              </div>
            </div>
            <div class="item">
              <div class="label">作业名称</div>
              <div class="input">{{ homeworkName }}</div>
            </div>
            <div class="item">
              <div class="label">截止时间</div>
              <div class="input">{{ endTime }}</div>
            </div>
            <div class="item">
              <div class="label">认知水平</div>
              <div class="input">{{ level | levels }}</div>
            </div>
            <div class="item">
              <div class="label">作业类型</div>
              <div class="input">{{ type | types }}</div>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <div class="label">
                解决问题
              </div>
              <div class="input">
                <span>{{ solveProblem }}</span>
              </div>
            </div>
            <div class="item">
              <div class="label">知识点</div>
              <div class="input">
                <span>{{ knowledge }}</span>
              </div>
            </div>
            <div class="item">
              <div class="label">预计用时</div>
              <div class="input">
                {{ expectTime }}
              </div>
            </div>
          </div>
        </div>-->
      </div>

      <div class="subject" v-show="!show">
        <div class="import-in">
          <div class="btn">
            <el-button
              type="primary"
              :class="tabsNum == index ? 'active' : ''"
              @click="tabs(index)"
              v-for="(item, index) in btns"
              :key="index"
            >{{ item }}</el-button>
          </div>

          <div
            class="content"
            :class="{ pros: tabsNum == 2 || questionImage }"
            v-if="question == ''"
          >
            <div class="tips" v-show="tabsNum == 0">
              <p class="title">点击查看之前上传的图片>></p>
              <div class="code">
                <img src="../../../../static/images/code.png" alt />
              </div>
              <div class="codetips">
                <span>1.先添加小程序(名称：爱课生）</span>
                <span>2.手机拍照，小程序扫码上传图片</span>
              </div>
            </div>
            <div class="tips" v-show="tabsNum == 1">
              <p class="title">点击查看之前上传的图片>></p>
              <div class="code">
                <!-- <div :style="previews.div"> -->
                <img v-show="!previews.url" src="../../../../static/images/addImage.jpg" alt />
                <!-- </div> -->

                <div
                  class="show-preview"
                  v-show="previews.url"
                  :style="{
                    width: previews.w + 'px',
                    height: previews.h + 'px',
                    overflow: 'hidden',
                    margin: '5px'
                  }"
                >
                  <div :style="previews.div">
                    <img :src="previews.url" :style="previews.img" />
                  </div>
                </div>
                <div style="overflow:hidden;" :style="previews.url ? '' : 'height:0'">
                  <div class="cropper">
                    <VueCropper
                      ref="cropper"
                      :img="option.img"
                      :outputSize="option.size"
                      :outputType="option.outputType"
                      :info="true"
                      :full="option.full"
                      :canMove="option.canMove"
                      :canMoveBox="option.canMoveBox"
                      :original="option.original"
                      :autoCrop="option.autoCrop"
                      :autoCropWidth="option.autoCropWidth"
                      :autoCropHeight="option.autoCropHeight"
                      :fixedBox="option.fixedBox"
                      @realTime="realTime"
                      @imgLoad="imgLoad"
                    ></VueCropper>
                  </div>
                </div>
                <!-- <div class="" v-html="previews.html"></div> -->
              </div>
              <div class="addimg">
                <div class="upload">
                  <el-button type="primary">上传图片</el-button>
                  <input type="file" id="uploadImage" @change="changeFile" />
                </div>
                <el-button type="primary" @click="finish('blob')">生成题目</el-button>
              </div>
            </div>
            <div class="topic" v-show="tabsNum == 2">
              <div class="titles">
                <el-button @click="chooseAll" :type="type2 == 0 ? 'primary' : ''">全部</el-button>
                <el-button
                  v-for="(item, index) in QuestionType"
                  :key="index"
                  :type="QuestionType2index == index ? 'primary' : ''"
                  @click="chooseType2(item, index)"
                >{{ item.typeName }}</el-button>
              </div>
              <div class="timu">
                <div class="list" v-for="(item, index) in tiku" :key="index">
                  <span class="index">{{ index + 1 }}、</span>
                  <div class="head" v-html="item.content"></div>
                  <div class="answer" v-html="item.answer"></div>
                  <!-- <div class="property" v-html="item.property"></div> -->
                  <div class="foot">
                    <p class="left">
                      使用次数:
                      <span>{{ item.number }}</span>
                    </p>
                    <p class="right">
                      <span @click="addTest(item, index)" class="cursor">+试题篮</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="countPage"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="count" v-else>
            <div class="title">有理数课后作业练习</div>
            <div class="answer">
              <el-radio v-model="radio" label="1">包含答案</el-radio>
              <el-radio v-model="radio" label="2">不包含答案</el-radio>
            </div>
            <div class="picture">
              <img :src="question" alt />
            </div>
          </div>
        </div>
        <div class="import-out">
          <div class="title">已导入的试题</div>

          <div class="problem" v-if="problem.length != 0">
            <div class="example" v-for="(item, index) in problem" :key="index">
              <div class="number">
                <span>导入</span>
                此题编码:{{ item.code }}
              </div>
              <div class="test" v-html="item.content">
                <!-- {{  }} -->
                <!-- <div class="text">
                  <span v-for="(item, index) in answer" :key="index">
                    {{ answerNum[index] }}. {{ item.text }}
                  </span>
                </div>-->
              </div>
              <div class="analysis">
                <div class="item">
                  <div class="label">答案1:</div>
                  <div class="input">
                    <!-- <el-input
                      type="textarea"
                      v-model="item.answer"
                      v-html="item.answer"
                      placeholder="请输入内容"
                    ></el-input>-->
                    <div class="editDemo" contenteditable="true" v-html="item.answer"></div>
                  </div>
                </div>
                <div class="item">
                  <div class="label">解析:</div>
                  <div class="input">
                    <div id="content" contenteditable="true" class="editDemo" v-html="resolution"></div>
                    <!-- <el-input
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>-->
                    <!-- <quill-editor
                      v-model="item.resolution"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"
                    >
                    </quill-editor>-->

                    <!-- <iframe
                      src="http://192.168.1.16:8090/index1.html"
                      frameborder="0"
                    ></iframe>-->
                  </div>
                </div>
                <div class="item">
                  <div class="label">分值:</div>
                  <div class="input">
                    <el-input v-model="item.score" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="item nature">
                  <div class="label">题目属性:</div>
                  <div class="sort">
                    <div class="li">
                      <div class="head">题目属性:</div>
                      <div class="btn">
                        <el-button
                          v-for="(items, indexs) in QuestionType"
                          :key="indexs"
                          :class="
                            item.QuestionTypeindex == indexs ? 'active' : ''
                          "
                          @click="chooseType(item, indexs)"
                        >{{ items.typeName }}</el-button>
                      </div>
                    </div>
                    <div class="li">
                      <div class="head">难度:</div>
                      <div class="btn">
                        <el-button
                          v-for="(items, indexs) in difficulty"
                          :class="
                            item.difficultyindex == indexs ? 'active' : ''
                          "
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
                          :class="item.timeindex == indexs ? 'active' : ''"
                          @click="chooseTime(item, indexs)"
                        >{{ items.name }}</el-button>
                      </div>
                    </div>
                    <div class="li">
                      <div class="head">目标:</div>
                      <div class="btn">
                        <el-button
                          v-for="(items, indexs) in target"
                          :key="indexs"
                          :class="item.targetindex == indexs ? 'active' : ''"
                          @click="chooseTarget(item, indexs)"
                        >{{ items.name }}</el-button>
                      </div>
                    </div>
                    <span class="custom">自定义属性</span>
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
                        {{
                        item.checked == 0 ? "完成" : "重新录制"
                        }}
                      </el-button>
                      <el-button @click="deleteVoice">删除语音</el-button>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="btn" style="width:100%;display:flex;justify-content:flex-end;">
                    <div class="right" style>
                      <el-button type="primary" class="confirm" @click="confirm(item, index)">确定</el-button>
                      <el-button
                        type="warning"
                        class="delete"
                        @click="deleteProblem(item, index)"
                      >删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="nodata" v-else>
            <img src="../../../../static/images/nodata.png" alt />
            <span>暂无导入试题</span>
          </div>
          <div class="Release">
            <span @click="release">发布预览</span>
            <span @click="chooseVideo">选择视频</span>
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
// import '../../../../static/style/default.css'
// import '../../../../static/jmeditor/jquery-1.8.3.min.js'
// import '../../../../static/jmeditor/JMEditor.js'
// $(function(){
//   // console.log($('#content').text())
//   console.log(54321)
// })
import creatClass from "../../../components/creatClass/creatClass";
import recording from "../../../../static/js/recorder.js";
import Subjects from "@/components/subject/subject";
import VueCropper from "vue-cropper";

export default {
  components: {
    creatClass,
    Subjects,
    VueCropper
  },
  data() {
    return {
      centerDialogVisible: false,
      currentPage4: 1,
      countPage: 1,
      pageSize: 10,
      audioUrl: "",
      content: "",
      homeworkName: "",
      solve: "",
      value: [],
      input: "",
      problem: [],
      scoreValue: "",
      answerValue: "",
      max: "",
      value1: 0,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "formula"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"]
          ]
        }
      },
      questionImage: "",
      headImg: "",
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: true
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）

      QuestionType2index: "",
      style: "width:100%;",
      options: [],
      tabsNum: 0,
      btns: ["导入试题", "图片传题", "平台题库"],
      question: "",
      // question: "../../../../static/images/picture.jpg",
      radio: "1",
      test:
        "1.（2019•海南模拟）2018年6月3日，海南宣布设立海南自贸区海口江东新区，总面积约298000000平方米．数据298000000用科学记数法表示为（　　）",
      answerNum: ["A", "B", "C", "D"],
      number: "1145740",
      QuestionType: [],
      QuestionTypeindex: "",
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
      difficultyindex: "",
      time: [
        { name: "宽松" },
        { name: "合适" },
        { name: "超时" },
        { name: "自定义" }
      ],
      timeindex: "",
      target: [
        { name: "但一知识目标" },
        { name: "多知识目标" },
        { name: "自定义" }
      ],
      tiku: [],
      targetindex: "",
      title: [],
      homeworkId: "",
      subjectId: this.$route.query.subjectId,
      max: 10,
      checked: 1,
      recorder: null,
      t: null,
      sound: "../../../../static/images/picture.jpg",
      classId: "",
      show: false,
      code: "../../../../static/images/code.png",
      type2: 0,
      QuestionType2index: 999999,
      resolution: "",
      level: "",
      expectTime: "",
      solveProblem: "",
      endTime: "",
      knowledge: "",
      type: "",
      update: this.$route.query.update
    };
  },
  components: {
    creatClass
  },
  created() {
    (this.title = this.$route.query.title.split(",")),
      (this.homeworkId = this.$route.query.homeworkId);
    if (this.$route.query.tabsNum) {
      this.tabsNum = this.$route.query.tabsNum;
    }
    this.queryHomework(this.type2);
    this.queryHomeworkById();
    this.QuestionTypeSelect();
  },
  methods: {
    //VueCropper

    //放大/缩小
    changeScale(num) {
      console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      console.log("finish");
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          console.log(data);
          var img = window.URL.createObjectURL(data);
          let type = data.type.split("/")[1];
          const reader = new FileReader();
          reader.readAsArrayBuffer(data);
          reader.onload = e => {
            this.uploadImage(e, type, res => {
              console.log(res);
              console.log(this.problem);
              this.problem.push({
                content: `<div><img src=${res.url} /></div>`,
                addway: 2,
                answer: "",
                code: null,
                createTime: "",
                id: null,
                property: null,
                resolution: "",
                score: 0,
                sound: null,
                type: 0,
                QuestionTypeindex: 0,
                addway: 2,
                difficultyindex: 0,
                t: null,
                targetindex: 0,
                timeindex: 0,
                userCount: null
              });
            });
          };

          console.log(img);
          //this.modelSrc = img
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      console.log("realTime");
      console.log(data);
      this.previews = data;
    },
    //下载图片
    down(type) {
      console.log("down");
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      console.log("uploadImg");
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    },

    // VueCropper

    changeFile(e) {
      console.log(e);
      let file = e.target.files[0];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = function() {
        that.option.img = reader.result;
        that.questionImage = reader.result;
        console.log(reader);
      };
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
    // 删除题目
    deleteProblem(item, index) {
      let data = { questionId: item.id };
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("/likework/deleteHomeworkQuestion.do", data).then(res => {
          console.log(res);
          if (res.code == "5000") {
            this.$message({ message: "删除成功!", type: "success" });
            this.problem.splice(index, 1);
          }
        });
      });
    },
    // 获取导入的试题
    // gethomework(){
    //   let data={
    //     homeworkId:this.homeworkId
    //   };
    //   this.$post('/likework/queryHomeworkById.do',data).then(res=>{
    //     if(res.code=="5000"){

    //     }
    //   })
    // },
    // 加入试题篮
    addTest(item, index) {
      let data = { homeworkId: this.homeworkId, storeId: item.id };
      this.$post("/likework/addStoreToQuestion.do", data).then(res => {
        if (res.code == "5000") {
          console.log(res);
          this.$message({ message: "添加成功", type: "success" });
          this.queryHomeworkById();
        }
      });
    },
    // 选择全部
    chooseAll() {
      this.type2 = 0;
      this.QuestionType2index = 99999;
      this.queryHomework(this.type2);
    },
    // 选择图库类型
    chooseType2(item, index) {
      this.type2 = 1;
      this.QuestionType2index = index;
      this.queryHomework(this.QuestionType2index + 1);
    },
    // 翻页
    handleCurrentChange(e) {
      this.currentPage4 = e;
      if (this.type2 == 0) {
        this.queryHomework(this.type2);
      } else {
        this.queryHomework(this.QuestionType2index + 1);
      }
    },
    //pageSize
    handleSizeChange(e) {
      this.pageSize = e;
      if (this.type2 == 0) {
        this.queryHomework(this.type2);
      } else {
        this.queryHomework(this.QuestionType2index + 1);
      }
    },
    // 获取题库
    queryHomework(e) {
      let data = {
        subjectId: this.subjectId,
        type: e,
        indexNo: this.currentPage4,
        rows: this.pageSize
      };
      this.$post("/likework/queryHomeworkStoreList.do", data).then(res => {
        console.log(res);
        if (res.code == "5000") {
          this.tiku = res.data.rows;
          this.countPage = res.data.count;
          this.currentPage4 = res.data.indexNO;
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
      this.QuestionType.forEach((item, index) => {
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
              console.log(response);
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
            console.log(item);
          });

          this.problem = res.data.questionList;
          this.queryCreateClass();
          // this.question = res.data.code;
        }
      });
    },
    // 获取创建的班级列表接口
    queryCreateClass(e) {
      this.$post("/likework/queryCreateClass.do").then(res => {
        if (res.code == "5000") {
          this.options = res.data;
        }
      });
    },
    onEditorBlur(e) {
      console.log(e);
    },
    onEditorFocus(e) {
      console.log(e);
    },
    onEditorChange(e) {
      console.log(e);
      this.resolution = e.text;
    },
    QuestionTypeSelect(e) {
      this.$post("/likework/queryQuestionTypeSelect.do").then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
        }
      });
    },
    tabs(e) {
      this.tabsNum = e;
    },
    chooseType(item, index) {
      console.log(item);
      item.QuestionTypeindex = index;
    },
    chooseDifficulty(item, index) {
      item.difficultyindex = index;
    },
    chooseTime(item, index) {
      item.timeindex = index;
    },
    chooseTarget(item, index) {
      item.targetindex = index;
    },
    release(e) {
      // this.show = true;
      // return false;
      this.$router.push({
        path: "/homeCommon/questions/release",
        query: {
          homeworkId: this.homeworkId,
          title: this.$route.query.title,
          update: this.update,
          subjectId: this.$route.query.subjectId
        }
      });
    },
    // 录入语音
    setaudio() {
      if (this.checked == 0) {
        console.log(this.checked);
        return false;
      }
      recording.get(res => {
        if (res) {
          console.log(res);
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
    // 判断是否点击完成
    getChecked() {
      if (this.checked == 0) {
        this.checked = 1;
        this.recorder.stop();
        this.getBlob();
        clearInterval(this.t);
      } else {
        this.value1 = 0;
        this.setaudio();
      }
    },
    // 选择视频
    chooseVideo(e) {
      this.$router.push({
        path: "/homeCommon/resourceTools/uploadVideo",
        query: { video: 1, classId: this.value.join(":") }
      });
    },
    // 删除语音
    deleteVoice(e) {},
    // 获取语音二进制文件
    getBlob(e) {
      // 获取语音二进制文件
      let bold = this.recorder.getBlob();
      console.log(bold);
      // 将获取的二进制对象转为二进制文件流
      let files = new File([bold], "test.mp3", {
        type: "audio/mp3",
        lastModified: Date.now()
      });
      console.log(files);
      let fd = new FormData();
      fd.append("file", files);
      console.log(fd);
      fd.append("tenantId", 3); // 额外参数，可根据选择填写
      // 这里是通过上传语音文件的接口，获取接口返回的路径作为语音路径
      this.uploading(files, res => {
        console.log(res);
        this.audioUrl = res.url;
      });
      // console.log(a);
    },
    confirm(item, index) {
      let data = {
        homeworkId: this.homeworkId,
        addway: Number(this.tabsNum) + 1,
        content: item.content,
        answer: $(".editDemo")
          .eq(index)
          .html(),
        resolution: item.resolution,
        score: item.score,
        type: this.QuestionType[item.QuestionTypeindex].id,
        property: JSON.stringify({
          难度: this.difficulty[item.difficultyindex].name,
          时间: this.time[item.timeindex].name,
          目标: this.target[item.targetindex].name
        }),
        sound: this.audioUrl
      };
      console.log(JSON.stringify(data.resolution).length);
      console.log(data);
      // return false;
      if (item.id) {
        data.id = item.id;
        this.$post("/likework/updateHomeworkQuestion.do", data).then(res => {
          if (res.code == "5000") {
            item.code = res.data.code;
            this.$message({ message: "上传题目成功!", type: "success" });
          }
        });
      } else {
        this.$post("/likework/createHomeworkQuestion.do", data).then(res => {
          console.log(res);
          if (res.code == "5000") {
            item.code = res.data.code;
            this.$message({ message: "上传题目成功!", type: "success" });
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
@color: #2592e7;
#questions {
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
      justify-content: flex-start;
      margin-top: 20px;
      width: 100%;
      .import-in {
        background: #fff;
        width: 600px;
        margin-right: 20px;
        box-sizing: border-box;
        .btn {
          padding: 40px 50px;
          display: flex;
          justify-content: space-between;
          button {
            font-size: 18px;
            background: #fff;
            color: @color;
            border: 1px solid @color;
            border-radius: 3px;
          }
          .active {
            background: @color;
            color: #fff;
          }
        }
        .count {
          .title {
            font-size: 20px;
            color: #000;
            text-align: center;
          }
          .answer {
            margin-top: 26px;
            text-align: center;
            font-size: 16px;
            color: #333;
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            label {
              margin-right: 50px;
            }
          }
          .picture {
            img {
              width: 100%;
            }
          }
        }
        .content {
          padding: 160px;
          .title {
            font-size: 18px;
            color: @color;
            text-align: center;
            margin-bottom: 60px;
            text-decoration: underline;
            cursor: pointer;
          }
          .code {
            text-align: center;
            margin-bottom: 20px;
            img {
              width: 162px;
              height: 162px;
            }
          }
          .codetips {
            font-size: 18px;
            line-height: 30px;
            color: @color;
            span {
              display: block;
            }
          }
          .addimg {
            text-align: center;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .upload {
              position: relative;
              width: 97px;
              height: 38px;

              input {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 2;
                opacity: 0;
                cursor: pointer;
              }
            }
          }
        }
        .pros {
          padding: 0;
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
          .tips {
            .code {
              img {
                width: auto;
                height: auto;
                max-width: none;
              }
            }
          }
        }
      }
      .import-out {
        flex: 1;
        background: #fff;
        position: relative;
        .title {
          font-size: 18px;
          color: @color;
          text-align: center;
          padding-top: 26px;
        }
        .nodata {
          margin-top: 100px;
          text-align: center;
          margin-bottom: 100px;
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
                  color: @color;
                  line-height: 34px;
                  margin-right: 10px;
                }
                .input {
                  flex: 1;
                  #content,
                  .editDemo {
                    border: 1px solid #ccc;
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
    .workCode {
      margin-top: 100px;
      margin-bottom: 100px;
      .title {
        text-align: center;
        font-size: 18px;
        color: #2592e7;
      }
      .code {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        img {
          width: 120px;
          height: 120px;
        }
      }
      .content {
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          .label {
            font-size: 18px;
            margin-right: 20px;
            color: #333;
          }
          .input {
            .el-select {
              width: 350px;
            }
          }
        }
      }
    }
  }
  .cropper {
    width: 100%;
    height: 360px;
  }
  .cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .cropper {
      width: 260px;
      height: 260px;
    }
    .show-preview {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      .preview {
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
    }
  }
  .cropper-content .show-preview .preview {
    margin-left: 0;
  }
}
</style>

<style lang="" scoped>
.cut {
  width: 500px;
  height: 500px;
  margin: 30px auto;
}

.c-item {
  max-width: 800px;
  margin: 10px auto;
  margin-top: 20px;
}

.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.des {
  line-height: 30px;
}

code.language-html {
  padding: 10px 20px;
  margin: 10px 0px;
  display: block;
  background-color: #333;
  color: #fff;
  overflow-x: auto;
  font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo,
    Lucida, Sans, Type, Writer, Ubuntu, Mono;
  border-radius: 5px;
  white-space: pre;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  user-select: none;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>