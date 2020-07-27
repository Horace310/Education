<template>
  <div class="uploadCourseware">
    <Grade @subjectId="subjectIds"></Grade>
    <div class="con">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <Subject @workId="workId" @textbook="textbook"></Subject>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="published bf bx">
            <div class="sec-con flexbox bx" v-if="show">
              <div class="sec">
                <span class="name ft16">选择班级：</span>
                <el-select
                  v-model="value4"
                  clearable
                  placeholder="请选择班级"
                  @change="queryCoursewareByStudent"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <el-button type="primary" v-if="showsd">上传课件</el-button>
            </div>
            <div class="courseCon bf" v-if="show">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="课件名称" align="center" prop="coursewareName" width="380"></el-table-column>
                <el-table-column label="人气" prop="view" align="center" width="200"></el-table-column>
                <el-table-column label="上传时间" prop="createTime" align="center" width="200"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      class="scan"
                      @click="handleEdit(scope.$index, scope.row)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <Gagination
                :total="total"
                :page-size="pageSize"
                @handleSizeChangeSub="handleSizeChangeFun"
                @handleCurrentChangeSub="handleCurrentChangeFun"
              ></Gagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Grade from "../grade/grade";
import Subject from "../grade/subject";
import Gagination from "../../components/pagination/pagination";
export default {
  name: "uploadCourseware",
  props: ["show", "showsd"],
  data() {
    return {
      // show:true,
      options: [],
      value4: "",
      tableData: [],
      bookId: "",
      subjectId: "",
      textbookId: "",
      chapterId: "",
      barId: "",
      contentId: "",
      pageSize: 1,
      pageNum: 1,
      total: 0
    };
  },
  created() {
    //查询加入班级下拉列表
    this.queryJoinClassSelect();
    //学生查询班级课件
    this.queryCoursewareByStudent();
  },
  methods: {
    //学段学科
    subjectIds(e) {
      this.subjectId = e.id;
      this.queryCoursewareByStudent();
    },
    workId(e) {
      // console.log(e);
      this.chapterId = e.chapterId;
      this.barId = e.barId;
      this.contentId = e.contentId;
      this.queryCoursewareByStudent();
    },
    textbook(e) {
      // console.log(e)
      // this.getCourseware()
      this.subjectId = e.subjectId;
      this.textbookId = e.id;
      this.queryCoursewareByStudent();
    },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryCoursewareByStudent(); //每页条数
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryCoursewareByStudent(); //当前
    },
    handleEdit(index, row) {
      this.$store.commit("getVideo", {
        VideoUrl: row.url,
        VideoName: row.coursewareName
      });
      this.$router.push({
        path: "/studentCommon/checkVideo",
        query: { path: this.$route.path, name: this.$route.name, key: 1 }
      });
    },
    //学生查询班级课件
    queryCoursewareByStudent() {
      let data = [];
      this.tableData = [];
      this.$post("/likework/queryCoursewareByStudent.do", {
        subjectId: this.subjectId, //学科id
        textbookId: this.textbookId, //教科书id
        chapterId: this.chapterId, //章id
        barId: this.barId, //	节id
        contentId: this.contentId, //内容id
        classId: this.value4, //班级id
        indexNo: this.pageNum,
        rows: 10
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          // this.count = response.data.pageCount;
          for (let i = 0; i < response.data.rows.length; i++) {
            let obj = {};
            obj.coursewareName = response.data.rows[i].coursewareName;
            obj.view = response.data.rows[i].view;
            obj.createTime = response.data.rows[i].createTime;
            obj.id = response.data.rows[i].id;
            obj.url = response.data.rows[i].url;
            obj.num = [i];
            // obj.address = res.data[i].address
            data[i] = obj;
            this.tableData = data;
          }
          this.total = response.data.pageCount;
        }
      });
    },
    //查询加入班级下拉列表
    queryJoinClassSelect() {
      this.$post("/likework/queryJoinClassSelect.do").then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.options = response.data;
        }
      });
    }
  },
  components: {
    Grade,
    Subject,
    Gagination
  }
};
</script>

<style scoped lang="less">
.uploadCourseware {
  .con {
    margin-top: 20px;
    .published {
      .sec-con {
        padding: 30px;
        .sec {
          margin-right: 20px;
        }
      }
      .courseCon {
        height: 711px;
      }
    }
  }
}
</style>
<style>
.uploadCourseware .published .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.uploadCourseware .published .el-table--border::after,
.uploadCourseware .published .el-table--group::after,
.uploadCourseware .published .el-table::before {
  content: "";
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}
.uploadCourseware .published .el-table .has-gutter th > .cell {
  font-size: 16px;
  color: #333333;
}
.uploadCourseware
  .published
  .el-table
  .el-table__body
  tr
  .el-table_1_column_1
  .cell {
  color: #39a5ff;
  text-decoration: underline;
}
.uploadCourseware
  .published
  .el-table
  .el-table__body
  tr
  .el-table_1_column_2
  .cell {
  color: #666666;
}
.uploadCourseware .published .courseCon .scan {
  background: #f25c29;
  border: none;
  color: #ffffff;
}
.uploadCourseware .published .courseCon .el-button--danger {
  background: #ff8a00;
  border-color: #ff8a00;
}
</style>
