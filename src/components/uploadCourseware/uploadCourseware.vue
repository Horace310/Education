<template>
  <div class="uploadCourseware">
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
        <el-col style="width:75%;padding:0 10px;transition:all 0.5s ease 0s;box-sizing:border-box;" :style="shrink?'':'width:100%;'">
          <div style="background:#fff;padding-bottom:50px;">
                        <div class="published bf bx">
            <div class="sec-con  flexbox bx">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select v-model="classIdList" clearable placeholder="请选择" @change="getCourseware">
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
                <input type="file" id="upload" @change="changeFile" />
              </div>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              <!-- </el-upload> -->
            </div>
            <div class="courseCon bf" v-if="tableData.length!=0">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="课件名称"
                  align="center"
                  prop="coursewareName"
                  width="380">
                </el-table-column>
                <el-table-column
                  label="上传时间"
                  prop="createTime"
                  align="center"
                  width="200">
                </el-table-column>
                <el-table-column  align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      class="scan"
                      @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>


              <div class="pagination">
                <Gagination :total="total" :current-page="currentPage" :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun" @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
              </div>
            </div>
          </div>
<div class="courseCon bf" style="width:100%;background:#fff;">

                   <noData v-if="tableData.length==0"></noData>
</div>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Grade from '../grade/grade';
  import Subject from '../grade/subject';
  import noData from '../noData/noData';
  import Gagination from '../pagination/pagination'
  
  export default {
    name: "uploadCourseware",
    props:['show'],
    data(){
      return{
        // show:true,
        showimg:false,
        pageSize:10,
        pageNum:1,
        screens:false,
        options: [],
        value4: '',
        tableData: [],
        bookId:'',
        chapterId:'',
        barId:'',
        contentId:'',
        subjectId:'',
        classId:'',
        fileList:[],
        loadings:null,
        total:0,
        shrink:true,
        keyword:'',
        indexNo:'',
        rows:10,
        classIdList:'',
        currentPage:1,
      }
    },
    created(){
      this.getClassList();
      this.queryCreateClass();
      this.getCourseware();
    },mounted() {
      
    },
    methods: {
      query(){
        this.getCourseware();
      },
      screen(){
        this.screens = !this.screens;
      },
      // 获取班级
      queryCreateClass(e){
        this.$post('/likework/queryCreateClass.do').then(res=>{
          if(res.code=="5000"){
          //  console.log(res.data);
            this.options = res.data;
          }
        })
      },
      //学段学科
      subjectIds(e){
        this.subjectId = e.id;
        this.getCourseware();
      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.getCourseware(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.getCourseware(); //当前
      },
      handleEdit(index, row) {
        
        // console.log(index, row);
        this.$store.commit('getVideo',{VideoUrl:row.url,VideoName:row.coursewareName})
        this.$router.push({path:'/homeCommon/checkVideo',query:{path:this.$route.path,name:this.$route.name,key:1}})
      },
      handleDelete(index, row) {
        // console.log(index, row);
        let data={coursewareId:row.id}
        this.$confirm('是否删除此文件','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.$post("/likework/deleteCoursewareById.do",data).then(res=>{
            if(res.code=="5000"){
              // console.log(res);
              this.$message({message:'删除成功!',type:'success'});
              this.tableData.splice(index,1);
            }
          })
        }).catch(()=>{
          this.$message.error('删除失败!');
        })
      },
      // 上传文件
      handleChange(e){
        // console.log(e)
        this.changeFile(e);
      },
      getCourseware(){
        this.tableData=[];
      //  console.log(this.classId)
        let data={
          keyword:this.keyword,
          classId:this.classIdList,
          indexNo:this.indexNo,
          rows:this.rows
        };
       // console.log(data);
        this.$post('/likework/queryCoursewareByClassId.do',data).then(res=>{
          // console.log(res);
          if(res.code=="5000"){
            // console.log(res.data.pageCount);

            this.tableData = res.data.rows;
            this.total = res.data.count;
            this.currentPage = res.data.pageCount;

          }
        })
      },
      getClassList(e){
        this.$post("/likework/queryJoinClassSelect.do").then(res=>{
          if(res.code=="5000"){
            this.options = res.data;
          }
        })
      },
      workId(e){
       // console.log(e);
        this.chapterId = e.chapterId,this.barId = e.barId,this.contentId = e.contentId;
        this.getCourseware()
      },
      textbook(e){
     //   console.log(e)
        this.bookId = e.id,this.subjectId = e.subjectId;
        this.getCourseware()
      },
      loading(e){
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
      deletes(item,i){
        let data={videoId:item.id};
        this.$confirm('确定删除此课件吗?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.$post("/likework/deleteVideoById.do",data).then(res=>{
            if(res.code=="5000"){
              this.$message({message:'删除成功!',type:'success'});
              this.videoList.splice(i,1);
            }
          })
        })
      },
      // 查看视频
      checkVideo(item,i){
        // console.log(item)
        // console.log(i)

      },
      changeFile(e) {
        if (this.contentId == "") {
          this.$message({ message: "请选择章节内容", type: "error" });
        //  this.shrink = !this.shrink;
          document.getElementById('upload').value = '';
          return false;
        }
        if(!this.classIdList){
          this.$message({message:'请选择班级',type:'error'})
          document.getElementById('upload').value = '';
          return false;
        }
        this.$prompt('请输入课件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.videoName = value;
          this.uploadimg(e);
        }).catch(() => {
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
        // var file = event.raw;
     //   console.log(file)
        var ext = file.type.split("/")[1];
                switch(ext){
          case 'mp3':
            this.loadings.close();
            this.$message({message:'请上传课件文件',type:'error'})
            return false;
            break;
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'bmp':
          case 'gif':
          case 'ppt':
          case 'pptx':
          case 'doc':
          case 'docx':
          case 'pdf':
            // this.loadings.close();
            // this.$message({message:'请上传课件文件',type:'error'})
            // return false;
            break;
          default:
            this.$message({message:'请上传课件文件',type:'error'});
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
            event.target.value = "";
            if (result.res.status == 200 && result.res.statusCode == 200) {
              self.$emit("input", result.res.requestUrls[0]);
              this.file_photourl = result.res.requestUrls[0].split("?")[0];
         //     console.log(this.file_photourl);
              this.timenum1 = 100;
              clearInterval(this.time1);
              // self.$message.success("上传成功");
              this.createClassVideo();
              this.statetype = true;
            } else {
              self.$message.error("上传失败，请重新上传文件");
            }
          })
          .catch(function(err) {
        //    console.log(err);
          });
      },
          changeShrink(){
      this.shrink = !this.shrink;
    },
      // 创建视频
      createClassVideo(e){
        let data={
          classIdList:this.classIdList,
          subjectId:this.subjectId,
          textbookId:this.bookId,
          chapterId:this.chapterId,
          barId:this.barId,
          contentId:this.contentId,
          coursewareName:this.videoName,
          url:this.file_photourl
        };
        this.$post("/likework/createClassCourseware.do",data).then(res=>{
          if(res.code=="5000"){
            this.loadings.close();
            this.$message({message:'创建成功!',type:'success'});
            this.getCourseware();
          }
          else{
            this.$message({message:'创建失败!',type:'error'});
          }
        })
      }
    },
    components:{
      Grade,
      Subject,
      noData,
      Gagination
    }
  }
