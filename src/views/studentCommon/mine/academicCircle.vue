<template>
  <div class="academicCircle bf  bx mt20">
    <div class="sec flexbox flexcenter">
      <div class="flex" style="margin-top: 20px">
        <el-radio-group @change="studyCircle" size="medium" v-model="radio4">
          <el-radio-button label="我的学科圈" ></el-radio-button>
          <el-radio-button label="热门学科圈"></el-radio-button>
          <el-radio-button label="最新学科圈"></el-radio-button>
        </el-radio-group>
      </div>
      <div><el-button @click="centerDialogVisible = true" size="medium" type="primary">创建学科圈</el-button></div>
    </div>
    <div class="courseCon bf posr">

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          label="学科圈名称"
          prop="groupName"
          width="300">
        </el-table-column>
        <el-table-column
          align="center"
          label="上传时间"
          prop="createTime"
          width="400">
        </el-table-column>
        <el-table-column
          align="center"
          label="人气"
          prop="view"
          width="200">
        </el-table-column>
        <el-table-column  align="center" label="操作">
          <template slot-scope="scope" >
            <div v-if="scope.row.joinState==4">
            <el-button
              @click="findTeacherByCondition(scope)"
              class="scan"
              type="primary"
              size="mini"
              v-if="show">添加成员</el-button>
            </div>
            <div v-if="scope.row.joinState==1"><el-button type="info" v-if="show" class="" size="mini" >已经通过</el-button></div>
            <div v-if="scope.row.joinState==1"><el-button type="success" v-if="show" class="" size="mini" @click="applyJoinSubjectGroup(scope)">申请加入</el-button></div>
            <div v-if="scope.row.joinState==0"><el-button type="warning" v-if="show" class="" size="mini">正在审核</el-button></div>
            <div v-if="scope.row.joinState==2"><el-button type="danger" v-if="show" class="" size="mini">已经拒绝</el-button></div>
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              class="scan"
              size="mini"
              v-if="shows">查看</el-button>
            <el-button
              @click="handleDelete(scope)"
              size="mini"
              type="danger"
              v-if="shows">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="paginationed">
                          <el-pagination
                      @size-change="handleSizeChangeFun"
                      @current-change="handleCurrentChangeFun"
                      :current-page="pageNum"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      :layout='layout'
                      :total="total"
                    >
                    </el-pagination>
    </div>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      :before-close="closeDialog"
      title="创建学科圈"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="" ref="ruleForm">
        <el-form-item label="" prop="name">
          <el-input clearable placeholder="请填写学科圈名"  v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
        <span class="dialog-footer tc" >
          <el-button @click="callOf('ruleForm')">取 消</el-button>
          <el-button @click="submitForm('ruleForm')" type="primary">确 定</el-button>
        </span>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog
      title="申请加入"
      :visible.sync="dialogVisible"
      :before-close="closeDialoga"
      width="30%"
      class="academicCircleapply"
      >
      <el-form :model="ruleForms" :rules="ruless" class="demo-ruleForm" label-width="100px" ref="ruleForms">
        <el-form-item label="添加成员：" prop="name">
          <el-input clearable placeholder="请输入身份ID/用户名/手机号查找"  v-model="ruleForms.name"></el-input>
          <el-button @click="submitForms('ruleForms')" type="primary">查 找</el-button>
        </el-form-item>
        <div class="applyPeople" @click="applyPeople(teacherByCondition.id)" :class="{col39a:studentIdList==teacherByCondition.id}" v-if="showsd">
          <img :src="teacherByCondition.icon" alt="" class="img">
          <p class="name" >{{teacherByCondition.username}}</p>
        </div>
        <el-form-item>
        <span class="dialog-footer tc" >
          <el-button @click="callOfa('ruleForms')">取 消</el-button>
          <el-button @click="submitForma('ruleForms')" type="primary">确 定</el-button>
        </span>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import Gagination from '../../../components/pagination/pagination'
  export default {
    name: "academicCircle",
    components:{
      Gagination
    },
    data(){
      return{
        studentIdList:'',
        dialogVisible:false,
        ruleForm: {
          name: ''
        },
        ruleForms: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写学科圈名', trigger: 'blur'},
          ]
        },
        ruless: {
          name: [
            {required: true, message: '请输入身份ID/用户名/手机号查找', trigger: 'blur'},
          ]
        },
        centerDialogVisible: false,
        radio4: '我的学科圈',
        tableData: [],
        pageSize:10,
        pageNum:1,
        total:0,
        layout:"total,prev, pager, next, jumper",
        currentPage:2,
        show:true,
        shows:true,
        teacherByCondition:[],
        subjectGroupId:"",
        showsd:false
      }
    },
    created() {
      //最热
      this.show = false;
      this.querySubjectGroupByTeacher()
      this.$store.state.resnav="4"; //头部导航
      this.$store.state.cirnav="我的学科圈"; //头部导航
    },
    methods: {
      //选中成员
      applyPeople(id){
        if(this.studentIdList!=id){
          this.studentIdList = id;
        }else{
          this.studentIdList = '';
        }
      },
      //添加成员弹框
      findTeacherByCondition(row){
        // console.log(row);
        this.dialogVisible = true;
        this.subjectGroupId = row.row.id
      },
      //添加成员
      submitForma(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.studentIdList==""){
              this.$message({
                showClose: true,
                message:'请添加成员',
                type: 'error'
              });
              return false;
            }
            const loadingObj = this.$loading({
              lock: true,
              text: '提交中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              target: document.querySelector('.submit-test-dialog')
            });
            this.$post('/likework/inviteSubjectGroup.do',{
              subjectGroupId:this.subjectGroupId,//学科圈id
              studentIdList:this.studentIdList//教师id
            })
              .then((response) => {
                //console.log(response)
                if (response.code == "5000") {
                  loadingObj.close()
                  this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                  });
                  this.teacherByCondition=[];
                  this.studentIdList='';
                  this.$refs["ruleForms"].resetFields();
                  this.dialogVisible=false;
                  this.showsd=false
                  this.tableData = [];
                  if(this.radio4 == '最新学科圈'){
                    this.querySubjectGroupByFlag2()
                  }else if(this.radio4 == '热门学科圈'){
                    this.querySubjectGroupByFlag1()
                  }else if(this.radio4 == '我的学科圈'){
                    this.querySubjectGroupByTeacher()
                  }
                }else{
                  loadingObj.close();
                  this.$refs["ruleForms"].resetFields();
                  this.dialogVisible=false;
                  this.teacherByCondition=[];
                  this.studentIdList='';
                  this.showsd=false
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
      },
      //申请加入
      applyJoinSubjectGroup(row){
        this.$post('/likework/applyJoinSubjectGroup.do',{
          subjectGroupId:row.row.id
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.$message({
                showClose: true,
                message: '加入成功',
                type: 'success'
              });
              this.tableData = [];
              if(this.radio4 == '最新学科圈'){
                this.querySubjectGroupByFlag2()
              }else if(this.radio4 == '热门学科圈'){
                this.querySubjectGroupByFlag1()
              }else if(this.radio4 == '我的学科圈'){
                this.querySubjectGroupByTeacher()
              }
            }else{
              this.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          })
      },
      //删除
      handleDelete( row) {
        // console.log( row);
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
        this.$post('/likework/deleteSubjectGroupById.do',
          {
            subjectGroupId: row.row.id
          }
        ).then((response) => {
          // console.log(response)
          if (response.code == "5000") {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.tableData = [];
            if(this.radio4 == '最新学科圈'){
              this.querySubjectGroupByFlag2()
            }else if(this.radio4 == '热门学科圈'){
              this.querySubjectGroupByFlag1()
            }else if(this.radio4 == '我的学科圈'){
              this.querySubjectGroupByTeacher()
            }
          } else {
            this.$message({
              showClose: true,
              message: response.message,
              type: 'error'
            });
          }

        })
        }).catch(() => {

        });
      },
      //取消
      callOf(formName){
        this.centerDialogVisible = false;
        this.$refs[formName].resetFields();
      },
      callOfa(formName){
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
        this.teacherByCondition=[];
        this.studentIdList='';
        this.showsd=false
      },
      //弹窗关闭
      closeDialog(){
        this.centerDialogVisible = false;
        this.$refs["ruleForm"].resetFields();
      },
      closeDialoga(){
        this.dialogVisible = false;
        this.$refs["ruleForms"].resetFields();
        this.teacherByCondition=[];
        this.studentIdList='';
        this.showsd=false
      },
      //查找成员
      submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loadingObj = this.$loading({
              lock: true,
              text: '提交中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              target: document.querySelector('.submit-test-dialog')
            });
            this.$post('/likework/findTeacherByCondition.do',{
              mobile:this.ruleForms.name
            })
              .then((response) => {
                //console.log(response)
                if (response.code == "5000") {
                  loadingObj.close()

                  if(response.data==""){
                    this.showsd = false
                  }else{
                    this.teacherByCondition = response.data;
                    this.showsd = true
                  }
                }else{
                  loadingObj.close()
                  this.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                  this.showsd = false
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //创建学科圈
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
            this.$post('/likework/createSubjectGroup.do',{
              groupName:this.ruleForm.name
            })
              .then((response) => {
                //console.log(response)
                if (response.code == "5000") {
                  loadingObj.close()
                  this.$message({
                    showClose: true,
                    message: '创建成功',
                    type: 'success'
                  });
                  this.$refs["ruleForm"].resetFields();
                  this.centerDialogVisible=false;
                  this.tableData = [];
                  if(this.radio4 == '最新学科圈'){
                    this.querySubjectGroupByFlag2()
                  }else if(this.radio4 == '热门学科圈'){
                    this.querySubjectGroupByFlag1()
                  }else if(this.radio4 == '我的学科圈'){
                    this.querySubjectGroupByTeacher()
                  }
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
      },
      handleSizeChangeFun(v) {
        console.log(v);
        this.pageSize = v;
        if(this.radio4 == '最新学科圈'){
          this.querySubjectGroupByFlag2()
        }else if(this.radio4 == '热门学科圈'){
          this.querySubjectGroupByFlag1()
        }else if(this.radio4 == '我的学科圈'){
          this.querySubjectGroupByTeacher()
        }
      },
      handleCurrentChangeFun(v) { //页面点击
        console.log(v);
        // console.log(this.radio4)
        this.pageNum = v; //当前页

        if(this.radio4 == '最新学科圈'){
          this.querySubjectGroupByFlag2()
        }else if(this.radio4 == '热门学科圈'){
          this.querySubjectGroupByFlag1()
        }else if(this.radio4 == '我的学科圈'){
          this.querySubjectGroupByTeacher()
        }
      },
      studyCircle(){
        // console.log(this.radio4);
        if(this.radio4 == '最新学科圈'){
          this.show = true;
          this.shows = false;
          this.pageNum = 1;
          this.currentPage = 1;
          this.querySubjectGroupByFlag2()
        }else if(this.radio4 == '热门学科圈'){
          this.show = true;
          this.shows = false;
          this.pageNum = 1;
          this.currentPage = 1;
          this.querySubjectGroupByFlag1()
        }else if(this.radio4 == '我的学科圈'){
          this.show = false;
          this.shows = true;
          this.pageNum = 1;
          this.currentPage = 1;          
          this.querySubjectGroupByTeacher()
        }
        this.$store.state.cirnav=this.radio4;
      },
      getNavType(){
        this.radio4=this.$store.state.cirnav;
        //store.state.adminleftnavnum里值变化的时候，设置navselected
      },
      querySubjectGroupByFlag1(){
        let data= [];
        this.tableData = [];
        this.$post('/likework/querySubjectGroupByFlag.do',{
          flag:1,
          indexNo:this.pageNum,
          rows:10
        }).then((response) => {
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
              this.tableData = data
            };
            this.count = response.data.count
            this.total = response.data.count
          }
        })
      },
      querySubjectGroupByFlag2(){
        let data= [];
        this.tableData = [];
        this.$post('/likework/querySubjectGroupByFlag.do',{
          flag:2,
          indexNo:this.pageNum,
          rows:10
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            for (let i = 0; i < response.data.rows.length; i++) {
              let obj = {};
              obj.groupName = response.data.rows[i].groupName;
              obj.createTime = response.data.rows[i].createTime;
              obj.view = response.data.rows[i].view;
              obj.joinState = response.data.rows[i].joinState;
              obj.id = response.data.rows[i].id;
              obj.num = [i];
              // obj.address = res.data[i].address
              data[i] = obj;
              this.tableData = data
            }
            this.total = response.data.count
          }
        })
      },
      querySubjectGroupByTeacher(){
        let data= [];
        this.tableData = [];
        this.$post('/likework/querySubjectGroupByTeacher.do',{
          indexNo:this.pageNum,
          rows:10
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            for (let i = 0; i < response.data.rows.length; i++) {
              let obj = {};
              obj.groupName = response.data.rows[i].groupName;
              obj.createTime = response.data.rows[i].createTime;
              obj.view = response.data.rows[i].view;
              obj.joinState = response.data.rows[i].joinState;
              obj.id = response.data.rows[i].id;
              obj.num = [i];
              // obj.address = res.data[i].address
              data[i] = obj;
              this.tableData = data
            }
            this.total = response.data.count
          }
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
    },
    watch: {
      // 监测store.state
      '$store.state.cirnav': 'getNavType'
    }
  }
</script>

<style lang="less" scoped>
  .academicCircle{
    padding: 40px 30px 0 30px;
    /*height: 710px;*/
    .courseCon{
      padding: 40px 0;
      height: 660px;
    }
  }
  .academicCircle .academicCircleapply  .applyPeople{text-align: center;margin-top: 30px;cursor: pointer;}
  .academicCircle .academicCircleapply  .applyPeople .img{width: 102px;height: 102px;border-radius: 50%;margin: 0 auto;display: block;}
  .academicCircle .academicCircleapply  .applyPeople .name{font-size: 18px;margin: 10px 0 30px 0;}
</style>
<style>
  .academicCircle .courseCon .el-table td, .el-table th.is-leaf{border-bottom: none}
  .academicCircle .courseCon .el-table--border::after, .academicCircle .courseCon .el-table--group::after, .academicCircle .courseCon .el-table::before {
    content: '';
    position: absolute;
    background-color: #ffffff;
    z-index: 1;
  }
  .academicCircle .courseCon  .el-table .has-gutter th>.cell{font-size: 16px;color: #333333}
  .academicCircle .courseCon  .el-table .el-table__body tr .el-table_1_column_1  .cell{color: #39a5ff;}
  .academicCircle .courseCon  .el-table .el-table__body tr .el-table_1_column_2  .cell{color: #666666;}
  .academicCircle .courseCon .scan{background: #2592e7;border-color: #2592e7;color: #ffffff;}
  .academicCircle .courseCon  .el-button--danger{background: #ff8a00;border-color: #ff8a00;}
  .academicCircle .academicCircleapply .el-input{width: 70%;}
</style>
