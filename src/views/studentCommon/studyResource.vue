<template>
  <div class="classList mt72 bf bx">
    <div class="bigBox">
      <div class="boxLeft">
        <div class="xueke">
          <el-select v-model="subjectName" placeholder="请选择学科" @change="getSubjectId">
            <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="three">
          <subject />
        </div>
      </div>
      <div class="boxRight">
        <div class="imgBox" style="padding-top:15px">
          <img style="margin-top:0" src="../../../static/images/资源列表.png" alt />
          <!-- <el-select
            style="margin-left:10px"
            clearable
            v-model="value"
            placeholder="请选择班级"
            @change="changeClass"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>-->
        </div>
        <div class="table">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8;">
                <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">资源名称</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">类型</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">功能</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">能力范围</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">来源</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                style="margin-bottom:5px"
                class="trHover"
              >
                <td style="padding:10px;font-size:16px">{{ index + 1 }}</td>
                <td style="padding:10px;font-size:16px">
                  <a href="javascript:void(0);" @click="toDetail(item.id)">{{item.name}}</a>
                </td>
                <td style="padding:10px;font-size:16px">{{item.type}}</td>
                <td style="padding:10px;font-size:16px">{{item.function}}</td>
                <td style="padding:10px;font-size:16px">{{item.ability}}</td>
                <td style="padding:10px;font-size:16px">{{item.source}}</td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            class="page"
            style="color: #2ab8b3;"
          ></el-pagination>
          <!-- <paginationVue /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subject from "../../components/grade/subject";
