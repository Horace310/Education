<template>
  <div class="bigBox">
    <!-- <div class="search" v-if="isShow">
      <input type="serch" placeholder="搜索作业码" v-model="learnCode" />
      <img src="../../../../static/images/search.png" alt id="searchImg" @click="addLearnCode" />
    </div>-->
    <!-- <div id="btn" v-if="isShow">
      <el-button id="knowNum" @click="createLearnCode">生成知识码</el-button>
    </div>-->
    <div
      :class="className"
      :id="id"
      :style="{ height: '710px', width: '800px' }"
      ref="myEchart"
      @click="addKnow"
      style="box-sizing: border-box; "
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
        chart: null,
        knowledge: "",
        data2: {},
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
      this.queryTestBookDetail();
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
        let gradeId = { textbookId: e };
        this.$get("/user/homework/textbook/detail", gradeId).then(res => {
          var children2 = {};
          children2.children = [];
          children2.name = "总纲";

          children2.children = [];

          let data = { list: res.data };
          children2 = this.setleafCountTree(data, children2);
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

      initChart() {
        this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        let app = {};
        let option = null;
        this.chart.showLoading();
        this.chart.hideLoading();
        let data = this.data2;
        this.chart.setOption({
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
          },

          series: [
            {
              type: "tree",
              data: [data],
              top: "0%",
              left: "30%",
              bottom: "0%",
              right: "30%",
              symbolSize: 14,
              label: {
                normal: {
                  position: "left",
                  verticalAlign: "middle",
                  align: "right",
                  fontSize: 18
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
        });
        //双击事件
        let that = this;
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
      }
    },
    watch: {
      listenshowpage1: function(newd, old) {
        this.textBookId = newd;
        // console.log(this.bookId);

        this.queryTestBookDetail(newd);
      },

      changeName: function(li) {
        //  console.log(li);
        this.getEchartsData();
      }
    }
  };
</script>
<style lang="less">
  .bigBox {
    background-color: #fff;
    box-sizing: border-box;
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
