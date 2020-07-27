<template>
    <div class="researchResult bf  bx mt20 posr">
      <div class="sec flexbox flexcenter">
        <div style="margin-top: 20px" class="flex">
          <el-radio-group v-model="radio4" size="medium" @change="queryResearcherByFlag">
            <el-radio-button label="我的成果" ></el-radio-button>
            <el-radio-button label="热门成果"></el-radio-button>
            <el-radio-button label="最新成果"></el-radio-button>
          </el-radio-group>
        </div>
        <div><el-button type="primary" size="medium" @click="publish">发表成果</el-button></div>
      </div>
      <div class="courseCon bf ">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="成果名称"
            align="center"
            prop="researcherName"
            width="300">
          </el-table-column>
          <el-table-column
            label="上传时间"
            prop="createTime"
            align="center"
            width="400">
          </el-table-column>
          <el-table-column
            label="人气"
            prop="view"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column  align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="scan"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="shows"
                @click="handleDelete(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationed">
          <Gagination :total="total"  :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun" @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
        </div>


        <el-dialog
          :visible.sync="centerDialogVisible"
          :before-close="closeDialog"
          :title="dialogTitle"
          width="30%">
          <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="ruleForm">
            <el-form-item label="成果名称" prop="name">
              <el-input clearable placeholder="请输入作业成果的名称" :readonly="check" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="成果内容" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" :readonly="check" resize="none" placeholder="请输入您要填写的内容"></el-input>
            </el-form-item>
            <el-form-item>
        <span class="dialog-footer tc" >
          <el-button @click="callOf('ruleForm')">取 消</el-button>
          <el-button @click="submitForm('ruleForm')" type="primary">确 定</el-button>
        </span>
            </el-form-item>
          </el-form>
        </el-dialog>


      </div>
    </div>
</template>

