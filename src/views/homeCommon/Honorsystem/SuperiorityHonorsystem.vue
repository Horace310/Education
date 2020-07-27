<template>
  <div>
    <div class="bigBox" v-show="bigBox_">
      <div class="boxLeft">
        <div class="xueke">
          <span>{{ subjectName }}</span>
        </div>
        <div class="three">
          <subject2 @childFn="parentFn" />
        </div>
      </div>
      <div class="boxRight">
        <div v-show="true">
          <!-- <div @click="tiao" style="display:inline">
        <goBack :direction="true"></goBack>
          </div>-->
          <!-- <i style="font-size:25px;cursor:pointer" class="el-icon-back" @click="tiao"></i> -->
          <div class="select">
            <el-row>
              <el-col>
                <span>班级：</span>
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
          <div>
            <h1
              style="text-align:center"
            >{{data.name}} {{data.falg_==1?'章之星授予':(data.falg_==2?'节之星授予':'单元之星授予')}}</h1>
          </div>
          <div class="listStundent">
            <div class="listOne">
              <p class="title">
                <span class="text" style="color:#fff;padding:5px">学生列表</span>
              </p>
              <!-- <div style="postion:relative;">

              </div>-->
              <div
                class="listImgBox"
                v-for="(item, index) in imgList"
                :key="index"
                style="float:left;display:inline-block"
              >
                <div class="deleteBox" @click="toStudentPage(item)">
                  <img
                    id="my-img"
                    :src="item.avatar"
                    @mousemove="onMousteIn(index)"
                    @mouseleave="onMousteOut()"
                  />
                  <!-- <span>{{ item.username }}</span> -->
                  <img :src="urlList[0]" alt width="25px;" height="25px;" v-if="item.type==1" />
                  <img :src="urlList[1]" alt width="25px;" height="25px;" v-if="item.type==2" />
                  <img :src="urlList[2]" alt width="25px;" height="25px;" v-if="item.type==3" />
                  <el-checkbox
                    v-model="studentList[index]"
                    @change="studentLIst()"
                  >{{item.username}}</el-checkbox>

                  <!-- <el-radio v-model="studentList[index]" :label="item.userId">备选项</el-radio> -->
                  <!-- <div class="showBox" v-show="seen && index == current">
                          <p>姓名:{{ item.username }}</p>
                          <p>班级:{{ item.className }}</p>
                          <p>学号:{{ item.studentId }}</p>
                        
                  </div>-->
                </div>
              </div>
            </div>
            <div style="float:right;margin-right:200px;postion:relative;">
              <div class="jinpai" style="cursor: pointer">
                <img src="../../../../static/images/jinBig.png" />
                <el-button type="primary" size="mini" @click="submit(1)">授予</el-button>
              </div>
              <div class="jinpai" style="margin-top:70px;cursor: pointer">
                <img src="../../../../static/images/yinBig.png" />
                <el-button type="primary" size="mini" @click="submit(2)">授予</el-button>
              </div>
              <div class="jinpai" style="margin-top:70px;cursor: pointer">
                <img src="../../../../static/images/tongBig.png" />
                <el-button type="primary" size="mini" @click="submit(3)">授予</el-button>
              </div>
              <el-button style="margin-top:70px;margin-left:12px" size="small" @click="submit(0)">重置</el-button>
            </div>
          </div>
        </div>
        <!-- <div class="tupu">
          <knowledge2 />
        </div>-->
      </div>
    </div>
    <div v-show="false">
      <!-- <div @click="tiao" style="display:inline">
        <goBack :direction="true"></goBack>
      </div>-->
      <i style="font-size:25px;cursor:pointer" class="el-icon-back" @click="tiao"></i>
      <div class="select">
        <el-row>
          <el-col>
            <span>学段：</span>
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
      <div>
        <h1
          style="text-align:center"
        >{{data.name}} {{data.falg_==1?'章之星授予':(data.falg_==2?'节之星授予':'单元之星授予')}}</h1>
      </div>
      <div class="listStundent">
        <div class="listOne">
          <p class="title">
            <span class="text" style="color:#fff;padding:5px">学生列表</span>
          </p>
          <!-- <div style="postion:relative;">

          </div>-->
          <div
            class="listImgBox"
            v-for="(item, index) in imgList"
            :key="index"
            style="float:left;display:inline-block"
          >
            <div class="deleteBox" @click="toStudentPage(item)">
              <img
                id="my-img"
                :src="item.avatar"
                @mousemove="onMousteIn(index)"
                @mouseleave="onMousteOut()"
              />
              <!-- <span>{{ item.username }}</span> -->
              <img :src="urlList[0]" alt width="25px;" height="25px;" v-if="item.type==1" />
              <img :src="urlList[1]" alt width="25px;" height="25px;" v-if="item.type==2" />
              <img :src="urlList[2]" alt width="25px;" height="25px;" v-if="item.type==3" />
              <el-checkbox v-model="studentList[index]" @change="studentLIst()">{{item.username}}</el-checkbox>

              <!-- <el-radio v-model="studentList[index]" :label="item.userId">备选项</el-radio> -->
              <!-- <div class="showBox" v-show="seen && index == current">
                          <p>姓名:{{ item.username }}</p>
                          <p>班级:{{ item.className }}</p>
                          <p>学号:{{ item.studentId }}</p>
                        
              </div>-->
            </div>
          </div>
        </div>
        <div style="float:right;margin-right:200px;postion:relative;">
          <div class="jinpai" style="cursor: pointer">
            <img src="../../../../static/images/jinBig.png" />
            <el-button type="primary" size="mini" @click="submit(1)">授予</el-button>
          </div>
          <div class="jinpai" style="margin-top:70px;cursor: pointer">
            <img src="../../../../static/images/yinBig.png" />
            <el-button type="primary" size="mini" @click="submit(2)">授予</el-button>
          </div>
          <div class="jinpai" style="margin-top:70px;cursor: pointer">
            <img src="../../../../static/images/tongBig.png" />
            <el-button type="primary" size="mini" @click="submit(3)">授予</el-button>
          </div>
          <el-button style="margin-top:70px;margin-left:12px" size="small" @click="submit(0)">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject2 from "../../../components/grade/subject2.vue";
