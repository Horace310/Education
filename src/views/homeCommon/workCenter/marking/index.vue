<template>
  <div class="marking" style="background:white;padding:15px;margin-bottom:20px">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="试卷上传" name="one"></el-tab-pane>
        <el-tab-pane label="异常处理" name="three"></el-tab-pane>
        <el-tab-pane label="阅卷修订" name="two"></el-tab-pane>
        <el-tab-pane label="考试统计" name="four"></el-tab-pane>
      </el-tabs>
      <component :is="views" />
    </div>
  </div>
</template>


<script>
import TestUpload from "./testUpload";
import MarkingInquiry from "./markingInquiry";
import Statistics from "./statistics";
import Abnormal from "./abnormal";
export default {
  components: {
    TestUpload,
    MarkingInquiry,
    Statistics,
    Abnormal
  },
  data() {
    return {
      views: TestUpload,
      activeName: "one"
    };
  },
  methods: {
    tabClick(assembly, dd) {
      if (this.activeName == "one") {
        this.views = TestUpload;
      } else if (this.activeName == "two") {
        this.views = MarkingInquiry;
      } else if (this.activeName == "three") {
        this.views = Abnormal;
      } else if (this.activeName == "four") {
        this.views = Statistics;
      }
    }
  }
};
</script>

<style scoped>
</style>