webpackJsonp([48],{GjCx:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"knowledge mt72"},[n("div",{staticClass:"con"},[n("div",{staticClass:"grid-content bf"},[n("el-menu",{staticClass:"el-menu-demo",attrs:{"active-text-color":"#f25c29","background-color":"#fff","default-active":t.$route.path,mode:"horizontal",router:""},on:{select:t.handleSelect}},[n("el-menu-item",{attrs:{index:"/studentCommon/mine/personalInfo"}},[t._v("个人信息")]),t._v(" "),n("el-menu-item",{attrs:{index:"/studentCommon/mine"}},[t._v("加入班级")]),t._v(" "),n("el-menu-item",{attrs:{index:"/studentCommon/mine/setting"}},[t._v("安全设置")])],1)],1),t._v(" "),n("router-view")],1)])},staticRenderFns:[]};var s=n("VU/8")({name:"knowledge",data:function(){return{activeIndex:"1",options:[],value4:"选项1"}},created:function(){this.$store.state.stuadminnav="5"},methods:{handleSelect:function(t,e){1==t?this.$router.push({path:"/studentCommon/mine"}):2==t?this.$router.push({path:"/studentCommon/mine/setting"}):3==t?this.$router.push({path:"/studentCommon/mine/personalInfo"}):4==t&&this.$router.push({path:"/studentCommon/mine/academicCircle"}),this.$store.state.myhownav=t},getNavType:function(){this.activeIndex=this.$store.state.myhownav}},watch:{"$store.state.myhownav":"getNavType"}},o,!1,function(t){n("NqsU"),n("Y/Bv")},"data-v-1204966c",null);e.default=s.exports},NqsU:function(t,e){},"Y/Bv":function(t,e){}});
//# sourceMappingURL=48.57e01f6b8556bf93c9dd.js.map