<template>
  <div class="knowledge">
    <!--      <div class="sec-con bx   bf flexbox flexrow">-->
    <!--        <div class="sec">-->
    <!--          <span class="name ft16">选择班级：</span>-->
    <!--          <el-select v-model="value4" clearable placeholder="请选择">-->
    <!--            <el-option-->
    <!--              v-for="item in options"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value">-->
    <!--            </el-option>-->
    <!--          </el-select>-->
    <!--        </div>-->
    <!--        <div class="sec">-->
    <!--          <span class="name ft16">选择时间：</span>-->
    <!--          <el-select v-model="value4" clearable placeholder="请选择">-->
    <!--            <el-option-->
    <!--              v-for="item in options"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value">-->
    <!--            </el-option>-->
    <!--          </el-select>-->
    <!--        </div>-->
    <!--        <div class="sec">-->
    <!--          <span class="name ft16">选择作业：</span>-->
    <!--          <el-select v-model="value4" clearable placeholder="请选择">-->
    <!--            <el-option-->
    <!--              v-for="item in options"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value">-->
    <!--            </el-option>-->
    <!--          </el-select>-->
    <!--        </div>-->
    <!--      </div>-->
    <div class="con" style="margin-top:30px">
      <el-row>
        <!-- <el-col :span="4"> -->
        <div class="grid-content bf">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo list"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#f25c29"
          >
            <el-col :span="4" style="outline:none">
              <el-menu-item index="1" class="list1">
                <img src="../../../static/images/微信图片_20191205120903.png" alt />
                <span style="display:block">作业布置</span>
              </el-menu-item>
            </el-col>
            <el-col :span="4" style="outline:none">
              <el-menu-item index="9" class="list1">
                <img src="../../../static/images/geren.png" alt />
                <span style="display:block">个人题库</span>
              </el-menu-item>
            </el-col>
            <el-col :span="4" style="outline:none">
              <el-menu-item index="3" class="list1">
                <img src="../../../static/images/微信图片_20191205120938.png" alt />
                <span style="display:block">作业批改</span>
              </el-menu-item>
            </el-col>
            <!-- <el-col :span="4" style="outline:none">
              <el-menu-item index="2" class="list1" style>
                <img src="../../../static/images/微信图片_20191205120941.png" alt />
                <span style="display:block">作业打印</span>
              </el-menu-item>
            </el-col>-->
            <!-- <el-col :span="4" style="outline:none">
              <el-menu-item index="6" class="list1">
                <img src="../../../static/images/微信图片_20191205120936.png" alt />
                <span style="display:block">备用习题</span>
              </el-menu-item>
            </el-col>-->
            <el-col :span="4" style="outline:none">
              <el-menu-item class="list1" index="4">
                <img src="../../../static/images/微信图片_20191205120943.png" alt />
                <span style="display:block">作业分析</span>
              </el-menu-item>
            </el-col>
            <el-col :span="4" style="outline:none">
              <el-menu-item class="list1" index="8">
                <img src="../../../static/images/youhen.png" alt />
                <span style="display:block">有痕阅卷</span>
              </el-menu-item>
            </el-col>

            <!-- <el-col :span="4" style="outline:none">
              <el-menu-item index="5" class="list1">
                <img src="../../../static/images/微信图片_20191205120931.png" alt />
                <span style="display:block">作业模板</span>
              </el-menu-item>
            </el-col>-->
          </el-menu>
        </div>

        <router-view />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "knowledge",
  data() {
    return {
      isShow: false,
      activeIndex: "1",
      options: [],
      value4: "选项1"
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //头部导航
    //  console.log(this.$route)
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == 1) {
        this.$router.push({
          path: "/homeCommon/workCenter",
          query: {
            flag: "3"
          }
        });
      } else if (key == 2) {
        this.$router.push({
          path: "/homeCommon/workCenter/unworkable",
          query: {
            flag: "1"
          }
        });
      } else if (key == 3) {
        this.$router.push({
          path: "/homeCommon/workCenter/SharingTearch",
          query: {
            flag: "3"
          }
        });
      } else if (key == 4) {
        this.$router.push({
          path: "/homeCommon/workCenter/Analysis",
          query: {
            flag: "4"
          }
        });
      } else if (key == 5) {
        this.$router.push({
          path: "/homeCommon/workCenter/Template",
          query: {
            flag: "4"
          }
        });
      } else if (key == 6) {
        this.$router.push({
          path: "/homeCommon/workCenter/AnswerCard",
          query: { flag: 6 }
        });
      } else if (key == 8) {
        this.$router.push({
          path: "/homeCommon/workCenter/Marking",
          query: { flag: 8 }
        });
      } else if (key == 9) {
        this.$router.push({
          path: "/homeCommon/workCenter/ItemBank",
          query: { flag: 9 }
        });
      }
      this.$store.state.worknav = key;
    },
    getNavType() {
      this.activeIndex = this.$store.state.worknav;
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    }
  },
  watch: {
    // 监测store.state
    "$store.state.worknav": "getNavType"
  }
};
</script>

<style scoped lang="less">
.knowledge {
  width: 1300px;
  margin: 0 auto;
  // margin-top: 67px;w
  .sec-con {
    padding: 14px 0;
  }
  .con {
    // margin-top: 20px;
    .grid-content {
      // padding: 30px 0;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      // .list1 {
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   transform: translate(-50%;-50%);
      // }
      .list1 {
        // color: #f25c29;
        //  float:right;
        height: 108px;
        padding: 10px;
        text-align: center;
      }
      // .list1:hover{
      //   background-color: #fabfab;
      //   color: #f25c29;
      // }
      // .list2{
      //   position: absolute;
      //   left: 40%;
      //   top: 40%;
      // }
      .list2 {
        //  text-align:center;
        height: 108px;
        padding: 10px;
      }
      .list3 {
        height: 108px;
        padding: 10px;
        float: left;
      }
      // .list2:hover{
      //   background-color: #fabfab;
      // }
      .is-active {
        color: #666;
        background: #ecf5ff;
      }
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
  background: #39a5ff;
  color: #ffffff;
}
</style>
