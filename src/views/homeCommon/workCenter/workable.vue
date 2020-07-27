<template>
  <div>
    <release :flag="flag"></release>
  </div>
</template>

<script>
  import release from '../../../components/homeworkCenter/release'
  export default {
    name: "",
    data(){
      return {
        flag:this.$route.query.flag
      }
    },
    created(){
      this.$store.state.worknav="1"; //头部导航
    },
    components:{
      release
    }
  }
</script>

<style scoped>

</style>
