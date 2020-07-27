<template>
  <div class="tipss" v-if="tipsShow">
    <i style="position:absolute;right:10px" @click="setTips" class="el-icon-close"></i>
    <h3 style="font-weight:600">作业教研</h3>
    <p>
      作业教研，展示集体学
      科智慧，不同的老师贡
      献、共享，你可以
      上传优质的作业和资源，
      也可以收藏其他老师的
      作业资源~~
    </p>
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
      sessionStorage.setItem("researchTips", 1);
      this.tipsShow = false;
    },
    setTipsNo() {
      sessionStorage.setItem("researchTips", 2);
      this.tipsShow = false;
    }
  },
  created() {
    if (sessionStorage.getItem("researchTips") == 2) {
      this.tipsShow = false;
    }
  }
};
</script>
<style lang="less" >
.tipss {
  position: absolute;
  text-align: center;
  width: 190px;
  min-height: 250px;
  background: white;
  right: -240px;
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
.tipss:before {
  box-sizing: content-box;
  width: 0px;
  height: 0px;
  position: absolute;
  top: 100px;
  left: -15px;
  padding: 0;
  border-right: 8px solid #ffffff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid transparent;
  display: block;
  content: "";
  z-index: 12;
}
</style>
