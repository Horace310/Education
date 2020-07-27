<template>
  <div class="article-con">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <div class="tit-con flexbox">
            <h4 class="tit flex fb ft16">创意作业</h4>
            <!--            <span class="col999">更多>></span>-->
          </div>
          <div class="content">
            <p v-for="(item,i) in homework" :key="i">{{i+1}}.{{item.name}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="tit-con flexbox">
            <h4 class="tit flex fb ft16">研究成果</h4>
            <!--            <span class="col999">更多>></span>-->
          </div>
          <div class="content">
            <p v-for="(item,i) in researcher" :key="i">{{i+1}}.{{item.name}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="tit-con flexbox">
            <h4 class="tit flex fb ft16">学生圈</h4>
            <!--            <span class="col999">更多>></span>-->
          </div>
          <div class="content">
            <p v-for="(item,i) in studentGroup" :key="i">{{i+1}}.{{item.name}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content" style>
          <div class="tit-con flexbox ft16">
            <h4 class="tit flex fb">公告</h4>
            <!--            <span class="col999">更多>></span>-->
          </div>
          <div class="content" style="border-right: none;">
            <p v-for="(item,i) in notice" :key="i">{{i+1}}.{{item.name}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <p style="text-align:center;margin-top:20px">Copyright©2019深圳市爱课生技术有限公司版权所有 粤ICP备18022857号-2</p>
  </div>
</template>

<script>
export default {
  name: "articles",
  data() {
    return {
      homework: [],
      notice: [],
      researcher: [],
      studentGroup: []
    };
  },
  created() {
    //查询页面底部信息
    this.queryFooterSearch();
  },
  methods: {
    queryFooterSearch() {
      this.$post("/likework/queryFooterSearch.do").then(response => {
        // console.log(response)
        if (response.code == "5000") {
          this.homework = response.data.homework;
          this.notice = response.data.notice;
          this.researcher = response.data.researcher;
          this.studentGroup = response.data.studentGroup;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.article-con {
  padding: 25px 10%;
  box-sizing: border-box;
  .grid-content {
    margin-top: 30px;
    padding-right: 10%;
    box-sizing: border-box;
    .content {
      padding-right: 10%;
      box-sizing: border-box;
      margin-top: 20px;
      border-right: 1px solid #b5b5b5;
      p {
        margin-bottom: 16px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }
}
</style>
