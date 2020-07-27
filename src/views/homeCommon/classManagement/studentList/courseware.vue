<template>
    <div>  <uploadCourseware :show="show"></uploadCourseware></div>
</template>

<script>
  import uploadCourseware from '../../../../components/uploadCourseware/uploadCourseware'
    export default {
        name: "courseware",
      data(){
          return{
            show:false
          }
      },
      created(){
        this.$store.state.calssnav="4"; //头部导航
      },
      components:{
        uploadCourseware
      }
    }
</script>

<style scoped>

</style>
