<template>
  <div class="mt72 addClass">
    <div class="mystlye">
      <span class="title">学生教材设置</span>
      <span class="xuehua">*</span>
      <div
        style="float: left; margin-left: 20px;margin-top: 9px;font-size: 23px; color: #c7ccc7;"
      >默认人教版</div>
      <div
        style="left: 81px;
top: 279px;
width: 1211px;
height: NaNpx;
border: 1px dashed rgba(187, 187, 187, 1);
margin: 46px;
"
      ></div>
      <div v-for="(item,index) in xuekelist " :key="index" class="divtest">
        <span>{{item.subjectName}}:</span>
        <el-select
          v-model="jiaocai[index]"
          placeholder="请选择教材版本"
          @change="changetest(index)"
          style="margin-left:40px"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="edit">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xuekelist: [],
      jiaocai: [],
      options: []
    };
  },
  created() {
    this.getxunle();
    this.getbanben();
  },
  methods: {
    changetest(key) {
      console.log(this.jiaocai[key]);
    },
    getxunle() {
      this.$get("/system/subject", {
        type: sessionStorage.getItem("type")
      }).then(res => {
        console.log(res);
        if (res.data.length != 0) {
          this.xuekelist = res.data;
          var list = [];
          this.xuekelist.forEach((element, index) => {
            list[index] = 1;
          });
          this.jiaocai = list;
        }
      });
    },
    getbanben() {
      this.$get("/system/edition").then(res => {
        if (res.data.length != 0) {
          this.options = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.edit {
  margin-left: 575px;
  margin-top: 20px;
  cursor: pointer;
  width: 163px;
  height: 43px;
  border-radius: 4px;
  background-color: rgba(244, 119, 4, 0.7);
  color: rgba(16, 16, 16, 1);
  font-size: 20px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.divtest {
  margin: 10px 0 0 500px;
}
.addClass {
  background-color: #fff;
  padding: 39px 0px;
  height: 800px;
}
.mystlye {
  .title {
    display: block;
    margin-left: 500px;
    left: 569px;
    top: 191px;
    width: 216px;
    height: 54px;
    color: rgba(244, 119, 4, 1);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
  .xuehua {
    float: left;
    margin-left: 535px;
    // display: block;
    color: #c7ccc7;
    font-size: 50px;
  }
}
</style>