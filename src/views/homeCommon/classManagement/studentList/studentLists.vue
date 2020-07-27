<template>
  <div class="studentLists bf tc bx">
    <div class="studentLists-con">
      <p class="apply ft20">申请加入的学员</p>
      <div class="apply-con"  >
        <el-row :gutter="80">
          <el-col :span="4.8" v-for="(item,i) in this.trial" :key="i">
            <div class="grid-content bg-purple">
              <div class="con">
                <img :src="item.icon" alt="" class="img">
                <p class="name">{{item.username}}</p>
                <div class="status flexbox">
                  <el-button size="mini" @click="studentJoinClass(item.id,1)">同意</el-button>
                  <el-button size="mini" @click="studentJoinClass(item.id,2)">不同意</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <noData v-if="showimgs"></noData>
      </div>
      <el-button type="warning" plain v-show="show" @click="agreeAllStudentJoinClass">全部同意</el-button>
    </div>
    <div class="studentLists-con applyed" >
      <p class="apply ft20">已加入学员</p>
      <div class="apply-con" v-if="shows">
        <el-row :gutter="160">
          <el-col :span="4.8" v-for="(item,i) in this.agree" :key="i">
            <div class="grid-content bg-purple">
              <div class="con">
                <img :src="item.icon" alt="" class="img">
                <p class="name">{{item.username}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <noData v-if="showimg"></noData>
      </div>
    </div>
<!--    <div class="paginationed">-->
<!--      <Gagination :total="total"  :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun" @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>-->
<!--    </div>-->
  </div>
</template>

<script>
  import Pagination from '../../../../components/pagination/pagination';
  import noData from '../../../../components/noData/noData'
  export default {
    name: "studentLists",
    props:{
      trial: {
        trial: Object
      },
      agree: {
        agree: Object
      },
      total:{
        total:Number
      },
      pageSize:{
        pageSize:Number
      },
      pageNum:{
        pageNum:Number
      },
      classId:{
        classId:Number
      },
      showimg:{
        showimg:Boolean
      },
      showimgs:{
        showimgs:Boolean
      },
      classById:{
        classById:Number
      }
    },
    created(){
      this.$store.state.calssnav="1"; //头部导航
      this.trials = this.trial;
      if(this.trial.length!=0){
        this.show = true
      }else{
        this.show = false
      }
    },
    mounted(){

      // console.log(this);
      this.trials = this.trial;
      if(this.trial.length!=0){
        this.show = true
      }else{
        this.show = false
      }
      // if(this.agree.length!=0){
      //   this.shows = true
      // }else{
      //   this.shows = false
      // }
    },
    data() {
      return {
        trials: [],
        applycon:[],
        show:true,
        shows:true
      }
    },
    methods:{
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.queryPersonNotice(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.queryPersonNotice(); //当前
      },
      //同意拒绝该学生加入班级
      studentJoinClass(id,flag){
        this.$post('/likework/studentJoinClass.do',{
          classId:this.classById,
          studentId:id,
          flag:flag
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.$emit('fatherMethod');
            }else{
              this.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          })
      },
      //全部同意
      agreeAllStudentJoinClass(){
        this.$post('/likework/agreeAllStudentJoinClass.do',{
          classId:this.classById
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.show = false;
              this.trial=[];
              this.$emit('fatherMethod');
            }else{
              this.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          })
      }
    },
    components:{
      Pagination,
      noData
    }
  }
</script>

<style scoped lang="less">
  .studentLists {
    padding: 30px 100px;
    .studentLists-con {
      .apply {
        .apply-con {
        }
      }

    }
    .applyed{
      margin-top: 60px;
    }
  }
  .grid-content {
    margin: 32px 0;
    .img {
      width: 66px;
      height: 66px;
      display: inline-block;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      margin: 12px 0 8px 0;
    }
  }
</style>
