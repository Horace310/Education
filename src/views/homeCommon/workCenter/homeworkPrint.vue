<template>
  <div class="fath_class">
    <el-card class="box-card clearfix">
      <!-- <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>-->
      <div class="printTitle left">
        <div class="Bindingline" v-show="styleState.some(item=>{return item==5})"></div>
        <h1
          style="text-align: center;font-size:28px;"
          v-show="styleState.some(item=>{return item==1})"
        >
          <input type="text" v-model="title" style="border:0;text-align: center;" />
        </h1>
        <h4 style="text-align: center;" v-show="styleState.some(item=>{return item==2})">
          <input type="text" v-model="title2" style="border:0;text-align: center;" />
        </h4>
        <div class="studentInfo clearfix" v-show="styleState.some(item=>{return item==3})">
          <div class="item clearfix">
            <div class="label">姓名：</div>
            <div class="input" contenteditable="true"></div>
          </div>
          <div class="item clearfix">
            <div class="label">班级：</div>
            <div class="input" contenteditable="true"></div>
          </div>
          <div class="item clearfix">
            <div class="label">学号：</div>
            <div class="input" contenteditable="true"></div>
          </div>
        </div>
        <p style="text-align: center;" v-show="styleState.some(item=>{return item==7})">
          考试范围：{{ limit }}； 考试时间：{{ time }}分钟；命题人：{{
          nickname
          }}
        </p>
        <div
          style="margin:0 auto;"
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
        <p
          style="margin:0 auto;width: 530px;"
          v-show="styleState.some(item=>{return item==4})"
        >注意：本试卷包含I、II两卷。第I卷为选择题，所有答案必须用2B铅笔在答题卡相应的位置。</p>
        <p
          style="margin:0 auto;width: 530px;"
          v-show="styleState.some(item=>{return item==4})"
        >第二卷为非选择题，所有答案必须填在答题卷的相应位置。答案写在试卷上均无效，不予记分。</p>
        <div style="margin:0 auto;width: 600px;">
          <div class="chooseTopic" v-for="(items,indexs) in topicList" :key="indexs">
            <h2
              @click="check(items,indexs)"
            >{{NumberToChinese(indexs+1)}}、{{items.name}}（本大题共{{items.list.length}}小题，共{{getScore(items)}}分）</h2>
            <div class="content">
              <div class="list clearfix" v-for="(item,index) in items.list" :key="index">
                <p class style="color:#f1b31f">此题编码:{{item.code}}</p>
                <span class="index left">{{getTopicNum(indexs,index+1)}}.</span>
                <div class="topicHeader" v-html="item.content">{{item.content}}</div>
                <!--                <div class="listContent" v-html="item.content">
                  {{item.content}}
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right state">
        <div class="tabs clearfix">
          <span
            v-for="(item,index) in tabs"
            :key="index"
            @click="chooseTabs(index)"
            :class="tabActive == index?'active':''"
          >{{item}}</span>
        </div>
        <div class="tabContent" v-show="tabActive == 0">
          <div class="content">
            <div class="item">
              <div class="label">标题</div>
              <div class="input topicTitle">
                <!-- {{topicTitle}} -->
                <el-input v-model="topicTitle"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="label">描述</div>
              <div class="input describe">
                <el-input v-model="describe"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="label">总分</div>
              <div class="input">
                <el-input type="text" v-model="topicTotal" @input="changeTotal($event,topicItem)"></el-input>
              </div>
            </div>
            <div class="branch">
              <ul>
                <li v-for="(item,index) in topicItem.list" :key="index" style="margin-bottom:5px;">
                  {{index+1}}、
                  <el-input
                    type="text"
                    v-model="item.score"
                    style="width: 70%;"
                    @input="changeScore($event,topicItem)"
                  ></el-input>分
                </li>
              </ul>
            </div>
            <div class="btns" style="text-align: center;">
              <el-button @click="saveTopic">保存</el-button>
            </div>
          </div>
        </div>
        <div class="tabContent" v-show="tabActive == 1">
          <draggable v-model="topicList" :options="{draggable:'.lists'}">
            <div class="lists clearfix" v-for="(item,index) in topicList" :key="index">
              {{item.name}}
              <draggable v-model="item.list" :options="{draggable:'.list'}">
                <div
                  class="list left"
                  v-for="(items,indexs) in item.list"
                  :key="indexs"
                >{{getTopicNum(index,indexs+1)}}</div>
              </draggable>
            </div>
          </draggable>
        </div>
        <div class="tabContent" v-show="tabActive == 2">
          <div class="custom">
            <h3>自定义样式</h3>
            <el-checkbox-group v-model="styleState" @change="changeCheckGroup">
              <el-checkbox :label="1">主标题</el-checkbox>
              <el-checkbox :label="2">副标题</el-checkbox>
              <el-checkbox :label="3">学生输入栏</el-checkbox>
              <el-checkbox :label="4">注意事项栏</el-checkbox>
              <!-- <el-checkbox :label="5">装订线</el-checkbox> -->
              <el-checkbox :label="6">誉分栏</el-checkbox>
              <el-checkbox :label="7">作业信息栏</el-checkbox>
            </el-checkbox-group>
            <!-- <div style="text-align: center;">
              <el-button @click="dialogTips = true">打印</el-button>
            </div>-->
          </div>
        </div>
        <el-button
          style="margin-left:20px"
          class="topicPrinting"
          @click="type==2?studentPrint():topicPrinting()"
        >预览打印</el-button>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogTips" title="温馨提示">
      <div class="btns">
        <el-button>直接下载作业</el-button>
        <el-button @click="type==2?studentPrint():topicPrinting()">生成答题卡</el-button>
        <el-button>下载答题卡</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Utils from "../../../../static/js/util";
