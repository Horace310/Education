webpackJsonp([62],{dlos:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{Subjects:s("Iy4B").a},data:function(){return{currentPage4:4,pageCount:"",title:"",indexNO:"",questionList:[],types:[],typesindex:1,typeindex:999,loadings:null,SubJectId:this.$store.state.subjectId}},created:function(){this.title=this.$route.query.title.split(","),this.getSubject(this.$route.query.type),this.QuestionType()},methods:{QuestionType:function(t){var e=this,s={subjectId:this.SubJectId};this.$post("/likework/queryQuestionTypeSelect.do",s).then(function(t){"5000"==t.code&&(e.types=t.data,e.$route.query.type>0?e.types.forEach(function(t,s){t.id==e.$route.query.type&&(e.typeindex=s)}):e.typesindex=e.$route.query.type)})},subjects:function(t){this.questionList=t},allType:function(){this.typeindex=999,this.typesindex=0,this.getSubject(this.typesindex)},chooseType:function(t,e){this.typeindex=e,this.typesindex=1,this.getSubject(this.typeindex+1)},loading:function(t){this.loadings=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},getSubject:function(t){var e=this;this.loading();var s={subjectId:this.$route.query.subjectId,textbookId:this.$route.query.textbookId,chapterId:this.$route.query.chapterId,type:t,indexNo:this.indexNO,rows:10};this.$post("/likework/queryHistoryHomeworkQuestion.do",s).then(function(t){"5000"==t.code&&(e.loadings.close(),e.pageCount=t.data.count,e.indexNO=t.data.indexNO,e.questionList=t.data.rows)})},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){console.log("当前页: "+t),this.indexNO=t,0==this.typesindex?this.getSubject(this.typesindex):this.getSubject(this.typeindex)}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"historySubject"}},[s("div",{staticClass:"main mt72"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/homeCommon"}}},[t._v("首页")]),t._v(" "),s("el-breadcrumb-item",[t._v("历史题目")])],1),t._v(" "),s("div",{staticClass:"formwork"},[s("h3",{staticClass:"title"},[t._v("历史题目")]),t._v(" "),s("p",{staticClass:"work_name"},[s("span",[t._v(t._s(t.title[0])+"-")]),s("span",[t._v(t._s(t.title[1])+"-")]),s("span",[t._v(t._s(t.title[2])+"-")]),t._v(" "),s("span",[t._v(t._s(t.title[3]))]),s("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.title[4],expression:"title[4] != ''"}]},[t._v("-"+t._s(t.title[4]))]),s("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.title[5],expression:"title[5] != ''"}]},[t._v("-"+t._s(t.title[5]))]),s("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.title[6],expression:"title[6] != ''"}]},[t._v("-"+t._s(t.title[6]))])])]),t._v(" "),s("div",{staticClass:"subject"},[s("div",{staticClass:"import-out"},[s("div",{staticClass:"btns"},[s("el-button",{attrs:{type:0==t.typesindex?"primary":""},on:{click:t.allType}},[t._v("全部")]),t._v(" "),t._l(t.types,function(e,i){return s("el-button",{key:i,attrs:{type:t.typeindex==i?"primary":""},on:{click:function(s){return t.chooseType(e,i)}}},[t._v(t._s(e.typeName))])})],2),t._v(" "),s("Subjects",{attrs:{questionList:t.questionList},on:{subjects:t.subjects}}),t._v(" "),s("div",{staticClass:"page"},[s("el-pagination",{attrs:{"current-page":t.currentPage4,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.pageCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])],1)])},staticRenderFns:[]};var o=s("VU/8")(i,n,!1,function(t){s("vWVK")},null,null);e.default=o.exports},vWVK:function(t,e){}});
//# sourceMappingURL=62.fb603e8e5b3b7183ebd3.js.map