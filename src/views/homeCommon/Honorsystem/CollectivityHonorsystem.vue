<template>
  <div>
    <div>
      <el-row>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="荣誉授予" name="first"></el-tab-pane>
          <el-tab-pane label="勋章查询" name="second"></el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- <div style="margin-left:21px;">
        <el-row>
          <el-button type="primary" @click="rongyusetting()">荣誉授予</el-button>
          <el-button @click="selectHonor1">勋章查询</el-button>
        </el-row>
      </div>-->

      <div class="select">
        <el-row :gutter="5">
          <el-col :span="6">
            <span>班级选择：</span>
            <el-select v-model="classId" placeholder="请选择" size="mini" @change="selectChoose">
              <el-option
                v-for="(item,index) in classesList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div v-show="bigbox_">
        <div class="bigbox">
          <div class="left">
            <span>优秀小组长：</span>
          </div>
          <div class="right">
            <li v-for="(item,index) in list1" :key="index">
              <img :src="item.avatar" alt width="80" height="60" />
              <p>{{item.stuname}}</p>
            </li>
          </div>
        </div>
        <div class="bigbox">
          <div class="left">
            <span>优秀科代表：</span>
          </div>
          <div class="right">
            <li v-for="(item,index) in list2" :key="index">
              <img :src="item.avatar" alt />
              <p>{{item.stuname}}</p>
            </li>
          </div>
        </div>
        <div class="bigbox">
          <div class="left">
            <span>优秀小组成员：</span>
          </div>
          <div class="right">
            <li v-for="(item,index) in list3" :key="index">
              <img :src="item.avatar" alt />
              <p>{{item.stuname}}</p>
            </li>
          </div>
        </div>
        <div class="bigbox">
          <div class="left">
            <span>优秀好帮手：</span>
          </div>
          <div class="right">
            <li v-for="(item,index) in list3" :key="index">
              <img :src="item.avatar" alt />
              <p>{{item.stuname}}</p>
            </li>
          </div>
        </div>
      </div>

      <div class="listStundent" v-show="bigBox2">
        <div class="listOne">
          <p class="title">
            <span class="text" style="color:#fff;padding:5px">学生列表</span>
          </p>
          <div
            class="listImgBox"
            v-for="(item, index) in imgList"
            :key="index"
            style="float:left;display:inline-block;"
          >
            <div class="deleteBox" @click="toStudentPage(item)">
              <img
                id="my-img"
                :src="item.avatar"
                @mousemove="onMousteIn(index)"
                @mouseleave="onMousteOut()"
              />
              <!-- <p>{{item.type_}}</p> -->
              <!-- {{item}} -->
              <div class="main-dd">
                <div class="sicon">
                  <img
                    v-if="item.zu"
                    style="width:20px;height:30px"
                    src="../../../../static/images/youxiuzuzhang.png"
                    alt
                  />
                  <span>{{item.zu}}</span>
                </div>
                <div class="sicon">
                  <img
                    v-if="item.ke"
                    style="width:20px;height:30px"
                    src="../../../../static/images/youxiukedaibiao.png"
                    alt
                  />
                  <span>{{item.ke}}</span>
                </div>
                <div class="sicon">
                  <img
                    v-if="item.bang"
                    style="width:20px;height:30px"
                    src="../../../../static/images/youxiubangshou.png"
                    alt
                  />
                  <span>{{item.bang}}</span>
                </div>
                <div class="sicon">
                  <img
                    v-if="item.yuan"
                    style="width:20px;height:30px"
                    src="../../../../static/images/youxiuzuyuan.png"
                    alt
                  />
                  <span>{{item.yuan}}</span>
                </div>
              </div>
              <el-checkbox v-model="studentList[index]" @change="studentLIst()">{{item.stuname}}</el-checkbox>
            </div>
          </div>
        </div>
        <div class="myList">
          <div class="myListItem">
            <!-- 1优秀组长2优秀科代表3优秀小组成员4优秀小帮手 -->
            <div class="jinpai" style="cursor: pointer;" @click="setting(1)">
              <img src="../../../../static/images/youxiuzuzhang.png" alt />
              优秀小组长
            </div>
            <el-button type="primary" size="small" @click="resetting(1)">重置</el-button>
          </div>
          <div class="myListItem" style="margin-top:120px;cursor: pointer">
            <div class="jinpai" @click="setting(2)">
              <img src="../../../../static/images/youxiukedaibiao.png" alt />
              优秀科代表
            </div>
            <el-button type="primary" size="small" @click="resetting(2)">重置</el-button>
          </div>
          <div class="myListItem" style="margin-top:100px;cursor: pointer">
            <div class="jinpai" @click="setting(3)">
              <img src="../../../../static/images/youxiuzuyuan.png" alt />
              优秀小组成员
            </div>
            <el-button type="primary" size="small" @click="resetting(3)">重置</el-button>
          </div>
          <div class="myListItem" style="margin-top:100px;cursor: pointer">
            <div class="jinpai" @click="setting(4)">
              <img src="../../../../static/images/youxiubangshou.png" alt />
              优秀好帮手
            </div>
            <el-button type="primary" size="small" @click="resetting(4)">重置</el-button>
          </div>
        </div>
      </div>
      <div class="myedit" v-if="bigBox2">
        <el-button type="primary" @click="tijiao()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import subject2 from "../../../components/grade/subject2.vue";
