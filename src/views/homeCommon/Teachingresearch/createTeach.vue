<template>
  <div>
    <el-dialog title="创建教研组" :visible.sync="dia" width="450px" :before-close="closeFun">
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="$parent.dia = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm2')">确定</el-button>
      </span>
      <div class="createClassa bf bx">
        <div class="con">
          <el-form
            :model="ruleForm2"
            status-icon
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="教研组名称" prop="name" class="pas_icon inp">
              <el-input v-model.number="ruleForm2.name" style="width:200px" placeholder="请输入教研组名称"></el-input>
            </el-form-item>

            <el-form-item label="学段" prop="gradeIds" class="sec">
              <el-select
                v-model="ruleForm2.gradeIds"
                style="width:200px"
                placeholder="请选择学段"
                @change="getTypeid"
                value-key="gradeId"
              >
                <el-option
                  v-for="item in optionss"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="科目" prop="subjectId" class="sec">
              <el-select
                v-model="ruleForm2.subjectId"
                placeholder="请选择科目"
                style="width:200px"
                @change="getSubjectId"
              >
                <el-option
                  v-for="(item, i) in andSubjectList"
                  :key="item.id"
                  :label="item.subjectName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item>
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
  props: ["dia"],
  name: "createTeach",
  data() {
    return {
      checked: true,
      createClass: [],
      andSubjectList: [],
      ruleForm2: {
        name: "",
        subjectId: "",
        gradeIds: ""
      },
      rules2: {
        name: [
          {
            required: true,
            message: "请输入教研组名称,如：高二（3）班",
            trigger: "blur"
          },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        gradeIds: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        subjectId: [
          { required: true, message: "请选择科目", trigger: "change" }
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
      periodId: "", //学段
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
      //  console.log(value, 1111);
      this.type = value;
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
        type: this.periodId,
        subjectId: this.subjectId,
        userId: sessionStorage.getItem("userId"),
        name: this.ruleForm2.name
      };
      const loadingObj = this.$loading({
        lock: true,
        text: "提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$post("/user/research/add", data).then(response => {
        if (response.code == "5000") {
          loadingObj.close();
          this.$message({
            showClose: true,
            message: "创建教研成功",
            type: "success"
          });
          this.$parent.getTeachingResearch();
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
