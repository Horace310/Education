<template>
  <div class="settingAnswerCard">
    <div class="A4" id="A4" style="width:770px;height:auto">
      <span class="Aleft"></span>
      <span class="Aright"></span>
      <span class="Aleftbottom"></span>
      <span class="Arightbottom"></span>
      <!--start-->
      <div style="width:635px;">
        <h1 style="text-align: center;">
          <input type="text" v-model="title" style="border:0;text-align: center;" />
        </h1>
        <div class="studentInfo clearfix" style="height:22px">
          <div class="item clearfix" style="float:left;width:33%;">
            <div class="label" style="float:left;width:25%;">姓名：</div>
            <div
              class="input"
              style="float:left;height:21px;width:60%;border-bottom:1px solid #ccc;"
            ></div>
          </div>
          <div class="item clearfix" style="float:left;width:33%;">
            <div class="label" style="float:left;width:25%;">班级：</div>
            <div
              class="input"
              style="float:left;height:21px;width:60%;border-bottom:1px solid #ccc;"
            ></div>
          </div>
          <div class="item clearfix" style="float:left;width:33%;">
            <div class="label" style="float:left;width:25%;">学号：</div>
            <div
              class="input"
              style="float:left;height:21px;width:60%;border-bottom:1px solid #ccc;"
            ></div>
          </div>
        </div>
        <div
          class="takeCare clearfix"
          style="padding-right:5%;margin-top:30px;position:relative;overflow:hidden"
        >
          <div class="left" style="width:40%;float:left;border:1px solid #ccc;">
            <h3 style="padding:10px;font-size:18px;color:#333;">注意事项</h3>
            <ul style="margin:0;padding:0;padding:0 20px;font-size:14px">
              <li
                style="margin:0;padding:0;list-style:none;width:100%;margin-bottom:10px;"
              >1.答题前请将姓名、班级、考场、准考证号填写清楚。</li>
              <li
                style="margin:0;padding:0;list-style:none;width:100%;margin-bottom:10px;"
              >2.客观题答题，必须使用2B铅笔填涂，修改时用橡皮擦干净。</li>
              <li
                style="margin:0;padding:0;list-style:none;width:100%;margin-bottom:10px;"
              >3.主观题答题，必须使用黑色签字笔书写。</li>
            </ul>
            <div class="mode" style="border-top:1px solid #eee;padding:10px;">
              <p>
                正确填涂
                <span
                  class="active"
                  style="display: inline-block;margin-left:10px;margin-top:5px;border-top:10px solid #000;border-right:30px solid #000;"
                ></span>
              </p>
              <p>
                缺考标记
                <span
                  style="display: inline-block;border:1px solid #eee;width:30px;height:10px;margin-left:10px;margin-top:5px;"
                ></span>
              </p>
            </div>
          </div>
          <div class="right" style="width:45%;float:right;">
            <h3 style="font-size:16px;text-align:center;color:#333;">学号</h3>
            <ul
              class="number clearfix"
              style="float:none;width:100%;border:1px solid #333;margin:0;padding:0;
            box-sizing:border-box;border-bottom:0;height:17px;"
            >
              <li
                v-for="items in 10"
                :key="items"
                style="width:10%;float:left;height:17px;box-sizing:border-box;border-right:1px solid #333;"
                :style="items == 10?'border-right:0;':''"
              ></li>
            </ul>
            <div class="content clearfix" style="border:1px solid #333;height:222px;">
              <ul
                v-for="item in 10"
                :key="item"
                style="float:left;width:10%;border-right:1px solid #333;margin:0;padding:0;text-align:center;box-sizing:border-box;list-style:none;height:220px;"
                :style="item==10?'border-right:0;':''"
              >
                <li
                  v-for="items in 10"
                  :key="items"
                  style="height:17px;margin-bottom:5px;"
                >[{{ items - 1 }}]</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="SingleElection" style="padding-right:1%;margin-top:30px;position:relative;">
          <h3 style="font-size:16px;color:#333;">单选题</h3>
          <div class="content" style="border:1px solid #ccc;padding:10px;box-sizing:border-box;">
            <ul
              class="clearfix"
              v-for="(item, index) in list"
              :key="index"
              style="overflow:hidden;list-style:none;margin:0;padding:0;"
            >
              <li style="margin:0;padding:0;float:left;margin-right:5px;">{{ index + 1 }}.</li>
              <li style="margin:0;padding:0;float:left;margin-right:5px;">[A]</li>
              <li style="margin:0;padding:0;float:left;margin-right:5px;">[B]</li>
              <li style="margin:0;padding:0;float:left;margin-right:5px;">[C]</li>
              <li style="margin:0;padding:0;float:left;margin-right:5px;">[D]</li>
            </ul>
          </div>
          <span
            style="border-top: 10px solid #000;border-right: 10px solid #000;position: absolute;left: -2%;top: 25px"
          ></span>
          <span
            class="sright"
            style="border-top:10px solid #000;border-right:10px solid #000;position:absolute;right:-1%;top:25px;"
          ></span>
          <span
            class="sleftbottom"
            style="border-top:10px solid #000;border-right:10px solid #000;position:absolute;left:-2%;bottom:0"
          ></span>
          <span
            class="srightbottom"
            style="border-top:10px solid #000;border-right:10px solid #000;position:absolute;right:-1%;bottom:0;"
          ></span>
        </div>
        <div class="testPaper" style="margin-top:30px;">
          <p>注意：本试卷包含I、II两卷。第I卷为选择题，所有答案必须用2B铅笔在答题卡相应的位置。</p>
          <p>第二卷为非选择题，所有答案必须填在答题卷的相应位置。答案写在试卷上均无效，不予记分。</p>
        </div>
      </div>
      <div
        class="tipsTitle clearfix"
        v-for="(items, indexs) in topicList"
        :id="'tipsTitle'+indexs"
        :key="indexs"
        v-show="team||items.name.indexOf('选')==-1"
        style="width:608px;box-sizing:border-box;text-align:left;margin-right:10%;margin-bottom:30px;padding:10px;position:relative;height:calc(30% - 10px);border:1px solid #ccc;"
      >
        <i></i>
        <div class="top">
          <ul
            class="clearfix"
            style="overflow:hidden;margin:0;padding:0;list-style:none;"
            v-show="items.name.indexOf('选')==-1"
          >
            <li
              class
              style="float:right;width:4.5%;box-sizing:border-box;border:1px solid #ccc;height:18px;text-align:center;margin:0;padding:0;"
            >0.5</li>
            <li
              v-for="item in 21"
              :key="item"
              style="float:right;width:4.5%;box-sizing:border-box;border:1px solid #ccc;height:18px;text-align:center;margin:0;padding:0;"
            >{{item<14?item-1:''}}</li>
          </ul>
          <h2>{{ NumberToChinese(indexs + 1) }}、{{ items.name }}（本大题共{{ items.list.length }}小题，共{{ getScore(items) }}分）</h2>
          <div
            class="list clearfix"
            style="position: relative;margin-bottom:30px;overflow:hidden;"
            v-for="(item, index) in items.list"
            :key="index"
          >
            <span
              class="index left"
              style="float:left;padding-top:5px;line-height:22px;"
            >{{ getTopicNum(indexs, index + 1) }}.</span>
            <div style="float:left;" v-html="item.content" v-show="topicTeam">{{ item.content }}</div>
            <span
              style="position:absolute;bottom:0;right:20%;color:red;"
              v-show="items.name.indexOf('选')==-1"
            >[第{{getTopicNum(indexs, index + 1)}}题]</span>
            <!--              <div class="listContent" v-html="item.content" v-show="item.check">
                  {{item.content}}
            </div>-->
          </div>
        </div>
        <span
          style="border-top: 10px solid #000;border-right: 10px solid #000;position: absolute;left: -2.5%;top: 15px;"
        ></span>
        <span
          class="iright"
          style="border-top: 10px solid #000;border-right: 10px solid #000;position: absolute;right: -2.5%;top: 15px;"
        ></span>
        <span
          class="leftbottom"
          style="border-top: 10px solid #000;border-right: 10px solid #000;
    position: absolute;left: -2.5%;bottom: 0px;"
        ></span>
        <span
          class="rightbottom"
          style="border-top: 10px solid #000;border-right: 10px solid #000;position: absolute;right: -2.5%;bottom: 0px;"
        ></span>

        <div
          class="resize"
          style="position:absolute;bottom:0;width:100%;height: 5px;cursor:n-resize"
        ></div>
      </div>
      <!--end-->
    </div>
    <div style="text-align: center;margin: 60px 0;" id="preview">
      <el-button @click="preview">打印</el-button>
      <el-button @click="printPdf">打印</el-button>
    </div>
  </div>
