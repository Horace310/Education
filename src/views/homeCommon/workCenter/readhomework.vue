<template>
  <div>
    <div class="outter">
      <div style="border-bottom:1px solid #e8e8e8;padding-bottom:15px;margin-bottom:15px">
        <el-button @click="re_back" size="mini" class="mybt">返回</el-button>
        <div v-if="oneTeam.state==2" style="color:red;display:inline-block;margin-left:25px;">
          <span>已批改</span>
          <span>得分：{{totalScore}}分</span>
        </div>
        <el-button
          v-if="isCorrection&&oneTeam.state!=2"
          type="primary"
          size="mini"
          @click="finishScore"
          style="margin-top:10px"
        >完成批阅</el-button>
        <!-- <span
          @click="finishScore"
          v-if="allSuccess"
          style="color:rgb(242, 92, 41);margin-left:15px;margin-top:5px"
        >完成批阅</span>-->
      </div>
      <div style="margin-left:30px;">
        <el-badge
          :value="listnum[item.id-1]"
          type="primary"
          v-for="item in typetixin"
          :key="item.id"
          style="margin-left:30px;"
        >
          <el-button
            size="mini"
            :type="active==item.id?'success':''"
            @click="changetype(item.id)"
          >{{item.name}}</el-button>
        </el-badge>
      </div>
      <div
        v-for="(item,index) in typetixinTO"
        :key="index"
        style="margin-left:30px;margin-top:30px;margin-bottom:20px;"
      >
        <el-button
          size="mini"
          :type="active_==index?'success':''"
          @click="changetypeTO(index)"
          style="float:left;margin-left:30px;margin-bottom:20px;"
        >第{{index+1}}题</el-button>
      </div>
      <div class="question" v-if="oneTeam==''||oneTeam==undefined?false:true">
        <div style="float: left;width:60%">
          <span>此题编码：{{oneTeam.code}}</span>
          <span style="margin-left:30px;">分值：{{oneTeam.score}}分</span>
          <div v-html="oneTeam.content"></div>
          <div v-show="showanswer" v-html="oneTeam.answer"></div>
          <div>
            <span style="color:#2bb7b3;display:block">学生回答:</span>
            <div
              style="border:1px solid #e8e8e8;width:600px;min-height:50px;padding:10px"
              v-html="oneTeam.studentAnswer"
            ></div>
            <!-- <el-input
              style="width:600px;"
              type="textarea"
              :rows="3"
              placeholder="学生回答"
              :disabled="true"
              v-model="oneTeam.studentAnswer"
            ></el-input>-->
            <span v-if="oneTeam.state!=0&&oneTeam.state" style="color:#2bb7b3;display:block">教师评分:</span>
            <el-select
              v-model="teacherNumber"
              placeholder="请选择分数"
              filterable
              v-if="oneTeam.state!=0&&oneTeam.state"
              :disabled="(oneTeam.studentScore==0?!oneTeam.studentScore:oneTeam.studentScore)"
              style="width:600px;"
            >
              <el-option
                v-for="index of oneTeam.score+1"
                :key="index-1"
                :label="index-1"
                :value="index-1"
              ></el-option>
            </el-select>
            <div
              style="margin-top:20px;"
              v-if="oneTeam.type!='keguan'&&oneTeam.state==1&&!(oneTeam.studentScore==0?!oneTeam.studentScore:oneTeam.studentScore)"
            >
              <el-button @click="toEvaluate(oneTeam,teacherNumber)" size="mini" type="success">提交</el-button>
            </div>
          </div>
        </div>

        <div style="float: left;width:40%">
          <span style="cursor: pointer;" class="jiexi" @click="showanswer=!showanswer">显示答案解析</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalScore: "",
      isCorrection: true,
      teacherNumber: "",
      showanswer: false,
      active_: 0,
      active: 1,
      id: this.$route.query.sid,
      wokrId: this.$route.query.wokrId,
      homeworkList: [],
      teachertAnswer: [],
      typetixin: [
        { id: 1, name: "全部" },
        { id: 2, name: "主观" },
        { id: 3, name: "客观" }
      ],
      zhuguan: [],
      keguan: [],
      listnum: [],
      typetixinTO: [],
      oneTeam: {
        code: "",
        score: "",
        content: ""
      }
    };
  },
  created() {
    // 默认回到页面顶部
    window, scrollTo(0, 0);
    console.log(this.id, this.wokrId);
    this.getHomeworkDetail();
  },
  methods: {
    re_back() {
      this.$router.push({
        path: "/homeCommon/workCenter/SharingTearch",
        query: {
          flag: 3,
          classid: this.$route.query.classid,
          wokrId: this.$route.query.wokrId
        }
      });
    },
    changetypeTO(id) {
      this.active_ = id;
      this.oneTeam = this.typetixinTO[id];
      if (this.oneTeam) {
        this.teacherNumber = this.oneTeam.studentScore;
      }
    },
    toEvaluate(value, index) {
      let data = { id: value.id, score: this.teacherNumber };
      this.$post("/user/homework/giveScore", data).then(res => {
        if (res.code == "5000") {
          this.getHomeworkDetail();
          this.$message({ type: "success", message: "完成评分" });
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    finishScore() {
      this.$post("/user/homework/finishScore", {
        id: this.wokrId,
        userId: this.id
      }).then(res => {
        if (res.code == 5000) {
          this.$message({ type: "success", message: "完成批改成功" });
          this.getHomeworkDetail();
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    changetype(id) {
      this.active_ = 0;
      this.active = id;
      if (id == 1) {
        this.typetixinTO = this.homeworkList;
      } else if (id == 2) {
        this.typetixinTO = this.zhuguan;
      } else {
        this.typetixinTO = this.keguan;
      }
      this.changetypeTO(0);
    },
    //获取学生作业详情
    getHomeworkDetail(id) {
      this.$get("/user/homework/findHomeworkCorrectDetail", {
        id: this.wokrId,
        userId: this.id
      }).then(res => {
        if (res.code == "5000") {
          console.log(res.data);
          this.homeworkList = res.data;
          // // 一、X 题目类型 T填空 X选择 J简答 D多选 P判断 Z主观
          var zhuguan = [];
          var keguan = [];
          if (this.homeworkList.length != 0) {
            this.homeworkList.forEach(item => {
              // console.log(item.code[0],item.code)
              console.log(item.code[0]);
              if (item.code[0] == "X") {
                item.type = "keguan";
                keguan.push(item);
              } else {
                zhuguan.push(item);
              }
            });
          }
          this.zhuguan = zhuguan;
          console.log(
            this.zhuguan.find(
              item =>
                !(item.studentScore == 0
                  ? !item.studentScore
                  : item.studentScore)
            )
          );
          if (
            this.zhuguan.find(
              item =>
                !(item.studentScore == 0
                  ? !item.studentScore
                  : item.studentScore)
            )
          ) {
            this.isCorrection = false;
          } else {
            this.isCorrection = true;
          }
          console.log(this.zhuguan);
          this.keguan = keguan;
          console.log(
            this.keguan.find(item =>
              item.studentScore == 0 ? !item.studentScore : item.studentScore
            )
          );
          // if (
          //   this.keguan.find(item =>
          //     item.studentScore == 0 ? !item.studentScore : item.studentScore
          //   )
          // ) {
          //   this.isCorrection = false;
          // }
          this.listnum.push(
            this.homeworkList.length,
            this.zhuguan.length,
            this.keguan.length
          );
          this.typetixinTO = this.homeworkList;
          this.oneTeam = this.typetixinTO[0];
          this.active = 1;
          if (this.oneTeam.state == 2) {
            console.log(this.typetixinTO);
            this.totalScore = this.typetixinTO.reduce((prev, cur) => {
              return prev + cur.studentScore;
            }, 0);
          }
          if (
            this.oneTeam.studentScore == 0
              ? !this.oneTeam.studentScore
              : this.oneTeam.studentScore
          ) {
            this.teacherNumber = this.oneTeam.studentScore;
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.mybt {
  margin-left: 30px;
  margin-top: 10px;
}
.outter {
  height: 1300px;
  width: 1300px;
  background-color: white;
  margin-bottom: 50px;
}
.question {
  // position:absolute;
  margin-top: 100px;
  margin-left: 60px;
}
.jiexi {
  width: 128px;
  height: 35px;
  border-radius: 4px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>