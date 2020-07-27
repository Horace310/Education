<template>
  <div>
    <Knowledge :flag="flag"></Knowledge>
  </div>
</template>

<script>
import Knowledge from "../../../components/homeworkCenter/knowledge";
export default {
  name: "",
  data() {
    return {
      flag: this.$route.query.flag
    };
  },
  created() {
    this.$store.state.worknav = "1"; //头部导航
  },
  components: {
    Knowledge
  }
};
</script>

<style scoped>
</style>
