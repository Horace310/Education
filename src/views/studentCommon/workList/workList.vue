<template>

  <div class="uploadCoursewareed">
<!--    <Grade @subjectId="subjectIds"></Grade>-->
    <div class="cons">
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <div class="grid-content ">-->
<!--            <Subject @workId="workId" @textbook="textbook"></Subject>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="18">-->

            <div class="published bf bx">
              <div class="sec-con flexbox flexrow">
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
                  <span class="name ft16">关键字：</span><el-input @blur.prevent="keyhomework"  placeholder="请输入关键词搜索" v-model="keyword" clearable></el-input>
                </div>
                <div class="sec">
                  <el-button type="primary" @click="keyhomework">查询</el-button>
                </div>
              </div>
              <div class="con flexbox cp" v-for="item in hwlist"  @click="homeworkDetails(item.id,item.flag)">
                <p class="tit flex col39a">{{item.homeworkName}}</p>
                <p class="time">{{item.createTime}}</p>
              </div>
              <div class="paginationed">
                <Gagination :total="total" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun"
                            @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
              </div>


              <noData v-if="showimg"></noData>  </div>

<!--        </el-col>-->
<!--      </el-row>-->
    </div>
  </div>


</template>

<script>
  import Grade from '../../../components/grade/grade';
  import Subject from '../../../components/grade/subject'
  import Gagination from '../../../components/pagination/pagination'
  import noData from '../../../components/noData/noData'
  export default {
    name: "",
    data(){
      return{
        keyword:'',
        showimg:false,
        value4:'',
        createClass: [],
        date1:'',
        hwlist:[],
        pageSize:1,
        pageNum:1,
        total:0,
        timeSelect:[]
      }
    },
    components:{
      Gagination,
      noData,
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
      //作业详情
      homeworkDetails(id,flag){
        //0自评完成1自评未完成2未完成作业
        this.$router.push({
          path: '/studentCommon/activityCenter/lastHomeworkAssessment',
          query: {
            id: id,
            value:flag
          }
        })
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
      //查询作业
      queryStudentClassHomework(){
        this.hwlist = [];
        this.$post('/likework/queryAssessQuestionByClassId.do',{
          classId:this.value4,//班级id
          rows:10,
          flag:'',
          keyword:this.keyword,
          indexNo:this.pageNum,
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            if(response.data.rows!=''){
              this.hwlist = response.data.rows;
              this.total = response.data.pageCount;
              this.showimg = false
            }else{
              this.showimg = true;
              this.total=0;
            }

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
        margin-right: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .name{
          width: 100px;
          // max-width: 90px;
        }
        
      }
    }
    .con{
      margin-top: 20px;
    }
  }
  .cons{margin-top: 20px;}
</style>
