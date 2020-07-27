<template>
    <div class="homeworkList">
      <div class="con">
        <el-row :gutter="20">
          <!-- <el-col :span="4"><div class="grid-content bf ">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-menu-item index="1">
                <span slot="title">知识体系</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">已发布作业</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title">未发布作业</span>
              </el-menu-item>
            </el-menu>
          </div></el-col> -->
          <el-col :span="24">
            <!-- <div class="knowledgeshow" v-if="knowledgeshow"><Knowledge></Knowledge></div> -->
            <div class="publishedshow"><Published></Published></div>
            <!-- <div class="unpublishedshow" v-if="unpublishedshow"><Unpublished></Unpublished></div> -->
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import Knowledge from '../../../../components/homeworkCenter/knowledge'
  import Published from '../../../../components/homeworkCenter/Published'
  import Unpublished from '../../../../components/homeworkCenter/Unpublished'
    export default {
      name: "homeworkList",
      data(){
        return{
          activeIndex:'1',
          knowledgeshow:true,
          publishedshow:false,
          unpublishedshow:false,
        }
      },
      components:{
        Knowledge,
        Published,
        Unpublished
      },
      created(){
        this.$store.state.calssnav="2"; //头部导航
        // this.$store.state.worknav="1"; //头部导航
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
          if(key==1){
            this.knowledgeshow = true ;
            this.publishedshow = false;
            this.unpublishedshow = false
          }else if(key==2){
            this.knowledgeshow = false ;
            this.publishedshow = true;
            this.unpublishedshow = false
          }else if(key==3){
            this.knowledgeshow = false ;
            this.publishedshow = false;
            this.unpublishedshow = true
          }
          this.$store.state.worknav=key;
        },
        getNavType(){
          this.activeIndex=this.$store.state.worknav;
          //store.state.adminleftnavnum里值变化的时候，设置navselected
        }
      },
      watch: {
        // 监测store.state
        '$store.state.worknav': 'getNavType'
      }
    }
</script>

<style scoped lang="less">

  .grid-content{
    padding: 30px 0;
  }

</style>
<style>
  .homeworkList .grid-content .el-menu{border-right: none;}
  .homeworkList .grid-content .el-menu-item.is-active{background: #39a5ff;color: #ffffff;}
</style>
