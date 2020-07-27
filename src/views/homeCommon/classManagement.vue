<template>
    <div><router-view></router-view></div>
</template>

<script>
    export default {
        name: "classManagement",
      created(){
        this.$store.state.adminleftnavnum="3"; //头部导航
      },
    }
</script>

<style scoped>

</style>
