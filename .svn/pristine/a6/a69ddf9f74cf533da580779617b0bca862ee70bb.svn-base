<template>
  <div class="search-root">
    <div class="title">
      高级查询
      <Icon type="ios-close-circle-outline" title="关闭" @click="close"/>
    </div>
    <div class="content">
      <div class="radio">
        查询数据
        <RadioGroup v-model="queryData">
          <Radio label="楼宇"></Radio>
          <Radio label="楼座"></Radio>
        </RadioGroup>
      </div>
      <div class="query">
        <Input
          search
          enter-button
          placeholder="输入查询名称"
          style="width: 200px"
          size="small"
          @on-search="searchBySql"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SceneSearch",
  data() {
    return {
      queryData: "楼宇",
      galleryConfig: config.threeDimensional.gallery,
      buildConfig: config.threeDimensional.build
    };
  },
  mounted() {},
  beforeDestroy() {
    Viewer.entities.removeAll();
  },
  methods: {
    close() {
      this.$emit("closeSceneSearch");
    },
    searchBySql(name) {
      if (name != "") {
        let param = {};
        if (this.queryData == "楼宇") {
          param = {
            url: this.buildConfig.url,
            datasource: this.buildConfig.queryParams.name,
            queryname: name,
            field: this.buildConfig.field
          };
        } else {
          param = {
            url: this.galleryConfig.url,
            datasource: this.galleryConfig.queryParams.name,
            queryname: name,
            field: this.galleryConfig.field
          };
        }
        this.queryBySql(param);
      } else {
        this.$Message.error("请输入楼宇/楼座名称进行查询！");
      }
    },
    queryBySql(param) {
      let self = this;
      let attribute = new SuperMap.QueryBySQLParameters({
        queryParams: {
          name: param.datasource,
          attributeFilter: param.field + " like '%" + param.queryname + "%'"
        }
      });
      L.supermap.queryService(param.url).queryBySQL(attribute, res => {
        if (res.result.currentCount) {
          self.addLayer(res);
        } else {
          self.$Message.info("查询无结果！");
        }
      });
    },
    addLayer(res) {
      Viewer.entities.removeAll();
      let data = res.result.recordsets[0].features;
      if (data.features.length) {
        data.features.map((feature, k) => {
          let polygons = feature.geometry.coordinates[0][0];
          let str = "[";
          polygons.forEach((polygon, i) => {
            let pointC = new Cesium.Cartesian3(polygon[0], polygon[1], 0);
            let pointCartographic = Viewer.scene.camera._projection.unproject(
              pointC
            );
            let pointCX = Cesium.Math.toDegrees(pointCartographic.longitude);
            let pointCY = Cesium.Math.toDegrees(pointCartographic.latitude);
            if (i == 0) {
              str += pointCX + "," + pointCY;
            } else {
              str += "," + pointCX + "," + pointCY;
            }
          });
          str += "]";
          let polygonArr = JSON.parse(str);
          Viewer.entities.add({
            name: feature.properties.楼宇名称 || "面",
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonArr),
              material: new Cesium.Color.fromCssColorString(
                "#FF0033"
              ).withAlpha(0.3)
            },
            clampToS3M: true // 贴在S3M模型表面
          });
        });
        Viewer.zoomTo(Viewer.entities);
      } else {
        this.$Message.error("暂无数据！");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.search-root {
  width: 240px;
  height: 110px;
  background: #2e4c68;
  color: #fff;
  border: 1px solid #028ccf;
  .title {
    padding: 5px 10px;
    border-bottom: 1px solid #fff;
    .ivu-icon-ios-close-circle-outline {
      font-size: 20px;
      float: right;
      margin-top: 1px;
      cursor: pointer;
    }
  }
  .content {
    padding: 0px 10px;
    font-size: 14px;
    .radio {
      height: 35px;
      line-height: 35px;
    }
    .query {
      height: 40px;
      line-height: 40px;
      button {
        margin-left: 5px;
      }
    }
  }
}
</style>