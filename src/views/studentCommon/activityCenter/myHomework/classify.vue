<template>
  <div class="knowledgesq ">
    <div class="cons nowork bf">
      <div class="sec-con   flexbox flexrow">
        <div class="sec">
          <span class="name ft16">选择班级：</span>
          <el-select v-model="classId" clearable placeholder="请选择班级" @change="queryClassHomework">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      <div class="sec">
        <span class="name ft16">关键字：</span><el-input  @blur.prevent="keyhomework"  placeholder="请输入关键词搜索已完成作业" v-model="keyword" clearable></el-input>
      </div>
      <div class="sec">
        <el-button type="primary" style="background-color:#f25c29;border:none" @click="queryClassHomework">查询</el-button>
      </div>
<!--        <el-radio-group @change="studyCircle" size="medium" v-model="value">-->
<!--          <el-radio-button label="0">自评完成</el-radio-button>-->
<!--          <el-radio-button label="1">自评未完成</el-radio-button>-->
<!--          <el-radio-button label="2">未完成作业</el-radio-button>-->
<!--        </el-radio-group>-->
      </div>
      <div class="con flexbox cp" v-for="item in hwlist" @click="homeworkDetails(item.id)">
        <p class="tit col39a">{{item.homeworkName}}</p>
        <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==0">
          <el-button size="mini" type="primary" style="background-color:#f25c29;border:none" v-on:click.stop.prevent="collectHomework(item.id)">收藏</el-button>
        </p>
        <p class="flex" style="margin:4px 0 0  50px;" v-if="item.isCollect==1">
          <el-button size="mini" type="primary" style="background-color:#f25c29;border:none" v-on:click.stop.prevent="cancleCollectHomework(item.id)">取消收藏</el-button>
        </p>
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
  import Gagination from '../../../../components/pagination/pagination'
  import noData from '../../../../components/noData/noData'
  export default {
    name: "",
    data() {
      return {
        keyword:'',
        createClass: [],
        hwlist: [],
        options: [],
        value: '0',
        pageSize: 1,
        pageNum: 1,
        total: 0,
        classId: '',
        textbookId: "",
        showimg:false
      }
    },
    components: {
      noData,
      Gagination
    },
    created() {

      //查询加入班级下拉列表
      this.queryJoinClassSelect();

    },
    mounted() {

    },
    methods: {
      keyhomework(){
        this.pageNum =1 ;
        this.queryClassHomework();
      },
      //作业详情
      homeworkDetails(id){
        //0自评完成1自评未完成2未完成作业
        this.$router.push({
          path: '/studentCommon/activityCenter/lastHomeworkAssessment',
          query: {
            id: id,
            value:0
          }
        })
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
      //查询加入班级下拉列表
      queryJoinClassSelect() {
        this.$post('/likework/queryJoinClassSelect.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              if(response.data!=""){
                this.options = response.data;
                // this.classId = response.data[0].id;
                this.queryClassHomework();
                this.showimg = false
              }else{
                this.showimg = true;
              }

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


      //查询作业
      queryClassHomework() {
        
        this.hwlist = [];
        this.$post('/likework/queryAssessQuestionByClassId.do', {
          keyword:this.keyword,
          classId: this.classId,//班级id
          rows: 10,
          indexNo: this.pageNum,
          flag: 0//0-已完成 1-未完成 不传值为全部作业
        }).then((response) => {
          console.log(response,111)
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
  .knowledgesq {
    .cons {
      height: 660px;
      padding: 20px 30px 0 30px;
      position: relative;
      .flexrow{
        .sec{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span{
            width: 90px;
          }
          .el-input{
            flex:1;
            // width: 70%;
          }
        }
      }
      .con {
        margin-top: 20px;

        .tit {
          text-decoration: underline;
          width: 900px;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

    }
  }
</style>
