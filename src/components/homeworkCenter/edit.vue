<template>
  <div class="edit">
    <el-dialog
      title="更改题目"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="wordTest">
        <div class="questionBank">
          <p>题目内容:</p>
          <quill-editor :options="editorOption" v-model="form.content" style="width:100%"></quill-editor>
          <!-- <el-input
                id="question-conter"
                type="textarea"
                :rows="5"
                v-model="item.content"
                placeholder="请输入内容"
          ></el-input>-->
        </div>
        <div class="anser-conter">
          <p>答案:</p>
          <quill-editor :options="editorOption" v-model="form.answer" style="width:100%"></quill-editor>
          <!-- <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnser"
                placeholder="请输入内容"
          ></el-input>-->
        </div>
        <div class="analysi">
          <p>解析:</p>
          <quill-editor
            :options="editorOption"
            placeholder="请输入内容"
            v-model="form.resolution"
            style="width:100%"
          ></quill-editor>
          <!-- <el-input
                id="Anserconter"
                type="textarea"
                :rows="5"
                v-model="item.questionAnalysi"
                placeholder="请输入内容"
          ></el-input>-->
        </div>
        <div class="anser-score">
          <span style="margin-left:10px">分值:&nbsp;</span>

          <el-input style="width:50px" v-model="form.score"></el-input>
          <span>&nbsp;分</span>
        </div>
        <div class="anserType">
          <div class="anserList">
            <span style="font-size:18px;color:#159484;display:block">题目属性:</span>
            <el-radio-group v-model="form.typeName" size="small">
              <el-radio-button v-for="(item,index) in QuestionType" :key="index" :label="item.name"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="anserList">
            <span style="font-size:18px;color:#159484">难度:</span>
            <el-radio-group v-model="form.difficulty" size="small">
              <el-radio-button v-for="(item,index) in difficulty" :key="index" :label="item.name"></el-radio-button>
            </el-radio-group>
            <!-- <el-button
            size="small"
            v-for="(items, k) in difficulty"
            :class="{'choores':form.difficulty ==k }"
            :key="k"
            @click="chooseDifficulty(items, k,item,r)"
            >{{ items.name }}</el-button>-->
          </div>
          <!--                  <div class="anserList">-->
          <!--                    <span style="font-size:18px;color:#159484">时间:</span>-->
          <!--                    <el-button-->
          <!--                      v-for="(items, indexs) in time"-->
          <!--                      :key="indexs"-->
          <!--                      :class="{ active: timeNums == indexs }"-->
          <!--                      @click="chooseTime(items, indexs)"-->
          <!--                    >{{ items.name }}</el-button>-->
          <!--                  </div>-->
          <div class="anserList">
            <span style="font-size:18px;color:#159484">目标:</span>
            <!-- <el-button
            size="small"
            v-for="(items, j) in target"
            :key="j"
            :class="{ 'choores': form.target == j }"
            @click="chooseTarget(items, j,item)"
            >{{ items.name }}</el-button>-->

            <el-radio-group v-model="form.target" size="small">
              <el-radio-button v-for="(item,index) in target" :key="index" :label="item.name"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- <div class="label">
            选择输入语音:
            <i class="el-icon-microphone" @click="setaudio"></i>
          </div>-->
          <div style>
            <el-button
              size="small"
              type="primary"
              class="confirm"
              id="confirmBtn"
              @click="confirmBtn"
            >保存题目</el-button>
            <el-button
              size="small"
              type="warning"
              class="delete"
              id="delateBtn"
              @click="$emit('update:show', false)"
            >取消</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>
<script></script>
<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.show) {
        this.$get("/user/homework/question/findById", {
          id: this.$parent.detailId
        }).then(res => {
          if (res.code == "5000") {
            this.form = res.data;
            console.log(
              this.QuestionType.find(item => item.id == res.data.typeId)
            );
            this.form.typeName = this.QuestionType.find(
              item => item.id == res.data.typeId
            ).name;
          }
        });
      }
    }
  },
  data() {
    return {
      visible: false,
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ font: [] }],
              ["image"] //上传图片、上传视频
            ]
          }
        }
      },
      form: {
        resolution: "",
        target: "单一知识目标",
        QuestionType2indexs: "作图题",
        typeName: "作图题",
        score: "",
        content: "",
        answer: "",
        difficulty: "解释性"
      },
      QuestionType: [],
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" }
        // { name: "自定义" }
      ],
      target: [
        { name: "单一知识目标" },
        { name: "多知识目标" }
        // { name: "自定义" }
      ]
    };
  },
  created() {
    this.QuestionTypeSelect();
  },
  methods: {
    confirmBtn() {
      this.form.pid = this.$parent.homeworkId;
      this.form.chapterId = this.$parent.pid;
      this.form.typeId = this.QuestionType.find(
        item => item.name == this.form.typeName
      ).id;
      this.form.createTime = "";
      this.$post("/user/homework/question/update", this.form).then(res => {
        if (res.code == "5000") {
          this.$message({
            message: "更改题目成功!",
            type: "success"
          });
          let newList = JSON.parse(sessionStorage.getItem("list"));
          let index = newList.findIndex(i => i.id === this.form.id);
          newList.splice(index, 1, this.form);
          sessionStorage.setItem("list", JSON.stringify(newList));
          this.$parent.list = newList;
          this.$emit("update:show", false);
        }
      });
    },
    QuestionTypeSelect(e) {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
          this.typeId = this.QuestionType[0].id;
          this.typeName = this.QuestionType[0].name;
        }
      });
    },
    setaudio() {
      if (this.checked == 0) {
        //     console.log(this.checked);
        return false;
      }
      recording.get(res => {
        if (res) {
          //     console.log(res);
          this.recorder = res;
          this.t = setInterval(() => {
            if (this.value1 < this.max) {
              this.value1++;
              this.checked = 0;
            } else {
              this.checked = 1;
              // this.value1 = 0;
              this.recorder.stop();
              this.getBlob();
              clearInterval(this.t);
            }
          }, 1000);
        }
      });
    },
    chooseTarget(items, indexs, item) {},
    //题目难度
    chooseDifficulty(items, indexs, item, index) {
      this.difficultyConter = items.name;
      // item.difficulty = indexs;
      this.$set(item, "difficulty", indexs);
      // console.log(this.problem,items,indexs,item,index);
    },
    chooseTypes(items, index, item, r) {
      this.typeId = items.id;
      this.$set(item, "QuestionType2indexs", index);
      this.$set(item, "typeName", items.name);
      // this.QuestionType2indexs = index;
      this.typeName = items.name;
      // console.log(this.typeName);
    },
    handleClose() {
      this.$emit("updatevisible", false); // 直接修改父组件的属性
    }
  }
};
</script>
<style lang="less">
.choores {
  // background-color: #159484;
  color: #fff;
}
.anserList,
.anser-conter {
  margin-bottom: 10px;
}
</style>
