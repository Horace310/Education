<template>
  <div class="notification mt72" style="margin-top:30px">
    <el-container>
      <el-header style="padding-right:0">
        <div class="bf nav">
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            router
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#2bb6b6"
          >
            <!-- <el-menu-item  class="item" index="/homeCommon/notification">我的消息</el-menu-item> -->
            <el-menu-item
              class="item"
              index="/homeCommon/notification/personalInfo"
              style="display:block"
            >个人信息</el-menu-item>
            <el-menu-item
              class="item"
              index="/homeCommon/notification/teachingMaterial"
              style="display:block"
            >教材设置</el-menu-item>
            <el-menu-item
              class="item"
              index="/homeCommon/notification/notification"
              style="display:block"
            >安全设置</el-menu-item>
            <el-menu-item
              class="item"
              index="/homeCommon/notification/socialContact"
              style="display:block"
            >社交账号绑定</el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <el-main style="overflow:hidden;padding-top:0">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "notification",
  data() {
    return {
      activeIndex: "1"
    };
  },
  created() {
    // if (this.$route.query.code) {
    //   this.$axios({
    //     url: "http://data.ikeshen.com/auth/bindWeChat",
    //     methods: "GET",
    //     params: { subjectId: sessionStorage.getItem("subjectId") }
    //   }).then(response => {
    //     if (response.data.code == "5000") {
    //       that.bookList = response.data.data;
    //       let values = "";
    //       let value = "";
    //     }
    //   });
    // }
    this.$store.state.adminleftnavnum = "6"; //头部导航
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == 1) {
        this.$router.push({
          path: "/homeCommon/notification"
        });
      } else if (key == 2) {
        this.$router.push({
          path: "/homeCommon/notification/notification"
        });
      }
      this.$store.state.notnav = key;
    },
    getNavType() {
      this.activeIndex = this.$store.state.notnav;
    }
  },
  watch: {
    "$store.state.notnav": "getNavType"
  }
};
</script>

<style scoped lang="less">
.mt72 {
  .el-menu-demo {
    // width: 215px;
    text-align: center;
    //  margin-top: 20px;
    .item {
      height: 58px;
      //    border: 3px solid #eee;
      // i{
      //   float: left;
      //   width: 3px;
      //   height: 20px;
      //   background-color: #f25c29;
      // }
    }
  }
  .message {
  }
}
</style>
