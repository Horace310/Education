<template>
    <div id="checkCourse">
        <div class="title">{{ videoName }}</div>
        <div class="content">
            <img :src="url" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:{

    },
    data(){
        return{
            url:'',
            videoName:''
        }
    },
    created(){
      console.log(this.$store.state.VideoUrl);
      this.url = this.$store.state.VideoUrl,this.videoName = this.$store.state.VideoName
    }
}
</script>
<style lang="less">
    #checkCourse{
        .title{
        font-size: 20px;
        color:#333;
        line-height: 40px;
        text-align: center;
        margin-bottom: 20px;
    }
    .createTime{
        width: 100%;
        font-size: 18px;
        color:#333;
        line-height: 40px;
        text-align: right;
    }
    .content{
        padding: 20px 40px;
    }
    }
</style>
