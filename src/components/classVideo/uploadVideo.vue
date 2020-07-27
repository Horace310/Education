<template>
  <div class="uploadVideo">
    <Grade @subjectId="subjectIds"></Grade>
    <div class="con">
      <el-row :gutter="20">
                <el-col style="width:25%;padding:0 10px;display:block;transition:all 0.5s ease 0s;" :style="shrink?'':'width:0;padding:0;'">
          <div class="grid-content ">
            <Subject @workId="workId" @textbook="textbook" :style="shrink?'':'width:0;overflow:hidden'"></Subject>
            <div class="shrink" @click="changeShrink">
              <i :class="shrink?'el-icon-arrow-left':'el-icon-arrow-right'"></i>
            </div>
          </div>
        </el-col>
        <el-col style="width:75%;padding:0 10px;transition:all 0.5s ease 0s;" :style="shrink?'':'width:100%;'">
          <div class="published  bx">
            <div class="sec-con bf  flexbox bx" v-if="false">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select v-model="classId" clearable placeholder="请选择" @change="getVideoList">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="sec">
                <span class="name ft16">关键词</span>
                <el-input v-model="keyword" placeholder="请输入关键词" @keyup.enter.native="query"></el-input>
              </div>
              <div class="sec">
                <el-button type="primary" @click="query">查询</el-button>
              </div>
              <div class="btn">
                <el-button type="primary">点击上传</el-button>
                <input type="file" id="upload" @change="changeFile"/>
              </div>
            </div>
            <div class="courseCon bf posr" v-else>
              <!-- <h4 class="tit ft16 fb">视频列表</h4> -->
              <div class="flexbox sec-con bx">
                <div class="sec">
                  <span class="name ft16">选择班级：</span>
                  <el-select v-model="classId" clearable placeholder="请选择" @change="getVideoList">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">

                    </el-option>
                  </el-select>
                </div>
                <div class="sec">
                  <span class="name ft16">关键词</span>
                  <el-input v-model="keyword" placeholder="请输入关键词" @keyup.enter.native="query"></el-input>
                </div>
                <div class="sec">
                  <el-button type="primary" @click="query">查询</el-button>
                </div>
                <div class="btn">
                  <el-button type="primary">点击上传</el-button>
                  <input type="file" id="upload" @change="changeFile"/>
                </div>
              </div>

              <div class="video-con ">
                <el-col :span="6" v-for="(item, i) in videoList" :key="i">
                  <div class="grid-content bg-purple">
                    <div class="con" @click="checkVideo(item,i)">


                      <video :src="item.url"></video>
                      <!-- <img :src="item.url" alt="" class="img" /> -->
                      <p class="tits ft16 fb">{{ item.videoName }}</p>
                      <div class="info flexbox">
                        <p class="time col666 flex">{{ item.createTime }}</p>
                       <a href="javescript:;"><p class="dele col666" v-show="video!=1" @click.stop @click="deletes(item,i)">删除</p></a> 
                        <p class="add col666" v-show="video==1" @click.stop @click="addVideo(item,i)">添加</p>

                        <!-- <video :src="item.url"></video>
                        <img :src="item.url" alt="" class="img" />
                        <p class="tits ft16 fb">{{ item.videoName }}</p>
                        <div class="info flexbox">
                          <p class="time col666 flex">{{ item.createTime }}</p>
                          <p class="dele col666" @click.stop @click="deletes(item,i)">删除</p>
                        </div> -->
                      </div>

                    </div>
                  </div>
                </el-col>
                <div class="paginationed">
                  <Gagination :total="total" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun"
                              @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
                </div>

                <noData v-if="showimg"></noData>


              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Grade from "../../components/grade/grade";
  import Subject from "../../components/grade/subject";
  import Gagination from '../../components/pagination/pagination';
  import noData from '../../components/noData/noData'

  export default {
    name: "uploadCourseware",
    props: ["shows"],
    data() {
      return {
        videoList: [],
        classId: '',
        showimg: false,
        pageSize: 10,
        pageNum: 1,
        total: 0,
        options: [],
        value4: "",
        action: "",
        file_photourl: "",
        client: null,
        statetype: "",
        chapterId: "",
        barId: "",
        contentId: "",
        bookId: "",
        subjectId: "",
        videoName: "",
        fullscreenLoading: false,
        loadings: null,
        video: this.$route.query.video,
        shrink:true,
        screens:false,
        keyword:'',
        indexNo:1,
        rows:10
    }
      ;
    },
    created() {
     // console.log(this.$route)
      this.getVideoList();
      this.getClassList();
    },
    methods: {
      query(){
    //    console.log(this.keyword)
        this.getVideoList();
      },
      screen(){
        this.screens = !this.screens;
      },
      changeShrink(){
        this.shrink = !this.shrink;
      },
      //学段学科
      subjectIds(e){
    //    console.log(e)
        this.subjectId = e.id;
        this.getVideoList();
      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.getVideoList(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.getVideoList(); //当前
      },
      // 获取学科id
      workId(e) {
    //    console.log(e);
        (this.chapterId = e.chapterId),
          (this.barId = e.barId),
          (this.contentId = e.contentId);
          this.getVideoList()
        // this.changeFile();
      },
      textbook(e) {
        //console.log(e);
        (this.bookId = e.id), (this.subjectId = e.subjectId);
        this.getVideoList();
        // this.changeFile()
        this.getVideoList()
      },
      // 获取视频列表
      getVideoList(e) {
      //  console.log(this.classId)
        let data = {
          keyword:this.keyword,
          classId:this.classId,
          indexNo:this.indexNo,
          rows:this.rows
        };
        this.videoList = [];
        this.$post("/likework/queryVideoByClassId.do", data).then(res => {
          if (res.code == "5000") {
            if (res.data.rows != "") {
              this.videoList = res.data.rows;
              this.total = res.data.count;
              this.showimg = false
            } else {
              this.total = 0;
              this.showimg = true
            }

          }
        })
      },
      // 查看班级列表
      getClassList(e) {
        this.$post("/likework/queryCreateClass.do").then(res => {
          if (res.code == "5000") {
     //       console.log(res.data)
            this.options = res.data
          }
        })
      },
      loading(e) {
        this.loadings = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // setTimeout(() => {
        //   loading.close();
        // }, 2000);
      },
      // 删除视频
      deletes(item, i) {
        let data = {videoId: item.id};
        this.$confirm('确定删除此视频吗?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.$post("/likework/deleteVideoById.do", data).then(res => {
            if (res.code == "5000") {
              this.$message({message: '删除成功!', type: 'success'});
              this.videoList.splice(i, 1);
              this.total = this.videoList.length;
            }
          })
        })
      },
      // 查看视频
      checkVideo(item, i) {
        sessionStorage.setItem('getVideo',JSON.stringify({
          VideoName: item.videoName,
          VideoUrl: item.url,
          VideoCreateTime: item.createTime
        })
        )
        this.$router.push({
          path: '/homeCommon/checkVideo',
          query: {path: this.$route.path, name: this.$route.name, key: 2,id:item.id}
        })
      },
      changeFile(e) {
    //    console.log(e)
        if (this.contentId == "") {
          this.$message({message: "请选择章节内容", type: "error"});
          this.shrink = true;
          document.getElementById('upload').value = '';
          return false;
        }
     //   console.log(this.classId)
        if (!this.classId) {
          this.$message({message: '请选择班级', type: 'error'})
          document.getElementById('upload').value = '';
          return false;
        }
        this.$prompt('请输入视频名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.videoName = value;
          this.uploadimg(e);
        }).catch(() => {
          document.getElementById('upload').value = '';
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      uploadimg(event) {
        this.loading();
        this.updatatype1 = true;
        this.timenum1 = 0;
        // this.countDown1();
        var self = this;
        var file = event.target.files[0];
        var ext = file.type.split("/")[1];
        switch(ext){
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'bmp':
          case 'gif':
            this.loadings.close();
            this.$message({message:'请上传视频文件',type:'error'})
            return false;
            break;
          case 'mp3':
            this.loadings.close();
            this.$message({message:'请上传视频文件',type:'error'})
            return false;
            break;
          case 'ppt':
          case 'pptx':
          case 'doc':
          case 'docx':
          case 'pdf':
            this.loadings.close();
            this.$message({message:'请上传视频文件',type:'error'})
            return false;
            break;
        };
        // this.videoName = file.name.replace("."+ext,"");
        var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
        var storeAs = "upload-file1/abc";
        var file_name = `${new Date().getTime()}.${ext}`; //时间戳+文件后缀名
        this.client = new OSS.Wrapper({
          region: "oss-cn-shenzhen",
          secure: true,
          //endpoint: "oss-cn-shenzhen.aliyuncs.com",
          accessKeyId: "TxkBX1VgU792UUVh",
          accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
          bucket: "mixin"
        });
        this.client
          .multipartUpload(file_name, file)
          .then(result => {
       //   console.log(result);

            event.target.value = "";
            if (result.res.status == 200 && result.res.statusCode == 200) {
              self.$emit("input", result.res.requestUrls[0]);
              this.file_photourl = result.res.requestUrls[0].split("?")[0];
        //      console.log(this.file_photourl);
              this.timenum1 = 100;
              clearInterval(this.time1);
              self.$message.success("上传成功");
              this.createClassVideo();
              this.statetype = true;
            } else {
              self.$message.error("上传失败，请重新上传文件");
            }
          })
          .catch(function (err) {
        //    console.log(err);
          });
      },
      // 创建视频
      createClassVideo(e) {
        let data = {
          classIdList: this.classId,
          subjectId: this.subjectId,
          textbookId: this.bookId,
          chapterId: this.chapterId,
          barId: this.barId,
          contentId: this.contentId,
          videoName: this.videoName,
          url: this.file_photourl
        };
        if(!data.classIdList){
          this.$message.error('请选择班级!');
          this.loadings.close();
          return false;
        }
        this.$post("/likework/createClassVideo.do", data).then(res => {
          if (res.code == "5000") {
            this.loadings.close();
            this.$message({message: '创建成功!', type: 'success'});
            this.getVideoList();
          } else {
            this.loadings.close();
            this.$message({message: '请选择章节!', type: 'error'});
          }
        })
      },
      // 添加视频
      addVideo(item, index) {
        let data = {classId: this.$route.query.classId, videoId: item.id};
        this.$post("/likework/addVideoToClass.do", data).then(res => {
          if (res.code == "5000") {
            this.$message({message: '添加成功!', type: 'success'})
          }
        })
      }
    },
    components: {
      Grade,
      Subject,
      Gagination,
      noData
    }
  };
