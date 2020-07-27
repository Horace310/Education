<template>
    <div class="honourDetails  mt72">
      <div class="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/studentCommon/honorSystem' }">荣耀体系</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/studentCommon/honorSystem/honour' }">荣耀</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.query.state==1">单元星</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.query.state==2">章节星</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info ft18 bf bx">
        <el-row :gutter="20">
          <el-col :span="5"><div class="grid-content bg-purple">班级名称&nbsp;&nbsp;<span class="colff8">{{classById.name}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">班级属性&nbsp;&nbsp;<span class="colff8">{{classById.gradeName}}{{classById.subjectName}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">邀请码&nbsp;&nbsp;<span class="colff8">{{classById.code}}</span></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">班级人数&nbsp;&nbsp;<span class="colff8">{{classById.stuNum}}</span></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">创建时间&nbsp;&nbsp;<span class="colff8">{{classById.createTime}}</span></div></el-col>
        </el-row>
      </div>
      <div class="content bf bx"  v-if="this.$route.query.state==1">
        <el-row :gutter="20"  v-for="(items,i) in unitStar" :key="i">
            <p class="ft18 fb" style="margin-bottom: 20px;">{{i}}</p>
          <el-col :span="6" v-for="(item,k) in unitStar[i]" :key="k">
            <p class="text">{{item.bar_name}}</p>
            <div class="grid-content"  v-if="item.total==100">
                <p class="days">{{item.total}}%</p>
            </div>
            <div class="grid-contents" v-if="item.total>90 && item.total<100">
              <p class="days">{{item.total}}%</p>
            </div>
            <div class="grid-contented" v-if="item.total<90">
              <p class="days">{{item.total}}%</p>
            </div>
          </el-col>
        </el-row>
        <noData v-if="showimg"></noData>
      </div>
      <div class="content bf bx clearfix" v-if="this.$route.query.state==2">
        <el-row :gutter="20"  v-for="(items,i) in unitStar" :key="i">
          <p class="ft18 fb" style="margin-bottom: 20px;">{{i}}</p>
          <el-col :span="6" v-for="(item,k) in unitStar[i]" :key="k">
            <p class="text">{{item.chapter_name}}</p>
            <div class="grid-content"  v-if="item.total==100">
              <p class="days">{{item.total}}%</p>
            </div>
            <div class="grid-contents" v-if="item.total>90 && item.total<100">
              <p class="days">{{item.total}}%</p>
            </div>
            <div class="grid-contented" v-if="item.total<90">
              <p class="days">{{item.total}}%</p>
            </div>
          </el-col>
        </el-row>
        <noData v-if="showimg"></noData>
      </div>
    </div>
</template>

<script>
  import noData from '../../components/noData/noData'
    export default {
        name: "honourDetails",
      data(){
          return{
            showimg:false,
            journeyList:[],
            classById:[],
            unitStar:[]
          }
      },
      components:{
        noData
      },
      created() {
        this.$store.state.stuhonor = "3"; //头部导航
          //根据id查询班级信息
        this.queryClassById();
        if(this.$route.query.state==1){
          //查看这个班级单元星的作业
          this.findUnitStar()
        }else if(this.$route.query.state==2){
          this.findChapterStar()
        }

      },
      methods:{
        //查看这个班级章节的作业
        findChapterStar(){
          this.unitStar=[];
          this.$post('/honor/findChapterStar.do',{
            classId:this.$route.query.id
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                var data = response.data;
                var arr = Object.keys(data);
                if( arr.length != 0){
                  this.unitStar = response.data;
                  this.showimg = false
                }else{
                  this.showimg = true;
                }

              }
            })
        },
        //查看这个班级单元星的作业
        findUnitStar(){
          this.unitStar=[];
          this.$post('/honor/findUnitStar.do',{
            classId:this.$route.query.id
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                var data = response.data;
                var arr = Object.keys(data);
                if( arr.length != 0){
                  this.unitStar = response.data;
                  this.showimg = false
                }else{
                  this.showimg = true;
                }

              }
            })
        },
        //根据id查询班级信息
        queryClassById(){
          this.$post('/likework/queryClassById.do',{
            classId:this.$route.query.id
          })
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                this.classById = response.data
              }
            })
        }
      }
    }
</script>

<style scoped lang="less">
.honourDetails{
  .nav{
    margin: 20px 0;
  }
  .info{
    line-height: 60px;
    padding: 0 40px;
    margin-bottom: 20px;
  }
  .content{
    padding: 50px 30px;
    /*height: 660px;*/
    .grid-content {
      margin-bottom: 50px;
      width: 144px;
      height: 176px;
      position: relative;
      font-size: 16px;
      text-align: center;
      background: url("../../../static/images/honour_icon01.png") no-repeat center center;
      .days {
        color: #be641c;
        padding-top: 62px;
      }
    }
    .grid-contented{
      width: 144px;
      height: 176px;
      position: relative;
      font-size: 16px;
      text-align: center;
      background: url("../../../static/images/honour_icon03.png") no-repeat center center;
      .days {
        color: #999999;
        padding-top: 62px;
      }
    }
    .grid-contents {
      margin-bottom: 50px;
      width: 144px;
      height: 176px;
      position: relative;
      font-size: 16px;
      text-align: center;
      background: url("../../../static/images/honour_icon02.png") no-repeat center center;
      .days {
        color: #6c6f97;
        padding-top: 62px;
      }
    }
    .text{
      width: 144px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
