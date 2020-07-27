<template>
  <div id="release">
    <div class="nav flex">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <span v-if="state==0">已自评作业详情</span>
          <span v-if="state==1">学生查询未自评作业详情</span>
          <span v-if="state==2">未答题作业详情</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main">
      <div class="formwork" v-if="state==0 ||  state==1">
        <h3 class="title" v-if="state==0">已自评</h3>
        <h3 class="title" v-if="state==1">未自评</h3>
        <p class="work_name">{{knowledges}}</p>
        <div class="template">
          <div class="left">
            <div class="item">
              <div class="label">布置班级:</div>
              <div class="input">{{homename}}</div>
            </div>
            <div class="item">
              <div class="label">作业名称:</div>
              <div class="input">{{homework.homeworkName}}</div>
            </div>
            <div class="item">
              <div class="label">截止时间:</div>
              <div class="input">{{homework.endTime}}</div>
            </div>
            <div class="item">
              <div class="label">认知水平:</div>
              <div class="input" v-if="homework.level==1">初级</div>
              <div class="input" v-if="homework.level==2">中级</div>
              <div class="input" v-if="homework.level==3">高级</div>
            </div>
            <div class="item">
              <div class="label">作业类型:</div>
              <div class="input" v-if="homework.type==1">结构化作业</div>
              <div class="input" v-if="homework.type==2">非结构化作业</div>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <div class="label">解决问题:</div>
              <div class="input">
                <span>{{solveProblem}}</span>
              </div>
            </div>
            <div class="item">
              <div class="label">知识点:</div>
              <div class="input">
                <span>{{knowledge}}</span>
              </div>
            </div>
            <div class="item">
              <div class="label">预计用时:</div>
              <div class="input">{{homework.expectTime}}分钟</div>
            </div>
            <div class="item">
              <div class="label">总得分:</div>
              <div class="input">{{TestNum}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ratelist bf bx" :style="state==0?'':'height:0;overflow:hidden;'">
        <div class="subjects bx">
          <div class="vol-data bx">
            <div class="charts" style="width:100%;">
              <div class="charts-title fb ft16 colff8 tl">班级对比图</div>
              <div id="myChart5" style="height:500px;width:100%"></div>
              <div class="accuracy">
                <span class="colff8 ft18" style="margin-right: 120px;">自己正确率:{{studentAvg}}%</span>
                <span class="col39a ft18">班级正确率：{{classAvg}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="question!=''">
        <div class="subject" v-if="state==2" style="background: none;">
          <div class="import-out" style="width: 100%;background: none;">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content">
                  <!--       倒计时     -->
                  <div class="countDown">
                    <div class="nodetails answerSheet bf bx">
                      <p class="tit ft24 fb">{{homework.homeworkName}}</p>
                      <p class="time" style="line-height: 36px;">截止：{{homework.endTime}}</p>
                      <p class="mintus">预计用时： {{homework.expectTime}}分钟</p>
                    </div>
                    <div class="clock bf">
                      <img
                        src="../../../../static/images/time_icon.jpg"
                        alt
                        style="width: 71px;height: 71px;margin: 0 auto;display: block"
                      />
                      <p class="timetext ft16 tc">已用时</p>
                      <div id="product-sec-countdown" class="ft18 tc">{{countdowns}}</div>
                      <div class="tc" style="margin-top: 8px;">
                        <el-button id="start" size="mini" type="primary" @click="start">开始计时</el-button>
                      </div>
                    </div>
                    <div class="answerSheet bf bx">
                      <p class="ansewrtit col39a ft16">答题卡</p>
                      <div>
                        <span
                          class="topicnum cp wLi"
                          :id="'acitveblue'+k"
                          :class="'acitveblues'+k"
                          @click="showDetails(k)"
                          v-for="(item,k) in question"
                          :key="k"
                        >{{k+1}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>

              <el-col :span="18">
                <div class="published bf bx">
                  <div class="title">作业详情</div>
                  <div class="problem" id="subOutputRank-print">
                    <div
                      class="example"
                      v-for="(item,i) in question"
                      :key="i"
                      :class="'listshow'+i"
                    >
                      <div class="number flexbox">
                        <div class="code-l flex">
                          <span v-if="item.addway==1">{{i+1}}.导入</span>
                          <span v-if="item.addway==2">{{i+1}}.图片</span>
                          <span v-if="item.addway==3">{{i+1}}.题库</span>
                          此题编码:{{ item.code }}
                        </div>
                        <div class="score-r flexbox">
                          <p>分值：{{item.score}}分</p>
                          <p />
                        </div>
                      </div>
                      <div class="test">
                        <div v-html="item.content"></div>
                      </div>
                      <div class="analysis">
                        <div class="item">
                          <div class="label">答案:</div>
                          <div
                            class="content"
                            contenteditable="true"
                            :id="'text'+i"
                            @blur.prevent="answerOneByQuestion(item.id,i)"
                            v-html="item.studentAnswer"
                            placeholder="请输入内容"
                          ></div>
                        </div>
                        <div class="item flexbox">
                          <div class="label">上传答案:</div>
                          <div class="input">
                            <input
                              style="position:absolute;opacity:0;"
                              @change="uploadimg($event,i)"
                              type="file"
                              name="file"
                              id="Album_img"
                              accept="image/gif, image/jpeg, image/x-png"
                            />
                            <img
                              style="width: 40px;height: 35px;"
                              src="../../../../static/images/upload_img.jpg"
                            />
                          </div>
                        </div>
                        <div class="item flexbox" style="margin-top:10px">
                          <span style="font-size:16px;color:#2592e7">视频解答:&nbsp;&nbsp;</span>
                          <input type="file" id="upload" @change="uploadimgs" />
                        </div>

                        <div class>
                          <img
                            :src="item.url"
                            v-on:click.stop.prevent="spqrCode(i)"
                            :id="'img'+i"
                            alt
                            style="width: 100%;margin-bottom:10px;height:300px;display: none; object-fit: cover;"
                          />
                        </div>
                        <div class="redio" style="font-size:16px;color:#2592e7">
                          选择输入语音:
                          <!-- <i class="el-icon-microphone" @click="handleClick" style="font-size:22px"></i><span>({{mcounter}})</span> -->
                          <a href="javascript:;">
                            <i class="el-icon-microphone" @click="setaudio"></i>
                          </a>
                          <span>开始录音({{value1}})s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="zp-score" style="margin-right: 20px;">
                    <el-button
                      type="primary"
                      style="background-color:#f25c29;color:#fff;border:none"
                      @click="printContent"
                    >打印</el-button>
                    <el-button type="primary" @click="answerQuestion()" v-if="state==2">提交答案</el-button>
                    <el-button type="primary" @click="stopAnswerQuestion()" v-if="state==2">暂停答题</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="subject" v-if="state==1">
          <div class="import-out">
            <div class="title">作业详情</div>

            <div class="problem">
              <div class="example" v-for="(item,i) in question" :key="i">
                <div class="number flexbox">
                  <div class="code-l flex">
                    <span v-if="item.addway==1">{{i+1}}.导入</span>
                    <span v-if="item.addway==2">{{i+1}}.图片</span>
                    <span v-if="item.addway==3">{{i+1}}.题库</span>
                    此题编码:{{ item.code }}
                  </div>
                  <div class="score-r flexbox">
                    <p>分值：{{item.score}}分</p>
                    <p />
                    <div class="my-score" v-if="state==0">
                      得分：
                      <input type="text" disabled v-model="item.studentScore" />
                    </div>

                    <div v-if="item.type==1&&item.studentScore!=''">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          disabled
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>

                    <div v-if="item.type==2">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>

                    <div v-if="item.type==3">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>
                    <div v-if="item.type==4">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>
                    <div v-if="item.type==5">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>
                    <div v-if="item.type==6">
                      <div class="my-score" v-if="state==1">
                        输入自评分：
                        <input
                          type="text"
                          v-model="item.studentScore"
                          @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="test">
                  <div v-html="item.content"></div>
                </div>
                <div class="analysis">
                  <div class="item">
                    <div class="label">学生解答:</div>
                    <div class="input">
                      <el-input disabled v-model="item.studentAnswer" placeholder></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">答案:</div>
                    <div v-on:click.stop.prevent="spqrCode(item.answer)">
                      <div
                        v-html="item.answer"
                        alt
                        style="width: 100%;margin-bottom:10px;display: block; object-fit: cover;"
                      ></div>
                    </div>
                    <!--                  <div class="input">-->
                    <!--                    <el-input-->
                    <!--                      v-if="item.addway==1 || item.addway==3"-->
                    <!--                      disabled-->
                    <!--                      v-model="item.answer"-->
                    <!--                      placeholder=""-->
                    <!--                    ></el-input>-->
                    <!--                  </div>-->
                  </div>
                  <div class="item">
                    <div class="label">解析:</div>
                    <div class="input">
                      <el-input disabled v-html="item.resolution" placeholder></el-input>
                    </div>
                  </div>
                  <div class="item nature" v-if="item.property!=null">
                    <div class="label">题目属性:</div>
                    <div class="sort flexbox">
                      <div class="li">
                        <div class="head">难度:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["难度"]}}</el-button>
                        </div>
                      </div>
                      <div class="li">
                        <div class="head">时间:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["时间"]}}</el-button>
                        </div>
                      </div>
                      <div class="li">
                        <div class="head">目标:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["目标"]}}</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item Voice flexbox" v-if="item.sound!=null && item.sound !=''">
                    <div class="label">
                      <i class="el-icon-microphone"></i>
                    </div>
                    <div class="btn">
                      <el-slider v-model="value1" :max="max" disabled></el-slider>
                      <span style="width:40px">{{value1}}s</span>

                      <el-button @click="getChecked">
                        <i class="el-icon-microphone"></i>
                        {{checked==0?'点击完成':'点击替换'}}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="zp-score">
              <el-button
                type="primary"
                @click="submitAssessHomework(homework.id)"
                v-if="state==1"
              >自评完成</el-button>
            </div>
          </div>
        </div>
        <div class="subject" v-if="state==0">
          <div class="import-out">
            <div class="title">作业详情</div>

            <div class="problem">
              <div class="example" v-for="(item,i) in question" :key="i">
                <div class="number flexbox">
                  <div class="code-l flex">
                    <span v-if="item.addway==1">{{i+1}}.导入</span>
                    <span v-if="item.addway==2">{{i+1}}.图片</span>
                    <span v-if="item.addway==3">{{i+1}}.题库</span>
                    此题编码:{{ item.code }}
                  </div>
                  <div class="score-r flexbox">
                    <p>分值：{{item.score}}分</p>
                    <p />
                    <div class="my-score" v-if="state==0">
                      得分：
                      <input type="text" disabled v-model="item.studentScore" />
                    </div>

                    <div class="my-score" v-if="state==1">
                      输入自评分：
                      <input
                        type="text"
                        v-model="item.studentScore"
                        @blur.prevent="assessQuestion(item.id,item.studentScore,item.score)"
                      />
                    </div>
                  </div>
                </div>
                <div class="test">
                  <div v-html="item.content"></div>
                </div>
                <div class="analysis">
                  <div class="item">
                    <div class="label">
                      学生解答:
                      <i class="el-icon-check" v-show="item.answer==item.studentAnswer"></i>
                      <i class="el-icon-close" v-show="item.answer!=item.studentAnswer"></i>
                    </div>
                    <div class="input">
                      <el-input disabled v-model="item.studentAnswer" placeholder></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">答案:</div>
                    <div v-on:click.stop.prevent="spqrCode(item.answer)">
                      <div
                        v-html="item.answer"
                        alt
                        style="width: 100%;margin-bottom:10px;display: block; object-fit: cover;"
                      ></div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">解析:</div>
                    <div class="input">
                      <el-input disabled v-html="item.resolution" placeholder></el-input>
                    </div>
                  </div>
                  <div class="item nature" v-if="item.property=!null" style="display:block">
                    <div class="label">题目属性:</div>
                    <div class="sort flexbox">
                      <div class="li">
                        <div class="head">难度:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["难度"]}}</el-button>
                        </div>
                      </div>
                      <div class="li">
                        <div class="head">时间:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["时间"]}}</el-button>
                        </div>
                      </div>
                      <div class="li">
                        <div class="head">目标:</div>
                        <div class="btn">
                          <el-button class="active" disabled>{{JSON.parse(item.property)["目标"]}}</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="item-img" style="display:block">
                      <div style="font-size:18px;color:#2592e7">学生视频解答:</div>
                      <video
                        :src="item.videoUrl"
                        controls="controls"
                        autoplay
                        width="500px"
                        height="300px"
                      ></video>
                      <div style="font-size:18px;color:#2592e7">学生图片解答:</div>
                      <img :src="item.url" alt />
                      <div class="label">
                        <span style="font-size:18px;color#2592e7">学生语音答案</span>
                        <!-- <audio :src="audioUrl"></audio> -->
                        <object height="50" width="100" :src="item.soundUrl" controls></object>
                      </div>
                    </div>
                  </div>
                  <div class="item Voice flexbox" v-if="item.sound!=null && item.sound !=''">
                    <div class="label">
                      <i class="el-icon-microphone"></i>
                    </div>
                    <div class="btn">
                      <el-slider v-model="value1" :max="max" disabled></el-slider>
                      <span style="width:40px">{{value1}}s</span>

                      <el-button @click="getChecked">
                        <i class="el-icon-microphone"></i>
                        {{checked==0?'点击完成':'点击替换'}}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="图片" :visible.sync="dialogVisible" width="60%">
      <img :src="spqrcode" alt style="width: 100%;" />
    </el-dialog>
  </div>
