webpackJsonp([56],{HYwG:function(t,s){},nCrB:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n={name:"journey",data:function(){return{journeyList:[{text:"开始",days:1},{text:"坚持",days:7},{text:"习惯",days:30},{text:"阶梯",days:100}],pkList:[{num:"100%",text:"努力",days:"100天"},{num:"强化",text:"训练",days:"200天"},{num:"华丽",text:"变身",days:"1年"}]}},created:function(){this.findLoginDay(),this.$store.state.stuhonor="1",this.$store.state.stuadminnav="4"},methods:{findLoginDay:function(){var t=this;this.$post("/honor/findLoginDay.do").then(function(s){"5000"==s.code&&t.$nextTick(function(){var t=document.getElementsByClassName("wLi"),e=parseInt(s.data.count);if(e>=1&&e<7)for(var n=0;n<t.length;n++)t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content");else if(e>=7&&e<30)for(var i=0;i<t.length;i++)t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content"),t[1].classList.remove("grid-contents"),t[1].classList.add("grid-content");else if(e>=30&&e<100)for(var a=0;a<t.length;a++)t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content"),t[1].classList.remove("grid-contents"),t[1].classList.add("grid-content"),t[2].classList.remove("grid-contents"),t[2].classList.add("grid-content");else if(e>=100&&e<200)for(var c=0;c<t.length;c++)t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content"),t[1].classList.remove("grid-contents"),t[1].classList.add("grid-content"),t[2].classList.remove("grid-contents"),t[2].classList.add("grid-content"),t[3].classList.remove("grid-contents"),t[3].classList.add("grid-content"),t[6].classList.remove("grid-contents"),t[6].classList.add("grid-content");else if(e>=200&&e<365)for(var d=0;d<t.length;d++)t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content"),t[1].classList.remove("grid-contents"),t[1].classList.add("grid-content"),t[2].classList.remove("grid-contents"),t[2].classList.add("grid-content"),t[3].classList.remove("grid-contents"),t[3].classList.add("grid-content"),t[4].classList.remove("grid-contents"),t[4].classList.add("grid-content"),t[6].classList.remove("grid-contents"),t[6].classList.add("grid-content");else e>365&&(t[0].classList.remove("grid-contents"),t[0].classList.add("grid-content"),t[1].classList.remove("grid-contents"),t[1].classList.add("grid-content"),t[2].classList.remove("grid-contents"),t[2].classList.add("grid-content"),t[3].classList.remove("grid-contents"),t[3].classList.add("grid-content"),t[4].classList.remove("grid-contents"),t[4].classList.add("grid-content"),t[5].classList.remove("grid-contents"),t[5].classList.add("grid-content"),t[6].classList.remove("grid-contents"),t[6].classList.add("grid-content"))})})}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"journey bf mt72 bx"},[e("div",{staticClass:"journey-con bx"},[e("el-row",{attrs:{gutter:20}},t._l(t.journeyList,function(s,n){return e("el-col",{key:n,attrs:{span:6}},[e("div",{staticClass:"grid-contents wLi"},[e("div",{staticClass:"con"},[e("p",{staticClass:"num"},[t._v(t._s(n+1))]),t._v(" "),e("p",{staticClass:"text"},[t._v(t._s(s.text))]),t._v(" "),e("p",{staticClass:"days"},[t._v(t._s(s.days)+"天")])])])])}),1)],1),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"cons bx"},[e("el-row",{attrs:{gutter:20}},t._l(t.pkList,function(s,n){return e("el-col",{key:n,attrs:{span:6}},[e("div",{staticClass:"grid-contents wLi"},[e("div",{staticClass:"con"},[e("p",{staticClass:"num"},[t._v(t._s(s.num))]),t._v(" "),e("p",{staticClass:"text"},[t._v(t._s(s.text))]),t._v(" "),e("p",{staticClass:"days"},[t._v(t._s(s.days))])])])])}),1)],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"pk bx"},[s("p",{staticClass:"tit bx ft18 col39a"},[this._v("PK自己")])])}]};var a=e("VU/8")(n,i,!1,function(t){e("HYwG")},"data-v-b9bce12c",null);s.default=a.exports}});
//# sourceMappingURL=56.7d7c34c8ecd7656e5997.js.map