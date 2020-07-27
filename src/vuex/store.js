import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  homeworkTitle: "",
  studentWrongBooknav: "",
  isShow: 0,
  adminleftnavnum: "/", //教师端头部导航
  worknav: "/", //教师端作业中心左边导航
  resnav: "", //教师端资源工具头部导航
  suject: {}, //学科
  notnav: "", //教师端通知导航
  calssnav: "", //教师端班级管理导航
  cirnav: "", //教师端学科圈导航
  cgnav: "", //教师端研究成果
  myhownav: "", //学生我的作业左边导航
  stuadminnav: "/", //学生端头部导航
  stuworknav: "", //学生端作业中心导航
  stuhonor: "", //学生端荣耀体系
  versions: "",
  grade: "",
  username: "",
  usermobile: "",
  ID: "",
  chapterId: "",
  barId: "",
  contentId: "",
  VideoUrl: "",
  VideoName: "",
  VideoCreateTime: "",
  //学科id
  subjectId: 0,
  //微信名
  wxusername: "",
  //作业码
  homeworkCode: "",
  //传入思维导图id
  textId: 0,
  //班级id
  classId: 0,
  allproblemslist: JSON.parse(sessionStorage.getItem("list")),
  treeList: []
};
const mutations = {
  setTreeList(state, value) {
    state.treeList = value;
  },
  sethomeworkTitle(state, value) {
    state.homeworkTitle = value;
  },
  setAllproblemslist(state, list) {
    let danxuan = list.filter(
      i => i.typeName == "单选题" || i.type == "单选题"
    );
    let tiankong = list.filter(
      i => i.typeName == "填空题" || i.type == "填空题"
    );
    let jieda = list.filter(i => i.typeName == "解答题" || i.type == "解答题");
    let jisuan = list.filter(i => i.typeName == "计算题" || i.type == "计算题");
    let zhenmin = list.filter(
      i => i.typeName == "证明题" || i.type == "证明题"
    );
    let panduan = list.filter(
      i => i.typeName == "判断题" || i.type == "判断题"
    );
    let duoxuan = list.filter(
      i => i.typeName == "多选题" || i.type == "多选题"
    );
    let zuotu = list.filter(i => i.typeName == "作图题" || i.type == "作图题");
    list = danxuan.concat(
      tiankong,
      jieda,
      zhenmin,
      jisuan,
      panduan,
      duoxuan,
      zuotu
    );
    var newlist = JSON.stringify(list);
    sessionStorage.setItem("list", newlist);
    state.allproblemslist = list;
  },
  deleallproblemslist(state, index) {
    state.allproblemslist.splice(index, 1);
    var newlist = JSON.stringify(state.allproblemslist);
    sessionStorage.setItem("list", newlist);
    if (state.allproblemslist.length === 0) {
      sessionStorage.removeItem("workId");
    }
  },
  querySubject: (state, subjects) => {
    state.suject = subjects;
  },
  bookVersions: (state, value) => {
    state.grade = value;
  },
  userInfor(state, n) {
    //  console.log(state);
    //  console.log(n);
    state.username = n.username;
    state.usermobile = n.mobile;
  },

  getID(state, id) {
    state.ID = id;
  },
  getchapterId(state, id) {
    state.chapterId = id;
  },
  getbarId(state, id) {
    state.barId = id;
  },
  getcontentId(state, id) {
    state.contentId = id;
  },
  getVideo(state, id) {
    (state.VideoUrl = id.VideoUrl),
      (state.VideoName = id.VideoName),
      (state.VideoCreateTime = id.VideoCreateTime);
  }
  // getTextName(state,textname){
  //   return state.textName = sessionStorage.getItem('text')
  // }
};
const actions = {};

// getters 只会依赖 state 中的成员去更新
const getters = {
  subjectList: state => {
    return state.suject;
  },
  grades: state => {
    return state.grade;
  }
  //  getTextName:(state) =>{ return state.textName}
};

//注册Store
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});
export { store };
