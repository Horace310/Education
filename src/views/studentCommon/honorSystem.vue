<template>
  <div>
    <el-card class="box-card">
      <i
        style="position:absolute;left:760px;font-size:25px;cursor:pointer;z-index:9999"
        class="el-icon-question"
        @click="dialogVisible = true"
      ></i>
      <el-tabs v-model="activeName">
        <el-tab-pane label="成长性荣誉" name="first">
          <growth-honorsystem></growth-honorsystem>
        </el-tab-pane>
        <el-tab-pane label="优胜性荣誉" name="second">
          <superiority-honorsystem></superiority-honorsystem>
        </el-tab-pane>
        <el-tab-pane label="竞赛性荣誉" name="third">
          <competition-honorsystem></competition-honorsystem>
        </el-tab-pane>
        <el-tab-pane label="集体性荣誉" name="fourth">
          <collectivity-honorsystem></collectivity-honorsystem>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <p>
        成长性荣誉：学生按时提交作业，系统自动授予纪念章。
        <br />优胜性荣誉：学生在某一章、节或单元表现优秀的，老师
        授予金、银、铜牌勋章。
        <br />竞赛性荣誉：学生在期中、期末或某一次平台竞赛表现优
        秀的，老师授予金、银、铜牌勋章。
        <br />集体性荣誉：老师根据学生在班级的表现，授予优秀小能
        手、优秀科代表、优秀小组成员、优秀好帮
        手称号。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CollectivityHonorsystem from "./componet/CollectivityHonorsystem.vue";
import CompetitionHonorsystem from "./componet/CompetitionHonorsystem.vue";
import GrowthHonorsystem from "./componet/GrowthHonorsystem.vue";
import SuperiorityHonorsystem from "./componet/SuperiorityHonorsystem.vue";
export default {
  components: {
    CollectivityHonorsystem,
    CompetitionHonorsystem,
    GrowthHonorsystem,
    SuperiorityHonorsystem
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first"
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="less">
.box-card {
  width: 1300px;
  height: 1098px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  margin: 0 auto;
}
</style>