</template>

<script>
import { getLodop } from "../../../../static/js/LodopFuncs.js";
import Utils from "../../../../static/js/util";
export default {
  data() {
    return {
      title: "201598422选题作业",
      title2: "副标题",
      limit: "第一章",
      time: "100",
      nickname: "王老师",
      tableData: [{ date: "得分", one: "", tow: "", three: "", score: "" }],
      topicList: [],
      list: [],
      team: false,
      pageFooter: false,
      chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
      chnUnitChar: ["", "十", "百", "千"],
      topicTeam: true
    };
  },
  created() {
    this.topicList = JSON.parse(sessionStorage.topicList);
    this.topicList.forEach(item => {
      if (item.name.indexOf("选") != -1) {
        this.list = item.list;
      }
    });

    // $("#A4 div:nth-child(6)").hide();
  },
  mounted() {
    this.dragControllerDiv();
    $("p").css({ margin: 0, padding: 0 });
  },
  methods: {
    // 查询数据
    printPdf() {
      let LODOP = getLodop();
      LODOP.PRINT_INIT("订货单");
      LODOP.SET_PRINT_STYLE("FontSize", 18);
      LODOP.SET_PRINT_STYLE("Bold", 1);
      LODOP.SET_PRINT_MODE("PRINT_DUPLEX", 2);
      LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
      LODOP.ADD_PRINT_HTM(
        88,
        50,
        756,
        1086,
        document.getElementById("A4").innerHTML
      );
      //        LODOP.PRINT();
      LODOP.PREVIEW();
    },

    setA3() {
      //   Utils.$emit('A3',this.)
      // this.$router.push({ path: "/homeCommon/setA3" });
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
      var top = document.getElementsByClassName("top");
      var mid = document.getElementsByClassName("mid");
      var box = document.getElementsByClassName("tipsTitle");
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function(e) {
          var startY = e.clientY;
          resize[i].top = resize[i].offsetTop;
          // 鼠标拖动事件
          document.onmousemove = function(e) {
            var endY = e.clientY;
            var moveLen = resize[i].top + (endY - startY); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            //var maxT = box[i].clientHeight - resize[i].offsetHeight;  // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 30) moveLen = 30; // 左边区域的最小宽度为150px
            //if (moveLen > maxT - 30) moveLen = maxT  - 30;  //右边区域最小宽度为150px

            resize[i].style.top = moveLen; // 设置左侧区域的宽度
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
      $(".grid-content").hide();
      $(".chooseAdd").hide();
      $("#edit").hide();
      $(".layout").hide();
      $("#preview").hide();
      // $('.el-col-18').width('100%');
      setTimeout(() => {
        $(".headers").show();
        $(".grid-content").show();
        $(".chooseAdd").show();
        $("#edit").show();
        $(".layout").show();
        $("#preview").show();
        // $('.el-col-18').width('75%');
      }, 50);
      // let bdhtml = document.getElementById('A4').innerHTML;
      // let sprnstr = "<!--start-->";
      // let eprnstr = "<!--end-->";
      // let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr));
      // prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr));
      // document.getElementById('A4').innerHTML = prnhtml;
      window.print();
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

<style>
p {
  margin: 0;
  padding: 0;
}
</style>
<style lang="less" scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
.settingAnswerCard {
  .A4 {
    // width: 210mm;
    // height: 297mm;
    margin: 0 auto;
    background: #fff;
    height: 1200px;
    width: 1700px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 5%;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    position: relative;
    //   position: relative;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-content: flex-start;
    .Aleft {
      border-top: 10px solid #000;
      border-right: 20px solid #000;
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: black;
    }
    .Aleftbottom {
      border-top: 10px solid #000;
      border-right: 20px solid #000;
      position: absolute;
      bottom: 120px;
      left: 20px;
      background-color: black;
    }
    .Aright {
      border-top: 10px solid #000;
      border-right: 20px solid #000;
      position: absolute;
      top: 20px;
      right: 170px;
      background-color: black;
    }
    .Arightbottom {
      border-top: 10px solid #000;
      border-right: 20px solid #000;
      position: absolute;
      bottom: 120px;
      right: 170px;
      background-color: black;
    }
  }
  //   .takeCare:before {
  //     content: " ";
  //     border-top: 10px solid #000;
  //     border-right: 30px solid #000;
  //     background: #000;
  //     position: absolute;
  //     left: 10%;
  //     top: 0;
  //   }
  .SingleElection {
    padding-right: 15%;
    margin-top: 30px;
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
    .sright {
      position: absolute;
      right: 13%;
      top: 25px;
      background-color: black;
      border-top: 10px solid #000;
      border-right: 10px solid #000;
    }
    .srightbottom {
      position: absolute;
      right: 13%;
      bottom: 0;
      background-color: black;
      border-top: 10px solid #000;
      border-right: 10px solid #000;
    }
    .sleftbottom {
      position: absolute;
      left: -2%;
      bottom: 0;
      background-color: black;
      border-top: 10px solid #000;
      border-right: 10px solid #000;
    }
  }
  .SingleElection:before {
    content: " ";
    border-top: 10px solid #000;
    border-right: 10px solid #000;
    position: absolute;
    left: -2%;
    top: 25px;
  }
  //   .tipsTitle:nth-child(2) {
  //     margin-right: 15%;
  //   }
  .tipsTitle {
    width: 630px;
    box-sizing: border-box;
    // float: left;
    text-align: left;
    margin: 0;
    //display: inline-block;
    //margin-left: 5%;
    //   margin-top: 30px;
    height: calc(30% - 10px);
    margin-bottom: 30px;
    // height: auto;
    margin-right: 10%;
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    .list {
      margin-bottom: 30px;
    }
    .top {
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
    // .leftbottom {
    //   content: " ";
    //   position: absolute;
    //   left: -1.8%;
    //   bottom: 0;
    //   background-color: black;
    //   border-top: 10px solid #000;
    //   border-right: 10px solid #000;
    // }
    // .rightbottom {
    //   content: " ";
    //   position: absolute;
    //   right: -1.8%;
    //   bottom: 0;
    //   background-color: black;
    //   border-top: 10px solid #000;
    //   border-right: 10px solid #000;
    // }
  }
  .testPaper {
    // padding: 0 15%;
    margin-top: 30px;
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
h1 {
  // margin: 0;
  // padding: 0;
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
          text-align: center;
          font-size: 18px;
        }
        span {
          font-size: 14px;
          text-align: center;
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
