<template>
  <div class="knowledgesd ">
    <div class="cons bf">
      <div class="sec-con  flexbox  flexrow">
        <div class="sec " style="">
          <span class="name ft16">选择年级：</span>
          <el-select v-model="gradeName" clearable placeholder="请选择年级" @change="currentSel" value-key="gradeId">
            <el-option
              v-for="items in options"
              :key="items.gradeId"
              :label="items.gradeName"
              :value="items">
            </el-option>
          </el-select>
        </div>
        <div class="sec">
          <span class="name ft16">选择学科：</span>
          <el-select v-model="subjectId" clearable placeholder="请选择学科" @change="queryClassHomework">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.subjectName"
              :value="item.id">
            </el-option>
          </el-select>
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
      <noData v-if="showimg"></noData>
    </div>
  </div>
</template>

<script>
  import noData from '../../../../components/noData/noData'
  import Gagination from '../../../../components/pagination/pagination'
  export default {
    name: "",
    data(){
      return{
        showimg:false,
        createClass:[],
        hwlist:[],
        options:[],
        value:'0',
        pageSize:1,
        pageNum:1,
        total:0,
        gradeId:'',
        textbookId:"",
        subjectId:"",
        list:[],
        gradeName:''
      }
    },
    components:{
      noData,
      Gagination
    },
    created() {

      //查询加入班级下拉列表
      this.queryJoinClassSelect();
      this.queryClassHomework();
    },
    mounted() {

    },
    methods:{
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
      currentSel(selVal) {
        this.gradeId = selVal.gradeId;
        this.list = selVal.list;
        this.queryClassHomework();
        // console.log(selVal);
      },
      //获取年级学科下拉列表
      queryJoinClassSelect(){
        this.$post('/likework/queryGradeAndSubjectList.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.options = response.data;

            }
          })
      },
      //选择状态
      studyCircle(){
        // console.log(this.value);
        this.queryClassHomework()
      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.queryClassHomework(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.queryClassHomework(); //当前
      },



      //查询作业
      queryClassHomework(){
        this.hwlist = [];
        this.$post('/likework/queryCollectHomeworkListBySubject.do',{
          gradeId:this.gradeId,//年级id
          rows:10,
          indexNo:this.pageNum,
          subjectId:this.subjectId//	学段学科id
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            if(response.data.rows!=""){
              this.hwlist = response.data.rows;
              this.total = response.data.pageCount;
              this.showimg = false
            }else{
              this.showimg = true;
              this.total = 0;
            }

          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .knowledgesd{
    .cons{
      height: 600px;
      padding: 20px 30px 0 30px;
      position: relative;
      .con{
        margin-top: 20px;
        .tit{
          text-decoration: underline;
          width: 700px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }

    }
  }
</style>
