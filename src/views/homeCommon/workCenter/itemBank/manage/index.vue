<template>
  <div>
    <div style="background:white;padding:5px 10px 5px 10px">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="平台题库" name="one"></el-tab-pane>
        <el-tab-pane label="文件导入" name="two"></el-tab-pane>
      </el-tabs>
    </div>
    <component :is="views" />
  </div>
</template>


<script>
import Manage from "./manage";
import AddTest from "./AddTest";
export default {
  components: {
    Manage
  },
  data() {
    return {
      views: Manage,
      activeName: "one"
    };
  },
  methods: {
    tabClick(assembly, dd) {
      if (this.activeName == "one") {
        this.views = Manage;
      } else if (this.activeName == "two") {
        this.views = AddTest;
      }
    }
  }
};
</script>

<style scoped>
</style>