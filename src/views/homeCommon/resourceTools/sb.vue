<template>
  <div class="bigBox">
    <!-- <div class="search" v-if="isShow">
      <input type="serch" placeholder="搜索作业码" v-model="learnCode" />
      <img src="../../../../static/images/search.png" alt id="searchImg" @click="addLearnCode" />
    </div>-->
    <!-- <div id="btn" v-if="isShow">
      <el-button id="knowNum" @click="createLearnCode">生成知识码</el-button>
    </div>-->
    <div style="position:absolute;left:8px;top:5px;z-index:999">
      <el-select
        v-if="pidSelectIndex"
        v-model="pidValue"
        placeholder="请选择章节"
        @change="changePid"
        size="mini"
      >
        <el-option v-for="(item, i) in selectList" :key="i" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </div>
    <div
      :class="className"
      :id="id"
      :style="{ height: '900px', width: '100%' }"
      ref="myEchart"
      @click="addKnow"
      style="box-sizing: border-box;"
    ></div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapAction, mapGetters } from "vuex";
import Utils from "../../../../static/js/util";
import echarts from "echarts";
import "../../../../static/js/echarts";
export default {
  inject: ["reload"],
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  data() {
    return {
      pidSelectIndex: false,
      pidValue: "",
      selectList: [],
      initList: [],
      hasPublish: "",
      notPublish: "",
      questionCount: "",
      chart: null,
      knowledge: "",
      data2: {},
      allData: {},
      textBookId: 0,
      listName: {},
      bookId: 0,
      learnCode: "", //知识码
      isShow: false
    };
  },
  created() {
    if (this.$route.path === "/homeCommon/workCenter") {
      this.isShow = true;
    }

    let that = this;
    Utils.$on("getData", function(msg) {
      that.listName = msg;
      //  console.log(msg);
    });
    Utils.$on("bookId", function(params) {
      that.bookId = params;
    });
    // this.queryTestBookDetail();
  },
  mounted() {
    // this.setleafCountTree()
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    forTree(list, type) {
      for (let i of list.children) {
        if (i.children) {
          for (let o of i.children) {
            o.value = o.id;
            o.collapsed = false;
            if (type == 0 && o.children) {
              for (let p of o.children) {
                p.value = p.id;
                p.collapsed = false;
                p.children = [];
              }
            }
          }
        }
      }
      return list;
    },
    changePid(val) {
      let findData = this.initList.find(item => item.id === val);
      findData.chapterIndex = true;
      console.log(findData);
      this.getHomeWork(findData);
    },
    changeTree(type) {
      let newList = JSON.parse(JSON.stringify(this.allData));
      if (type == "5") {
        this.pidSelectIndex = false;
        this.data2 = this.allData;
      } else if (type == "0") {
        this.pidSelectIndex = false;
        this.data2 = this.forTree(newList, type);
      } else if (type == "1") {
        this.pidSelectIndex = true;
        // this.data2 = this.forTree(newList, type);
      } else {
        this.pidSelectIndex = false;
      }
      this.initChart();
    },
    addKnow() {},
    /**
     * 获取 节点的所有 叶子节点 个数
     * @param {Object} json Object对象
     */

    setleafCountTree(json, data) {
      if (!json.list) {
        return 1;
      } else {
        for (var i = 0; i < json.list.length; i++) {
          data.children.push({
            value: json.list[i].id,
            collapsed: false,
            name: json.list[i].name,
            children: json.list[i].children
          });
          this.setleafCountTree(json.list[i], data.children[i]);
        }
        return data;
      }
    },
    //获取插件数据源
    queryTestBookDetail(e) {
      let gradeId = {
        textbookId: e ? e : this.bookId,
        classId: this.$parent.value
      };
      let api = "";
      if (sessionStorage.getItem("type") == 2) {
        api = "/homework/textbook/studentDetail";
      } else {
        api = "/user/homework/textbook/detail";
      }
      this.$get(api, gradeId).then(res => {
        var children2 = {};
        children2.children = [];
        children2.name = "总纲";
        children2.children = [];
        let data = { list: res.data };
        this.initList = res.data;
        children2 = this.setleafCountTree(data, children2);
        this.allData = children2;
        this.selectList = this.allData.children.map(item => {
          return {
            label: item.name,
            id: item.value
          };
        });
        this.data2 = children2;
        this.initChart();
        return false;
      });
    },

    //获取插件数据源
    getEchartsData() {
      var children2 = {};
      children2.children = [];
      children2.name = this.listName.name;

      let data = { list: this.listName.children };
      children2 = this.setleafCountTree(data, children2);
      this.data2 = children2;
      this.initChart();
    },
    ss(list, newData, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i].children = newData;
          break;
        } else if (list[i].children) {
          this.ss(list[i].children, newData, id);
        }
      }
    },
    getHomeWorkapi(data, o) {
      let that = this;
      // return new Promise((resolve, reject) => {
      //   (function(obj, oo) {
      let api = "/user/homework/findListByPid";
      if (sessionStorage.getItem("type") == 2) {
        api = "/user/homework/findListBySubjectId";
      }
      return that.$get(api, data).then(res => {
        let newData = res.data.date.map(item => {
          return {
            value: item.id,
            collapsed: false,
            name: item.name,
            isLink: true
          };
        });
        o.children = newData;
        // resolve(true);
        // resolve(newData);
        this.initChart();
      });
      //   })(data, o);
      // });
    },
    async getHomeWork(newVal) {
      let arr = [];
      let val = JSON.parse(JSON.stringify(newVal));
      if (val.chapterIndex) {
        if (val.children) {
          for (let i of val.children) {
            console.log(i);
            if (i.children) {
              for (let o of i.children) {
                o.collapsed = false;
                let data = {
                  pid: val.id,
                  indexNo: 1,
                  rows: 5,
                  subjectId: sessionStorage.getItem("subjectId")
                };
                data.pid = o.id;
                arr.push(this.getHomeWorkapi(data, o));
              }
            }
          }
          Promise.all(arr).then(result => {
            this.data2 = val;
            this.initChart();
          });
        }
        return false;
      } else if (val.sectionIndex) {
        if (val.children) {
          for (let o of val.children) {
            o.collapsed = false;
            let data = {
              pid: val.id,
              indexNo: 1,
              rows: 5,
              subjectId: sessionStorage.getItem("subjectId")
            };
            data.pid = o.id;
            arr.push(this.getHomeWorkapi(data, o));
          }
          Promise.all(arr).then(result => {
            this.data2 = val;
            this.initChart();
          });
        }
        return false;
      } else {
        let data = {
          pid: val.id,
          indexNo: 1,
          rows: 5,
          subjectId: sessionStorage.getItem("subjectId")
        };
        let api = "/user/homework/findListByPid";
        if (sessionStorage.getItem("type") == 2) {
          api = "/user/homework/findListBySubjectId";
        }
        this.$get(api, data).then(res => {
          let newData = res.data.date.map(item => {
            return {
              value: item.id,
              collapsed: false,
              name: item.name
            };
          });
          this.data2 = {
            name: val.name,
            children: newData
          };
          this.initChart();
        });
      }
    },
    initChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.myEchart);
      }
      const that = this;
      // 把配置和数据放这里
      let app = {};
      let option = null;
      this.chart.showLoading();
      this.chart.hideLoading();
      let data = this.data2;
      // this.chart.on("mousemove", clickFun);
      that.chart.on("click", function(params) {
        if (params.data.isLink) {
          if (sessionStorage.getItem("type") != 2) {
            that.$router.push({
              path: "/homeCommon/workCenter/homeworkDetail",
              query: {
                id: params.data.value,
                state: 0
              }
            });
          } else {
            that.$router.push({
              path: "/studentCommon/makeQuestion",
              query: {
                homeWorkId: params.data.value,
                state: 0
              }
            });
          }
        }
      });
      this.chart.setOption(
        {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter: params => {
              return (
                (params.data.name ? params.data.name : 0) +
                "</br>发布作业数：" +
                (params.data.hasPublish ? params.data.hasPublish : 0) +
                "</br>未发布作业数：" +
                (params.data.notPublish ? params.data.notPublish : 0) +
                "</br>班级次数：" +
                (params.data.questionCount ? params.data.questionCount : 0)
              );
            }
          },

          series: [
            {
              type: "tree",
              data: [data],
              top: "0%",
              right: "25%",
              bottom: "0%",

              symbolSize: 11,
              label: {
                normal: {
                  position: "left",
                  verticalAlign: "middle",
                  align: "right",
                  fontSize: 11
                }
              },
              itemStyle: {
                color: "red", //这是节点折叠时候的颜色
                borderColor: "black",
                borderWidth: 3,
                normal: {
                  color: "#ff8a00"
                }
              },
              leaves: {
                label: {
                  normal: {
                    // formatter: "{c}",
                    position: "right",
                    verticalAlign: "middle",
                    align: "left"
                  }
                }
              },
              expandAndCollapse: true,
              animationDurationUpdate: 750,
              animationDuration: 550,
              clickable: true
            }
          ]
        },
        true
      );
      //双击事件
      that.chart.on("dblclick", function(params) {
        //   console.log(this.config.url);
        //  window.location.href='http://www.ikeshen.com/#/homeCommon/workCenter'
      });
      if (option && typeof option === "object") {
        this.chart.setOption(option, true);
      }
    }
  },

  computed: {
    listenshowpage1() {
      return this.bookId;
    },
    changeName() {
      return this.listName;
    },
    workNum() {
      const { hasPublish, notPublish, questionCount } = this;
      return {
        hasPublish,
        notPublish,
        questionCount
      };
    }
  },
  watch: {
    workNum() {
      this.initChart();
    },
    listenshowpage1: function(newd, old) {
      this.textBookId = newd;
      // console.log(this.bookId);
      this.queryTestBookDetail(newd);
    },

    changeName: function(val) {
      // if (sessionStorage.getItem("userId") == 1) {studentCommon
      if (
        val.chapterIndex ||
        val.sectionIndex ||
        (val.unitIndex &&
          this.$route.path == "/homeCommon" &&
          this.$route.path == "/studentCommon")
      ) {
        this.getHomeWork(val);
      } else {
        this.getEchartsData();
      }
      // } else {
      //   this.getEchartsData();
      // }
    }
  }
};
</script>
<style lang="less">
.bigBox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  height: auto;
  .search {
    position: relative;
    width: 190px;
    height: 60px;
    position: relative;
    display: inline-block;
    input {
      border-radius: 10px;
      outline: none;
      text-indent: 25px;
      margin-top: 24px;
      margin-left: 20px;
      background-color: #eee;
      border: 0;
      height: 22px;
    }
    img {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 10px;
      top: 24px;
    }
  }
  #btn {
    // position: absolute;
    // right: 50px;
    // top: 20px;
    display: inline-block;
    position: relative;
    right: -60%;
    top: 10px;
    button {
      border: 0;
      outline: none;
      color: #fff;
      background-color: #ee573b;
      // border-radius: 15px;
      // height: 25px;
      // width: 90px;
      font-size: 14px;
    }
  }
}
</style>