import paginationVue from "../../components/pagination/pagination.vue";
import Utils from "../../../static/js/util";
// r富文本域
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
//
export default {
  name: "resourceTools",
  components: {
    subject,
    quillEditor
  },
  data() {
    return {
      total: 1,
      list: [],
      options: [],
      value: "",
      input: "",
      file_photourl: "",
      client: null,
      videoName: "",
      timenum1: 0,
      textarea: "",
      activeIndex: this.$store.state.resnav,
      routers: [
        { path: "/homeCommon/resourceTools" },
        { path: "/homeCommon/resourceTools/uploadVideo" },
        { path: "/homeCommon/resourceTools/researchResult" },
        { path: "/homeCommon/resourceTools/academicCircle" },
        { path: "/homeCommon/resourceTools/sb" }
      ],
      //富文本域
      editorOption: {
        placeholder: "请输入...",
        theme: "snow",
        modules: {}
      },
      //类型选择
      option: [
        {
          value: "1",
          label: "课件"
        },
        {
          value: "2",
          label: "微课"
        },
        {
          value: "3",
          label: "微阅读材料"
        }
      ],
      //功能选择
      choores: [
        {
          value: "1",
          label: "预习"
        },
        {
          value: "2",
          label: "讲解"
        },
        {
          value: "3",
          label: "复习"
        },
        {
          value: "4",
          label: "课轴"
        }
      ],
      //能力范围
      power: [
        {
          value: "1",
          label: "基础学习"
        },
        {
          value: "2",
          label: "能力提升"
        },
        {
          value: "3",
          label: "课外扩展"
        }
      ],
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      classId: 0, //班级ID
      pid: "",
      subjectName: "", //学科名
      subjects: [], //学科
      subjectId: "", //学科ID
      SubjectId: "",
      countpage: 1
    };
  },
  created() {
    this.getClass();
    this.getSbject();
    this.teachersResources();
    const that = this;
    Utils.$on("getData", function(msg) {
      that.pid = msg.id;
      that.teachersResources();
    });
  },
  methods: {
    // 条件查询资源列表接口
    // http://xx.com/user/teachersResources/list
    teachersResources() {
      // classId	否	string	班级Id
      // userId	否	string	用户Id
      // pid	否	string	章节id
      // subjectId	否	string	科目Id
      // indexNo	是	int	当前页
      this.$get("/user/teachersResources/list", {
        indexNo: this.countpage,
        pid: this.pid,
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == 5000) {
          this.list = res.data.date;
          this.total = res.data.date.count;
        }
      });
    },
    getSubjectId(value) {
      this.SubjectId = value;
      Utils.$emit("subjectId", this.SubjectId);
    },
    changeClass() {
      this.teachersResources();
    },
    handleChange() {},
    //获取学科
    getSbject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.subjects = res.data;
        this.subjectName = res.data[1].id;
        Utils.$emit("subjectIds", this.subjectName);
      });
    },
    // getSbject() {
    //   let data = {
    //     id: sessionStorage.getItem("userId")
    //     // type: sessionStorage.getItem("type")
    //   };
    //   this.$get("/system/subject", data).then(res => {
    //     if (res.code == "5000") {
    //       console.log(res, "res getsbject");
    //       this.subjects = res.data;
    //       //    console.log(this.subject);

    //       //   console.log(re.data);
    //     }
    //   });
    // },
    //获取班级
    getClass() {
      this.$post("/user/students/list", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
          console.log(res, "getclasss");
          this.options = res.data.children;
        }
      });
    },
    //获取班级Id
    getClassId(v) {
      this.classId = v;
    },
    toDetail(id) {
      this.$router.push({
        path: "/studentCommon/ResourceDetail",
        query: { id: id, key: 1 }
      });
    },
    //富文本域方法
    onEditorChange() {},
    changeFile(e) {
      this.$prompt("请输入视频名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.videoName = value;
          this.uploadVideo(e);
        })
        .catch(() => {
          document.getElementById("upload").value = "";
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    uploadimg(event, index) {
      this.updatatype1 = true;
      this.timenum1 = 0;
      this.countDown1();
      var self = this;
      var file = event.target.files[0];
      var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
      var storeAs = "upload-file1/abc";
      var file_name = `${new Date().getTime()}`; //时间戳+文件后缀名
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
            // console.log(this.file_photourl);

            document.getElementById("img" + index).src = this.file_photourl;
            document.getElementById("img" + index).style.display = "block";
            // this.imageUrl = this.file_photourl
            this.timenum1 = 100;
            clearInterval(this.time1);
            // self.$message.success("上传成功");

            this.statetype = true;
          } else {
            self.$message.error("上传失败，请重新上传文件");
            this.statetype = false;
          }
        })
        .catch(function(err) {
          //    console.log(err);
        });
    },
    uploadVideo(event) {
      this.loading();
      this.timenum1 = 0;
      // this.countDown1();
      var self = this;
      var file = event.target.files[0];
      var ext = file.type.split("/")[1];
      switch (ext) {
        case "jpg":
        case "jpeg":
        case "png":
        case "bmp":
        case "gif":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
        case "mp3":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
        case "ppt":
        case "pptx":
        case "doc":
        case "docx":
        case "pdf":
          this.loadings.close();
          this.$message({ message: "请上传视频文件", type: "error" });
          return false;
          break;
      }
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
            this.timenum1 = 100;
            clearInterval(this.time1);
            self.$message.success("上传成功");
            this.createClassVideo();
            this.statetype = true;
          } else {
            self.$message.error("上传失败，请重新上传文件");
          }
        })
        .catch(function(err) {
          //    console.log(err);
        });
    }
  },
  watch: {
    "$store.state.resnav": "getNavType"
  }
};
</script>

<style lang="less" scoped>
.classList {
  border: 1px solid #eee;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  .bigBox {
    box-sizing: border-box;
    width: 100%;
    //    height: 1000px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    //  height: 1140px;
    .boxLeft {
      width: 15%;
      //  border-right: 1px solid #eee;
      padding: 10px;
      background-color: #fff;
      border-right: 10px solid #f8f8f8;
      .xueke {
        width: 100%;
        padding: 3px;
      }
      .three {
        padding: 10px 0px;
        //    border-top: 1px solid #eee;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
      }
    }
    .boxRight {
      .imgBox {
        img {
          margin-top: 15px;
        }
      }
      flex: 1;
      //   padding: 10px;
      background-color: #fff;
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 15px;
        table {
          width: 100%;
          height: 100%;
          // text-align: center;
          padding: 18px;
          .trHover:hover {
            background-color: #faf1ed;
          }
        }
        .page {
          position: relative;
          margin: 5px;
          right: -318px;
          bottom: 0;
        }
      }
    }
  }
}
</style>
