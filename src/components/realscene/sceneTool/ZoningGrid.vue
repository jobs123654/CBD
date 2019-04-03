<template>
  <div class="root">
    <div class="title">
      <p>区划网格</p>
      <span @click="close()">   <Icon type="ios-backspace-outline"  title="关闭" style="font-size: 20px"/></span>
    </div>
    <div class="grid">
      <Checkbox
        v-for="(item, index) in listData"
        :key="index"
        v-show="item.file_name"
        @on-change="addGrid($event, item)"
      >{{ item.name }}</Checkbox>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ZoningGrid",
  data() {
    return {
      listData: sceneConfig.zoningGridConfig
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    async addGrid(node, item) {
      if (node) {
        let res = await this.getGeoJson(item.file_name);
        if (res.status == 200) {
          let points = res.data.features[0].geometry.coordinates[0];
          let wallStr = "[";
          points.forEach((point, i) => {
            let pointC = new Cesium.Cartesian3(point[0], point[1], 30);
            let pointCartographic = Viewer.scene.camera._projection.unproject(
              pointC
            );
            let pointCX = Cesium.Math.toDegrees(pointCartographic.longitude);
            let pointCY = Cesium.Math.toDegrees(pointCartographic.latitude);
            if (i == 0) {
              wallStr += pointCX + "," + pointCY;
            } else {
              wallStr += "," + pointCX + "," + pointCY;
            }
          });
          wallStr += "]";
          let wall = JSON.parse(wallStr);
          this.addCorridor(wall, item);
        }
      } else {
        this.removeCorridor(item);
      }
    },
    getGeoJson(file) {
      let file_road = "./geojson/scene/";
      return axios.get(file_road + file);
    },
    addCorridor(Arr, item) {
      if (Viewer) {
        Viewer.entities.add({
          id: item.index,
          name: item.name,
          corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray(Arr),
            material: Cesium.Color.fromCssColorString(item.color),
            outline: !0,
            height: 50, // 椭圆体表面与位置之间的距离
            width: 5, // 走廊边缘之间的距离
            outlineColor: Cesium.Color.GHOSTWHITE.withAlpha(0),
            cornerType: Cesium.CornerType.BEVELED,
            extrudedHeight: 1 // 椭球面和挤压面之间的距离
          }
        });
        Viewer.zoomTo(Viewer.entities);
      }
    },
    removeCorridor(item) {
      if (Viewer) {
        Viewer.entities.removeById(item.index);
      }
    },
    close(){
      this.$emit('close');
    },
  }
};
</script>

<style lang='scss' scoped>
.root {
  position: absolute;
  top: 0.6rem;
  left: 2.5rem;
  padding: 0.2rem 0;
  background: url(../../../assets/images/面板分解/top.png) top/100% 30px
      no-repeat,
    url(../../../assets/images/面板分解/未标题-1_06.png) bottom/100% 18px
      no-repeat,
    url(../../../assets/images/面板分解/1像素.png) 0 30px/100% calc(100% - 48px)
      no-repeat;
  color: #f9feff;
  opacity: 0.9;
  cursor: pointer;
  min-width: 2rem;
  .title {
    margin-left: 0.2rem;
    border-bottom: 2px solid #59b3ff;
    display: inline-block;
    font-size: 0.13rem;
    display: flex;
    flex-direction: row;
    p{
      width: 80%;
    }
  }
  .grid {
    width: 120px;
    margin: 15px 0px 0px 20px;
    label {
      height: 35px;
    }
  }
}
</style>
