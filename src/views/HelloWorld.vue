<template>
  <article>
    <el-tree
      ref="tree"
      node-key="id"
      :key="treeKey"
      :data="data"
      :props="defaultProps"
      :default-expanded-keys="treeExpandedKeys"
      :expand-on-click-node="false"

      @node-expand="treeExpand"
      @node-collapse="treeCollapse">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="custom__tree__icons">
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <i class="tree-icon el-icon-plus" @click="() => append(data)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <i class="tree-icon el-icon-edit" @click="() => edit(node, data)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <i class="tree-icon el-icon-close" @click="() => remove(node, data)"></i>
                </el-tooltip>
            </span>
        </span>
    </el-tree>
    <el-dialog top="5vh" class="dialog" title="新增子节点" :visible.sync="isShowDlg" width="500px"
               >
      <el-form :inline="true" label-width="120px" ref="nodeQuery"
               :model="nodeQuery" size="small" class="demo-form-inline">
        <el-form-item label="子节点名称" prop="name">
          <el-input placeholder="请输入子节点名称" v-model="nodeQuery.name"></el-input>
        </el-form-item>
        <el-form-item class="btns__adjust">
          <el-button size="medium" type="primary" @click="sure">确定</el-button>
          <el-button size="medium" @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </article>
</template>


<script>
  export default {
    data() {
      return {
        // data: [], // tree数据源
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: { // 树相关属性设置
          id: "",
          children: "childList",
          label: "name",
          isLeaf: 'leaf'
        },
        activeData: null,   // 当前操作数据
        treeExpandedKeys: [],   // 记录打开节点的数组
        treeKey: '',    // 控制tree渲染的key
        nodeQuery: {
          name: ''    // 编辑树节点表单的model
        },
        isShowDlg: false    // 是否显示编辑节点弹框
      };
    },
    methods: {
      // 加载树
      // loadTreeNode(node, resolve) {
      //   const id = node ? node.data.id : '';
      //   getTreeData({id}).then(re => {
      //     const result = re.data;
      //     const treeData = result.data;
      //     if (result.success && node.level === 0) {
      //       // 如果是第一次加载数据，直接返回数据
      //       resolve(treeData);
      //     } else if(result.success) {
      //       // 如果非第一次加载数据，将返回数据拼接到操作节点的childList属性中
      //       node.data.childList = treeData;
      //       resolve(treeData);
      //     } else {
      //       resolve([]);
      //       this.$message({
      //         type: 'error',
      //         message: '加载数据出错！'
      //       });
      //     }
      //   });
      // },

      // 新增节点
      append(data) {
        this.editType = "ADD";
        this.isShowDlg = true;
        // 记录当前节点数据，供新增弹框关闭后回调用
        this.activeData = data;
      },

      // 移除节点
      remove(node, data) {
        removeNode(data.id).then(re => {
          const result = re.data;
          if (result && result.success) {
            // 重新渲染tree
            this.renderTree();
            this.$message({
                showClose: true,
              type: "success",
              message: "删除成功!"
            });
          }
        });
      },

      // 编辑节点
      edit(node, data) {
        this.nodeQuery.name = data.name;
        // 记录当前操作数据
        this.activeData = data;
        this.editType = "EDIT";
        this.isShowDlg = true;
      },

      // 新增节点回调函数
      appendCallback() {
        const data = this.activeData;
        const nodeQuery = this.nodeQuery;
        nodeQuery.parentId = data.id === '0' ? '' : data.id;
        // 将新节点名称和父节点id传递到后台
        addNode(nodeQuery).then(re => {
          this.renderTree();
        });
      },

      // 编辑节点回调函数
      editCallback() {
        const data = this.activeData,
          nodeQuery = this.nodeQuery;
        data.name = nodeQuery.name;
        // 将节点新名称和节点id传递到后台
        editNode(data).then(re => {
          const result = re.data;
          if (result && result.success) {
            this.$message({
                showClose: true,
              type: "success",
              message: "修改成功！"
            });
            this.renderTree();
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
        const index = treeExpandedKeys.indexOf(data.id);
        if (index > -1) {
          this.treeExpandedKeys.splice(index, 1);
        }
      },

      // tree noed 新增/编辑确定事件
      sure() {
        const editType = this.editType;
        this.$refs["parentNodeQuery"].validate(valid => {
        if (valid) {
          editType === "ADD" ? this.appendCallback() : this.editCallback();
          this.reset();
        } else {
          console.log("error submit!!");
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
        this.editType = "ADD";
      }
    }
  };
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
