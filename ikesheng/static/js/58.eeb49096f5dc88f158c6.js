webpackJsonp([58],{iEYG:function(e,t){},"oRD/":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("ycV+"),a=s("+ryu"),n={name:"",data:function(){return{createClass:[],hwlist:[],options:[],value:"0",pageSize:1,pageNum:1,total:0,classId:"",textbookId:"",showimg:!1}},components:{noData:o.a,Gagination:a.a},created:function(){this.queryClassHomework(),this.$store.state.stuworknav="4"},mounted:function(){},methods:{homeworkDetails:function(e,t){this.$router.push({path:"/studentCommon/activityCenter/lastHomeworkAssessment",query:{id:e,value:t}})},collectHomework:function(e){var t=this;this.$post("/likework/collectHomework.do",{homeworkId:e}).then(function(e){"5000"==e.code?(t.$message({showClose:!0,message:"收藏成功",type:"success"}),t.queryClassHomework()):t.$message({showClose:!0,message:e.message,type:"success"})})},cancleCollectHomework:function(e){var t=this;this.$post("/likework/cancleCollectHomework.do",{homeworkId:e}).then(function(e){"5000"==e.code?(t.$message({showClose:!0,message:"取消收藏成功",type:"success"}),t.queryClassHomework()):t.$message({showClose:!0,message:e.message,type:"success"})})},handleSizeChangeFun:function(e){this.pageSize=e,this.queryClassHomework()},handleCurrentChangeFun:function(e){this.pageNum=e,this.queryClassHomework()},queryClassHomework:function(){var e=this;this.hwlist=[],this.$post("/likework/queryHomeworkLookRecordList.do",{rows:10,indexNo:this.pageNum}).then(function(t){"5000"==t.code&&(""!=t.data.rows?(e.hwlist=t.data.rows,e.total=t.data.pageCount,e.showimg=!1):(e.showimg=!0,e.total=0))})}}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"browsingHistory"},[s("div",{staticClass:"cons bf"},[s("div",{staticClass:"sec-con"}),e._v(" "),e._l(e.hwlist,function(t){return s("div",{staticClass:"con flexbox cp",on:{click:function(s){return e.homeworkDetails(t.id,t.flag)}}},[s("p",{staticClass:"tit col39a"},[e._v(e._s(t.homeworkName))]),e._v(" "),0==t.isCollect?s("p",{staticClass:"flex",staticStyle:{margin:"4px 0 0  50px"}},[s("el-button",{staticStyle:{"background-color":"#f25c29",border:"none"},attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.collectHomework(t.id)}}},[e._v("收藏")])],1):e._e(),e._v(" "),1==t.isCollect?s("p",{staticClass:"flex",staticStyle:{margin:"4px 0 0  50px"}},[s("el-button",{staticStyle:{"background-color":"#f25c29",border:"none"},attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.cancleCollectHomework(t.id)}}},[e._v("取消收藏")])],1):e._e(),e._v(" "),s("p",{staticClass:"time"},[e._v(e._s(t.updateTime))])])}),e._v(" "),s("div",{staticClass:"paginationed"},[s("Gagination",{attrs:{total:e.total,"page-size":e.pageSize},on:{handleSizeChangeSub:e.handleSizeChangeFun,handleCurrentChangeSub:e.handleCurrentChangeFun}})],1),e._v(" "),e.showimg?s("noData"):e._e()],2)])},staticRenderFns:[]};var r=s("VU/8")(n,i,!1,function(e){s("iEYG")},"data-v-9272b2f2",null);t.default=r.exports}});
//# sourceMappingURL=58.eeb49096f5dc88f158c6.js.map