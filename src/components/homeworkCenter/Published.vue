<template>
  <div class="knowledges">
    <!-- <el-button type="primary" @click="screen">筛选</el-button> -->
    <!-- <Grade @subjectId="subjectIds" v-if="true"></Grade> -->

    <div class="con">
      <el-row :gutter="20">
        <el-col
          style="width:25%;padding:0 10px;display:block;transition:all 0.5s ease 0s;"
          :style="shrink ? '' : 'width:0;padding:0;'"
        >
          <div class="grid-content">
            <Subject
              :addShow="true"
              @textbook="textbook"
              :style="shrink ? '' : 'width:0;overflow:hidden'"
            ></Subject>
            <div class="shrink" @click="changeShrink">
              <i :class="shrink ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
            </div>
          </div>
        </el-col>
        <el-col
          style="width:75%;padding:0 10px;transition:all 0.5s ease 0s;"
          :style="shrink ? '' : 'width:100%;'"
        >
          <div class="published bf bx posr">
            <div class="workList">
              <img src="../../../static/images/微信截图_20191205122457.png" alt />
            </div>
            <div class="sec-con flexbox">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select
                  v-model="value4"
                  clearable
                  placeholder="请选择班级"
                  @change="queryClassHomework"
                >
                  <el-option
                    v-for="item in createClass"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="sec">
                <span class="name ft16">时间：</span>
                <el-select
                  v-model="date1"
                  clearable
                  placeholder="请选择时间"
                  @change="queryClassHomework"
                >
                  <el-option v-for="item in timeSelect" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!--        <el-date-picker type="date" placeholder="选择时间" v-model="date1"  value-format="yyyy-MM-dd"    @change="queryClassHomework"></el-date-picker>-->
              </div>
              <!-- <div>
                <el-button @click="print()">作业打印</el-button>
              </div>-->
            </div>
            <div class="mybox">
              <div class="table">
                <table>
                  <thead>
                    <tr style="background-color:#f8f8f8">
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">序号</td>
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">作业名称</td>
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">题型</td>
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">难度</td>
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">来源</td>
                      <td style="color:#2ab8b3;font-size:16px;padding:5px">时间</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in hwlist"
                      :key="index"
                      @click="chooseHomework(item)"
                      class="trHover"
                    >
                      <td style="padding:10px">{{ index + 1 }}</td>
                      <td style="padding:10px;color:#f88869">
                        <!-- {{ item.homeworkName }} -->
                        {{item.name}}
                      </td>
                      <td style="padding:10px">{{ item.type }}</td>
                      <!-- <td style="padding:10px">{{ item.diff }}</td> -->
                      <td style="padding:10px">{{ item.level }}</td>
                      <td style="padding:10px">{{ item.source }}</td>
                      <td style="padding:10px">{{ item.createTime }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="myPage">
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                class="myPages"
                :total="pageCount"
              ></el-pagination>
            </div>

            <noData v-show="showimg"></noData>
          </div>
          <div class="workShow" v-show="showWorkList">
            <div id="subOutputRank-print">
              <div class="example" v-for="(item, index) in subjects" :key="index">
                <div class="number">
                  <span>导入</span>
                  此题编码:{{ item.code }}
                </div>
                <div class="TestBox" style="border:1px solid #eee;">
                  <div class="test" v-html="item.content"></div>
                </div>
              </div>
            </div>
            <div class="btns">
              <el-button style="background-color:#f15d28;color:#fff" @click="printContent">作业打印</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Grade from "../grade/grade";
import Subject from "../grade/subject";
import Utils from "../../../static/js/util";
import Gagination from "../../components/pagination/pagination";
import noData from "../../components/noData/noData";
export default {
  name: "",
  inject: ["reload"],
  data() {
    return {
      workCenter: true,
      value4: "",
      createClass: [],
      date1: "",
      pageCount: 10,
      hwlist: [
        {
          homeworkName: "集合的含义",
          type: "单选",
          diff: "容易",
          source: "历年真题",
          createTime: "2019-08-06"
        },
        {
          homeworkName: "命题的概念",
          type: "单选",
          diff: "容易",
          source: "历年真题",
          createTime: "2019-08-06"
        },
        {
          homeworkName: "平面向量",
          type: "单选",
          diff: "容易",
          source: "历年真题",
          createTime: "2019-08-06"
        },
        {
          homeworkName: "立体几何",
          type: "单选",
          diff: "容易",
          source: "历年真题",
          createTime: "2019-08-06"
        }
      ],

      timeSelect: [],
      showimg: false,
      subjectId: "",
      shrink: true,
      screens: false,
      subjectId: "", //学科id
      textbookId: "", //教科书id
      chapterId: "", //章id
      barId: "", //节id
      pageSize: 1,
      pageNum: 1,
      total: 0,
      contentId: "",
      subjects: [],
      showWorkList: false
    };
  },
  components: {
    Gagination,
    noData,
    Subject,
    Utils,
    Grade
  },
  created() {
    //选择班级
    this.showimg = true;
  },
  mounted() {
    Utils.$on("getData", res => {
      this.chapterId = res.id;
      this.queryCreateClass();
    });
    this.queryCreateClass();
    if (this.hwlist.length == 0) {
      // this.workCenter=false
      this.showimg = true;
    }
  },
  methods: {
    print() {
      this.$router.push({
        path: "/homeCommon/workCenter/homeworkPrint"
      });
      sessionStorage.topicList = "";
      sessionStorage.styleState = "";
      sessionStorage.testWorkId = "";
    },
    //打印

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
    //
    screen() {
      this.screens = !this.screens;
    },
    changeShrink() {
      this.shrink = !this.shrink;
    },
    textbook(e) {
      this.subjectId = e.subjectId;
    },
    chooseHomework(e) {
      // console.log(e, 1111);
      // this.$router.push({
      //   path: "/homeCommon/workCenter/workable",
      //   query: { homeworkId: e.id }
      // });
      this.$router.push({
        path: "/homeCommon/workCenter/homeworkPrint",
        query: { homeworkId: e.id }
      });
      sessionStorage.topicList = "";
      sessionStorage.styleState = "";
      sessionStorage.testWorkId = "";
    },
    workId(e) {
      //  console.log(e)
      (this.chapterId = e.chapterId),
        (this.barId = e.barId),
        (this.contentId = e.contentId);
      this.queryClassHomework();
    },
    subjectIds(e) {
      // this.queryHomeworkTimeSelect()
      var num = 0;
      num = +e.id;
      //  console.log(num)
      this.subjectId = num;
      this.queryClassHomework();
    },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryClassHomework(); //每页条数
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryClassHomework(); //当前
    },
    ////查询班级已发布/未发布作业时间下拉列表
    queryHomeworkTimeSelect() {
      this.$post("/likework/queryHomeworkTimeSelect.do", {
        classId: this.value4, //班级id
        flag: 0 //发布状态 0-已发布 1-未发布
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.timeSelect = response.data;
          //查询作业
          this.queryClassHomework();
        }
      });
    },
    //选择班级
    queryCreateClass() {
      let data = {
        userId: sessionStorage.userId
      };
      this.$post("/user/classes/query", data).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.createClass = response.data;
          this.value4 = response.data[0].id;
          this.showimg = false;
          //查询班级已发布/未发布作业时间下拉列表
          this.queryClassHomework();
          //查询作业
          // this.queryClassHomework();
        } else {
          this.showimg = true;
          this.workCenter = false;
        }
      });
    },
    // 修改当前页面
    handleCurrentChange(e) {
      this.pageNum = e;
      this.queryClassHomework();
    },
    //查询作业
    queryClassHomework() {
      this.hwlist = [];
      let data = {
        subjectId: sessionStorage.subjectId,
        pid: "",
        classId: this.value4,
        indexNo: this.pageNum,
        rows: 10
      };
      // console.log()
      this.$get("/user/homework/findListByPid", data).then(res => {
        if (res.code == "5000") {
          this.pageCount = res.data.date.length;
          this.pageNum = res.data.pageNum;
          this.hwlist = res.data.date;
        }
      });
      /*this.$post("/likework/queryClassHomework.do", {
        classId: this.value4, //班级id
        //  subjectId:"", //学科id
        //  textbookId: "", //教科书id
        //  chapterId: "", //章id
        //  barId: "", //节id
        //  contentId: "", //内容id
        subjectId: this.subjectId, //学科id
        textbookId: "", //教科书id
        chapterId: this.chapterId, //章id
        barId: this.barId, //节id
        contentId: this.contentId, //内容id
        time: this.date1,
        rows: 10,
        indexNo: this.pageNum,
        flag: 0 //发布状态 0-已发布 1-未发布
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          if (response.data.rows != "") {
            // console.log(response)
            this.hwlist = response.data.rows;
            this.total = response.data.pageCount;
            this.showimg = false;
          } else {
            this.showimg = true;
            this.workCenter = false;
          }
        }
      }); */
    }
  }
};
</script>

