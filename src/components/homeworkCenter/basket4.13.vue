<template>
  <div class="task-basket">
    <el-badge :value="allproblemslist.length" class="item">
      <img src="../../assets/work_img.png" alt @click="change" />
    </el-badge>
    <div class="basket-con" v-show="showed">
      <table>
        <thead>
          <tr style="background-color:#f8f8f8;">
            <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
            <td style="color:#fb8b22;font-size:16px;padding:5px">已选试题</td>
            <td style="color:#fb8b22;font-size:16px;padding:5px">分数</td>
            <td style="color:#fb8b22;font-size:16px;padding:5px">清空</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in allproblemslist"
            :key="index"
            style="margin-bottom:5px;font-size:14px;color:#fb8b22"
            class="trHover"
          >
            <td style="padding:10px;font-size:14px">{{ index+1 }}</td>
            <td style="padding:10px;font-size:14px">{{ item.typeName }}</td>
            <td
              style="padding:10px;font-size:14px"
            >{{ item.questionScore?item.questionScore:item.score }}</td>
            <td @click="deleallproblemslist(item,index)">
              <i class="el-icon-delete-solid" style="font-size:14px"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Release">
        <span @click="releases" class="Releases">发布预览</span>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "../../../static/js/util";
export default {
  name: "",
  data() {
    return {
      allProblems: 0,
      showed: false,
      subjectId: "",
      homeworkId: []
    };
  },
  computed: {
    allproblemslist() {
      return this.$store.state.allproblemslist;
    }
  },
  created() {},
  mounted() {
    // this.allproblemslist = this.$parent.allproblemslist;
  },
  methods: {
    releases() {
      this.homeworkId = sessionStorage.getItem("workId");
      if (this.homeworkId) {
        Utils.$emit("seenTo", this.allproblemslist);
        var list = JSON.stringify(this.allproblemslist);
        sessionStorage.setItem("list", [list]);
        var totals = this.allproblemslist.length * this.questionScore;
        sessionStorage.setItem("total", totals);
        this.$router.push({
          path: "/homeCommon/workCenter/workable",
          query: {
            homeworkId: this.homeworkId,
            subjectId: this.subjectId,
            chapterId: sessionStorage.getItem("chapterIds"),
            pids: sessionStorage.getItem("pid")
          }
        });
      } else {
        this.$message({ type: "error", message: "请点击确定并选择题目属性" });
      }
    },
    deleallproblemslist(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.commit("deleallproblemslist", index);
      });
    },
    change() {
      this.showed = !this.showed;
    }
  }
};
</script>

<style scoped lang="scss">
.task-basket {
  cursor: pointer;
  position: absolute;
  right: -60px;
  top: 20%;
  .basket-con {
    position: absolute;
    width: 210px;
    background: #ffffff;
    right: 60px;
    top: 0;
    box-shadow: 6px 4px 10px rgba(224, 224, 220, 0.5);
  }
}
.Releases {
  font-size: 15px;
  color: #fff;
  background: #159484;
  margin: 0 20px;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  text-align: center;
}
</style>
