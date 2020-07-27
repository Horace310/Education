<template>
  <div id="historySubject">
    <div class="main mt72">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>历史题目</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="formwork">
        <h3 class="title">历史题目</h3>
        <p class="work_name">
          <span>{{ title[0] }}-</span><span>{{ title[1] }}-</span
          ><span>{{ title[2] }}-</span> <span>{{ title[3] }}</span
          ><span v-show="title[4] != ''">-{{ title[4] }}</span
          ><span v-show="title[5] != ''">-{{ title[5] }}</span
          ><span v-show="title[6] != ''">-{{ title[6] }}</span>
        </p>
      </div>

      <div class="subject">
        <div class="import-out">
          <div class="btns">
            <el-button @click="allType" :type="typesindex == 0 ? 'primary' : ''"
              >全部</el-button
            >
            <el-button
              v-for="(item, index) in types"
              :key="index"
              @click="chooseType(item, index)"
              :type="typeindex == index ? 'primary' : ''"
              >{{ item.typeName }}</el-button
            >
          </div>
          <Subjects
            :questionList="questionList"
            @subjects="subjects"
          ></Subjects>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageCount"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Subjects from "@/components/subject/subject";
export default {
  components: {
    Subjects
  },
  data() {
    return {
      currentPage4: 4,
      pageCount: "",
      title: "",
      indexNO: "",
      questionList: [],
      types: [],
      typesindex: 1,
      typeindex: 999,
      loadings:null,
      SubJectId:this.$store.state.subjectId,
    };
  },
  created() {
    this.title = this.$route.query.title.split(",");

    this.getSubject(this.$route.query.type);
    this.QuestionType();
  },
  methods: {
    // 获取题目全部题型接口
    QuestionType(e) {
      let data = {subjectId:this.SubJectId}
      this.$post("/likework/queryQuestionTypeSelect.do",data).then(res => {
        if (res.code == "5000") {
          this.types = res.data;
          if (this.$route.query.type > 0) {
            this.types.forEach((item, index) => {
              if (item.id == this.$route.query.type) {
                this.typeindex = index;
              }
            });
          } else {
            this.typesindex = this.$route.query.type;
          }
        }
      });
    },
    subjects(e) {
      this.questionList = e;
    },
    allType() {
      this.typeindex = 999;
      this.typesindex = 0;
      this.getSubject(this.typesindex);
    },
    chooseType(item, index) {
      this.typeindex = index;
      this.typesindex = 1;
      this.getSubject(this.typeindex+1);
    },
    loading(e) {
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
    getSubject(e) {
      this.loading();
      let data = {
        subjectId: this.$route.query.subjectId,
        textbookId: this.$route.query.textbookId,
        chapterId: this.$route.query.chapterId,
        type: e,
        indexNo: this.indexNO,
        rows: 10
      };
      this.$post("/likework/queryHistoryHomeworkQuestion.do", data).then(
        res => {
          if (res.code == "5000") {
          //  console.log(res);
            this.loadings.close();
            this.pageCount = res.data.count;
            this.indexNO = res.data.indexNO;
            this.questionList = res.data.rows;
          }
        }
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.indexNO = val;
      if (this.typesindex == 0) {
        this.getSubject(this.typesindex);
      } else {
        this.getSubject(this.typeindex);
      }
    }
  }
};
</script>
<style lang="less">
@color: #2592e7;
#historySubject {
  .main {
    .el-breadcrumb {
      font-size: 16px;
      color: #333;
      height: 45px;
      line-height: 45px;
    }
    .formwork {
      width: 100%;
      background: #fff;
      position: relative;
      padding-bottom: 20px;
      .code {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 60px;
        height: 60px;
      }
      .title {
        font-size: 20px;
        color: #333;
        padding-top: 22px;
        margin-bottom: 10px;
        text-align: center;
      }
      .work_name {
        font-size: 14px;
        color: @color;
        text-align: center;
      }
      .establish {
        display: flex;
        justify-content: flex-start;
        padding: 30px 50px;
        .left {
          padding-right: 40px;
          .item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 40px;
            margin-bottom: 30px;
            .label {
              font-size: 16px;
              color: #000;
              margin-right: 20px;
            }
            .input {
              width: 300px;
              margin-right: 20px;
              input {
                width: 100%;
              }
              .el-select {
                width: 100%;
              }
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          .label {
            font-size: 16px;
            color: #333;
            line-height: 40px;
            margin-right: 20px;
          }
          .input {
            flex: 1;
            textarea {
              width: 100%;
              box-sizing: border-box;
              padding-left: 10px;
              padding-top: 10px;
              height: 120px;
              border-color: #aaa;
            }
          }
        }
      }
      .template {
        padding: 43px 93px;
        padding-bottom: 0;
        display: flex;
        justify-content: flex-start;
        //   align-items: center;
        .left {
          width: 50%;
          .item {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 39px;
            .label {
              //   margin-right: 15px;
              font-size: 16px;
              color: #333;
              min-width: 90px;
            }
            .input {
              font-size: 14px;
              color: #666;
            }
          }
        }
        .right {
          width: 50%;
          box-sizing: border-box;
          padding-left: 93px;
          .item {
            display: flex;
            justify-content: flex-start;
            .label {
              min-width: 90px;
              font-size: 16px;
              color: #333;
            }
            .input {
              font-size: 14px;
              color: #666;
              flex: 1;
              min-height: 100px;
              span {
                display: block;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
    .subject {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      width: 100%;
      background: #fff;
      padding-top: 20px;
      .import-out {
        flex: 0.6;
        background: #fff;
        position: relative;
        // width: 50%;
        .title {
          font-size: 18px;
          color: @color;
          text-align: center;
          padding-top: 26px;
        }
        .nodata {
          margin-top: 100px;
          text-align: center;
          img {
            width: 258px;
            height: 207px;
          }
          span {
            display: block;
            font-size: 16px;
            color: #b3b3b3;
            margin-top: 10px;
          }
        }

        .Release {
          position: absolute;
          bottom: 20px;
          width: 100%;
          text-align: center;
          span {
            font-size: 18px;
            color: #fff;
            background: @color;
            margin: 0 30px;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
        .page {
          padding-bottom: 30px;
          .el-pagination {
            text-align: center;
          }
        }
      }
    }
    .confirm {
      width: 100%;
      display: flex;
      background: #fff;
      justify-content: center;
      padding-bottom: 40px;
      .el-button {
        min-width: 98px;
        margin: 0 20px;
      }
    }
  }
}
</style>