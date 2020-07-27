<template>
  <div class="uploadVideo">
    <Grade @subjectId="subjectIds"></Grade>
    <div class="cons">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <Subject @workId="workId"  @textbook="textbook"></Subject>
        </div></el-col>
        <el-col :span="18">
          <div class="published  bx">
            <div class="sec-con bf  flexbox bx" v-if="shows">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select v-model="value4" clearable placeholder="请选择班级" @change="queryClassVideoByStudent">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <el-button type="primary"  v-if="showsd">上传课件</el-button>
            </div>
            <div class="courseCon bf " v-if="shows">
              <h4 class="tit ft16 fb">视频列表</h4>
              <div class="video-con ">
                <el-row :gutter="20">
                  <el-col :span="6"  v-for="(item,i) in videoList" :key="i"><div class="grid-content bg-purple">
                    <div class="con" @click="checkVideo(item,i)">
                      <video :src="item.url"  class="img" ></video>
                      <h4 class="tits ft16 fb">{{item.videoName}}</h4>
                      <div class="info flexbox">
                        <p class="time col666 flex">{{item.createTime}}</p>
                        <p class="dele colff8">人气{{item.view}}</p>
                      </div>
                    </div>
                  </div>
                  </el-col>
                </el-row>
                <noData v-if="showimg"></noData>
              </div>
              <Gagination :total="total"  :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun" @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Grade from '../../components/grade/grade'
  import Subject from '../../components/grade/subject'
  import Gagination from '../../components/pagination/pagination'
  import noData from '../../components/noData/noData'
  export default {
    name: "uploadCourseware",
    props:['shows','showsd'],
    data(){
      return{
        videoList:[],
        options: [],
        value4: '',
        subjectId:"",
        textbookId:"",
        chapterId:'',
        barId:"",
        contentId:'',
        pageSize:1,
        pageNum:1,
        total:0,
        showimg: false
      }
    },
    created(){
      //查询加入班级下拉列表
      this.queryJoinClassSelect();
      //学生查看班级视频
      this.queryClassVideoByStudent()
    },
    methods: {
      // 查看视频
      checkVideo(item, i) {
        console.log(item)
        console.log(i)
        console.log(this.$route)
        this.$store.commit('getVideo', {
          VideoName: item.videoName,
          VideoUrl: item.url,
          VideoCreateTime: item.createTime
        });
      //         this.playerOptions.sources[0].src = video.VideoUrl;
      // this.videoName = video.VideoName;
      // this.createTime = video.VideoCreateTime;
      sessionStorage.setItem('getVideo',JSON.stringify({VideoUrl:item.url,VideoName:item.videoName,VideoCreateTime:item.createTime}))
        this.$router.push({
          path: '/studentCommon/checkVideo',
          query: {path: this.$route.path, name: this.$route.name, key: 2}
        })
      },
      //学段学科
      subjectIds(e){
        this.subjectId = e.id;
        this.queryClassVideoByStudent();
      },
      workId(e){
        // console.log(e);
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId;
        this.queryClassVideoByStudent();
      },
      textbook(e){
        // console.log(e)
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id;
        this.queryClassVideoByStudent();

      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.queryClassVideoByStudent(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.queryClassVideoByStudent(); //当前
      },
      //查询加入班级下拉列表
      queryJoinClassSelect(){
        this.$post('/likework/queryJoinClassSelect.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.options = response.data
            }
          })
      },
      ////学生查看班级视频
      queryClassVideoByStudent(){
        this.videoList=[];
        this.$post('/likework/queryClassVideoByStudent.do',{
          subjectId:this.subjectId,//学科id
          textbookId:this.textbookId,//教科书id
          chapterId:this.chapterId,//章id
          barId:this.barId,//	节id
          contentId:this.contentId,//内容id
          classId:this.value4,//班级id
          indexNo:this.pageNum,
          rows:12
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              if (response.data.rows != "") {
                this.videoList = response.data.rows;
                this.total = response.data.pageCount;
                this.showimg = false
              }else{
                this.total = 0;
                this.showimg = true
              }

            }
          })
      }
    },
    components:{
      Grade,
      Subject,
      Gagination,
      noData
    }
  }
</script>

<style scoped lang="less">
  .uploadVideo{
    .cons{
      margin-top: 20px;
      border-top: 10px solid #eee;
      .published{
        .sec-con{
          padding: 30px;
          margin-left: 10px;
          border-left: 10px solid #eee;
          .sec{
            margin-right: 20px;
          }
        }
        .courseCon{
          padding: 0 20px 60px 20px;
          box-sizing: border-box;
          margin-left: 10px;
          border-left: 10px solid #eee;
          .video-con{
            /*height:660px;*/
            margin-left: -10px;
            display: block;
            .grid-content{
              padding-bottom: 20px;
              .con{
                overflow: hidden;
                margin-top: 20px;
                .img{
                  width: 182px;
                  height: 130px;
                  /*object-fit: cover;*/
                  background: black;
                }
                .tits{
                  margin:  16px 0 6px 0;
                }
              }
            }

          }
        }
      }
    }
  }
</style>

