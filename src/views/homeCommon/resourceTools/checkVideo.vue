<template>
    <div id="checkVideo">
        <div class="main mt72">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: navPath }">{{navName}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:path}">{{name}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{videoName}}</el-breadcrumb-item>
            </el-breadcrumb>
            <Video v-if="key==2"></Video>
            <Course v-else></Course>
        </div>
    </div>
</template>
<script>
import Video from '../../../components/classVideo/checkVideo'
import Course from '../../../components/uploadCourseware/checkCourse'
export default {
    components:{
        Video,
        Course
    },
    data(){
        return{
            videoName:'',
            path:'',
            name:'',
            key:'',
            navName:'',
            navPath:'',
            videoName:''
        }
    },
    created(){
        if(this.$store.state.adminleftnavnum!="/"){
            sessionStorage.setItem('adminleftnavnum',this.$store.state.adminleftnavnum);
        }
        else if(this.$store.state.adminleftnavnum=="/"){
            this.$store.state.adminleftnavnum = sessionStorage.getItem('adminleftnavnum');
        }
        let navnum = this.$store.state.adminleftnavnum;
        if(navnum == "3"){
            this.navName = '班级管理',
            this.navPath = "/homeCommon/classManagement";
        }
        else{
            this.navName = "资源管理";
            this.navPath = "/homeCommon/resourceTools"
        }
        this.path = this.$route.query.path+'?id='+this.$route.query.id,this.name = this.$route.query.name,this.key = this.$route.query.key;
        if(this.key==2){
            this.videoName = JSON.parse(sessionStorage.getItem('getVideo')).VideoName;
        }
        else{
            this.videoName = this.$store.state.VideoName;
        }
    },
    methods:{

    }
}
</script>
<style lang="less">
    #checkVideo{
        .main{
            .el-breadcrumb {
                font-size: 16px;
                color: #333;
                height: 45px;
                line-height: 45px;
            }
        }
    }
</style>