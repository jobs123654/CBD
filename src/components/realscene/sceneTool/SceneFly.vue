<template>
  <div class="scenefly-root">
    <Icon type="md-close" @click="close" title="关闭"/>
    <div class="content">
      <div id="play" class="btn-fly" v-show="isPlay" title="开始" @click="play"></div>
      <div id="pause" class="btn-fly" v-show="!isPlay" title="暂停" @click="pause"></div>
      <div id="stop" class="btn-fly" title="停止" @click="stop"></div>
    </div>
    <div class="footer">
      <Select v-model="route" style="width:220px" @on-change="changeFly">
        <Option v-for="(item, i) in fly" :value="item.file" :key="i">{{ item.name }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SceneFly",
  data() {
    return {
      fly: flyRoute,
      route: "",
      isPlay: true,
      fpfUrl: "",
      flyManager: null
    };
  },
  mounted() {},
  beforeDestroy() {
    this.flyManager && this.flyManager.stop();
  },
  methods: {
    play() {
      if (this.flyManager && this.fpfUrl.length) {
        this.isPlay = false;
        this.flyManager && this.flyManager.play();
      } else {
        this.$Message.error("请选择飞行路线！");
      }
    },
    pause() {
      this.isPlay = true;
      this.flyManager && this.flyManager.pause();
    },
    stop() {
      if (this.flyManager) {
        this.isPlay = true;
        this.flyManager && this.flyManager.stop();
      }
    },
    changeFly(val) {
      this.flyManager && this.flyManager.stop();
      this.fpfUrl = "./fly/" + val;
      this.flyTo();
    },
    flyTo() {
      let self = this;
      let routes = new Cesium.RouteCollection(Viewer.entities);
      routes.fromFile(self.fpfUrl);
      self.flyManager = new Cesium.FlyManager({
        scene: Viewer.scene,
        routes: routes
      });
      self.flyManager.readyPromise.then(function() {
        // 飞行路线就绪
        let currentRoute = self.flyManager.currentRoute;
        currentRoute.isLineVisible = false;
        currentRoute.isStopVisible = false;
      });
      self.flyManager.stopArrived.addEventListener(function(routeStop) {
        self.isPlay = true;
      });
    },
    close() {
      this.$emit("closeFly");
    }
  }
};
</script>

<style lang='scss' scoped>
.scenefly-root {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  width: 240px;
  height: 90px;
  background: #143653;
  border: 1px solid #028CCF;
  .content {
    height: 40px;
    padding: 7px 70px 2px 70px;
    .btn-fly {
      float: left;
      width: 32px;
      height: 32px;
      cursor: pointer;
      margin-left: 10px;
    }
    #play {
      background: url("./../../../assets/images/播放.png");
    }
    #pause {
      background: url("./../../../assets/images/暂停.png");
    }
    #stop {
      background: url("./../../../assets/images/停止.png");
    }
  }
  .footer {
    height: 50px;
    line-height: 50px;
    padding: 0px 10px 0px 10px;
  }
  .ivu-icon-md-close {
    position: absolute;
    font-size: 20px;
    right: 2px;
    top: 2px;
    cursor: pointer;
  }
}
</style>