<template>
  <div class="knowledge ">
    <div class="con">
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="4"><div class="grid-content bf ">-->
<!--          <el-menu-->
<!--            :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">-->
<!--            <el-menu-item index="1">-->
<!--              知识体系-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="2">-->
<!--              班级分类-->
<!--            </el-menu-item>-->
<!--          </el-menu>-->
<!--        </div></el-col>-->
<!--        <el-col :span="20">-->
          <router-view/>
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
  </div>
</template>

<script>

  export default {
    name: "knowledge",
    data(){
      return{
        activeIndex: '1',
        options: [],
        value4: '选项1',
      }
    },
    created(){
      this.$store.state.stuworknav = "2"; //头部导航

    },

    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if(key==1){
          this.$router.push({
            path:'/studentCommon/activityCenter/myHomework'
          })
        }else if(key==2){
          this.$router.push({
            path:'/studentCommon/activityCenter/myHomework/classify'
          })
        }
        this.$store.state.myhownav=key;
      },
      getNavType(){
        this.activeIndex=this.$store.state.myhownav;
        //store.state.adminleftnavnum里值变化的时候，设置navselected
      }
    },
    watch: {
      // 监测store.state
      '$store.state.myhownav': 'getNavType'
    }
  }
</script>

<style scoped lang="less">
  .knowledge{
    .sec-con{
      padding: 14px 0;
    }
    .con{
      margin-top: 20px;
      .grid-content{
        padding: 30px 0;
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
  .knowledge .grid-content .el-menu{border-right: none;}
  .knowledge .grid-content .el-menu-item.is-active{background: #39a5ff;color: #ffffff;}

</style>
