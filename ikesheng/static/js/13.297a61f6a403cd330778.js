webpackJsonp([13],{"+Pg0":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("bdPs"),i={components:{knowledge:e("B08d").a,subject:a.a},data:function(){return{analysis:!0,Tagging:!1,redo:!1,input:"",wrongBtn:[{name:"错题转正",index:0},{name:"相似重做",index:1},{name:"错因标注",index:2},{name:"错题解析",index:3}],checkList:["选中且禁用","复选框 A"],options:[{value:"选项1",label:"语文"},{value:"选项2",label:"数学"}],data:[{label:"章",children:[{label:"节",children:[{label:"单元"}]}]}],defaultProps:{children:"children",label:"label"},List:[{index:1,labels:"完整图谱"},{index:2,labels:"单元图谱"},{index:3,labels:"作业图谱"}],list1:[{index:1,label:"未完成"},{index:2,label:"已完成"}],num:0,num2:0,selectedOptions:[]}},methods:{Towrongbooklist:function(){this.$router.push("/studentCommon/wrongbooklist")},Tochart:function(t,s){this.num=t},ToWork:function(t,s){this.num2=t,1==t&&(this.redo=!this.redo,this.Tagging=!1,this.analysis=!1),2==t&&(this.Tagging=!this.Tagging,this.analysis=!1,this.redo=!1),3==t&&(this.analysis=!this.analysis,this.redo=!1,this.Tagging=!1),0==t&&(this.analysis=!1,this.redo=!1,this.Tagging=!1,this.$message({type:"success",message:"错题转正成功"}))},handleChange:function(t){}}},n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home"},[t._m(0),t._v(" "),a("div",{staticClass:"classList mt72 bf bx"},[a("div",{staticClass:"bigBox"},[a("div",{staticClass:"boxLeft"},[a("div",{staticClass:"xueke"},[a("el-cascader",{attrs:{options:t.options},on:{change:t.handleChange},model:{value:t.selectedOptions,callback:function(s){t.selectedOptions=s},expression:"selectedOptions"}})],1),t._v(" "),a("div",{staticClass:"three"},[a("subject")],1),t._v(" "),a("div",{staticClass:"threeBtn"},[a("el-button",{staticStyle:{"background-color":"#2ab8b3",color:"#fff",border:"0"},on:{click:t.Towrongbooklist}},[t._v("章错题重考")]),t._v(" "),a("el-button",{staticStyle:{"background-color":"#ff8b00",color:"#fff",border:"0"}},[t._v("错题转正   ")])],1)]),t._v(" "),a("div",{staticClass:"boxRight"},[t._m(1),t._v(" "),a("div",{staticClass:"myChoores"},[a("span",[t._v("错题原因:")]),t._v(" "),a("el-checkbox-group",{staticClass:"choores",model:{value:t.checkList,callback:function(s){t.checkList=s},expression:"checkList"}},[a("el-checkbox",{attrs:{label:"知识记忆"}}),t._v(" "),a("el-checkbox",{attrs:{label:"粗心大意"}}),t._v(" "),a("el-checkbox",{attrs:{label:"运算能力"}}),t._v(" "),a("el-checkbox",{attrs:{label:"逻辑混乱"}}),t._v(" "),a("el-checkbox",{attrs:{label:"阅读能力"}})],1)],1),t._v(" "),a("div",{staticClass:"myWrong"},[a("div",{staticClass:"myWrongList"},[a("p",{staticClass:"number"},[t._v("编号:22545")]),t._v(" "),a("img",{attrs:{src:e("ZUb5"),alt:""}}),t._v(" "),a("div",{staticClass:"worngTime"},[a("span",[t._v("来源:陈老师")]),t._v(" "),a("span",{staticStyle:{"margin-left":"30px"}},[t._v("答题时间:2019-12-22  11:11:11")]),t._v(" "),t._l(t.wrongBtn,function(s,e){return a("div",{key:e,staticClass:"myWrongBtn"},[a("el-button",{class:{active:t.num2==e},on:{click:function(a){return t.ToWork(e,s)}}},[t._v(t._s(s.name))])],1)})],2),t._v(" "),t.analysis?a("div",{staticClass:"myAnswer"},[t._m(2),t._v(" "),t._m(3)]):t._e(),t._v(" "),t.Tagging?a("div",{staticClass:"myAnswers"},[a("div",{staticClass:"answerBox"},[t._m(4),t._v(" "),a("el-checkbox-group",{staticClass:"choores",model:{value:t.checkList,callback:function(s){t.checkList=s},expression:"checkList"}},[a("el-checkbox",{attrs:{label:"知识记忆"}}),t._v(" "),a("el-checkbox",{attrs:{label:"粗心大意"}}),t._v(" "),a("el-checkbox",{attrs:{label:"运算能力"}}),t._v(" "),a("el-checkbox",{attrs:{label:"逻辑混乱"}}),t._v(" "),a("el-checkbox",{attrs:{label:"阅读能力"}})],1)],1),t._v(" "),a("el-button",{staticClass:"myWrongbtn"},[t._v("提交")])],1):t._e(),t._v(" "),t.redo?a("div",{staticClass:"myAnswers"},[t._m(5),t._v(" "),a("el-button",{staticClass:"myWrongbtn"},[t._v("提交")])],1):t._e()])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bgcBox"},[s("img",{attrs:{src:e("kX+U"),alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tupu"},[s("img",{attrs:{src:e("qaQf"),alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"answerBox"},[s("p",[s("i",{staticClass:"el-icon-caret-right"}),this._v(" "),s("span",[this._v("我的答案：A")])]),this._v(" "),s("p",[s("i",{staticClass:"el-icon-caret-right"}),this._v(" "),s("span",{staticStyle:{color:"#2ab8b3"}},[this._v("正确答案：B")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"jiexi"},[s("i",{staticClass:"el-icon-caret-right"}),this._v(" "),s("span",[this._v("解析：")]),this._v(" "),s("img",{attrs:{src:e("wuSB"),alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticStyle:{"margin-bottom":"10px"}},[s("i",{staticClass:"el-icon-caret-right"}),this._v(" "),s("span",[this._v("我的标注：")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"answerBox"},[s("p",{staticStyle:{"margin-bottom":"10px"}},[s("i",{staticClass:"el-icon-caret-right"}),this._v(" "),s("span",[this._v("类似题目：")])]),this._v(" "),s("img",{attrs:{src:e("j9sJ"),alt:""}})])}]};var c=e("VU/8")(i,n,!1,function(t){e("OS7p")},"data-v-9d3c13e6",null);s.default=c.exports},OS7p:function(t,s){},ZUb5:function(t,s,e){t.exports=e.p+"static/img/题目.fc02681.jpg"},j9sJ:function(t,s,e){t.exports=e.p+"static/img/错题重做.a2351ff.png"},wuSB:function(t,s,e){t.exports=e.p+"static/img/解析.ba5e855.png"}});
//# sourceMappingURL=13.297a61f6a403cd330778.js.map