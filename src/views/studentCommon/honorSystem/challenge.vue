<template>
  <div class="challenge bf">
    <div class="weekCorrect bx">
      <div class="tit flexbox flexcenter">
        <p class="titname bx ft18 col39a flex">周作业正确率</p>
        <div class="sec-con  flexbox ">
          <div class="sec flex" style="margin-right: 50px;">
            <span class="name ft16">选择科目：</span>
            <el-select v-model="subjectId" clearable placeholder="请选择" @change="findWeekTaskCorrectnessRate">
              <el-option
                v-for="items in states"
                :key="items.id"
                :label="items.subject_name"
                :value="items.id">
              </el-option>
            </el-select>
          </div>
          <div class="sec ">
            <span class="name ft16">选择时间：</span>
            <div class="block" style="display: inline-block;">
              <el-date-picker
                v-model="time"
                @change="findWeekTaskCorrectnessRate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="subjects">
        <div class="vol-data">
          <div class="charts" style="width:100%;">
            <div class="charts-title fb ft16 colff8 tl">
              当周平均正确率
            </div>
            <p class="average  col39a ft16 tc">当周平均正确率:{{weekCR}}%</p>
            <div id="myChart1" :style="{ width: '100%', height: '300px' }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="weekCorrect bx">
      <div class="tit flexbox flexcenter">
        <p class="titname bx ft18 col39a flex">月作业正确率</p>
        <div class="sec-con  flexbox ">
          <div class="sec flex" style="margin-right: 50px;">
            <span class="name ft16">选择科目：</span>
            <el-select v-model="subjectId" clearable placeholder="请选择" @change="findMonthTaskCorrectnessRate">
              <el-option
                v-for="items in states"
                :key="items.id"
                :label="items.subject_name"
                :value="items.id">
              </el-option>
            </el-select>
          </div>
          <div class="sec ">
            <span class="name ft16">选择时间：</span>
            <div class="block" style="display: inline-block;">
              <el-date-picker
                @change="findMonthTaskCorrectnessRate"
                v-model="time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="subjects">
        <div class="vol-data">
          <div class="charts" style="width:100%;">
            <div class="charts-title fb ft16 colff8 tl">
              当月平均正确率
            </div>
            <p class="average  col39a ft16 tc">当月平均正确率:{{monthCR}}%</p>
            <div id="myChart3" :style="{ width: '100%', height: '300px' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import echarts from "_echarts@4.2.1@echarts";
 import echarts from 'echarts'
  export default {
    name: "challenge",
    data() {
      return {
        time: '',
        states: [],
        timeList:[],
        myChartData1: {
          name: [],
          value: []
        },
        myChartData3: {
          name: [],
          value: []
        },
        subjectId:'',
        weekCR:'',
        monthCR:''
      }
    },
    created() {
      //查询学段学科
      this.findSubject()
      //查询一周的正确率
      this.findWeekTaskCorrectnessRate();
      //查询一月的正确率
      this.findMonthTaskCorrectnessRate();
      this.$store.state.stuhonor = "2"; //头部导航
      this.$store.state.stuadminnav = "4"; //头部导航

    },
    methods: {
      //查询一月的正确率
      findMonthTaskCorrectnessRate(){
        this.myChartData3 = {name: [], value: []};
        this.$post('/honor/findMonthTaskCorrectnessRate.do',{
          subjectId:this.subjectId,
          time:this.time
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              for (let i = 0; i < response.data.list.length; i++) {
                this.myChartData3.value.push(parseInt(response.data.list[i].total));
                this.myChartData3.name.push(response.data.list[i].date);
              }
              this.monthCR = response.data.monthCR
              this.drawLine3()
            }
          })
      },
      //查询一周的正确率
      findWeekTaskCorrectnessRate(){

        this.myChartData1 = {name: [], value: []};
        this.$post('/honor/findWeekTaskCorrectnessRate.do',{
          subjectId:this.subjectId,
          time:this.time
        })
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              for (let i = 0; i < response.data.list.length; i++) {
                this.myChartData1.value.push(parseInt(response.data.list[i].total));
                this.myChartData1.name.push(response.data.list[i].date);
              }
              this.weekCR = response.data.weekCR
              this.drawLine2()
            }
          })
      },
      //查询学段学科
      findSubject(){
        this.$post('/honor/findSubject.do').then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.states = response.data
            }
          })
      },
      drawLine2() {
        // debugger;
        var that = this;
        var myChart = echarts.init(document.getElementById("myChart1"));
        var option = null;
        option = {
          xAxis: {
            type: "category",
            data: that.myChartData1.name,
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: that.myChartData1.value,
              type: "line"
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
      drawLine3() {
        // debugger;
        var that = this;
        var myChart = echarts.init(document.getElementById("myChart3"));
        var option = null;
        option = {
          xAxis: {
            type: "category",
            data: that.myChartData3.name,
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: that.myChartData3.value,
              type: "line"
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .challenge {
    padding-bottom: 80px;

    .weekCorrect {
      padding: 60px 40px 10px 40px;

      .tit {
        .titname {
          padding-left: 14px;
          position: relative;

          &::before {
            position: absolute;
            content: '';
            border-left: 4px solid #39a5ff;
            display: inline-block;
            height: 25px;
            border-radius: 8px;
            left: 0;
          }
        }
      }

      .subjects {
        background: #fbfbfb;
        box-sizing: border-box;
        padding: 40px;
        margin: 40px auto 0 auto;

        .vol-data {
          margin-bottom: 80px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
