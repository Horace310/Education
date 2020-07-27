<template>
  <div class="versionsd">
    <div class="sec flexbox">
      <el-select
        v-model="value"
        placeholder="请选择"
        class="flex"
        id="flex"
        @change="chooseValue"
        @click.native="getsubjectId"
      >
        <el-option
          v-for="(item, index) in bookList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="values" placeholder="请选择" @change="queryTestBookDetail" class="Choores">
        <el-option
          class="Choores"
          v-for="(item, k) in bookLists"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="con">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :key="treeKey"
        :default-expanded-keys="treeExpandedKeys"
        @node-click="handleNodeClick"
        @node-expand="treeExpand"
        @node-collapse="treeCollapse"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
          @mousemove="Mousemove"
          @mouseleave="Mouseleave"
        >
          <span class="titles">{{ data.name }}</span>

          <!-- <span class="custom__tree__icons">
            <el-tooltip content="跳转" v-show="data.flag">
              <i
                class="el-icon-position towork"
                @click="getTowork(data)"
                style="color: rgb(242, 92, 41);"
              ></i>
            </el-tooltip>
            <el-tooltip content="添加" v-if="data.canAddNode">
              <i class="addClass" @click="addButtoms(data)" style="color:#139583">+</i>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              v-if="data.deletebuttom==false?false:true"
            >
              <i
                class="tree-icon el-icon-delete"
                @click="editButtoms(data)"
                style="font-style:normal;color:red"
              ></i>
            </el-tooltip>
          </span>-->
        </span>
      </el-tree>

      <el-dialog
        :before-close="closeDialog"
        top="5vh"
        class="dialog"
        :title="isShowName == false ? '编辑' : '添加'"
        :visible.sync="isShowDlg"
        width="500px"
      >
        <el-form
          :inline="true"
          label-width="80px"
          ref="nodeQuery"
          :rules="rules"
          :model="nodeQuery"
          size="small"
          class="demo-form-inline"
        >
          <el-form-item :label="isShowName == false ? '名称' : '单元名称'" prop="name">
            <el-input placeholder="请输入名称" v-model="nodeQuery.name"></el-input>
          </el-form-item>
          <el-form-item class="btns__adjust">
            <el-button
              size="medium"
              type="primary"
              @click="
                isShowName == true
                  ? addMySetingUnit('nodeQuery')
                  : sure('nodeQuery')
              "
            >确定</el-button>
            <el-button size="medium" @click="reset('nodeQuery'), (isShowName = false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Utils from "../../../static/js/util";
