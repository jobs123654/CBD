<template>
  <div></div>
</template>

<script>
export default {
  name: "FullWindow",
  data() {
    return {};
  },

  mounted() {
    EventBus.$on("fullScreen", this.fullScreen);
  },
  beforeDestroy() {
    EventBus.$off("fullScreen", this.fullScreen);
  },
  methods: {
    fullScreen() {
      //  全屏
      var docElm = document.documentElement;

      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }

      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }

      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }

      //IE11
      else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  }

};
</script>

<style lang='scss' scoped>
</style>
