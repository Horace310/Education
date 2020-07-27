<template>
  <div class="classList mt72 bf bx">
    <div class="bigBox">
      <div class="boxLeft">
        <div class="xueke">
          <span>{{ subjectName }}</span>
          <!-- <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader> -->
        </div>
        <div class="three">
          <subject :addShow="true" />
        </div>
      </div>
      <div class="boxRight">
        <div class="table">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8;">
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">序号</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">资源名称</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">类型</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">功能</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">班级</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">来源</td>
                <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">操作</td>
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
                <td style="padding:10px;font-size:16px">{{item.className}}</td>
                <td style="padding:10px;font-size:16px">{{item.source}}</td>
                <td style="padding:10px;font-size:16px">
                  <span
                    class="el-icon-edit"
                    style="margin-right:5px;cursor:pointer"
                    @click="saveResearch(item)"
                  ></span>
                  <span class="el-icon-delete" style="cursor:pointer" @click="delteResearch(item)"></span>
                </td>
                <!-- <td style="padding:10px;font-size:16px" @click="delteResearch(item)">
                  <span class="el-icon-delete"></span>
                </td>-->
              </tr>
            </tbody>
          </table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            class="page"
            @current-change="changePage"
            style="color: #2ab8b3;"
          ></el-pagination>
          <!-- <paginationVue /> -->
        </div>
        <div class="function" v-if="pid">
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
            <el-select style="width:200px" v-model="gongneng" placeholder="请选择类型" @change="choore">
              <el-option
                v-for="item in choores"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
          <div class="name">
            <span style="color:#2fb6b5">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</span>
            <!-- <el-cascader :options="power" @change="handleChange"></el-cascader> -->
            <el-select v-model="classId" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="name">
            <div class="upRight" style="display:inline-block;flex:1">
              <span style="color:#2fb6b5">上传资源:</span>
              <input
                @change="uploadimg($event)"
                type="file"
                name="file"
                id="Album_img"
                accept="image/gif, image/jpeg, image/x-png"
              />
            </div>
          </div>
          <div>
            <el-button class="btfabu" @click="retearch">发布</el-button>
          </div>
        </div>
        <el-dialog
          title="编辑资源"
          destroy-on-close
          :visible.sync="dialogVisible"
          width="800px"
          :before-close="beforeFun"
        >
          <div class="function">
            <div class="name">
              <span style="color:#2fb6b5">资源名称：</span>
              <el-input v-model="detailData.name" placeholder="请输入内容" class="textName"></el-input>
            </div>
            <div class="name" style="padding:3px">
              <span style="color:#2fb6b5">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>

              <!-- <el-cascader :options="options" @change="handleChange"></el-cascader> -->
              <el-select v-model="detailData.type" placeholder="请选择类型" @change="handleChange">
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
              <el-select
                style="width:200px"
                v-model="detailData.function"
                placeholder="请选择类型"
                @change="choore"
              >
                <el-option
                  v-for="item in choores"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
            <!-- <div class="name">
            <span style="color:#2fb6b5">能力范围：</span>
            <el-cascader :options="power" @change="handleChange"></el-cascader>
            <el-select v-model="fanwei" placeholder="请选择类型" @change="choore">
              <el-option
                v-for="item in power"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            </div>-->
            <div class="name">
              <span style="color:#2fb6b5">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</span>
              <!-- <el-cascader :options="power" @change="handleChange"></el-cascader> -->
              <el-select v-model="detailData.classId" placeholder="请选择班级">
                <el-option
                  v-for="item in classList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div style="margin-left:40px;margin-top:30px">
              <p style="color:#2fb6b5">已上传资源：</p>
              <p
                style="color:#2fb6b5"
                class="imgItem"
                v-for="(item,index) in detailData.img"
                :key="index"
              >{{item.name}}</p>
              <!-- <p
                style="color:#2fb6b5;margin-top:15px"
                v-for="(item,index) in file_photourls"
                :key="index"
              >已上传视频：{{item.name}}</p>-->
            </div>
            <div class="name">
              <!-- <div class="upLeft" style="display:inline-block;flex:1">
                <span style="color:#2fb6b5">上传视频:</span>
                <input type="file" id="upload" @change="uploadVideo($event)" />
              </div>-->
              <div class="upRight" style="display:inline-block;flex:1">
                <span style="color:#2fb6b5">上传资源:</span>
                <input
                  @change="uploadimg($event)"
                  type="file"
                  name="file"
                  id="Album_img"
                  accept="image/gif, image/jpeg, image/x-png"
                />
              </div>
            </div>
            <!-- <div>
              <el-button class="btfabu" @click="saveResource">发布</el-button>
            </div>-->
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveResource">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import subject from "../../components/grade/subject";
import paginationVue from "../../components/pagination/pagination.vue";
// r富文本域
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Utils from "../../../static/js/util";
//
export default {
  inject: ["reload"],
  name: "resourceTools",
  components: {
    subject,
    quillEditor
  },
  data() {
    return {
      subjectName: sessionStorage.getItem("subjectName"),
      resourceId: "",
      detailData: {},
      dialogVisible: false,
      imgName: "",
      unitId: "",
      classes: "",
      classList: [],
      file_urls: [],
      classId: "",
      total: 1,
      resource: {
        leixing: "", //类型
        fanwei: "", //范围
        nengli: "", //能力
        gongneng: "", //功能
        input: ""
      },
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
          label: "课辅"
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
      pid: "", //章节ID
      chapterName: "", //章节名称
      target: "", //目标
      difficulty: "", //难点
      direction: "", //方向
      content: "", //内容
      pageNum: 1
    };
  },
  created() {
    this.getList();
    this.getClass();
    var that = this;
    Utils.$on("pid", function(msg) {
      that.textbookId = msg;
    });
    Utils.$on("getData", function(msg) {
      // console.log(msg);
      that.chapterName = msg.name;
      if (msg.unitIndex) {
        that.pid = msg.id;
        that.getList();
      } else {
        that.pid = "";
      }
    });
  },
  methods: {
    beforeFun() {
      this.file_urls = JSON.stringify([]);
      this.dialogVisible = false;
    },
    saveResearch(value) {
      this.resourceId = value.id;
      this.detailData = JSON.parse(JSON.stringify(value));
      typeof this.detailData.img == "string"
        ? (this.file_urls = [])
        : (this.file_urls = this.detailData.img);
      console.log(this.detailData);
      this.dialogVisible = true;
    },
    changePage(v) {
      this.pageNum = v;
      this.getList();
    },

    getclassId(v) {
      this.classId = v;
    },
    getClass() {
      this.$post("/user/classes/query", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        this.classList = res.data;
      });
    },
    //删除资源
    delteResearch(item) {
      console.log(item, "lxf");
      this.$confirm("此操作将删除此资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post("/user/teachersResources/delete", { id: item.id }).then(
          res => {
            // console.log(res);
            if (res.code == "5000") {
              this.$message({ type: "success", message: "删除成功" });
              this.reload();
            }
          }
        );
      });
    },
    //获取资源列表
    getList() {
      let data = {
        userId: sessionStorage.getItem("userId"),
        indexNo: this.pageNum,
        pid: this.pid,
        //   classId: this.classId,
        subjectId: sessionStorage.getItem("subjectId")
      };
      this.$get("/user/teachersResources/list", data).then(res => {
        this.list = res.data.date;
        for (let i of this.list) {
          console.log();
          i.img = JSON.parse(i.img);
        }
        //  console.log(this.list);
      });
    },
    //发布资源
    retearch() {
      if (!this.input) {
        this.$message.error("请输入资源名称");
        return false;
      }
      let data = {
        userId: sessionStorage.getItem("userId"),
        classId: this.classId,
        subjectId: sessionStorage.getItem("subjectId"),
        textbookId: this.textbookId,
        pid: this.pid,
        chapterName: this.chapterName,
        name: this.input,
        type: this.leixing,
        function: this.gongneng,
        ability: this.fanwei,
        source: sessionStorage.getItem("username"),
        video: this.file_photourls,
        img: JSON.stringify(this.file_urls),
        target: this.target,
        difficulty: this.difficulty,
        direction: this.direction,
        content: this.content
      };
      this.$post("/user/teachersResources/add", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "发布成功" });
          this.file_photourls = "";
          this.file_photourl = "";
          let obj = document.getElementById("Album_img");
          obj.outerHTML = obj.outerHTML;
          // let obj2 = document.getElementById("upload");
          // obj2.outerHTML = obj2.outerHTML;
          this.classId = "";
          this.input = "";
          this.leixing = "";
          this.gongneng = "";
          this.getList();
        }
      });
    },
    //保存资源
    saveResource() {
      let data = {
        id: this.resourceId,
        userId: sessionStorage.getItem("userId"),
        classId: this.detailData.classId,
        subjectId: sessionStorage.getItem("subjectId"),
        textbookId: this.textbookId,
        pid: this.pid,
        chapterName: this.chapterName,
        name: this.detailData.name,
        type: this.detailData.type,
        function: this.detailData.function,
        ability: this.detailData.fanwei,
        source: sessionStorage.getItem("username"),
        video: this.file_photourls,
        img: JSON.stringify(this.file_urls),
        target: this.target,
        difficulty: this.difficulty,
        direction: this.direction,
        content: this.content
      };
      this.$post("/user/teachersResources/update", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "修改成功" });
          this.file_urls = "";
          this.file_photourl = "";
          this.getList();
          this.dialogVisible = false;
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
      console.log(item);
      this.$router.push({
        path: "/homeCommon/ResourceDetails",
        query: {
          id: item.id,
          key: 2
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
            if (result.res.status == 200 && result.res.statusCode == 200) {
              //    self.$emit("input", result.res.requestUrls[0]);
              console.log(this.file_urls);
              this.file_photourl = result.res.requestUrls[0].split("?")[0];
              this.file_urls.push({ name: file.name, url: this.file_photourl });
              this.timenum1 = 100;
              clearInterval(this.time1);
              self.$message.success("上传成功");
              this.statetype = true;
            } else {
              event.target.value = "";
              self.$message.error("上传失败，请重新上传文件");
            }
          })
          .catch(function(err) {});
      }
    },
    //上传视频
    uploadVideo(event) {
      // this.loading();
      this.timenum1 = 0;
      // this.countDown1();
      var self = this;
      console.log(event);
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
      this.client.multipartUpload(file_name, file).then(result => {
        if (result.res.status == 200 && result.res.statusCode == 200) {
          self.$emit("input", result.res.requestUrls[0]);
          this.file_photourls = result.res.requestUrls[0].split("?")[0];
          //   console.log(this.file_photourls);

          // this.timenum1 = 100;
          // clearInterval(this.time1);
          self.$message.success("上传成功");
          //  this.createClassVideo();
        } else {
          event.target.value = "";
          self.$message.error("上传失败，请重新上传文件");
        }
      });
    }
  },
  watch: {
    "$store.state.resnav": "getNavType"
  }
};
</script>

<style lang="less" scoped>
.btfabu {
  margin-left: 460px;
  margin-top: 20px;
  width: 123px;
  height: 40px;
  border-radius: 4px;
  background-color: rgba(43, 183, 180, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.imgItem {
  cursor: pointer;
  // &:hover {
  //   text-decoration: underline;
  // }
}
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
        // padding: 5px;
        text-align: center;
        background-color: #2ab8b3;
        span {
          display: inline-block;
          padding: 10px;
          color: #fff;
          font-size: 16px;
        }
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
