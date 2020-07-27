<template>
    <div class="creatClassed" v-model="centerDialogVisible">
      
      <el-dialog
        :visible.sync="centerDialogVisible"
        :before-close="closeDialog"
        title="创建班级"
        width="40%">
        <div class="con">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">



            <el-form-item label="班级名称" prop="name" class="pas_icon inp">
              <el-input v-model.number="ruleForm2.name" placeholder="请输入班级名称" ></el-input>
            </el-form-item>

            <el-form-item label="班级属性" prop="gradeIds" class="sec">
              <el-select v-model="ruleForm2.gradeIds" placeholder="请选择年级"    @change="currentSel" value-key="gradeId">
                <el-option
                  v-for="items in createClass"
                  :key="items.gradeId"
                  :label="items.gradeName"
                  :value="items">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" prop="subjectId" class="sec">
              <el-select v-model="ruleForm2.subjectId" placeholder="请选择科目">
                <el-option
                  v-for="(item,i) in andSubjectList"
                  :key="item.id"
                  :label="item.subjectName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button @click="callOf('ruleForm2')">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm2')"  >确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "createClass",
    props:{
      centerDialogVisible: {
        type: Boolean,
        default:false
      }
    },
    data() {
      return {
        checked: true,
        createClass:[],
        andSubjectList:[],
        // centerDialogVisible:false,
        ruleForm2: {
          name:'',
          subjectId: '',
          gradeIds:''
        },
        rules2: {
          name: [
            { required: true, message: '请输入班级名称',  trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          gradeIds: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          subjectId: [
            { required: true, message: '请选择科目', trigger: 'change' }
          ],
        },
        gradeId:"",
        activeIndex:""
      };
    },
    created() {
      // console.log(this);
      this.queryGradeAndSubjectList()//获取年级学科下拉列表
    },
    methods: {
      //取消
      callOf(formName){

        this.$emit('callOf',false);
        // this.centerDialogVisible = false;
        this.$refs[formName].resetFields();
      },
      //弹窗关闭
      closeDialog(){
        this.$emit('closeDialog',false);
        // this.centerDialogVisible = false;
        this.$refs["ruleForm2"].resetFields();
      },
      //选择班级
      currentSel(selVal) {
        this.gradeId = selVal.gradeId;
        this.andSubjectList = selVal.list
        // console.log(selVal,"55");
      },
      //获取年级学科下拉列表
      queryGradeAndSubjectList(){
        this.$post('/likework/queryGradeAndSubjectList.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.createClass = response.data
            }
          })
      },
      //创建
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loadingObj = this.$loading({
              lock: true,
              text: '提交中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              target: document.querySelector('.submit-test-dialog')
            });
            this.$post('/likework/createClass.do',{
              subjectId:this.ruleForm2.subjectId,
              gradeId:this.gradeId,
              name:this.ruleForm2.name
            })
              .then((response) => {
                //console.log(response)
                if (response.code == "5000") {
                  loadingObj.close()
                  this.$message({
                    showClose: true,
                    message: '创建班级成功',
                    type: 'success'
                  });
                  // this.centerDialogVisible = false;
                  this.$emit('submitForm',false);
                  // this.$refs["ruleForm2"].resetFields();
                }else{
                  loadingObj.close()
                  this.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
  }
</script>

<style scoped lang="less">
  .creatClassed{
    padding: 40px 30px 100px 30px ;
    margin: 0 auto 200px auto;
    .tit{
      position: relative;
      padding-left: 18px;
      &::before{
        position: absolute;
        content: '';
        display: inline-block;
        left: 0;
        border-left: 4px solid #ff8a00;
        height: 25px;
        border-radius: 5px;
        top: 2px;
      }
    }
    .con{
      /*margin: 50px 0 0 120px;*/
      .inp{

      }
    }
  }
  .nav{
    margin: 20px 0;
  }
</style>
<style>
  .creatClassed .con .inp .el-input,.creatClassed .con .sec .el-select{width: 100%;}
</style>
