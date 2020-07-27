<template>
  <div class="headers-box" :class="{ opacity: opacity }">
    <div class="headers">
      <el-row :gutter="24">
        <el-col :span="2">
          <img class="Logo" src="../../../static/images/akslogo.png" alt />
        </el-col>
        <el-col :span="15">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo navTop"
            mode="horizontal"
            @select="handleSelect"
            text-color="#333333"
            active-text-color="    #32BAB0
"
          >
            <el-menu-item index="1" class="item">首页</el-menu-item>
            <el-menu-item index="2" class="item">作业中心</el-menu-item>
            <el-menu-item index="3" class="item">资源工具</el-menu-item>
            <el-menu-item index="4" class="item">学科圈</el-menu-item>
            <el-menu-item index="5" class="item">教学教研</el-menu-item>
            <el-menu-item index="6" class="item">班级管理</el-menu-item>
            <el-menu-item index="8" class="item">荣誉体系</el-menu-item>
            <el-menu-item index="9" class="item">个人中心</el-menu-item>
          </el-menu>
          <div class="show" v-if="isShow">
            <input placeholder="请输入" class="searchInput" />
          </div>
        </el-col>
        <el-col :span="2">
          <div class="search" @click="showSearch">
            <!-- <i class="el-icon-search"></i> -->
          </div>
        </el-col>

        <el-col :span="4">
          <div class="tongzhi">
            <a href="javascript:void(0)" @click="Tonotification">
              <!-- <img src="../../../static/images/lingdang.png" alt /> -->
            </a>
          </div>
          <div class="grid-content personInfo flexbox flexcenter" style="margin-top:6px">
            <img v-bind:src="icon" alt class="img" />
            <div class="con">
              <el-dropdown trigger="click" style="margin-top:11px">
                <span class="el-dropdown-link cp">
                  {{ username }}老师,您好!
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <span
                  class="info col999 ft12"
                  style="display:inline-block"
                  v-if="identity != 'null'"
                >
                  身份ID:
                  {{userCode}}
                </span>
                <span
                  class="info button"
                  v-else
                  unselectable="on"
                  onselectstart="return false;"
                  style="-moz-user-select:none;display: block;margin-top: 6px;"
                  @click="perfect"
                >完善注册信息</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="signout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      // icon: sessionStorage.getItem("avatar"),
      userCode: sessionStorage.getItem("userCode"),
      isShow: false,
      input10: "",
      activeIndex2: "1",
      username: sessionStorage.getItem("username"),
      icon: sessionStorage.getItem("avatar"),
      identity: sessionStorage.getItem("userId"),
      role: sessionStorage.getItem("role"),
      opacity: false
    };
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal == "/homeCommon") {
        this.activeIndex2 = "1";
      } else if (new RegExp("/homeCommon/workCenter").test(newVal)) {
        this.activeIndex2 = "2";
      } else if (new RegExp("/homeCommon/resourceTools").test(newVal)) {
        this.activeIndex2 = "3";
      } else if (
        new RegExp("/homeCommon/classManagement/studentList").test(newVal)
      ) {
        this.activeIndex2 = "6";
      } else if (new RegExp("/homeCommon/Honorsystem").test(newVal)) {
        this.activeIndex2 = "8";
      } else if (new RegExp("/homeCommon/personalInfo").test(newVal)) {
        this.activeIndex2 = "9";
      } else if (new RegExp("/homeCommon/TeachingResearch").test(newVal)) {
        this.activeIndex2 = "5";
      }
    }
  },
  created() {
    // this.identity = this.$store.state.ID;
    // console.log(this.$route)
    //   this.footer.forEach((i,v)=>{
    // 		if(this.$router.history.current.name==i.name){
    // 			console.log(v)
    // 			this.n=v
    // 		}
    // 	})
    //  console.log(this.$route)
    // if (sessionStorage.getItem("wxicon")) {
    //   this.icon = sessionStorage.getItem("wxicon");
    //   this.name = sessionStorage.getItem("wxusername");
    // } else
    // {
    //   this.icon = sessionStorage.getItem("avatar");
    //   this.name = sessionStorage.getItem("name");
    // }
    if (this.$route.fullPath == "/homeCommon") {
      this.activeIndex2 = "1";
    } else if (
      new RegExp("/homeCommon/workCenter").test(this.$route.fullPath)
    ) {
      this.activeIndex2 = "2";
    } else if (
      new RegExp("/homeCommon/resourceTools").test(this.$route.fullPath)
    ) {
      this.activeIndex2 = "3";
    } else if (
      new RegExp("/homeCommon/classManagement/studentList").test(
        this.$route.fullPath
      )
    ) {
      this.activeIndex2 = "6";
    } else if (
      new RegExp("/homeCommon/Honorsystem").test(this.$route.fullPath)
    ) {
      this.activeIndex2 = "8";
    } else if (
      new RegExp("/homeCommon/personalInfo").test(this.$route.fullPath)
    ) {
      this.activeIndex2 = "9";
    } else if (
      new RegExp("/homeCommon/TeachingResearch").test(this.$route.fullPath)
    ) {
      this.activeIndex2 = "5";
    }
    if (this.$route.fullPath == "/homeCommon") {
      this.opacity = true;
      //   console.log(this.opacity)
    } else {
      this.opacity = false;
    }
  },
  methods: {
    //点击调转平台通知
    Tonotification(e) {
      this.$router.push({
        path: "/homeCommon/notification/notification"
      });
    },
    showSearch() {
      this.isShow = true;
    },
    signout() {
      // sessionStorage.setItem("token", "");
      this.$router.push({ path: "/login" });
      sessionStorage.clear();
    },
    handleSelect(key, keyPath) {
      this.activeIndex2 = key;
      if (key == 1) {
        this.$router.push({
          path: "/homeCommon"
        });
      } else if (key == 2) {
        this.$router.push({
          path: "/homeCommon/workCenter"
        });
      } else if (key == 3) {
        this.$router.push({
          path: "/homeCommon/resourceTools"
        });
      } else if (key == 6) {
        this.$router.push({
          path: "/homeCommon/classManagement/studentList"
        });
      } else if (key == 8) {
        this.$router.push({
          path: "/homeCommon/Honorsystem"
        });
      } else if (key == 9) {
        this.$router.push({
          path: "/homeCommon/notification/personalInfo"
        });
      } else if (key == 5) {
        this.$router.push({
          path: "/homeCommon/TeachingResearch"
        });
      } else if (key == 4) {
        this.$router.push({
          path: "/homeCommon/disciplineCircle"
        });
      }
    },
    getNavType() {
      this.activeIndex2 = parseInt(this.$store.state.adminleftnavnum);
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    },
    perfect() {
      this.$router.push({ path: "/information", query: { type: this.role } });
    }
  }
  // watch: {
  //   // 监测store.state
  //   "$store.state.adminleftnavnum": "getNavType"
  // }
};
</script>

