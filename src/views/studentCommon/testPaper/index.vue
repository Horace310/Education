<template>
  <div class="knowledge mt72">
    <div class="con">
      <!--      <el-row :gutter="20">-->
      <!--        <el-col :span="4">-->
      <div class="grid-content bf">
        <el-menu
          active-text-color="#f25c29"
          background-color="#fff"
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          router
          @select="handleSelect"
        >
          <el-menu-item index="/studentCommon/testPaper/scoreQuery">分数查询</el-menu-item>
          <el-menu-item index="/studentCommon/testPaper/paperAnalysis">试卷分析</el-menu-item>
          <!-- <el-menu-item index="/studentCommon/mine/academicCircle">
              学生圈
          </el-menu-item>-->
        </el-menu>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "knowledge",
  data() {
    return {
      activeIndex: "1",
      options: [],
      value4: "选项1"
    };
  },
  created() {
    this.$store.state.stuadminnav = "5"; //头部导航
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath, "handleSelect");
      // if (key == 1) {
      //   this.$router.push({
      //     path: "/studentCommon/mine"
      //   });
      // } else if (key == 2) {
      //   this.$router.push({
      //     path: "/studentCommon/mine/setting"
      //   });
      // } else if (key == 3) {
      //   this.$router.push({
      //     path: "/studentCommon/mine/personalInfo"
      //   });
      // } else if (key == 4) {
      //   this.$router.push({
      //     path: "/studentCommon/mine/academicCircle"
      //   });
      // }
      this.$store.state.myhownav = key;
    },
    getNavType() {
      this.activeIndex = this.$store.state.myhownav;
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    }
  },
  watch: {
    // 监测store.state
    "$store.state.myhownav": "getNavType"
  }
};
</script>

<style scoped lang="less">
.knowledge {
  .sec-con {
    padding: 14px 0;
  }
  .con {
    margin-top: 20px;
    .grid-content {
      /*padding: 30px 0;*/
    }
  }
}
.knowledge .grid-content .triangle-left {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid red;
  border-bottom: 50px solid transparent;
}
</style>
<style>
.knowledge .grid-content .el-menu {
  border-right: none;
}
.knowledge .grid-content .el-menu-item.is-active {
  background: #fff;
}
</style>
