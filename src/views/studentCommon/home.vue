<template>
  <div class="home">
    <div class="bgcBox">
      <img src="../../../static/images/3e296bfaebb06a42aac886b1adef5cd.jpg" alt />
    </div>
    <div class="classList mt72 bf bx">
      <div class="bigBox">
        <div class="boxLeft">
          <div class="xueke">
            <el-select v-model="SubjectName" placeholder="请选择学科" @change="getSubjectId">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="three">
            <subject />
          </div>
        </div>
        <div class="boxRight">
          <div class="conter">
            <span>图谱选择:</span>
            <div class="btnS" v-for="(item, index) in List" :key="index">
              <el-button
                size="mini"
                style="margin-right: 5px;"
                :class="{ active: num == index }"
                @click="Tochart(index, item)"
              >{{ item.labels }}</el-button>
            </div>
          </div>
          <div class="tupu">
            <knowledge />
            <!-- <img src="../../../static/images/tupu.png" alt /> -->
          </div>
          <!--          <div class="myBtn">-->
          <!--            <div class="conter">-->
          <!--              <span>图谱选择:</span>-->
          <!--              <div class="btnS" v-for="(item,index) in List" :key="index">-->
          <!--                <el-button-->
          <!--                  style="margin-right:5px"-->
          <!--                  :class="{active:num==index}"-->
          <!--                  @click="Tochart(index,item)"-->
          <!--                >{{item.labels}}</el-button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="conter">-->
          <!--              <span>作业完成:</span>-->
          <!--              <div class="btnS" v-for="(item,index) in list1" :key="index">-->
          <!--                <el-button-->
          <!--                  style="margin-right:5px"-->
          <!--                  :class="{active2:num2==index}"-->
          <!--                  @click="ToWork(index,item)"-->
          <!--                >{{item.label}}</el-button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="conter">-->
          <!--              <span>作业质量:</span>-->
          <!--              <el-button>优</el-button>-->
          <!--            </div>-->
          <!--            <div class="conter">-->
          <!--              <span>来源:</span>-->
          <!--              <el-button>学科圈</el-button>-->
          <!--              <el-button>自行创建</el-button>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import subject from "../../components/grade/subject";
import knowledge from "../../views/homeCommon/resourceTools/sb";

import Utils from "../../../static/js/util";
export default {
  components: {
    knowledge,
    subject
  },
  data() {
    return {
      SubjectName: "", //学科名
      SubjectId: 0, //学科id
      teacherList: [],
      data: [
        {
          label: "章",
          children: [
            {
              label: "节",
              children: [
                {
                  label: "单元"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      List: [
        {
          index: 1,
          labels: "单元图谱"
        },
        {
          index: 2,
          labels: "章作业图谱"
        }
      ],
      list1: [
        {
          index: 1,
          label: "未完成"
        },
        {
          index: 2,
          label: "已完成"
        }
      ],
      num: 0,
      num2: 0,
      selectedOptions: []
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    //获取学科id
    getSubjectId(value) {
      this.SubjectId = value;
      Utils.$emit("subjectId", this.SubjectId);
    },
    //获取学科
    getSubject(value) {
      let data = { periodId: sessionStorage.getItem("type") };
      this.$get("/user/homework/textbook/subjectSelect", data).then(res => {
        this.teacherList = res.data;
        this.SubjectName = res.data[1].id;
        Utils.$emit("subjectIds", this.SubjectName);
      });
    },

    Tochart(index, item) {
      this.$children[4].changeTree(index);
      this.num = index;
    },
    ToWork(index, item) {
      this.num2 = index;
    },
    handleChange(value) {
      // console.log(value);
    }
  }
};
</script>
<style lang="less" scoped>
.classList {
  border: 1px solid #eee;
  // padding: 15px 0px;
  .active {
    background: #2ab8b3;
    color: #fff;
  }
  .active2 {
    background: #2ab8b3;
    color: #fff;
  }
  .bigBox {
    width: 100%;
    /*height: 650px;*/
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    /*overflow: hidden;*/
    .boxLeft {
      width: 17%;
      // border-right: 1px solid #eee;
      padding: 10px;
      box-sizing: border-box;
      border-right: 10px solid #eee;
      .xueke {
        width: 100%;
        padding: 3px;
      }
      .three {
        padding: 10px 0px;
        border-top: 1px solid #eee;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
      }
    }
    .conter {
      margin-left: 40px;
      float: left;
      padding: 10px 0px;
      width: 40%;
      // height: 23%;
      //    height: 300px;
      .btnS {
        display: inline-block;
      }
      span {
        font-size: 16px;
        display: inline-block;
        padding: 5px;
      }
    }
    .boxRight {
      flex: 1;
      padding: 15px;
      .tupu {
        width: 996px;
        /*height: 400px;*/
        border: 1px solid #ccc;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .myBtn {
        margin: 0 auto;
        width: 95%;
        // .conter {
        //   padding: 10px 0px;
        //   width: 100%;
        //   height: 23%;
        //   .btnS {
        //     display: inline-block;
        //   }
        //   span {
        //     font-size: 16px;
        //     display: inline-block;
        //     padding: 5px;
        //   }
        // }
      }
    }
  }
}
</style>
