<template>
  <div class="clearfix" style="margin:5px 10px 0 10px">
    <i @click="goBack" :style="{'float':direction?'left':'right'}" class="el-icon-back backClass"></i>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["direction", "link", "queryData"],
  data() {
    return {};
  },
  created() {},
  methods: {
    goBack() {
      this.$router.push({
        path: this.link,
        query: this.queryData ? this.queryData : {}
      });
    }
  }
};
</script>
<style lang="less">
.backClass {
  cursor: pointer;
  font-size: 25px;
  &:hover {
    color: blue;
  }
}
</style>
