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
            <td style="padding:10px;font-size:14px">{{index+1 }}</td>
            <td
              style="padding:10px;font-size:14px"
            >{{item.typeNameTwo?item.typeNameTwo:item.typeName }}</td>
            <td style="padding:10px;font-size:14px">{{item.score?item.score:item.questionScore }}</td>
            <td @click="deleallproblemslist(item,index)">
              <i class="el-icon-delete" style="font-size:14px"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Release">
        <span @click="releases" class="Releases" v-if="type!=+2">发布预览</span>
        <div v-else style="margin-left: 36px;">
          <el-button type="success" size="mini" @click="redo">线上作答</el-button>
          <el-button type="success" size="mini" @click="print">打印</el-button>
        </div>
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
      homeworkId: [],
      type: ""
    };
  },
  computed: {
    allproblemslist() {
      return this.$store.state.allproblemslist;
    }
  },
  created() {
    if (sessionStorage.getItem("type") == 2) {
      this.type = sessionStorage.getItem("type");
    }
  },
  mounted() {
    // this.allproblemslist = this.$parent.allproblemslist;
  },
  methods: {
    redo() {
      if (this.$store.state.allproblemslist.length == 0) {
        this.$message({ type: "error", message: "请选择错题，才能重做" });
        return;
      } else {
        this.$router.push({
          path: "/studentCommon/wrongBook/wrongRedo"
        });
      }
    },
    print() {
      if (this.$store.state.allproblemslist.length != 0) {
        this.$router.push({
          path: "/studentCommon/wrongBook/Print",
          query: { type: 2 }
        });
      } else {
        this.$message({ type: "error", message: "请选择错题，才能打印" });
      }
      // this.$message({type:"error",message:"请选择错题，未完成此模块"})
    },
    releases() {
      this.homeworkId = sessionStorage.getItem("workId");
      if (this.homeworkId) {
        Utils.$emit("seenTo", this.allproblemslist);
        console.log(this.allproblemslist);
        var list = JSON.stringify(this.allproblemslist);
        sessionStorage.setItem("list", [list]);
        var totals = this.allproblemslist.length * this.questionScore;
        sessionStorage.setItem("total", totals);
        this.$router.push({
          path: "/homeCommon/workCenter/addHomeWork/release",
          query: {
            // homeworkId: this.homeworkId,
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
        if (this.type == 2) {
          this.$store.commit("deleallproblemslist", index);
          Utils.$emit("studentList_l", item.id);
        } else {
          this.$store.commit("deleallproblemslist", index);
        }
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
  position: fixed;
  right: 10px;
  top: 320px;
  .basket-con {
    position: absolute;
    width: 210px;
    min-height: 100px;
    background: #ffffff;
    right: 60px;
    top: 0;
    box-shadow: 6px 4px 10px rgba(224, 224, 220, 0.5);
  }
}
.Release {
  margin-top: 20px;
}
.Releases {
  font-size: 15px;
  color: #fff;
  background: #159484;
  margin: 0 20px;
  padding: 5px 7px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  text-align: center;
}
</style>
