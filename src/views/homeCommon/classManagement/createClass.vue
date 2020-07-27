<template>
  <div class>
    <!-- <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon/classManagement' }">班级管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建班级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <el-dialog title="创建班级" :visible.sync="dia" width="450px" :before-close="closeFun">
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="$parent.dia = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm2')">确定</el-button>
      </span>
      <div class="createClassa bf bx">
        <!-- <p class="tit ft20">创建班级</p> -->
        <div class="con">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="班级名称" prop="name" class="pas_icon inp">
              <el-input v-model.number="ruleForm2.name" style="width:215px" placeholder="请输入班级名称"></el-input>
            </el-form-item>

            <el-form-item label="学段" prop="gradeIds" class="sec">
              <el-select
                v-model="ruleForm2.gradeIds"
                placeholder="请选择学段"
                @change="getTypeid"
                value-key="gradeId"
                style="width:215px"
              >
                <el-option
                  v-for="item in optionss"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="科目" prop="subjectId" class="sec">
              <el-select v-model="ruleForm2.subjectId" placeholder="请选择科目" @change="getSubjectId">
                <el-option
                  v-for="(item, i) in andSubjectList"
                  :key="item.id"
                  :label="item.subjectName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="年级" prop="gradeName" class="sec">
              <el-select style="width:215px" v-model="ruleForm2.gradeName" placeholder="请选择年级">
                <el-option
                  v-for="(item,index) in nianjiList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="$parent.dia = false">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
            </el-form-item>-->
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "createClass",
  props: ["dia"],
  data() {
    return {
      checked: true,
      createClass: [],
      andSubjectList: [],
      nianjiList: [
        { name: "一年级上" },
        { name: "一年级下" },
        { name: "二年级上" },
        { name: "二年级下" },
        { name: "三年级上" },
        { name: "三年级下" },
        { name: "四年级上" },
        { name: "四年级下" },
        { name: "五年级上" },
        { name: "五年级下" },
        { name: "六年级上" },
        { name: "六年级下" },
        { name: "七年级上" },
        { name: "七年级下" },
        { name: "八年级上" },
        { name: "八年级下" },
        { name: "九年级上" },
        { name: "九年级下" },
        { name: "高一级上" },
        { name: "高一级下" },
        { name: "高二级上" },
        { name: "高二级下" },
        { name: "高三级上" },
        { name: "高三级下" }
      ],
      ruleForm2: {
        name: "",
        subjectId: "",
        gradeIds: "",
        gradeName: ""
      },
      rules2: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入班级名称"
          }
        ],
        gradeName: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
      gradeId: "",
      activeIndex: "",
      //学段
      optionss: [
        { id: 1, name: "小学" },
        { id: 2, name: "初中" },
        { id: 3, name: "高中" }
      ],
      periodId: "",
      subjectId: ""
    };
  },
  created() {
    this.queryGradeAndSubjectList(); //获取年级学科下拉列表
  },
  methods: {
    closeFun() {
      this.$parent.dia = false;
    },
    //获取学段id
    getTypeid(value) {
      this.periodId = value;
      this.getSubject(value);
    },
    //获取学科Id
    getSubjectId(value) {
      this.subjectId = value;
    },
    //选择学段
    getSubject(value) {
      this.$get("/system/subject", { type: value }).then(res => {
        this.andSubjectList = res.data;
      });
    },
    //选择班级
    currentSel(selVal) {
      this.gradeId = selVal.gradeId;
      this.andSubjectList = selVal.list;
      //    console.log(selVal,"55");
    },
    //获取年级学科下拉列表
    queryGradeAndSubjectList() {
      this.$post("/likework/queryGradeAndSubjectList.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.createClass = response.data;
        }
      });
    },
    //创建
    submitForm(formName) {
      let data = {
        grade: this.periodId,
        subjectId: 0,
        userId: sessionStorage.getItem("userId"),
        name: this.ruleForm2.name,
        gradeName: this.ruleForm2.gradeName
      };
      if (!this.ruleForm2.name) {
        this.$message.error("请输入班级名称");
        return false;
      }
      if (!this.ruleForm2.gradeName) {
        this.$message.error("请选择年级");
        return false;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$post("/user/classes/add", data).then(response => {
        if (response.code == "5000") {
          loadingObj.close();
          this.$message({
            showClose: true,
            message: "创建班级成功",
            type: "success"
          });
          this.$parent.getclassList();
          this.$parent.dia = false;
        } else {
          loadingObj.close();
          this.$message({
            showClose: true,
            message: response.message,
            type: "error"
          });
        }
      });
    }
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       const loadingObj = this.$loading({
    //         lock: true,
    //         text: "提交中...",
    //         spinner: "el-icon-loading",
    //         background: "rgba(0, 0, 0, 0.7)",
    //         target: document.querySelector(".submit-test-dialog")
    //       });
    //       this.$Post("/user/class", {
    //         grade: this.periodId,
    //         subject: this.subjectId,
    //         userId: sessionStorage.getItem("userId"),
    //         name: this.ruleForm2.name
    //       }).then(response => {
    //         if (response.code == "5000") {
    //           loadingObj.close();
    //           this.$message({
    //             showClose: true,
    //             message: "创建班级成功",
    //             type: "success"
    //           });
    //           setTimeout(() => {
    //             this.$router.push({
    //               path: "/homeCommon/classManagement/invitationCode",
    //               query: { id: response.data }
    //             });
    //           }, 1000);
    //         } else {
    //           loadingObj.close();
    //           this.$message({
    //             showClose: true,
    //             message: response.message,
    //             type: "error"
    //           });
    //         }
    //       });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
.createClassa {
  .tit {
    position: relative;
    padding-left: 18px;
    &::before {
      position: absolute;
      content: "";
      display: inline-block;
      left: 0;
      border-left: 4px solid #ff8a00;
      height: 25px;
      border-radius: 5px;
      top: 2px;
    }
  }
}
.nav {
  margin: 20px 0;
}
</style>
<style>
.createClassa .con .inp .el-input,
.createClassa .con .sec .el-select {
  width: 40%;
}
</style>
