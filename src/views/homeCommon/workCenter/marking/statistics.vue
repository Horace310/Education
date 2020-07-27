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
      <el-table-column property="name" label="考试名称" width="120" align="center"></el-table-column>
      <el-table-column property="testNumber" label="平均分" width="120" align="center"></el-table-column>
      <el-table-column property="testId" label="最高分" width="120" align="center"></el-table-column>
      <el-table-column property="fraction" label="最低分" width="120" align="center"></el-table-column>
      <el-table-column property="questionType1" label="应考人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType2" label="参考人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType3" label="缺席人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType4" label="优良人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType2" label="及格人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType3" label="不及格人数" width="120" align="center"></el-table-column>
      <el-table-column property="questionType5" label="优良率%" width="120" align="center"></el-table-column>
      <el-table-column property="questionType6" label="及格率%" width="120" align="center"></el-table-column>
      <el-table-column property="questionType4" label="备注" width="120" align="center"></el-table-column>
    </el-table>
    <div class="testUpload_footer">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createClass: [
        {
          name: "一年级"
        },
        {
          name: "二年级"
        },
        {
          name: "三年级"
        }
      ],
      tableData: [
        {
          name: "文强",
          testNumber: "1",
          testId: "SLLM200310080001",
          testName: "考试1",
          fraction: "100",
          questionType1: "50",
          questionType2: "20",
          questionType3: "10",
          questionType4: "20",
          questionType5: "50%",
          questionType6: "50%"
        },
        {
          name: "文强",
          testNumber: "1",
          testId: "SLLM200310080001",
          testName: "考试1",
          fraction: "100",
          questionType1: "50",
          questionType2: "20",
          questionType3: "10",
          questionType4: "20",
          questionType5: "50%",
          questionType6: "50%"
        },
        {
          name: "文强",
          testNumber: "1",
          testId: "SLLM200310080001",
          testName: "考试1",
          fraction: "100",
          questionType1: "50",
          questionType2: "20",
          questionType3: "10",
          questionType4: "20",
          questionType5: "50%",
          questionType6: "50%"
        },
        {
          name: "文强",
          testNumber: "1",
          testId: "SLLM200310080001",
          testName: "考试1",
          fraction: "100",
          questionType1: "50",
          questionType2: "20",
          questionType3: "10",
          questionType4: "20",
          questionType5: "50%",
          questionType6: "50%"
        },
        {
          name: "文强",
          testNumber: "1",
          testId: "SLLM200310080001",
          testName: "考试1",
          fraction: "100",
          questionType1: "50",
          questionType2: "20",
          questionType3: "10",
          questionType4: "20",
          questionType5: "50%",
          questionType6: "50%"
        },
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ]
    };
  },
  methods: {}
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