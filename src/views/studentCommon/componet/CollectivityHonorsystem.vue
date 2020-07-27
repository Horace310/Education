<template>
  <div>
    <div class="title">
      <h1 style="text-align: center;">学生集体性荣誉展示</h1>
    </div>
    <div>
      <el-select v-model="SubjectName" placeholder="请选择学科" @change="getSubjectId">
        <el-option v-for="item in xuekeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div style="margin-top:20px;">
      <div class="bigbox">
        <div class="left">
          <span>优秀小组长：</span>
        </div>
        <div class="right">
          <li style="float:left;width:10%" v-for="(i,index) in fenzuList[0]" :key="index">
            <img :src="i.img" alt />
            <p>{{i.name}}</p>
          </li>
        </div>
      </div>
      <div class="bigbox">
        <div class="left">
          <span>优秀科代表：</span>
        </div>
        <div class="right">
          <li style="float:left;width:10%" v-for="(i,index) in fenzuList[1]" :key="index">
            <img :src="i.img" alt />
            <p>{{i.name}}</p>
          </li>
        </div>
      </div>
      <div class="bigbox">
        <div class="left">
          <span>优秀小组成员：</span>
        </div>
        <div class="right">
          <li style="float:left;width:10%" v-for="(i,index) in fenzuList[2]" :key="index">
            <img :src="i.img" alt />
            <p>{{i.name}}</p>
          </li>
        </div>
      </div>
      <div class="bigbox">
        <div class="left">
          <span>优秀好帮手：</span>
        </div>
        <div class="right">
          <li style="float:left;width:10%" v-for="(i,index) in fenzuList[3]" :key="index">
            <img :src="i.img" alt />
            <p>{{i.name}}</p>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //  goldSize:require("@/assets/glodSize.png"),
      goldSize: sessionStorage.getItem("avatar"),
      name: sessionStorage.getItem("username"),
      xuekeList: [],
      fenzuList: [[], [], [], []],
      SubjectName: ""
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.xuekeList = res.data;
      });
    },
    // http://127.0.0.1:8301/honor/teamhonor/StqueryTeamdetail?subjectid=5
    StqueryTeamdetail() {
      this.$get("/honor/teamhonor/StqueryTeamdetail", {
        subjectid: this.SubjectName
      }).then(res => {
        let data = [...res.data];
        let newList = [[], [], [], []];
        data.forEach((ele, index) => {
          ele.forEach((elee, indexx) => {
            let newEle = { name: elee.split(",")[0], img: elee.split(",")[1] };
            newList[index].push(newEle);
          });
        });
        this.fenzuList = newList;
      });
    },
    getSubjectId() {
      this.StqueryTeamdetail();
    }
  }
};
</script>
<style scoped lang="less">
.bigbox {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}
.left {
  float: left;
  text-align: right;
  width: 20%;
  padding: 10px;
  box-sizing: border-box;
  span {
    display: inline-block;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
}
.right {
  float: left;
  width: 80%;
  margin-top: 20px;
  padding-right: 200px;
  box-sizing: border-box;
  li {
    width: 10%;
    float: left;
    text-align: center;
    list-style-type: none;
    img {
      width: 50px;
      border-radius: 50%;
    }
  }
}
</style>