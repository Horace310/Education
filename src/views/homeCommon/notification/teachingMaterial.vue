<template>
  <div class="mt72" style="background:white;padding:20px">
    <div class="myBox">
      <el-form label-width="100px" style="width:50%;padding-left:15  0px">
        <el-form-item label="学段：">
          <el-select v-model="periodId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科：">
          <el-select v-model="subject" placeholder="请选择">
            <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本：">
          <el-select v-model="edition" placeholder="请选择">
            <el-option v-for="item in optionx" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#2ab8b3;color:#fff;border:0;width:150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      subject: parseInt(sessionStorage.getItem("subject")),
      periodId: sessionStorage.getItem("periodId"),
      edition: parseInt(sessionStorage.getItem("editionId")),
      optionx: [
        { value: "1", label: "北师大版" },
        { value: "2", label: "人教版" },
        { value: "3", label: "国际版" }
      ],
      options: [
        { value: "1", label: "小学" },
        { value: "2", label: "初中" },
        { value: "3", label: "高中" }
      ],
      option: [
        { value: "1", label: "语文" },
        { value: "5", label: "数学" },
        { value: "3", label: "英语" }
      ]
    };
  },
  created() {
    this.getSubject();
    this.getedition();
  },
  methods: {
    setFun() {
      this.$post("user/modify/teaching/material").then(res => {
        if (res.code == 5000) {
          console.log(res);
        }
      });
    },
    getedition() {
      this.$get("/system/edition").then(res => {
        this.optionx = res.data;
      });
    },
    getSubject() {
      this.$get("/homework/textbook/subjectSelect", {
        periodId: this.periodId
      }).then(res => {
        if (res.code == 5000) {
          this.option = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>