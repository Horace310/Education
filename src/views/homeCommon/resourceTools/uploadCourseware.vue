<template>
  <div><uploadCourseware :show="show"></uploadCourseware></div>
</template>

<script>

    import uploadCourseware from '../../../components/uploadCourseware/uploadCourseware'
    export default {
      name: "uploadCoursewaress",
      data(){
        return{
          show:true
        }
      },
      created(){
        this.$store.state.resnav="1"; //头部导航
      },
      components:{
        uploadCourseware
      }
    }
</script>

<style scoped lang="less">

</style>