import Knowledge from "../../../components/homeworkCenter/knowledge";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      tabs: ["编辑", "题目顺序", "试卷样式"],
      title: "201598422",
      title2: "副标题",
      limit: "第一章",
      time: "100",
      nickname: "王老师",
      flag: this.$route.query.flag,
      tabActive: 0,
      tableData: [{ date: "得分", one: "", tow: "", three: "", score: "" }],
      chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
      chnUnitChar: ["", "十", "百", "千"],
      topicList: [],
      topicTitle: "",
      describe: "",
      topicTotal: "",
      branch1: "",
      branch2: "",
      branch3: "",
      styleState: [1, 2, 3],
      dialogTips: false,
      topicItem: {},
      className: "",
      topicCode: "",
      saveId: "",
      allproblemslist: [],
      type: ""
    };
  },
  created() {
    if (this.$route.query.type == 2) {
      this.type = 2;
      this.allproblemslist = this.$store.state.allproblemslist;
      console.log(this.allproblemslist);
      this.studentAlaysis();
    } else {
      if (
        typeof sessionStorage.testWorkId == "undefined" ||
        sessionStorage.testWorkId == ""
      ) {
        this.queryHomeWorkDetail();
      } else {
        this.topicList = JSON.parse(sessionStorage.topicList);
        this.styleState =
          typeof sessionStorage.styleState == "undefined"
            ? [1, 2, 6]
            : JSON.parse(sessionStorage.styleState);
      }
      this.$store.state.worknav = "1"; //头部导航
    }
  },
  components: {
    Knowledge,
    draggable
  },
  methods: {
    //学生端打印分析
    studentAlaysis() {
      console.log("test");

      this.title = this.$store.state.studentPrint.name;
      let arr = [];
      for (let item of this.allproblemslist) {
        if (item.typeNameTwo === "选择题") {
          item.typeName = "单选题";
          console.log(1);
        } else if (item.typeNameTwo === "多选题") {
          item.typeName = "多选题";
          console.log(2);
        } else if (
          item.typeNameTwo === "填空题(主观题)" ||
          item.typeNameTwo === "填空题(客观题)"
        ) {
          item.typeName = "填空题";
        } else {
          item.typeName = "应用题";
          console.log(4);
        }
      }
      this.allproblemslist.forEach((item, index) => {
        if (arr.length == 0) {
          arr.push({
            name: typeof item.type == "object" ? "应用题" : item.typeName,
            list: [item]
          });
        } else {
          for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].name == item.typeName) {
              arr[i].list.push(item);
              break;
            } else if (len - 1 == i) {
              arr.push({
                name: typeof item.type == "object" ? "应用题" : item.typeName,
                list: [item]
              });
              break;
            }
          }
        }
      });
      console.log(arr);
      this.topicList = arr;
    },
    // 修改总分
    changeTotal(e, item) {
      this.topicTotal = this.validNumber(e);
      item.list.forEach(items => {
        items.score = Number((this.topicTotal / 4).toFixed(1));
      });
    },
    // 修改题目分数
    changeScore(e, item) {
      item.list.forEach(items => {
        items.scopre = this.validNumber(e);
      });
      this.topicTotal = this.getScore(item);
    },
    // 获取复选框
    changeCheckGroup(e) {
      this.styleState = e.sort((a, b) => {
        return a - b;
      });
      sessionStorage.styleState = JSON.stringify(this.styleState);
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
    // 查询作业详情
    queryHomeWorkDetail() {
      let data = {
        id: this.$route.query.homeworkId
      };
      this.$get("/user/homework/findById", data).then(res => {
        if (res.code == "5000") {
          this.title = res.data.name;
          this.limit = res.data.type;
          this.time = res.data.expectTime;
          this.className = res.data.className;
          this.topicCode = res.data.code;
          sessionStorage.testWorkId = data.id;
          sessionStorage.topicInfo = JSON.stringify({
            className: res.data.className,
            // topicCode: res.data.code,
            classId: res.data.classId
          });
          let arr = [];
          for (let item of res.data.list) {
            if (item.type === "单选题") {
              item.typeName = "单选题";
              console.log(1);
            } else if (item.type === "多选题") {
              item.typeName = "多选题";
              console.log(2);
            } else if (item.type === "填空题") {
              item.typeName = "填空题";
            } else {
              item.typeName = "应用题";
              console.log(4);
            }
          }
          res.data.list.forEach((item, index) => {
            if (arr.length == 0) {
              arr.push({
                name: typeof item.type == "object" ? "应用题" : item.typeName,
                list: [item]
              });
            } else {
              for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].name == item.typeName) {
                  arr[i].list.push(item);
                  break;
                } else if (len - 1 == i) {
                  arr.push({
                    name:
                      typeof item.type == "object" ? "应用题" : item.typeName,
                    list: [item]
                  });
                  break;
                }
              }
            }
          });
          console.log(arr);
          this.topicList = arr;
        }
      });
    },
    chooseTabs(e) {
      this.tabActive = e;
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
    },
    // 选中题目
    check(item, index) {
      this.topicTitle = item.name;
      this.describe =
        "本大题共" + item.list.length + "小题，共" + this.getScore(item) + "分";
      this.topicTotal = this.getScore(item);
      // this.topicItem =
      this.topicItem = item;
    },
    // 保存修改
    saveTopic() {
      sessionStorage.topicList = JSON.stringify(this.topicList);
      this.$message.success("保存成功！");
      // this.$set(this.topicItem,'title',this.topicTitle);
    },
    //学生端打印
    studentPrint() {
      console.log("testgsafsfsafsf", "sdsdsd");
      console.log(this.getTime());
      sessionStorage.styleState = JSON.stringify(this.styleState);
      sessionStorage.topicList = JSON.stringify(this.topicList);
      this.$router.push({
        path: "/studentCommon/wrongBook/AFprint",
        query: { className: this.title, topicCode: this.getTime(), type: 2 }
      });
    },
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
      return currentdate;
    },

    // 打印
    topicPrinting() {
      // this.dialogTips = true;
      let topicIds = [...this.topicList];
      for (let item of topicIds) {
        item.name = item.name;
        item.ids = item.list.map((items, indexs) => {
          return items.id;
        });
      }
      // let topicIds = this.topicList.map((item, index) => {
      //   let typeName = "";
      //   console.log(typeName);
      //   if (item.name === "选择题") {
      //     typeName = "单选题";
      //   } else if (item.name === "多选题") {
      //     typeName = "多选题";
      //   } else if (
      //     item.name === "填空题(主观题)" ||
      //     item.name === "填空题(客观题)"
      //   ) {
      //     typeName = "填空题";
      //   } else {
      //     typeName = "应用题";
      //   }
      //   return {
      //     typeName,
      //     name: item.name,
      //     ids: item.list.map((items, indexs) => {
      //       return items.id;
      //     })
      //   };
      // });
      // return false;
      let data = {
        id: this.saveId,
        homeworkId: this.$route.query.homeworkId,
        oneChoice: !this.getIdsArr(topicIds, "单选题")
          ? ""
          : this.getIdsArr(topicIds, "单选题").join(),
        mulChoice: !this.getIdsArr(topicIds, "多选题")
          ? ""
          : this.getIdsArr(topicIds, "多选题").join(),
        blank: !this.getIdsArr(topicIds, "填空题")
          ? ""
          : this.getIdsArr(topicIds, "填空题").join(),
        calculate: !this.getIdsArr(topicIds, "应用题")
          ? ""
          : this.getIdsArr(topicIds, "应用题").join()
      };
      this.$post("/user/homework/qrcode/insert", data).then(res => {
        if (res.code == "5000") {
          let newData = JSON.parse(sessionStorage.topicInfo);
          newData.topicCode = res.data;
          sessionStorage.topicInfo = JSON.stringify(newData);
          this.$router.push({
            path: "/homeCommon/workCenter/settingAnswerCard",
            query: {
              className: this.className,
              topicCode: res.data,
              title: this.title,
              homeworkId: this.$route.query.homeworkId
            }
          });
        }
      });
      console.log(data);
      sessionStorage.styleState = JSON.stringify(this.styleState);
      sessionStorage.topicList = JSON.stringify(this.topicList);
    },
    // 获取作业id数组
    getIdsArr(arr, name) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.indexOf(name) != -1) {
          return arr[i].ids;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.left {
  float: left;
}
.right {
  float: right;
}
.fath_class {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1300px;
  height: 1000px;
}
.el-card {
  /deep/.el-card__body {
    padding: 0;
  }
  /deep/.el-card__body:before {
    display: table;
    content: "";
  }
  .printTitle.left {
    width: 70%;
    padding: 0.37037rem;
    box-sizing: border-box;
    overflow-y: auto;
    height: 100vh;
    position: relative;
    .Bindingline {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 100px;
      height: 573px;
      background: url(../../../../static/images/Bindingline.gif) no-repeat 0 0;
    }

    .studentInfo {
      padding: 0 15%;
      .item {
        float: left;
        width: 33%;
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
  }
  .state {
    width: 30%;
    height: 100vh;
    position: relative;
    .topicPrinting {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .tabs {
      span {
        position: relative;
        float: left;
        width: 33.333333%;
        line-height: 55px;
        font-size: 14px;
        border-left: 1px solid #ebebeb;
        margin-left: -1px;
        text-align: center;
        cursor: pointer;
        background: #f3f3f3;
        border-bottom: 1px solid #ebebeb;
        border-top: 3px solid transparent;
      }
      span.active {
        border-top-color: #0dc2b3;
        color: #0dc2b3;
        background: #fff;
      }
    }
    .tabContent {
      padding: 20px;
      .lists {
        border: 1px dashed #0dc2b3;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
        .list {
          min-width: 23px;
          line-height: 30px;
          text-align: center;
          margin: 5px;
          border-radius: 5px;
          border: 1px solid #0dc2b3;
        }
      }
      .content {
        .item {
          display: flex;
          .label {
            width: 40px;
          }
          .input {
            flex: 1;
          }
        }
      }
      .custom {
        border: 1px solid #eee;
        padding: 10px;
        box-sizing: border-box;
        .el-checkbox-group {
          .el-checkbox {
            display: block;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.chooseTopic {
  margin-top: 30px;
  h2 {
    border: 1px solid transparent;
  }
  h2:hover {
    border-color: #0066cc;
  }
  .content {
    .list {
      margin-top: 30px;
    }
  }
}
.el-dialog__wrapper {
  /deep/.el-dialog {
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__body {
      border-top: 1px solid #ccc;
      .btns {
        padding: 20px 80px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
