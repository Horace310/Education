<template>
    <div class="honour">
      <div class="honour-con">
          <div class="header bf">
            <el-tabs type="card">
              <el-tab-pane label="单元星">
                <div class="unit">
                  <div class="class-con">
                    <el-row :gutter="20" v-for="(item,k) in joinClass" :key="k" class="roes" >
                      <h5 class="tit ft18 fb ">{{k}}</h5>
                      <el-col :span="6" v-for="(item,i) in joinClass[k]" :key="i" >
                        <div class="content bx" @click="honourDetails(item.classid,1)">
                          <div class="con">
                            <div class="header flexbox">
                              <p class="flex ft16 col39a">{{item.classneme}}</p>
                            </div>
                            <p class="teacher col666 ft16">教师：{{item.username}}</p>
                            <p class="time col666 ft16">时间：{{item.create_time}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="章节星">
                <div class="chapter">
                  <div class="class-con">
                    <el-row :gutter="20" v-for="(item,k) in joinClass" :key="k" class="roes" >
                      <h5 class="tit ft18 fb ">{{k}}</h5>
                      <el-col :span="6" v-for="(item,i) in joinClass[k]" :key="i" >
                        <div class="content bx" @click="honourDetails(item.classid,2)">
                          <div class="con">
                            <div class="header flexbox">
                              <p class="flex ft16 col39a">{{item.classneme}}</p>
                            </div>
                            <p class="teacher col666 ft16">教师：{{item.username}}</p>
                            <p class="time col666 ft16">时间：{{item.create_time}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "honour",
      data(){
        return{
          joinClass:[]
        }
      },
      created(){
        this.queryJoinClass();
        this.$store.state.stuhonor = "3"; //头部导航
      this.$store.state.stuadminnav = "4"; //头部导航
        
      },
      methods:{
        //跳转详情
        honourDetails(id,index){
          this.$router.push({
            path:'/studentCommon/honourDetails',
            query:{
              id:id,
              state:index
            }
          })
        },
        //查询加入的班级
        queryJoinClass(){
          this.$post('/honor/findClassAssignments.do')
            .then((response) => {
              //console.log(response)
              if (response.code == "5000") {
                this.joinClass = response.data
              }
            })
        },
      }
    }
</script>

<style scoped lang="less">
.honour{
  .honour-con{
    .header{
      .class-con {
        padding: 0 14px;
        cursor: pointer;
        .roes{
          margin-bottom: 32px;
          .tit {
            margin-bottom: 20px;
            padding: 0 10px;
            box-sizing: border-box;
          }
          .content {
            margin-bottom: 20px;
            .con{
              background: #eff3f5;
              border-radius: 4px;
              box-sizing: border-box;
              padding: 16px 12px 12px 12px;
              .header{
                margin-bottom: 20px;
              }
            }
          }
        }

      }
    }
  }
}
</style>
<style>
  .honour .honour-con .header .el-tabs__nav{width: 100%;border: none;}
  .honour .honour-con .header .el-tabs__item{width: 50%;text-align: center;background: #ededed;color: #000000;border: none;}
  .honour .honour-con .header .el-tabs__header .el-tabs__item.is-active{background: #ffffff !important;color: #2592e7;}
</style>
