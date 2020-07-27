<template>
  <div></div>
</template>
    
    <script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    if (this.$route.query.code) {
      const code = this.$route.query.code;
      if (localStorage.getItem("weixin") == "bind") {
        this.createWeixin(code);
      } else if (localStorage.getItem("weixin") == "login") {
        this.createWeixinLogin(code);
      }
    }
  },
  beforeDestroy() {
    localStorage.removeItem("weixin");
  },
  methods: {
    createWeixinLogin(code) {
      this.$axios({
        url: "http://data.ikeshen.com/auth/weChatLogin",
        method: "post",
        params: { code }
      }).then(response => {
        if (response.data.access_token) {
          let token = "bearer " + response.data.access_token;
          window.opener.postMessage(response.data, window.opener.origin);
          window.close();
          // sessionStorage.setItem("token", token);
          // var that = this;
          // setTimeout(function() {
          //   that.getdetail();
          // }, 1000);
        } else if (response.data.code == 6058) {
          localStorage.removeItem("weixin");
          window.opener.postMessage(response.data, window.opener.origin);
          window.close();
          // this.$message.error(response.data.message);
        }
        localStorage.removeItem("weixin");
      });
    },
    createWeixin(code) {
      localStorage.removeItem("weixin");
      window.opener.postMessage(code, window.opener.origin);
      window.close();
    },
    getdetail() {
      this.$get("/user/detail").then(res => {
        sessionStorage.setItem("subjectName", res.data.subject);
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("subjectId", res.data.subjectId);
        sessionStorage.setItem("editionId", res.data.editionId);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("avatar", res.data.avatar);
        sessionStorage.setItem("type", res.data.type);
        sessionStorage.setItem("stuno", res.data.stuno);
        sessionStorage.setItem("userCode", res.data.code);
        if (res.data.type == 1) {
          this.$router.push("/homeCommon");
        }
        if (res.data.type == 2) {
          this.$router.push("/studentCommon");
        }
        if (res.data.type == 3) {
          this.$router.push("/homeCommon");
        }
      });
    }
  }
};
</script>
<style lang="less">
// .available {
//   background: red;
// }
</style> 