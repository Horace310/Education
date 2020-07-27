// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
//import echarts from 'echarts'
//g6图库插件
import G6 from "@antv/g6";
//弹幕插件
// import { vueBaberrage } from "vue-baberrage";
// Vue.use(vueBaberrage);
//
import { post, get, posts, deletes } from "./api/api";
import Vuex from "vuex";
import { store } from "../src/vuex/store";
// import VideoPlayer from "vue-video-player";
import "lib-flexible";
import "babel-polyfill";
//富文本域
import VueQuillEditor from "vue-quill-editor";
// require styles 引入样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//地区选择器插件
import VDistpicker from "v-distpicker";
Vue.component("v-distpicker", VDistpicker);

//日历插件
// import FullCalendar from "vue-fullcalendar";
// Vue.use(FullCalendar);

// import moment from "moment"; //导入文件

// Vue.prototype.$moment = moment; //赋值使用
//
Vue.use(VueQuillEditor);
// require("video.js/dist/video-js.css");
// require("vue-video-player/src/custom-theme.css");
// Vue.use(VideoPlayer);

Vue.use(ElementUI);

import axios from "axios";
Vue.prototype.$axios = axios;

//打印
// import Print from "vue-print-nb";
// Vue.use(Print);
// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;

import Print from "./components/plugs/print.js";
Vue.use(Print);

// import VueCropper from "vue-cropper";

// Vue.use(VueCropper);

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$posts = posts;
Vue.prototype.$deletes = deletes;
//禁止输入特殊字符
Vue.prototype.validForbid = function(value, number = 255) {
  value = value
    .replace(
      /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
      ""
    )
    .replace(/\s/g, "");
  if (value.length >= number) {
    this.$message({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
  }
  return value;
};
// 添加全局事件监控方法
Vue.prototype.resetSetItem = function(key, newVal) {
  if (key === "watchStorage") {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent("StorageEvent");
    const storage = {
      setItem: function(k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          "setItem",
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );

        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    };
    return storage.setItem(key, newVal);
  }
};
//只能输入数字
Vue.prototype.validNumber = function(value, number = 255) {
  return value.replace(/[^0-9.]/g, "").replace(/\s/g, "");
};

Vue.prototype.uploadImage = function(event, type, callback) {
  const client = new OSS.Wrapper({
    region: "oss-cn-shenzhen",
    secure: true,
    //endpoint: "oss-cn-shenzhen.aliyuncs.com",
    accessKeyId: "TxkBX1VgU792UUVh",
    accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
    bucket: "mixin"
  });
  const objectKey = `uploads/file/${new Date().getTime()}.${type}`;
  const buffer = new OSS.Buffer(event.target.result);
  // 上传
  client
    .put(objectKey, buffer)
    .then(result => {
      callback(result);
    })
    .catch(function(err) {
      //  console.log(err);
    });
};

// 上传文件
Vue.prototype.uploading = function(event, callback) {
  // uploadimg(event) {
  // this.loading();
  // this.updatatype1 = true;
  // this.timenum1 = 0;
  // this.countDown1();
  var self = this;
  //console.log(event);
  if (event.target) {
    var file = event.target.files[0];
  } else {
    var file = event;
  }
  // var file = event.raw;
  // console.log(file);
  var ext = file.type.split("/")[1];
  // this.videoName = file.name.replace("."+ext,"");
  // var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
  // var storeAs = "upload-file1/abc";
  var file_name = `${new Date().getTime()}.${ext}`; //时间戳+文件后缀名
  this.client = new OSS.Wrapper({
    region: "oss-cn-shenzhen",
    secure: true,
    //endpoint: "oss-cn-shenzhen.aliyuncs.com",
    accessKeyId: "TxkBX1VgU792UUVh",
    accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
    bucket: "mixin"
  });
  let file_photourl = "";
  this.client
    .multipartUpload(file_name, file)
    .then(result => {
      //  console.log(result);
      // event.target.value = "";
      if (result.res.status == 200 && result.res.statusCode == 200) {
        self.$emit("input", result.res.requestUrls[0]);
        file_photourl = result.res.requestUrls[0].split("?")[0];
        //  console.log(file_photourl);
        // this.timenum1 = 100;
        // clearInterval(this.time1);
        self.$message.success("上传成功");
        // this.createClassVideo();
        // this.statetype = true;
        callback(result);
      } else {
        self.$message.error("上传失败，请重新上传文件");
      }
    })
    .catch(function(err) {
      //   console.log(err);
    });
  // },
};
router.beforeEach((to, from, next) => {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  if (getUrlParam("code") && to.path == "/") {
    next({
      path: "/callback",
      query: { code: getUrlParam("code") }
    });
  } else {
    next();
  }
});
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
