<template>
  <div class="home" style="overflow-x: hidden">
    <!-- <studentHeaders></studentHeaders> -->
    <studentHeaders />
    <router-view style="min-height:780px" />
    <div style="clear:both"></div>
    <Footers></Footers>
  </div>
</template>

<script>
// import studentHeaders from '../components/common/studentHeaders'
import studentHeaders from "../components/common/studentHeaders";
import Footers from "../components/common/footers";
export default {
  name: "homeCommon",
  data() {
    return {};
  },
  components: {
    studentHeaders,
    Footers
  }
};
</script>

<style scoped>
@import "../../static/css/reset.css";
.home {
  background: #eff3f5;
  width: 100%;
}
</style>