export default {
  inject: ["reload"],
  name: "subject",
  props: {
    toSonData: {
      type: Array
    }
  },
  data() {
    return {
      //
      classId: 0, //班级ID
      joinClass: "", //加入的班级
      myClass: "班级",
      isWorkcenter: false,
      role: true,
      homeperiod: sessionStorage.getItem("homeperiod"),
      subject2: null,
      itemShow: false,
      bookList: [],
      bookLists: [],
      values: "",
      value: "",
      data: [],
      nodeQuery: {
        name: "" // 编辑树节点表单的model
      },
      rules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      treeExpandedKeys: [], // 记录打开节点的数组
      isShowDlg: false, // 是否显示编辑节点弹框
      defaultProps: {
        children: "children",
        label: "name"
      },
      treeKey: "", // 控制tree渲染的key
      activeData: null, // 当前操作数据
      changeId: "",
      flag: "", //1-章 2-节 3-内容,
      subjectName: "",
      typename: "",
      subjectIds: "",
      projectshow: false,
      isShowName: false,
      addbarid: "",
      isshowbutten: false,
      stundentSubjectId: 0,
      stundentSubjectIds: 0,
      banben: 0, //版本
      chapterId: 0 //章ID
      // intoShow: false
    };
  },

  created() {
    this.subjectIds = this.$store.state.subjectId;
    this.queryTestBookList();
    //只在教师端首页展示跳转
    // if (this.$router.path === "/homeCommon") {
    //   this.intoShow = true;
    // }
    if (this.$route.path === "/homeCommon/workCenter") {
      this.isWorkcenter = true;
    }
    //判断是教师就默认打开
    if (sessionStorage.getItem("type") == 1) {
      setTimeout(() => {
        var index = 0;
        while (sessionStorage.getItem("editionId") == index) {
          index++;
        }
        this.value = this.bookList[index].name;
        this.bookLists = this.bookList[index].list;
        this.values = this.bookLists[index].name;
        this.banben = this.bookLists[index].id;
        this.queryTestBookDetail(this.bookLists[index].id);
      }, 1000);
    }
  },
  mounted() {
    var that = this;
    Utils.$on("demo", function(msg) {
      that.subjectName = msg.subjectName;
      that.typename = msg.typename;
      this.subjectIds = msg.id;
      that.bookList = [];
      that.value = "";
      that.values = "";

      //點擊後返回其他頁面繼續保存知识体系
      // var id = JSON.parse(sessionStorage.getItem("liid"));
    });
    this.getsubjectId();
    if (this.$route.fullPath === "/studentCommon") {
      this.role = false;
    }
  },

  methods: {
    //跳转到作业
    getTowork(data) {
      console.log(data);
      this.$emit("childFn", data);
    },
    //删除节点
    editButtoms(data) {
      this.$confirm("确定删除该单元, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = { id: data.id };
          this.$axios
            .delete("/user/homework/textbook/deleteNode", { params: params })
            .then(res => {
              if (res.code == "5000") {
                this.reload();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // --- 增加节点
    addButtoms(data) {
      //this.isShowDlg = true;
      // this.isShowName = true;
      this.$prompt("请输入需要添加单元的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let data = {
            textbookId: this.banben,
            pid: this.chapterId,
            name: value
          };
          this.$post("/user/homework/textbook/addNode", data).then(res => {
            if (res.code == "5000") {
              this.$message({ type: "success", message: "添加成功" });
              this.reload();
            } else {
              this.$message({ type: "error", message: res.message });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //获取班级id
    getClassId(e) {
      //  console.log(e);
      Utils.$emit("classId", e);
    },

    //学生端首页加载数据
    studentbookList(e) {
      this.queryTestBookList(e);
    },

    //鼠标移入事件
    Mousemove() {
      this.itemShow = true;
    },
    Mouseleave() {
      this.itemShow = false;
    },
    //鼠标移出事件
    // 编辑节点
    edit(node, data) {
      this.nodeQuery.name = data.name;
      // 记录当前操作数据
      this.flag = node.level;
      this.activeData = data;
      this.editType = "EDIT";
      this.isShowDlg = true;
    },
    //phone
    addproject(node, data) {
      this.addbarid = data.id;
      this.isShowDlg = true;
      this.isShowName = true;
    },
    // tree noed 新增/编辑确定事件
    sure(formName) {
      const editType = this.editType;
      this.$refs[formName].validate(valid => {
        if (valid) {
          editType === "ADD" ? this.appendCallback() : this.editCallback();
          this.reset();
        } else {
          //  console.log("error submit!!");
          return false;
        }
      });
    },
    // tree node 弹框取消事件
    reset() {
      this.activeData = null;
      this.isShowDlg = false;
      this.nodeQuery = {
        name: "",
        parentId: ""
      };
      this.flag = "";
      this.editType = "ADD";
      this.isShowDlg = false;
      this.$refs["nodeQuery"].resetFields();
    },

    closeDialog() {
      this.isShowName = false;
      this.isShowDlg = false;
      this.$refs["nodeQuery"].resetFields();
    },
    // 编辑节点回调函数
    editCallback() {
      const data = this.activeData,
        nodeQuery = this.nodeQuery;
      //   console.log(this.$store.state.textId);

      // 将节点新名称和节点id传递到后台
      this.$post("/likework/updateBookDetail.do", {
        gradeId: this.$store.state.textId,
        changeId: data.id,
        changeName: nodeQuery.name,
        flag: this.flag
        //  gradeId:sessionStorage.getItem('textid')
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.$refs["nodeQuery"].resetFields();
          this.queryTestBookDetail();
          this.renderTree();
        } else {
          this.$message({
            showClose: true,
            message: response.message,
            type: "error"
          });
        }
      });
    },
    // 刷新key值，重新渲染tree
    renderTree() {
      this.treeKey = +new Date();
    },
    // 当节点打开时，记录下打开节点的id
    treeExpand(data, node, self) {
      this.treeExpandedKeys.push(data.id);
    },

    // 当节点关闭时，移除节点的id
    treeCollapse(data) {
      const index = this.treeExpandedKeys.indexOf(data.id);
      if (index > -1) {
        this.treeExpandedKeys.splice(index, 1);
      }
    },
    //获取科目id
    getsubjectId() {
      var that = this;
      Utils.$on("subjectId", function(msg) {
        that.stundentSubjectId = msg;
      });
      Utils.$on("subjectIds", function(msg) {
        that.stundentSubjectIds = msg;
      });
    },
    //获取年级体系
    queryTestBookList(id) {
      if (sessionStorage.getItem("type") == 1) {
        var that = this;
        this.$axios({
          url: "http://data.ikeshen.com/user/homework/textbook/typeSelect",
          methods: "GET",
          params: { subjectId: sessionStorage.getItem("subjectId") }
        }).then(response => {
          if (response.data.code == "5000") {
            that.bookList = response.data.data;
            let values = "";
            let value = "";
          }
        });
      } else if (sessionStorage.getItem("type") == 2) {
        var that = this;
        this.$axios({
          url: "http://data.ikeshen.com/user/homework/textbook/typeSelect",
          methods: "GET",
          params: { subjectId: id }
        }).then(response => {
          if (response.data.code == "5000") {
            that.bookList = response.data.data;
            let values = "";
            let value = "";
          }
        });
      }
    },
    // 全部

    chooseValue(e) {
      this.bookLists = this.bookList[e - 1].list;
      this.queryTestBookList(e);
      this.banben = e;
      //   this.queryTestBookDetail(e);
    },
    queryTestBookDetail(e) {
      Utils.$emit("pid", e);
      var that = this;
      that.data = [];
      Utils.$emit("bookId", e);
      this.$axios({
        url: "http://data.ikeshen.com/user/homework/textbook/detail",
        methods: "GET",
        params: { textbookId: e }
      }).then(response => {
        if (response.data.code == "5000") {
          Utils.$emit("msg", that.values);
          this.data = response.data.data;
          if (this.data.length != 0) {
            this.data.forEach(item => {
              item.deletebuttom = false;
              item.flag = true;
              item.falg_ = 1;
              if (item.children.length != 0) {
                item.children.forEach(ite => {
                  ite.flag = true;
                  ite.falg_ = 2;
                  ite.deletebuttom = false;
                  if (ite.length != 0) {
                    ite.children.forEach((ie, ix) => {
                      ie.flag = true;
                      ie.falg_ = 3;
                      ie.deletebuttoms = false;
                    });
                  }
                });
              }
            });
          }
        }
      });
    },

    handleNodeClick(data) {
      this.getTowork(data);
      //   console.log(data, 11111111);
      var allData = data;
      Utils.$emit("getData", allData);
      this.chapterId = data.id;
      let chapterId = "",
        barId = "",
        contentId = "",
        name1 = "",
        name2 = "",
        name3 = "";

      //子组件传值
      this.$emit("indexId", {
        index: String(data.index) != "" ? data.index : data.list[0].index,
        values: this.values,
        topic: "",
        chapterId: chapterId
      });
    }
  },
  computed: {
    listenshowpage1() {
      return this.stundentSubjectId;
    },
    changeName() {
      return this.stundentSubjectIds;
    }
  },
  watch: {
    listenshowpage1: function(newd, old) {
      //  console.log(newD, old);

      this.queryTestBookList(newd);
    },

    changeName: function(newd, old) {
      this.queryTestBookList(newd);
    }
  }
};
</script>

<style scoped lang="less">
.versionsd {
  /*width: 286px;*/
  background: #ffffff;
  .sec {
    //border-bottom: 1px dashed #159484;
    //  background-color: "#2ab8b3";
  }
  .con {
    height: 500px;
    box-sizing: border-box;
    margin: 20px 8px 20px 8px;
    position: relative;
    // overflow-y: scroll;
    overflow-y: auto;
    .towork {
      position: absolute;
      right: 9%;
      color: #bbb;
      margin-top: 3px;
    }
    .titles {
      /* margin-right: 110px; */
    }
    .item {
      position: absolute;
      right: 0;
      padding-top: 3px;
      .tree-icon {
        font-style: normal;
        //  margin-right: 10px;
        margin-top: 3px;
      }
    }

    .addClass {
      //font-weight: bold;
      position: absolute;
      right: 19%;

      color: #bbb;
      font-style: normal;
    }
  }
}
</style>
<style>
.versionsd .sec .el-input {
  width: 100px;
}
.versionsd .sec .el-input__inner {
  border: none;
}
.versionsd .el-select .el-input__inner:focus {
  color: #159484;
}
.versionsd .el-select .el-input .el-select__caret {
  color: #159484;
}
.versionsd .sec .el-input__inner {
  color: #159484;
}
.superclass:hover {
  background: #f5f7fa;
}
</style>
