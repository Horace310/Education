<template>
  <div class="knowledges">
    <Grade @subjectId="subjectIds" ></Grade>
    <div class="con">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ">
            <Subject @workId="workId" @textbook="textbook"></Subject>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="published bf bx posr">
            <div class="sec-con   flexbox ">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select
                  v-model="value4"
                  clearable
                  placeholder="请选择班级"
                  @change="queryClassHomework"
                >
                  <el-option
                    v-for="item in createClass"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="sec">
                <span class="name ft16">时间：</span>
                <el-select
                  v-model="date1"
                  clearable
                  placeholder="请选择时间"
                  @change="queryClassHomework"
                >
                  <el-option
                    v-for="item in timeSelect"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <!--        <el-date-picker type="date" placeholder="选择时间" v-model="date1"  value-format="yyyy-MM-dd"    @change="queryClassHomework"></el-date-picker>-->
              </div>
            </div>
            <div class="con flexbox" v-for="item in hwlist" :key="item.id">
              <p class="tit flex col39a">{{ item.homeworkName }}</p>
              <p class="time">{{ item.createTime }}</p>
            </div>
            <div class="paginationed">
              <Gagination
                :total="total"
                :page-size="pageSize"
                @handleSizeChangeSub="handleSizeChangeFun"
                @handleCurrentChangeSub="handleCurrentChangeFun"
              ></Gagination>
            </div>

            <noData v-if="showimg"></noData>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Grade from '../grade/grade';
  import Subject from '../grade/subject'
  import Utils from "../../../static/js/util";
  import Gagination from '../../components/pagination/pagination';
  import noData from '../../components/noData/noData'

export default {
  name: "",
  data() {
    return {
      value4: "",
      createClass: [],
      date1: "",
      hwlist: [],
      pageSize: 1,
      pageNum: 1,
      total: 0,
      timeSelect: [],
      showimg: false,
      chapterId:'',   //章id
      barId:'',  //节id
      contentId:'',   //内容id
      chapterName:'',  //章名称
      barName:'',  //节名称
      contentName:'',   //内容名称
      subjectId:'',   //学科id
      textbookId:'',  //教科书id
      book:'',  //教科书名称
      gradename:'',  //年级名称
    };
  },
  components: {
    Grade,
    Subject,
    Utils,
    Gagination,
    noData
  },
  created() {
    //选择班级
    this.queryCreateClass();
  },mounted() {
    this.queryClassHomework()
  },
  methods: {
    //学段学科
      subjectIds(e){
        this.subjectId = e.id;
        this.queryClassHomework();
      },
      workId(e) {
       // console.log(e)
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId;
        this.chapterName = e.name1;
        this.barName = e.name2;
        this.contentName = e.name3;
        this.queryClassHomework();
      },
      textbook(e) {
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id
        this.book = e.book;
        this.gradename = e.gradename;
        this.queryClassHomework();
      },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryClassHomework(); //每页条数
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryClassHomework(); //当前
    },
    ////查询班级已发布/未发布作业时间下拉列表
    queryHomeworkTimeSelect() {
      this.$post("/likework/queryHomeworkTimeSelect.do", {
        classId: this.value4, //班级id
        flag: 1 //发布状态 0-已发布 1-未发布
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.timeSelect = response.data;
          //查询作业
          this.queryClassHomework();
        }
      });
    },
    //选择班级
    queryCreateClass() {
      this.$post("/likework/queryCreateClass.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.createClass = response.data;
          this.value4 = response.data[0].id;
          this.showimg = false;
          //查询作业
          this.queryClassHomework();
          //查询班级已发布/未发布作业时间下拉列表
          this.queryHomeworkTimeSelect();
        } else {
          this.showimg = true;
        }
      });
    },
    //查询作业
    queryClassHomework() {
      this.hwlist = [];
      this.$post("/likework/queryClassHomework.do", {
        classId: this.value4, //班级id
        // subjectId: "", //学科id
        // textbookId: "", //教科书id
        // chapterId: "", //章id
        // barId: "", //节id
        // contentId: "", //内容id
        subjectId:this.subjectId,
        textbookId:this.textbookId,
        chapterId:this.chapterId,
        barId:this.barId,
        contentId:this.contentId,
        time: this.date1,
        rows: 10,
        indexNo: this.pageNum,
        flag: 1 //发布状态 0-已发布 1-未发布
      }).then(response => {
        // console.log(response.code)
        if (response.code == "5000") {
          if (response.data.rows != "") {
            this.hwlist = response.data.rows;
            console.log(this.hwlist)
            this.total = response.data.pageCount;
            this.showimg = false;
          } else {
            this.showimg = true;
          }
        } else {
          this.showimg = true;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.knowledges{
  .con{
    margin-top:20px;
    .published {
      height: 711px;
      padding: 20px 30px 0 30px;
      .sec-con {
        margin-bottom: 30px;
        .sec {
          margin-right: 80px;
        }
      }
      .con {
        margin-top: 20px;
      }
    }
  }
}
</style>
