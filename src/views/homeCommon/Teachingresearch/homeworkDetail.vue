<template >
  <div class="homeworkDetail" style="background:#fff">
    <div class="title">{{homeName}}</div>
    <goBack
      style="text-align:center"
      :direction="true"
      link="/homeCommon/TeachingResearch/homeworkResearch"
      :queryData="{id:$route.query.researchId}"
    ></goBack>
    <p style="magin-left:20px;color:red; text-align: center;margin-bottom:10px">
      <span>作业编码：{{code}}</span>
    </p>
    <div class="workBox" v-for="(item,index) in homeworkList" :key="index">
      <div class="workTitle">
        <span class="code">此题编码:{{item.code}}</span>
        <div class="workRight">
          <div>
            <span>分值:</span>
            <span style="color:red">{{item.score }}</span>
          </div>
          <el-button v-if="item.state==0" type="text">已收藏</el-button>
          <el-button v-if="item.state==1" type="text" @click="collection(item)">收藏</el-button>
          <el-button type="text" @click="addExercises(item)">添加备用题</el-button>
          <el-button type="text" @click="seeSpare(item.id)">查看备用题</el-button>
        </div>
      </div>
      <div class="workConten">
        <span class="conten">
          <span v-if="item.content.length<1">{{item.content}}</span>
          <span v-if="item.content.length>1">
            <span v-html="item.content"></span>
          </span>
          <span></span>
        </span>
      </div>
    </div>
    <div class="show" v-if="showBox">
      <div class="showItem">
        <span style="margin-right:10px">选择班级</span>
        <el-select
          v-model="ruleForm2.classIdList"
          placeholder="请选择班级"
          @change="changeClass"
          size="mini"
        >
          <el-option
            v-for="(item, i) in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span style="margin-right:10px">选择组别</span>
        <el-select
          v-model="ruleForm2.classTeamList"
          placeholder="请选择组别"
          multiple
          size="mini"
          @change="getTeamId"
        >
          <el-option
            v-for="(item, i) in teamList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span style="margin-right:10px">学生自批</span>
        <el-select
          v-model="workKnow.label"
          placeholder="请选择作业类型"
          @change="choosecanCorrect"
          size="mini"
        >
          <el-option
            v-for="item in workKnow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="showItem">
        <span>最晚提交</span>
        <el-date-picker
          style="dislpay:inline-block;margin-left:6px"
          v-model="ruleForm2.chooresTime"
          type="datetime"
          placeholder="选择日期时间"
          @change="getTime"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
      <div class="showItem">
        <el-button
          size="mini"
          style="border:0;margin-left:47%;display:inline-block"
          type="warning"
          @click="showBox=false"
        >取消</el-button>
        <el-button
          size="mini"
          style="background-color:#f25c29;color:#fff;border:0;display:inline-block"
          @click="questions('ruleForm2', '0')"
        >确认</el-button>
      </div>
    </div>
    <el-button style="margin-left:600px;" v-if="state==1?true:false" @click="showBox=true">发布</el-button>
    <el-dialog title="备用题" :visible.sync="dialogTableVisible" width="1000px">
      <div class="workBox" v-for="(item,index) in spareList" :key="index">
        <div class="workTitle">
          <div class="workRight">
            <div>
              <span>分值:</span>
              <span style="color:red">{{item.score }}</span>
            </div>
          </div>
          <el-button type="text" style="float:right" @click="deleteSpare(item)">删除备用题</el-button>
        </div>
        <div class="workConten">
          <span class="conten">
            <span v-if="item.content.length<1">{{item.content}}</span>
            <span v-if="item.content.length>1">
              <span v-html="item.content"></span>
            </span>
            <span></span>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import goBack from "@/components/common/goBack";
