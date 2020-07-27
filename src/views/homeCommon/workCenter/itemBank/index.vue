<template>
  <div class="AnswerCard">
    <div class="box">
      <div class="left">
        <subjcet :addShow="true" />
      </div>
      <div class="right">
        <div class="imgBox">
          <div class="searchItem">
            <span>题型：</span>
            <el-select
              v-model="className"
              placeholder="请选择题型"
              @change="changeClass"
              size="mini"
              style="width:150px;"
            >
              <el-option
                v-for="(item,index) in QuestionType"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="searchItem">
            <span>题型：</span>
            <el-select
              v-model="className"
              placeholder="请选择班级"
              @change="changeClass"
              size="mini"
              style="width:150px;"
            >
              <el-option
                v-for="(item, i) in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>-->
          <!-- <div class="searchItem">
            <el-input placeholder="请输入内容" v-model="input2" size="mini">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>-->
          <div class="searchItem">
            <el-button @click="goRou" style="margin-left:40px" size="mini" type="primary">题库管理</el-button>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="testList" v-for="(item,index) in testList" :key="index">
          <div class="teslList_main">
            <div class="head" v-html="item.content"></div>
          </div>
          <div v-show="item.openIndex" class="viewJiexi">
            <div class="answer" style="width:100%" v-html="item.answer"></div>
          </div>
          <div class="testList_footer">
            <div class="testList_footer_left">
              <p>
                组卷：
                <Span class="blueClass">2.W+</Span>
              </p>
              <p>
                作答：
                <span class="blueClass">266</span>
              </p>
              <p>
                平均得分率：
                <span class="yellClass">55.42%</span>
              </p>
            </div>
            <div class="testList_footer_right">
              <p @click="cancel(item)">
                <img
                  style="width:13px;margin:0 3px 2px 0"
                  src="../../../../../static/images/xinx.png"
                />取消收藏
              </p>
              <p>纠错</p>
              <p @click="item.openIndex=!item.openIndex">解析</p>
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
            :layout="layout"
            :total="countPage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<script>
