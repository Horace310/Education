<template>
  <div class="login_box">
    <!--    <div class="headers clearfix">-->
    <!--        <div class="grid-content logo fl">-->
    <!--          <img src="../../../static/images/logo.png" alt="" class="logo-icon">-->
    <!--        </div>-->
    <!--        <div class="typelist fr">-->
    <!--          <el-button type="primary" @click="loginrt">登录</el-button>-->
    <!--          <el-button type="primary" @click="resrt">注册</el-button>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="login">
      <img src="/static/images/bg.jpg" alt class="login_bg" />
      <div class="login-mt72">
        <div class="login_cons bxs" v-if="forget">
          <h2 class="h2 ft20 fb">用户登录</h2>
          <div class="con submit-test-dialog">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="0"
              class="demo-ruleForm"
              @submit.native.prevent
            >
              <el-form-item label prop="account" class="zh_icon">
                <el-input
                  style="border:none"
                  v-model="ruleForm2.account"
                  placeholder="请输入用户名/手机号/身份ID"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="password" class="pas_icon">
                <el-input
                  style="border:none"
                  v-model="ruleForm2.password"
                  :error="passError"
                  placeholder="请输入密码"
                  type="password"
                  @keyup.native="show($event)"
                ></el-input>
              </el-form-item>
              <div class="link-login">
                <p
                  class="forget col39a tr ft16 cursor"
                  @click="forgets"
                  unselectable="on"
                  onselectstart="return false;"
                  style="-moz-user-select:none;"
                >忘记密码</p>
              </div>
              <el-form-item>
                <el-button class="loginBtn" @click="submitForm('ruleForm2')">立即登录</el-button>
              </el-form-item>
            </el-form>
            <p class="reg tc ft16 cp" @click="teacherRegister">
              <span class="col999">没有账号，</span>
              <span class="col39a" style="color:#35e6e8">立马注册</span>
            </p>
            <p class="reg tc ft16 cp" @click="Showerwei">
              <span class="col999">
                <img src="/static/images/weixin.png" alt />
              </span>
            </p>
            <!-- <div class="erweimaBox" v-show="erweima" >
              <img src="/static/images/下载.png" alt="">
              <p>扫码登录</p>
            </div>-->
            <!--            <div class="choose">-->
            <!--              <div class=" flexrow   ft16  col39a tc ">-->
            <!--                <div class="album" @click="teacherRegister">-->
            <!--                  <img src="/static/images/login_teacher_icon.jpg" alt="" class="img">-->
            <!--                  <div class='name'>我是老师</div>-->
            <!--                </div>-->
            <!--                <div class="album" @click="studentRegister">-->
            <!--                  <img src="/static/images/login_student_icon.jpg" alt="" class="img">-->
            <!--                  <div class='name'>我是学生</div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="login_cons bxs" style="height: 360px" v-else>
          <h2 class="h2 ft20 fb">忘记密码</h2>
          <div class="con submit-test-dialog">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="0"
              class="demo-ruleForm"
              @submit.native.prevent
            >
              <el-form-item label prop="mobile" class="sj_icon">
                <el-input
                  v-model="ruleForm.mobile"
                  placeholder="您的手机号码"
                  maxlength="11"
                  @input="e => (ruleForm.mobile = validNumber(e))"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="verificationCode" class="yzm">
                <el-input
                  v-model="ruleForm.verificationCode"
                  placeholder="验证码"
                  maxlength="6"
                  @input="e => (ruleForm.verificationCode = validNumber(e))"
                ></el-input>
                <el-button type="primary" @click="getcode">
                  {{
                  count == 60 ? "获取验证码" : "重新获取(" + count + ")"
                  }}
                </el-button>
              </el-form-item>
              <el-form-item label prop="pwd" class="pas_icon">
                <el-input v-model="ruleForm.pwd" placeholder="请输入密码(6到20个字符）" type="password"></el-input>
              </el-form-item>
              <el-form-item label prop="checkPass" class="pas_icon">
                <el-input
                  v-model="ruleForm.checkPass"
                  placeholder="请确认密码"
                  type="password"
                  @keyup.native="show2($event)"
                ></el-input>
              </el-form-item>
              <div class="link-login" style="text-align:right;">
                <span
                  class="forget col39a tr ft16 cursor"
                  @click="forgets"
                  unselectable="on"
                  onselectstart="return false;"
                  style="-moz-user-select:none;"
                >返回登录</span>
              </div>
              <el-form-item>
                <el-button type="primary" @click="submitForm2('ruleForm')">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="RegulationsBox" v-if="showBox">
          <p class="logintitle">爱课生隐私权政策</p>
          <p class="text">感谢您信任并使用本产品，为了能够更加全面的保障您的权益，请务必仔细阅读《爱课生隐私权政策》。点击同意即代表已阅读并同意《爱课生隐私权政策》。</p>
          <div class="regulations">
            <el-container>
              <el-header>
                <p style="text-align:center;font-size:18px;padding:8px">爱课生隐私权政策</p>
                <p style="text-align:right;margin-bottom:20px">版本更新日期:2019年12月30日</p>
              </el-header>
              <el-main class="mainRegulations">
                <p>
                  本政策适用于深圳市乐乐米信息技术有限公司（以下简称“我们”或“米信”）的爱课生系列产品（以下简称“产品”）或服务，包括爱课生网页端、爱课生移动端、爱课生学生端、爱课生教师端。
                  <br />我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
                  请在使用我们的产品（或服务）前，仔细阅读并了解本政策，并确认了解我们对您个人信息的处理规则。一旦您点击确认接受本政策或在隐私政策更新后，您继续使用本软件，即表示您认可并接受本政策（含更新版本）的所有内容，并同意我们按本政策收集、使用、保存、共享、转让或披露您的相关个人信息。
                  本政策将帮助您了解以下内容：
                  <br />一、定义与解释
                  <br />二、我们如何收集和使用您的个人信息
                  <br />三、我们如何使用 Cookie 和同类技术
                  <br />四、我们如何共享、转让、公开披露您的个人信息
                  <br />五、我们如何存储和保护您的个人信息
                  <br />六、您的权利
                  <br />七、我们如何处理未成年人的个人信息
                  <br />八、您的个人信息如何在全球范围转移
                  <br />九、本政策如何更新
                  <br />十、如何联系我们
                  <br />一、定义与解释
                  <br />1. 个人信息
                  <br />个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别自然人个人身份的各种信息，包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码。为免疑义，个人信息包括但不限于个人敏感信息。
                  2. 个人敏感信息
                  <br />个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇的个人信息。个人敏感信息包括但不限于身份证件号码、个人生物识别信息、银行账户、通信内容、健康生理信息。
                  3. 个人信息主体
                  <br />个人信息主体指个人信息所标识的自然人
                  <br />4. 去标识化
                  <br />去标识化指通过对个人信息的技术处理，使其在不借助额外信息的情况下，无法识别个人信息主体的过程。
                  <br />5. 匿名化
                  <br />匿名化指通过对个人信息的技术处理，使得个人信息主体无法被识别，且处理后的信息不能被复原的过程。
                  <br />6. 设备
                  <br />设备是指可用于访问我们服务的装置，例如台式计算机、笔记本电脑、平板电脑或智能手机。
                  <br />7. 唯一设备标识符
                  <br />唯一设备标识符（专属 ID 或
                  UUID）是指由设备制造商编入到设备中的一串字符，可用于以独有方式标识相应设备（移动设备的
                  IMEI
                  号）。唯一设备标识符有多种用途，包括可在不能使用cookies时用以提供广告。
                  <br />8. IP地址
                  <br />每台上网的设备都会指定一个编号，称为互联网协议 (IP)
                  地址。这些编号通常都是根据地理区域指定的。IP
                  地址通常可用于识别设备连接至互联网时所在的位置。
                  <br />9. GPS
                  <br />Global Positioning
                  System（全球定位系统）的简称。您使用的设备上的GPS信号接收器可以从GPS卫星收到信号并利用传来的信息计算您的位置。
                  <br />10. WIFI
                  <br />Wi-Fi是一种允许电子设备连接到一个无线局域网（WLAN）的技术，通常我们所说的无线网络。
                  <br />11. 基站
                  <br />基站，即公用移动通信基站，是无线电台站的一种形式，是指在一定的无线电覆盖区中，通过移动通信交换中心，与移动电话终端之间进行信息传递的无线电收发信电台。
                  <br />12. SSL
                  <br />SSL（Secure Socket
                  Layer）又称为安全套接层，是在传输通信协议（TCP/IP）上实现的一种安全协议。SSL支持各种类型的网络，同时提供三种基本的安全服务，均通过使用公开密钥和对称密钥技术以达到信息保密的效果。
                  <br />13. 信息收集技术
                  <br />本政策中所述的“自动收集”包括以下方式：
                  <br />1）Cookie
                  <br />Cookie是您浏览网页时，网站服务器放在客户端（您的计算机、移动电话或其他智能终端内）里面的一个小小的文本文件，可用于改善您的使用体验。
                  <br />2）Web beacon（网络信标）
                  <br />Web
                  beacon是装嵌在网站或电邮内的电子图像文件案或其他技术，可用于计算访客数目、记录您是否及何时阅览电邮或网站，或用以使用某些Cookie。
                  <br />3）Log files（日志文件）
                  <br />Log
                  files储存自动收集的若干数据。该等数据包括互联网协议（IP）地址、浏览器类型、互联网服务提供商（ISP）、引用/退出页面、操作系统、日期/时间戳和点击流数据等。
                  <br />4）ET Tag（实体标签）
                  <br />ET
                  Tag是在互联网浏览器与互联网服务器之间背后传送的HTTP协议标头，可代替Cookie，用以追踪个别使用者，使我们可更深入地了解和改善我们的服务。
                  <br />5）JavaScript
                  <br />JavaScript是一种编程语言，用于制作更具互动性和动态的网页。JavaScript可以设定Cookie、阅读Cookie及删除Cookie。
                  <br />二、我们如何收集和使用您的个人信息
                  <br />1、成为我们的用户并登录
                  本产品支持您使用手机号或通过第三方平台自行完成注册，成为我们的家长用户，也可使用由教师或学校管理人员进行创建并下发的学生、教师帐号进行登录。
                  在您登录后，您可以选择性地提供更多的个人信息，包括头像、昵称、性别、生日、所属区域、所在年级、身份，方便我们为您提供更好的服务。如您不提供上述额外信息，仍可以使用我们的产品或服务。
                  您提供的上述信息将在您使用我们提供的服务期间持续授权我们使用。在您主动注销帐号时，我们将根据适用法律法规的要求尽快使其匿名或删除您的个人信息。
                  <br />2、为您提供我们的产品和服务
                  我们的产品主要面向学生、教师和家长，帮助学生和家长了解学习动态，提供教学资源。在学生端、教师端和家长端之间进行联动。
                  教师端的主要功能包括“首页”、“作业中心”、“班级管理”、“资源工具”、“学科圈”、“个人中心”、“教学教研”共7个主要业务功能。
                  学生端的主要功能包括“首页”、“作业中心”、“错题本”、“个人中心”、“资源工具”共4个主要业务功能。
                  教师端的主要是提供给学校教师的移动在线平台，针对教与学服务进行智能化分析，支持在线阅卷、看报告、试卷讲评等功能，包括利用网络在线布置作业，利用相机拍照功能上传试题和答案，利用消息通知发送班级动态
                  我们根据合法、正当、必要的原则，出于如下所述的目的收集和使用您的个人信息。
                  <br />1）您通过我们的客服或参加我们举办的活动时所提交的信息
                  如果您参与我们的线上活动，填写的调查问卷中可能包含您的姓名、电话、电子邮箱、家庭地址信息。
                  <br />2）您通过其他方式向我们所提交的信息
                  如果您通过邮寄或传真方式向我们提供相关的证明文件，文件中可能包含您的姓名、电话、家庭地址等信息。
                  如果您购买需要寄送的实体商品并向我们提供收货信息，收货信息中可能包含您的姓名、电话、家庭地址等信息。
                  <br />3）设备信息
                  我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息，包括设备名称、设备型号、设备识别码、操作系统和应用程序版本、设备设置、电池、信号强度，语言设置、分辨率、设备传感器参数、服务提供商网络ID。
                  <br />4）日志信息
                  当您使用我们的所有业务功能时，系统会通过cookies或其他方式自动收集某些信息作为有关网络日志保存。此类信息包括：使用本产品或服务时的详细使用情况，例如您的搜索查询内容、访问的页面地址、浏览器的类型、运营商、使用的语言、访问日期和时间、设备崩溃、系统活动、访问的网页记录以及用户触发事件统计数据等。该类信息将有助于我们统计分析学生的安全上网行为。
                  <br />5）其他信息
                  在您使用我们的产品有疑惑时，在您与我们联系时，我们可能会保存您的通信/通话记录和语音等信息或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。
                  <br />6）系统权限调用
                  <br />为提供服务，我们会调用您的一些系统权限。下方我们列出了请求权限对应的业务功能、调用目的及请求时机。其中的所有权限，您都可以在系统的设置功能中选择关闭，关闭后爱课生将无法通过这些权限收集对应的个人信息。对于系统权限的具体操作方式，以您的设备系统开发者提供的说明为准。
                </p>
              </el-main>
            </el-container>
          </div>
          <div class="yeah">
            <el-button @click="showBox = false">不同意</el-button>
            <el-button style="background-color:#098f81;color:#fff;border:0" @click="agree">同意</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="login_foot">
      <p style="text-align:center;margin-top:20px">
        Copyright©2020深圳市爱课生技术有限公司版权所有
        <br />粤ICP备18022857号-2
      </p>

      <!-- <Articles></Articles> -->
    </div>
    <!-- <p class="copyright tc">
      <Footers></Footers>
    </p>-->
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
      //二维码
      showBox: false,
      erweima: false,
      passError: "",
      forget: true,
      state: new Date().getTime(),
      ruleForm2: {
        account: "",
        password: ""
      },
      ruleForm: {
        mobile: "",
        verificationCode: "",
        pwd: "",
        checkPass: ""
      },
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rules2: {
        account: [
          {
            required: true,
            message: "请输入用户名/手机号/身份ID",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      activeIndex: "",
      check: "",
      count: 60,
      Wxcode: ""
    };
  },
  // beforeCreate() {
  //   if (this.$route.query.code) {
  //     this.$router.push({
  //       path: "/callback",
  //       query: { code: this.$route.query.code }
  //     });
  //     if (sessionStorage.getItem("weixin")) {
  //       this.$router.push({
  //         path: "/callback",
  //         query: { code: this.$route.query.code }
  //       });
  //     }
  //   }
  // },
  mounted() {
    window.addEventListener("message", event => {
      if (event.origin === window.location.origin) {
        // 根据接受到的信息执行对应的方法
        if (event.data.access_token) {
          let token = "bearer " + event.data.access_token;
          sessionStorage.setItem("token", token);
          var that = this;
          setTimeout(function() {
            that.getdetail();
          }, 1000);
        } else {
          this.$message.error(event.data.message);
        }
      }
    });
  },
  created() {
    //微信登录
    // this.wechaLogin()
    // var code = { code: this.$route.query.code };
    // this.$post("/loginByWeixin", code).then(res => {
    //   if (res.data.registe == false) {
    //     this.$message.error("尚未绑定,请注册");
    //     sessionStorage.setItem("wxcode", res.data.wxcode);
    //     sessionStorage.setItem("wxicon", res.data.icon);
    //     sessionStorage.setItem("sex", res.data.sex);
    //     sessionStorage.setItem("wxusername", res.data.username);
    //     setTimeout(() => {
    //       this.$router.push({ path: "/teacherRegister" });
    //     }, 2000);
    //   } else if (res.data.registe == true) {
    //     //  console.log(res.data)
    //     this.$message.success("登录成功");
    //     let token = res.data.Authorization;
    //     let id = res.data.user.id;
    //     let identity = res.data.user.identity;
    //     let role = res.data.user.role;
    //     let mobile = res.data.user.mobile;
    //     this.$store.state.wxusername = res.data.username;
    //     this.$store.state.subjectId = res.data.subjectId;
    //     sessionStorage.setItem("wxcode", res.data.user.wxcode);
    //     sessionStorage.setItem("wxicon", res.data.user.icon);
    //     sessionStorage.setItem("sex", res.data.user.sex);
    //     sessionStorage.setItem("wxusername", res.data.user.username);
    //     sessionStorage.setItem("identity", identity);
    //     sessionStorage.setItem("mobile", mobile);
    //     sessionStorage.setItem("role", role);
    //     sessionStorage.setItem("id", id);
    //     sessionStorage.setItem("token", token);
    //     if (res.data.user.role == 1) {
    //       setTimeout(() => {
    //         this.$router.push({ path: "/studentCommon" });
    //       }, 2000);
    //     } else if (res.data.user.role == 2) {
    //       setTimeout(() => {
    //         this.$router.push({ path: "/homeCommon" });
    //       }, 2000);
    //     }
    //   }
    // });
  },
  methods: {
    //同意点击
    agree() {
      this.$router.push({ path: "/Register" });
      // this.$router.push({ path: "/teacherRegister" });
    },
    //微信登录
    wechaLogin() {
      // console.log(111)
      //  if ((this.state = this.$route.query.state)) {
      var code = { code: this.$route.query.code };
      this.$post("/loginByWeixin", code).then(res => {
        if (res.data.registe == false) {
          this.$message.error("尚未绑定,请注册");
          sessionStorage.setItem("wxcode", res.data.wxcode);
          sessionStorage.setItem("wxicon", res.data.icon);
          sessionStorage.setItem("sex", res.data.sex);
          sessionStorage.setItem("wxusername", res.data.username);
          setTimeout(() => {
            this.$router.push({ path: "/teacherRegister" });
          }, 2000);
        } else if (res.data.registe == true) {
          //  console.log(res.data)
          this.$message.success("登录成功");
          let token = res.data.Authorization;
          let id = res.data.user.id;
          let identity = res.data.user.identity;
          let role = res.data.user.role;
          let mobile = res.data.user.mobile;
          this.$store.state.wxusername = res.data.username;
          this.$store.state.subjectId = res.data.subjectId;
          sessionStorage.setItem("wxcode", res.data.user.wxcode);
          sessionStorage.setItem("wxicon", res.data.user.icon);
          sessionStorage.setItem("sex", res.data.user.sex);
          sessionStorage.setItem("wxusername", res.data.user.username);
          sessionStorage.setItem("identity", identity);
          sessionStorage.setItem("mobile", mobile);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("token", token);
          if (res.data.user.role == 1) {
            setTimeout(() => {
              this.$router.push({ path: "/studentCommon" });
            }, 2000);
          } else if (res.data.user.role == 2) {
            setTimeout(() => {
              this.$router.push({ path: "/homeCommon" });
            }, 2000);
          }
        }
      });
      // }
    },
    //显示二维码
    Showerwei() {
      localStorage.setItem("weixin", "login");
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
    //登录
    loginrt() {
      this.$router.push({ path: "/login" });
    },
    //注册
    resrt() {
      this.$router.push({ path: "/teacherRegister" });
    },
    //修改密码
    submitForm2(e) {
      this.$refs[e].validate(valid => {
        if (valid) {
          let formdata = this.ruleForm;
          let data = {
            mobile: formdata.mobile,
            verificationCode: formdata.verificationCode,
            newPwd: formdata.pwd
          };
          if (data.pwd == this.ruleForm.checkPass) {
            this.$message({ message: "两次密码不一样", type: "error" });
            return false;
          }
          this.$post("/sso/updatePwd.do", data).then(res => {
            if (res.code == "5000") {
              this.$message({ message: "修改成功", type: "success" });
              this.forgets();
            } else if (res.message == "用户名或密码错误") {
              alert("错误");
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    getcode() {
      if (this.count == 60) {
        this.count--;
        this.GetVerificationVode();
        this.t = setInterval(res => {
          this.count--;
          if (this.count == 0) {
            this.count = 60;
            clearInterval(this.t);
          }
        }, 1000);
      }
    },
    GetVerificationVode() {
      let data = { mobile: this.ruleForm.mobile };
      this.$post("/sso/GetVerificationVode.do", data).then(res => {
        if (res.code == "5000") {
          this.$message({ message: "发送成功!", type: "success" });
          // console.log(res);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 忘记密码
    forgets() {
      this.forget = !this.forget;
    },
    //键盘事件
    show(e) {
      //  console.log(e);
      if (e.keyCode === 13) {
        this.submitForm("ruleForm2");
      }
    },
    show2(e) {
      if (e.keyCode === 13) {
        this.submitForm2("ruleForm");
      }
    },
    //  老师注册
    teacherRegister() {
      this.showBox = true;
    },
    //学生注册
    studentRegister() {
      this.$router.push({ path: "/studentRegister" });
    },
    submitForm(ruleForm2) {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          sessionStorage.clear();
          this.$post(
            "/auth/oauth/token",
            {
              grant_type: "password",
              username: this.ruleForm2.account,
              password: this.ruleForm2.password
            },
            {
              headers: {
                Authorization: "Basic ZmViczoxMjM0NTY="
              }
            }
          ).then(res => {
            let token = "bearer " + res.access_token;
            sessionStorage.setItem("token", token);
            var that = this;
            setTimeout(function() {
              that.getdetail();
            }, 1000);
          });
          // this.$axios({
          //   url: "http://data.ikeshen.com/auth/oauth/token",
          //   methods: "POST",
          //   params: {
          //     grant_type: "password",
          //     username: this.ruleForm2.account,
          //     password: this.ruleForm2.password
          //   },
          //   headers: {
          //       Authorization: 'Basic ZmViczoxMjM0NTY='
          //     }
          // }).then(res => {
          //   let token = "bearer " + res.access_token;
          //   sessionStorage.setItem("token", token);
          //   this.getdetail();
          // });
        }
      });
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
        sessionStorage.setItem("contion", res.data.contion);
        sessionStorage.setItem("edition", res.data.editionId);
        sessionStorage.setItem("periodId", res.data.periodId);
        sessionStorage.setItem("subject", res.data.subjectId);
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
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       const loadingObj = this.$loading({
    //         lock: true,
    //         text: "提交中...",
    //         spinner: "el-icon-loading",
    //         background: "rgba(0, 0, 0, 0.7)",
    //         target: document.querySelector(".submit-test-dialog")
    //       });
    //       this.$post("/login", {
    //         mobile: this.ruleForm2.account,
    //         pwd: this.ruleForm2.password
    //       }).then(response => {
    //         // console.log(response)
    //         loadingObj.close();
    //         if (response.code == "5000") {
    //           //   console.log(response)
    //           const token = response.data.Authorization;
    //           const icon = response.data.user.icon;
    //           const name = response.data.user.username;
    //           const identity = response.data.user.identity;
    //           const id = response.data.user.id;
    //           //   console.log(response.data)
    //           const subjectId = response.data.subjectId;
    //           this.$store.state.subjectId = response.data.subjectId;
    //           sessionStorage.setItem("id", id);
    //           sessionStorage.setItem("token", token);
    //           sessionStorage.setItem("icon", icon);
    //           sessionStorage.setItem("subjectId", subjectId);
    //           sessionStorage.setItem("name", name);
    //           sessionStorage.setItem("identity", identity);
    //           sessionStorage.setItem("role", response.data.user.role);
    //           this.$message({
    //             showClose: true,
    //             message: "登录成功",
    //             type: "success"
    //           });
    //           if (response.data.user.role == 1) {
    //             this.$router.push({ path: "/studentCommon" });
    //           } else if (response.data.user.role == 2) {
    //             this.$router.push({ path: "/homeCommon" });
    //           }
    //           //1-学生 2-老师 999-管理员
    //         } else {
    //           this.$message({
    //             showClose: true,
    //             message: response.message,
    //             type: "error"
    //           });
    //         }
    //       });
    //     } else {
    //       // console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
.login_box {
  overflow-x: hidden;
  height: 100%;
  .login_foot {
    position: absolute;
    width: 100%;
    color: #ffffff;
    opacity: 0.8;
    bottom: 30px;
  }
  .login {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    background: #eff3f5;
    position: relative;
    .RegulationsBox {
      position: absolute;
      width: 893px;
      background-color: #fff;
      height: 580px;
      z-index: 100;
      padding: 35px 45px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 15px;
      .yeah {
        margin-top: 20px;
        padding-left: 68%;
      }
      .regulations {
        margin: 0 auto;
        width: 707px;
        height: 436px;
        border: 1px solid #ccc;
        .mainRegulations {
          padding: 20px 40px 0px 40px;
          height: 300px;
          width: 100%;
          overflow: auto;
          p {
            font-size: 14px;
          }
        }
      }
      .logintitle {
        border-bottom: 3px solid #098f81;
        font-size: 18px;
        padding: 5px 0px;
      }
      .text {
        margin: 5px 10px 20px 5px;
        font-size: 12px;
      }
    }
    .login_bg {
      width: 1920px;
      height: 100%;
      object-fit: cover;
    }
    .login_cons {
      position: absolute;
      background: #ffffff;
      border-radius: 4px;
      width: 360px;
      height: 300px;
      margin-top: 120px;
      top: 10%;
      right: 15%;
      margin-left: -245px;
      border-radius: 30px;
      box-shadow: #faddbf;
      padding: 30px 40px 130px 40px;
      .erweimaBox {
        padding: 20px;
        position: relative;
        background-color: #fff;
        width: 162px;
        height: 162px;
        top: -250px;
        left: 80px;
        text-align: center;
        p {
          padding: 3px;
          color: #1eabe8;
        }
      }
      .h2 {
        color: #eb9c59;
        position: relative;
        padding-left: 10px;

        &::before {
          content: "";
          // border-left: 3px solid #39a5ff;
          display: inline-block;
          height: 22px;
          top: 4px;
          position: absolute;
          left: 0;
        }
      }

      .con {
        margin: 40px 0 40px 0;
        .loginBtn {
          // background-color: #1eabe8;
          background: linear-gradient(to right, #35e6e8 0%, #1eabe8 100%);
          color: #ffffff;
          border-radius: 20px;
        }
        .link-login {
          margin-bottom: 22px;
          .forget {
          }
        }
        .reg {
          margin-bottom: 22px;
        }
        .choose {
          .album {
            cursor: pointer;
            .name {
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
  .articles {
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
    margin: 50px 0 0;
  }
}
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
</style>
<style>
.login_cons .el-form-item__label {
  text-align: left;
}

.login_cons .el-form-item:first-child {
  margin-bottom: 38px;
}

.login_cons .el-button {
  width: 100%;
  height: 50px;
}

.login_cons .zh_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/my_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.login_cons .pas_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/password_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_cons .yzm .el-input__inner {
  width: 100%;
  -webkit-appearance: none;
  background-color: #f3f3f3;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  text-align: left;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_cons .sj_icon .el-input__inner {
  -webkit-appearance: none;
  background-color: #f3f3f3;
  background-image: url("../../../static/images/mobile_icon.png");
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 8px 10px; /*图片显示的位置*/
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 8px 0 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.login_cons .yzm .el-input {
  width: 58%;
}
.login_cons .yzm .el-button {
  width: 36%;
  margin-left: 3%;
}
</style>
