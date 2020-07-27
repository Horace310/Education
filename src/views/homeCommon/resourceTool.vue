<template>
  <div class="classList mt72 bf bx">
    <div class="bigBox">
      <!-- <div class="boxLeft">
        <div class="xueke">
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
        </div>
        <div class="three">
          <subject />
        </div>
      </div>-->
      <div class="boxRight">
        <goBack
          :direction="true"
          link="/homeCommon/TeachingResearch/homeworkResearch"
          :queryData="{id:$route.query.id}"
        ></goBack>
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
                <td style="color:#fb8b22;font-size:16px;padding:5px">操作</td>
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
                  <a href="javascript:void(0);" @click="toResourceDetail(item)">{{item.name}}</a>
                </td>
                <td style="padding:10px;font-size:16px">{{item.type}}</td>
                <td style="padding:10px;font-size:16px">{{item.function}}</td>
                <td style="padding:10px;font-size:16px">{{item.ability}}</td>
                <td style="padding:10px;font-size:16px">{{item.chapterName}}</td>
                <td style="padding:10px;font-size:16px" @click="delteResearch(item)">
                  <span class="el-icon-delete"></span>
                </td>
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
        <div class="function">
          <div class="name">
            <span style="color:#2fb6b5">资源名称：</span>
            <el-input v-model="input" placeholder="请输入内容" class="textName"></el-input>
          </div>
          <div class="name" style="padding:3px">
            <span style="color:#2fb6b5">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
            <!-- <el-cascader :options="options" @change="handleChange"></el-cascader> -->
            <el-select v-model="leixing" placeholder="请选择类型" @change="handleChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>

          <div class="name">
            <span style="color:#2fb6b5">功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;能：</span>
            <!-- <el-cascader :options="choores" @change="handleChange"></el-cascader> -->
            <el-select v-model="gongneng" placeholder="请选择类型" @change="choore">
              <el-option
                v-for="item in choores"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
          <div class="name">
            <span style="color:#2fb6b5">能力范围：</span>
            <!-- <el-cascader :options="power" @change="handleChange"></el-cascader> -->
            <el-select v-model="fanwei" placeholder="请选择类型" @change="choore">
              <el-option
                v-for="item in power"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
          <div class="upVideo">
            <div class="upLeft" style="display:inline-block;flex:1">
              <span style="color:#2fb6b5">上传视频:</span>
              <input type="file" id="upload" @change="uploadVideo($event, i)" />
            </div>
            <div class="upRight" style="display:inline-block;flex:1">
              <span style="color:#2fb6b5">上传图片:</span>
              <input
                @change="uploadimg($event, i)"
                type="file"
                name="file"
                id="Album_img"
                accept="image/gif, image/jpeg, image/x-png"
              />
            </div>
          </div>
        </div>
        <div class="textarea"></div>
        <div class="send">
          <el-button
            type="primary"
            style="background-color:#f15d28;color:#fff;border:0"
            @click="retearch"
          >发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import subject from "../../components/grade/subjects";
