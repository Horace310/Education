
<template>
  <div class="knowledgesq">
    <Grade @subjectId="subjectIds"></Grade>
    <div class="con">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <Subject @workId="workId"  @textbook="textbook"></Subject>
        </div></el-col>
        <el-col :span="18"><div class="published bf bx">
          <div class="sec-con   flexbox flexrow">
          </div>
          <div class="cons flexbox cp" v-for="item in hwlist" @click="homeworkDetails(item.id,item.flag)">
            <p class="tit flex col39a">{{item.homeworkName}}</p>
            <p class="time">{{item.createTime}}</p>
          </div>
          <div class="paginationed">
            <Gagination :total="total" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun"
                        @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
          </div>
          <noData v-if="showimg"></noData>
        </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Grade from '../../../../components/grade/grade';
  import Subject from '../../../../components/grade/subject'
  import noData from '../../../../components/noData/noData'
  import Gagination from '../../../../components/pagination/pagination'
  export default {
    name: "",
    data(){
      return{
        showimg:false,
        createClass:[],
        states:[
          {value:0, label:'已发布'},
          {value:1, label:'未发布'}
        ],
        hwlist:[],
        value:'0',
        barId:'',
        contentId:"",
        subjectId:"",
        chapterId:"",
        pageSize:1,
        pageNum:1,
        total:0,
        textbookId:""
      }
    },
    components:{
      Grade,
      Subject,
      Gagination,
      noData

    },
    created() {
      //选择班级
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
      //学段学科
      subjectIds(e) {
        this.subjectId = e.id;
        this.queryClassHomework();
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

      workId(e){
        // console.log(e);
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId;
        this.queryClassHomework();
      },
      textbook(e){
        // console.log(e)
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id;
        this.queryClassHomework();

      },
      //查询作业
      queryClassHomework(){
        this.hwlist = [];
        this.$post('/likework/queryCollectHomeworkListByKnowledge.do',{
          subjectId:this.subjectId,//学科id
          textbookId:this.textbookId,//教科书id
          chapterId:this.chapterId,//章id
          barId:this.barId,//节id
          contentId:this.contentId,//内容id
          rows:10,
          indexNo:this.pageNum,
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
  .knowledgesq{
    .con{
      margin-top: 20px;
      .published{
        height: 711px;
        padding: 20px 30px 0 30px;
        .cons{
          margin-top: 20px;
          .tit{
            text-decoration: underline;
            width: 460px;
            word-break:keep-all;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
</style>