import knowledge2 from "../../../views/homeCommon/resourceTools/sb2";
import goBack from "../../../components/common/goBack";
export default {
  components: {
    subject2,
    knowledge2,
    goBack
  },
  data() {
    return {
      urlList: [
        require("../../../../static/images/jinBig.png"),
        require("../../../../static/images/yinBig.png"),
        require("../../../../static/images/tongBig.png")
      ],
      studentIdString: "",
      studentList: [],
      current: 0, //鼠标移入index
      seen: false,
      data: {}, //this.data.code 章节码
      classId: "",
      imgList: [],
      classesList: [],
      bigBox2: false,
      bigBox_: true,
      myShow: false,
      subjectName: sessionStorage.getItem("subjectName")
    };
  },
  created() {
    var that = this;
    that.selectClasses();
    // setTimeout(function() {
    //   that.chatStudent();
    // }, 1000);
  },
  methods: {
    tiao() {
      this.bigBox_ = true;
      this.bigBox2 = false;
    },
    // pid=244&classId=36&stuIds=23,24&type=1
    submit(key) {
      let data = {
        type: key,
        pid: this.data.id,
        classId: this.classId,
        stuIds: this.studentIdString
      };
      // honor/czhonor/insert?pid=244&classId=36&stuIds=23,24&type=1
      this.$post("/honor/czhonor/insert", data).then(res => {
        if (res.code == 5000) {
          this.$message({
            methods: "success",
            message: "成功"
          });
          for (let i = 0; i < this.imgList.length; i++) {
            this.studentList[i] = false;
          }
        }
        this.selectChoose();
      });
    },
    studentLIst() {
      var list = [];
      this.studentList.forEach((element, index) => {
        if (element == true) {
          list.push(this.imgList[index].user_id);
        }
      });
      this.studentIdString = list.join(",");
      console.log(this.studentIdString);
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
      console.log(item);
    },
    parentFn(payload) {
      this.data = payload;
      // this.bigBox_ = false;
      // this.bigBox2 = true;
      this.chatStudent();
    },
    selectChoose() {
      console.log(1111);
      this.chatStudent();
    },
    chatStudent() {
      let data = {
        classid: this.classId,
        pid: this.data.id
      };
      // http://127.0.0.1:8301/honor/czhonor/findZjx?classid=36&pid=244
      this.$get("/honor/czhonor/findZjx", data).then(res => {
        this.imgList = res.data;
        console.log(this.imgList, "imgList");

        // res.data.forEach((item, index) => {
        //   this.lid.push(item.id);
        // });
        //   console.log(this.lid);
      });
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
.jinpai {
  border-radius: 4px;
  // background-color: rgba(236, 208, 99, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 80px;
  }
  button {
    margin-top: 5px;
  }
}
.yinpai {
  width: 116px;
  height: 52px;
  border-radius: 4px;
  background-color: #d1722e;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.tongpai {
  width: 116px;
  height: 52px;
  border-radius: 4px;
  background-color: #adc1c2;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.tongpai2 {
  width: 116px;
  height: 52px;
  border-radius: 4px;
  background-color: #409eff;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.listStundent {
  padding: 0px 20px;
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
      height: 150px;
      display: inline-block;
      text-align: center;
      border: 1px solid #eee;
      // padding-left: 28px;

      .deleteBox {
        width: 60%;
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
      height: 800px;
      border: 1px solid #ccc;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .myBtn {
      margin: 0 auto;
      border-top: 1px solid #ccc;
      width: 95%;
      .conter {
        padding: 10px 0px;
        width: 100%;
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
</style>