</template>
<script>
import { MediaStreamRecorder } from "../../../../static/js/MediaStreamRecorder.js";
import recording from "../../../../static/js/recorder";
//import echarts from "_echarts@4.2.1@echarts";
import echarts from "echarts";
export default {
  data() {
    return {
      //分值
      TestNum: {},
      showimig: false,
      spqrcode: "",
      dialogVisible: false,
      imageUrl: "",
      id: "",
      homework: [],
      value1: 0,
      value: "",
      max: 9999,
      options: [],
      tabsNum: 0,
      btns: ["导入试题", "图片传题", "平台题库"],
      // question: "../../../../static/images/picture.jpg",
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
      order: [],
      solveProblem: "",
      knowledge: "",
      myChartData1: {
        name: [],
        value: [],
        value1: []
      },
      question: [],
      property: [],
      score: "",
      knowledges: "",
      state: "",
      classAvg: "",
      studentAvg: "",
      updatatype1: false,
      timenum1: "",
      homename: "",
      countdowns: "00:00:00",
      h: 0, //定义时，分，秒，毫秒并初始化为0；
      m: 0,
      s: 0,
      ms: 0,
      time: 0, //定时器
      times: "", //统计共多少秒时间
      showIndex: null,
      questionIds: "",
      //视频参数
      updatatype2: false,
      timenum2: "",
      client: null,
      file_photourl: "",
      loadings: null,
      videoName: null,
      statetype: "",
      //语音参数
      checked: 1,
      recorder: null,
      t: null,
      value1: 0,
      audioUrl: "",
      max: 20,

      mcounter: 0, // 累积时间
      recording: false, // 标记是否在录音
      intervaltimerid: "", // 间隔时间定时器编号
      tiptext: "点击录音", // 提示文字
      mediaRecorder: null, // 录音笔
      mediaConstraints: {
        audio: true
      },
      //
      num: 0
    };
  },
  created() {
    var that = this;

    //0自评完成1自评未完成2未完成作业
    if (that.$route.query.value == 1) {
      that.queryHasNotAssessHomeworkDetail();
    } else if (that.$route.query.value == 0) {
      that.queryHasAssessHomeworkDetail();
    } else if (that.$route.query.value == 2) {
      that.queryHasNotAnswerHomeworkDetail();
    }
    this.drawLine1();
  },
  methods: {
    //语音功能
    // handleClick() {
    //   var that = this;
    //   this.recording = !this.recording;
    //   // 如果开始录音
    //   if (this.recording === true) {
    //     this.$message({
    //       message:'开始录音',
    //        type:'success'
    //     })
    //     this.mcounter = 0;
    //     this.tiptext = "录音中 " + this.mcounter + "s";
    //     this.captureRecord();
    //     this.intervaltimerid = setInterval(() => {
    //       // 开始累积
    //       that.mcounter = that.mcounter + 1;
    //       this.tiptext = "录音中 " + that.mcounter + "s";
    //     }, 1000);
    //   } else {
    //     // 如果结束录音
    //     this.tiptext = "点击录音";
    //     this.mediaRecorder.stop();
    //     this.mediaRecorder.stream.stop();
    //     this.$message({
    //       message:'结束语音',
    //       type:'success'
    //     })
    //   }
    // },
    // // 错误处理方法
    // onMediaError(e) {
    //   clearInterval(this.intervaltimerid);
    //   this.tiptext = "点击录音";
    //   this.recording = false;
    //   this.$message.error("您的浏览器暂不支持录音功能");
    // },
    // // 成功
    // onMediaSuccess(stream) {
    //   this.mediaRecorder = new MediaStreamRecorder(stream);
    //   // 获取音频流
    //   this.mediaRecorder.stream = stream;
    //   this.mediaRecorder.mimeType = "audio/wav";
    //   var _that = this;
    //   this.mediaRecorder.ondataavailable = function(blob) {
    //     clearInterval(_that.intervaltimerid);
    //     const url = URL.createObjectURL(blob);
    //     this.musicUrl=url

    //   };
    //   // 定义间隔
    //   this.mediaRecorder.start(this.timelimit * 1000);
    // },
    // // 开始记录方法
    // captureRecord() {
    //   navigator.mediaDevices
    //     .getUserMedia(this.mediaConstraints)
    //     .then(this.onMediaSuccess)
    //     .catch(this.onMediaError);
    // },
    setaudio() {
      if (this.checked == 0) {
        return false;
      }
      recording.get(res => {
        if (res) {
          this.$message.success("开始录音");

          this.recorder = res;
          this.t = setInterval(() => {
            if (this.value1 <= this.max) {
              this.value1++;
              this.checked = 0;
            } else {
              this.checked = 1;
              this.value1 = 0;
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

    // 删除语音
    deleteVoice(e) {},
    // 获取语音二进制文件
    getBlob(e) {
      // 获取语音二进制文件
      let bold = this.recorder.getBlob();
      //    console.log(bold);
      // 将获取的二进制对象转为二进制文件流
      let files = new File([bold], "test.mp3", {
        type: "audio/mp3",
        lastModified: Date.now()
      });
      //    console.log(files);
      let fd = new FormData();
      fd.append("file", files);
      fd.append("tenantId", 3); // 额外参数，可根据选择填写
      // 这里是通过上传语音文件的接口，获取接口返回的路径作为语音路径
      this.uploading(files, res => {
        // console.log(audioUrl);
        this.audioUrl = res.url;
        //  console.log(res.url)
      });
      // console.log(a);
    },
    //上传视频
    changeFile(e) {
      document.getElementById("upload").value = "";
      this.uploadimgs(e);
    },
    //加载
    loading(e) {
      this.loadings = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    uploadimgs(event) {
      //  this.loading();
      this.updatatype2 = true;
      this.timenum2 = 0;
      // this.countDown1();
      var self = this;
      var file = event.target.files[0];
      // console.log(file)
      var ext = file.type.split("/")[1];
      switch (ext) {
        case "jpg":
        case "jpeg":
        case "png":
        case "bmp":
        case "gif":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
        case "mp3":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
        case "ppt":
        case "pptx":
        case "doc":
        case "docx":
        case "pdf":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
      }
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
        .multipartUpload(file_name, file)
        .then(result => {
          //   console.log(result);

          event.target.value = "";
          if (result.res.status == 200 && result.res.statusCode == 200) {
            self.$emit("input", result.res.requestUrls[0]);
            this.file_photourl = result.res.requestUrls[0].split("?")[0];
            this.playerOptions.sources[0].src = result.res.requestUrls[0].split(
              "?"
            )[0];
            //    console.log(this.playerOptions.sources[0].src);
            this.timenum1 = 100;
            clearInterval(this.time1);
            self.$message.success("上传成功");
            //  this.createClassVideo();
            this.statetype = true;
            //   console.log(this.file_photourl)
          } else {
            self.$message.error("上传失败，请重新上传文件");
          }
        })
        .catch(function(err) {
          //    console.log(err);
        });
    },
    //打印
    printContent(e) {
      let subOutputRankPrint = document.getElementById("subOutputRank-print");
      //  console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    //点击到对应题目
    showDetails(num) {
      var el = document.getElementsByClassName(`listshow${num}`)[0];
      // console.log(el.offsetTop);
      if (this.showIndex == num) {
        this.showIndex = null;
      } else {
        this.showIndex = num;
      }
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop + 140 });
      });
    },
    //暂停答题
    stopAnswerQuestion() {
      this.$post("/likework/stopAnswerQuestion.do", {
        homeworkId: this.id,
        time: this.timesec(this.countdowns)
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.$message.success("暂停答题");
          this.$router.push({
            path: "/studentCommon/activityCenter/myHomework"
          });
        }
      });
    },
    timesec(time) {
      var s = "";

      var hour = time.split(":")[0];
      var min = time.split(":")[1];
      var sec = time.split(":")[2];

      s = Number(hour * 3600) + Number(min * 60) + Number(sec);

      return s;
    },
    //学生回答单个题目
    answerOneByQuestion(id, index) {
      if (document.getElementById("text" + index).textContent == "") {
        this.$message.error("第" + parseInt(index + 1) + "题未答");
        return;
      }
      this.$post("/likework/answerOneByQuestion.do", {
        questionId: id,
        answer: document.getElementById("text" + index).textContent
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.questionIds = id;
          if (this.questionIds == id) {
            document.getElementById("acitveblue" + index).style.background =
              "#39a5ff";
            document.getElementById("acitveblue" + index).style.color =
              "#ffffff";
          }
        }
      });
    },
    start() {
      //开始
      this.time = setInterval(this.timer, 50);
    },
    stop() {
      //暂停
      clearInterval(this.time);
    },
    reset() {
      //重置
      clearInterval(this.time);
      this.h = 0;
      this.m = 0;
      this.ms = 0;
      this.s = 0;
      this.str = "00:00:00";
    },
    timer() {
      //定义计时函数
      this.ms = this.ms + 50; //毫秒
      if (this.ms >= 1000) {
        this.ms = 0;
        this.s = this.s + 1; //秒
      }
      if (this.s >= 60) {
        this.s = 0;
        this.m = this.m + 1; //分钟
      }
      if (this.m >= 60) {
        this.m = 0;
        this.h = this.h + 1; //小时
      }
      this.countdowns =
        this.toDub(this.h) +
        ":" +
        this.toDub(this.m) +
        ":" +
        this.toDub(this.s);
      //统计共看了多少秒
      this.times = this.s + this.m * 60 + this.h * 3600;
    },
    toDub(n) {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    },
    //放大图片
    spqrCode(index) {
      // this.dialogVisible = true;
      // console.log(document.getElementById("img" + index).src);
      // this.spqrcode =  document.getElementById("img" + index).src;
    },
    countDown1() {
      clearInterval(this.time1);
      this.time1 = setInterval(() => {
        this.timenum1 += 1;
        if (this.timenum1 == 80 || this.timenum1 >= 100) {
          clearInterval(this.time1);
        }
      }, 100);
    },
    uploadimg(event, index) {
      this.updatatype1 = true;
      this.timenum1 = 0;
      this.countDown1();
      var self = this;
      var file = event.target.files[0];
      var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
      var storeAs = "upload-file1/abc";
      var file_name = `${new Date().getTime()}`; //时间戳+文件后缀名
      this.client = new OSS.Wrapper({
        region: "oss-cn-shenzhen",
        secure: true,
        //endpoint: "oss-cn-shenzhen.aliyuncs.com",
        accessKeyId: "TxkBX1VgU792UUVh",
        accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
        bucket: "mixin"
      });
      this.client
        .multipartUpload(file_name, file)
        .then(result => {
          event.target.value = "";
          if (result.res.status == 200 && result.res.statusCode == 200) {
            self.$emit("input", result.res.requestUrls[0]);
            this.file_photourl = result.res.requestUrls[0].split("?")[0];
            // console.log(this.file_photourl);

            document.getElementById("img" + index).src = this.file_photourl;
            document.getElementById("img" + index).style.display = "block";
            // this.imageUrl = this.file_photourl
            this.timenum1 = 100;
            clearInterval(this.time1);
            // self.$message.success("上传成功");

            this.statetype = true;
          } else {
            self.$message.error("上传失败，请重新上传文件");
            this.statetype = false;
          }
        })
        .catch(function(err) {
          //    console.log(err);
        });
    },
    //学生答题
    answerQuestion() {
      sessionStorage.setItem("type", 1);
      var data2 = [];
      this.question.forEach((item, index) => {
        if (document.getElementById("text" + index).textContent == "") {
          // this.$message.error('第' + index + '题未答');
          // return;
        } else {
          data2.push({
            answer: document.getElementById("text" + index).textContent,
            questionId: item.id,
            type: item.type,
            url: document.getElementById("img" + index).src,
            videoUrl: this.file_photourl,
            soundUrl: this.audioUrl
          });
        }
      });
      let parm = {
        id: this.id,
        list: data2
      };
      // console.log(parm)
      this.$posts("/likework/answerQuestion.do", parm).then(response => {
        sessionStorage.setItem("type", 2);
        //console.log(response)
        if (response.code == "5000") {
          this.$message.success("提交答案成功");
          //0自评完成1自评未完成2未完成作业
          this.queryHasNotAssessHomeworkDetail();
        } else {
          this.$message.error(response.message);
        }
      });
    },
    //自评完成
    submitAssessHomework(homeworkId) {
      this.$post("/likework/submitAssessHomework.do", {
        homeworkId: homeworkId
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.$message.success("自评完成");
          //0自评完成1自评未完成2未完成作业
          this.queryHasAssessHomeworkDetail();
        } else {
          this.$message({
            showClose: true,
            message: response.message,
            type: "error"
          });
        }
      });
    },
    //学生自评分
    assessQuestion(questionId, studentScore, score) {
      if (studentScore != "") {
        if (score < studentScore) {
          this.$message({
            showClose: true,
            message: "自评分值不能大于总分值",
            type: "error"
          });
        } else {
          this.$post("/likework/assessQuestion.do", {
            questionId: questionId,
            score: studentScore
          }).then(response => {
            //console.log(response)
            if (response.code == "5000") {
              this.$message({
                showClose: true,
                message: "自评成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: response.message,
                type: "error"
              });
            }
          });
        }
      }
    },
    //查询上次作业详情
    //自评完成
    queryHasAssessHomeworkDetail() {
      this.$post("/likework/queryHasAssessHomeworkDetail.do", {
        homeworkId: this.$route.query.id
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          var property = [];
          var str1 = response.data.homework.solveProblem;
          var str2 = response.data.homework.knowledge;
          this.knowledge = str2.replace("\\n", " \n ");
          this.solveProblem = str1.replace("\\n", " \n ");
          this.homework = response.data.homework;
          this.question = response.data.question;
          this.knowledges = response.data.knowledge;
          this.state = response.data.state;
          // property = JSON.parse(response.data.question[0].property);
          // console.log(property["难度"]);
          response.data.question.forEach((item, index) => {
            this.TestNum = item.studentScore;
          });
          //   console.log(this.question);
          let arr = [];
          response.data.homework.classList.forEach((item, index) => {
            arr.push(item.name);
          });
          this.homename = arr.join("，");
          if (response.data.ratelist) {
            for (let i = 0; i < response.data.ratelist.length; i++) {
              this.myChartData1.value.push(
                parseInt(response.data.ratelist[i].classRate)
              );
              this.myChartData1.value1.push(
                parseInt(response.data.ratelist[i].studentRate)
              );
              this.myChartData1.name.push("第" + parseInt(i + 1) + "题");
            }
          }
          this.id = response.data.homework.id;
          this.classAvg = response.data.classAvg;
          this.studentAvg = response.data.studentAvg;
          //       console.log(response.data.classAvg)
          this.drawLine1();
        }
      });
    },
    //自评未完成
    queryHasNotAssessHomeworkDetail() {
      this.$post("/likework/queryHasNotAssessHomeworkDetail.do", {
        homeworkId: this.$route.query.id
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          var property = [];
          var str1 = response.data.homework.solveProblem;
          var str2 = response.data.homework.knowledge;
          this.knowledge = str2.replace("\\n", " \n ");
          this.solveProblem = str1.replace("\\n", " \n ");
          this.homework = response.data.homework;
          this.question = response.data.question;
          this.knowledges = response.data.knowledge;
          this.state = response.data.state;
          // property = JSON.parse(response.data.question[0].property);
          // console.log(property["难度"]);
          let arr = [];
          response.data.homework.classList.forEach((item, index) => {
            arr.push(item.name);
          });
          this.homename = arr.join("， ");
          // if(response.data.ratelist){
          //   for(let i=0;i<response.data.ratelist.length;i++){
          //     this.myChartData1.value.push(parseInt(response.data.ratelist[i].classRate));
          //     this.myChartData1.value1.push(parseInt(response.data.ratelist[i].studentRate));
          //     this.myChartData1.name.push('第'+parseInt(i+1)+'题');
          //   }
          // }
          this.id = response.data.homework.id;
          this.classAvg = response.data.classAvg;
          this.studentAvg = response.data.studentAvg;
          // this.drawLine1();
        }
      });
    },
    //未完成作业
    queryHasNotAnswerHomeworkDetail() {
      this.$post("/likework/queryHasNotAnswerHomeworkDetail.do", {
        homeworkId: this.$route.query.id
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          var property = [];
          var str1 = response.data.homework.solveProblem;
          var str2 = response.data.homework.knowledge;
          this.knowledge = str2.replace("\\n", " \n ");
          this.solveProblem = str1.replace("\\n", " \n ");
          this.homework = response.data.homework;
          this.question = response.data.question;
          this.knowledges = response.data.knowledge;
          this.state = response.data.state;
          // property = JSON.parse(response.data.question[0].property);
          // console.log(property["难度"]);
          let arr = [];
          response.data.homework.classList.forEach((item, index) => {
            arr.push(item.name);
          });
          this.homename = arr.join(" ，");
          response.data.question.forEach((item, index) => {
            if (item.studentAnswer != null || item.url != null) {
              this.$nextTick(() => {
                var oWli = document.getElementsByClassName("wLi");
                for (var i = 0; i < oWli.length; i++) {
                  oWli[index].style.background = "#39a5ff";
                  oWli[index].style.color = "#ffffff";
                }
              });
            } else {
              this.$nextTick(() => {
                var oWli = document.getElementsByClassName("wLi");
                for (var i = 0; i < oWli.length; i++) {
                  oWli[index].style.background = "#ffffff";
                  oWli[index].style.color = "#39a5ff";
                }
              });
            }
          });
          // if(response.data.ratelist){
          //   for(let i=0;i<response.data.ratelist.length;i++){
          //     this.myChartData1.value.push(parseInt(response.data.ratelist[i].classRate));
          //     this.myChartData1.value1.push(parseInt(response.data.ratelist[i].studentRate));
          //     this.myChartData1.name.push('第'+parseInt(i+1)+'题');
          //   }
          // }
          this.id = response.data.homework.id;
          this.classAvg = response.data.classAvg;
          this.studentAvg = response.data.studentAvg;
          // this.drawLine1();
        }
      });
    },

    drawLine1() {
      // debugger;
      var that = this;
      var myChart = echarts.init(document.getElementById("myChart5"));
      var app = {};
      var option = null;
      app.title = "坐标轴刻度与标签对齐";

      option = {
        title: {
          text: "",
          subtext: "",
          color: ["#ff8a00"]
        },
        legend: {
          left: "center",
          data: ["自己", "班级"]
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "8%",
          containLabel: true
        },
        color: ["#ff9900", "#169bd5"],
        tooltip: {},
        xAxis: { type: "category", data: this.myChartData1.name },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            name: "自己",
            type: "bar",
            data: this.myChartData1.value1,
            barWidth: 30
          },
          {
            name: "班级",
            type: "bar",
            data: this.myChartData1.value,
            barWidth: 30
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    tabs(e) {
      this.tabsNum = e;
    },
    chooseDifficulty(item, index) {
      this.difficultyindex = index;
    },
    chooseTime(item, index) {
      this.timeindex = index;
    },
    chooseTarget(item, index) {
      this.targetindex = index;
    },
    release(e) {
      this.$router.push({ path: "/home/questions/release" });
    },

    // 点击完成
    getChecked(e) {
      if (this.checked == 0) {
        this.checked = 1;
        clearInterval(this.t);
      } else {
        this.value1 = 0;
        this.chooseVoice();
      }
    },
    // 点击获取语音
    chooseVoice(e) {
      if (this.checked == 0) {
        //  console.log(this.checked)
        return false;
      }
      this.t = setInterval(() => {
        if (this.value1 < this.max) {
          this.value1++;
          this.checked = 0;
          //   console.log(this.value1)
        } else {
          this.checked = 1;
          // this.value1 = 0;
          clearInterval(this.t);
        }
      }, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  text-align: center;
}

.mrecorder {
  width: 40px;
  height: 40px;
  font-size: 40px;
}

.anirecorder {
  position: relative;
  animation: mymove 5s infinite;
  -webkit-animation: mymove 5s infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  /*safari & chrome*/
  -webkit-animation-direction: alternate;
  -webkit-transition-timing-function: ease-in-out;
}
@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
}

@color: #2592e7;
#release {
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
          display: flex;
          justify-content: flex-start;
          .label {
            font-size: 16px;
            color: #333;
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
              height: 120px;
              border-color: #aaa;
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
            margin-bottom: 39px;
            .label {
              min-width: 90px;
              font-size: 16px;
              color: #333;
            }
            .input {
              font-size: 14px;
              color: #666;
              span {
                display: block;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
    .ratelist {
      margin-top: 20px;
      .subjects {
        background: #fbfbfb;
        box-sizing: border-box;
        padding: 40px 40px 0 40px;
        margin: 40px auto 0 auto;
        .vol-data {
          margin-bottom: 60px;
          .accuracy {
            padding-bottom: 40px;
          }
        }
      }
    }
  }
}
input:focus {
  outline: none;
}
.subject {
  /*display: flex;*/
  /*justify-content: center;*/
  width: 100%;
  background: #fff;
  .import-out {
    margin: 20px auto 0 auto;
    /*flex: .6;*/
    background: #fff;
    position: relative;
    // width: 60%;
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
      padding-bottom: 30px;
      .example {
        margin: 0 16px 30px 16px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        .number {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          color: #ff8a00;
          .score-r {
            .my-score {
              background: #f6225e;
              color: #ffffff;
              height: 24px;
              padding: 2px 4px;
              border-radius: 4px;
              margin-left: 20px;
              input {
                width: 30px;
                border: none;
                background: #f6225e;
                color: #ffffff;
              }
            }
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
            /*display: flex;*/
            /*justify-content: flex-start;*/
            align-items: center;
            margin-bottom: 10px;
            position: relative;
            .el-icon-check {
              font-size: 40px;
              color: red;
              position: absolute;
              right: 50px;
            }
            .el-icon-close {
              font-size: 40px;
              color: red;
              position: absolute;
              right: 50px;
            }
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
          .nature {
            align-items: flex-start;
            margin: 20px 0;
            .sort {
              flex: 1;
              .li {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 20px;
                margin-right: 20px;
                .head {
                  font-size: 16px;
                  color: #333;
                  margin-right: 10px;
                }
                .btn {
                  flex: 1;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  button {
                    box-sizing: border-box;
                    min-width: 76px;
                    padding: 8px 15px;
                    color: #fff;
                    background: #dcdcdc;
                    border-radius: 4px;
                    cursor: pointer;
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
            /*justify-content: space-between;*/
            .label {
              i {
                font-size: 26px;
                cursor: pointer;
              }
            }
            .btn {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 16px;
              color: @color;
              .el-slider {
                width: 160px;
                margin-right: 20px;
              }
              button {
                font-size: 14px;
                color: #fff;
                background: @color;
                padding: 9px 24px;
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
    .zp-score {
      text-align: right;
      padding-bottom: 30px;
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
.nav {
  margin: 20px 0;
}
.countDown {
  width: 260px;
  /*position: fixed;*/
  /*top: 437px;*/
  .clock {
    width: 260px;
    padding: 40px 0;
    margin: 20px 0;
    .timetext {
      margin: 10px 0;
    }
  }
  .answerSheet {
    width: 260px;
    padding: 20px 20px;
    .topicnum {
      width: 36px;
      height: 36px;
      border: 1px solid #39a5ff;
      text-align: center;
      color: #39a5ff;
      font-size: 18px;
      line-height: 36px;
      display: inline-block;
      margin: 10px 6px;
    }
    #active {
      background: #39a5ff;
      color: #ffffff;
    }
  }
}
</style>
