<template>
  <div class="settingAnswerCard">
    <el-row>
      <el-col :span="16">
        <div class="A4" id="A4" ref="pdfDom">
          <!-- <span class="top-left"></span> -->
          <!-- <span class="top-right"></span> -->
          <!--start-->
          <h1
            style="text-align: center;padding:12px 0;"
            contenteditable="true"
            v-if="styleState.some(item=>{return item==1})"
          >
            <!-- <input type="text" v-model="title" style="border:0;text-align: center;" /> -->
            {{title}}
          </h1>
          <!-- <div class="Bindingline" v-show="styleState.some(item=>{return item==5})"></div> -->
          <h4 style="text-align: center;" v-show="styleState.some(item=>{return item==2})">
            <input type="text" v-model="title2" style="border:0;text-align: center;" />
          </h4>
          <div class="studentInfo clearfix">
            <div class="item clearfix">
              <div class="label">姓名：</div>
              <div class="input"></div>
            </div>
            <div class="item clearfix">
              <div class="label">班级：</div>
              <div class="input"></div>
            </div>
            <div class="item clearfix">
              <div class="label">学号：</div>
              <div class="input"></div>
            </div>
          </div>
          <p
            style="text-align: center;margin-top:10px"
            v-show="styleState.some(item=>{return item==7})"
          >
            考试范围：{{ limit }}； 考试时间：{{ time }}分钟；命题人：{{
            nickname
            }}
          </p>
          <div
            style="margin:20px auto;"
            :style="'width:'+84*(topicList.length+2)+'px'"
            v-show="styleState.some(item=>{return item==6})"
          >
            <el-table :data="tableData" border>
              <el-table-column prop="date" label="题号" width="84"></el-table-column>
              <template v-for="(item,index) in topicList">
                <el-table-column :key="index" :label="NumberToChinese(index+1)" width="84"></el-table-column>
              </template>
              <el-table-column prop="score" label="得分" width="84"></el-table-column>
            </el-table>
          </div>
          <div class="takeCare clearfix">
            <div class="left clearfix">
              <!-- <h3>注意事项</h3>
              <ul>
                <li>1.答题前请将姓名、班级、考场、准考证号填写清楚。</li>
                <li>2.客观题答题，必须使用2B铅笔填涂，修改时用橡皮擦干净。</li>
                <li>1.主观题答题，必须使用黑色签字笔书写。</li>
              </ul>
              <div class="mode">
                <p>
                  正确填涂
                  <span class="active"></span>
                </p>
                <p>
                  缺考标记
                  <span></span>
                </p>
              </div>-->
              <div class="left" id="qrcode"></div>
              <!--              <div class="studentInfo left clearfix">
                <div class="item clearfix">
                  <div class="label">姓名：</div>
                  <div class="input"></div>
                </div>
                <div class="item clearfix">
                  <div class="label">班级：</div>
                  <div class="input"></div>
                </div>
                <div class="item clearfix">
                  <div class="label">学号：</div>
                  <div class="input"></div>
                </div>
              </div>-->
            </div>
            <div class="right">
              <h3>学号</h3>
              <ul class="number clearfix">
                <li v-for="items in 10" :key="items"></li>
              </ul>
              <div class="content clearfix">
                <ul v-for="item in 10" :key="item">
                  <li style="font-size:11px" v-for="items in 10" :key="items">[{{ items - 1 }}]</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="SingleElection">
            <i class="border-black1"></i>
            <i class="border-black2"></i>
            <i class="border-black3"></i>
            <i class="border-black4"></i>
            <h3>单选题</h3>
            <div class="content">
              <ul class="clearfix" v-for="(item, index) in list" :key="index">
                <li>{{ index + 1 }}.</li>
                <li>[A]</li>
                <li>[B]</li>
                <li>[C]</li>
                <li>[D]</li>
              </ul>
            </div>
          </div>
          <div class="testPaper" v-show="styleState.some(item=>{return item==4})">
            <p contenteditable="true">注意：本试卷包含I、II两卷。第I卷为选择题，所有答案必须用2B铅笔在答题卡相应的位置。</p>
            <p contenteditable="true">第二卷为非选择题，所有答案必须填在答题卷的相应位置。答案写在试卷上均无效，不予记分。</p>
          </div>
          <div
            class="tipsTitle clearfix"
            v-for="(items, indexs) in topicList"
            :key="indexs"
            v-show="team||items.name.indexOf('选')==-1"
          >
            <div class="top">
              <h2
                style="margin-bottom: 20px;"
              >{{ NumberToChinese(indexs + 1) }}、{{ items.name }}（本大题共{{ items.list.length }}小题，共{{ getScore(items) }}分）</h2>
              <div
                class="list clearfix'"
                style="position: relative;"
                :class="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1?'listed':''"
                v-for="(item, index) in items.list"
                :key="index"
              >
                <i
                  class="tipsTitle-back1"
                  v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1"
                ></i>
                <i
                  class="tipsTitle-back2"
                  v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1"
                ></i>
                <ul
                  class="clearfix"
                  style
                  v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1"
                >
                  <li class style="float:right">0.5</li>
                  <li v-for="item in 21" :key="item" style="float:right;">{{item<14?item-1:''}}</li>
                </ul>

                <div class>
                  <i
                    class="tipsTitle-back1"
                    style="top: 5px;"
                    v-show="items.name.indexOf('填空题')!=-1"
                  ></i>
                  <i
                    class="tipsTitle-back2"
                    style="top: 10px;"
                    v-show="items.name.indexOf('填空题')!=-1"
                  ></i>
                  <span class="index left">{{ getTopicNum(indexs, index + 1) }}.</span>

                  <div class="box" v-show="items.name.indexOf('填空题')!=-1"></div>
                  <div class style="width: 100%;" v-html="item.content" v-show="topicTeam"></div>
                </div>
                <!-- <div class="title" v-html="item.content" v-show="topicTeam">{{ item.content }}</div> -->
                <!--                <span-->
                <!--                  style="position:absolute;bottom:0;right:20%;color:red;"-->
                <!--                  v-show="items.name.indexOf('选')==-1"-->
                <!--                >[第{{getTopicNum(indexs, index + 1)}}题]</span>-->
                <!--                          <div class="listContent" v-html="item.content" v-show="item.check">-->
                <!--                  {{item.content}}-->
                <!--                </div>-->
                <div
                  class="resize"
                  style="position:absolute;bottom:0;width:100%;height: 5px;cursor:n-resize"
                ></div>
              </div>
            </div>
          </div>
          <!--end-->
          <!-- <div style="text-align: center;margin: 60px 0;" id="preview">
            <el-button @click="preview">打印</el-button>
          </div>-->
        </div>
      </el-col>
      <el-col :span="6">
        <div class="layout">
          <!-- <h3>选择答题卡布局</h3>
          <div class="out clearfix">
            <div class="list">
              <p>A4</p>
              <span>一栏</span>
            </div>
            <div class="list">
              <p>A3</p>
              <span>二栏</span>
            </div>
          </div>-->
          <div class="list">
            <h3>题目列表</h3>
            <ul>
              <li v-for="(item,index) in topicList" :key="index">
                <span>{{item.name}}</span>
                {{item.list.length>1?getTopicNum(index,1)+'~'+getTopicNum(index,item.list.length):getTopicNum(index,1)}}
              </li>
            </ul>
          </div>
          <div class="item">
            <el-switch v-model="team" @change="changeTeam" inactive-text="显示全部题干"></el-switch>
          </div>
          <div class="item" style="margin-top:20px">
            <el-switch v-model="pageFooter" @change="changePageFooter" inactive-text="添加页脚"></el-switch>
          </div>
          <div class="btns" style="text-align: center;">
            <p style="margin-top:30px">
              <el-button @click="preview">预览</el-button>
            </p>
            <!-- <el-button @click="setA3" v-if="type==2?false:true">A3打印</el-button> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Utils from "../../../../static/js/util";
