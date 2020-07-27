<template>
  <div class="home">
    <el-dialog
      title="新手指导"
      center="true"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      v-if="myBox"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页图谱" name="first">
          <div style="margin-left: 120px;">
            <el-carousel height="1000px" autoplay="false">
              <el-carousel-item v-for="(item, index) in piclist" :key="item">
                <h1 style="color: red;">首页图谱：第{{ index + 1 }}步</h1>
                <img :src="item" alt width="1200" height="800" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
        <el-tab-pane label="创建班级" name="second">
          <div style="margin-left: 120px;">
            <el-carousel height="1000px" autoplay="false">
              <el-carousel-item v-for="(item, index) in piclist2" :key="item">
                <h1 style="color: red;">创建班级:{{ index + 1 }}步</h1>
                <img :src="item" alt width="1200" height="800" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
        <el-tab-pane label="作业中心" name="third">
          <div style="margin-left: 120px;">
            <el-carousel height="1000px" autoplay="false">
              <el-carousel-item v-for="(item, index) in piclist3" :key="item">
                <h1 style="color: red;">发布作业:{{ index + 1 }}步</h1>
                <img :src="item" alt width="1200" height="800" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教学教研" name="foru">
          <div style="margin-left: 120px;">
            <el-carousel height="1000px" autoplay="false">
              <el-carousel-item v-for="(item, index) in piclist4" :key="item">
                <h1 style="color: red;">教学教研:{{ index + 1 }}步</h1>
                <img :src="item" alt width="1200" height="800" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer" style="margin">
        <el-button @click="dialogVisible = false">结束</el-button>
      </span>
    </el-dialog>

    <div class="bgcBox">
      <!-- <video
        style="width:100%;height:600px;object-fit: fill"
        src="../../../static/images/video.mp4"
        muted
        loop
        autoplay="autoplay"
      >您的浏览器不支持 video 标签。</video>-->
      <img src="../../assets/banner.jpg" alt />
    </div>
    <div class="elBtn">
      <el-button type="text" style="color: #fff;" @click="showTonewBox">新手体验</el-button>
    </div>
    <div class="classList mt72 bx" style="position:relative">
      <Reminder />
      <div class="bigBox" style="background:transparent">
        <div class="boxLeft">
          <div class="xueke">
            <!-- <el-select v-model="value" placeholder="请选择学科">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            </el-select>-->
            <!-- <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader> -->
            <span>{{ subjectName }}</span>
          </div>
          <div class="three">
            <subject ref="sub" />
          </div>
        </div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;margin-top:18px">
            <div
              style="background:white;width:23%;display:flex;justify-content:center;align-items:center;padding:20px 10px 20px 10px;box-sizing:border-box"
              v-for="(i,index) in statistics"
              :key="index"
            >
              <img :src="i.src" alt />
              <div style="margin-left:10px">
                <p style="color:#9D9D9D">{{i.labels}}</p>
                <h3 style="font-size:28px">{{i.value}}</h3>
              </div>
            </div>
          </div>
          <div class="boxRight" style="background:white;margin-top:20px">
            <!-- <p style="margin-left: 23px; font-size: 14px;">
              当前包含：
              <span style="color: #38a5f8;">{{allTextbookDetailCount}}</span> 单元
              <span style="color: #38a5f8;">{{allHomeworkCount}}</span>份作业 今日新增：
              <span style="color: #38a5f8;">{{todayNewlyTextbookDetailCount}}</span>单元
              <span style="color: #38a5f8;">{{todayNewlyHomeworkCount}}</span>份作业
            </p>-->
            <div
              style="border-bottom:1px solid #e8e8e8;padding-bottom:15px;display:flex;justify-content:space-between;width:100%"
            >
              <p style="font-size:19px;font-weight:600">我的知识树</p>
              <div>
                <span
                  @click="tuchange(itemss.id)"
                  :class="tuShow==itemss.id?'spanClass':''"
                  style="padding:5px 13px 5px 13px;margin-left:6px;border-radius:5px;cursor:pointer"
                  v-for="(itemss,indexs) in tupuList"
                  :key="indexs"
                >{{itemss.label}}</span>
              </div>
            </div>
            <div v-show="tuShow==1" style="text-align:center">
              <img style="margin-top:15px" src="../../../static/images/tree.png" />
            </div>
            <div style="width:100%" v-if="tuShow==2">
              <div class="myBtn">
                <div class="conter">
                  <span>图谱选择:</span>
                  <div class="btnS" v-for="(item, index) in List" :key="index">
                    <el-button
                      size="mini"
                      style="margin-right: 5px;"
                      :class="{ active: num == index }"
                      @click="Tochart(index, item)"
                    >{{ item.labels }}</el-button>
                  </div>
                </div>
                <div class="conter2">
                  <span>班级选择:</span>
                  <el-select v-model="value" @change="classChange" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in createClass"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="tupu">
                <knowledge ref="knowledge" />
                <!-- <img src="../../../static/images/tupu.png" alt /> -->
              </div>
            </div>
            <!-- <div class="showBtn">
            <img src="../../../static/images/shangla.png" alt v-if="myShow" @click="showBtns" />
            <img
              src="../../../static/images/xiala.png"
              style="width: 17px;"
              alt
              v-if="!myShow"
              @click="showBtns"
            />
            </div>-->
            <!-- <div class="myBtn" v-if="!myShow">
            <div class="conter">
              <span>图谱选择:</span>
              <div class="btnS" v-for="(item, index) in List" :key="index">
                <el-button
                  style="margin-right:5px"
                  :class="{ active: num == index }"
                  @click="Tochart(index, item)"
                >{{ item.labels }}</el-button>
              </div>
            </div>
            <div class="conter">
              <span>班级选择:</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="conter">
              <span>作业完成:</span>
              <div class="btnS" v-for="(item, index) in list1" :key="index">
                <el-button
                  style="margin-right:5px"
                  :class="{ active2: num2 == index }"
                  @click="ToWork(index, item)"
                >{{ item.label }}</el-button>
              </div>
            </div>
            <div class="conter">
              <span>作业质量:</span>
              <el-button style="background-color:#2ab8b3;color:#fff">优</el-button>
            </div>
            <div class="conter">
              <span>资源来源:</span>
              <el-button style="background-color:#2ab8b3;color:#fff">学科圈</el-button>
            </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from "../../../static/js/util";
