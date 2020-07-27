<template>
  <div>
    <el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="荣誉授予" name="first"></el-tab-pane>
        <el-tab-pane label="勋章查询" name="second"></el-tab-pane>
        <el-tab-pane label="竞赛类型管理" name="third"></el-tab-pane>
      </el-tabs>
    </el-row>
    <div v-show="bigBox2">
      <div style="margin-left:21px;">
        <!-- <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>-->
      </div>
      <div class="select">
        <el-row :gutter="5">
          <el-col :span="6">
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
          <el-col :span="6">
            <span>竞赛类型：</span>
            <el-select v-model="typeid" placeholder="请选择" size="mini" @change="changtype">
              <el-option
                v-for="(item,index) in competitionType"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div></div>
      <div class="listStundent">
        <div class="listOne">
          <div style="text-align:center">
            <el-select
              style="width:150px"
              size="mini"
              v-model="jinsaiType"
              @change="jinsaiChange"
              placeholder="请选择竞赛"
            >
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span style="margin-left:10px;font-size:16px">荣誉之星授予</span>
          </div>
          <p class="title">
            <span class="text" style="color:#fff;padding:5px">学生列表</span>
          </p>
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
              <!-- <p>{{item.type}}</p> -->
              <img :src="urlList[0]" alt width="30px;" v-if="item.type==1" />

              <img :src="urlList[1]" alt width="30px;" v-if="item.type==2" />

              <img :src="urlList[2]" alt width="30px;" v-if="item.type==3" />

              <el-checkbox v-model="studentList[index]" @change="studentLIst()">{{item.username}}</el-checkbox>
            </div>
          </div>
        </div>
        <div style="margin: 0 0 0 1000px;position: absolute;">
          <div class="jinpai" style="cursor: pointer">
            <img src="../../../../static/images/jinBig.png" />
            <el-button type="primary" size="mini" @click="setting(1)">授予</el-button>
          </div>
          <div class="jinpai" style="margin-top:70px;cursor: pointer">
            <img src="../../../../static/images/yinBig.png" />
            <el-button type="primary" size="mini" @click="setting(2)">授予</el-button>
          </div>
          <div class="jinpai" style="margin-top:70px;cursor: pointer">
            <img src="../../../../static/images/tongBig.png" />
            <el-button type="primary" size="mini" @click="setting(3)">授予</el-button>
          </div>
          <el-button style="margin-top:70px;margin-left:12px" size="small" @click="setting(0)">重置</el-button>
          <!-- <div class="tongpai1" style="margin-top:70px;cursor: pointer" @click="setting(0)">重置</div> -->
        </div>
      </div>
    </div>
    <div v-show="bigbox_">
      <div style="margin-left:21px;">
        <!-- <el-row>
          <el-button type="primary" @click="settHonor">荣誉授予</el-button>
          <el-button @click="selectHonor">勋章查询</el-button>
        </el-row>-->
        <!-- <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>-->
      </div>
      <div class="select">
        <el-row :gutter="5">
          <el-col :span="6">
            <span>学段：</span>
            <el-select v-model="classId2" placeholder="请选择" size="mini" @change="selectChoose2">
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
          <div
            class="listImgBox"
            v-for="(item, index) in imgList2"
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
              <!-- <img :src="urlList" alt=""> -->
              <!-- <img :src="urlList[0]" alt="" width="25px;" height="25px;" v-if="item.type==1">
                       
                      
                      <img :src="urlList[1]" alt="" width="25px;" height="25px;" v-if="item.type==2">
                
              <img :src="urlList[2]" alt="" width="25px;" height="25px;"  v-if="item.type==3">-->
              <span>{{ item.username }}</span>
              <div class="showBox" v-show="seen && index == current">
                <p>姓名:{{ item.username }}</p>
                <p>班级:{{ item.NAME }}</p>
                <p>共计:{{ item.cont}}纪念章</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="bigbox3">
      <div style="float:right;margin-bottom:15px">
        <el-select
          v-model="typeValue"
          size="mini"
          @change="competitionTypeChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in competitionType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button size="mini" @click="dialogFormVisible=true">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="match_type" label="竞赛类型">
          <template slot-scope="scope">
            <span v-if="scope.row.match_type==1">期中</span>
            <span v-if="scope.row.match_type==2">期末</span>
            <span v-if="scope.row.match_type==3">平台竞赛</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="竞赛名称" width="180"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加荣誉竞赛" :visible.sync="dialogFormVisible" width="450px">
      <el-form :model="insertmatchtype" style="margin:0 auto;width:290px">
        <el-form-item label="竞赛名称：">
          <el-input style="width:200px" v-model="insertmatchtype.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="竞赛类型：">
          <el-select style="width:200px" v-model="insertmatchtype.match_type" placeholder="请选择活动区域">
            <el-option
              v-for="item in competitionType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInsertmatchtype">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import subject2 from "../../../components/grade/subject2.vue";
import knowledge2 from "../../../views/homeCommon/resourceTools/sb2";

