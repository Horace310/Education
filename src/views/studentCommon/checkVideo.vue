<template>
    <div id="checkVideos">
        <div class="main mt72">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/studentCommon' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/studentCommon/studyResource' }">学习资源</el-breadcrumb-item>
                <el-breadcrumb-item >{{this.$store.state.VideoName}}</el-breadcrumb-item>
            </el-breadcrumb>
            <Video v-if="key==2"></Video>
            <Course v-else></Course>
        </div>
    </div>
</template>
<script>
import Video from '../../components/classVideo/checkVideo'
import Course from '../../components/uploadCourseware/checkCourse'
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
            key:''
        }
    },
    created(){
        this.path = this.$route.query.path,this.name = this.$route.query.name,this.key = this.$route.query.key;
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
    #checkVideos{
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
