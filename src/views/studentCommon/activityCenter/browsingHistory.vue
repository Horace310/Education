<template>
  <div class="browsingHistory">
    <div class="cons bf">
      <div class="sec-con">

      </div>
      <div class="con flexbox cp" v-for="item in hwlist"  @click="homeworkDetails(item.id,item.flag)">
        <p class="tit col39a">{{item.homeworkName}}</p>
        <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==0" ><el-button size="mini" type="primary" style="background-color:#f25c29;border:none" @click="collectHomework(item.id)">收藏</el-button></p>
        <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==1"><el-button size="mini" type="primary"  style="background-color:#f25c29;border:none" @click="cancleCollectHomework(item.id)">取消收藏</el-button></p>
        <p class="time">{{item.updateTime}}</p>
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
  import noData from '../../../components/noData/noData'
  import Gagination from '../../../components/pagination/pagination'
  export default {
    name: "",
    data(){
      return{
        createClass:[],
        hwlist:[],
        options:[],
        value:'0',
        pageSize:1,
        pageNum:1,
        total:0,
        classId:'',
        textbookId:"",
        showimg:false
      }
    },
    components:{
      noData,
      Gagination
    },
    created() {

      //查询加入班级下拉列表
      this.queryClassHomework();
      this.$store.state.stuworknav = "4"; //头部导航
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
      //收藏
      collectHomework(homeworkId){
        this.$post('/likework/collectHomework.do',
          {
            homeworkId:homeworkId
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
            }else{
              this.$message({
                showClose: true,
                message: response.message,
                type: 'success'
              });
            }
          })
      },
      cancleCollectHomework(homeworkId){
        this.$post('/likework/cancleCollectHomework.do',
          {
            homeworkId:homeworkId
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
            }else{
              this.$message({
                showClose: true,
                message: response.message,
                type: 'success'
              });
            }
          })
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
        this.$post('/likework/queryHomeworkLookRecordList.do',{
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
  .browsingHistory{
    .cons{
      height: 620px;
      padding: 20px 30px 0 30px;
      position: relative;
      .con{

        margin-top: 20px;
        .tit{
          text-decoration: underline;
          width: 900px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }

    }
  }
</style>
