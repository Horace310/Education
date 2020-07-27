<template>
  <div class="mt72">
    <div class="breaks" style="height:40px"></div>
    <div class="myBox">
      <div class="myBoxLeft">
        <subject ref="subject" :inputtext="cyid" :inputtext2="AnyoneFlag" />
        <div class="myBtn">
          <el-button
            size="small"
            class="elbtn"
            @click="toResearchHomework"
            :disabled="unitId?false:true"
            type="primary"
          >新增作业</el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="unitId?false:true"
            class="elbtn"
            @click="addResource= true"
          >新增资源</el-button>
        </div>
      </div>
      <div class="myBoxRight">
        <goBack :direction="true" link="/homeCommon/TeachingResearch" :queryData="{id:researchId}"></goBack>
        <div class="tupuBox">
          <div class="tupuShow" style="position:relative">
            <!-- views\homeCommon\Teachingresearch\homeworkResearch.vue -->
            <el-button
              size="mini"
              style="margin:10px 0 0 10px;"
              :disabled="!chartVisible"
              :type="!chartVisible==true?'':'success'"
              @click="chartVisible_=true"
            >作业收藏</el-button>
            <el-tooltip class="item" effect="light" content="请选定作业单元" placement="top-start">
              <img
                src="../../../assets/1728.png"
                alt
                width="21px"
                height="21px"
                style="margin-left:10px;margin-top:2px;"
              />
              <!-- <i class="el-icon-chat-line-round" style="cursor: pointer"  ></i> -->
            </el-tooltip>
            <Reminder />
            <sb ref="sb" :inputtext="cyid" :inputtext2="AnyoneFlag" @chartVisibles="chartVisibles" />
          </div>
        </div>
        <div class="titleBox">
          <p style="border-bottom:1px solid #d5efe6">
            <span style="padding:5px;background-color:#149385;color:#fff">成员列表</span>
          </p>
          <div class="myListBox">
            <div
              class="listBox"
              v-for="item in list1"
              :key="item"
              @click="changeid(item.userId)"
              style="cursor:pointer;"
            >
              <img :src="item.img" alt />
              <span>{{item.username}}</span>
            </div>
          </div>
          <div class="titleImgBox">
            <img src="../../../../static/images/作业列表.png" alt />
            <!-- <el-button
              @click="toResearchHomework"
              size="mini"
              style=" background-color: #139583;color:#fff;margin-top: 19px;margin-left:21px"
            >新增作业</el-button>-->
          </div>
          <div class="table">
            <table>
              <thead>
                <tr style="background-color:#f8f8f8;">
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">序号</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">作业名称</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">展示类型</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">作业类型</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">来源</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">时间</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in wokrList"
                  :key="index"
                  style="margin-bottom:5px"
                  class="trHover"
                >
                  <td style="padding:10px;font-size:16px">{{ index + 1 }}</td>
                  <td style="padding:10px;font-size:16px">
                    <a href="javascript:void(0);" @click="toDetail(item)">{{item.name}}</a>
                  </td>
                  <td style="padding:10px;font-size:16px">{{item.showType}}</td>
                  <td style="padding:10px;font-size:16px">{{item.type}}</td>
                  <td style="padding:10px;font-size:16px">{{item.username}}</td>
                  <td style="padding:10px;font-size:16px">{{item.createTime}}</td>
                  <td style="padding:10px;font-size:16px" @click="deleteWork(item)">
                    <span class="el-icon-delete"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <el-pagination
              layout="prev, pager, next"
              :total="workTotal"
              class="page"
              style="color: #2ab8b3;"
              @current-change="changePage"
            ></el-pagination>
            <!-- <paginationVue /> -->
          </div>
          <div class="titleImgBox" style="border-top:10px solid #eee;">
            <img src="../../../../static/images/资源列表.png" alt />
            <!-- <el-button
              @click="toTools"
              size="mini"
              style=" background-color: #139583;color:#fff;margin-top: 19px;margin-left:21px"
            >新增资源</el-button>-->
          </div>
          <div class="table" id="tableLink">
            <table>
              <thead>
                <tr style="background-color:#f8f8f8;">
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">序号</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">资源名称</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">类型</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">功能</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">能力范围</td>
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
                  <td style="padding:10px;font-size:16px">{{item.ability}}</td>
                  <td style="padding:10px;font-size:16px">{{item.source}}</td>
                  <td style="padding:10px;font-size:16px" @click="delteResearch(item)">
                    <span class="el-icon-delete"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <el-pagination
              layout="prev, pager, next"
              :total="total2"
              class="page"
              style="color: #2ab8b3;"
              :page-count="count"
              @current-change="changeNum"
            ></el-pagination>
            <!-- <paginationVue /> -->
            <el-dialog
              :title="'添加资源'+titles"
              destroy-on-close
              :visible.sync="addResource"
              width="700px"
              :before-close="beforeFun"
            >
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
                  <el-select
                    style="width:200px"
                    v-model="gongneng"
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
                <div class="name">
                  <span style="color:#2fb6b5">能力范围：</span>
                  <!-- <el-cascader :options="power" @change="handleChange"></el-cascader> -->
                  <el-select v-model="fanwei" placeholder="请选择类型">
                    <el-option
                      v-for="item in power"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </div>
                <div class="name" style="width:100%;text-align:start;margin-left:25px">
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
                <div style="margin:40px auto 10px">
                  <el-button class="btfabu" @click="retearch">发布</el-button>
                </div>
              </div>
            </el-dialog>
            <el-dialog :title="'添加单元   '+titles" :visible.sync="chartVisible_" width="500px">
              {{collectData.name}}
              <!-- <el-checkbox-group v-model="danyuan" @change="handleCheckedCitiesChange">
                <el-checkbox
                  v-for="(item,index) in zhangjie"
                  :label="index"
                  :key="index"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>-->
              <div slot="footer" class="dialog-footer">
                <el-button @click="chartVisible_ = false,edit2()">取 消</el-button>
                <el-button type="primary" @click="chartVisible_ = false,edit_()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject from "../../../components/grade/subjects.vue";
