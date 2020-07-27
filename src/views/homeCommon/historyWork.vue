<template>
  <div class="historyWork ">
    <div class="cons  bx bf mt72">
      <h3 class="title tc fb ft20 col39a">知识体系</h3>
      <p class="work_name tc col39a ft14"><span>{{title[0]}}-</span><span>{{title[1]}}-</span><span>{{title[2]}}-</span>
      <span>{{title[3]}}</span><span v-show="title[4]!=''">-{{title[4]}}</span><span v-show="title[5]!=''">-{{title[5]}}</span><span v-show="title[6]!=''">-{{title[6]}}</span></p>
      <div class="con flexbox cp" v-for="item in hwlist" @click="choose(item)" >
        <p class="tit flex col39a">{{item.homeworkName}}</p>
        <p class="time">{{item.createTime}}</p>
      </div>
      <Gagination :total="total"  :page-size="pageSize" @handleSizeChangeSub="handleSizeChangeFun" @handleCurrentChangeSub="handleCurrentChangeFun"></Gagination>
    </div>
  </div>
</template>

<script>
  import Gagination from '../../components/pagination/pagination'
  export default {
    name: "",
    data(){
      return{
        createClass:[],
        hwlist:[],
        options:[],
        value:'0',
        pageSize:1,
        pageNum:1,
        total:0,
        classId:'',
        textbookId:"",
        title:''
      }
    },
    components:{

      Gagination
    },
    created() {
      this.title = this.$route.query.title.split(',');
   this.queryClassHomework()

    },
    mounted() {

    },
    methods:{

      //选择历史作业
      choose(item){
        this.$router.push({path:'/homeCommon/questions/release',query:{title:this.$route.query.title,homeworkId:item.id,subjectId:this.$route.query.subjectId,update:3}})
      },
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.queryClassHomework(); //每页条数
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNum = v; //当前页
        this.queryClassHomework(); //当前
      },



      //查询作业
      queryClassHomework(){
        this.hwlist = [];
        this.$post('/likework/queryHistoryHomework.do',{
          subjectId:this.$route.query.subjectId,//学科
          textbookId:this.$route.query.textbookId,//教科书
          chapterId:this.$route.query.chapterId,//章id
          rows:10,
          indexNo:this.pageNum,
        }).then((response) => {
          //console.log(response)
          if (response.code == "5000") {
            this.hwlist = response.data.rows;
            this.total = response.data.pageCount
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .historyWork{
    .cons{
      margin-top: 20px;
      height: 600px;
      padding: 20px 30px 0 30px;
      .work_name{margin-top: 10px;}
      .con{
        margin-top: 20px;
        .tit{
          text-decoration: underline;
          width: 700px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }

    }
  }
</style>
