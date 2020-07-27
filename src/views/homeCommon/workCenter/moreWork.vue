<template>
  <div class="moreWork ">
    <div class="main nav" v-show="isList">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>作业展示</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="showHomework">
      <h3 class="tit ft20 fb col39a">作业展示</h3>
      <div class="sec-con flexbox flexrow">
        <div class="sec">
          <span class="name ft16">选择班级：</span>
          <el-select
            v-model="classId"
            clearable
            placeholder="请选择"
            @change="queryHomeworkTimeSelect"
          >
            <el-option
              v-for="item in createClass"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="sec">
          <span class="name ft16">选择时间：</span>
          <el-select
            v-model="time"
            clearable
            placeholder="请选择"
            @change="queryHomeworkSelectByTime"
          >
            <el-option
              v-for="item in timeSelect"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="sec">
          <span class="name ft16">选择作业：</span>
          <el-select
            v-model="homeworkId"
            clearable
            placeholder="请选择"
            @change="queryStudentHomeworkShow"
          >
            <el-option
              v-for="item in selectByTime"
              :key="item.id"
              :label="item.homeworkName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="home-con">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, i) in homeworkShow" :key="i"
            ><div class="grid-content bg-purple">
              <div class="con">
                <div class="header">
                  <img :src="item.icon" alt="" class="img" />
                  <p class="name">{{ item.username }}</p>
                </div>
                <div class="probability ">
                  <div class="correct colff8 ">
                    <span class="name">正确率</span>
                    <div class="progress">
                      <el-progress
                        :stroke-width="10"
                        :percentage="parseInt(item.precision)"
                      ></el-progress>
                    </div>
                  </div>
                  <div class="complete col39a">
                    <span class="name">完成率</span>
                    <div class="progress">
                      <el-progress
                        :stroke-width="10"
                        :percentage="parseInt(item.finish)"
                      ></el-progress>
                    </div>
                  </div>
                </div>
              </div></div
          ></el-col>
        </el-row>
        <div class="block">
          <div class="pagination">
            <Gagination
              :total="total"
              :page-size="pageSize"
              @handleSizeChangeSub="handleSizeChangeFun"
              @handleCurrentChangeSub="handleCurrentChangeFun"
            ></Gagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Gagination from "../../../components/pagination/pagination";

export default {
  components: {
    Gagination
  },
  data() {
    return {
      classId: "",
      createClass: [],
      time: "",
      timeSelect: [],
      homeworkId: "",
      selectByTime: [],
      homeworkShow: [],
      total: 0,
      pageSize: 10,
      isList: true
    };
  },
  created() {
    this.queryStudentHomeworkShow();
    this.queryCreateClass();
    // this.queryHomeworkTimeSelect();
    // this.queryHomeworkSelectByTime();
    // if(this.$route)
    if (this.$route.name == "学员作业展示") {
      this.isList = false;
    }
  },
  methods: {
    //获取创建的班级列表
    queryCreateClass() {
      this.$post("/likework/queryCreateClass.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.createClass = response.data;
          this.classId = response.data[0].id;
          // console.log(response.data[0].id,"99");
          this.queryHomeworkTimeSelect();
          //this.queryClassHomeworkDateRecord();//根据班级和作业查询班级数据报表
        }
      });
    },
    ////查询班级已发布/未发布作业时间下拉列表
    queryHomeworkTimeSelect(e) {
      console.log(this.classId);
      this.$post("/likework/queryHomeworkTimeSelect.do", {
        classId: this.classId,
        flag: 0
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.timeSelect = response.data;
          this.queryHomeworkSelectByTime();
        }
      });
    },
    //根据时间获取作业下拉列表
    queryHomeworkSelectByTime() {
      this.$post("/likework/queryHomeworkSelectByTime.do", {
        classId: this.classId,
        time: this.time
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.selectByTime = response.data;
          this.homeworkId = response.data[0].id;
        }
      });
    },
    //根据班级和作业查询作业展示
    queryStudentHomeworkShow() {
      this.homeworkShow = [];
      this.$post("/likework/queryStudentHomeworkShow.do", {
        classId: this.classId,
        homeworkId: this.homeworkId
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.homeworkShow = response.data.rows;
          this.total = response.data.pageCount;
        } else {
          this.total = 0;
          this.homeworkShow = [];
        }
      });
    },
    // 改变size
    handleSizeChangeFun() {},
    // 改变current
    handleCurrentChangeFun() {}
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 1300px;
  margin: 0 auto;
}
.nav {
  font-size: 18px;
  color: #333;
  margin-top: 20px;
}
.showHomework {
  background: #ffffff;
  padding: 40px;
  box-sizing: border-box;
  width: 1300px;
  margin: 20px auto 0 auto;
  text-align: center;
  .sec-con {
    margin: 30px 0 50px 0;
    .sec {
      align-items: center;
    }
  }
  h3.tit {
    display: flex;
    justify-content: space-between;
  }
  .home-con {
    .grid-content {
      margin-bottom: 70px;
      .con {
        .header {
          .img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }
          .name {
            margin: 14px 0 18px 0;
          }
        }
        .probability {
          .correct {
            margin-bottom: 10px;
          }
          .name {
            width: 6%;
          }
          .progress {
            width: 80%;
            display: inline-block;
          }
        }
      }
    }
  }
  .class-con {
    width: 100%;
    margin: 0 auto;
    .class-progress {
      .name {
        margin-top: 20px;
      }
    }
    .subject {
      background: #fbfbfb;
      margin: 0 auto;
      box-sizing: border-box;
      // padding: 40px;
      margin: 40px 0 0 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .vol-data {
        width: 47%;
        margin: 0 1.5%;
        margin-bottom: 80px;
        align-items: center;
        box-shadow: 0 0 10px #eee;
        .charts-title {
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }
        .lists {
          .list {
            padding: 10px 0;
            .con {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .header {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  border-radius: 100%;
                }
                .name {
                  margin: 14px 0 0 0;
                }
              }
              .probability {
                flex: 1;
                .correct,
                .complete {
                  display: flex;
                  justify-content: flex-start;
                  .name {
                    width: 30%;
                  }
                  .progress {
                    flex: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
