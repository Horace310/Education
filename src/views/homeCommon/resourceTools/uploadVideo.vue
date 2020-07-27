<template>
  <uploadVideo :shows="shows"></uploadVideo>
</template>

<script>
  import uploadVideo from '../../../components/classVideo/uploadVideo'
  export default {
    name: "uploadCourseware",
    data(){
      return{
        shows:true
      }
    },
    created(){
      this.$store.state.resnav="2"; //头部导航
    },
    methods: {
    },
    components:{
      uploadVideo
    }
  }
</script>

<style scoped lang="less">

</style>

