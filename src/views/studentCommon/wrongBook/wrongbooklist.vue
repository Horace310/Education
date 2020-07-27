<template >
  <div class="mt72">
    <div class="myBox">
      <div class="boxLeft">
        <div class="xueke">
          <div class="sujects">
            <el-select
              v-model="value"
              placeholder="请选择学科"
              @change="getSubjectId"
              style="margin-top:15px;height:54px;width:154px;margin-left:30px;"
            >
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="subject">
            <subject />
          </div>
        </div>
      </div>
      <div class="boxRight">
        <div class="myImg">
          <span class="titlesss">{{typename}}</span>

          <!-- <span
            v-on:click="back"
            style="display: inline-block;border: 1px solid #eee;padding:6px 10px;cursor: pointer;float: right;margin: 0 20px 0 0;"
          >返回</span>-->
        </div>

        <div class="testBox">
          <div class="testLeft">
            <div v-for="(itemed,indexd) in zhangFault" :key="indexd" class="work">
              <div class="workConten">
                <p class="number workTitle">{{indexd+1}}.编号:{{itemed.code}}</p>
                <div style="margin-top:10px">
                  <span class="contens">
                    <!--                          <span>{{ itemed.typeName }}：</span>-->
                    <span v-html="itemed.content"></span>
                  </span>
                </div>
              </div>
              <!-- style="background-color:#fb8b22;color:#fff;margin-top:3px;margin-left:90%" -->
              <div class="answerBtn">
                <el-button
                  size="mini"
                  style="margin-top:3px;margin-left:90%"
                  @click="addTest(itemed,indexd)"
                >加入错题篮</el-button>
              </div>
            </div>

            <!--            <img src="../../../static/images/test.png" alt />-->
          </div>
        </div>
        <div class="basket">
          <basket />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import basket from "@/components/homeworkCenter/basket";
import subject from "../../../components/grade/subject";
import Utils from "../../../../static/js/util";
export default {
  components: {
    subject,
    basket
  },
  data() {
    return {
      typename: "",
      teacherList: [],
      errorStamp: [],
      value: "",
      SubjectId: "",
      zhangFault: [],
      workAnswer: [],
      values: "",
      options: [
        { value: "A", id: 1 },
        { value: "B", id: 2 },
        { value: "C", id: 3 },
        { value: "D", id: 4 }
      ],
      problem: [],
      storeId: [],
      sort: 0,
      studentList_l: null
    };
  },

  created() {
    this.$store.commit("setAllproblemslist", []);
    var that = this;
    that.getSubject();
    that.findErrorStamp(); //查询有错误的章节
    that.findWrongTopicResit();

    Utils.$on("getData", function(msg) {
      // console.log("message",msg,msg.name)
      that.typename = msg.name;
      that.$store.state.studentPrint = msg;
      that.pids = msg.id;
      that.findErrorStamp();
    });
    Utils.$on("studentList_l", function(msg) {
      // console.log("message",msg,msg.name)

      that.studentList_l = msg;
      console.log(msg);
    });
  },
  watch: {
    pids: function() {
      //   console.log(this.pids);
    },
    studentList_l: function(val) {
      this.zhangFault.forEach((item, index) => {
        if (item.id == val) {
          item.flag = true;
        }
      });
      this.$delete(this.zhangFault);
      this.$set(this.zhangFault);
    }
  },
  methods: {
    addTest(item, index) {
      //表示已加入加入试题
      if (item.flag == false) {
        this.$message({ type: "error", message: "加入失败，不可重复加入" });
        return;
      } else {
        this.$message({ type: "success", message: "已加入" });
        item.flag = false;
      }
      console.log(item, index);
      this.problem.push(item);
      this.$set(item, "num2", 0);
      this.$set(item, "targetNum", 0);
      this.storeId.push(item.id);
      this.sort = index++;
      var newList = [];
      newList = this.problem;
      this.$store.commit("setAllproblemslist", newList);

      // console.log(item);
    },
    //学生回答
    stundentAnswer(item, index) {
      if (item.values == "") {
        this.$message({
          showClose: true,
          message: "回答不能为空",
          type: "error"
        });
        return false;
      }
      let data = {
        questionId: item.id,
        answer: item.values,
        sameId: item.sameId,
        storeId: item.storeId,
        code: item.code,
        content: item.content,
        resolution: item.resolution,
        score: item.score,
        difficulty: item.difficulty,
        timeType: item.timeType,
        target: item.target,
        sound: item.sound,
        sort: item.sort,
        type: item.type,
        txetName: item.txetName
      };

      this.$post("/user/homework/answer/resiSubmission", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "提交成功" });
          this.findWrongTopicResit();
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;

      Utils.$emit("subjectIds", value);
    },
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.value = res.data[1].id;
        Utils.$emit("subjectIds", this.value);
        // console.log(this.SubjectName);
      });
    },
    findErrorStamp() {
      let data = { id: this.pids };
      this.$get("/user/homework/answer/findZhangFault", data).then(res => {
        if (res.code == "5000") {
          this.zhangFault = res.data;
          this.zhangFault.forEach(item => {
            item.flag = true;
          });
        }
      });
    }, //查询有错误的章节
    findWrongTopicResit() {
      let data = {};
      this.$get("/user/homework/answer/findWrongTopicResit", data).then(res => {
        if (res.code == "5000") {
          this.errorStamp = res.data;
        }
      });
    } //根据错误作业id查询错误题的相似题
  }
};
</script>
<style lang="less">
.titlesss {
  padding-top: 20px;
  font-size: 25px;
  color: rgb(236, 110, 81);
}

.work {
  padding: 15px;
  background-color: #fff;
  width: 80%;
  height: auto;
  margin: 10px auto;
  border: 1px solid #eee;

  .workTitle {
    border-bottom: 1px dashed #eee;

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

    .number {
      margin-left: 75%;
    }
  }

  .workConten {
    /*height: 180px;*/
    width: 100%;
    /*border-bottom: 1px solid #eee;*/

    .contens {
      display: inline-block;
      /*width: 88%;*/
      /*height: 90%;*/
      padding: 20px;
    }
  }

  .workAnswer {
    padding-top: 30px;
  }
}
.mt72 {
  .myBox {
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .boxLeft {
      width: 208px;
      border-right: 10px solid #eee;
      .subject {
        border-top: 3px solid #eee;
      }
    }
    .boxRight {
      flex: 1;
      .myImg {
        height: 30px;
        padding-top: 15px;
        text-align: center;
        font-size: 16px;
        img {
          margin-top: 20px;
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
      .basket {
        position: absolute;
        left: 1480px;
        top: 600px;
      }
      .testBox {
        display: flex;
        justify-content: space-between;
        .testLeft {
          flex: 1;
        }
        .testRight {
          border-left: 1px solid #eee;
          width: 194px;
          text-align: center;
        }
      }
    }
  }
}
</style>
