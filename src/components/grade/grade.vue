<template>
  <div class="stage">
    <div class="btns">
      <!-- <el-button type="primary" class="mybtn" @click="screen">筛选</el-button> -->
      <span class="shaixuan"  v-if="block">下拉筛选学段学科</span>
      <!-- <span class="shaixuan"  :style="block">下拉筛选学段学科</span> -->
      <i class="el-icon-question query" @mouseover="mouseOver" @mouseleave="mouseLeave"></i>
      <template v-for="(item,index) in labels">
        <el-tag closable class="xueke" :class="{current:isactive==index}" @close="closeTag(item,index)" @click="getTest(item,index)" size="medium" :key="index"> {{item.name}} </el-tag>
        
      </template>
        <el-button  class="mybtn2" @click="screen">学科筛选  <img src="../../../static/images/xiala.png" v-show="ImgShow" alt=""> <img class="Img2" v-show="!ImgShow" src="../../../static/images/shangla.png" alt=""> </i></el-button>
    </div>
    <div class="bigBox" style="transition:all 0.5s ease 0s;" :style="screens?'height:192px;':'height:0;overflow:hidden;'">
      <div class="primarySchool flexbox flexcenter" v-for="(items ,k) in sujectList" :key="k">
        <div class="tit ft16 fb" >{{k}}</div>
        <div class="con ft16 flexbox" v-for="(item ,i) in sujectList[k]" :key="i">
          <!-- <p class="cp" :class="{active:sujectList[k].active[i]==item.id}"  @click="querydSuject(item.id,item.type,item.subjectName,i)">{{item.subjectName}}</p> -->
          <!-- <p class="cp" :class="{active:liid==item.id}" :disabled="isDisable" @click="querydSuject(item.id,item.type,item.subjectName,i)">{{item.subjectName}}</p> -->
          <el-button size="small" style="border:none" class="cp" :class="{active:liid==item.id}" :disabled="isDisable" @click="querydSuject(item.id,item.type,item.subjectName,i,$event)" > {{item.subjectName}} </el-button>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import {mapState,mapMutations,mapAction ,mapGetters} from 'vuex';
  import  Utils from '../../../static/js/util'
  export default {
    inject: ['reload'],
      name: "grade",
      data(){
          return{
            Infomation:"",
            ImgShow:true,
            sujectList:[],
            active:[],
            active2:[],
            active3:[],
            screens:'',
            labels:[],
            block:'',
            closable:true,
            current:0,
            liid:0,
            subjectName:'',
            subjectAll:{},
            isactive : 0,
            arr:[],
            isDisable: false,
            isClass:'',
            
          }
      },
      created() {
        this.querySujectList()
     //   this.getTest()
        
        
      },
      mounted(){
          this.Infomation =sessionStorage.getItem('period')+sessionStorage.getItem('subjects')
          // let newS=[]
          // newS.push(this.Infomation)
        //  var a =  this.Infomation.split(",")
        //  this.getTest()
        this.isactive= JSON.parse( sessionStorage.getItem('isactive') )
        this.labels.forEach((item,index)=>{

        })
       if ((sessionStorage.getItem('subName1'))){
          var name1=sessionStorage.getItem('subName1')
          var type1=sessionStorage.getItem('type1')
          var typename1=sessionStorage.getItem('typename1')
          var subjectName1=sessionStorage.getItem('subjectName1')
          var id1=sessionStorage.getItem('id1')
           this.labels.push(
           {name:name1,type:type1,typename:typename1,subjectName:subjectName1,id:id1},
         )
        }else {
          this.labels=[]
        } 
        
      },
      methods: {
        //鼠标移入事件
         mouseLeave() {
          this.block = "display:none";
        },
           //鼠标移入事件
             mouseOver() {
          this.block = "display:block";
        },
        //获取首页学科体系
        querySujectList() {
          var that = this;
          this.$post('/likework/querySujectList.do')
            .then((response) => {
              if (response.code == "5000") {
                let suject={};
                that.sujectList = response.data;
                for(var key in response.data){
                  response.data[key].active= [];
                  //循环key值
                  response.data[key].forEach((item,indexs)=>{
                    response.data[key].active.push(false);
                    if(sessionStorage.getItem('subjectId') == item.id){    //根据缓存的subjectId给默认选中
                      that.labels.push({"name":`${key}${item.subjectName}`,type:key,index:indexs,id:item.id});
                      suject={
                        subjectName:response.data[key][indexs].subjectName,
                        typename:that.gettypename(response.data[key][indexs].type),
                        type:response.data[key][indexs].type,
                      }
                      response.data[key].active[indexs] = sessionStorage.getItem('subjectId');
                      this.$emit('subjectId',this.active);
                      Utils.$emit('demo',{id:this.active});
                  
                      return false;
                    }
                  })
                  if(sessionStorage.getItem('subjectId')==0){
                    
                    that.labels.push({"name":`${response.data[key][0].periodName}${response.data[key][0].subjectName}`,type:key,index:0});     
                        
                    response.data[key].active[0] = response.data[key][0].id;
                    return false;
                  }
                }
                Object.keys(response.data).forEach((key, index) => {             
                  that.active = response.data[key][0].id                
                    suject={
                      id:response.data[key][0].id,
                    }
                })
                this.$store.state.suject=suject
              }
            })
        },

        //点击学科
        querydSuject(id,type,subjectName,index,$event){
        
          
           let typename = this.gettypename(typename);
          this.sujectList[typename].active[index]=id;
           this.liid = id 
           
           if(this.labels.length<3){
          typename = type==1?'小学':type==2?'初中':'高中';
             this.labels.push({name:`${typename}${subjectName}`,typename:typename,subjectName:subjectName,type:type,index:index,id:id})
           this.labels.forEach((item,index)=>{
            sessionStorage.setItem("subName1",this.labels[index].name)
            sessionStorage.setItem("typename1",this.labels[index].typename)
            sessionStorage.setItem("subjectName1",this.labels[index].subjectName)
            sessionStorage.setItem("type1",this.labels[index].type)
          sessionStorage.setItem("id1",this.labels[index].id)
             
           })
          }
          else{
            this.$message.error("最多只能选择3个标签！")
            this.isDisable=true
          }
          let subjects={
            subjectName:subjectName,
            typename:typename,
            type:type,
            id:id
          };
          this.arr.push(id)
          for (var i =  this.arr.length; i >= 0; i--) {
         if ( this.arr.indexOf( this.arr[i]) !=  this.arr.lastIndexOf( this.arr[i])) {
         this.$message.error("请不要重复点击同一门学科")
         this.isDisable=true
         this.arr=[] }    
          }   
          this.subjectAll = subjects
          this.$store.commit('querySubject',subjects);
           this.$emit('subjectId',subjects);                          
          },
        // 获取年级名称
        gettypename(e){
          return e==1?'小学':e==2?'初中':'高中';
        },
          screen(){
           this.screens = !this.screens;
           this.ImgShow = !this.ImgShow
        },
        //点击关闭
        closeTag(item,index){
          this.isDisable=false
          this.labels.splice(index,1)
          this.isDisable = false
          sessionStorage.removeItem('subName1')
          sessionStorage.removeItem("typename1")
            sessionStorage.removeItem("subjectName1")
            sessionStorage.removeItem("type1")
            sessionStorage.removeItem("id1")
          //
           sessionStorage.removeItem('subName2')
           sessionStorage.removeItem("typename2")
            sessionStorage.removeItem("subjectName2")
            sessionStorage.removeItem("type2")
            sessionStorage.removeItem("id2")
        
        },
        //点击显示学科标签显示题库
        getTest(item,index){
     
       this.$emit('GetSubId',id)
          this.isactive=index
          sessionStorage.setItem('isactive',index)
          var id = item.id
          sessionStorage.setItem('liid',id)
      
            let subjects={
           subjectName:item.subjectName,
           typename:item.typename,
            type:item.type,
            id:item.id
           };
           
            this.$store.commit('querySubject',subjects);
           this.$emit('subjectId',subjects);
        }
      },
      computed:{
        ...mapGetters([
          'subjectList'
        ])
      },
      watch: {
        
        subjectList: function (li) { //li就是改变后的wifiList值
        // console.log("改变", li);
          Utils.$emit('demo',li);
        }
      }
    }
