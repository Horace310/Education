import Vue from "vue";
import Router from "vue-router";
import homeCommon from "@/views/homeCommon.vue";
import home from "@/views/homeCommon/home.vue";
import teacherRegister from "@/views/login/teacherRegister.vue";

Vue.use(Router);

export default new Router({
  // base: '/mx/',
  // mode: "history",   //去掉地址中的哈希#
  routes: [
    {
      path: "/ceshi",
      name: "测试",
      component: resolve => require(["@/views/ceshi.vue"], resolve)
    },
    {
      path: "/",
      name: "登录",
      component: resolve => require(["@/views/login/login.vue"], resolve)
    },
    {
      path: "/Dragging",
      name: "托拽",
      component: resolve => require(["@/components/HelloWorld.vue"], resolve)
    },
    {
      path: "/login",
      component: resolve => require(["@/views/login/login.vue"], resolve)
    },
    {
      path: "/callback",
      component: resolve => require(["@/views/callback.vue"], resolve)
    },
    {
      path: "/Register",
      name: "完善验证信息",
      component: resolve => require(["@/views/login/Register.vue"], resolve)
    },
    {
      path: "/teacherRegister",
      name: "老师注册",
      component: teacherRegister
    },
    {
      path: "/information",
      name: "完善信息",
      component: resolve => require(["@/views/login/information.vue"], resolve)
    },
    {
      path: "/fillCode",
      name: "填写邀请码",
      component: resolve => require(["@/views/login/fillCode.vue"], resolve)
    },
    {
      path: "/checkCode",
      name: "邀请码审核",
      component: resolve => require(["@/views/login/checkCode.vue"], resolve)
    },
    {
      path: "/registerSucceed",
      name: "注册成功",
      component: resolve =>
        require(["@/views/login/registerSucceed.vue"], resolve)
    },
    {
      path: "/homeCommon",
      name: "首页框架",
      component: homeCommon,
      children: [
        {
          path: "/",
          name: "首页",
          component: home
        },

        {
          path: "workCenter",
          name: "作业体系首页",
          component: resolve =>
            require(["@/views/homeCommon/workCenter.vue"], resolve),
          children: [
            {
              path: "/",
              name: "知识体系",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/workCenter.vue"
                ], resolve)
            },
            {
              path: "workable",
              name: "已发布作业",
              component: resolve =>
                require(["@/views/homeCommon/workCenter/workable.vue"], resolve)
            },
            {
              path: "unworkable",
              name: "未发布作业",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/unworkable.vue"
                ], resolve)
            },
            {
              path: "addSpare",
              name: "新增作业",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/addSpare/index.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "文件导入",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/addSpare.vue"
                    ], resolve)
                },
                {
                  path: "itembank",
                  name: "个人题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/itembank.vue"
                    ], resolve)
                },
                {
                  path: "library",
                  name: "平台题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/library.vue"
                    ], resolve)
                }
              ]
            },
            {
              path: "addHomeWork",
              name: "新增作业",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/addHomeWork/index.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "文件导入",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/addHomeWork.vue"
                    ], resolve)
                },
                {
                  path: "itembank",
                  name: "个人题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/itembank.vue"
                    ], resolve)
                },
                {
                  path: "library",
                  name: "平台题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/library.vue"
                    ], resolve)
                },
                {
                  path: "release",
                  name: "发布",
                  component: resolve =>
                    require([
                      "@/components/homeworkCenter/release.vue"
                    ], resolve)
                }
              ]
            },
            // {
            //   path: "library",
            //   name: "平台题库",
            //   component: (resolve) =>
            //     require(["@/views/homeCommon/workCenter/library.vue"], resolve),
            // },
            {
              path: "SharingTearch",
              name: "作业批改",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/SharingTearch.vue"
                ], resolve)
            },
            {
              path: "readHomework",
              name: "作业批改详情",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/readhomework.vue"
                ], resolve)
            },
            {
              path: "Analysis",
              name: "作业分析",
              component: resolve =>
                require(["@/views/homeCommon/workCenter/Analysis.vue"], resolve)
            },
            {
              path: "Marking",
              name: "有痕阅卷",
              component: resolve =>
                require(["@/views/homeCommon/workCenter/marking"], resolve)
            },
            {
              path: "ItemBank",
              name: "个人题库",
              component: resolve =>
                require(["@/views/homeCommon/workCenter/ItemBank"], resolve)
            },
            {
              path: "Manage",
              name: "题库管理",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/ItemBank/manage/index.vue"
                ], resolve)
            },
            {
              path: "AnswerCard",
              name: "答题卡制作",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/AnswerCard.vue"
                ], resolve)
            },
            {
              path: "homeworkPrint",
              name: "作业打印",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/homeworkPrint.vue"
                ], resolve)
            },
            {
              path: "homeworkDetail",
              name: "作业详情",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/homeworkDetail.vue"
                ], resolve)
            },
            {
              path: "settingAnswerCard",
              name: "制作答题卡",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/settingAnswerCard.vue"
                ], resolve)
            },
            {
              path: "Template",
              name: "答题卡制作",
              component: resolve =>
                require(["../views/homeCommon/resourceTools/sb1.vue"], resolve)
            }
          ]
        },
        {
          path: "setA3",
          name: "A3页面设置",
          component: resolve =>
            require(["@/views/homeCommon/workCenter/setA3"], resolve)
        },
        {
          path: "moreWork",
          name: "作业展示",
          component: resolve =>
            require(["@/views/homeCommon/workCenter/moreWork.vue"], resolve)
        },
        {
          path: "questions",
          name: "导入试题首页",
          component: resolve =>
            require(["@/views/homeCommon/questions.vue"], resolve),
          children: [
            {
              path: "/",
              name: "导入试题",
              component: resolve =>
                require(["@/views/homeCommon/questions/questions.vue"], resolve)
            },
            {
              path: "release",
              name: "导入试题",
              component: resolve =>
                require(["@/views/homeCommon/questions/release.vue"], resolve)
            }
          ]
        },

        {
          path: "resourceTools",
          name: "资源工具",
          component: resolve =>
            require(["@/views/homeCommon/resourceTools.vue"], resolve),
          children: [
            {
              path: "/",
              name: "上传课件",
              component: resolve =>
                require([
                  "@/views/homeCommon/resourceTools/uploadCourseware.vue"
                ], resolve)
            },
            {
              path: "uploadVideo",
              name: "上传视频",
              component: resolve =>
                require([
                  "@/views/homeCommon/resourceTools/uploadVideo.vue"
                ], resolve)
            },
            {
              path: "researchResult",
              name: "作业研究成果",
              component: resolve =>
                require([
                  "@/views/homeCommon/resourceTools/researchResult.vue"
                ], resolve)
            },
            {
              path: "academicCircle",
              name: "学科圈",
              component: resolve =>
                require([
                  "@/views/homeCommon/resourceTools/academicCircle.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "disciplineCircle",
          name: "学科圈",
          component: resolve =>
            require([
              "../views/homeCommon/disciplineCircle/disciplineCircle.vue"
            ], resolve)
        },

        {
          path: "Honorsystem",
          name: "教师荣誉体系",
          component: resolve =>
            require([
              "../views/homeCommon/Honorsystem/Honorsystem.vue"
            ], resolve)
        },

        {
          path: "ResourceDetails",
          name: "教师资源详情",
          component: resolve =>
            require([
              "../components/uploadCourseware/ResourceDetail.vue"
            ], resolve)
        },
        {
          path: "checkVideo",
          name: "查看课件",
          component: resolve =>
            require([
              "@/views/homeCommon/resourceTools/checkVideo.vue"
            ], resolve)
        },
        {
          path: "historySubject",
          name: "历史题目",
          component: resolve =>
            require(["@/views/homeCommon/historySubject.vue"], resolve)
        },

        {
          path: "classManagement",
          name: "班级管理",
          component: resolve =>
            require(["@/views/homeCommon/classManagement.vue"], resolve),
          children: [
            {
              path: "/",
              name: "班级管理首页",
              component: resolve =>
                require([
                  "@/views/homeCommon/classManagement/classManagement.vue"
                ], resolve)
            },
            {
              path: "createClass",
              name: "创建班级",
              component: resolve =>
                require([
                  "@/views/homeCommon/classManagement/createClass.vue"
                ], resolve)
            },
            {
              path: "invitationCode",
              name: "班级邀请码",
              component: resolve =>
                require([
                  "@/views/homeCommon/classManagement/invitationCode.vue"
                ], resolve)
            },
            {
              path: "studentList",
              name: "学员列表首页",
              component: resolve =>
                require([
                  "@/views/homeCommon/classManagement/studentList.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "学员列表",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/classManagement/studentList/studentLists.vue"
                    ], resolve)
                },

                {
                  path: "homeworkList",
                  name: "作业列表",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/classManagement/studentList/homeworkList.vue"
                    ], resolve)
                },
                {
                  path: "classVideo",
                  name: "班级视频",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/classManagement/studentList/classVideo.vue"
                    ], resolve)
                },
                {
                  path: "courseware",
                  name: "班级课件",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/classManagement/studentList/courseware.vue"
                    ], resolve)
                },
                {
                  path: "studentshowmework",
                  name: "学员作业展示",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/classManagement/studentList/studentshowmework.vue"
                    ], resolve)
                }
              ]
            }
          ]
        },
        {
          path: "TeachingResearch",
          name: "教学教研",
          component: resolve =>
            require([
              "@/views/homeCommon/Teachingresearch/teaching.vue"
            ], resolve),
          children: [
            {
              path: "/",
              name: "教学教研页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/research.vue"
                ], resolve)
            },
            {
              path: "createTeach",
              name: "新增教研组页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/createTeach.vue"
                ], resolve)
            },
            {
              path: "ResearchList",
              name: "教学教研页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/ResearchList.vue"
                ], resolve)
            },
            {
              path: "addSpare",
              name: "备用习题",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/addSpare/index.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "文件导入",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/addSpare.vue"
                    ], resolve)
                },
                {
                  path: "itembank",
                  name: "个人题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/itembank.vue"
                    ], resolve)
                },
                {
                  path: "library",
                  name: "平台题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addSpare/library.vue"
                    ], resolve)
                }
              ]
            },
            {
              path: "ResearchHomeWork",
              name: "新增教研作业页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/researchHomework.vue"
                ], resolve)
            },
            {
              path: "homeworkResearch",
              name: "作业题库页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/homeworkResearch.vue"
                ], resolve)
            },
            {
              path: "addHomeWork",
              name: "新增作业",
              component: resolve =>
                require([
                  "@/views/homeCommon/workCenter/addHomeWork/index.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "文件导入",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/addHomeWork.vue"
                    ], resolve)
                },
                {
                  path: "itembank",
                  name: "个人题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/itembank.vue"
                    ], resolve)
                },
                {
                  path: "library",
                  name: "平台题库",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/workCenter/addHomeWork/library.vue"
                    ], resolve)
                },
                {
                  path: "release",
                  name: "发布",
                  component: resolve =>
                    require([
                      "@/views/homeCommon/Teachingresearch/release.vue"
                    ], resolve)
                }
              ]
            },
            {
              path: "researchRelease",
              name: "教学教研作业发布页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/researchRelease.vue"
                ], resolve)
            },
            {
              path: "researchHomeworkDeatil",
              name: "教学教研作业详情页面",
              component: resolve =>
                require([
                  "@/views/homeCommon/Teachingresearch/homeworkDetail.vue"
                ], resolve)
            },
            {
              path: "researchResourceTool",
              name: "教学教研资源发布",
              component: resolve =>
                require(["@/views/homeCommon/resourceTool.vue"], resolve)
            }
          ]
        },

        {
          path: "notification",
          name: "通知",
          component: resolve =>
            require(["@/views/homeCommon/notification.vue"], resolve),
          children: [
            {
              path: "/",
              name: "我的消息",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/myMessage.vue"
                ], resolve)
            },
            {
              path: "notification",
              name: "安全设置",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/notification.vue"
                ], resolve)
            },
            {
              path: "personalInfo",
              name: "个人信息",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/personalInfo.vue"
                ], resolve)
            },
            {
              path: "teachingMaterial",
              name: "教材设置",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/teachingMaterial.vue"
                ], resolve)
            },
            {
              path: "socialContact",
              name: "教材设置",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/socialContact.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "historyWork",
          name: "历史作业",
          component: resolve =>
            require(["@/views/homeCommon/historyWork.vue"], resolve)
        }
      ]
    },
    {
      path: "/studentCommon",
      name: "学生首页框架",
      component: resolve => require(["@/views/studentCommon.vue"], resolve),
      children: [
        {
          path: "/",
          name: "学生首页",
          component: resolve =>
            require(["@/views/studentCommon/home.vue"], resolve)
        },
        {
          path: "checkVideo",
          name: "查看课件",
          component: resolve =>
            require(["@/views/studentCommon/checkVideo.vue"], resolve)
        },
        {
          path: "makeQuestion",
          name: "做作业",
          component: resolve =>
            require(["@/views/studentCommon/makeQuestion.vue"], resolve)
        },
        {
          path: "workList",
          name: "作业列表首页",
          component: resolve =>
            require(["@/views/studentCommon/workList.vue"], resolve),
          children: [
            {
              path: "/",
              name: "作业列表",
              component: resolve =>
                require([
                  "@/views/studentCommon/workList/workList.vue"
                ], resolve)
            },
            {
              path: "workVideo",
              name: "视频",
              component: resolve =>
                require([
                  "@/views/studentCommon/workList/workVideo.vue"
                ], resolve)
            },
            {
              path: "workCourseware",
              name: "课件",
              component: resolve =>
                require([
                  "@/views/studentCommon/workList/workCourseware.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "activityCenter",
          name: "作业中心",
          component: resolve =>
            require(["@/views/studentCommon/activityCenter.vue"], resolve),
          children: [
            {
              path: "/",
              name: "未完成作业",
              component: resolve =>
                require([
                  "@/views/studentCommon/activityCenter/noHomework.vue"
                ], resolve)
            },
            {
              path: "lastHomeworkAssessment",
              name: "上次作业已自评",
              component: resolve =>
                require([
                  "@/views/studentCommon/activityCenter/lastHomeworkAssessment.vue"
                ], resolve)
            },
            {
              path: "myHomework",
              name: "我的作业",
              component: resolve =>
                require([
                  "@/views/studentCommon/activityCenter/myHomework.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "班级分类",
                  component: resolve =>
                    require([
                      "@/views/studentCommon/activityCenter/myHomework/classify.vue"
                    ], resolve)
                },
                {
                  path: "classify",
                  name: "知识体系",
                  component: resolve =>
                    require([
                      "@/views/studentCommon/activityCenter/myHomework/knowledge.vue"
                    ], resolve)
                }
              ]
            },
            {
              path: "homeworkCollection",
              name: "作业收藏",
              component: resolve =>
                require([
                  "@/views/studentCommon/activityCenter/homeworkCollection.vue"
                ], resolve),
              children: [
                {
                  path: "/",
                  name: "学科分类",
                  component: resolve =>
                    require([
                      "@/views/studentCommon/activityCenter/homeworkCollection/classify.vue"
                    ], resolve)
                },
                {
                  path: "classify",
                  name: "知识体系收藏",
                  component: resolve =>
                    require([
                      "@/views/studentCommon/activityCenter/homeworkCollection/knowledge.vue"
                    ], resolve)
                }
              ]
            },
            {
              path: "browsingHistory",
              name: "浏览记录",
              component: resolve =>
                require([
                  "@/views/studentCommon/activityCenter/browsingHistory.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "wrongBook",
          name: "错题中心",
          component: resolve =>
            require(["@/views/studentCommon/wrongBook.vue"], resolve),
          children: [
            {
              path: "/",
              name: "错题管理",
              component: resolve =>
                require([
                  "@/views/studentCommon/wrongBook/wrongBookDetail.vue"
                ], resolve)
            },
            {
              path: "wrongbooklists",
              name: "章节错题重考",
              component: resolve =>
                require([
                  "@/views/studentCommon/wrongBook/wrongbooklist.vue"
                ], resolve)
            },
            {
              path: "wrongRedo",
              name: "重做页面",
              component: resolve =>
                require([
                  "@/views/studentCommon/wrongBook/wrongRedo.vue"
                ], resolve)
            },
            {
              path: "Print",
              name: "学生错题打印",
              component: resolve =>
                require([
                  "@/views/studentCommon/wrongBook/studentprint.vue"
                ], resolve)
            },
            {
              path: "AFprint",
              name: "制作答题卡",
              component: resolve =>
                require([
                  "@/views/studentCommon/wrongBook/A4print.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "wrongbooklist",
          name: "章错题本",
          component: resolve =>
            require(["../views/studentCommon/wrongbooklist.vue"], resolve)
        },
        {
          path: "wrongbooksame",
          name: "类似题",
          component: resolve =>
            require(["../views/studentCommon/wrongbooksame.vue"], resolve)
        },
        {
          path: "studyResource",
          name: "资源中心",
          component: resolve =>
            require(["@/views/studentCommon/studyResource.vue"], resolve)
        },
        {
          path: "ResourceDetail",
          name: "资源详情",
          component: resolve =>
            require([
              "@/components/uploadCourseware/ResourceDetail.vue"
            ], resolve)
        },
        {
          path: "honorSystem",
          name: "荣誉体系",
          component: resolve =>
            require(["@/views/studentCommon/honorSystem.vue"], resolve),
          children: [
            {
              path: "/",
              name: "征途",
              component: resolve =>
                require([
                  "@/views/studentCommon/honorSystem/journey.vue"
                ], resolve)
            },
            {
              path: "challenge",
              name: "挑战自己",
              component: resolve =>
                require([
                  "@/views/studentCommon/honorSystem/challenge.vue"
                ], resolve)
            },
            {
              path: "honour",
              name: "荣耀",
              component: resolve =>
                require([
                  "@/views/studentCommon/honorSystem/honour.vue"
                ], resolve)
            }
          ]
        },
        {
          path: "honourDetails",
          name: "单元星",
          component: resolve =>
            require(["@/views/studentCommon/honourDetails.vue"], resolve)
        },
        {
          path: "mine",
          name: "个人中心",
          component: resolve =>
            require(["@/views/studentCommon/mine.vue"], resolve),
          children: [
            {
              path: "/",
              name: "单元报告",
              component: resolve =>
                require(["@/views/studentCommon/mine/unitReport.vue"], resolve)
            },
            {
              path: "academicCircle",
              name: "学生圈",
              component: resolve =>
                require([
                  "@/views/studentCommon/mine/academicCircle.vue"
                ], resolve)
            },
            {
              path: "socialContact",
              name: "教材设置",
              component: resolve =>
                require([
                  "@/views/homeCommon/notification/socialContact.vue"
                ], resolve)
            },
            {
              path: "setting",
              name: "设置",
              component: resolve =>
                require(["@/views/studentCommon/mine/setting.vue"], resolve)
            },
            {
              path: "personalInfo",
              name: "个人信息",
              component: resolve =>
                require([
                  "@/views/studentCommon/mine/personalInfo.vue"
                ], resolve)
            },
            {
              path: "setSubject",
              name: "教材设置",
              component: resolve =>
                require(["@/views/studentCommon/mine/setSubject.vue"], resolve)
            }
          ]
        }
      ]
    },
    {
      path: "/HelloWorld",
      name: "",
      component: resolve => require(["@/views/HelloWorld.vue"], resolve)
    }
  ]
});
