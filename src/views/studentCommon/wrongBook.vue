<template>
  <div class="home">
    <div class="bgcBox">
      <img
        src="https://alipic.lanhuapp.com/ps2b0b9c71283f5585-fbf5-4ec2-bbf8-2b432ed19007?x-oss-process=image/format,webp"
        alt
      />
    </div>
    <div class="box-card">
      <el-menu
        :default-active="$route.path"
        router
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/studentCommon/wrongBook/">错题管理</el-menu-item>
        <el-menu-item index="/studentCommon/wrongBook/wrongbooklists">章节错题重考</el-menu-item>
        <el-menu-item index>错题本打印</el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeIndex: "1"
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      if (!key) {
        alert("暂未开放此功能");
        return false;
      }
      this.$store.state.studentWrongBooknav = key;
    },
    getNavType() {
      this.activeIndex = this.$store.state.studentWrongBooknav;
      console.log("watch", this.activeIndex);
    }
  },
  watch: {
    // 监测store.state
    "$store.state.studentWrongBooknav": "getNavType"
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin: 0 auto;
  width: 1300px;
}
.el-menu-item {
  font-size: 16px;
}
</style>
