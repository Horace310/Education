<template>
  <div style="margin-bottom:50px;">
    <div class="markingClass">
      <!-- <div class="markingClass_left">
        <div>
          <span>选择班级：</span>
          <el-select
            size="mini"
            v-model="value4"
            clearable
            placeholder="请选择班级"
            @change="queryClassHomework"
          >
            <el-option
              v-for="item in createClass"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>考试名称：</span>
          <el-select
            size="mini"
            v-model="value4"
            clearable
            placeholder="请选择或输入考试名称"
            @change="queryClassHomework"
          >
            <el-option
              v-for="item in createClass"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
      </div>-->
      <div class="markingClass_right">
        <div>参考人数：10</div>
        <div>异常：52</div>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <el-table :data="tableData" height="550" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column property="name" label="学生姓名" width="120" align="center"></el-table-column>
      <el-table-column property="testNumber" label="考号/学号" width="120" align="center"></el-table-column>
      <el-table-column property="textId" label="试卷编号" width="120" align="center"></el-table-column>
      <el-table-column property="sum" label="总分数" width="120" align="center"></el-table-column>
      <el-table-column property="oneChoice" label="单选题" width="120" align="center"></el-table-column>
      <el-table-column property="mulChoice" label="多选题" width="120" align="center"></el-table-column>
      <el-table-column property="decide" label="判断题" width="120" align="center"></el-table-column>
      <el-table-column property="blank" label="填空题" width="120" align="center"></el-table-column>
      <el-table-column property="calculate" label="应用题" width="120" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改分数</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">确认修改</el-button>
          <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">备注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="testUpload_footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="page.pagecount"
        :current-page="page.currentpage"
        @current-change="currentChange_"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      createClass: [],
      tableData: [],
      page: {
        pagecount: null,
        currentpage: 1
      }
    };
  },
  created() {
    this.checkPaper();
  },
  methods: {
    currentChange_(val) {
      console.log(val);
      this.page.currentpage = val;
      this.selectRead();
    },
    checkPaper() {
      this.$get("/user/marking/selectMark", {
        indexNo: this.page.currentpage
      }).then(res => {
        if (res.code == 5000) {
          this.page.pagecount = Number(res.data.count);
          console.log(this.page.pagecount, typeof this.page.pagecount);
          this.tableData = res.data.date;
          console.log(res.data.date);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.markingClass_right {
  float: right;
  display: flex;
  justify-content: space-between;
  width: 260px;
  margin-bottom: 15px;
}
.markingClass_left {
  float: left;
  display: flex;
  justify-content: space-between;
  width: 670px;
  margin-bottom: 15px;
}
.testUpload_footer {
  text-align: center;
  margin-top: 20px;
}
</style>