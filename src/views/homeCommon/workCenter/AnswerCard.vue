<template>
  <div class="AnswerCard">
    <div class="box">
      <div class="left">
        <subjcet />
      </div>
      <div class="right">
        <div class="imgBox">
          <img
            src="../../../../static/images/作业列表.png"
            alt
            style="height:25px;float:left;margin-top:10px;"
          />
          <el-select
            v-model="className"
            placeholder="请选择班级"
            @change="changeClass"
            size="mini"
            style="margin-left:30px;margin-top:10px;width:150px;float:left"
          >
            <el-option
              v-for="(item, i) in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>

        <div class="table">
          <table>
            <thead>
              <tr style="background-color:#f8f8f8;">
                <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">作业名称</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">题型</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">作业类型</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">来源</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">状态</td>
                <td style="color:#fb8b22;font-size:16px;padding:5px">发布时间</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in workList"
                :key="index"
                style="margin-bottom:5px"
                class="trHover"
              >
                <td style="padding:10px;font-size:16px">{{ index + 1 }}</td>
                <td style="padding:10px;font-size:16px" @click="getquestiondeatil(item.id)">
                  <a href="javascript:void(0);">{{item.name}}</a>
                </td>
                <td style="padding:10px;font-size:16px">{{item.topic}}</td>
                <td style="padding:10px;font-size:16px">{{item.type}}</td>
                <td style="padding:10px;font-size:16px">{{item.source}}</td>
                <td style="padding:10px;font-size:16px">{{item.public==0?"未发布":"已发布"}}</td>
                <td style="padding:10px;font-size:16px">{{item.createTime}}</td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            @current-change="handleCurrentChanges"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total , prev, pager, next"
            :page-count="totalS"
          ></el-pagination>
        </div>
        <div class="wrongList" v-if="show">
          <div class="listBox" v-for="(item, index) in list" :key="index">
            <div class="listNumber">
              <span class="daoru">导入</span>
              <span style="color:#ffac67">编码:{{item.code}}</span>
            </div>
            <div class="listBody" v-html="item.content"></div>
            <div class="listBottom">
              <span>使用次数：25次</span>
              <span style="margin-left:33px">作答人数：255人</span>
              <el-button @click="addSpareQuestions(item.id)">+添加备用习题</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <knowledeg v-show="show2" :typeid="typeid" :zuoyeid="zuoyeid" />
    </div>
  </div>
</template>
<script></script>
<script>
import knowledeg from "../../../components/homeworkCenter/knowledge3";
import Utils from "../../../../static/js/util";
import subjcet from "@/components/grade/subject.vue";
export default {
  components: {
    subjcet,
    knowledeg
  },
  data() {
    return {
      show2: false,
      list: [],
      currentPage: 1,
      classId: "",
      className: "",
      classList: [], //班级列表
      workList: [],
      show: false,
      totalS: "",
      pids: "",
      typeid: "",
      zuoyeid: ""
    };
  },
  created() {
    var that = this;
    that.getclassList();
    this.getWorkList();

    Utils.$on("getData", function(msg) {
      that.pids = msg.id;
      //获取作业列表
      that.getWorkList();
    });
  },
  methods: {
    //添加相似题型
    addSpareQuestions(id) {
      this.typeid = id;
      this.show2 = true;
      this.show = false;
    },
    //查询作业详情
    getquestiondeatil(id) {
      // 作业id
      this.zuoyeid = id;
      this.$get("user/homework/findById", { id: id }).then(res => {
        if (res.code == 5000) {
          this.list = res.data.list;
          this.showBox();
        }
      });
    },
    handleCurrentChanges(val) {
      // this.currentPage = val;
      this.getWorkList();
    },
    changeClass(e) {
      this.classId = e;
      this.getWorkList();
    },
    //获取作业列表
    getWorkList() {
      let data = {
        pid: this.pids,
        rows: 10,
        indexNo: this.currentPage,
        subjectId: sessionStorage.getItem("subjectId")
      };
      if (this.classId != 0) {
        data.classId = this.classId;
      }
      this.$get("/user/homework/findListByPid", data).then(res => {
        this.workList = res.data.date;
        this.totalS = Number(res.data.count);
      });
    },
    //获取班级列表
    getclassList() {
      let data = { userId: sessionStorage.getItem("userId") };
      this.$post("/user/classes/query", data).then(res => {
        if (res.code == "5000") {
          this.classList = res.data;
          //  this.getTeam();
        }
      });
    },
    showBox() {
      this.show = true;
    }
  }
};
</script>
<style lang="less">
.AnswerCard {
  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    position: relative;
    .left {
      width: 18%;
      margin-right: 10px;
    }
    .right {
      background-color: #fff;
      flex: 1;
      .wrongList {
        background-color: #fff;
        border-top: 10px solid #eee;
        padding: 30px;

        .listBox {
          border: 1px solid #2bb7b3;
          margin-bottom: 20px;
          .listNumber {
            padding-top: 3px;
            box-sizing: border-box;
            height: 29px;
            border-bottom: 1px solid #eee;
            .daoru {
              background-color: #ff8a00;
              box-shadow: 3px 3px 0px 0px #ffdcb2, 3px 3px 0px 0px #ffdcb2;
              color: #fff;
              padding: 3px;
            }
          }
          .listBottom {
            height: 56px;
            background-color: #f5f5f5;
            line-height: 56px;
            padding: 0px 24px;
            button {
              margin-left: 55%;
              border: 0;
              background-color: #2bb7b3;
              color: #fff;
            }
          }
        }
      }
      .imgBox {
        img {
          margin-top: 10px;
        }
      }
      .table {
        width: 100%;
        //  height: 50%;
        margin: 0 auto;
        text-align: center;
        // border: 1px solid #2ab8b3;
        //  margin-bottom: 15px;
        border-bottom: 10px solid #f8f8f8;
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
