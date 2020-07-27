<template>
  <div class="settingAnswerCard">
    <div class="A4" id="A4">
      <span class="Aleft"></span>
      <span class="Aright"></span>
      <span class="Aleftbottom"></span>
      <span class="Arightbottom"></span>
      <!--start-->
      <div style="width:750px;height:660px;">
        <h1 style="text-align: center;">
          <input type="text" v-model="title" style="border:0;text-align: center;" />
        </h1>
        <!--          <div class="studentInfo clearfix">
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
                  </div> -->
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
                      </div> -->
            <div class="left" id="qrcode"></div>
            <div class="studentInfo left clearfix">
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
          </div>
          <div class="right">
            <h3>学号</h3>
            <ul class="number clearfix">
              <li v-for="items in 10" :key="items"></li>
            </ul>
            <div class="content clearfix">
              <ul v-for="item in 10" :key="item">
                <li v-for="items in 10" :key="items">[{{ items - 1 }}]</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="SingleElection">
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
          <span class="sright"></span>
          <span class="sleftbottom"></span>
          <span class="srightbottom"></span>
        </div>
        <div class="testPaper">
          <p>注意：本试卷包含I、II两卷。第I卷为选择题，所有答案必须用2B铅笔在答题卡相应的位置。</p>
          <p>第二卷为非选择题，所有答案必须填在答题卷的相应位置。答案写在试卷上均无效，不予记分。</p>
        </div>
      </div>
      <div class="tipsTitle clearfix" v-for="(items, indexs) in topicList" :id="'tipsTitle'+indexs" :key="indexs">
        <!-- v-show="team||items.name.indexOf('选')==-1" -->
        <!-- <i></i> -->
        <!--        <div class="top">
          <ul class="clearfix" style v-show="items.name.indexOf('选')==-1">
            <li class style="float:right">0.5</li>
            <li v-for="item in 21" :key="item" style="float:right;">{{item<14?item-1:''}}</li>
          </ul>
          <h2>{{ NumberToChinese(indexs + 1) }}、{{ items.name }}（本大题共{{ items.list.length }}小题，共{{ getScore(items) }}分）</h2>
          <div class="">
            <i class="tipsTitle-back1" style="top: 5px;" v-show="items.name.indexOf('填空题')!=-1"></i>
            <i class="tipsTitle-back2" style="top: 10px;" v-show="items.name.indexOf('填空题')!=-1"></i>
            <span class="index left">{{ getTopicNum(indexs, index + 1) }}.</span>
            <div class="box" v-show="items.name.indexOf('填空题')!=-1"></div>
            <div class="" style="width: 100%;" v-html="item.content" v-show="topicTeam"></div>
          </div>
          <div
            class="list clearfix"
            style="position: relative;"
            v-for="(item, index) in items.list"
            :key="index"
          >
            <span class="index left">{{ getTopicNum(indexs, index + 1) }}.</span>
            <div class v-html="item.content" v-show="topicTeam">{{ item.content }}</div>
            <span
              style="position:absolute;bottom:0;right:20%;color:red;"
              v-show="items.name.indexOf('选')==-1"
            >[第{{getTopicNum(indexs, index + 1)}}题]</span>
          </div> -->
        <div class="top">
          <h2 style="margin-bottom: 20px;">{{ NumberToChinese(indexs + 1) }}、{{ items.name }}（本大题共{{ items.list.length }}小题，共{{ getScore(items) }}分）</h2>
          <div class="list clearfix'" style="position: relative;" :class="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1?'listed':''"
            v-for="(item, index) in items.list" :key="index">
            <i class="tipsTitle-back1" v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1"></i>
            <i class="tipsTitle-back2" v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1"></i>
            <ul class="clearfix" style v-show="items.name.indexOf('选')==-1 && items.name.indexOf('填空题')==-1">
              <li class style="float:right">0.5</li>
              <li v-for="item in 21" :key="item" style="float:right;">{{item<14?item-1:''}}</li>
            </ul>

            <div class="">
              <i class="tipsTitle-back1" style="top: 5px;" v-show="items.name.indexOf('填空题')!=-1"></i>
              <i class="tipsTitle-back2" style="top: 10px;" v-show="items.name.indexOf('填空题')!=-1"></i>
              <span class="index left">{{ getTopicNum(indexs, index + 1) }}.</span>



              <div class="box" v-show="items.name.indexOf('填空题')!=-1"></div>
              <div class="" style="width: 100%;" v-html="item.content" v-show="topicTeam"></div>
            </div>
            <!-- <div class="title" v-html="item.content" v-show="topicTeam">{{ item.content }}</div> -->
            <!--                <span-->
            <!--                  style="position:absolute;bottom:0;right:20%;color:red;"-->
            <!--                  v-show="items.name.indexOf('选')==-1"-->
            <!--                >[第{{getTopicNum(indexs, index + 1)}}题]</span>-->
            <!--                          <div class="listContent" v-html="item.content" v-show="item.check">-->
            <!--                  {{item.content}}-->
            <!--                </div>-->
            <div class="resize" style="position:absolute;bottom:0;width:100%;height: 5px;cursor:n-resize"></div>
          </div>
        </div>
        <!-- </div> -->
        <!-- <span class="iright"></span> -->
        <span class="leftbottom"></span>
        <span class="rightbottom"></span>

        <!-- <div
          class="resize"
          style="position:absolute;bottom:0;width:100%;height: 5px;cursor:n-resize"
        ></div> -->
      </div>
      <!--end-->
    </div>
    <div style="text-align: center;margin: 60px 0;" id="preview">
      <el-button @click="preview">打印</el-button>
    </div>
  </div>
</template>

