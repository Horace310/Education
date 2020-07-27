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
                <div class="published bf bx">
                  <div class="sec-con bf  flexbox bx flexrow" >
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
                    <div class="sec">
                      <span class="name ft16">关键字：</span><el-input  @blur.prevent="keyhomework"  placeholder="请输入关键词搜索" v-model="keyword" clearable></el-input>
                    </div>
                    <div class="sec">
                      <el-button type="primary" @click="check">查询</el-button>
                    </div>
                  </div>
                  <div class="courseCon bf bx" >
                    <!--      <h4 class="tit ft16 fb" style="margin-bottom: 20px;">视频列表</h4>-->
                    <div class="video-con ">
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
                    </div>
                  </div>
                  <div class="paginationed">
                    <Gagination :total="total" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun"
                                @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
                  </div>


                  <noData v-if="showimg"></noData>
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
  import noData from '../../../components/noData/noData'
    export default {
      name: "workVideo",
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
          showimg:false,
          keyword:''
        }
      },
      created(){
        //查询加入班级下拉列表
        this.queryJoinClassSelect();
        //学生查看班级视频
        this.queryClassVideoByStudent()
      },
      methods: {
        keyhomework(){
          this.pageNum =1 ;
          this.queryClassVideoByStudent();
        },
        //学段学科
        subjectIds(e){
          this.subjectId = e.id;
          this.queryClassVideoByStudent();
        },
        workId(e) {
          // console.log(e);
          this.chapterId = e.chapterId;
          this.barId = e.barId;
          this.contentId = e.contentId;
          this.chapterName = e.name1;
          this.barName = e.name2;
          this.contentName = e.name3;
          this.queryClassVideoByStudent();
        },
        textbook(e) {
          // console.log(e)
          // this.getCourseware()
          this.subjectId = e.subjectId;
          this.textbookId = e.id;
          this.book = e.book;
          this.gradename = e.gradename;
          this.queryClassVideoByStudent();
        },
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
          this.$router.push({
            path: '/studentCommon/checkVideo',
            query: {path: this.$route.path, name: this.$route.name, key: 2}
          })
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
            keyword:this.keyword,
            classId:this.value4,//班级id
            indexNo:this.pageNum,
            rows:12
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                if(response.data.rows!=''){
                  this.videoList = response.data.rows;
                  this.total = response.data.pageCount;
                  this.showimg = false
                }else{
                  this.showimg = true;
                  this.total = 0;
                }

              }
            })
        }
      },
      components:{
        Gagination,
        Grade,
        Subject,
        noData
      }
    }
</script>

<style scoped lang="less">
      .published{
        height: 880px;
        padding: 20px 30px 0 30px;
        position: relative;
        .sec-con{
          padding: 30px;
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
        .courseCon{
          /*height: 711px;*/
          /*padding: 0 20px 60px 20px;*/
          .video-con{
            .grid-content{
              padding-bottom: 20px;
              width: 182px;
              .con{
                .img{
                  width: 182px;
                  height: 130px;
                  /*object-fit: cover;*/
                  background: black;
                }
                .tits{
                  margin:  16px 0 6px 0;
                }
                .info{

                }
              }
            }

          }
        }
      }

      .cons{margin-top: 20px;}
</style>
