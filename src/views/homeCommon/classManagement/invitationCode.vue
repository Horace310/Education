<template>
  <div class="invitationCodes  mt72 bx">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homeCommon/classManagement' }"
          >班级管理</el-breadcrumb-item
        >
        <el-breadcrumb-item
          :to="{ path: '/homeCommon/classManagement/createClass' }"
          >创建班级</el-breadcrumb-item
        >
        <el-breadcrumb-item>班级邀请码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="invitationCode-con bf   tc bx">
      <p class="tit ft20">班级邀请码</p>
      <div class="content cp bx">
        <div class="model_title">
          <div class="title col39a">
            <span class="tits"
              >{{ classById.subjectName }}{{ classById.subjectName }}</span
            >
            <i class="icon_l"></i>
            <i class="icon_r"></i>
          </div>
        </div>
        <div class="name">
          <div class="names">
            {{ classById.name }}
            <!--            <i class="right-arrow"></i>-->
          </div>
        </div>
        <p class="invitationCode">邀请码：{{ classById.code }}</p>
        <p class="time">创建时间:{{ classById.createTime }}</p>
      </div>
      <p class="code ft16 colff8">班级邀请码：{{ classById.code }}</p>
      <p class="info ft16 col999">（学生端通过此码申请加入该班级）</p>
      <p class="times ft16 colff8">{{ count }}s</p>
      <p class="ft16 col999">5秒后跳转到班级管理主页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "invitationCode",
  data() {
    return {
      classById: [],
      t: null,
      count: 5
    };
  },
  created() {
    //  this.queryClassById(); //根据id查询班级信息
    // this.countDown()
    this.getClass();
  },
  methods: {
    //查询班级接口
    getClass() {
      let data = { userId: sessionStorage.getItem("userId") };
      this.$get("/class/classes", data).then(res => {
        if (res.code == "5000") {
          this.classById = response.data;
        }
      });
    },
    countDown(e) {
      this.t = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          clearInterval(this.t);
          this.$router.push({
            path: "/homeCommon/classManagement"
          });
        }
      }, 1000);
    }
    // queryClassById() {
    //   this.$post("/likework/queryClassById.do", {
    //     classId: this.$route.query.id
    //   }).then(response => {
    //     //console.log(response)
    //     if (response.code == "5000") {
    //       this.classById = response.data;
    //       this.countDown();
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
.invitationCodes {
  text-align: center;
  margin-bottom: 100px;
  .nav {
    margin: 20px 0;
  }
  .invitationCode-con {
    height: 600px;
    padding: 50px 0 80px 0;
    .content {
      background: url("../../../../static/images/class_bgimg01.jpg") no-repeat;
      height: 180px;
      text-align: center;
      padding-top: 28px;
      width: 100%;
      max-width: 270px;
      margin: 40px auto;
      .name {
        font-size: 24px;
        position: relative;
        margin: 14px auto 0 auto;
        height: 34px;
      }
      .invitationCode {
        margin: 14px 0 0 0;
      }
      .time {
        font-size: 12px;
      }
    }
    .info {
      margin: 20px 0 70px 0;
    }
    .times {
      margin-bottom: 20px;
    }
  }
}
.model_title {
  width: 100%;
  text-align: center;
  position: relative;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .title {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
    .tits {
    }
    .icon_l {
      position: absolute;
      width: 25px;
      height: 8px;
      right: -25px;
      top: 6px;
      background: url("../../../../static/images/icon_r.png") right center
        no-repeat;
      display: inline-block;
    }
    .icon_r {
      position: absolute;
      width: 25px;
      height: 8px;
      left: -25px;
      top: 6px;
      background: url("../../../../static/images/icon_l.png") left center
        no-repeat;
      display: inline-block;
    }
  }
}
.name {
  width: 100%;
  text-align: center;
  position: relative;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .names {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .right-arrow {
    position: absolute;
    width: 9px;
    height: 17px;
    right: -9px;
    top: 9px;
    background: url("../../../../static/images/arrow_r.png") right center
      no-repeat;
    display: inline-block;
  }
}
</style>
