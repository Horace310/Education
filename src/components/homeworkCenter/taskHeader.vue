<template>
  <div>
    <div class="add_head">
      <div
        style="position:relative;box-sizing:border-box;"
        :class="index == activeIndex ? 'head_active headDiv' : 'headDiv'"
        @click="tiao(item.url, index)"
        v-for="(item, index) in headList"
        :key="index"
      >
        <img :src="item.imgSrc" alt />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script></script>
<script>
export default {
  components: {},
  data() {
    return {
      activeIndex: "",
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
  watch: {
    $route(to, from) {
      console.log(to);
    }
  },
  mounted() {
    this.headList = this.$parent.$parent.headList;
    if (this.$route.name === "个人题库") {
      this.activeIndex = 0;
    } else if (this.$route.name === "平台题库") {
      this.activeIndex = 1;
    } else if (this.$route.name === "文件导入") {
      this.activeIndex = 2;
    }
  },
  created() {},

  methods: {
    tiao(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>
<style lang="less">
.add_head {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  .head_active {
    background: #ecf5ff;
  }
  // .height_line {
  //   left: 0;
  //   width: 100%;
  //   height: 0.1px;
  //   background: red;
  // }
  // .line_active {
  //   left: 0;
  //   width: 100%;
  //   height: 0.1px;
  //   background: white;
  // }
  .headDiv {
    display: flex;
    width: 20%;
    padding: 16px 15px 15px 15px;
    flex-direction: column;
    border: 1px solid #d8d8d8;
    align-items: center;
    cursor: pointer;
    img {
      width: 90%;
      height: 75px;
    }
  }
}
</style>
