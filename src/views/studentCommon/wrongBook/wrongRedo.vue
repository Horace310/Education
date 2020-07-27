<template >
  <div class="mt72">
    <div class="myBox">
      <div class="boxRight">
        <div class="myImg">
          <span class="titlesss">{{typename}}</span>

          <span
            v-on:click="back"
            style="display: inline-block;border: 1px solid #eee;padding:6px 10px;cursor: pointer;float: right;margin: 0 20px 0 0;"
          >返回</span>
        </div>

        <div class="testBox">
          <div class="testLeft">
            <div v-for="(itemed,indexd) in zhangFault" class="work">
              <div class="workConten">
                <p class="number workTitle">{{indexd+1}}.编号:{{itemed.code}}</p>
                <div class="workConten">
                  <span class="contens">
                    <span v-html="itemed.content"></span>
                  </span>
                  <div v-show="redoFlag[indexd]==true?true:false" style="margin-top:10px;">
                    <span style="float:left;">答案：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>
                      <span v-html="itemed.answer"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="workAnswer">
                <span style="color:#2bb7b3">学生回答:</span>
                <el-select
                  v-model="itemed.values"
                  placeholder="请选择"
                  v-if="itemed.code[0]=='X'"
                  style="margin-bottom:10px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入答案"
                  v-model="itemed.values"
                  v-else
                ></el-input>
              </div>
              <div class="answerBtn" style="margin-bottom: 20px;">
                <el-button
                  size="mini"
                  style="background-color:#fb8b22;color:#fff;float:left"
                  @click="stundentAnswer(itemed,indexd)"
                >确定</el-button>
                <el-button
                  size="mini"
                  style="background-color:#fb8b22;color:#fff;float:left"
                  @click="checkAnalysis(indexd)"
                >查看解析</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject from "../../../components/grade/subject";
import Utils from "../../../../static/js/util";
export default {
  components: {
    subject
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
      redoFlag: []
    };
  },
  created() {
    this.zhangFault = this.$store.state.allproblemslist;
    console.log(this.zhangFault, "this.zhangfault");
    var redoFla = [];
    this.zhangFault.forEach(item => {
      redoFla.push(false);
    });
    this.redoFlag = redoFla;
  },
  watch: {},
  methods: {
    checkAnalysis(key) {
      console.log(key, this.redoFlag);

      if (this.redoFlag[key] == true) {
        this.redoFlag[key] = false;
      } else {
        this.redoFlag[key] = true;
      }
      this.$delete(this.redoFlag);
      this.$set(this.redoFlag);
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
    }
  }
};
</script>
<style lang="less">
.titlesss {
  margin: 20px 500px;
  display: contents;
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
    padding-top: 15px;
    /*height: 180px;*/
    width: 100%;
    overflow: auto;
    /*border-bottom: 1px solid #eee;*/

    .contens {
      display: inline-block;
      padding: 20px;
    }
  }

  .workAnswer {
    padding-top: 30px;
  }
}
.mt72 {
  .myBox {
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
        height: 70px;
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