import knowledge2 from "../../../views/homeCommon/resourceTools/sb2";
import Qs from "qs";

export default {
  components: {
    subject2,
    knowledge2
  },
  data() {
    return {
      activeName: "first",
      studentList: [],
      bigbox_: false,
      radio: "1",
      current: 0, //鼠标移入index
      seen: false,
      data: {},
      classId: "",
      imgList: [],
      classesList: [],
      bigBox2: true,

      myShow: false,
      subjectName: sessionStorage.getItem("subjectName"),
      studentIdString: "",
      chooseStudentList: [],
      list1: [],
      list2: [],
      list3: [],
      list4: []
    };
  },
  created() {
    var that = this;
    that.selectClasses();

    setTimeout(function() {
      that.jtrycx();
    }, 1000);
  },

  watch: {},
  methods: {
    insertteamOne(obj) {
      return this.$post("/honor/teamhonor/insertteamOne", obj).then(res => {
        if (res.code != 5000) {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    tijiao() {
      const arr = [];
      this.imgList.forEach(item => {
        var types = "";
        if (item.types.length != 0) {
          types = item.types.join(",");
        }
        console.log(item.types);

        let obj = {
          classId: this.classId,
          types: types,
          stuid: item.stuid
        };
        arr.push(this.insertteamOne(obj));
      });
      Promise.all(arr).then(result => {
        this.$message({ type: "success", message: "提交成功" });
        for (let i = 0; i < this.imgList.length; i++) {
          this.studentList[i] = false;
        }
        this.jtrycx();
      });
    },
    //  http://xx.com/honor/teamhonor/queryTeam?classid=36
    quchong(list) {
      var res = [];
      var json = {};
      for (var i = 0; i < list.length; i++) {
        if (!json[list[i]]) {
          res.push(list[i]);
          json[list[i]] = 1;
        }
      }
      return res;
    },
    resetting(key) {
      this.chooseStudentList.forEach(item => {
        console.log("第" + item + "个同学");

        this.imgList[item].types.forEach((ite, index) => {
          console.log("types ite=" + ite, ite != key);
          if (ite == key) {
            this.imgList[item].types.splice(index, 1);
          }
        });
        //  this.imgList[item].types=this.quchong(this.imgList[item].types);
      });
      this.imgList.forEach((item, index) => {
        var Str = "";
        item.zu = "";
        item.ke = "";
        item.yuan = "";
        item.bang = "";
        item.types.forEach(element => {
          if (element == 1) {
            item.zu = Str + "【" + "组" + "】";
          }
          if (element == 2) {
            item.ke = Str + "【" + "科" + "】";
          }
          if (element == 3) {
            item.yuan = Str + "【" + "员" + "】";
          }
          if (element == 4) {
            item.bang = Str + "【" + "帮" + "】";
          }
        });
        // item.type_ = Str;
      });
      console.log(this.imgList);
      this.$delete(this.imgList);
      this.$set(this.imgList);
    },
    setting(key) {
      console.log("first");
      console.log("key=" + key);
      this.chooseStudentList.forEach(item => {
        console.log("第" + item + "个同学");
        if (this.imgList[item].types.length == 0) {
          this.imgList[item].types.push(key);
        } else {
          this.imgList[item].types.forEach(ite => {
            console.log("types ite=" + ite, ite != key);
            if (ite != key) {
              this.imgList[item].types.push(key);
            }
          });
        }
        this.imgList[item].types = this.quchong(this.imgList[item].types);
      });

      this.imgList.forEach((item, index) => {
        var Str = "";
        item.types.forEach(element => {
          if (element == 1) {
            item.zu = Str + "【" + "组" + "】";
          }
          if (element == 2) {
            item.ke = Str + "【" + "科" + "】";
          }
          if (element == 3) {
            item.yuan = Str + "【" + "员" + "】";
          }
          if (element == 4) {
            item.bang = Str + "【" + "帮" + "】";
          }
        });
        // item.type_ = Str;
      });
      this.$delete(this.imgList);
      this.$set(this.imgList);
      console.log(this.imgList);
    },

    studentLIst() {
      var list = [];
      this.studentList.forEach((element, index) => {
        if (element == true) {
          list.push(index);
        }
      });
      this.chooseStudentList = list;
      console.log(this.chooseStudentList, "chosss");
    },
    //http://xx.com/honor/teamhonor/queryTeam?classid=36 教师集体性荣誉查询
    jtrycx() {
      let data = {
        classid: this.classId
      };
      this.$get("/honor/teamhonor/queryTeam", data).then(res => {
        this.imgList = res.data;
        this.distype();
        // console.log(this.imgList,"types")
        this.imgList.forEach(item => {
          console.log(item, "111111ssssssss");
          var Str = "";
          item.types.forEach(element => {
            if (element == 1) {
              item.zu = Str + "【" + "组" + "】";
            }
            if (element == 2) {
              item.ke = Str + "【" + "科" + "】";
            }
            if (element == 3) {
              item.yuan = Str + "【" + "员" + "】";
            }
            if (element == 4) {
              item.bang = Str + "【" + "帮" + "】";
            }
          });
          item.type_ = Str;
        });
      });
    },
    distype() {
      //区分各个类型
      var list1 = [];
      var list2 = [];
      var list3 = [];
      var list4 = [];
      this.imgList.forEach(item => {
        if (item.types.length != 0) {
          item.types.forEach(ite => {
            if (ite == 1) {
              list1.push(item);
            }
            if (ite == 2) {
              list2.push(item);
            }
            if (ite == 3) {
              list3.push(item);
            }
            if (ite == 4) {
              list4.push(item);
            }
          });
        }
      });
      this.list1 = list1;
      this.list2 = list2;
      this.list3 = list3;
      this.list4 = list4;
      console.log("lissssssssss");
      console.log(list1, list2, list3, list4);
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.bigBox2 = true;
        this.bigbox_ = false;
      } else if (this.activeName == "second") {
        this.bigBox2 = false;
        this.bigbox_ = true;
      }
    },
    rongyusetting() {
      this.bigbox_ = false;
      this.bigBox2 = true;
    },
    selectHonor1() {
      // console.log(this.bigBox2,this.bigBox_)
      this.bigBox2 = false;
      this.bigbox_ = true;
    },
    onMousteIn: function(index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function(index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },
    toStudentPage(item) {
      console.log(item, "sssssssss");
    },
    parentFn(payload) {
      this.data = payload;
      this.bigBox_ = false;
      this.bigBox2 = true;
    },
    selectChoose() {
      console.log(1111);
      this.jtrycx();
    },

    selectClasses() {
      let data = {
        userId: sessionStorage.getItem("userId")
      };
      this.$post("/user/classes/query", data).then(res => {
        if (res.code == 5000) {
          this.classesList = res.data;
          if (this.classesList.length != 0) {
            this.classId = this.classesList[0].id;
          }
        }
      });
    },
    showBtns() {
      this.myShow = !this.myShow;
    }
  }
};
</script>
<style scoped lang="less">
.xianslist {
  position: relative;
  float: right;
  margin-top: -96px;
  margin-right: -30px;
}
.main-dd {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.sicon {
  display: flex;
  align-items: center;
}
.myListItem {
  display: flex;
  justify-content: space-around;
}
.myedit {
  margin-left: 330px;
}
.left {
  float: left;
  text-align: right;
  width: 20%;
  padding: 10px;
  box-sizing: border-box;
  span {
    display: inline-block;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
}
.right {
  float: left;
  width: 80%;
  margin-top: 20px;
  padding-right: 200px;
  box-sizing: border-box;
  li {
    width: 10%;
    float: left;
    text-align: center;
    list-style-type: none;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}
.bigbox {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}
.title {
  margin-left: 21px;
  top: 391px;
  width: 140px;
  height: 29px;
  color: rgba(16, 16, 16, 1);
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.jinpai {
  width: 150px;
  height: 39px;
  border-radius: 4px;
  display: inline-block;
  color: #303133;
  font-size: 18px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid #e8e8e8;
  // &:hover {
  //   background: #2ab8b3;
  // }
  &:active {
    background: rgba(16, 16, 16, 0.13);
  }
}
.cz {
  float: right;
  margin-left: 20px;
  width: 100px;
  height: 39px;
  border-radius: 4px;
  background-color: #409eff;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
// .yinpai {
//   display: inline-block;
//   width: 200px;
//   height: 39px;
//   border-radius: 4px;
//   color: rgba(16, 16, 16, 1);
//   font-size: 18px;
//   text-align: center;
//   font-family: Microsoft Yahei;
//   border: 1px solid rgba(187, 187, 187, 1);
// }
// .tongpai {
//   width: 200px;
//   height: 39px;
//   border-radius: 4px;
//   display: inline-block;
//   color: rgba(16, 16, 16, 1);
//   font-size: 18px;
//   text-align: center;
//   font-family: Microsoft Yahei;
//   border: 1px solid rgba(187, 187, 187, 1);
// }
.listStundent {
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  .myList {
    flex: 1;
    margin-top: 50px;
  }
  .listOne {
    width: 70%;
    .title {
      display: block;
      width: 95.3%;
      border-bottom: 1px solid #d5efe6;
      span {
        padding: 4px;
        background-color: #2ab8b3;
      }
      .btnRight {
        background: rgba(0, 0, 0, 0);
        float: right;
        position: relative;
        right: 0px;
        top: -14px;

        .elbtn {
          border: 0;
          margin-left: 10px;
          color: #fff;
        }
      }
    }
    .listImgBox {
      width: 23.5%;
      height: 190px;
      display: inline-block;
      text-align: center;
      border: 1px solid #eee;
      // padding-left: 28px;

      .deleteBox {
        width: 85%;
        height: 80%;
        margin: 0 auto;
        position: relative;
        .showBox {
          position: absolute;
          width: 130px;
          height: 97px;
          background-color: #7d786f;
          top: -10px;
          right: -105px;
          padding-top: 10px;
          p {
            color: #fff;
          }
        }
        //   background: url();
        #my-img {
          // :hover {
          //   src: "../../../../static/images/删除.png";
          // }
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto;
          margin-bottom: 10px;
          margin-top: 30px;
        }
      }
    }

    .Grouping {
      width: 100%;
      border-right: 1px solid #d5efe6;
      border-left: 1px solid #d5efe6;
      .GroupingList {
        //  display: flex;
        width: 100%;
        .GroupingLeft {
          border-right: 1px solid #d5efe6;
          border-bottom: 1px solid #d5efe6;
          display: flex;
          font-size: 18px;
          color: #2ab8b3;
          div {
            width: 179px;
            text-align: center;

            border-right: 1px solid #d5efe6;
            p {
              margin-bottom: 20px;
            }
            span {
              font-size: 14px;
              border-radius: 5px;
            }
          }
          .GroupingRight {
            flex: 1;
            //  border-bottom: 1px solid #d5efe6;
            box-sizing: border-box;
            //    padding-left: 30px;
            .rightImgBox {
              float: left;
              border: 1px solid #eee;
              width: 19.8%;
              //  text-align: center;
              height: 149px;
              // display: inline-block;
              img {
                width: 60px;
                height: 60px;
                display: block;
                border-radius: 50%;
                margin: 0 auto;
                margin-top: 36px;
                margin-bottom: 15px;
              }
            }
          }
        }
      }
    }
  }
}
.select {
  margin: 45px 0 60px 25px;
}
// .bigBox {
//   width: 100%;

//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;

//   .boxLeft {
//     width: 22%;
//     border-right: 1px solid #eee;
//     padding: 15px;

//     box-sizing: border-box;
//     .xueke {
//       width: 100%;

//       text-align: center;
//       background-color: #2ab8b3;
//       span {
//         display: inline-block;
//         padding: 10px;
//         color: #fff;
//         font-size: 16px;
//       }
//     }
//     .three {
//       padding: 10px 0px;
//       border-top: 1px solid #eee;
//       width: 100%;
//       margin-top: 20px;
//       box-sizing: border-box;
//     }
//   }
//   .boxRight {
//     flex: 1;
//     padding: 15px;
//     .showBtn {
//       height: 20px;
//       margin-right: 25px;
//       margin-top: 20px;
//       img {
//         float: right;
//       }
//     }
//     .tupu {
//       width: 95%;
//       //  height: 60%;
//       //  height: 500px;
//       height: 800px;
//       border: 1px solid #ccc;
//       margin: 0 auto;
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .myBtn {
//       margin: 0 auto;
//       border-top: 1px solid #ccc;
//       width: 95%;
//       .conter {
//         padding: 10px 0px;
//         width: 100%;
//         // height: 23%;
//         //    height: 300px;
//         .btnS {
//           display: inline-block;
//         }
//         span {
//           font-size: 16px;
//           display: inline-block;
//           padding: 5px;
//         }
//       }
//     }
//   }
// }
</style>