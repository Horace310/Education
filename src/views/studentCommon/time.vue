    <template>
  <div class="timer">
    <div ref="startTimer">{{timeData}}</div>
  </div>
</template>
    <script>
export default {
  name: "Timer",
  data() {
    return {
      timeData: "",
      timer: "",
      content: "",
      hour: 0,
      minutes: 0,
      seconds: 0
    };
  },
  created() {
    this.timer = setInterval(this.startTimer, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  // computed(){
  //   seconds(){

  //   }
  // },
  methods: {
    initTime(value) {
      // this.minutes = value;
      if (parseInt(value) >= 60) {
        this.hour = parseInt(value / 60);
        let newTime = String(value / 60);
        if (/\./.test(newTime)) {
          var b = newTime.split(".");
          var x = b[0];
          var y = b[1];
          this.seconds = Math.ceil(60 * Number(0 + "." + y));
        }
      } else {
        this.minutes = value;
      }
    },
    startTimer() {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hour = this.hour + 1;
      }
      this.timeData =
        (this.hour < 10 ? "0" + this.hour : this.hour) +
        ":" +
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    }
  }
};
</script>
    <style>
</style>