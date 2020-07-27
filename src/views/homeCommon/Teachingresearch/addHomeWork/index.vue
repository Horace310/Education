<template>
  <div>
    <p style="color:#606060;margin-bottom:10px">{{chapterName}} > {{sectionName}} > {{unitName}}</p>
    <p style="text-align:center;font-size:25px;margin-bottom:30px">
      作业名称：
      <input class="workName" v-model="$store.state.homeworkTitle" style="background:#eff3f5" />
    </p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeName: "one",
      unitName: "",
      chapterName: "",
      value: ""
    };
  },
  created() {
    if (this.$route.query.pid) {
      // sessionStorage.setItem("chapterIds", this.$route.query.chapterIds);
      sessionStorage.setItem("pid", this.$route.query.pid);
    }
    if (!this.$route.query.homeworkId) {
      this.$store.commit("setAllproblemslist", []);
      sessionStorage.removeItem("workId");
    }
    this.unitName = sessionStorage.getItem("unitName");
    this.chapterName = sessionStorage.getItem("chapterName");
    this.sectionName = sessionStorage.getItem("section");
  },
  beforeDestroy() {
    sessionStorage.removeItem("unitName");
    sessionStorage.removeItem("chapterName");
    sessionStorage.removeItem("chapterIds");
    sessionStorage.removeItem("pid");
    sessionStorage.removeItem("workId");
    sessionStorage.removeItem("list");

    // this.$store.commit("setAllproblemslist", []);
    this.$store.state.homeworkTitle = "";
  },
  methods: {
    collectApi(data) {
      this.$post("/user/homework/insertOneSelf", data).then(res => {
        if (res.code == "5000") {
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    homeworkTitle() {
      this.$store.commit("sethomeworkTitle", this.value);
    }
  }
};
</script>

<style scoped>
.workName {
  width: 300px;
  background: #eff3f5;
  border-bottom: 1px solid #000;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
</style>