</script>

<style scoped lang="less">
  .uploadCourseware{
    .con{
      margin-top: 20px;
      .published{
        .sec-con{
          padding: 30px;
          .sec{
            margin-right: 20px;
            .el-input{
              width:auto;
            }
          }
        }
        .courseCon{
          height: 660px;
          position: relative;
          .pagination{
            position: absolute;
            bottom: 0px;
            text-align: center;
            right: 20px;
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
<style>
  .btn{
    position: relative;
  }
  .btn input{
    width:98px;
    height:40px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }
  .uploadCourseware .published .el-table td, .el-table th.is-leaf{border-bottom: none}
  .uploadCourseware .published .el-table--border::after, .uploadCourseware .published .el-table--group::after, .uploadCourseware .published .el-table::before {
    content: '';
    position: absolute;
    background-color: #ffffff;
    z-index: 1;
  }
  .uploadCourseware .published  .el-table .has-gutter th>.cell{font-size: 16px;color: #333333}
  .uploadCourseware .published  .el-table .el-table__body tr .el-table_1_column_1  .cell{color: #39a5ff;text-decoration: underline;}
  .uploadCourseware .published  .el-table .el-table__body tr .el-table_1_column_2  .cell{color: #666666;}
  .uploadCourseware .published .courseCon .scan{background: #2592e7;border-color: #2592e7;color: #ffffff;}
  .uploadCourseware .published .courseCon .el-button--danger{background: #ff8a00;border-color: #ff8a00;}
</style>
