<template>
  <div class="growth">
    <div style="margin-bottom:20px;margin-left: 13px;">
      <el-row>
        <el-col>
          <button class="bt1" @click="bigBox_=true">知识点纪念章</button>
          <button class="bt2" @click="bigBox_=false" style="margin-left:20px;">总纪念章</button>
        </el-col>
      </el-row>
    </div>
    <div class="bigBox">
      <div class="boxLeft">
        <div class="xueke" v-if="bigBox_">
          <el-select v-model="SubjectName" placeholder="请选择学科" @change="getSubjectId">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="three" v-if="bigBox_">
          <subject @nianjiid="nianjiid"></subject>
        </div>
        <!-- 页面2-->
        <div v-if="!bigBox_">
          <h1>共：{{jncount}} 枚纪念章</h1>
          <template>
            <el-table :data="tableData2" border style="width:201px">
              <el-table-column prop="subjectName" label="学科" width="100"></el-table-column>
              <el-table-column prop="jnzcont" label="纪念奖章数" width="100"></el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="boxRight" v-if="bigBox_">
        <div style="margin-left:20px;" v-if="bigBox_">
          <h1>{{title}}</h1>
        </div>
        <div style="margin-left:20px;" v-if="bigBox_">
          <template>
            <el-table :data="tableData" border style="width: 615px">
              <el-table-column type="index" label="序号" width="204"></el-table-column>
              <el-table-column prop="name" label="作业" width="204"></el-table-column>
              <el-table-column prop="list" label="纪念章" width="204">
                <template slot-scope="scope" v-if="bigBox_">
                  <img src="../../../../static/images/medal-of-honor.png" width="50" height="40" />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <!-- 页面2 -->
      <div class="boxRight_" v-if="!bigBox_" style="margin-top: 10px;">
        <div style="margin-left:20px;" v-if="!bigBox_">
          <h1>我的纪念奖章</h1>
        </div>
        <div v-if="!bigBox_" style="margin-bottom:20px;margin-left:21px;">
          <el-row :gutter="10">
            <el-col :span="6">
              <span class="demonstration">开始时间</span>
              <el-date-picker
                @change="selecttype()"
                size="mini"
                v-model="stime"
                type="date"
                placeholder="选择日期"
                style="width:60%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <span class="demonstration">结束时间</span>
              <el-date-picker
                @change="selecttype()"
                size="mini"
                v-model="etime"
                type="date"
                style="width:60%"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-select
                v-model="xuekeid"
                placeholder="请选择"
                size="mini"
                style="width:50%"
                :clearable="true"
                @change="selecttype()"
              >
                <el-option
                  v-for="(item,index) in xuekeList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div style="margin-left:20px;" v-if="!bigBox_">
          <template>
            <el-table :data="tableData3" border style="width: 615px">
              <el-table-column type="index" label="序号" width="153"></el-table-column>
              <el-table-column prop="subjectName" label="学科" width="153"></el-table-column>
              <el-table-column prop="zycount" label="作业数量" width="153"></el-table-column>
              <el-table-column prop="jnzcont" label="奖章数量" width="153"></el-table-column>
            </el-table>
          </template>
        </div>
      </div>

      <div class="boxRight2" v-if="bigBox_">
        <div>
          <el-calendar v-model="value" id="calendar" @pick="change">
            <template
              slot="dateCell"
              slot-scope="{ date, data }"
              @pick="change"
              @date-change="change"
            >
              <div style="height:100%" @click="clickDay(data.day)">
                <div
                  style="height:100%"
                  v-if="data.day.split('-').slice(1).join('-').substring(0,2)==momentFun(value)
                .locale('zh-cn')
                .format('MM')"
                  class="calendar-day"
                >
                  {{data.day
                  .split("-")
                  .slice(2)
                  .join("-")}}
                </div>
              </div>
            </template>
          </el-calendar>
          <!-- <Calendar
            style="background-color:#fff"
            ref="Calendar"
            v-on:choseDay="clickDay"
            :markDate="arr2"
            v-on:changeMonth="changeDate"
          ></Calendar>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Calendar from "vue-calendar-component";
