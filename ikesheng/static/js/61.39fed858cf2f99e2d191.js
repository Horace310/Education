webpackJsonp([61],{AD2N:function(e,t){},"q/3a":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={data:function(){return{data:[{label:"一级 1",children:[{label:"二级 1-1",children:[{label:"三级 1-1-1"}]}]},{label:"一级 2",children:[{label:"二级 2-1",children:[{label:"三级 2-1-1"}]},{label:"二级 2-2",children:[{label:"三级 2-2-1"}]}]},{label:"一级 3",children:[{label:"二级 3-1",children:[{label:"三级 3-1-1"}]},{label:"二级 3-2",children:[{label:"三级 3-2-1"}]}]}],defaultProps:{id:"",children:"childList",label:"name",isLeaf:"leaf"},activeData:null,treeExpandedKeys:[],treeKey:"",nodeQuery:{name:""},isShowDlg:!1}},methods:{append:function(e){this.editType="ADD",this.isShowDlg=!0,this.activeData=e},remove:function(e,t){var a=this;removeNode(t.id).then(function(e){var t=e.data;t&&t.success&&(a.renderTree(),a.$message({showClose:!0,type:"success",message:"删除成功!"}))})},edit:function(e,t){this.nodeQuery.name=t.name,this.activeData=t,this.editType="EDIT",this.isShowDlg=!0},appendCallback:function(){var e=this,t=this.activeData,a=this.nodeQuery;a.parentId="0"===t.id?"":t.id,addNode(a).then(function(t){e.renderTree()})},editCallback:function(){var e=this,t=this.activeData,a=this.nodeQuery;t.name=a.name,editNode(t).then(function(t){var a=t.data;a&&a.success&&(e.$message({showClose:!0,type:"success",message:"修改成功！"}),e.renderTree())})},renderTree:function(){this.treeKey=+new Date},treeExpand:function(e,t,a){this.treeExpandedKeys.push(e.id)},treeCollapse:function(e){var t=treeExpandedKeys.indexOf(e.id);t>-1&&this.treeExpandedKeys.splice(t,1)},sure:function(){var e=this,t=this.editType;this.$refs.parentNodeQuery.validate(function(a){if(!a)return console.log("error submit!!"),!1;"ADD"===t?e.appendCallback():e.editCallback(),e.reset()})},reset:function(){this.activeData=null,this.isShowDlg=!1,this.nodeQuery={name:"",parentId:""},this.editType="ADD"}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("article",[a("el-tree",{key:e.treeKey,ref:"tree",attrs:{"node-key":"id",data:e.data,props:e.defaultProps,"default-expanded-keys":e.treeExpandedKeys,"expand-on-click-node":!1},on:{"node-expand":e.treeExpand,"node-collapse":e.treeCollapse},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.node,i=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(n.label))]),e._v(" "),a("span",{staticClass:"custom__tree__icons"},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"新增",placement:"top"}},[a("i",{staticClass:"tree-icon el-icon-plus",on:{click:function(){return e.append(i)}}})]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑",placement:"top"}},[a("i",{staticClass:"tree-icon el-icon-edit",on:{click:function(){return e.edit(n,i)}}})]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除",placement:"top"}},[a("i",{staticClass:"tree-icon el-icon-close",on:{click:function(){return e.remove(n,i)}}})])],1)])}}])}),e._v(" "),a("el-dialog",{staticClass:"dialog",attrs:{top:"5vh",title:"新增子节点",visible:e.isShowDlg,width:"500px"},on:{"update:visible":function(t){e.isShowDlg=t}}},[a("el-form",{ref:"nodeQuery",staticClass:"demo-form-inline",attrs:{inline:!0,"label-width":"120px",model:e.nodeQuery,size:"small"}},[a("el-form-item",{attrs:{label:"子节点名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入子节点名称"},model:{value:e.nodeQuery.name,callback:function(t){e.$set(e.nodeQuery,"name",t)},expression:"nodeQuery.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"btns__adjust"},[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.sure}},[e._v("确定")]),e._v(" "),a("el-button",{attrs:{size:"medium"},on:{click:e.reset}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(n,i,!1,function(e){a("AD2N")},"data-v-7461425e",null);t.default=s.exports}});
//# sourceMappingURL=61.39fed858cf2f99e2d191.js.map