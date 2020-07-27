<template>
  <div>
    <div class="disciplineCircle_head"></div>
    <div class="mt72">
      <div class="disciplineCircle_title">
        <p>金牌教师圈</p>
        <div class="disciplineCircle_card">
          <div v-for="i in 3" :key="i">
            <img src="../../../../static/images/payed.jpg" />
          </div>
          <!-- <div  style="background:white;padding:30px 17px 0 17px ">
            <h4>教学学科圈</h4>
            <p>老师可以自由创建、编辑、删除单元，还可以查看发布过的作业...</p>
            <h4>
              适用对象：
              <span>七年级学生</span>
            </h4>
            <h4>
              金额：
              <span>500</span>
              <span>元</span>
            </h4>
            <div>
              <el-input style="width:120px" placeholder="输入验证码" v-model="input" clearable></el-input>
              <span style="background:#2ab8b3;color:white;display:inline-block;height:50px">加入学科圈</span>
            </div>
          </div>-->
        </div>
      </div>
      <div class="disciplineCircle_title">
        <p>精英教师圈</p>
        <div class="disciplineCircle_card">
          <div v-for="i in 3" :key="i">
            <img src="../../../../static/images/payed.jpg" />
          </div>
        </div>
      </div>
      <div class="disciplineCircle_title">
        <p>研发团队圈</p>
        <div class="disciplineCircle_card">
          <div v-for="i in 3" :key="i">
            <img src="../../../../static/images/payed.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.disciplineCircle_head {
  background: url("../../../../static/images/banner.jpg");
  height: 260px;
  width: 100%;
}
.disciplineCircle {
}
.disciplineCircle_card {
  display: flex;
  justify-content: space-between;
  img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
.disciplineCircle_title {
  & > p {
    font-weight: 600;
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
}
</style>
