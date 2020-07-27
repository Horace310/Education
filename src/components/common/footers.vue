<template>
  <div>
    <div class="footer" :style="{ background: isStundent ? '#ec6e51' : '#2ab8b3' }">
      <ul class="nav flexbox">
        <li>商务合作</li>
        <li>服务条款</li>
        <li>走进爱课生</li>
        <li>帮助中心</li>
        <li>意见反馈</li>
      </ul>
      <p
        class="copyright"
      >Copyright©2019深圳市爱课生技术有限公司版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;粤ICP备18022857号-2</p>
    </div>
    <!-- <div class="footers" v-if="isTearch">
      <ul class="nav flexbox">
        <li>商务合作</li>
        <li>服务条款</li>
        <li>走进爱课生</li>
        <li>帮助中心</li>
        <li>意见反馈</li>
      </ul>
      <p
        class="copyright"
      >Copyright©2019深圳市爱课生技术有限公司版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP证140608号 京ICP备1204号.京ICP备12041691号-2 京公网安备11010502026582</p>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
      role: 2,
      isStundent: false,
      isTearch: false
    };
  },
  mounted() {
    if (sessionStorage.getItem("type")) {
      this.role = sessionStorage.getItem("type");
    }
    if (this.role == "1") {
      this.isStundent = false;
      this.isTearch = false;
    }
    if (this.role == "2") {
      this.isStundent = true;
      this.isTearch = true;
    }
  }
};
</script>

<style scoped lang="less">
.footer {
  background: #ec6e51;
  padding: 30px 0 20px 0;
  margin-top: 20px;
  .nav {
    width: 400px;
    margin: 0 auto 20px auto;
    li {
      color: #fff;
      border-right: 1px solid #fff;
      height: 14px;
      line-height: 14px;
      padding: 0 10px;
      &:last-child {
        border: none;
      }
    }
  }
  .copyright {
    color: #fff;
    text-align: center;
  }
}
.footers {
  background: #2ab8b3;
  padding: 30px 0 20px 0;
  margin-top: 20px;
  .nav {
    width: 400px;
    margin: 0 auto 20px auto;
    li {
      color: #fff;
      border-right: 1px solid #333333;
      height: 14px;
      line-height: 14px;
      padding: 0 10px;
      &:last-child {
        border: none;
      }
    }
  }
  .copyright {
    color: #fff;
    text-align: center;
  }
}
</style>