import qrcode from "qrcodejs2";
export default {
  data() {
    return {
      title: "201598422选题作业",
      title2: "副标题",
      limit: "第一章",
      time: "100",
      nickname: "王老师",
      tableData: [
        {
          date: "得分",
          one: "",
          tow: "",
          three: "",
          score: ""
        }
      ],
      topicList: [],
      list: [],
      listed: [],
      lista: [],
      team: true,
      pageFooter: false,
      chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
      chnUnitChar: ["", "十", "百", "千"],
      topicTeam: true,
      className: "",
      topicCode: "",
      qrcode: null,

      type: this.$route.query.type
    };
  },
  created() {
    this.topicList = JSON.parse(sessionStorage.topicList);
    this.topicList.forEach(item => {
      if (item.name.indexOf("选") != -1) {
        this.list = item.list;
      }
      if (item.name.indexOf("填空题") != -1) {
        this.listed = item.list;
      }
    });
    this.topicCode = this.$route.query.topicCode;
    this.className = this.$route.query.className;
    console.log(this.topicList);
  },
  computed: {
    styleState() {
      return JSON.parse(sessionStorage.getItem("styleState"));
    }
  },
  mounted() {
    console.log(this.styleState);
    if (this.styleState.some(i => i == 7)) {
      this.queryHomeWorkDetail();
    }
    this.dragControllerDiv();
    if (this.$route.query.type == 2) {
      this.title = this.className;
      this.Studentinit();
    } else {
      this.init();
    }
  },
  methods: {
    //查询作业详情
    queryHomeWorkDetail() {
      let data = {
        id: this.$route.query.homeworkId
      };
      this.$get("/user/homework/findById", data).then(res => {
        if (res.code == "5000") {
          this.nickname = res.data.username;
          this.title = res.data.name;
          this.time = res.data.expectTime;
        }
      });
    },
    Studentinit() {
      let _this = this;
      // let info = JSON.parse(sessionStorage.topicInfo);
      this.qrcode = new qrcode("qrcode", {
        width: 130,
        height: 130,
        text:
          "错题章节名称：" +
          this.title +
          "\r\n" +
          "生成时间：" +
          this.topicCode,
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    // 生成二维码
    init() {
      this.title = this.$route.query.title;
      let _this = this;
      let info = JSON.parse(sessionStorage.topicInfo);
      this.qrcode = new qrcode("qrcode", {
        width: 130,
        height: 130,
        text:
          "作业编码：" + info.topicCode + "\r\n" + "班级ID：" + info.classId,
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    setA3() {
      //   Utils.$emit('A3',this.)
      this.$router.push({
        path: "/homeCommon/setA3"
      });
    },
    // 修改题干
    changeTeam(e) {
      this.topicTeam = e;
    },
    // 显示页脚
    changePageFooter(e) {
      this.pageFooter = e;
    },
    // 拖拽
    dragControllerDiv: function() {
      var resize = document.getElementsByClassName("resize");
      var top = document.getElementsByClassName("listed ");
      var mid = document.getElementsByClassName("mid");
      var box = document.getElementsByClassName("tipsTitle");
      for (let i = 0; i < top.length; i++) {
        // 鼠标按下事件
        top[i].onmousedown = function(e) {
          var startY = e.clientY;
          top[i].top = top[i].clientHeight;
          // 鼠标拖动事件
          document.onmousemove = function(e) {
            var endY = e.clientY;
            var moveLen = top[i].top + (endY - startY); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            //var maxT = box[i].clientHeight - resize[i].offsetHeight;  // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 30) moveLen = 30; // 左边区域的最小宽度为150px
            //if (moveLen > maxT - 30) moveLen = maxT  - 30;  //右边区域最小宽度为150px

            top[i].style.top = moveLen; // 设置左侧区域的宽度
            top[i].style.height = moveLen + "px";
            // for (let j = 0; j < top.length; j++) {

            // }
          };
          // 鼠标松开事件
          document.onmouseup = function(evt) {
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
    preview0() {
      window.print();
    },
    // 限制打印
    preview() {
      $(".headers").hide();
      $("#A4").append(
        `<span class="top-left" style="position:absolute;border-top:15px solid #000;top:10px;left:10px;border-left:20px solid #000;"></span>
          <span class="top-right" style="position:absolute;border-top:15px solid #000;top:10px;right:10px;border-left:20px solid #000;"></span>
          <span class="top-left" style="position:absolute;border-top:20px solid #000;bottom:0px;left:10px;border-left:10px solid #000;"></span>
          <span class="top-right" style="position:absolute;border-top:20px solid #000;bottom:0px;right:10px;border-left:10px solid #000;"></span>`
      );
      //判断试卷有多少页
      if ($("#A4").height() / 1100 > 1) {
        // console.log()
        let nums = String($("#A4").height() / 1100).split(".")[0];
        console.log(nums);
        for (let i = 1; i <= nums; i++) {
          $("#A4").append(
            `<span class="top-left" style="position:absolute;border-top:15px solid #000;top:${1040 *
              i +
              20}px;left:10px;border-left:20px solid #000;"></span>
              <span class="top-right" style="position:absolute;border-top:15px solid #000;top:${1040 *
                i +
                20}px;right:10px;border-left:20px solid #000;"></span>
              <span class="top-left" style="position:absolute;border-top:20px solid #000;top:${1040 *
                (i + 1) -
                10}px;left:10px;border-left:10px solid #000;"></span>
              <span class="top-right" style="position:absolute;border-top:20px solid #000;top:${1040 *
                (i + 1) -
                10}px;right:10px;border-left:10px solid #000;"></span>`
          );
        }
      }
      $(".grid-content").hide();
      $(".chooseAdd").hide();
      $("#edit").hide();
      $(".layout").hide();
      $("#preview").hide();
      // console.log($('#A4').height())
      // $('.el-col-18').width('100%');
      // return false;
      setTimeout(() => {
        $(".headers").show();
        $(".grid-content").show();
        $(".chooseAdd").show();
        $("#edit").show();
        $(".layout").show();
        $("#preview").show();
        // $('.el-col-18').width('75%');
      }, 50);
      // return false;
      // let bdhtml = document.getElementById('A4').innerHTML;
      // let sprnstr = "<!--start-->";
      // let eprnstr = "<!--end-->";
      // let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr));
      // prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr));
      // document.getElementById('A4').innerHTML = prnhtml;
      // window.print();
      //获取要打印的Dom内容
      let newDomHtml = this.$refs.pdfDom.innerHTML;
      //将要打印的html赋给本页面
      window.document.body.innerHTML = newDomHtml;
      //调用windos的打印接口
      window.print();
      window.location.reload(); //解决打印之后按钮失效的问题，刷新页面
      return false;
    },
    // 一个题目类型的总分
    getScore(items) {
      let score = 0;
      items.list.forEach((item, index) => {
        score += Number(item.score);
      });
      return score;
    },
    // 获取题目编码顺序
    getTopicNum(e, indexs) {
      for (
        let i = 0, data = this.topicList, len = this.topicList.length;
        i < len;
        i++
      ) {
        if (e > i) {
          indexs += e == 0 ? 0 : data[i].list.length;
        }
      }
      return indexs;
    },
    // 选择中文
    SectionToChinese(section) {
      var strIns = "",
        chnStr = "";
      var unitPos = 0;
      var zero = true;
      while (section > 0) {
        var v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = this.chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = this.chnNumChar[v];
          strIns += this.chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    },
    // 数字转换成中文数字
    NumberToChinese(num) {
      var unitPos = 0;
      var strIns = "",
        chnStr = "";
      var needZero = false;

      if (num === 0) {
        return this.chnNumChar[0];
      }

      while (num > 0) {
        var section = num % 10000;
        if (needZero) {
          chnStr = this.chnNumChar[0] + chnStr;
        }
        strIns = this.SectionToChinese(section);
        strIns +=
          section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = section < 1000 && section > 0;
        num = Math.floor(num / 10000);
        unitPos++;
      }

      return chnStr;
    }
  }
};
</script>

<style lang="less" scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
// .Bindingline {
//   position: absolute;
//   left: 10px;
//   top: 10px;
//   width: 100px;
//   height: 573px;
//   background: url(../../../../static/images/Bindingline.gif) no-repeat 0 0;
// }
.top-left {
  position: absolute;
  left: 10px;
  top: 10px;
  border-top: 10px solid #000000;
  border-left: 10px solid #000000;
}

.top-right {
  position: absolute;
  right: 10px;
  top: 10px;
  border-top: 10px solid #000000;
  border-left: 10px solid #000000;
}

@media print {
  .A4 {
    // width: 210mm;
    // height: 297mm;
    background: #fff;
    position: relative;
  }

  .studentInfo {
    // display: flex;
    // .item {
    //   float: left;
    //   width: 100%;
    //   margin-bottom: 20px;
    //   .label {
    //     width: 40%;
    //     float: left;
    //   }

    //   .input {
    //     float: left;
    //     height: 20px;
    //     width: 60%;
    //     border-bottom: 1px solid #ccc;
    //   }
    // }
  }

  .takeCare {
    margin: 30px 8% 0 8%;
    position: relative;

    .left {
      // width: 40%;
      float: left;
      // border: 1px solid #ccc;

      h3 {
        color: #333;
        font-size: 18px;
        padding: 10px;
      }

      ul {
        margin: 0;
        padding: 0;
        padding-left: 20px;
        padding-right: 20px;

        li {
          width: 100%;
          margin-bottom: 10px;
        }
      }

      .mode {
        border-top: 1px solid #eee;
        padding: 10px;

        p {
          span {
            display: inline-block;
            border: 1px solid #eee;
            height: 10px;
            margin-left: 10px;
            width: 30px;
            margin-top: 5px;
          }

          .active {
            width: auto;
            height: auto;
            border: 0;
            border-top: 10px solid #000;
            border-right: 30px solid #000;
          }
        }
      }
    }

    .right {
      float: right;
      width: 40%;

      h3 {
        font-size: 16px;
        color: #333;
        text-align: center;
      }

      .number {
        float: none;
        width: 100%;
        border: 1px solid #333;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        li {
          float: left;
          width: 10%;
          height: 16px;
          box-sizing: border-box;
          border-right: 1px solid #333;
        }

        li:last-child {
          border-right: 0;
        }
      }

      .content {
        border: 1px solid #333;
        border-top: 0;

        ul {
          float: left;
          width: 10%;
          border-right: 1px solid #333;
          margin: 0;
          padding: 0;
          text-align: center;
          box-sizing: border-box;

          li {
            // height: 13px;
            // margin-bottom: 3px;
          }
        }

        ul:last-child {
          border-right: 0;
        }
      }
    }
  }

  .takeCare:before {
    content: " ";
    border-top: 10px solid #000;
    border-right: 15px solid #000;
    background: #000;
    position: absolute;
    left: -20px;
    top: 0;
  }

  .SingleElection {
    margin: 30px 8% 0 8%;
    position: relative;

    h3 {
      font-size: 16px;
      color: #333;
    }

    .content {
      border: 1px solid #ccc;
      padding: 10px;

      ul {
        li {
          float: left;
          margin-right: 5px;
        }
      }
    }

    .border-black1 {
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      top: 24px;
      left: -20px;
      display: inline-block;
    }

    .border-black2 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      bottom: 0px;
      left: -20px;
    }

    .border-black3 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      top: 24px;
      right: -20px;
    }

    .border-black4 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      bottom: 0px;
      right: -20px;
    }
  }

  .tipsTitle {
    margin: 30px 8% 0 8%;
    height: calc(30% - 10px);
    position: relative;
    padding: 10px;

    /*border: 1px solid #ccc;*/
    .list {
      margin-bottom: 30px;
    }

    .listed {
      border: 1px solid #ccc;
    }

    .top {
      position: relative;

      ul {
        li {
          width: 4.5%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          height: 20px;
          text-align: center;
        }
      }
    }

    .tipsTitle-back1 {
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      position: absolute;
      left: -20px;
      top: 6px;
    }

    .tipsTitle-back2 {
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      position: absolute;
      right: -20px;
      top: 6px;
    }
  }

  .testPaper {
    margin: 30px 8% 0 8%;
  }

  .box {
    width: 28px;
    height: 28px;
    border: 1px solid #000;
    position: absolute;
    right: 0;
  }
}
.left {
  // width: 40%;
  float: left;
  // border: 1px solid #ccc;

  h3 {
    color: #333;
    font-size: 18px;
    padding: 10px;
  }

  ul {
    margin: 0;
    padding: 0;
    padding-left: 20px;
    padding-right: 20px;

    li {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .mode {
    border-top: 1px solid #eee;
    padding: 10px;

    p {
      span {
        display: inline-block;
        border: 1px solid #eee;
        height: 10px;
        margin-left: 10px;
        width: 30px;
        margin-top: 5px;
      }

      .active {
        width: auto;
        height: auto;
        border: 0;
        border-top: 10px solid #000;
        border-right: 30px solid #000;
      }
    }
  }
}
.studentInfo {
  padding: 0 8%;
  .item {
    float: left;
    width: 30%;
    margin-right: 2%;
    .label {
      float: left;
      width: 25%;
    }

    .input {
      float: left;
      height: 20px;
      width: 75%;
      border-bottom: 1px solid #ccc;
    }
  }
}
.settingAnswerCard {
  .A4 {
    // width: 210mm;
    // height: 297mm;
    background: #fff;
  }

  // .studentInfo {
  //   padding: 0 8%;
  //   .item {
  //     float: left;
  //     width: 33%;
  //     margin-bottom: 20px;
  //     .label {
  //       float: left;
  //       width: 20%;
  //     }

  //     .input {
  //       float: left;
  //       height: 20px;
  //       width: 80%;
  //       border-bottom: 1px solid #ccc;
  //     }
  //   }
  // }

  .takeCare {
    margin: 30px 8% 0 8%;
    position: relative;

    .left {
      width: 40%;
      float: left;
      // border: 1px solid #ccc;

      h3 {
        color: #333;
        font-size: 18px;
        padding: 10px;
      }

      ul {
        margin: 0;
        padding: 0;
        padding-left: 20px;
        padding-right: 20px;

        li {
          width: 100%;
          margin-bottom: 10px;
        }
      }

      .mode {
        border-top: 1px solid #eee;
        padding: 10px;

        p {
          span {
            display: inline-block;
            border: 1px solid #eee;
            height: 10px;
            margin-left: 10px;
            width: 30px;
            margin-top: 5px;
          }

          .active {
            width: auto;
            height: auto;
            border: 0;
            border-top: 10px solid #000;
            border-right: 30px solid #000;
          }
        }
      }
    }

    .right {
      float: right;
      width: 40%;

      h3 {
        font-size: 16px;
        color: #333;
        text-align: center;
      }

      .number {
        float: none;
        width: 100%;
        border: 1px solid #333;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        li {
          float: left;
          width: 10%;
          height: 16px;
          box-sizing: border-box;
          border-right: 1px solid #333;
        }

        li:last-child {
          border-right: 0;
        }
      }

      .content {
        border: 1px solid #333;
        border-top: 0;

        ul {
          float: left;
          width: 10%;
          border-right: 1px solid #333;
          margin: 0;
          padding: 0;
          text-align: center;
          box-sizing: border-box;
        }

        ul:last-child {
          border-right: 0;
        }
      }
    }
  }

  .takeCare:before {
    content: " ";
    border-top: 10px solid #000;
    border-right: 15px solid #000;
    background: #000;
    position: absolute;
    left: -20px;
    top: 0;
  }

  .SingleElection {
    margin: 30px 8% 0 8%;
    position: relative;

    h3 {
      font-size: 16px;
      color: #333;
    }

    .content {
      border: 1px solid #ccc;
      padding: 10px;

      ul {
        li {
          float: left;
          margin-right: 5px;
        }
      }
    }

    .border-black1 {
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      top: 24px;
      left: -20px;
      display: inline-block;
    }

    .border-black2 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      bottom: 0px;
      left: -20px;
    }

    .border-black3 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      top: 24px;
      right: -20px;
    }

    .border-black4 {
      display: inline-block;
      position: absolute;
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      bottom: 0px;
      right: -20px;
    }
  }

  /*.SingleElection:before {*/
  /*  content: " ";*/
  /*  border-top: 30px solid #000;*/
  /*  border-right: 10px solid #000;*/
  /*  position: absolute;*/
  /*  left: 10%;*/
  /*  top: 0;*/
  /*}*/
  .tipsTitle {
    margin: 30px 8% 0 8%;
    height: calc(30% - 10px);
    position: relative;
    padding: 10px;

    /*border: 1px solid #ccc;*/
    .listed {
      border: 1px solid #ccc;
    }

    .list {
      margin-bottom: 30px;
      /*border: 1px solid #ccc;*/
    }

    .top {
      position: relative;

      ul {
        li {
          width: 4.5%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          height: 20px;
          text-align: center;
        }
      }
    }

    .tipsTitle-back1 {
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      position: absolute;
      left: -20px;
      top: 6px;
    }

    .tipsTitle-back2 {
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      position: absolute;
      right: -20px;
      top: 6px;
    }
  }

  .testPaper {
    margin: 30px 8% 0 8%;
  }
}

.box {
  width: 28px;
  height: 28px;
  border: 1px solid #000;
  position: absolute;
  right: 0;
}

.left {
  float: left;
}

.right {
  float: right;
}

h1 {
  margin: 0;
  padding: 0;
}

.el-col-6 {
  padding-left: 30px;
  padding-top: 0;

  .layout {
    box-sizing: border-box;
    border: 2px solid #ccc;
    background: #fff;
    padding: 10px;

    h3 {
    }

    .out {
      margin-bottom: 20px;

      .list {
        float: left;
        width: 20%;
        margin-right: 5%;

        p {
          width: 40px;
          height: 40px;
          border: 1px solid #ccc;
          line-height: 40px;
          //   text-align: center;
          font-size: 18px;
        }

        span {
          font-size: 14px;
          //   text-align: center;
          display: block;
        }
      }
    }

    > .list {
      margin-bottom: 20px;

      h3 {
        margin-bottom: 20px;
      }

      ul {
        li {
          margin-bottom: 10px;
          height: 20px;
          line-height: 20px;

          span {
            float: left;
            width: 40%;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
