<template>
  <div class="mt72 addClass clearfix">
    <div class="addClassBox">
      <div class="Box">
        <span style="margin-top:20px;margin: 0 0 0 20px;">邀请码:</span>
        <el-input class="code" placeholder="请输入邀请码" v-model="code" size="mini"></el-input>
        <el-button class="add" size="mini" @click="getClass">加入</el-button>
      </div>
    </div>

    <div class="testright">
      <p class="title">当前加入班级</p>
      <div class="box2" v-for="(item,index) in list.children" :key="index">
        <!-- 分段，1表示小学，2表示初中，3表示高中 -->
        <p
          style="margin:10px 0 0 20px;"
        >学段：{{item.type==1?"小学":(item.type==2?"初中":item.type==3?"高中":"")}}</p>
        <p style="margin:10px 0 0 20px;">班级:{{item.name}}</p>
        <p style="margin:10px 0 0 20px;">学科教师：</p>
        <div v-for="items in item.children" style="margin:5px 0 0 40px;">
          <p>{{items.subjectName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{items.username}}</p>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      list: [],
      type: "",
      name: ""
    };
  },
  created() {
    this.getstudentslist();
  },
  methods: {
    getstudentslist() {
      this.$post("/user/students/list", {
        userId: sessionStorage.getItem("userId")
      }).then(res => {
        if (res.code == 5000) {
          this.list = res.data;
          console.log(res.data);
          // if (list.length != 0) {
          //   this.type = list.children[0].type;
          //   this.name = list.children[0].name;
          //   if (list.children[0].children.length != 0) {
          //     this.list = list.children[0].children;
          //   }
          // }
        }
      });
    },
    getClass() {
      let data = {
        code: this.code,
        userId: sessionStorage.getItem("userId"),
        studentId: sessionStorage.getItem("stuno"),
        img: sessionStorage.getItem("avatar")
      };
      this.$post("/user/students/add", data).then(res => {
        if (res.code == "5000") {
          this.$message({ type: "success", message: "加入成功" });
          this.getstudentslist();
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.addClass {
  background-color: #fff;
  padding: 39px 0px;
  min-height: 600px;
  .addClassBox {
    margin-left: 54px;
    float: left;
    width: 30%;
    height: 300px;
    padding: 0px 30px;
    .Box {
      width: 220px;
      height: 140px;
      box-shadow: 0.092593rem 0.092593rem 0 0 #eee,
        0.092593rem 0.092593rem 0 0 #eee;
      border: 0.018519rem solid #eee;
      background-color: #fff;
      border-radius: 0.277778rem;
      .code {
        margin-top: 20px;
        width: 120px;
        height: 25px;
        margin-right: 10px;
        margin-left: 10px;
      }
      .add {
        width: 125px;
        margin-left: 80px;
        margin-top: 30px;
        background-color: #ec6e51;
        color: #fff;
      }
    }
  }
  .testright {
    border-left: 1px solid rgb(238, 238, 238);
    width: 50%;
    float: left;
    .title {
      color: #fff;
      background-color: #ec6e51;
    }
    .box2 {
      float: left;
      margin-top: 20px;
      margin-left: 20px;
      height: 280px;
      width: 240px;
      box-shadow: 0.092593rem 0.092593rem 0 0 #eee,
        0.092593rem 0.092593rem 0 0 #eee;
      border: 0.018519rem solid #eee;
      background-color: #fff;
      border-radius: 0.277778rem;
    }
  }
}
</style>