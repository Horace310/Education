<template>
  <div class="journey bf mt72 bx">
    <div class="journey-con bx">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,i) in journeyList" :key="i">
          <div class="grid-contents wLi">
            <div class="con">
              <p class="num">{{i+1}}</p>
              <p class="text">{{item.text}}</p>
              <p class="days">{{item.days}}天</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pk bx">
      <p class="tit bx ft18 col39a">PK自己</p>
    </div>
    <div class="cons bx">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,i) in pkList" :key="i">
          <div class="grid-contents wLi">
            <div class="con">
              <p class="num">{{item.num}}</p>
              <p class="text">{{item.text}}</p>
              <p class="days">{{item.days}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "journey",
    data() {
      return {
        journeyList: [
          {text: '开始', days: 1}, {text: '坚持', days: 7}, {text: '习惯', days: 30}, {text: '阶梯', days: 100}
        ],
        pkList: [
          {num: '100%', text: '努力', days: '100天'}, {
            num: '强化',
            text: '训练',
            days: '200天'
          },{num: '华丽', text: '变身', days: '1年'}
        ]
      }
    },
    created() {
      //查询登录天数
      this.findLoginDay();
      this.$store.state.stuhonor = "1"; //头部导航
      this.$store.state.stuadminnav = "4"; //头部导航

    },
    methods: {
      //查询登录天数
      findLoginDay() {
        this.$post('/honor/findLoginDay.do')
          .then((response) => {
            //console.log(response)
            if (response.code == "5000") {
              this.$nextTick(() => {
                let oWli = document.getElementsByClassName('wLi');
                // response.data.count
                let num = parseInt(response.data.count)
                if (num>=1 && num<7) {
                  for (let i = 0; i < oWli.length; i++) {
                    oWli[0].classList.remove("grid-contents");
                    oWli[0].classList.add("grid-content");
                  }
                } else if (num>=7 && num<30) {
                  for (let i = 0; i < oWli.length; i++) {
                    oWli[0].classList.remove("grid-contents");
                    oWli[0].classList.add("grid-content");
                    oWli[1].classList.remove("grid-contents");
                    oWli[1].classList.add("grid-content");
                  }
                }else if(num>=30 && num<100){
                  for (let i = 0; i < oWli.length; i++) {
                    oWli[0].classList.remove("grid-contents");
                    oWli[0].classList.add("grid-content");
                    oWli[1].classList.remove("grid-contents");
                    oWli[1].classList.add("grid-content");
                    oWli[2].classList.remove("grid-contents");
                    oWli[2].classList.add("grid-content");
                  }
                }else if(num>=100 && num<200){
                  for (let i = 0; i < oWli.length; i++) {
                    oWli[0].classList.remove("grid-contents");
                    oWli[0].classList.add("grid-content");
                    oWli[1].classList.remove("grid-contents");
                    oWli[1].classList.add("grid-content");
                    oWli[2].classList.remove("grid-contents");
                    oWli[2].classList.add("grid-content");
                    oWli[3].classList.remove("grid-contents");
                    oWli[3].classList.add("grid-content");
                    oWli[6].classList.remove("grid-contents");
                    oWli[6].classList.add("grid-content");
                  }
                }else if(num>=200 && num<365){
                  for (let i = 0; i < oWli.length; i++) {
                    oWli[0].classList.remove("grid-contents");
                    oWli[0].classList.add("grid-content");
                    oWli[1].classList.remove("grid-contents");
                    oWli[1].classList.add("grid-content");
                    oWli[2].classList.remove("grid-contents");
                    oWli[2].classList.add("grid-content");
                    oWli[3].classList.remove("grid-contents");
                    oWli[3].classList.add("grid-content");
                    oWli[4].classList.remove("grid-contents");
                    oWli[4].classList.add("grid-content");
                    oWli[6].classList.remove("grid-contents");
                    oWli[6].classList.add("grid-content");
                  }
                }else if(num>365){
                  oWli[0].classList.remove("grid-contents");
                  oWli[0].classList.add("grid-content");
                  oWli[1].classList.remove("grid-contents");
                  oWli[1].classList.add("grid-content");
                  oWli[2].classList.remove("grid-contents");
                  oWli[2].classList.add("grid-content");
                  oWli[3].classList.remove("grid-contents");
                  oWli[3].classList.add("grid-content");
                  oWli[4].classList.remove("grid-contents");
                  oWli[4].classList.add("grid-content");
                  oWli[5].classList.remove("grid-contents");
                  oWli[5].classList.add("grid-content");
                  oWli[6].classList.remove("grid-contents");
                  oWli[6].classList.add("grid-content");
                }
              });
              // document.getElementById("myDIV").classList.remove("grid-content");
              // document.getElementById("myDIV").classList.add("grid-contents");
            }
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .journey {
    margin-top: 20px;

    .journey-con {
      border-bottom: 1px dashed #dcdcdc;
      padding: 50px 120px 60px 120px;

      .grid-contents {
        width: 138px;
        height: 204px;
        position: relative;
        font-size: 16px;
        color: #6c6f97;
        text-align: center;
        background: url("../../../../static/images/honour_icons.png") no-repeat center center;

        .honour_icon {
          width: 138px;
          height: 204px;
        }

        .con {
          padding-top: 34px;
          box-sizing: border-box;

          .num {
          }

          .text {

          }

          .days {

          }
        }

      }

      .grid-content {
        width: 138px;
        height: 204px;
        position: relative;
        font-size: 16px;
        color: #764c1c;
        text-align: center;
        background: url("../../../../static/images/honour_icon.png") no-repeat center center;

        .honour_icon {
          width: 138px;
          height: 204px;
        }

        .con {
          padding-top: 34px;
          box-sizing: border-box;

          .num {
          }

          .text {

          }

          .days {

          }
        }

      }
    }

    .pk {
      margin: 30px 0 0 50px;

      .tit {
        padding-left: 10px;
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

    .cons {
      padding: 50px 120px 60px 120px;

      .grid-contents {
        width: 138px;
        height: 204px;
        position: relative;
        font-size: 16px;
        color: #6c6f97;
        text-align: center;
        background: url("../../../../static/images/honour_icons.png") no-repeat center center;

        .honour_icon {
          width: 138px;
          height: 204px;
        }

        .con {
          padding-top: 34px;
          box-sizing: border-box;

          .num {
          }

          .text {

          }

          .days {

          }
        }

      }

      .grid-content {
        width: 138px;
        height: 204px;
        position: relative;
        font-size: 16px;
        color: #764c1c;
        text-align: center;
        background: url("../../../../static/images/honour_icon.png") no-repeat center center;

        .honour_icon {
          width: 138px;
          height: 204px;
        }

        .con {
          padding-top: 34px;
          box-sizing: border-box;

          .num {
          }

          .text {

          }

          .days {

          }
        }

      }
    }
  }
</style>
