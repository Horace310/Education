<template>
  <div class="Dragging">
    <div class="content">
      <div v-for="(item,index) in 12" :key="index" style="cursor: move;" @mousedown="move" :style="div[index]">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      div:[],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    let div=[];
    for(var i=1;i<=12;i++){
      let width = 31,height=200,w = Math.ceil(i%3)==0?2:Math.ceil(i%3)-1,h = Math.ceil(i/3)-1;
      div.push({left:width*w+'%',top:height*h+'px'})
    }
    this.div = div
  },
  methods:{
    move(e){
      let oDiv = e.target;      //获取点击的目标元素
      let gDiv = e.path[1];     //获取点击元素的父级元素
      
      /*获取点击时的偏移位置，在这里要注意一下
      **由于我们用的是网格布局,每在一个格子中相对位置都是相对格子来算的，不是相对于父级盒子左上角
      **也就是说当你把方块移动到九个格子中任意一个时，方块的位置都是top：0和left：0
      */
      
      //所以这里我们直接取鼠标点击的位置减去点击盒子的偏移位置，也就是0
      let disX = e.clientX - 0;     
      let disY = e.clientY - 0;
      document.onmousemove = (e)=>{
      
        //当拖动时，算出的值就刚好是方块的top和left值
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        switch (oDiv.style.gridArea){
          case "head1 / head1 / head1 / head1":this.rangeOfHead1(left,top,oDiv);break;    //实现head1的移动范围
          case "head2 / head2 / head2 / head2":this.rangeOfHead2(left,top,oDiv);break;    //实现head2的移动范围
          case "head3 / head3 / head3 / head3":this.rangeOfHead3(left,top,oDiv);break;    //实现head3的移动范围
          case "main1 / main1 / main1 / main1":this.rangeOfMain1(left,top,oDiv);break;    //实现main1的移动范围
        }
      };
      document.onmouseup = (e)=>{
        //当鼠标抬起时，我们要做的事
        //通过点击位置和父级元素的偏移判断方块在哪个区域
        if(e.clientY-gDiv.offsetTop<100&&e.clientX-gDiv.offsetLeft<100){
        
          //将方块移动到该区域中
          this.changeBlock("head1",oDiv); 
          
        }else if(e.clientY-gDiv.offsetTop>100&&e.clientX-gDiv.offsetLeft<100&&e.clientY-gDiv.offsetTop<200){
          this.changeBlock("main1",oDiv);
        }else if(e.clientY-gDiv.offsetTop>200&&e.clientX-gDiv.offsetLeft<100){
          this.changeBlock("footer1",oDiv);
        }else if(e.clientY-gDiv.offsetTop<100&&e.clientX-gDiv.offsetLeft>100&&e.clientX-gDiv.offsetLeft<200){
          this.changeBlock("head2",oDiv);
        }else if(e.clientY-gDiv.offsetTop<100&&e.clientX-gDiv.offsetLeft>200){
          this.changeBlock("head3",oDiv);
        }else if(e.clientY-gDiv.offsetTop>100&&e.clientX-gDiv.offsetLeft>200&&e.clientY-gDiv.offsetTop<200){
          this.changeBlock("main3",oDiv);
        }else if(e.clientY-gDiv.offsetTop>200&&e.clientX-gDiv.offsetLeft>200){
          this.changeBlock("footer3",oDiv);
        }else if(e.clientY-gDiv.offsetTop>200&&e.clientX-gDiv.offsetLeft>100&&e.clientX-gDiv.offsetLeft<200){
          this.changeBlock("footer2",oDiv);
        }else {
          this.changeBlock("main2",oDiv);
        }
        document.onmousemove=null;      //需要把事件监听取消
        document.onmousedown = null;    //需要把事件监听取消
        
        //当然，不能忘记我们的动画hhh
        oDiv.className = "block animated wobble";
        let removeClass = setTimeout(()=>{
          oDiv.className = "block animated";
        },500);
 
      };
    },
    rangeOfHead1(x,y,oDiv){     //判断head1格子中的可以移动范围
      if(x>=200){
        x=200;
      }else if(x<=0){
        x=0;
      }
      if(y>=200){
        y=200;
      }else if(y<=0){
        y=0;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';
      this.positionX = x;
      this.positionY = y;
 
    },
    rangeOfHead2(x,y,oDiv){     //判断head2格子中的可以移动范围
      if(x>=100){
        x=100;
      }else if(x<=-100){
        x=-100;
      }
      if(y>=200){
        y=200;
      }else if(y<=0){
        y=0;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';
 
      this.positionX = x;
      this.positionY = y;
 
    },
    changeBlock(blockName,oDiv){    //将方块移入到对应的区域中
      this.positionX = 0;
      this.positionY = 0;
      oDiv.style.gridArea=blockName;
    }

  },
  directive:{
    boxf:{
      inserted:()=>{
        let flag=false
        a.onmousedown=function (e) {
            //鼠标按下时鼠标的位置
            var left = e.pageX
            var top = e.pageY
            console.log(top);
            //初始的xy坐标
            var initX = a.offsetLeft
            var initY = a.offsetTop
            flag=true
            a.onmousemove=function (e) {
                if(flag==true){
                    var mouseX=e.pageX
                    var mouseY=e.pageY
                    this.style.left=parseInt(mouseX)-parseInt(left)+parseInt(initX)+'px'
                    this.style.top=parseInt(mouseY)-parseInt(top)+parseInt(initY)+'px'
                }
                a.onmouseup=function (e) {
                    flag=false
                }
            }
        }
      }
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.content{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  div{
    position: absolute;
    width:31%;
    height: 200px;
    border: 1px solid #dcdcdc;
    text-align: center;
    line-height: 200px;
  }
}
</style>