import Utils from "../../../../../static/js/util";
import subjcet from "@/components/grade/subject.vue";
export default {
  components: {
    subjcet
  },
  data() {
    return {
      layout: "prev, pager, next, jumper",
      pageSize: 10,
      countPage: 0,
      testList: [],
      QuestionType: [],
      viewData: false,
      show2: false,
      textbookId: "",
      list: [],
      currentPage: 1,
      currentPage4: 1,
      classId: "",
      className: "",
      classList: [], //班级列表
      workList: [],
      show: false,
      totalS: "",
      pids: "",
      typeid: "",
      zuoyeid: ""
    };
  },
  created() {
    var that = this;
    // that.getclassList();
    // this.getWorkList();
    that.QuestionTypeSelect();
    Utils.$on("getData", msg => {
      this.pids = msg.id;
      this.getSubject();
    });
    Utils.$on("bookId", function(msg) {
      that.textbookId = msg;
      that.getSubject();
    });
  },
  methods: {
    handleSizeChange(e) {
      // this.pageSize = e;
      // alert(e)
      // this.getSubject();
      // //   else {
      // //   this.queryHomework(this.QuestionType2index + 1);
      // // }
    },
    handleCurrentChange(e) {
      this.currentPage4 = e;
      this.getSubject();
      //else {
      //   this.queryHomework(this.QuestionType2index + 1);
      // }
    },
    cancel(value) {
      this.$confirm("此操作将取消收藏此题目，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("user/homework/deleteOneSelf", { id: value.id }).then(
          res => {
            if (res.code == 5000) {
              this.$message({ type: "success", message: "取消收藏成功" });
              this.getSubject();
            }
          }
        );
      });
    },
    QuestionTypeSelect() {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          res.data.unshift({ name: "全部", id: 0 });
          this.QuestionType = res.data;
        }
      });
    },
    getSubject(e) {
      this.$get("/user/homework/findOneSelfStoreList", {
        textbookId: this.textbookId,
        typeId: this.typeId,
        indexNo: this.currentPage4,
        rows: this.pageSize,
        rows: 10,
        pid: this.pids ? this.pids : ""
      }).then(res => {
        if (res.code == 5000) {
          let newData = [...res.data.date];
          for (let i of newData) {
            i.openIndex = false;
          }
          this.testList = res.data.date;
          this.countPage = res.data.total;
          this.currentPage4 = res.data.pageNum;
        }
      });
    },
    goRou() {
      this.$router.push({
        path: "/homeCommon/workCenter/Manage"
      });
    },
    //添加相似题型
    addSpareQuestions(id) {
      this.typeid = id;
      this.show2 = true;
      this.show = false;
    },
    //查询作业详情
    getquestiondeatil(id) {
      // 作业id
      this.zuoyeid = id;
      this.$get("user/homework/findById", { id: id }).then(res => {
        if (res.code == 5000) {
          this.list = res.data.list;
          this.showBox();
        }
      });
    },
    handleCurrentChanges(val) {
      // this.currentPage = val;
      // this.getWorkList();
    },
    changeClass(e) {
      this.typeId = e;
      this.getSubject(e);
    },
    //获取作业列表
    // getWorkList() {
    //   let data = {
    //     pid: this.pids,
    //     rows: 10,
    //     indexNo: this.currentPage,
    //     subjectId: sessionStorage.getItem("subjectId")
    //   };
    //   if (this.classId != 0) {
    //     data.classId = this.classId;
    //   }
    //   this.$get("/user/homework/findListByPid", data).then(res => {
    //     this.workList = res.data.date;
    //     this.totalS = Number(res.data.count);
    //   });
    // },
    //获取班级列表
    // getclassList() {
    //   let data = { userId: sessionStorage.getItem("userId") };
    //   this.$post("/user/classes/query", data).then(res => {
    //     if (res.code == "5000") {
    //       this.classList = res.data;
    //       //  this.getTeam();
    //     }
    //   });
    // },
    showBox() {
      this.show = true;
    }
  }
};
</script>
<style lang="less">
.AnswerCard {
  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .viewJiexi {
      height: 180px;
      overflow: auto;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #0dc2b3;
    }
    .left {
      width: 18%;
      margin-right: 10px;
    }
    .right {
      background-color: #fff;
      flex: 1;
      .searchItem {
        width: 250px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .testList {
        border: 1px solid #e8e8e8;
        min-height: 150px;
        margin: 10px 10px 20px 10px;
        display: flex;
        flex-direction: column;
        .teslList_main {
          flex: 10;
        }
        .testList_footer {
          flex: 3;
          background: #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 5px 3px 5px;
          .testList_footer_left {
            display: flex;
            .blueClass {
              color: #66c5ee;
            }
            .yellClass {
              color: rgb(251, 139, 34);
            }
            p {
              padding-right: 40px;
            }
          }
          .testList_footer_right {
            display: flex;
            p {
              padding-right: 40px;
              cursor: pointer;
            }
          }
        }
      }
      .wrongList {
        background-color: #fff;
        border-top: 10px solid #eee;
        padding: 30px;

        .listBox {
          border: 1px solid #2bb7b3;
          margin-bottom: 20px;
          .listNumber {
            padding-top: 3px;
            box-sizing: border-box;
            height: 29px;
            border-bottom: 1px solid #eee;
            .daoru {
              background-color: #ff8a00;
              box-shadow: 3px 3px 0px 0px #ffdcb2, 3px 3px 0px 0px #ffdcb2;
              color: #fff;
              padding: 3px;
            }
          }
          .listBottom {
            height: 56px;
            background-color: #f5f5f5;
            line-height: 56px;
            padding: 0px 24px;
            button {
              margin-left: 55%;
              border: 0;
              background-color: #2bb7b3;
              color: #fff;
            }
          }
        }
      }
      .imgBox {
        display: flex;
        justify-content: space-between;
        padding: 10px;
      }
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        // border: 1px solid #2ab8b3;
        //  margin-bottom: 15px;
        border-bottom: 10px solid #f8f8f8;
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
    }
  }
}
</style>
