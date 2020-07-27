<template>
  <div class="mt72">
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
      value: "",
      publishType: "",
      api: "/user/homework/question/insertSameQuestion",
      headList: [
        {
          imgSrc: "../../../../static/images/tk.png",
          name: "个人题库",
          url: "/homeCommon/workCenter/addSpare/itembank"
        },
        {
          imgSrc: "../../../../static/images/pp.png",
          name: "平台题库",
          url: "/homeCommon/workCenter/addSpare/library"
        },
        {
          imgSrc: "../../../../static/images/daoru.png",
          name: "文件导入",
          url: "/homeCommon/workCenter/addSpare"
        }
        // { imgSrc: "../../../../static/images/bb.png", name: "已往作业" },
        // { imgSrc: "../../../../static/images/xx.png", name: "精品作业" }
      ]
    };
  },
  created() {
    if (this.$route.query.id) {
      sessionStorage.setItem("sameId", this.$route.query.id);
    }
    if (/TeachingResearch/.test(this.$route.fullPath)) {
      this.publishType = "teacher";
      let pathList = [
        "/homeCommon/TeachingResearch/addSpare",
        "/homeCommon/TeachingResearch/addSpare/itembank",
        "/homeCommon/TeachingResearch/addSpare/library"
      ];
      this.headList.forEach((i, index) => {
        i.url = pathList[index];
      });
      this.api = "/user/research/question/insertSameQuestion";
    } else {
      this.api = "/user/homework/question/insertSameQuestion";
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