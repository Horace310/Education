<template>
  <div class="studentCircle mt72">
    <div class="classList mt72 bf bx">
      <div class="model_title">
        <h4 class="tit fb col39a ft20">
          <i class="icon_l"></i>学生圈
          <i class="icon_r"></i>
        </h4>
      </div>
      <div class="studyResource">
        <div class="flexbox studentsCon">
          <div class="tl stuinp radios">
            <el-input placeholder="请输入关键词搜索学生圈" v-model="keyword" clearable></el-input>
          </div>
          <div class="radios tc flex">
            <el-radio-group v-model="radio" size="medium" @change="changeCircle">
              <el-radio-button label="最热"></el-radio-button>
              <el-radio-button label="最新"></el-radio-button>
              <el-radio-button label="我的"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="tr radios">
            <el-button type="primary" @click="centerDialogVisible = true">创建学科圈</el-button>
          </div>
        </div>
        <div class="studentsCircle">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="学科圈名称" align="center" prop="groupName" width="300"></el-table-column>
            <el-table-column label="上传时间" prop="createTime" align="center" width="400"></el-table-column>
            <el-table-column label="人气" prop="view" align="center" width="200"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div v-if="scope.row.joinState==4">
                  <el-button
                    @click="handleEdit(scope.$index, scope.row)"
                    class="scan"
                    size="mini"
                    v-if="showa"
                  >添加成员</el-button>
                </div>
                <div v-if="scope.row.joinState==1">
                  <el-button type="info" v-if="showa" class size="mini">已经通过</el-button>
                </div>
                <div v-if="scope.row.joinState==3">
                  <el-button type="success" v-if="showa" class size="mini">申请加入</el-button>
                </div>
                <div v-if="scope.row.joinState==0">
                  <el-button type="warning" v-if="showa" class size="mini">正在审核</el-button>
                </div>
                <div v-if="scope.row.joinState==2">
                  <el-button type="danger" v-if="showa" class size="mini">已经拒绝</el-button>
                </div>
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  class="scan"
                  size="mini"
                  v-if="showsa"
                >查看</el-button>
                <el-button @click="handleDelete(scope)" size="mini" type="danger" v-if="showsa">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Gagination
            :total="total"
            :page-size="pageSize"
            @handleSizeChangeSub="handleSizeChangeFun"
            @handleCurrentChangeSub="handleCurrentChangeFun"
          ></Gagination>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      :before-close="closeDialog"
      title="创建学科圈"
      width="30%"
    >
      <el-form :model="ruleForms" :rules="ruless" class="demo-ruleForm" label-width ref="ruleForms">
        <el-form-item label prop="name">
          <el-input clearable placeholder="请填写学科圈名" v-model="ruleForms.name"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer tc">
            <el-button @click="callOf('ruleForms')">取 消</el-button>
            <el-button @click="submitForms('ruleForms')" type="primary">确 定</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "studentCircle",

  data() {
    return {
      showimgs: false,
      showa: true,
      showsa: true,
      shows: true,
      show: true,
      tableData: [],
      hwlist: [],
      keyword: "",
      joinClass: [],
      radio: "最热",
      showing: false,
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "填写邀请码申请班级", trigger: "blur" }
        ]
      },
      ruleForms: {
        name: ""
      },
      ruless: {
        name: [{ required: true, message: "请填写学科圈名", trigger: "blur" }]
      },
      pageSize: 1,
      pageNum: 1,
      total: 0,
      centerDialogVisible: false,
      loginNumber: []
    };
  },
  created() {
    //查询加入的班级
    this.queryJoinClass();
    this.showa = true;
    this.showsa = false;
    //最热
    this.querySubjectGroupByFlag1();
    //获取题目数和登录人数
    this.queryQuestionAndLoginNumber();
    this.$store.state.stuadminnav = "1"; //头部导航
    //查询加入班级下拉列表
    this.queryClassHomework();
  },
  methods: {
    //作业详情
    homeworkDetails(id) {
      //0自评完成1自评未完成2未完成作业
      this.$router.push({
        path: "/studentCommon/activityCenter/lastHomeworkAssessment",
        query: {
          id: id,
          value: 2
        }
      });
    },
    //收藏
    collectHomework(homeworkId) {
      this.$post("/likework/collectHomework.do", {
        homeworkId: homeworkId
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.$message({
            showClose: true,
            message: "收藏成功",
            type: "success"
          });
          this.queryClassHomework();
        } else {
          this.$message({
            showClose: true,
            message: response.message,
            type: "success"
          });
        }
      });
    },
    cancleCollectHomework(homeworkId) {
      this.$post("/likework/cancleCollectHomework.do", {
        homeworkId: homeworkId
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.$message({
            showClose: true,
            message: "取消收藏成功",
            type: "success"
          });
          this.queryClassHomework();
        } else {
          this.$message({
            showClose: true,
            message: response.message,
            type: "success"
          });
        }
      });
    },
    //查询作业
    queryClassHomework() {
      this.hwlist = [];
      this.$post("/likework/queryAssessQuestionByClassId.do", {
        rows: 10,
        indexNo: this.pageNum,
        flag: "" //0已自评 1-未自评 2-未答题
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          if (response.data.rows != "") {
            this.hwlist = response.data.rows;
            this.total = response.data.pageCount;
            this.showimgs = false;
          } else {
            this.showimgs = true;
            this.total = 0;
          }
        }
      });
    },
    //获取题目数和登录人数
    queryQuestionAndLoginNumber() {
      this.$post("/likework/queryQuestionAndLoginNumber.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.loginNumber = response.data;
        }
      });
    },
    workList(id, state) {
      if (state == 1) {
        this.$router.push({
          path: "/studentCommon/workList",
          query: {
            id: id
          }
        });
      }
    },
    //删除
    handleDelete(row) {
      // console.log( row);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$post("/likework/deleteStudentGroupById.do", {
            studentGroupId: row.row.id
          }).then(response => {
            // console.log(response)
            if (response.code == "5000") {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              this.tableData = [];
              if (this.radio == "最新") {
                this.querySubjectGroupByFlag2();
              } else if (this.radio == "最热") {
                this.querySubjectGroupByFlag1();
              } else if (this.radio == "我的") {
                this.querySubjectGroupByTeacher();
              }
            } else {
              this.$message({
                showClose: true,
                message: response.message,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryClassHomework(); //每页条数
    },
    //取消
    callOf(formName) {
      this.centerDialogVisible = false;
      this.$refs["ruleForms"].resetFields();
    },
    closeDialog() {
      this.centerDialogVisible = false;
      this.$refs["ruleForms"].resetFields();
    },
    submitForms(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          this.$post("/likework/createStudentGroup.do", {
            groupName: this.ruleForms.name
          }).then(response => {
            //console.log(response)
            if (response.code == "5000") {
              loadingObj.close();
              this.$message({
                showClose: true,
                message: "创建成功",
                type: "success"
              });
              this.$refs["ruleForms"].resetFields();
              this.centerDialogVisible = false;
              this.tableData = [];
              if (this.radio == "最新") {
                this.querySubjectGroupByFlag2();
              } else if (this.radio == "最热") {
                this.querySubjectGroupByFlag1();
              } else if (this.radio == "我的") {
                this.querySubjectGroupByTeacher();
              }
            } else {
              loadingObj.close();
              this.$message({
                showClose: true,
                message: response.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryClassHomework(); //当前
    },

    //查询加入的班级
    queryJoinClass() {
      this.$post("/likework/queryJoinClass.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          if (response.data != "") {
            this.joinClass = response.data;
            this.showing = false;
          } else {
            this.showing = true;
          }
        } else {
          this.showing = true;
        }
      });
    },
    //选择学科圈
    changeCircle() {
      if (this.radio == "最新") {
        this.showa = true;
        this.showsa = false;
        this.querySubjectGroupByFlag2();
      } else if (this.radio == "最热") {
        this.showa = true;
        this.showsa = false;
        this.querySubjectGroupByFlag1();
      } else if (this.radio == "我的") {
        this.showa = false;
        this.showsa = true;
        this.querySubjectGroupByTeacher();
      }
    },
    querySubjectGroupByFlag1() {
      let data = [];
      this.tableData = [];
      this.$post("/likework/queryStudentGroupByFlag.do", {
        flag: 1,
        indexNo: this.pageNum,
        rows: 10,
        keyword: this.keyword
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          for (let i = 0; i < response.data.rows.length; i++) {
            let obj = {};
            obj.groupName = response.data.rows[i].groupName;
            obj.createTime = response.data.rows[i].createTime;
            obj.view = response.data.rows[i].view;
            obj.id = response.data.rows[i].id;
            obj.joinState = response.data.rows[i].joinState;
            obj.num = [i];
            // obj.address = res.data[i].address
            data[i] = obj;
            this.tableData = data;
          }
          this.total = response.data.pageCount;
        }
      });
    },
    querySubjectGroupByFlag2() {
      let data = [];
      this.tableData = [];
      this.$post("/likework/queryStudentGroupByFlag.do", {
        flag: 2,
        indexNo: this.pageNum,
        rows: 10,
        keyword: this.keyword
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          for (let i = 0; i < response.data.rows.length; i++) {
            let obj = {};
            obj.groupName = response.data.rows[i].groupName;
            obj.createTime = response.data.rows[i].createTime;
            obj.view = response.data.rows[i].view;
            obj.id = response.data.rows[i].id;
            obj.joinState = response.data.rows[i].joinState;
            obj.num = [i];
            // obj.address = res.data[i].address
            data[i] = obj;
            this.tableData = data;
          }
          this.total = response.data.pageCount;
        }
      });
    },
    querySubjectGroupByTeacher() {
      let data = [];
      this.tableData = [];
      this.$post("/likework/queryStudentGroupByStudent.do", {
        indexNo: this.pageNum,
        rows: 10,
        keyword: this.keyword
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          for (let i = 0; i < response.data.rows.length; i++) {
            let obj = {};
            obj.groupName = response.data.rows[i].groupName;
            obj.createTime = response.data.rows[i].createTime;
            obj.view = response.data.rows[i].view;
            obj.id = response.data.rows[i].id;
            obj.joinState = response.data.rows[i].joinState;
            obj.num = [i];
            // obj.address = res.data[i].address
            data[i] = obj;
            this.tableData = data;
          }
          this.total = response.data.pageCount;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            lock: true,
            text: "提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".submit-test-dialog")
          });
          this.$post("/likework/joinClassByCode.do", {
            code: this.ruleForm.name
          }).then(response => {
            //console.log(response)
            if (response.code == "5000") {
              loadingObj.close();
              this.$message({
                showClose: true,
                message: "加入成功",
                type: "success"
              });
              this.queryJoinClass();
            } else {
              loadingObj.close();
              this.$message({
                showClose: true,
                message: response.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.classList {
  margin-top: 20px;
  padding: 32px 0 20px 0;

  .model_title {
    text-align: center;

    .tit {
      position: relative;
      padding: 0 10px;
      display: inline-block;
      box-sizing: border-box;
      color: #159484;
      .icon_l {
        position: absolute;
        width: 60px;
        height: 1px;
        left: -60px;
        top: 14px;
        background: #159484;
        display: inline-block;
      }

      .icon_r {
        position: absolute;
        width: 60px;
        height: 1px;
        right: -60px;
        top: 14px;
        background: #159484;
        display: inline-block;
      }
    }
  }

  .search {
    text-align: right;
    margin: 20px 0 40px 0;
  }

  .class-con {
    padding: 0 14px;
    cursor: pointer;
    .roes {
      margin-bottom: 32px;
      .tit {
        margin-bottom: 20px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .content {
        margin-bottom: 20px;
        .con {
          background: #eff3f5;
          border-radius: 4px;
          box-sizing: border-box;
          padding: 16px 12px 12px 12px;
          .header {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .studyResource {
    .radios {
      margin: 30px 0 40px 0;
    }
    .studentsCon {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>