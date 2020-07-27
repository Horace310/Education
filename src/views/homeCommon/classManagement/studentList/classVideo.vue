<template>
    <div>
      <uploadVideo :shows="shows"></uploadVideo>
    </div>
</template>

<script>
  import uploadVideo from '../../../../components/classVideo/uploadVideo'
    export default {
      name: "classVideo",
      data(){
        return{
          shows:false
        }
      },
      created(){
        this.$store.state.calssnav="3"; //头部导航
      },
      components:{
        uploadVideo
      }
    }
</script>

<style scoped>

</style>
