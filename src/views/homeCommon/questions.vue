<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "questions",
      created(){
        this.$store.state.adminleftnavnum="1"; //头部导航
      },
    }
</script>

<style scoped>

</style>