// import Calendar from "../FullCalendar.vue";
import subject from "../../../components/grade/subject3";
import Utils from "../../../../static/js/util";
import eleCalendar from "ele-calendar";
import moment from "moment";
export default {
  components: {
    subject,
    eleCalendar
  },
  data() {
    return {
      momentFun: moment,
      value: new Date(),
      xuekeList: "",
      xuekeid: "",
      stime: "",
      etime: "",
      indexNo: "1",
      arr2: [],
      thisday: "",
      calendarDate: new Date(),
      tableData: [
        // {id:1,name:"整式运用周末测试",address:1},
        // {id:2,name:"整式运用周末测试",address:2},
        // {id:3,name:"整式运用周末测试",address:3},
        // {id:4,name:"整式运用周末测试",address:4},
        // {id:5,name:"整式运用周末测试",address:5},
      ],
      SubjectName: "",
      teacherList: [],
      // goldSize:require("@/assets/glodSize.png"),
      goldSize: sessionStorage.getItem("avatar"),
      title: "纪念章列表",
      bigBox_: true,
      tableData2: [],
      tableData3: [],
      oneday: "",
      jncount: ""
    };
  },
  watch: {
    thisday: function(val) {
      console.log(val, this.thisday);
    },
    value(value) {
      this.clickDay(
        moment(value)
          .locale("zh-cn")
          .format("YYYY-MM-DD")
      );
    }
  },
  created() {
    var that = this;
    that.getSubject();
    that.stuFindczbysubject();
    that.stuFindczbysubject2();
    setTimeout(function() {
      that.SubjectName = that.teacherList[0].id;
      that.getSubjectId(that.SubjectName);
      that.selectgrowth();
    }, 1000);
    // that.tableData.forEach(element => {

    //     element.list=that.goldSize
    // });
    // console.log(that.tableData)
  },

  methods: {
    getDateApi(value) {
      alert(value);
    },
    change(value) {
      alert(value);
    },
    selecttype() {
      this.stuFindczbysubject2();
    },
    //总纪念章查询
    //http://xx.com/honor/czhonor/stuFindczbysubject?subjectid=5&starttime=2020-03-05&endtime=2020-03-06
    stuFindczbysubject() {
      let data = {};
      this.$get("/honor/czhonor/stuFindczbysubject", data).then(res => {
        console.log(res, "sssssssssssssssssssss");
        this.tableData2 = res.data;
        var jncount = "";
        this.tableData2.forEach(item => {
          jncount = jncount + item.jnzcont;
        });
        this.jncount = jncount;
      });
    },
    stuFindczbysubject2() {
      let data = {};

      if (this.stime != "") {
        data.starttime = this.stime;
      }
      if (this.etime != "") {
        data.endtime = this.etime;
      }
      if (this.xuekeid != "") {
        data.subjectid = this.xuekeid;
      }
      this.$get("/honor/czhonor/stuFindczbysubject", data).then(res => {
        this.tableData3 = res.data;
      });
    },

    // http://xx.com/honor/czhonor/stuFindcz?subjectid=5&daytime=2020-03-04
    selectgrowth() {
      let data = {};
      if (this.oneday != "") {
        data.daytime = this.oneday;
      }
      data.subjectid = this.SubjectName;
      this.$get("/honor/czhonor/stuFindcz", data).then(res => {
        if (res.code == 5000) {
          this.tableData = res.data.date;
          console.log(this.tableData, "tabledata");
          this.tableData.forEach(element => {
            element.list = this.goldSize;
          });
        }
      });
    },
    nianjiid(val) {
      console.log(val);
    },

    clickDay(data) {
      console.log(data);
      // var timelist = data.split("/");
      // var item =
      //   timelist[0] +
      //   "-" +
      //   (timelist[1].length == 1 ? "0" + timelist[1] : timelist[1]) +
      //   "-" +
      //   (timelist[2].length == 1 ? "0" + timelist[2] : timelist[2]);
      // console.log(item);
      // console.log(data); //选中某天
      this.oneday = data;
      this.selectgrowth();
    },

    changeDate(data) {
      console.log(data); //左右点击切换月份
    },

    sure1() {
      this.bigBox = true;
      console.log(111, this.bigBox);
    },
    sure2() {
      this.bigbox = false;
      console.log(11122, this.bigBox);
    },
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;
      Utils.$emit("subjectId", this.SubjectId);
      this.oneday = "";
      this.selectgrowth();
    },
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.xuekeList = res.data;
      });
    }
  }
};
</script>
<style lang="less">
.wh_top_changge li[data-v-2ebcbc83] {
  color: black;
}
.wh_content_all[data-v-2ebcbc83] {
  border: 1px solid #e8e8e8;
  background: #f8f8f8;
}
.wh_content_item[data-v-2ebcbc83],
wh_content_item_tag[data-v-2ebcbc83] {
  color: black;
}
.wh_content_item .wh_isToday[data-v-2ebcbc83] {
  background-color: rgba(237, 109, 82, 1);
}
.growth {
  .el-calendar-day {
    height: 40px;
  }
  .bt1 {
    cursor: pointer;
    height: 30px;
    border-radius: 4px;
    background-color: rgba(237, 109, 82, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid rgba(187, 187, 187, 1);
  }

  .bt2 {
    cursor: pointer;
    height: 30px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(15, 15, 15, 1);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .bigBox {
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    .boxLeft {
      width: 20%;
      // border-right: 1px solid #eee;
      padding: 10px;
      box-sizing: border-box;
      //   border-right: 10px solid #eee;
      .xueke {
        width: 100%;
        padding: 3px;
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
      width: 55%;
    }
    .boxRight_ {
      width: 80%;
    }
    .boxRight2 {
      width: 25%;
    }
  }
}
</style>