<style scoped lang="less">
@color: #2592e7;
.knowledges {
  .con {
    margin-top: 20px;
    .paginationed {
      // margin-top: 20px;
      display: block;
      width: 100%;
      height: 80px;
    }
    .published {
      // height: 435px;
      //   height: 560px;
      padding: 30px 30px 0 30px;
      .mybox {
        width: 100%;
        .table {
          table {
            // width: 100%;
            width: 100%;
            height: 80%;
            .trHover:hover {
              background-color: #faf1ed;
            }
          }
        }
      }
      .myPage {
        margin-top: 10px;
        margin-bottom: 10px;
        .myPages {
          margin-left: 60%;
        }
      }
      .workList {
        width: 100%;
        height: 62px;
        border-bottom: 1px solid #eee;
        display: block;
        margin-bottom: 10px;
      }
      .sec-con {
        margin-bottom: 30px;
        .sec {
          margin-right: 80px;
        }
      }
      .con {
        //  margin-top: 20px;
        // border:1px solid #eee;
        // padding: 5px;
        margin-bottom: 40px;
        // p{
        //   span{
        //     display: inline-block;
        //     width: 20%;
        //   }
        // }
      }
    }
    .workShow {
      border-top: 10px solid #f8f8f8;
      width: 97%;
      padding: 16px;
      background-color: #fff;

      .btns {
        position: relative;
        right: -50%;
        bottom: 10px;
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
    .item {
      width: 100%;
      // border: 1px solid #eee;
      padding: 5px;
      a {
        span {
          box-sizing: border-box;
          display: inline-block;
          color: #088dff;
          width: 20%;
          height: 100%;
          // border-right: 1px solid #eee;
          margin-left: 15px;
        }
      }
    }
    .grid-content {
      position: relative;
      .shrink {
        cursor: pointer;
        position: absolute;
        width: 30px;
        right: 0;
        top: 50%;
        height: 60px;
        border-radius: 5px 0 0 5px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
