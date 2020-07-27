<template>
  <div class="home">
    <Headers></Headers>
    <router-view style="min-height:780px" />
    <Footers></Footers>
    <!-- <div
      class="chooseAdd"
      title="发布作业"
      @click="chooseAdd"
      unselectable="on"
      onselectstart="return false;"
      style="-moz-user-select:none;"
    >+</div>-->
  </div>
</template>

<script>
import Articles from "../components/articles/articles";
import Headers from "../components/common/headers";
import Footers from "../components/common/footers";
export default {
  name: "homeCommon",
  components: {
    Headers,
    Footers
  },
  created() {
    console.log(this.$store.state.subjectName);
  },
  methods: {
    chooseAdd() {
      this.$router.push({ path: "/homeCommon/workCenter" });
    }
  }
};
</script>

<style>
@import "../../static/css/reset.css";
.home {
  width: 100%;
}
.chooseAdd {
  position: fixed;
  top: 57%;
  right: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff8a00;
  cursor: pointer;
  font-size: 46px;
  color: #fff;
}
</style>
