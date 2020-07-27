<template>
  <div style="margin-top:30px">
    <el-card class="mt72">
      <i
        style="position:absolute;left:760px;font-size:25px;cursor:pointer;z-index:9999"
        class="el-icon-question"
        @click="dialogVisible = true"
      ></i>
      <el-tabs v-model="activeName">
        <el-tab-pane label="成长性荣誉" name="first">
          <div v-show="czxry">
            <div class="select">
              <el-row>
                <el-col>
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

            <div class="listStundent">
              <div class="listOne">
                <p class="title">
                  <span class="text" style="color:#fff;padding:5px">学生列表</span>
                </p>
                <div class="listImgBox" v-for="(item, index) in imgList" :key="index">
                  <div class="deleteBox" @click="toStudentPage(item)">
                    <img
                      id="my-img"
                      :src="item.avatar"
                      @mousemove="onMousteIn(index)"
                      @mouseleave="onMousteOut()"
                    />

                    <span>{{ item.username }}</span>
                    <div class="showBox" v-show="seen && index == current">
                      <p>姓名:{{ item.username }}</p>
                      <p>班级:{{ item.NAME }}</p>
                      <p>共计:{{ item.cont}}纪念章</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="czxry_">
            <div>
              <el-buttom @click="czxry_=false,czxry=true">返回</el-buttom>
            </div>
            <hr />
            <div style="margin:57px 0 0 21px;">
              <h2>{{OneStudent.username}}同学纪念章列表</h2>
            </div>
            <div style="margin:50px 0 0 21px;">
              <el-row :gutter="10">
                <el-col :span="8">
                  <span>开始时间</span>
                  <el-date-picker size="mini" v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-col>
                <el-col :span="8">
                  <span>结束时间</span>
                  <el-date-picker size="mini" v-model="endTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-col>
                <el-col :span="8">
                  <span style="float:left">学科</span>
                  <div style="float:left;margin-left:10px;">
                    <el-input size="mini" disabled v-model="subjectName"></el-input>
                  </div>

                  <!-- <el-select v-model="classId" placeholder="请选择" size="mini" >
                          <el-option
                              v-for="(item,index) in [1,2,3,4]"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                  </el-select>-->
                </el-col>
              </el-row>
            </div>
            <div style="width:550px;margin-top:100px;margin-left:21px;">
              <tr style="background-color:#bbb;text-align:center;height:34px;">
                <td style="width:137px;height:34px;">序号</td>
                <td style="width:137px;height:34px;">学科</td>
                <td style="width:137px;height:34px;">作业数量</td>
                <td style="width:137px;height:34px;">纪念章数量</td>
              </tr>
              <tr v-for="(item,index) in list" :key="index">
                <td
                  align="center"
                  style="border:1px solid rgba(229,229,229,1);height:34px"
                >{{index+1}}</td>
                <td
                  align="center"
                  style="border:1px solid rgba(229,229,229,1);height:34px"
                >{{subjectName}}</td>
                <td
                  align="center"
                  style="border:1px solid rgba(229,229,229,1);height:34px"
                >{{item.allcont}}</td>
                <td
                  align="center"
                  style="border:1px solid rgba(229,229,229,1);height:34px"
                >{{item.stucont}}</td>
              </tr>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="优胜性荣誉" name="second">
          <superiority-honorsystem v-if="activeName=='second'"></superiority-honorsystem>
        </el-tab-pane>
        <el-tab-pane label="竞赛性荣誉" name="third">
          <competition-honorsystem v-if="activeName=='third'"></competition-honorsystem>
        </el-tab-pane>
        <el-tab-pane label="集体性荣誉" name="fourth">
          <collectivity-honorsystem v-if="activeName=='fourth'"></collectivity-honorsystem>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <p>
        成长性荣誉：学生按时提交作业，系统自动授予纪念章。
        <br />优胜性荣誉：学生在某一章、节或单元表现优秀的，老师
        授予金、银、铜牌勋章。
        <br />竞赛性荣誉：学生在期中、期末或某一次平台竞赛表现优
        秀的，老师授予金、银、铜牌勋章。
        <br />集体性荣誉：老师根据学生在班级的表现，授予优秀小能
        手、优秀科代表、优秀小组成员、优秀好帮
        手称号。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SuperiorityHonorsystem from "./SuperiorityHonorsystem.vue";
import CompetitionHonorsystem from "./CompetitionHonorsystem.vue";
import CollectivityHonorsystem from "./CollectivityHonorsystem.vue";

export default {
  components: {
    SuperiorityHonorsystem,
    CompetitionHonorsystem,
    CollectivityHonorsystem
  },
  data() {
    return {
      dialogVisible: false,
      subjectName: sessionStorage.getItem("subjectName"),
      endTime: "",
      startTime: "",
      czxry_: false,
      czxry: true,
      current: 0, //鼠标移入index
      seen: false,
      imgList: [],
      activeName: "first",
      classesList: [],
      classId: "",
      OneStudent: {},
      list: [
        // {name:"语文",num:"1"},
        // {name:"数学",num:"1"},
        // {name:"英语",num:"1"},
        // {name:"科学",num:"1"},
      ]
    };
  },
  created() {
    var that = this;
    that.selectClasses();
    setTimeout(function() {
      that.chatStudent();
    }, 1000);
  },
  methods: {
    toStudentPage(item) {
      this.OneStudent = item;
      this.czxry = false;
      this.czxry_ = true;
      //  http://xx.com/honor/czhonor/findDetail?classid=36&stuid=22
      let data = {
        classid: this.classId,
        stuid: item.user_id
      };
      this.$get("/honor/czhonor/findDetail?", data).then(res => {
        this.list = res.data;
      });
    },
    //移入
    onMousteIn: function(index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function(index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },
    selectChoose() {
      console.log(1111);
      this.chatStudent();
    },
    selectClasses() {
      let data = {
        // userId: sessionStorage.getItem("userId")
      };
      this.$get("/user/classes/selectByUserId", data).then(res => {
        if (res.code == 5000) {
          this.classesList = res.data;
          if (this.classesList.length != 0) {
            this.classId = this.classesList[0].id;
          }
        }
      });
    },
    //查看班级学生
    chatStudent() {
      let data = { classid: this.classId };
      //  http://xx.com/honor/czhonor/queryAll?classid=36

      this.$get("/honor/czhonor/queryAll", data).then(res => {
        // console.log(res)
        this.imgList = res.data;
        console.log(this.imgList, "imgList");
      });
    }
  }
};
</script>
<style scoped lang="less">
.listStundent {
  padding: 0px 20px;
  .el-tabs__nav-wrap::after {
    content: "";
    background: white;
  }
  .listOne {
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
      width: 16.5%;
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
        img {
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
.box-card {
  width: 1300px;
  height: 1098px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  margin-left: 309px;
}
/* width:1920px; */
/* height:1293px; */
</style>