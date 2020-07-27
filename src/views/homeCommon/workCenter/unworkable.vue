<template>
  <div>
    <Published :flag="flag"></Published>
  </div>
</template>

<script>
  import Published from '../../../components/homeworkCenter/Published'
  export default {
    name: "",
    data(){
      return {
        flag:this.$route.query.flag
      }
    },
    created(){
      this.$store.state.worknav="2"; //头部导航
    },
    components:{
      Published
    }
  }
</script>

<style scoped>

</style>
