<template>
  <div class="headers-box">
    <div class="headers">
      <el-row :gutter="24">
        <el-col :span="3">
          <div class="grid-content logo">
            <img src="../../../static/images/akslogo.png" alt class="logo-icon" />
          </div>
        </el-col>
        <el-col :span="11">
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            background-color="#ec6e51"
            mode="horizontal"
            @select="handleSelect"
            router
            text-color="#fff"
            active-text-color="#fff"
          >
            <el-menu-item index="/studentCommon">首页</el-menu-item>
            <el-menu-item index="/studentCommon/activityCenter">作业中心</el-menu-item>
            <el-menu-item index="/studentCommon/wrongBook">错题本</el-menu-item>
            <el-menu-item index="/studentCommon/studyResource">学习资源</el-menu-item>
            <el-menu-item index="/studentCommon/honorSystem">荣誉体系</el-menu-item>
            <el-menu-item index="/studentCommon/mine/personalInfo">个人中心</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="5">
          <div class="grid-content search">
            <input
              type="search"
              class="searchInput"
              v-model="input10"
              clearable
              placeholder="请输入关键字"
            />
            <div class="search-icon">
              <i class="el-icon-search"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="tongzhi">
            <a href="javascript:void(0)" @click="toMyself">
              <img src="../../../static/images/lingdang.png" alt />
            </a>
          </div>
          <div class="grid-content personInfo flexbox flexcenter">
            <img :src="icon" alt class="img" />
            <div class="con">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link cp">
                  &nbsp;&nbsp; {{ name }} &nbsp;&nbsp;&nbsp; 同学,您好!
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <!-- <p class="info col999 ft12" style="margin-top: 6px;" v-if="identity!='null'">身份ID:<span class="infoId">{{identity}}</span></p> -->
                <p class="info col999 ft12" style="margin-top: 6px;" v-if="identity != 'null'">
                  <input
                    type="text"
                    class="mood"
                    v-model="mood"
                    placeholder="今日又是元气满满的一天"
                    @change="todyaMood"
                  />
                  <span class="bubble"></span>
                </p>
                <p class="info col999 ft12" style="margin-top: 6px;" v-if="identity != 'null'"></p>

                <span
                  class="info button tc"
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
          <!-- <input class="mood" type="text" placeholder="元气满满的一天">

          </input>-->
        </el-col>
      </el-row>
    </div>
    <!-- <div class="nav ">

      <el-menu
        :default-active="$route.path"
        class="el-menu-demo "
        background-color="#282828"
        mode="horizontal"
        @select="handleSelect"
        router
        text-color="#fff"
        active-text-color="#fff">

        <el-menu-item index="/studentCommon">首页</el-menu-item>

        <el-menu-item index="/studentCommon/activityCenter">作业中心</el-menu-item>

        <el-menu-item index="/studentCommon/wrongBook">错题本</el-menu-item>

        <el-menu-item index="/studentCommon/studyResource">学习资源</el-menu-item>

        <el-menu-item index="/studentCommon/honorSystem">荣誉体系</el-menu-item>


        <el-menu-item index="/studentCommon/mine">个人中心</el-menu-item>

      </el-menu>

    </div>-->
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      mood: "",
      input10: "",
      activeIndex2: "1",
      name: sessionStorage.getItem("username"),
      icon: sessionStorage.getItem("avatar"),
      identity: sessionStorage.getItem("identity"),
      role: sessionStorage.getItem("role")
    };
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
    this.mood = sessionStorage.getItem("mood");
  },
  methods: {
    todyaMood() {
      this.$post("/likework/updateFeel.do", { feel: this.mood }).then(res => {
        sessionStorage.setItem("mood", this.mood);
      });
    },
    toMyself() {
      this.$router.push({ path: "/studentCommon/mine" });
    },
    perfect() {
      this.$router.push({ path: "/information", query: { type: this.role } });
    },
    signout() {
      this.$router.push({ path: "/login" });
      sessionStorage.clear();
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == 1) {
        this.$router.push({
          path: "/studentCommon"
        });
      } else if (key == 2) {
        this.$router.push({
          path: "/studentCommon/activityCenter"
        });
      } else if (key == 3) {
        this.$router.push({
          path: "/studentCommon/wrongBook"
        });
      } else if (key == 4) {
        this.$router.push({
          path: "/studentCommon/honorSystem"
        });
      } else if (key == 5) {
        this.$router.push({
          path: "/studentCommon/mine"
        });
      } else if (key == 6) {
        this.$router.push({
          path: "/studentCommon/studyResource"
        });
      }
      this.$store.state.stuadminnav = key;
    },
    getNavType() {
      this.activeIndex2 = this.$store.state.stuadminnav;
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    }
  },
  watch: {
    // 监测store.state
    "$store.state.stuadminnav": "getNavType"
  }
};
</script>

<style scoped lang="less">
.headers-box {
  background: #ec6e51;

  .headers {
    width: 1300px;
    height: 66px;
    margin: 0 auto;
    position: relative;
    .logo {
      margin-top: 18px;
      width: 110px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .tongzhi {
      position: absolute;
      top: 20px;
      right: 300px;
      a {
        img {
          width: 15px;
          height: 20px;
        }
      }
    }
    .search {
      margin-top: 15px;
      background-color: #fff;
      width: 172px;
      height: 30px;
      border: 1px solid #fff;
      border-radius: 15px;
      overflow: hidden;
      display: flex;
      .searchInput {
        width: 140px;
        height: 100%;
        border: none;
        text-indent: 25px;
        float: left;
        outline: none;
      }
      .search-icon {
        flex: 1;
        width: 30px;
        text-align: center;
        i {
          line-height: 30px;
        }
      }
    }

    .personInfo {
      margin-top: 6px;
      color: #fff;
      .img {
        width: 46px;
        height: 46px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 6%;
      }

      .con {
        .cp {
          color: #fff;
        }
        .ft12 {
          color: #fff;
          .infoId {
            display: inline-block;
            width: 120px;
            //        .mood{
            //   width: 150px;
            //   height: 16px;
            //   background-color: #f5f5f5;
            //   border: none;
            //   text-indent: 13px;
            //   border-radius: 8px;
            //   font-size: 14px;
            // }
          }
        }
        .tit {
          margin-bottom: 4%;
        }
        .mood {
          background-color: #f5f5f5;
          // opacity:0.4;
          text-indent: 12px;
          width: 155px;
          height: 18px;
          border-radius: 5px;
          border: none;
          color: #bbb;
        }
        .bubble:before {
          content: "";
          position: absolute;
          right: 100%;
          top: 30px;
          width: 0;
          height: 0;
          border-width: 2px;
          border-style: solid;
          border-color: transparent;
          margin-bottom: 1px;
          border-right-width: 11px;
          border-right-color: currentColor;
          color: #dddddd;
        }
        .button {
          border-radius: 5px;
          border: 1px solid #dcdcdc;
          padding: 0px 10px;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-menu-demo {
  display: flex;
}
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
  background: #2592e7;
}

.headers-box .nav .el-menu {
  width: 1300px;
  margin: 0 auto;
  text-align: center;
  background: #2592e7;
}

.headers-box .el-menu.el-menu--horizontal {
  border-bottom: none;
}
// .headers-box .el-menu-item.is-active {
//   background: #4fa0f7;
// }
// .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
// .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
//   color: #4fa0f7 !important;
// }
</style>
