<template>
  <div class="mt72">
    <p
      style="color:#606060;margin-bottom:10px;margin-top:15px"
    >{{chapterName}} > {{sectionName}} > {{unitName}}</p>
    <p v-if="!publishType" style="text-align:center;font-size:25px;margin-bottom:30px">
      作业名称：
      <input class="workName" v-model="$store.state.homeworkTitle" style="background:#eff3f5" />
    </p>
    <!-- <goBack style="text-align:center;margin-bottom:10px" :direction="true" :link="link"></goBack> -->
    <router-view></router-view>
  </div>
</template>


<script>
import goBack from "@/components/common/goBack";
export default {
  components: {
    goBack
  },
  data() {
    return {
      activeName: "one",
      unitName: "",
      chapterName: "",
      value: "",
      publishType: "",
      api: "",
      link: "/homeCommon/workCenter",
      headList: [
        {
          imgSrc: "../../../../static/images/tk.png",
          name: "个人题库",
          url: "/homeCommon/workCenter/addHomeWork/itembank"
        },
        {
          imgSrc: "../../../../static/images/pp.png",
          name: "平台题库",
          url: "/homeCommon/workCenter/addHomeWork/library"
        },
        {
          imgSrc: "../../../../static/images/daoru.png",
          name: "文件导入",
          url: "/homeCommon/workCenter/addHomeWork"
        }
        // { imgSrc: "../../../../static/images/bb.png", name: "已往作业" },
        // { imgSrc: "../../../../static/images/xx.png", name: "精品作业" }
      ]
    };
  },
  created() {
    if (this.$route.query.pid) {
      // sessionStorage.setItem("chapterIds", this.$route.query.chapterIds);
      sessionStorage.setItem("pid", this.$route.query.pid);
    }
    if (/TeachingResearch/.test(this.$route.fullPath)) {
      this.publishType = "teacher";
      let pathList = [
        "/homeCommon/TeachingResearch/addHomeWork",
        "/homeCommon/TeachingResearch/addHomeWork/itembank",
        "/homeCommon/TeachingResearch/addHomeWork/library"
      ];
      this.headList.forEach((i, index) => {
        i.url = pathList[index];
      });
      this.api = "/user/research/question/insert";
      this.link = `/homeCommon/TeachingResearch/homeworkResearch?id=${sessionStorage.getItem(
        "rid"
      )}`;
    } else {
      this.link = "/homeCommon/workCenter";
      this.api = "/user/homework/question/insert";
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
    sessionStorage.removeItem("total");
    sessionStorage.removeItem("homeworkId");
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