<script>
  import Gagination from '../../../components/pagination/pagination'
    export default {
      name: "researchResult",
      components:{
        Gagination
      },
      data(){
          return{
            centerDialogVisible: false,
            radio4: '我的成果',
            tableData: [],
            shows:false,
            pageSize:10,
            pageNum:1,
            total:0,
            check:false,
            ruleForm: {
              name: '',
              desc: ''
            },
            dialogTitle:'发表研究成果',
            rules: {
              name: [
                {required: true, message: '请填写成果名称', trigger: 'blur'},
              ],
              desc: [
                { required: true, message: '请输入您要填写的内容', trigger: 'blur' }
              ]
            },
          }
      },
      created(){
          this.queryResearcherByTeacher()//查询我的研究成果
        this.shows = true;
          this.$store.state.resnav="3"; //头部导航
        this.$store.state.cgnav="我的成果"; //头部导航

      },
      methods: {
        // 发表成功
        publish(e){
          this.centerDialogVisible = !this.centerDialogVisible;
          this.check = false;
          this.ruleForm.name = '';
          this.ruleForm.desc = '';
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.check){
                this.centerDialogVisible = !this.centerDialogVisible;
                return false;
              }
              const loadingObj = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                target: document.querySelector('.submit-test-dialog')
              });
              this.$post('/likework/createResearcher.do',{
                researcherName:this.ruleForm.name,
                content:this.ruleForm.desc,
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
                    if(this.radio4=="热门成果"){
                      this.shows = false;
                      this.queryResearcherByTeacherss()
                    }else if(this.radio4=="最新成果"){
                      this.shows = false;
                      this.queryResearcherByTeachers()
                    }else if(this.radio4=="我的成果"){
                      this.shows = true;
                      this.queryResearcherByTeacher()
                    } //当前
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
        //取消
        callOf(formName){
          this.centerDialogVisible = false;
          this.$refs[formName].resetFields();
        },
        //弹窗关闭
        closeDialog(){
          this.centerDialogVisible = false;
          this.$refs["ruleForm"].resetFields();
        },
        handleSizeChangeFun(v) {
          this.pageSize = v;
          if(this.radio4=="热门成果"){
            this.shows = false;
            this.queryResearcherByTeacherss()
          }else if(this.radio4=="最新成果"){
            this.shows = false;
            this.queryResearcherByTeachers()
          }else if(this.radio4=="我的成果"){
            this.shows = true;
            this.queryResearcherByTeacher()
          } //每页条数
        },
        handleCurrentChangeFun(v) { //页面点击
          this.pageNum = v; //当前页
          if(this.radio4=="热门成果"){
            this.shows = false;
            this.queryResearcherByTeacherss()
          }else if(this.radio4=="最新成果"){
            this.shows = false;
            this.queryResearcherByTeachers()
          }else if(this.radio4=="我的成果"){
            this.shows = true;
            this.queryResearcherByTeacher()
          } //当前
        },
          //查询我的研究成果
        queryResearcherByTeacher(){
          let data = [];
          this.$post('/likework/queryResearcherByTeacher.do')
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                // this.count = response.data.pageCount;
                for (let i = 0; i < response.data.rows.length; i++) {
                  let obj = {};
                  obj.researcherName = response.data.rows[i].researcherName
                  obj.createTime = response.data.rows[i].createTime
                  obj.view = response.data.rows[i].view
                  obj.id = response.data.rows[i].id
                  obj.num = [i];
                  // obj.address = res.data[i].address
                  data[i] = obj;
                  this.tableData = data
                }
                this.total = response.data.count
              }
            })
        },
        //查询热门/最新
        queryResearcherByFlag(){
          // console.log(this.radio4);
          if(this.radio4=="热门成果"){
            this.shows = false;
           this.queryResearcherByTeacherss()
          }else if(this.radio4=="最新成果"){
            this.shows = false;
            this.queryResearcherByTeachers()
          }else if(this.radio4=="我的成果"){
            this.shows = true;
            this.queryResearcherByTeacher()
          }
          this.$store.state.cgnav=this.radio4;
        },
        getNavType(){
          this.radio4=this.$store.state.cgnav;
          //store.state.adminleftnavnum里值变化的时候，设置navselected
        },
        queryResearcherByTeacherss(){
          let data = [];
          this.tableData=[];
          this.$post('/likework/queryResearcherByTeacher.do',{
            flag:1
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                // this.count = response.data.pageCount;
                for (let i = 0; i < response.data.rows.length; i++) {
                  let obj = {};
                  obj.researcherName = response.data.rows[i].researcherName
                  obj.createTime = response.data.rows[i].createTime
                  obj.view = response.data.rows[i].view
                  obj.id = response.data.rows[i].id
                  obj.num = [i];
                  // obj.address = res.data[i].address
                  data[i] = obj;
                  this.tableData = data
                }
                this.total = response.data.count
              }
            })
        },
        queryResearcherByTeachers(){
          let data = [];
          this.tableData=[];
          this.$post('/likework/queryResearcherByTeacher.do',{
            flag:2
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                // this.count = response.data.pageCount;
                for (let i = 0; i < response.data.rows.length; i++) {
                  let obj = {};
                  obj.researcherName = response.data.rows[i].researcherName
                  obj.createTime = response.data.rows[i].createTime
                  obj.view = response.data.rows[i].view
                  obj.id = response.data.rows[i].id
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
          let data={
            researcherId:row.id
          }
          this.$post('/likework/queryResearcherById.do',data).then(res=>{
            if(res.code=="5000"){
              this.check = true;
              this.ruleForm.name = res.data.researcherName;
              this.ruleForm.desc = res.data.content;
              this.dialogTitle = '查看研究成果';
              this.centerDialogVisible = !this.centerDialogVisible;
            }
          })


        },
        handleDelete( row) {
          // console.log(row)
          // console.log( row.row.id);
          this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.$post('/likework/deleteResearcherById.do',{
              researcherId:row.row.id
            })
              .then((response) => {
                if (response.code == "5000") {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.tableData.splice(row.$index,1);
                  if(this.radio4=="热门成果"){
                    this.queryResearcherByTeacherss()
                  }else if(this.radio4=="最新成果"){
                    this.queryResearcherByTeachers()
                  }else if(this.radio4=="我的成果"){

                    this.queryResearcherByTeacher()
                  }
                }else{
                  this.$message({
                      showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              })
          }).catch(() => {

          });
        }
      },
      watch: {
        // 监测store.state
        '$store.state.cgnav': 'getNavType'
      }
    }
</script>

<style scoped lang="less">
  .researchResult{
    padding: 40px 30px;
    height: 710px;
    .courseCon{
      padding: 40px 0;
    }
  }
</style>
<style scoped>
  .researchResult .courseCon .el-table td, .el-table th.is-leaf{border-bottom: none}
  .researchResult .courseCon .el-table--border::after, .researchResult .courseCon .el-table--group::after, .researchResult .courseCon .el-table::before {
    content: '';
    position: absolute;
    background-color: #ffffff;
    z-index: 1;
  }
  .researchResult .courseCon  .el-table .has-gutter th>.cell{font-size: 16px;color: #333333}
  .researchResult .courseCon  .el-table .el-table__body tr .el-table_1_column_1  .cell{color: #39a5ff;}
  .researchResult .courseCon  .el-table .el-table__body tr .el-table_1_column_2  .cell{color: #666666;}
  .researchResult .courseCon .scan{background: #2592e7;border-color: #2592e7;color: #ffffff;}
  .researchResult .courseCon  .el-button--danger{background: #ff8a00;border-color: #ff8a00;}
</style>