export default {
  components: { goBack },
  data() {
    return {
      dialogTableVisible: false,
      teamId: "",
      classIds: "",
      canCorrect: "",
      ruleForm2: {
        classIdList: [],
        classTeamList: [],
        label: "",
        chooresTime: ""
      },
      chooresTime: "", //选择时间
      workKnow: [
        { label: "是", value: "1" },
        { label: "否", value: "2" }
      ],
      teamList: [], //小组
      classList: [], //班级数据
      showBox: false,
      homeworkList: [],
      spareList: [],
      homeName: "",
      code: "",
      state: this.$route.query.state
    };
  },
  created() {
    this.getDetail();
    // this.getclassList();
    // this.getTeam();
  },
  methods: {
    //     homeworkId	是	Long	作业id
    // classId	是	Long	班级id
    // groupIds	是	String	分组ids (1,2,3)
    // canCorrect	是	int	1-可自批 2-不可自批
    // lastSubmitTime
    collection(value) {
      this.$post("/user/homework/insertOneSelf", {
        id: value.id,
        type: 2
      }).then(res => {
        if (res.code == "5000") {
          this.getDetail();
          this.$message.success("收藏成功");
        }
      });
    },
    seeSpare(value) {
      if (value) {
        this.seeId = value;
      }
      this.$get("user/research/question/findSameById", { id: value }).then(
        res => {
          if (res.code == "5000") {
            this.spareList = res.data;
            this.dialogTableVisible = true;
          }
        }
      );
    },
    addExercises(value) {
      this.$router.push({
        path: "/homeCommon/Teachingresearch/addSpare",
        query: { id: value.id }
      });
    },
    questions(form, e) {
      let data = {
        homeworkId: this.$route.query.id,
        classId: this.classIds, //班级id
        groupIds: this.teamId, //小组id
        canCorrect: this.canCorrect, //是否自批
        lastSubmitTime: this.ruleForm2.chooresTime //最晚提交时间
      };
      this.$post("/user/homework/publish", data).then(res => {
        if (res.code == 5000) {
          this.$message({
            type: "success",
            message: "发布成功"
          });
          this.$router.push({
            path: "/homeCommon/workCenter",
            query: {
              flag: 3
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "发布失败"
          });
        }
      });
      this.showBox = false;
    },

    //获取小组Id
    getTeamId(e) {
      this.teamId = e.join(",");
    },
    //选择是否可以自批
    choosecanCorrect(v) {
      this.canCorrect = v;
    },
    //选择时间
    getTime(value) {
      // console.log(value);
      this.ruleForm2.chooresTime = value;
    },
    // 获取班级Id
    changeClass(e) {
      this.classIds = e;
      this.getTeam();
    },

    // 获取班级小组
    getTeam(e) {
      let data = {
        userId: sessionStorage.getItem("userId"),
        classId: this.classIds
      };
      this.$post("/user/group", data).then(res => {
        this.teamList = res.data.children;
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
    deleteSpare(value) {
      this.$post("/user/research/question/deleteSameQuestion", {
        id: value.id
      }).then(res => {
        if (res.code == 5000) {
          this.$message({ type: "success", message: "删除备用题成功" });
          this.seeSpare(this.seeId);
        }
      });
    },
    getDetail() {
      this.$get("/user/research/homework/findById", {
        id: this.$route.query.id
      }).then(res => {
        this.homeworkList = res.data.list;
        this.homeName = res.data.name;
        this.code = res.data.code;
        //console.log(res.data);
      });
    }
  }
};
</script>
<style lang="less">
.homeworkDetail {
  .workRight {
    display: flex;
    width: 260px;
    align-items: center;
    justify-content: space-between;
  }
  .show {
    position: absolute;
    width: 375px;
    padding-bottom: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%;-50%);
    background-color: #fff;
    z-index: 100;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
    .showItem {
      margin: 20px 20px 10px 55px;
    }
  }
  .mt72 {
    height: 100%;
    // background-color: #fff;
  }
  .title {
    height: 78px;
    text-align: center;
    font-size: 22px;
    color: #f25c29;
    line-height: 78px;
  }
  .workBox {
    width: 858px;
    min-height: 250px;
    border: 0.018519rem dashed #bbbbbb;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 20px;
    .workConten {
      padding-top: 15px;
      min-height: 180px;
      width: 100%;
      overflow: visible;
      .conten {
        display: inline-block;
        width: 88%;
        height: 70%;
        padding: 20px;
      }
    }
    .workTitle {
      height: 60px;
      border-bottom: 1px dashed #eee;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .daoru {
        font-size: 14px;
        color: #fff;
        background-color: #2bb7b3;
        padding: 2px 4px;
      }
      .code {
        color: rgb(251, 139, 34);
        font-size: 14px;
      }
    }
  }
}
</style>