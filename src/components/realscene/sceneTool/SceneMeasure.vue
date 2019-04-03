<template>
  <div class="measure">
    <ul>
      <li title="量距" @click="measureDis">
        <img src="../../../assets/images/工具/量距.png">
      </li>
      <li title="量面" @click="measureArea">
        <img src="../../../assets/images/工具/量面.png">
      </li>
      <li title="量高" @click="measureHeight">
        <img src="../../../assets/images/工具/量高.png">
      </li>
      <li title="清除" @click="clear">
        <img src="../../../assets/images/工具/删除.png">
      </li>
      <li class="item" title="高级查询" @click="sceneSearch">
        <Icon type="ios-search"/>
      </li>
      <li class="item" title="全幅" @click="allScene">
        <Icon type="ios-expand"/>
      </li>
      <li class="item" title="全屏" @click="FullScene">
        <Icon type="ios-albums-outline"/>
      </li>
      <li class="item" title="截图打印" @click="scenePrint">
        <Icon type="md-print"/>
      </li>
      <FullWindow></FullWindow>
    </ul>
  </div>
</template>

<script>
let handlerDis, handlerArea, handlerHeight;
import FullWindow from "./../../common/FullWindow";
export default {
  name: "SceneMeasure",
  data() {
    return {};
  },
  components: {
    FullWindow
  },
  methods: {
    measureDis() {
      this.$emit("closeMeasure");
      if (!handlerDis) {
        handlerDis = new Cesium.MeasureHandler(
          Viewer,
          Cesium.MeasureMode.Distance,
          0
        );
        //注册测距功能事件
        handlerDis.measureEvt.addEventListener(function(result) {
          var dis = Number(result.distance);
          var distance =
            dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
          handlerDis.disLabel.text = "距离:" + distance;
        });
        handlerDis.activeEvt.addEventListener(function(isActive) {
          if (isActive == true) {
            Viewer.enableCursorStyle = false;
            Viewer._element.style.cursor = "";
          } else {
            Viewer.enableCursorStyle = true;
          }
        });
      }
      this.deactiveAll();
      handlerDis && handlerDis.activate();
    },
    measureArea() {
      this.$emit("closeMeasure");
      if (!handlerArea) {
        //初始化测量面积
        handlerArea = new Cesium.MeasureHandler(
          Viewer,
          Cesium.MeasureMode.Area,
          0
        );
        handlerArea.measureEvt.addEventListener(function(result) {
          var area =
            result.area > 1000000
              ? (result.area / 1000000).toFixed(2) + "km²"
              : result.area + "㎡";
          handlerArea.areaLabel.text = "面积:" + area;
        });
        handlerArea.activeEvt.addEventListener(function(isActive) {
          if (isActive == true) {
            Viewer.enableCursorStyle = false;
            Viewer._element.style.cursor = "";
          } else {
            Viewer.enableCursorStyle = true;
          }
        });
      }
      this.deactiveAll();
      handlerArea && handlerArea.activate();
    },
    measureHeight() {
      this.$emit("closeMeasure");
      if (!handlerHeight) {
        //初始化测量高度
        handlerHeight = new Cesium.MeasureHandler(
          Viewer,
          Cesium.MeasureMode.DVH
        );
        handlerHeight.measureEvt.addEventListener(function(result) {
          var distance =
            result.distance > 1000
              ? (result.distance / 1000).toFixed(2) + "km"
              : result.distance + "m";
          var vHeight =
            result.verticalHeight > 1000
              ? (result.verticalHeight / 1000).toFixed(2) + "km"
              : result.verticalHeight + "m";
          var hDistance =
            result.horizontalDistance > 1000
              ? (result.horizontalDistance / 1000).toFixed(2) + "km"
              : result.horizontalDistance + "m";
          handlerHeight.disLabel.text = "空间距离:" + distance;
          handlerHeight.vLabel.text = "垂直高度:" + vHeight;
          handlerHeight.hLabel.text = "水平距离:" + hDistance;
        });
        handlerHeight.activeEvt.addEventListener(function(isActive) {
          if (isActive == true) {
            Viewer.enableCursorStyle = false;
            Viewer._element.style.cursor = "";
          } else {
            Viewer.enableCursorStyle = true;
          }
        });
      }
      this.deactiveAll();
      handlerHeight && handlerHeight.activate();
    },
    clear() {
      this.$emit("closeMeasure");
      handlerDis && handlerDis.clear();
      handlerArea && handlerArea.clear();
      handlerHeight && handlerHeight.clear();
    },
    deactiveAll() {
      handlerDis && handlerDis.deactivate();
      handlerArea && handlerArea.deactivate();
      handlerHeight && handlerHeight.deactivate();
    },
    allScene() {
      let layers = Viewer.imageryLayers._layers;
      let layer;
      layers.forEach(element => {
        if (
          element._imageryProvider.name &&
          element._imageryProvider.name == "dom"
        ) {
          layer = element;
        }
      });
      Viewer.flyTo(layer);
    },
    FullScene() {
      EventBus.$emit("fullScreen");
    },
    scenePrint() {
      let self = this;
      let promise = Viewer.scene.outputSceneToFile();
      Cesium.when(promise, async buffer => {
        let printWindow = window.open("")
        let strHeader = '<!DOCTYPE html><html lang="zh" dir="ltr"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"><title>场景打印</title></head>'
        let strScript = '<script type="text/javascript">'+ '\n' +'function printDiv(){var newuiPrint = document.getElementsByClassName("newuiPrint")[0];newuiPrint.style.display = "none";window.print();newuiPrint.style.display = "block";}<\/script>'
        let strBody = '<body><div class="print-header"><div id="superft"><div class="printClose"><input type="button" class="newuiPrint" onclick="printDiv()" value="打印"></div></div></div><img id="printMap" /></body></html>'
        let strHTML = strHeader + strScript + strBody
        printWindow.document.write(strHTML)
        printWindow.document.getElementById("printMap").src = buffer
        printWindow.document.close();
      });
    },
    sceneSearch() {
      EventBus.$emit("openSceneSearch");
    }
  }
};
</script>

<style lang="scss" scoped>
.measure {
  position: absolute;
  right: 0px;
  top: 0.45rem;
  ul {
    padding: 0.05rem;
    background: url(../../../assets/images/工具面板.png) center/100% 100%;
    color: #ffffff;
    border: 1px solid #3260bd;
    font-size: 12px;
    text-align: center;
    list-style: none;
    cursor: pointer;
    .item {
      font-size: 20px;
      margin-top: -9px;
    }
  }
}
</style>