import subject from "../../components/grade/subject";
import knowledge from "../../views/homeCommon/resourceTools/sb";
import Reminder from "../../components/common/reminder";
export default {
  components: {
    knowledge,
    subject,
    Reminder
  },
  data() {
    return {
      allTextbookDetailCount: "",
      allHomeworkCount: "",
      todayNewlyTextbookDetailCount: "",
      todayNewlyHomeworkCount: "",
      tupuList: [
        { label: "树图谱", id: 1 },
        { label: "思维导图", id: 2 }
      ],
      statistics: [
        {
          src: require("../../../static/images/01.png"),
          labels: "当前包含单元",
          value: ""
        },
        {
          src: require("../../../static/images/02.png"),
          labels: "当前包含作业",
          value: ""
        },
        {
          src: require("../../../static/images/03.png"),
          labels: "今日新增单元",
          value: ""
        },
        {
          src: require("../../../static/images/04.png"),
          labels: "今日新增作业",
          value: ""
        }
      ],
      piclist4: [
        require("../../assets/d1.png"),
        require("../../assets/d2.png"),
        require("../../assets/d3.png")
      ],
      piclist: [
        require("../../assets/1.png"),
        require("../../assets/2.png"),
        require("../../assets/3.png"),
        require("../../assets/4.png"),
        require("../../assets/5.png"),
        require("../../assets/6.png"),
        require("../../assets/7.png"),
        require("../../assets/8.png")
      ],
      piclist2: [
        require("../../assets/b1.png"),
        require("../../assets/b2.png"),
        require("../../assets/b3.png"),
        require("../../assets/b4.png"),
        require("../../assets/b5.png"),
        require("../../assets/b6.png")
      ],
      piclist3: [
        require("../../assets/c1.png"),
        require("../../assets/c2.png"),
        require("../../assets/c3.png"),
        require("../../assets/c4.png"),
        require("../../assets/c5.png"),
        require("../../assets/c6.png"),
        require("../../assets/c7.png"),
        require("../../assets/c8.png"),
        require("../../assets/c9.png"),
        require("../../assets/c10.png")
      ],
      activeName: "first",
      testinput: "",
      tuShow: 1,
      dialogVisible: true,
      dialogVisible2: false,
      subjectName: sessionStorage.getItem("subjectName"), //学科名
      num: 10,
      num2: 0,
      selectedOptions: [],
      createClass: [],
      value: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      List: [
        {
          index: 1,
          labels: "单元图谱"
        },
        {
          index: 2,
          labels: "章作业图谱"
        }
      ],
      list1: [
        {
          index: 1,
          label: "未完成"
        },
        {
          index: 2,
          label: "已完成"
        }
      ],
      myBox: false,
      myShow: false
    };
  },
  methods: {
    classChangeId(id) {
      this.$refs.sub.changeIdTree(id);
    },
    tuchange(id) {
      this.tuShow = id;
      if (id == 2) {
        this.$nextTick(() => [
          this.$refs.knowledge.queryTestBookDetail(this.$refs.sub.banben)
        ]);
      }
    },
    classChange() {
      this.$refs.sub.closeTree();
      // this.$refs["sub"].expandedKey = [];
      // this.$children.expandedKey
      this.$children[6].queryTestBookDetail();
    },
    getClass() {
      this.$post("/user/classes/query", { userId: sessionStorage.userId }).then(
        response => {
          //console.log(response)
          if (response.code == "5000") {
            this.createClass = response.data;
            this.value = response.data[0].id;
            // this.queryClassHomework();
          } else {
          }
        }
      );
    },
    getCode() {
      this.$get("/user/code", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == "5000") {
        }
      });
    },
    showBtns() {
      this.myShow = !this.myShow;
    },
    showTonewBox() {
      this.myBox = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    handleClose2(done) {
      this.dialogVisible = false;
    },

    handleChange(value) {
      // console.log(value);
    },
    Tochart(index, item) {
      this.$children[6].changeTree(index);
      this.num = index;
    },
    ToWork(index, item) {
      this.num2 = index;
    }
  },
  created() {
    // console.log(this.List);
    this.getCode();
    this.getClass();
  }
};
</script>
<style lang="less" scoped>
.elBtn {
  position: absolute;
  right: 10%;
  top: 20px;
}
.spanClass {
  color: white;
  background: #37b5b4;
}
.guideCon {
  display: none;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  z-index: 10000;
  color: #fff;
  text-align: center;
  .text {
    text-align: left;
  }
  .title {
    font-size: 35px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .import {
    font-size: 18px;
    margin-bottom: 135px;
  }
  .beginBtn {
    cursor: pointer;
  }
}
#stepA {
  // background: rgba(0,0,0,0.3);
  background-color: #000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: none;
  .guideAdd {
    // background: rgba(0,0,0,0.3);
    background-color: white;
    opacity: 0.7;
    width: 600px;
    height: 140px;
    text-align: left;
    color: #616161;
    font-size: 14px;
    line-height: 40px;
    padding-right: 30px;
    cursor: pointer;
    position: relative;
    display: none;
    margin-top: 739px;
    margin-left: 336px;

    .biaoti {
      margin-top: -15px;
    }
  }
}
.classList {
  border: 1px solid #eee;
  // padding: 15px 0px;
  margin-bottom: 10px;
  //height: 1000px;
  height: 100%;
  .active {
    background: #2ab8b3;
    color: #fff;
  }
  .active2 {
    background: #2ab8b3;
    color: #fff;
  }
  .bigBox {
    width: 100%;
    //  height: 850px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    //  overflow: hidden;
    .boxLeft {
      width: 22%;
      border-right: 1px solid #eee;
      padding: 15px;

      box-sizing: border-box;
      .xueke {
        width: 100%;
        // padding: 5px;
        text-align: center;
        background-color: #2ab8b3;
        span {
          display: inline-block;
          padding: 10px;
          color: #fff;
          font-size: 16px;
        }
      }
      .three {
        padding: 10px 0px;
        border-top: 1px solid #eee;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
      }
    }
    .boxRight {
      flex: 1;
      padding: 15px;
      .showBtn {
        height: 20px;
        margin-right: 25px;
        margin-top: 20px;
        img {
          float: right;
        }
      }
      .tupu {
        width: 95%;
        //  height: 60%;
        //  height: 500px;
        // height: 1000px;
        // overflow-y:scroll;
        border: 1px solid #ccc;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .myBtn {
        margin: 0 0 50px 0;
        // border-top: 1px solid #ccc;
        width: 95%;
        .conter {
          margin-left: 20px;
          float: left;
          padding: 10px 0px;
          width: 40%;
          // height: 23%;
          //    height: 300px;
          .btnS {
            display: inline-block;
          }
          span {
            font-size: 16px;
            display: inline-block;
            padding: 5px;
          }
        }
        .conter2 {
          float: left;
          padding: 10px 0px;
          width: 40%;
          // height: 23%;
          //    height: 300px;
          .btnS {
            display: inline-block;
          }
          span {
            font-size: 16px;
            display: inline-block;
            padding: 5px;
          }
        }
      }
    }
  }
}
</style>
