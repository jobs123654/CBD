<template>
  <div id="cesium-scene"></div>
</template>

<script>
export default {
  name: "IndexScene",
  data() {
    return {
      sceneConfig: config.threeDimensional
    };
  },
  mounted() {
    this.init();
    this.$emit("realSceneComplete");
  },
  beforeDestroy() {},
  methods: {
    init() {
      let self = this;

      let viewer = new Cesium.Viewer(this.$el, this.sceneConfig.option);
      window.Viewer = viewer;
      viewer._cesiumWidget._creditContainer.style.display = "none";
      //添加SuperMap iServer发布的影像服务
      viewer.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: self.sceneConfig.map_url
        })
      );
      let scene = viewer.scene;
      let widget = viewer.cesiumWidget;

      let promise = scene.open(this.sceneConfig.sceneUrl);
      Cesium.when.all(
        promise,
        layers => {
          layers.forEach(layer => {
            if (layer.name && layer.name.indexOf("JZ") == -1) {
              layer.selectEnabled = false;
            }
          });

          var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
          handler.setInputAction(function(movement) {
            console.log(scene.camera);
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

          let position = {
            x: 509999.4353422035,
            y: 303271.3676363418,
            z: 1082.1530535491182
          };

          let point = new Cesium.Cartesian3(position.x, position.y, position.z);
          let pointCartographic = scene.camera._projection.unproject(point);
          let pointCX = Cesium.Math.toDegrees(pointCartographic.longitude);
          let pointCY = Cesium.Math.toDegrees(pointCartographic.latitude);

          // 设置相机位置，定位至模型
          scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(
              pointCX,
              pointCY,
              pointCartographic.height
            ),
            orientation: {
              heading: 0,
              pitch: 100,
              roll: 0
            }
          });
        },
        e => {
          let title = "加载SCP失败，请检查网络连接状态或者url地址是否正确？";
          widget.showErrorPanel(title, undefined, e);
        }
      );
    }
  }
};
</script>
<style lang='scss' scoped>
#cesium-scene {
  width: 100%;
  height: 100%;
}
</style>
