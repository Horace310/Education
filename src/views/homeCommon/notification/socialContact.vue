<template>
  <div class="mt72">
    <div class="myBox">
      <div class="weixin">
        <img style="width:100px" src="../../../../static/images/weixin.jpg" alt />
        <div>
          <el-button
            v-if="contion==1"
            @click="Showerwei"
            style="margin-top:25px"
            size="small"
            type="primary"
          >绑定</el-button>
          <el-button
            v-if="contion==0"
            @click="jiebang"
            style="margin-top:25px"
            size="small"
            type="danger"
          >解绑</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      contion: sessionStorage.getItem("contion")
    };
  },
  mounted() {
    window.addEventListener("message", event => {
      if (event.origin === window.location.origin) {
        // 根据接受到的信息执行对应的方法
        console.log(event.data);
        if (typeof event.data == "string") {
          // console.log(event.data.data);
          this.$axios({
            url: "http://data.ikeshen.com/auth/bindWeChat",
            method: "post",
            params: { code: event.data }
          }).then(response => {
            if (response.data.code == "5000") {
              this.$message({
                message: "绑定成功！",
                type: "success"
              });
              this.contion = 0;
              sessionStorage.setItem("contion", 0);
              // this.$router.push({
              //   path: "/homeCommon/notification/personalInfo"
              // });
            } else {
              this.$message.error(response.data.message);
            }
          });
        }
      }
    });
  },
  methods: {
    //显示二维码
    Showerwei() {
      localStorage.setItem("weixin", "bind");
      window.open(
        `https://open.weixin.qq.com/connect/qrconnect?appid=wx08b76f3bd17806a8&redirect_uri=http://www.ikeshen.com&response_type=code&scope=snsapi_login&state="
          ${this.state}
          "#wechat_redirect"`,
        "_blank",
        "width=650,height=550,menubar=no,toolbar=no,status=no,scrollbars=yes"
      );
      // this.erweima = !this.erweima;
      // window.location.href =
      //   "https://open.weixin.qq.com/connect/qrconnect?appid=wx08b76f3bd17806a8&redirect_uri=http://www.ikeshen.com/#/callback&response_type=code&scope=snsapi_login&state=" +
      //   this.state +
      //   "#wechat_redirect";
    },
    //解绑
    jiebang() {
      this.$axios({
        url: "http://data.ikeshen.com/auth/unBindWeChat",
        method: "post"
      }).then(response => {
        if (response.data.code == "5000") {
          this.$message({
            message: "解绑成功",
            type: "success"
          });
          this.contion = 1;
          sessionStorage.setItem("contion", 1);
        } else {
          this.$message.error(response.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.weixin {
  padding-top: 30px;
  text-align: center;
  width: 250px;
  height: 200px;
  background: white;
}
</style>