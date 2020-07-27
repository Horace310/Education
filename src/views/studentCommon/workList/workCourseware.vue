<template>

        <div class="uploadCourseware">
<!--          <Grade @subjectId="subjectIds"></Grade>-->
          <div class="cons">
<!--            <el-row :gutter="20">-->
<!--              <el-col :span="6">-->
<!--                <div class="grid-content ">-->
<!--                  <Subject @workId="workId" @textbook="textbook"></Subject>-->
<!--                </div>-->
<!--              </el-col>-->
<!--              <el-col :span="18">-->
                <div class="published workCore bf bx">
                  <div class="sec-con   flexbox flexrow">
                    <div class="sec">
                      <span class="name ft16">选择班级：</span>
                      <el-select v-model="value4" clearable placeholder="请选择班级" @change="queryStudentClassHomework">
                        <el-option
                          v-for="item in createClass"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="sec">
                      <span class="name ft16">关键字：</span><el-input @blur.prevent="keyhomework" placeholder="请输入关键词搜索" v-model="keyword" clearable></el-input>
                    </div>
                    <div class="sec">
                      <el-button @click="keyhomework" type="primary">查询</el-button>
                    </div>
                  </div>
                  <div class="courseCon bf">

                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        align="center"
                        label="课件名称"
                        prop="coursewareName"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="人气"
                        prop="view"
                        width="300">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="上传时间"
                        prop="createTime"
                        width="200">
                      </el-table-column>
                      <el-table-column  align="center" label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            class="scan"
                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="paginationed">
                      <Gagination :total="total" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun"
                                  @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
                    </div>


<!--                    <noData v-if="showimg"></noData>           -->
                  </div>
                </div>
<!--              </el-col>-->
<!--            </el-row>-->
          </div>
        </div>


</template>

<script>
  import Grade from '../../../components/grade/grade';
  import Subject from '../../../components/grade/subject'
  import Gagination from '../../../components/pagination/pagination'
  export default {
    name: "",
    data(){
      return{
        keyword:'',
        value4:'',
        createClass: [],
        date1:'',
        hwlist:[],
        pageSize:1,
        pageNum:1,
        total:0,
        timeSelect:[],
        tableData: []
      }
    },
    components:{
      Gagination,
      Grade,
      Subject
    },
    created() {
      this.queryCreateClass();
      this.queryStudentClassHomework()
    },
    methods:{
      keyhomework(){
        this.pageNum =1 ;
        this.queryStudentClassHomework();
      },
      //学段学科
      subjectIds(e){
        this.subjectId = e.id;
        this.queryStudentClassHomework();
      },
      workId(e) {
        // console.log(e);
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId;
        this.chapterName = e.name1;
        this.barName = e.name2;
        this.contentName = e.name3;
        this.queryStudentClassHomework();
      },
      textbook(e) {
        // console.log(e)
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id;
        this.book = e.book;
        this.gradename = e.gradename;
        this.queryStudentClassHomework();
      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.queryStudentClassHomework(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.queryStudentClassHomework(); //当前
      },
      //选择班级
      queryCreateClass(){
        this.$post('/likework/queryJoinClassSelect.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.createClass = response.data;
              // this.value4 = response.data[0].id
            }
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$store.commit('getVideo',{VideoUrl:row.url,VideoName:row.coursewareName})
        this.$router.push({path:'/studentCommon/checkVideo',query:{path:this.$route.path,name:this.$route.name,key:1}})
      },
      //查询作业
      queryStudentClassHomework(){
        let data = [];
        this.tableData = [];
        this.$post('/likework/queryCoursewareByStudent.do',{
          keyword:this.keyword,
          classId:this.value4,//班级id
          rows:10,
          indexNo:this.pageNum,
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            for (let i = 0; i < response.data.rows.length; i++) {
              let obj = {};
              obj.coursewareName = response.data.rows[i].coursewareName;
              obj.view = response.data.rows[i].view;
              obj.createTime = response.data.rows[i].createTime;
              obj.id = response.data.rows[i].id;
              obj.url = response.data.rows[i].url;
              obj.num = [i];
              // obj.address = res.data[i].address
              data[i] = obj;
              this.tableData = data
            }
            this.total = response.data.pageCount
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .published{
    height: 711px;
    padding: 20px 30px 0 30px;
    position: relative;
    .sec-con{
      margin-bottom: 30px;
          .sec{
            margin-right: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .name{
              width: 90px;
            }
          }
    }
    .con{
      margin-top: 20px;
    }
  }
  .cons{margin-top: 20px;}
</style>
<style>
  .workCore .courseCon .el-table td, .el-table th.is-leaf{border-bottom: none}
  .workCore .courseCon .el-table--border::after, .academicCircle .courseCon .el-table--group::after, .academicCircle .courseCon .el-table::before {
    content: '';
    position: absolute;
    background-color: #ffffff;
    z-index: 1;
  }
  .workCore .courseCon  .el-table .has-gutter th>.cell{font-size: 16px;color: #333333}
  .workCore .courseCon  .el-table .el-table__body tr .el-table_5_column_16  .cell{color: #39a5ff;}
  .workCore .courseCon  .el-table .el-table__body tr .el-table_1_column_2  .cell{color: #666666;}
  .workCore .courseCon .scan{background: #2592e7;border-color: #2592e7;color: #ffffff;}
  .workCore .courseCon  .el-button--danger{background: #ff8a00;border-color: #ff8a00;}
  .workCore .el-table--border::after, .workCore .el-table--group::after, .workCore .el-table::before{
    background-color: #ffffff;
  }
</style>