</script>


<style scoped lang="less">
@color: #2592e7;


.addclass{
  background-color: #f25c29;
}
  .stage{
    /*margin-top: 20px;*/
      .btns{
        margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    .xueke{
      height: 44px;
      background-color: #fff;
      font-size: 16px;  
      margin-bottom: 10px;
      line-height: 30px;
      text-align: center;
      background-color: #fff;
      border-radius: 8px;
      .close{
        font-size: 14px;
      }
    }
    .current{
  background-color: #f25c29;
  color: #fff;
}
    .query{
      position: absolute;
      right: 105px;
      top: 10px;
      color: #d2d2d2;
      font-size: 20px;
    }
   
    .shaixuan{
      position: absolute;
      right: 130px;
      top: 3px;
      border: 1px solid #d2d2d2;
      padding: 3px 5px;
      color:darkgray;
      display: none;
    }
    .mybtn{
      color: #fff;
      background-color: #f25c29;
      border: none;
    }
    .mybtn2{
      position: absolute;
      right: 0;
      top: 0;
        border: none;
        background: rgba(0, 0, 0, 0);
        color: #3aa497;
      img{
        transform: scale(0.7)
      }
      .Img2{
        transform: scale(0.89)
      }
    }
    
    span{
      padding:8px 10px;
      border-radius: 4px;
     border: 1px solid #f25c29;
     color: #f25c29;
      margin-left: 20px;
    }
    
  }
 .bigBox{

   margin-top: 20px;
    .primarySchool {
      /*width: 72%;*/
      /*margin: 0 auto 0 auto;*/
      background: #ffffff;
      height: 64px;
      border-bottom: 1px dashed #d2d2d2;
      .tit {
        height: 25px;
        position: relative;
        padding: 0 20px;
        box-sizing: border-box;
        width: 78px;
        &::after {
          content: "";
          border-right: 1px solid #f25c29;
          display: inline-block;
          height: 25px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .con{
        p{
          margin: 0 8px;
          height: 20px;
          line-height: 20px;
          padding: 4px 6px;
          border-radius: 4px;
        }
        .active{
          background: #f25c29;
          color: #ffffff;
        }
        .current{
  background: #f25c29;
}
.addclass{
 background: #f25c29;
}
      }
      &:last-child{
        border-bottom: none;
      }
    }
  }
  }
</style>
