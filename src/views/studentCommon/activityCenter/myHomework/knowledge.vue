<template>
  <div class="knowledges">
    <Grade @subjectId="subjectIds"></Grade>
    <div class="con ">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ">
            <Subject @workId="workId" @textbook="textbook"></Subject>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="published bf bx">
            <div class="sec-con   flexbox flexrow">
              <el-radio-group @change="studyCircle" size="medium" v-model="value">
                <el-radio-button label="0">自评完成</el-radio-button>
                <el-radio-button label="1">自评未完成</el-radio-button>
                <el-radio-button label="2">未完成作业</el-radio-button>
              </el-radio-group>
            </div>
            <div class="con flexbox cp" v-for="item in hwlist" @click="homeworkDetails(item.id)">
              <p class="tit  col39a">{{item.homeworkName}}</p>
              <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==0">
                <el-button size="mini" type="primary"  v-on:click.stop.prevent="collectHomework(item.id)">收藏</el-button>
              </p>
              <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==1">
                <el-button size="mini" type="primary"  v-on:click.stop.prevent="cancleCollectHomework(item.id)">取消收藏</el-button>
              </p>
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
  import Gagination from '../../../../components/pagination/pagination'
  import noData from '../../../../components/noData/noData'
  export default {
    name: "",
    data() {
      return {
        showimg:false,
        createClass: [],
        states: [
          {value: 0, label: '已发布'},
          {value: 1, label: '未发布'}
        ],
        hwlist: [],
        value: '0',
        barId: '',
        contentId: "",
        subjectId: "",
        chapterId: "",
        pageSize: 1,
        pageNum: 1,
        total: 0,
        textbookId: ""
      }
    },
    components: {
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
    methods: {
      //作业详情
      homeworkDetails(id){
        //0自评完成1自评未完成2未完成作业
            this.$router.push({
              path: '/studentCommon/activityCenter/lastHomeworkAssessment',
              query: {
                id: id,
                value:this.value
              }
            })
      },
      //学段学科
      subjectIds(e) {
        this.subjectId = e.id;
        this.queryClassHomework();
      },
      //收藏
      collectHomework(homeworkId) {
        this.$post('/likework/collectHomework.do',
          {
            homeworkId: homeworkId
          })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.$message({
                showClose: true,
                message: '收藏成功',
                type: 'success'
              });
              this.queryClassHomework();
            } else {
              this.$message({
                showClose: true,
                message: response.message,
                type: 'success'
              });
            }
          })
      },
      cancleCollectHomework(homeworkId) {
        this.$post('/likework/cancleCollectHomework.do',
          {
            homeworkId: homeworkId
          })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.$message({
                showClose: true,
                message: '取消收藏成功',
                type: 'success'
              });
              this.queryClassHomework();
            } else {
              this.$message({
                showClose: true,
                message: response.message,
                type: 'success'
              });
            }
          })
      },
      //选择状态
      studyCircle() {
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

      workId(e) {
        // console.log(e);
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId;
        this.queryClassHomework();
      },
      textbook(e) {
        // console.log(e)
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id;
        this.queryClassHomework();

      },
      //查询作业
      queryClassHomework() {
        this.hwlist = [];
        this.$post('/likework/queryAssessQuestionByKnowledge.do', {
          subjectId: this.subjectId,//学科id
          textbookId: this.textbookId,//教科书id
          chapterId: this.chapterId,//章id
          barId: this.barId,//节id
          contentId: this.contentId,//内容id
          rows: 10,
          indexNo: this.pageNum,
          flag: this.value//发布状态 1-已发布 2-未发布
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            if(response.data.rows!=""){
              this.hwlist = response.data.rows;
              this.total = response.data.pageCount
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
  .knowledges {
    .con {
      margin-top: 20px;


      .published {
        height: 712px;
        padding: 20px 30px 0 30px;

        .con {
          .tit {
            text-decoration: underline;
            width: 460px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