import sb from "../../../views/homeCommon/resourceTools/sbss";
import Utils from "../../../../static/js/util";
import goBack from "../../../components/common/goBack";
import Reminder from "../../../components/common/jyreminder";
export default {
  inject: ["reload"],
  components: {
    subject,
    sb,
    goBack,
    Reminder
  },
  data() {
    return {
      timenum1: 0,
      input: "",
      leixing: "",
      gongneng: "",
      classId: "",
      client: null,
      collectData: {},
      titles: "",
      isIndeterminate: true,
      addResource: false,
      zhangjie: "",
      danyuan: [],
      chartVisible_: false,
      chartVisible: false,
      cyid: "",
      list1: [],
      list: [],
      lists: [1, 1, 1, 1, 1, 1, 1, 1],
      wokrList: [],
      researchId: "",
      total: 1,
      pageNum: 1,
      countPage: 1,
      workTotal: 1,
      total2: 1,
      count: 1,
      AnyoneFlag: true,
      superList: {},
      unitId: "",
      pids: "",
      file_photourl: [],
      file_urls: [],
      classList: [],
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
      ]
    };
  },
  created() {
    sessionStorage.setItem("rid", this.$route.query.id);
    this.getClass();
    this.getResearch();
    this.getWorkList();
    this.selectJiaoyanzhu();
    const that = this;
    Utils.$on("getData", function(msg) {
      that.pids = msg.id;
      that.getResearch();
      that.getWorkList();
      that.findTitle(msg);
    });
  },
  // watch:{
  //   zhangjie:function(val){
  //     console.log(val.length)
  //       if(val.length==0){
  //         this.chartVisible=false;
  //       }
  //   }
  // },
  methods: {
    beforeFun() {
      this.file_urls = JSON.stringify([]);
      this.addResource = false;
    },
    getClass() {
      this.$post("/user/classes/query", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        this.classList = res.data;
      });
    },
    retearch() {
      let data = {
        rid: this.$route.query.id,
        textbookId: this.textbookId,
        pid: this.pids,
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
      this.$post("/user/resources/add", data).then(res => {
        if (res.code == "5000") {
          this.$message({ tyepe: "success", message: "发布成功" });
          this.addResource = false;
          document.getElementById(`tableLink`).scrollIntoView();
          this.input = "";
          this.leixing = "";
          this.gongneng = "";
          this.fanwei = "";
          this.getResearch();
        }
      });
    },
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
    recursion(list, id, value) {
      let isFind;
      if (list.children) {
        for (let o = 0; o < list.children.length; o++) {
          if (list.children[o].id == id) {
            isFind = true;
            sessionStorage.setItem("section", list.name);
            sessionStorage.setItem("chapterName", value.name);
            sessionStorage.setItem("sectionId", list.id);
            break;
          } else {
            this.recursion(list.children[o], id, value);
          }
        }
      }
      return isFind;
    },
    findTitle(msg) {
      let newList = JSON.parse(JSON.stringify(this.$refs.subject.data));
      if (msg.unitIndex) {
        this.unitId = msg.id;
        for (let i = 0; i < newList.length; i++) {
          if (this.recursion(newList[i], msg.id, newList[i], true)) {
            break;
          }
        }
        sessionStorage.setItem("unitName", msg.name);
      } else {
        this.unitId = "";
      }
    },
    edit2() {
      this.zhangjie = "";
      this.chartVisible = false;
    },
    edit_() {
      console.log(this.collectData);
      console.log(this.superList);
      var children = [this.collectData.id];
      // if (this.danyuan.length != 0) {
      //   this.danyuan.forEach(element => {
      //     var test = this.superList.data.children[element];
      //     children.push(test.id);
      //   });
      // }

      let data = {
        name: this.superList.data.name,
        id: this.superList.data.id.toString(),
        userId: sessionStorage.getItem("userId"),
        children: [this.collectData.id]
      };

      if (children.length != 0) {
        //
        console.log(data, "data");
        this.$post("/user/resear/copyNode", data).then(response => {
          if (response.code == 5000) {
            this.$message({ type: "success", message: "收藏成功" });
          } else {
            this.$message({ type: "success", message: response.message });
          }
        });
      }
      this.zhangjie = "";
      this.chartVisible = false;
    },
    chartVisibles(val) {
      console.log(val);
      this.chartVisible = val.flag;
      this.superList = val;
      this.collectData = val.data;
      // console.log(this.superList, "this.superList");
      // var flag = val.flag;
      // var data = [{ name: val.data.name }];
      // console.log(data);
      // // var data = val.data2.children;
      // this.zhangjie = data;
      // this.chartVisible = flag;
      // var title = val.data.name;
      // this.titles = title;
    },

    handleCheckedCitiesChange(val) {
      console.log(val, "handleCheckedCitiesChange");
      console.log(this.danyuan);
    },
    changeid(key) {
      this.AnyoneFlag = false;
      this.$refs.subject.queryTestBookDetailUser(key);
      this.$refs.sb.queryTestBookDetailUser(key);
      return;
      // this.cyid = key;
    },
    // /user/researchTeacher/query
    //查询教研组成员
    selectJiaoyanzhu() {
      this.$post("/user/researchTeacher/query", {
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 5000) {
          this.list1 = res.data;
        }
      });
    },

    changeNum(v) {
      this.countPage = v;
    },
    changgeNum(v) {
      this.pageNum = v;
      this.getResearch();
    },
    changePage(v) {
      //   console.log(v);
      this.countPage = v;
      this.getWorkList();
    },
    //删除资源
    delteResearch(item) {
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
              this.getResearch();
            } else if (res.data.code == "5006") {
              this.$message.error("你没有权限删除该资源");
            } else {
              this.$message.error(res.message);
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
    //删除题目
    deleteWork(item) {
      // console.log(item.id);
      this.$confirm("此操作将删除此作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/user/research/homework/delete?id=" + item.id)
            .then(res => {
              console.log(res);
              if (res.data.code == "5000") {
                this.$message({ type: "success", message: "删除成功" });
                this.getWorkList();
              } else if (res.data.code == "5006") {
                this.$message.error("你没有权限删除该作业");
              } else {
                this.$message.error(res.message);
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
    toDetail(item) {
      this.$router.push({
        path: "/homeCommon/TeachingResearch/researchHomeworkDeatil",
        query: {
          researchId: this.$route.query.id,
          id: item.id
        }
      });
    },
    getWorkList() {
      let data = {
        pid: this.pids,
        rid: this.$route.query.id,
        userId: sessionStorage.getItem("userId"),
        indexNo: this.countPage,
        rows: 10
      };
      this.$get("/user/research/homework/findListByPid", data).then(res => {
        if (res.code == "5000") {
          this.wokrList = res.data.date;
          this.workTotal = res.data.total;
          //  console.log(this.wokrList);
        }
      });
    },
    toResourceDetail(item) {
      this.$router.push({
        path: "/homeCommon/ResourceDetails",
        query: {
          id: item.id,
          rid: this.$route.query.id,
          key: 3
        }
      });
    },
    getResearch() {
      // /user/resources/list
      this.$get("/user/resources/list", {
        id: this.$route.query.id,
        indexNo: this.countPage,
        pid: this.pids
        // indexNo: this.pageNum
      }).then(res => {
        if (res.code == "5000") {
          this.total2 = res.data.total;
          this.list = res.data.date;
        }
      });
    },
    toResearchHomework() {
      this.$router.push({
        path: "/homeCommon/TeachingResearch/addHomeWork",
        query: {
          id: this.researchId,
          pid: this.pids
        }
      });
    },
    toTools() {
      this.$router.push({
        path: "/homeCommon/TeachingResearch/researchResourceTool",
        query: {
          id: this.$route.query.id,
          pid: this.pids
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.function {
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
.myBox {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .breaks {
    width: 100%;
    height: 40px;
    background-color: #f8f8f8;
  }

  .myBoxLeft {
    width: 270px;
    display: inline-block;
    border-right: 10px solid #eee;
    .myBtn {
      margin-left: 20px;
      .elbtn {
        // border: 0;
        // margin: 0 auto;
        // margin-bottom: 20px;
        // background-color: #139583;
        // color: #fff;
        // display: block;
      }
    }
  }
  .myBoxRight {
    flex: 1;
    width: 1020px;
    display: inline-block;
    .tupuBox {
      width: 100%;
      padding: 40px;
      box-sizing: border-box;
      border-bottom: 10px solid #eee;
      .tupuShow {
        width: 100%;
        border: 1px solid #eee;
        height: 720px;
      }
    }
    .titleBox {
      padding: 10px 10px 0px 10px;

      .myListBox {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 10px solid #f8f8f8;
        .listBox {
          width: 16.5%;
          height: 160px;
          text-align: center;
          //   border-bottom: 1px solid #eee;
          //   border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto;
            display: block;
            margin-top: 30px;
            margin-bottom: 10px;
          }
        }
      }
      .titleImgBox {
        height: 50px;
        img {
          margin-top: 15px;
        }
        .change {
          color: #fa9220;
          border: 1px solid #fa9220;
          float: right;
          margin-top: 15px;
          margin-right: 10px;
        }
      }
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        //  border: 1px solid #2ab8b3;
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
    }
  }
}
</style>