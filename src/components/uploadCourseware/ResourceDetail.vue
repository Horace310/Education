<template>
  <div class="classList mt72 bf bx">
    <div class="myBigBox">
      <div class="myBoxleft">
        <goBack
          v-if="$route.query.rid"
          :direction="true"
          link="/homeCommon/TeachingResearch/homeworkResearch"
          :queryData="{id:$route.query.rid}"
        ></goBack>
        <goBack v-if="!$route.query.rid" :direction="true" link="/homeCommon/resourceTools"></goBack>
        <div class="littleBox">
          <img src="../../../static/images/学习指导.png" alt />
          <span>资源名称:{{ability}}</span>
        </div>
        <div class="littleBox">
          <img src="../../../static/images/学习目标.png" alt />
          <span>资源类型:{{target}}</span>
        </div>
        <div class="littleBox">
          <img src="../../../static/images/重点难点.png" alt />
          <span>功 能:{{difficulty}}</span>
        </div>
        <div class="littleBox" v-if="key!=3">
          <img src="../../../static/images/方法指导.png" alt />
          <span>班 级:{{direction}}</span>
        </div>
        <!-- <div class="resourceTest">
          <span class="test">资源评价</span>
          <el-button size="small" class="myBtn">优</el-button>
          <el-button size="small" class="myBtn">良</el-button>
          <el-button size="small" class="myBtn">中</el-button>
          <el-button size="small" class="myBtn">差</el-button>
        </div>-->
      </div>
      <div class="myBoxRight">
        <div class="myResource">
          <!-- <img v-if="imgsrc!=''" :src="imgsrc" alt /> -->
          <div class="resourceList">
            <p>资源列表：</p>
            <a
              style="display:block"
              :href="item.url"
              target="blank"
              v-for="(item,index) in imgsrc"
              :key="index"
            >{{item.name}}</a>
          </div>
          <!-- <video
            :src="video"
            v-if="video!=''"
            id="videoPlay"
            preload="auto"
            autoplay="muted"
            style="width:100%;height:100%"
          ></video>-->
        </div>
        <div class="myResourceText">
          <p>{{content}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="tearchOpinion" v-if="flag">
      <p>
        <span>反馈意见</span>
      </p>
      <div class="OpinionList">
        <div class="OpinionImg">
          <img src="../../../static/images/反馈意见.png" alt />
        </div>
        <div class="OponionBox">
          <vue-baberrage
            :isShow="barrageIsShow"
            :barrageList="barrageList"
            :maxWordCount="maxWordCount"
            :throttleGap="throttleGap"
            :loop="barrageLoop"
            :boxHeight="boxHeight"
            :messageHeight="messageHeight"
          ></vue-baberrage>
        </div>
        <div class="OponionText">
          <quill-editor style="height:200px;width:100%" @change="onEditorChange($event)"></quill-editor>
          <el-button class="sure" @click="edit()">提交反馈</el-button>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import { MESSAGE_TYPE } from "vue-baberrage";
import goBack from "@/components/common/goBack";

export default {
  name: "ResourceDetail",
  components: {
    goBack
  },
  data() {
    return {
      flag: true,
      id: this.$route.query.id, //
      key: this.$route.query.key,
      msg: "这次资源很好",
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 50,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: [],
      target: "",
      difficulty: "",
      direction: "",
      content: "",
      imgsrc: [],
      video: "",
      ability: "",
      Editortext: "", //富文本存储
      EditortextList: []
    };
  },
  created() {},
  mounted() {
    var that = this;
    if (this.key == 1) {
      that.flag = true;
      that.getDetails();
      that.feedback();
    }
    if (this.key == 2) {
      that.flag = false;
      that.getDetails();
    }
    if (this.key == 3) {
      that.flag = true;
      that.getDetail();
      that.feedback();
    }
  },
  methods: {
    //查询
    // /user/feedback/select
    feedback() {
      this.$post("/user/feedback/select", { rid: this.id }).then(res => {
        if (res.code == 5000) {
          this.EditortextList = res.data;
          this.addToList();
        }
      });
    },
    // 提交
    edit() {
      console.log(this.Editortext);
      let data = {
        img: sessionStorage.getItem("avatar"),
        userId: sessionStorage.getItem("userId"),
        rid: this.id,
        content: this.Editortext.text
      };
      console.log(data);
      this.$post("/user/feedback/add", data).then(res => {
        if (res.code == 5000) {
          this.$message({
            message: "成功",
            method: "success"
          });
        }
      });
    },
    onEditorChange(eve) {
      this.Editortext = eve;
    },
    playVideo() {
      var vdo = document.getElementById("videoPlay");
      vdo.play();
    },
    //获取资源详情
    getDetails() {
      this.$post("/user/teachersResources/select", { id: this.id }).then(
        res => {
          // console.log(res);
          if (res.code == "5000") {
            //   console.log(res.data[0]);

            this.ability = res.data[0].name;
            this.target = res.data[0].type;
            this.difficulty = res.data[0].function;
            this.direction = res.data[0].className;
            this.content = res.data[0].content;
            this.imgsrc = JSON.parse(res.data[0].img);
            console.log(this.imgsrc);
            //   console.log(this.imgsrc);
            this.video = res.data[0].video;
          }
        }
      );
      this.feedback();
    },
    //获取教学教研资源详情
    getDetail() {
      this.$post("/user/resources/select", { id: this.id }).then(res => {
        // console.log(res);
        if (res.code == "5000") {
          this.ability = res.data[0].name;
          this.target = res.data[0].type;
          this.difficulty = res.data[0].function;
          this.direction = res.data[0].className;
          this.content = res.data[0].content;
          this.imgsrc = JSON.parse(res.data[0].img);
          this.video = res.data[0].video;
        }
      });
    },
    addToList() {
      // let list = [
      //   {
      //     id: 1,
      //     avatar:
      //       "https://img.zcool.cn/community/018f645df820b9a801219cce64289e.jpg@1280w_1l_2o_100sh.jpg",
      //     msg: this.msg,
      //     time: 10,
      //     barrageStyle: "yellow"
      //   }
      // ];

      var time = 4;
      this.EditortextList.forEach(v => {
        this.barrageList.push({
          id: ++v.id,
          avatar: v.img,
          msg: v.content,
          time: ++time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle
        });
      });
      this.$delete(this.barrageList);
      this.$set(this.barrageList);
    },
    toResource() {
      this.$router.push("/studentCommon/studyResource");
    }
  }
};
</script>
<style lang="less" scoped>
.mt72 {
  margin-top: 10px;
  .myBigBox {
    display: flex;

    .myBoxleft {
      display: inline-block;
      border-top: 10px solid #2bb7b3;
      width: 280px;
      padding: 0px 10px;
      .littleBox {
        height: 93px;
        width: 100%;
        border-bottom: 1px solid #eee;
        line-height: 93px;
        img {
          margin-left: 20px;
        }
      }
      .resourceTest {
        height: 170px;
        text-align: center;
        //  line-height: 170px;
        padding-top: 50px;
        .test {
          color: #0f8b84;
          font-size: 18px;
          display: block;
        }
        .myBtn {
          margin-top: 15px;
          border: 0;
          background-color: #ff8a00;
          color: #fff;
        }
      }
    }
    .myBoxRight {
      border-left: 10px solid #eee;
      display: inline-block;
      flex: 1;
      padding: 20px;
      .myResource {
        width: 100%;
        height: 375px;
        margin-bottom: 35px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .tearchOpinion {
    p {
      display: block;
      text-align: center;
      height: 44px;
      background-color: #2bb7b3;
      border-bottom: 10px solid #eee;
      span {
        line-height: 44px;
        font-size: 20px;
        color: #fff;
      }
    }
    .OpinionList {
      .OpinionImg {
        img {
          margin-top: 20px;
        }
      }
    }
    .OponionBox {
      height: 100px;
    }
    .OponionText {
      padding: 30px 20px;
      position: relative;
      border-top: 1px solid #eee;
      height: 320px;
      .sure {
        position: absolute;
        right: 50%;
        bottom: 30px;
        background-color: #ff8b00;
        color: #fff;
        border: 0;
      }
    }
  }
}
</style>
