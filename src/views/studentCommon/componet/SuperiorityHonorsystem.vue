<template>
  <div>
    <!--优胜性荣誉-->
    <div>
      <div class="bigBox" v-if="flags">
        <div class="boxLeft">
          <div class="xueke">
            <el-select v-model="SubjectName" placeholder="请选择学科" @change="getSubjectId">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="three">
            <subject @childFn="childFn" />
          </div>
        </div>
        <div class="boxRight">
          <!-- <div class="tupu">
                        <knowledge />
          </div>-->
          <div style="margin-top:20px;margin-left:30px;">
            <h1>{{title}}</h1>
            <div style="margin-top:20px" v-if="key1">
              <template>
                <el-table :data="alltype" border style="width:601px">
                  <el-table-column type="index" label="序号" width="180"></el-table-column>
                  <el-table-column prop="NAME" label="章名" width="180"></el-table-column>
                  <el-table-column prop="type" label="奖牌" width="240">
                    <template slot-scope="scope">
                      <!-- 0无1金2银3铜 -->
                      {{scope.row.type==0?"":(scope.row.type==1?"金":(scope.row.type==2?"银":"铜"))}}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <div style="margin-top:20px" v-if="key2">
              <template>
                <el-table :data="alltype" border style="width:601px">
                  <el-table-column type="index" label="序号" width="180"></el-table-column>
                  <el-table-column prop="NAME" label="节名" width="180"></el-table-column>
                  <el-table-column prop="type" label="奖牌" width="240">
                    <template slot-scope="scope">
                      <!-- 0无1金2银3铜 -->
                      {{scope.row.type==0?"":(scope.row.type==1?"金":(scope.row.type==2?"银":"铜"))}}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <div style="margin-top:20px" v-if="key3">
              <template>
                <el-table :data="alltype" border style="width:601px">
                  <el-table-column type="index" label="序号" width="180"></el-table-column>
                  <el-table-column prop="NAME" label="单元名" width="180"></el-table-column>
                  <el-table-column prop="type" label="奖牌" width="240">
                    <template slot-scope="scope">
                      <!-- 0无1金2银3铜 -->
                      {{scope.row.type==0?"":(scope.row.type==1?"金":(scope.row.type==2?"银":"铜"))}}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
        <div class="boxRight2" style="margin-top:15px;">
          <div>
            <button class="button1" @click="selcet_()">荣誉检索</button>
          </div>
          <!-- <div style="margin-top:20px;">
                        <button class="button1" @click="sure(0)">章之星</button>
                    </div>
                    <div  style="margin-top:20px;">
                        <button class="button1" @click="sure(1)">节之星</button>
                    </div>
                    <div  style="margin-top:20px;">
                        <button class="button1" @click="sure(2)">单元之星</button>
          </div>-->
        </div>
      </div>
      <div v-if="!flags">
        <div>
          <!-- <span>学科：</span>
                   <el-select  v-model="value" placeholder="请选择">
                       <el-option
                         v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                       ></el-option>
          </el-select>-->
          <el-button @click="back()" size="mini">返回</el-button>

          <hr />
        </div>

        <div style="margin-top:40px;">
          <h1>章之星列表</h1>
          <el-table :data="zhang" show-summary border style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="NAME" label="章"></el-table-column>
            <el-table-column sortable prop="type1" label="金"></el-table-column>
            <el-table-column sortable prop="type2" label="银"></el-table-column>
            <el-table-column sortable prop="type3" label="铜"></el-table-column>
          </el-table>
        </div>
        <div style="margin-top:20px;">
          <h1>节之星列表</h1>
          <el-table :data="jie" show-summary border style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="NAME" label="节"></el-table-column>
            <el-table-column sortable prop="type1" label="金"></el-table-column>
            <el-table-column sortable prop="type2" label="银"></el-table-column>
            <el-table-column sortable prop="type3" label="铜"></el-table-column>
          </el-table>
        </div>
        <div style="margin-top:20px;">
          <h1>单元之星列表</h1>
          <el-table :data="tableData2" show-summary border style="width: 100%">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="单元"></el-table-column>
            <el-table-column sortable prop="amount1" label="金"></el-table-column>
            <el-table-column sortable prop="amount2" label="银"></el-table-column>
            <el-table-column sortable prop="amount3" label="铜"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import knowledge from "../../../views/homeCommon/resourceTools/sb";
import subject from "../../../components/grade/subject2";
import Utils from "../../../../static/js/util";
export default {
  components: {
    knowledge,
    subject
  },
  data() {
    return {
      value: "",
      options: [
        {
          value: "1",
          label: "语文"
        },
        {
          value: "2",
          label: "数学"
        }
      ],
      flags: true,
      SubjectName: "", //学科名
      SubjectId: 0, //学科id
      teacherList: [],
      list: ["章之星", "节之星", "单元之星"],
      title: "",
      tableData: [{ name: "第一章", address: 1 }],
      zhang: [],
      jie: [],
      tableData2: [],
      key1: false,
      key2: false,
      key3: false,
      pid: "",
      alltype: []
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    childFn(value) {
      // console.log(value,"vuae")
      this.pid = value.id;
      var key =
        value.code.length == 4
          ? 1
          : value.code.length == 5
          ? 2
          : value.code.length == 7
          ? 3
          : 0;
      this.title = this.list[key - 1];
      if (key == 1) {
        this.key1 = true;
        this.key2 = false;
        this.key3 = false;
      }
      if (key == 2) {
        this.key2 = true;
        this.key1 = false;
        this.key3 = false;
      }
      if (key == 3) {
        this.key3 = true;
        this.key2 = false;
        this.key1 = false;
      }
      // http://xx.com/honor/czhonor/StfindZjOne?pid=244
      this.$get("/honor/czhonor/StfindZjOne", { pid: this.pid }).then(res => {
        this.alltype = res.data;
      });
    },
    rongyujianshuo() {
      // http://xx.com/honor/czhonor/StfindZjAll?type=0&subjectid=5
      let data = {};
      data.type = 0;
      data.subjectid = this.SubjectName;
      this.$get("/honor/czhonor/StfindZjAll", data).then(res => {
        this.zhang = res.data;
      });
    },
    rongyujianshuo2() {
      // http://xx.com/honor/czhonor/StfindZjAll?type=0&subjectid=5
      let data = {};
      data.type = 1;
      data.subjectid = this.SubjectName;
      this.$get("/honor/czhonor/StfindZjAll", data).then(res => {
        this.jie = res.data;
      });
    },

    back() {
      this.flags = true;
    },
    selcet_() {
      this.flags = false;
    },
    sure(key) {},
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;
      Utils.$emit("subjectId", this.SubjectId);
      this.rongyujianshuo();
      this.rongyujianshuo2();
    },
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
      });
    }
  }
};
</script>
<style scoped lang="less">
.bigBox {
  width: 100%;
  height: 1010px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  .boxLeft {
    width: 20%;
    // border-right: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;
    border-right: 10px solid #eee;
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
    width: 65%;
    flex: 1;
    padding: 15px;
    .tupu {
      width: 800px;
      height: 700px;
      border: 1px solid #ccc;
      margin: 0 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .myBtn {
      margin: 0 auto;
      width: 95%;
      .conter {
        padding: 10px 0px;
        width: 100%;
        height: 23%;
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
.button1 {
  height: 33px;
  border-radius: 4px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>