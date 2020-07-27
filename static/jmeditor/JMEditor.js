/**
 * JMEditor 0.9 beta
 * http://www.jmeditor.com/
 */
var JMEditor_BasePath = "";
var scriptEles=document.getElementsByTagName("script");
for(var i=0;i<scriptEles.length;i++){
	var m = scriptEles[i].src.match(/^(.*)JMEditor.js$/i);
	if(m){
		JMEditor_BasePath=m[1];
		break
	}
}


document.write(
"<link href=\"" + JMEditor_BasePath + "mathquill-0.9.1/mathquill.css\" rel=\"stylesheet\" type=\"text/css\" />" + 
"<script type=\"text/javascript\" src=\"" + JMEditor_BasePath + "ckeditor/ckeditor.js\"></script>" +
"<script type=\"text/javascript\" src=\"" + JMEditor_BasePath + "mathquill-0.9.1/mathquill.min.js\"></script>"
)
// import './mathquill-0.9.1/mathquill.css'
// var CKEDITOR = require("./ckeditor/ckeditor.js");
// console.log(ckeditor)
// console.log(JMEditor_BasePath)

var JMEditor = {};
$(document).ready(function(){
	JMEditor = {
		versionCode : 5,
		versionName : "V0.9.4",
		ckEditor : CKEDITOR,
		jmeBasePath : JMEditor_BasePath,
		defaultFontSize : "20px",
		isEmpty : function(elementId){
			console.log(elementId)

			return ($("#" + elementId).html()+"").replace(/(<[^>]*>|\s|&nbsp;)/ig,"").length < 1;
		},
		html : function(elementId){
			console.log(elementId)

			return $("#" + elementId).html();
		}
	};
});


