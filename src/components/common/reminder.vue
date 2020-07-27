<template>
  <div class="tips" v-if="tipsShow">
    <i style="position:absolute;right:10px" @click="setTips" class="el-icon-close"></i>
    <h3 style="font-weight:600">知识树</h3>
    <p>知识树是老师私人的思维级导图题库，老师可以自由创建、编辑、删除单元，还可以查看发布过的作业，快来创建属于你自己的单元吧~</p>
    <el-button size="small" @click="setTipsNo">不再提示</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tipsShow: true
    };
  },
  methods: {
    setTips() {
      sessionStorage.setItem("homeTips", 1);
      this.tipsShow = false;
    },
    setTipsNo() {
      sessionStorage.setItem("homeTips", 2);
      this.tipsShow = false;
    }
  },
  created() {
    if (sessionStorage.getItem("homeTips") == 2) {
      this.tipsShow = false;
    }
  }
};
</script>
<style lang="less">
.tips {
  position: absolute;
  text-align: center;
  width: 190px;
  min-height: 250px;
  background: white;
  left: -210px;
  top: 70px;
  z-index: 9999;
  box-sizing: border-box;
  padding: 15px 22px 5px 22px;
  p {
    margin-top: 10px;
  }
  button {
    margin-top: 15px;
  }
}
.tips:before {
  box-sizing: content-box;
  width: 0px;
  height: 0px;
  position: absolute;
  top: 100px;
  right: -14px;
  padding: 0;
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #ffffff;
  display: block;
  content: "";
  z-index: 12;
}
</style>