</script>

<style scoped lang="less">
  .uploadVideo {
    .con {
      margin-top: 20px;

      .published {
        .sec-con {
          padding: 30px;

          .sec {
            margin-right: 20px;
            .el-input{
              width:auto;
            }
          }

          .btn {
            position: relative;

            input {
              width: 98px;
              height: 40px;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              z-index: 1;
              cursor: pointer;
            }
          }
        }

        .courseCon {
          height: 660px;
          // padding: 0 20px 60px 20px;

          .video-con {
            .grid-content {
              padding-bottom: 20px;

              .con {
                video {
                  width: 100%;
                  height: 127px;
                  background: #000; 
                }

                .img {
                  width: 100%;
                  height: 130px;
                  object-fit: cover;
                }

                .tits {
                  margin: 16px 0 6px 0;
                  width: 100%;
                  //                 display: -webkit-box;
                  // -webkit-box-orient: vertical;
                  // -webkit-line-clamp: 3;
                  // overflow: hidden;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                .info {
                  .add.dele {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
                  .grid-content{
          position: relative;
          .shrink{
            cursor: pointer;
            position: absolute;
            width: 30px;
            right: 0;
            top:50%;
            height: 60px;
            border-radius: 5px 0 0 5px;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              font-size: 24px;
            }
          }
        }
    }
  }
</style>