import paginationVue from "../../components/pagination/pagination.vue";
// r富文本域
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Utils from "../../../static/js/util";
import goBack from "@/components/common/goBack";
export default {
  inject: ["reload"],
  name: "resourceTools",
  components: {
    // subject,
    quillEditor,
    goBack
  },
  data() {
    return {
      total: 1,
      list: [],
      leixing: "", //类型
      fanwei: "", //范围
      nengli: "", //能力
      gongneng: "", //功能
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
      value: "",
      editorOption: {
        placeholder: "请输入...",
        theme: "snow",
        modules: {}
      },
      //类型选择
      options: [
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
      data: [
        {
          label: "章",
          children: [
            {
              label: "节",
              children: [
                {
                  label: "单元"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      imageUrl: "",
      file_photourl: "",
      //  file_photourl: "",
      file_photourls: "",
      timenum1: 0,
      time1: setInterval,
      textbookId: 0, //教学教材ID
      pid: 0, //章节ID
      chapterName: "", //章节名称
      target: "", //目标
      difficulty: "", //难点
      direction: "", //方向
      content: "" //内容
    };
  },
  created() {
    this.pid = this.$route.query.pid;
    this.getList();
    var that = this;
    // Utils.$on("pid", function(msg) {
    //   that.textbookId = msg;
    // });
    // Utils.$on("getData", function(msg) {
    //   that.pid = msg.id;
    //   // console.log(msg);
    //   that.chapterName = msg.name;
    //   that.getList();
    // });
  },
  methods: {
    //删除资源
    delteResearch(item) {
      console.log(item, "lxfsssss");
      this.$confirm("此操作将删除此资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/user/resources/delete", { id: item.id }).then(res => {
            // console.log(res);
            if (res.code == "5000") {
              this.$message({ type: "success", message: "删除成功" });
              this.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取资源列表
    getList() {
      let data = {
        rid: this.$route.query.id,
        indexNo: this.total,
        pid: this.pid
      };
      this.$get("/user/resources/list", data).then(res => {
        this.list = res.data.date;
        //  console.log(this.list);
      });
    },
    //发布资源
    retearch() {
      let data = {
        rid: this.$route.query.id,
        textbookId: this.textbookId,
        pid: this.pid,
        chapterName: this.chapterName,
        name: this.input,
        type: this.leixing,
        function: this.gongneng,
        ability: this.fanwei,
        source: sessionStorage.getItem("username"),
        video: this.file_photourls,
        img: this.file_photourl,
        target: this.target,
        difficulty: this.difficulty,
        direction: this.direction,
        content: this.content
      };
      this.$post("/user/resources/add", data).then(res => {
        if (res.code == "5000") {
          this.$message({ tyepe: "success", message: "发布成功" });
          this.getList();
        }
      });
    },
    handleChange(value) {
      // console.log(value);
    },
    choore(vallue) {
      // console.log(this.leixing);
    },
    toResourceDetail(item) {
      this.$router.push({
        path: "/homeCommon/ResourceDetails",
        query: {
          id: item.id,
          key: 3
        }
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
    //上传img
    uploadimg(event) {
      this.timenum1 = 0;
      // this.countDown1();
      var self = this;
      var file_url = [];
      for (let i = 0; i < event.target.files.length; i++) {
        var file = event.target.files[i];
        var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
        var storeAs = "upload-file1/abc";
        var file_name = `${new Date().getTime() + i}`; //时间戳+文件后缀名
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
              //    self.$emit("input", result.res.requestUrls[0]);
              this.file_photourl = result.res.requestUrls[0].split("?")[0];

              file_url.push(this.file_photourl);
              //    console.log(this.file_photourl);

              this.timenum1 = 100;
              clearInterval(this.time1);
              self.$message.success("上传成功");
              this.statetype = true;
            } else {
              self.$message.error("上传失败，请重新上传文件");
            }
          })
          .catch(function(err) {});
      }
      this.file_urls = file_url;
    },
    //上传视频
    uploadVideo(event) {
      // this.loading();
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
          //  this.loadings.close();
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
            this.file_photourls = result.res.requestUrls[0].split("?")[0];
            //   console.log(this.file_photourls);

            // this.timenum1 = 100;
            // clearInterval(this.time1);
            self.$message.success("上传成功");
            //  this.createClassVideo();
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
    height: 1140px;
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
      flex: 1;
      //   padding: 10px;
      background-color: #fff;
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #2ab8b3;
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
      .function {
        border-top: 6px solid #2ab8b3;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .name {
          margin-top: 30px;
          width: 49%;
          height: 16%;
          //   border: 1px solid #eee;
          text-align: center;
          .textName {
            padding: 3px;
            display: inline-block;
            width: 200px;
            height: 100%;
          }
        }
        .upVideo {
          //     border: 1px solid #eee;
          width: 100%;
          height: 16%;
          padding: 5px;
          text-align: center;
          display: flex;
          margin-top: 20px;
        }
        .guidance {
          width: 100%;
          height: 25%;
          border: 1px dashed #e6e6e6;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          .guidanceLeft {
            width: 15%;
            height: 100%;
            display: inline-block;
            span {
              color: #f25c29;
              font-size: 18px;
            }
          }
          .guidanceRight {
            margin-left: 15px;
            flex: 1;
            display: inline-block;
            width: 83%;
            height: 100%;

            .mubiao {
              width: 100%;
              height: 33%;
              display: inline-block;
              margin-bottom: 5px;
              margin-left: 150px;
              .line {
                display: inline-block;
                width: 200px;
              }
            }
          }
        }
      }
      .textarea {
        border-top: 10px solid #f8f8f8;
        padding-top: 10px;
        width: 100%;
        height: 200px;
        margin-bottom: 70px;
        .textBox {
          height: 100%;
        }
      }
      .send {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