export default {
  components: {
    subject2,
    knowledge2
  },
  data() {
    return {
      typeValue: "",
      jinsaiType: "",
      insertmatchtype: {
        name: "",
        match_type: ""
      },
      dialogFormVisible: false,
      tableData: [],
      activeName: "first",
      classId2: "",
      typeid: 1,
      bigbox_: false,
      radio: "1",
      current: 0, //鼠标移入index
      seen: false,
      data: {},
      classId: "",
      imgList: [],
      classesList: [],
      bigBox2: true,
      bigBox3: false,

      myShow: false,
      subjectName: sessionStorage.getItem("subjectName"),
      competitionType: [
        // 竞赛类型id 1其中2期末3平台竞赛
        { name: "期中", id: 1 },
        { name: "期末", id: 2 },
        { name: "平台竞赛", id: 3 }
      ],
      goldSize: require("@/assets/glodSize.png"),
      urlList: [
        require("../../../../static/images/jinBig.png"),
        require("../../../../static/images/yinBig.png"),
        require("../../../../static/images/tongBig.png")
      ],
      studentList: [],
      studentIdString: "",
      imgList2: []
    };
  },
  created() {
    var that = this;
    that.selectClasses();
    setTimeout(function() {
      that.competitionSelect();
      that.selectChoose2();
      console.log(this.imgList);
      console.log(this.imgList2);
    }, 1000);
  },
  methods: {
    jinsaiChange(val) {
      this.competitionSelect(val);
    },
    competitionTypeChange() {
      this.getQuery();
    },
    getQuery(id) {
      this.$get("/honor/matchhonor/queryMatchtype", {
        type: id ? id : this.typeValue
      }).then(res => {
        this.tableData = res.data;
        // if (id) {
        //   this.jinsaiType = res.data[0].id;
        // }
      });
    },
    addInsertmatchtype() {
      this.$post(
        "/honor/matchhonor/insertmatchtype",
        this.insertmatchtype
      ).then(res => {
        if (res.code == 5000) {
          this.dialogFormVisible = false;
          this.getQuery();
        }
      });
    },
    // http://xx.com/honor/matchhonor/insertmatch?classId=36&stuIds=23,24&type=2&matchId=2
    setting(key) {
      let data = {};
      data.classId = this.classId;
      data.stuIds = this.studentIdString;
      data.type = key;
      data.matchId = this.typeid;

      this.$post("/honor/matchhonor/insertmatch", data).then(res => {
        console.log(res, "ssssss");
        if (res.code == "5000") {
          this.$message({
            methods: "success",
            message: "成功"
          });
          for (let i = 0; i < this.imgList.length; i++) {
            this.studentList[i] = false;
          }
          this.competitionSelect();
        }
      });
    },
    studentLIst() {
      var list = [];
      this.studentList.forEach((element, index) => {
        if (element == true) {
          console.log(element);
          list.push(this.imgList[index].stuid);
        }
      });
      this.studentIdString = list.join(",");
      console.log(this.studentIdString);
    },
    changtype() {
      this.competitionSelect().then(res => {
        this.jinsaiType = "";
        this.getQuery(res);
      });
    },
    competitionSelect(id) {
      console.log(this.studentList);
      // /honor/matchhonor/querymatch?classid=36&matchid=1
      let data = {
        classid: this.classId,
        matchid: id ? id : this.typeid
      };
      return new Promise((resolve, reject) => {
        this.$get("/honor/matchhonor/querymatch", data).then(res => {
          this.imgList = res.data;
          resolve(this.typeid);
          // this.getQuery(this.typeid);
        });
      });
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.bigBox2 = true;
        this.bigbox_ = false;
        this.bigbox3 = false;
      } else if (this.activeName == "second") {
        this.bigBox2 = false;
        this.bigbox_ = true;
        this.bigbox3 = false;
      } else if (this.activeName == "third") {
        this.bigbox3 = true;
        this.bigBox2 = false;
        this.bigbox_ = false;
      }
    },
    settHonor() {
      this.bigBox2 = true;
      this.bigbox_ = false;
    },
    selectHonor() {
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
      console.log(item);
    },
    parentFn(payload) {
      this.data = payload;
      this.bigBox_ = false;
      this.bigBox2 = true;
    },
    selectChoose() {
      this.competitionSelect();
    },
    selectChoose2() {
      // ` http://xx.com/honor/matchhonor/querymatchAll?classid=36
      let data = {
        classid: this.classId2
      };
      this.$get("/honor/matchhonor/querymatchAll", data).then(res => {
        this.imgList2 = res.data;
        console.log(this.imgList2);
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
            this.classId2 = this.classesList[0].id;
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
  border-radius: 4px;
  // background-color: rgba(236, 208, 99, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
}
.tongpai {
  border-radius: 4px;
  // background-color: rgba(236, 208, 99, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
}
.tongpai1 {
  width: 116px;
  height: 52px;
  border-radius: 4px;

  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.listStundent {
  padding: 0px 20px;
  height: 1000px;
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