<template>
  <div class="workList mt72">
    <div class="header flexbox">
      <div class="nav flex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/studentCommon' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{classById.gradeName}}{{classById.subjectName}}{{classById.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="class-con">
        <span>班级名称：{{classById.name}}</span><span>班级属性：{{classById.gradeName}}{{classById.subjectName}}</span><span>邀请码：{{classById.code}}</span><span>创建时间：{{classById.createTime}}</span>
      </div>
    </div>
    <div class=" bf navs">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
        <el-menu-item index="1">作业列表</el-menu-item>
        <el-menu-item index="2">视频</el-menu-item>
        <el-menu-item index="3">课件</el-menu-item>
      </el-menu>
    </div>
    <div class="work-con">
<!--      <div class="uploadCourseware">-->
<!--        <Grade></Grade>-->
<!--        <div class="con">-->
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="6">-->
<!--              <div class="grid-content ">-->
<!--                <Subject @workId="workId" @textbook="textbook"></Subject>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="18">-->
<!--              <div class="published bf bx">-->
<!--&lt;!&ndash;                <router-view></router-view>&ndash;&gt;-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </div>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  // import Grade from '../../components/grade/grade';
  // import Subject from '../../components/grade/subject'

  export default {
    name: "workList",
    components: {
      // Grade,
      // Subject
    },
    data() {
      return {
        classById: [],
        activeIndex: '1',
        options: [],
        value4: '',
        tableData: [],
        bookId: '',
        subjectId: "",
        textbookId: "",
        chapterId: '',
        barId: "",
        contentId: '',
        pageSize: 1,
        pageNum: 1,
        total: 0
      }
    },
    created() {
      //根据id查询班级信息
      this.queryClassById()
    },
    methods: {
      workId(e) {
      //  console.log(e);
        this.chapterId = e.chapterId;
        this.barId = e.barId;
        this.contentId = e.contentId
      },
      textbook(e) {
        // console.log(e)
        // this.getCourseware()
        this.subjectId = e.subjectId;
        this.textbookId = e.id

      },
      //根据id查询班级信息
      queryClassById() {
        this.$post('/likework/queryClassById.do', {
          classId: this.$route.query.id
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.classById = response.data
            }
          })
      },
      //导航
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if (key == 1) {
          this.$router.push({
            path: '/studentCommon/workList',
            query: {
              subjectId: this.subjectId,
              textbookId: this.textbookId,
              chapterId: this.chapterId,
              barId: this.barId,
              contentId: this.contentId
            }
          })
        } else if (key == 2) {
          this.$router.push({
            path: '/studentCommon/workList/workVideo',
            query: {
              subjectId: this.subjectId,
              textbookId: this.textbookId,
              chapterId: this.chapterId,
              barId: this.barId,
              contentId: this.contentId
            }
          })
        } else if (key == 3) {
          this.$router.push({
            path: '/studentCommon/workList/workCourseware',
            query: {
              subjectId: this.subjectId,
              textbookId: this.textbookId,
              chapterId: this.chapterId,
              barId: this.barId,
              contentId: this.contentId
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .workList {
    .header {
      .nav {
        margin: 20px 0;
      }

      .class-con {
        span {
          display: inline-block;
          margin: 20px 0 20px 20px;
        }
      }
    }

    .navs {
      margin-bottom: 20px;
    }

    .uploadCourseware {
      .con {
        margin-top: 20px;
      }
    }
  }
</style>