<script>
  import Utils from "../../../../static/js/util";
  import qrcode from 'qrcodejs2';
  export default {
    data() {
      return {
        title: "201598422选题作业",
        title2: "副标题",
        limit: "第一章",
        time: "100",
        nickname: "王老师",
        tableData: [{
          date: "得分",
          one: "",
          tow: "",
          three: "",
          score: ""
        }],
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
      var that = this;
      setTimeout(function() {
        that.test();
      }, 1000);

      // $("#A4 div:nth-child(6)").hide();
    },
    mounted() {
      this.dragControllerDiv();
      this.init();
    },
    methods: {
      // 生成二维码
      init() {
        let _this = this;
        let info = JSON.parse(sessionStorage.topicInfo);
        this.qrcode = new qrcode('qrcode', {
          width: 130,
          height: 130,
          text: '作业编码：' + info.topicCode + '\r\n' + '班级名称：' + info.className + '\r\n' + '班级ID：' + info.classId,
          colorDark: '#000',
          colorLight: '#fff'
        })
      },
      test() {
        var len = this.topicList.length;
        let result = '';
        for (let i = 0; i < len; i++) {
          var offsetLeft = document.getElementById("tipsTitle" + i).offsetLeft;
          var offsetTop = document.getElementById("tipsTitle" + i).offsetTop;
          console.log($('#tipsTitle' + i))
          //第三四页
          if (offsetLeft > 845) {
            result += document.getElementById("tipsTitle" + i).outerHTML;
            $("#tipsTitle" + i).remove();
          }

          // console.log(offsetLeft, "offsetLeft" + i);
          // console.log(offsetTop, "offsetTop" + i);
        }
        $('#preview').before(
          `<div class="A4">
      <span class="Aleft"></span>
      <span class="Aright"></span>
      <span class="Aleftbottom"></span>
      <span class="Arightbottom"></span>
        ${result}
      </div>`
        )
      },
      setA3() {

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
        var tipsTitle = document.getElementsByClassName('top');
        $(document).on('mousedown', '.listed', function(e) {
          let that = $(this);
          let other = this;
          var startY = e.clientY;
          this.top = this.clientHeight;
          // 鼠标拖动事件
          document.onmousemove = function(e) {
            var endY = e.clientY;
            console.log(endY)
            var moveLen = other.top + (endY - startY); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            if (moveLen < 30) moveLen = 30; // 左边区域的最小宽度为150px
            that.css('height', moveLen + "px");
          };
          // 鼠标松开事件
          document.onmouseup = function(evt) {
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        })
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
          let i = 0, data = this.topicList, len = this.topicList.length; i < len; i++
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

  .settingAnswerCard {
    /deep/.A4 {
      // width: 210mm;
      // height: 297mm;
      margin: 0 auto;
      background: #fff;
      height: 1000px;
      width: 1650px;
      margin-bottom: 50px;
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
        border-top: 20px solid #000;
        border-right: 10px solid #000;
        position: absolute;
        bottom: 20px;
        left: 20px;
        background-color: black;
      }

      .Aright {
        border-top: 10px solid #000;
        border-right: 20px solid #000;
        position: absolute;
        top: 20px;
        right: 160px;
        background-color: black;
      }

      .Arightbottom {
        border-top: 20px solid #000;
        border-right: 10px solid #000;
        position: absolute;
        bottom: 20px;
        right: 160px;
        background-color: black;
      }
    }

    .studentInfo {
      // padding-right: 15%;
      width: auto;
      padding-left: 20px;
      .item {
        float: left;
        width: 33%;
        margin-bottom: 20px;
        .label {
          width: 25%;
          float: left;
        }
      
        .input {
          float: left;
          height: 20px;
          width: 60%;
          border-bottom: 1px solid #ccc;
        }
      }
    }

    .takeCare {
      padding-right: 15%;
      margin-top: 30px;
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
        width: 45%;

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
              height: 16px;
              margin-bottom: 5px;
            }
          }

          ul:last-child {
            border-right: 0;
          }
        }
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
        right: 12%;
        top: 25px;
        background-color: black;
        border-top: 10px solid #000;
        border-left: 15px solid #000;
      }

      .srightbottom {
        position: absolute;
        right: 12%;
        bottom: 0;
        background-color: black;
        border-top: 10px solid #000;
        border-right: 15px solid #000;
      }

      .sleftbottom {
        position: absolute;
        left: -3%;
        bottom: 0;
        background-color: black;
        border-top: 10px solid #000;
        border-left: 15px solid #000;
      }
    }

    .SingleElection:before {
      content: " ";
      border-top: 10px solid #000;
      border-right: 15px solid #000;
      position: absolute;
      left: -3%;
      top: 25px;
    }

    //   .tipsTitle:nth-child(2) {
    //     margin-right: 15%;
    //   }
    .tipsTitle {
      width: 630px;
      box-sizing: border-box;
      // float: left;
      // text-align: left;
      margin: 0;
      //display: inline-block;
      //margin-left: 5%;
      //   margin-top: 30px;
      // height: calc(30% - 10px);
      margin-bottom: 30px;
      // height: auto;
      margin-right: 10%;
      position: relative;
      padding: 10px;

      // border: 1px solid #ccc;
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

      i {
        content: " ";
        border-top: 10px solid #000;
        border-right: 10px solid #000;
        position: absolute;

        top: 15px;
      }

      .iright {
        content: " ";
        position: absolute;
        right: -2.5%;
        top: 15px;
        background-color: black;
        border-top: 10px solid #000;
        border-right: 10px solid #000;
      }

      .listed {
        border: 1px solid #ccc;
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

  .box {
    width: 0.518519rem;
    height: 0.518519rem;
    border: 0.018519rem solid #000;
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

      h3 {}

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

      >.list {
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
