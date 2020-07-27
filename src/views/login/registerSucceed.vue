<template>
  <div class="login_box">
    <div class="headers clearfix">
      <div class="grid-content logo fl">
        <img src="../../../static/images/logo.png" alt="" class="logo-icon" />
      </div>
      <div class="typelist fr"></div>
    </div>
    <div class="login">
      <!--      <img src="/static/images/login_bg.jpg" alt="" class="login_bg">-->
      <div class="login-mt72">
        <div class="login_con bxs">
          <h2 class="h2  ft20 fb">老师注册</h2>
          <div class="con submit-test-dialog">
            <p class="result  tc ft18 col39a ">恭喜您注册成功！</p>
            <p class="forget  tc  col39a">{{ count }}s后跳转到主页</p>
            <p class="forget  tc  col39a ">
              您的网站身份ID为：{{ idCard }}（也可用此号登录）
            </p>
            <img
              src="../../../static/images/register_sucss_icon.jpg"
              alt=""
              class="register_sucss_icon"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <Articles></Articles>
    </div>
    <p class="copyright tc">
      <Footers></Footers>
    </p>
  </div>
</template>

<script>
import Footers from "../../components/common/footers";
import Articles from "../../components/articles/articles";
export default {
  name: "login",
  components: {
    Articles,
    Footers
  },
  data() {
    return {
      idCard: this.$route.query.idCard,
      count: 5,
      t: null
    };
  },
  created() {
    this.getInterval();
  },
  methods: {
    getInterval() {
      if (this.count == 5) {
        this.t = setInterval(res => {
          this.count--;
          if (this.count == 0) {
            this.count = 5;
            this.$router.push({ path: "/homeCommon" });
            clearInterval(this.t);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="less">
.headers {
  width: 1300px;
  height: 104px;
  margin: 0 auto 0 auto;

  .logo {
    width: 149px;
    height: 63px;
    margin-top: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .typelist {
    margin-top: 34px;
  }
}
.login_box {
  overflow-x: hidden;
  .login {
    width: 100%;
    height: 702px;
    /*position: relative;*/
    background: #eff3f5;
    box-sizing: border-box;
    padding-top: 180px;
    .login_bg {
      /*width: 100%;*/
      height: 702px;
      object-fit: cover;
    }
    .login_con {
      /*position: absolute;*/
      background: #ffffff;
      border-radius: 4px;
      width: 400px;
      height: 210px;
      /*top: 28%;*/
      /*left: 78%;*/
      /*margin-left: -245px;*/
      padding: 20px 40px 130px 40px;
      /*padding-bottom: 130px;*/

      .h2 {
        color: #088dff;
        position: relative;
        padding-left: 10px;

        &::before {
          content: "";
          border-left: 3px solid #39a5ff;
          display: inline-block;
          height: 22px;
          top: 4px;
          position: absolute;
          left: 0;
        }
      }
      .info {
        margin: 8px 0 0 10px;
      }
      .con {
        margin: 20px 0 40px 0;

        .forget {
          margin-top: 8px;
        }
        .register_sucss_icon {
          width: 172px;
          height: 147px;
          margin: 20px auto 20px auto;
          display: block;
        }
        .result {
          margin-top: 28px;
        }
        .classInfo {
          margin-top: 20px;
          .album {
            border-right: 1px solid #39a5ff;
            padding-right: 6%;
            &:last-child {
              border-right: 0;
              padding-right: 0;
            }
            .name {
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
  .article {
    width: 100%;
    overflow-x: hidden;
    .article-con {
      padding: 0 10%;
      box-sizing: border-box;
      .grid-content {
        margin-top: 30px;
        padding-right: 10%;
        box-sizing: border-box;
        .content {
          padding-right: 10%;
          box-sizing: border-box;
          margin-top: 20px;
          border-right: 1px solid #b5b5b5;
          p {
            margin-bottom: 16px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
        }
      }
    }
  }
  .copyright {
    margin: 20px 0;
  }
}
</style>
