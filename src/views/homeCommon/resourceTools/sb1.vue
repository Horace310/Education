<template>
  <div class="bigBox">
    <!-- <div class="search">
      <input type="serch" placeholder="搜索作业码" />
      <img src="../../../../static/images/search.png" alt id="searchImg" />
    </div>
    <div id="btn">
      <el-button id="knowNum" @click="createLearnCode">生成知识码</el-button>
    </div>-->
    <div
      :class="className"
      :id="id"
      :style="{height:'710px',width:'700px'}"
      ref="myEchart"
      @click="addKnow"
      style="box-sizing: border-box; "
    ></div>
    <div class="searchs">
      <input type="serch" placeholder="搜索知识点" v-model="search" />
      <i class="el-icon-search" @click="searchKnow"></i>
    </div>
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
      learnCode: 0,
      search: "", //搜索的内容
      searchData: {}
    };
  },
  created() {
    //  this.drawChart();
    let that = this;
    //点击章节获取数据源
    Utils.$on("getData", function(msg) {
      that.listName = msg;
    });
    //根据必修选择获取Id
    Utils.$on("msg", function(data) {
      that.bookId = data;
    });
    Utils.$on("bookId", function(params) {
      that.bookId = params;
    });
    that.queryTestBookDetail();
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
    //搜索功能
    searchKnow() {
      let datas = { gradeId: this.bookId, name: this.search };
      this.$post("/likework/queryTestBookByChapterName.do", datas).then(res => {
        if (res.code == "5000") {
          this.searchData = res.data;
          //  console.log(this.searchData);
          this.searchData.forEach(item => {
            var children2 = {};
            children2.children = [];
            children2.name = item.label;
            let data = { list: item.list };
            children2 = this.setleafCountTree(data, children2);
            this.data2 = children2;
            // this.initChart();
          });
        }
      });
    },
    createLearnCode() {
      // console.log(this.bookId);
      let data = { gradeId: this.bookId };
      this.$post("/likework/createLearnCode.do", data).then(res => {
        if (res.code == "5000") {
          this.$alert(res.data, "您的知识码为:", {
            confirmButtonText: "确定"
          });
        }
      });
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
            name: json.list[i].label,
            children: []
          });
          this.setleafCountTree(json.list[i], data.children[i]);
        }
        return data;
      }
    },
    //获取插件数据源
    queryTestBookDetail(e) {
      let gradeId = { gradeId: 1 };
      this.$post("/likework/queryTestBookDetail.do", gradeId).then(res => {
        var children2 = {};
        children2.children = [];
        children2.name = "总纲";
        children2.children = [];
        let data = { list: res.data };
        children2 = this.setleafCountTree(data, children2);
        this.data2 = children2;
        //   console.log(this.data2);
        this.drawChart();
        return false;
      });
    },
    //修改章节名
    changeText(e) {
      this.$prompt("请输入修改单元名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(value => {
        if (value.action === "confirm") {
          this.$post("/likework/updateBookDetail.do", {
            gradeId: this.bookId,
            changeId: e,
            changeName: value.value,
            flag: 3
          }).then(res => {
            if (res.code == "5000") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.reload();
            } else {
              this.$message.error("修改失败");
            }
          });
        }
      });
    },
    //点击章节获取数据源
    getEchartsData() {
      var children2 = {};
      children2.children = [];
      children2.name = this.listName.label;
      let data = { list: this.listName.list };
      children2 = this.setleafCountTree(data, children2);
      this.data2 = children2;
      this.drawChart();
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      let app = {};
      this.chart.showLoading();
      this.chart.hideLoading();

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ""
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        },
        legend: {
          x: "center",
          show: false,
          data: ["包含", "包含", "包含"]
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [
              {
                name: "per",
                itemStyle: {
                  normal: {
                    color: "#009800"
                  }
                }
              },
              {
                name: "loc",
                itemStyle: {
                  normal: {
                    color: "#4592FF"
                  }
                }
              },
              {
                name: "org",
                itemStyle: {
                  normal: {
                    color: "#ff232b"
                  }
                }
              },
              {
                name: "time",
                itemStyle: {
                  normal: {
                    color: "#e6dd1c"
                  }
                }
              },
              {
                name: "body",
                itemStyle: {
                  normal: {
                    color: "#c489e6"
                  }
                }
              },
              {
                name: "sigos",
                itemStyle: {
                  normal: {
                    color: "#a0e6a5"
                  }
                }
              },
              {
                name: "check",
                itemStyle: {
                  normal: {
                    color: "#e6bfac"
                  }
                }
              },
              {
                name: "disease",
                itemStyle: {
                  normal: {
                    color: "#859f89"
                  }
                }
              },
              {
                name: "treatmeot",
                itemStyle: {
                  normal: {
                    color: "#686767"
                  }
                }
              }
            ],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            force: {
              repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: "{c}"
              }
            },
            data: this.data2,
            links: [
              {
                source: 0,
                target: 1,
                category: 0,
                value: "包含"
              }
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0,
                color: "#504a48"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      let that = this;
      this.chart.setOption(option);
    }
    // initChart() {
    //   this.chart = echarts.init(this.$refs.myEchart);
    //   // 把配置和数据放这里
    //   let app = {};
    //   let option = null;
    //   this.chart.showLoading();
    //   this.chart.hideLoading();
    //   let data = this.data2;
    //   this.chart.setOption({
    //     tooltip: {
    //       trigger: "item",
    //       triggerOn: "mousemove"
    //     },

    //     series: [
    //       {
    //         type: "tree",
    //         data: [data],
    //         top: "0%",
    //         left: "30%",
    //         bottom: "10%",
    //         right: "25%",
    //         symbolSize: 10,
    //         label: {
    //           normal: {
    //             position: "left",
    //             verticalAlign: "middle",
    //             align: "right",
    //             fontSize: 14
    //           }
    //         },
    //         leaves: {
    //           label: {
    //             normal: {
    //               position: "right",
    //               verticalAlign: "middle",
    //               align: "left"
    //             }
    //           }
    //         },
    //         expandAndCollapse: true,
    //         animationDurationUpdate: 750,
    //         animationDuration: 550
    //       }
    //     ]
    //   });
    //   //双击事件
    //   let that = this;
    //   this.chart.on("dblclick", function(params) {
    //     //  that.changeText(params.value);
    //   });
    //   if (option && typeof option === "object") {
    //     this.chart.setOption(option, true);
    //   }
    // }
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
      // this.textBookId = newd;
      //  console.log(this.);

      this.queryTestBookDetail(newd);
    },

    changeName: function(li) {
      // console.log(li);
      this.getEchartsData();
    }
  }
};
</script>
<style lang="less">
.bigBox {
  background-color: #fff;
  box-sizing: border-box;
  height: 710px;
  .searchs {
    right: -400px;
    top: -20px;
    display: inline-block;
    width: 200px;
    height: 24px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      border: 0;
      background-color: #eee;
      text-indent: 15px;
      outline: none;
    }
    i {
      position: absolute;
      right: 15px;
      top: 5px;
      color: #ee573b;
      font-size: 16px;
    }
  }
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