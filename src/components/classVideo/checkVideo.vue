<template>
  <div id="videojs">
    <div class="title">{{ videoName }}</div>
    <div class="video">
      <video-player
        class="vjs-custom-skin"
        :options="playerOptions"
      ></video-player>
      <div class="createTime">{{createTime}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        path:'',
        createTime:'',
        videoName:'',
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src:
              "http://qiniu.chinawike.com/13540784091/resultVideo-0-1543113710.744904.mp4" //url地址
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created(){
  //  console.log(this.$store.state)
    let video = JSON.parse(sessionStorage.getItem('getVideo'));
      this.playerOptions.sources[0].src = video.VideoUrl;
      this.videoName = video.VideoName;
      this.createTime = video.VideoCreateTime;
      
  },
  mounted(){
  //    console.log(this.url)
    //   console.log(url)

  },
  methods:{

  }
};
</script>
<style lang="less">
#videojs{
    .title{
        font-size: 20px;
        color:#333;
        line-height: 40px;
        text-align: center;
        margin-bottom: 20px;
    }
    .createTime{
        width: 100%;
        font-size: 18px;
        color:#333;
        line-height: 40px;
        text-align: right;
    }
    .video{
        .video-player {
            .video-js{
                padding-top: 57%;
            }
        }
    }
}
    .video{
        .video-player {
            .video-js{
                padding-top: 57%;
            }
        }
    }

</style>