<style scoped lang="less">
.headers-box {
  background: white;
  .Logo {
    margin-top: 18px;
    width: 110px;
    height: 40px;
  }
  .headers {
    width: 1300px;
    height: 66px;
    margin: 0 auto;
    position: relative;
    .navTop {
      margin-top: 6px;
      background-color: white;
      .item {
        margin-right: 5px;
      }
      // .item:hover {
      //   background-color: rgba(0, 0, 0, 0.6);
      //   color: #f25c29;
      // }
    }
    .show {
      position: absolute;
      //   top: 50%;
      //   height: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      .searchInput {
        border-radius: 25px;
        width: 300px;
        text-indent: 30px;
        height: 40px;
        border: 0;
      }
    }
    .logo {
      width: 149px;
      height: 63px;
      margin-top: 24px;
      margin-right: 30px;
      img {
        width: 3.12963rem;
        height: 100%;
        transform: scale(1.5);
      }
    }
    .tongzhi {
      position: absolute;
      top: 20px;
      right: 280px;
      a {
        img {
          width: 15px;
          height: 20px;
        }
      }
    }
    // .search {
    //   margin-top: 15px;
    //   background-color: #fff;
    //   width: 172px;
    //   height: 30px;
    //   border: 1px solid #fff;
    //   border-radius: 15px;
    //   overflow: hidden;
    //   display: flex;
    //   .searchInput {
    //     width: 140px;
    //     height: 100%;
    //     border: none;
    //     text-indent: 25px;
    //     float: left;
    //     outline: none;
    //   }
    //   .search-icon {
    //     flex: 1;
    //     width: 30px;
    //     text-align: center;
    //     i {
    //       line-height: 30px;
    //     }
    //   }
    // }
    .search {
      i {
        margin-top: 20px;
        margin-right: 20px;
        font-size: 24px;
        color: #fff;
      }
    }
    .personInfo {
      // margin-top: 10px;
      color: #fff;
      .img {
        width: 46px;
        height: 46px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 3%;
      }

      .con {
        float: right;
        .cp {
          color: #646464;
        }
        .ft12 {
          color: #646464;
        }
        .infoID {
          display: inline-block;
          width: 120px;
        }
        .tit {
          margin-bottom: 4%;
        }
        .button {
          border-radius: 5px;
          border: 1px solid #dcdcdc;
          padding: 5px 10px;
          display: block;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
// .opacity{
//   background: rgba(0,0,0,.5);
//   position: fixed;
//   width: 100%;
//   .headers{
//     .navTop{
//       background: none;
//     }
//   }
// }
</style>
<style lang="less">
.headers-box .search .el-input {
  width: 60%;
}

.headers-box .search .el-input .el-input__inner {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.headers-box .search .el-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -4px;
}

.headers-box .nav {
  // background: #2592e7;
}

.headers-box .nav .el-menu {
  width: 1300px;
  margin: 0 auto;
  text-align: center;
  // background: #2592e7;
}

.headers-box .el-menu.el-menu--horizontal {
  border-bottom: none;
}
.headers-box .el-menu-item.is-active {
  // background: #4fa0f7;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  color: #4fa0f7 !important;
}
</style>
