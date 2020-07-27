<template>
  <div>
    <div style="margin-bottom:20px;">
      <el-row>
        <el-col :span="6">
          <span>学科:</span>
          <el-select
            v-model="xuekeid"
            placeholder="请选择"
            size="mini"
            style="width:50%"
            :clearable="true"
            @change="stuFindMatchAll()"
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
    <div class="card">
      <p class="sss" style="margin-bottom:25px;margin-top:15px">
        你好
        <span style="color:#409EFF;font-size:18px">{{name}}</span> 同学 你在
      </p>
      <p class="sss">
        期中测试获得荣誉勋章
        <span style="border-bottom:1px solid #C0C0C0;padding:0 10px 0 10px">{{A}}</span> 枚
      </p>
      <p class="sss">
        期末测试获得荣誉勋章
        <span style="border-bottom:1px solid #C0C0C0;padding:0 10px 0 10px">{{B}}</span> 枚
      </p>
      <p class="sss">
        平台性测试获得荣誉勋章
        <span style="border-bottom:1px solid #C0C0C0;padding:0 10px 0 10px">{{C}}</span> 枚
      </p>
    </div>
    <div>
      <div style="margin-top:20px;">
        <p style="font-size:20px;margin-bottom:5px">期中,期末测试荣誉勋章列表</p>
        <el-table :data="list1" show-summary border style="width:541px">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="测试名称" width="180"></el-table-column>
          <el-table-column sortable prop="num" label="荣誉勋章" width="180"></el-table-column>
        </el-table>
      </div>

      <div style="margin-top:20px;">
        <p style="font-size:20px;margin-bottom:5px">平台竞赛荣誉勋章列表</p>
        <el-table :data="list3" show-summary border style="width:541px">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="测试名称" width="180"></el-table-column>
          <el-table-column sortable prop="num" label="荣誉勋章" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xuekeid: "",
      xuekeList: [],
      list1: [],
      list2: [],
      list3: [],
      name: sessionStorage.getItem("username"),
      A: "",
      B: "",
      C: ""
    };
  },
  created() {
    this.getSubject();
    this.matchhonor();
  },
  methods: {
    // 学生端竞赛性荣誉
    // http://xx.com/honor/matchhonor/stuFindcount?type=1
    matchhonor() {
      this.$get("/honor/matchhonor/stuFindcount", { type: 1 }).then(res => {
        this.A = res.data == null ? 0 : res.data;
      });
      this.$get("/honor/matchhonor/stuFindcount", { type: 2 }).then(res => {
        this.B = res.data == null ? 0 : res.data;
      });
      this.$get("/honor/matchhonor/stuFindcount", { type: 3 }).then(res => {
        this.C = res.data == null ? 0 : res.data;
      });
    },
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.xuekeList = res.data;
      });
    },

    // http://xx.com/honor/matchhonor/stuFindMatchAll?type=1&subjectid=5
    stuFindMatchAll() {
      this.$get("/honor/matchhonor/stuFindMatchAll", {
        type: 1,
        subjectid: this.xuekeid
      }).then(res => {
        console.log(res);
      });
      this.$get("/honor/matchhonor/stuFindMatchAll", {
        type: 2,
        subjectid: this.xuekeid
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped lang="less">
.card {
  width: 401px;
  height: 213px;
  line-height: 20px;
  border-radius: 17px;
  text-align: center;
  padding: 15px;
  border: 1px solid rgba(187, 187, 187, 1);
}
.sss {
  margin-left: 10px;
  margin-bottom: 25px;
  height: 24px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
</style>