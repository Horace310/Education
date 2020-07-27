<template >
  <div class="mt72">
    <div class="title">{{homeName}}</div>
    <p style="magin-left:20px;color:red; text-align: center;margin-bottom:10px">
      <span>作业编码：{{code}}</span>
    </p>
    <div class="workBox" v-for="(item,index) in homeworkList" :key="index">
      <div class="workTitle">
        <span class="daoru">导入</span>
        <span class="code">此题编码:{{item.code}}</span>
        <span class="number">
          分值:
          <span style="color:red">{{item.score }}</span>
        </span>
      </div>
      <div class="workConten">
        <span style="float:left;">题目内容:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="conten">
          <span v-if="item.content.length<1">{{item.content}}</span>
          <span v-if="item.content.length>1">
            <span v-html="item.content"></span>
          </span>
          <span></span>
        </span>
      </div>
      <div
        v-for="(ite,index) in LikeList[index]"
        :key="index"
        class="workConten"
        v-if="show3[index]"
      >
        <p>相似题型{{index+1}}：</p>
        <div v-html="ite.content" class="conten"></div>
      </div>
      <el-button
        @click="selectLikeQuestion(item.id,index),show3[index]=!show3[index]"
        size="mini"
        :type="show3[index]==false?'':'success'"
      >相似题型</el-button>
      <el-button
        @click="show_=show2[index]=!show2[index],sameId=item.id,sameCode=item.code"
        size="mini"
        :type="show2[index]==false?'':'success'"
      >添加相似题型</el-button>
      <!-- <el-button @click="show_=show2[index]=false,sameId=item.id,sameCode=item.code" size="mini" :type="show2[index]==false?'':'success'">取消添加</el-button> -->
    </div>
    <div>
      <h1 align="center" v-if="sameCode==''?false:true">此题编码:{{sameCode}}</h1>
      <knowledeg v-show="show_" :sameId="sameId" />
    </div>
  </div>
</template>
<script>
import knowledeg from "../../../components/homeworkCenter/knowledge4";
import Utils from "../../../../static/js/util";
export default {
  components: {
    knowledeg
  },
  data() {
    return {
      show_: false,
      show3: [],
      sameCode: "",
      sameId: "",
      typeid: "",
      zuoyeid: "",
      show2: [],
      homeworkList: [],
      homeName: "",
      code: "",
      LikeList: []
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    selectLikeQuestion(id, index) {
      this.$get("/user/research/question/findSameById", { id: id }).then(
        res => {
          if (res.code == 5000) {
            if (res.data.length != 0) {
              this.LikeList[index] = res.data;
              // this.$set(this.LikeList)
              this.LikeList.forEach(item => {
                this.show3.push(false);
              });
            }
          }
        }
      );
    },
    getDetail() {
      this.$get("/user/research/homework/findById", {
        id: this.$route.query.id
      }).then(res => {
        this.homeworkList = res.data.list;
        this.homeworkList.forEach(item, index => {
          this.LikeList.push({ index: [] });
          this.code = res.data.code;
          this.homeName = res.data.name;
          this.show2.push(false);
        });

        //console.log(res.data);
      });
    }
  }
};
</script>
<style lang="less">
.mt72 {
  height: 100%;
  background-color: #fff;
}
.title {
  height: 78px;
  text-align: center;
  font-size: 22px;
  color: #f25c29;
  line-height: 78px;
}
.workBox {
  width: 858px;
  min-height: 250px;
  border: 1px solid #ccc;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  .workConten {
    padding-top: 15px;
    height: 180px;
    width: 100%;
    overflow: auto;
    border-bottom: 1px solid #eee;
    .conten {
      display: inline-block;
      width: 88%;
      height: 90%;
      border: 1px solid #eee;
      padding: 20px;
    }
  }
  .workTitle {
    height: 60px;
    border-bottom: 1px dashed #eee;
    padding: 20px;
    box-sizing: border-box;
    .daoru {
      font-size: 14px;
      color: #fff;
      background-color: #2bb7b3;
      padding: 2px 4px;
    }
    .code {
      color: rgb(251, 139, 34);
      font-size: 14px;
    }
    .number {
      margin-left: 75%;
    }
  }
}
</style>