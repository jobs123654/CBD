<template>
  <div :class="$style.root"></div>
</template>

<script>
import {
  Map,
  TileLayer,
  WMSTileLayer,
  Polygon,
  DistanceTool,
  AreaTool,
  Coordinate,
  Marker,
  VectorLayer,
  GeoJSON,
  Circle,
  Control,
} from "maptalks";
import { BigPointLayer, ExtrudePolygonLayer } from "maptalks.biglayer";
import { DataSet, MaptalksLayer } from "mapv";
import echarts from "echarts";
// import * as maptalks from "../../../public/js/maptalks.e3"
var drawLayer;
export default {
  props: {
    option: Object,
    baseLayer: Object,
    boundary: Object,
    mapOptions: Object,
    position: {
      type: String,
      default: "home"
    } //所在页面
  },
  data() {
    return {
      map: {},
      viewPoint: {},
      featureLayer: {},
      uimarkers: [],
      maskLayer: null,
      migrateLayer: null,
      drawTool: null
    };
  },
  computed: {
    features() {
      return this.$store.state.features;
    },
    buildings() {
      return this.$store.state.buildings;
    },
    currentList() {
      return this.$store.state.currentList;
    },
    secondCurrentList() {
      return this.$store.state.secondCurrentList;
    },
    maptype() {
      return this.$store.state.mapType;
    },
    migrate() {
      return this.$store.state.migrateObjDM;
    }
  },
  mounted() {

    this.option.baseLayer = new TileLayer("baseLayer", this.baseLayer);

    this.map = new Map(this.$el, this.option);
    // 加蒙版
    this.setMask();
    // 重新走配置定位
    this.map.animateTo({
      zoom: this.option.zoom,
      center: this.option.center
    });
    this.initDrawTool();
    EventBus.$on("drawQuery", this.drawQuery);
    EventBus.$on("drawShape", this.drawShape);
    EventBus.$on("clearSearchMap", this.clearSearchMap);
    EventBus.$on("mapPrint", this.mapPrint);





    // EventBus.$on("addLayerSwither", this.addLayerSwither);


    // let mask = new Polygon(this.boundary.geometry.coordinates, {
    //   symbol: {
    //     polygonFill: "#fff",
    //     polygonOpacity: 0.2,
    //     lineColor: "#1bbc9b"
    //   }
    // });
    // this.map.getBaseLayer().setMask(mask);
    // let maskLayer =
    //   this.map.getLayer("maskLayer") ||
    //   new VectorLayer("maskLayer").addTo(this.map);
    // mask.addTo(maskLayer);
    // let c = this.$store.state.viewPoint;
    // this.map.setCenter([c.x, c.y]);

    this.initControls();
    this.map.on("click", this.clickMap);
    this.map.on("viewchange", this.getMapView);


  },
  beforeDestroy() {
    EventBus.$off("drawQuery", this.drawQuery);
    EventBus.$off("drawShape", this.drawShape);
    EventBus.$off("clearSearchMap", this.clearSearchMap);
    EventBus.$off("mapPrint", this.mapPrint);
  },
  watch: {
    baseLayer() {
      let baseLayer = new TileLayer("baseLayer", this.baseLayer);
      this.map.setBaseLayer(baseLayer);
    },
    boundary() {
      this.setMask();
      this.clearData();

      if (this.maptype === "point") {
        this.initPointLayer();
      } else {
        this.initMapVLayer();
      }
    },
    features() {
      this.clearData();
      if (this.features.length > 0 && this.currentList.name == "综合分析") {
        if (this.secondCurrentList.name == "行业占比") {
          this.initEchartPieLayer();
        } else {
          // alert(this.$store.state.isShowBuildings)
          // if (!this.$store.state.isShowBuildings)
          this.initExtrudePolygonLayer();
        }
      } else if (this.maptype === "point") {
        this.features.map(this.initPointLayer);
      } else {
        this.initMapVLayer(
          this.features.reduce(
            (p, c) => {
              return { features: p.features.concat(c.features) };
            },
            { features: [] }
          )
        );
      }
      //....
      if (!this.map.getLayer("buildingLayer")) {
        new VectorLayer("buildingLayer").addTo(this.map);
      }
    },
    //企业迁徙
    migrate() {
      this.clearData();
      this.companyMigrate();
    },
    //地图类型
    maptype() {
      if (this.features.length > 0 && this.features[0].color) {
        this.clearData();
      } else {
        return;
      }
      if (this.maptype === "point") {
        this.features.map(this.initPointLayer);
        //  楼宇查询
      } else {
        this.initMapVLayer(
          this.features.reduce(
            (p, c) => {
              return { features: p.features.concat(c.features) };
            },
            { features: [] }
          )
        );
      }
    },
    mapOptions(val, oldVal) {
      if (val) {
        let baseLayer = new maptalks.TileLayer("baseLayer", val.baseLayer);
        this.map.setBaseLayer(baseLayer);
        this.map.animateTo({
          zoom: val.viewpoint.zoom,
          center: val.viewpoint.center,
          pitch: val.viewpoint.pitch,
          bearing: val.viewpoint.bearing
        });
      }
    },
    //显示楼宇
    buildings() {
      this.initBuildingLayer();
    }
  },
  methods: {
    getMapView(e) {
      let options = e.target._baseLayer.options;
      let val = {
        viewpoint: e.new,
        baseLayer: {
          urlTemplate: options.urlTemplate,
          repeatWorld: options.repeatWorld,
          tileSystem: options.tileSystem
        }
      };
      this.$store.commit("changeMapViewObj", val);
    },
    initControls: function () {
      /*初始化测距工具*/
      this.distanceTool = new DistanceTool({
        once: true,
        symbol: {
          lineColor: "#34495e",
          lineWidth: 2
        },
        vertexSymbol: {
          markerType: "ellipse",
          markerFill: "#1bbc9b",
          markerLineColor: "#000",
          markerLineWidth: 3,
          markerWidth: 10,
          markerHeight: 10
        },
        labelOptions: {
          textSymbol: {
            textFaceName: "monospace",
            textFill: "#fff",
            textLineSpacing: 1,
            textHorizontalAlignment: "right",
            textDx: 15,
            markerLineColor: "#b4b3b3",
            markerFill: "#000"
          },
          boxStyle: {
            padding: [6, 2],
            symbol: {
              markerType: "square",
              markerFill: "#000",
              markerFillOpacity: 0.9,
              markerLineColor: "#b4b3b3"
            }
          }
        },
        clearButtonSymbol: [
          {
            markerType: "square",
            markerFill: "#000",
            markerLineColor: "#b4b3b3",
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 20
          },
          {
            markerType: "x",
            markerWidth: 10,
            markerHeight: 10,
            markerLineColor: "#fff",
            markerDx: 20
          }
        ],
        language: "zh-CN"
      });
      /*初始化测面工具*/
      this.areaTool = new AreaTool({
        once: true,
        symbol: {
          lineColor: "#1bbc9b",
          lineWidth: 2,
          polygonFill: "#fff",
          polygonOpacity: 0.3
        },
        vertexSymbol: {
          markerType: "ellipse",
          markerFill: "#34495e",
          markerLineColor: "#1bbc9b",
          markerLineWidth: 3,
          markerWidth: 10,
          markerHeight: 10
        },
        labelOptions: {
          textSymbol: {
            textFaceName: "monospace",
            textFill: "#fff",
            textLineSpacing: 1,
            textHorizontalAlignment: "right",
            textDx: 15
          },
          boxStyle: {
            padding: [6, 2],
            symbol: {
              markerType: "square",
              markerFill: "#000",
              markerFillOpacity: 0.9,
              markerLineColor: "#b4b3b3"
            }
          }
        },
        clearButtonSymbol: [
          {
            markerType: "square",
            markerFill: "#000",
            markerLineColor: "#b4b3b3",
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 22
          },
          {
            markerType: "x",
            markerWidth: 10,
            markerHeight: 10,
            markerLineColor: "#fff",
            markerDx: 22
          }
        ],
        language: "zh-CN"
      });
    },
    setCenter: function (c) {
      this.map.setCenter(c);
    },
    setZoom: function (v) {
      this.map.setZoom(Math.ceil(v / 1000));
    },
    /*叠加地图*/
    overlayLayer: function (item) {
      let layer = new WMSTileLayer(item.id, {
        urlTemplate: item.urlTemplate,
        layers: item.id,
        crs: "EPSG:0",
        version: "1.3.0",
        format: "image/png",
        transparent: true,
        opacity: item.opacity,
        repeatWorld: false
      });

      this.map.addLayer(layer);
    },
    /*移除地图*/
    removeLayer(id) {
      var vectorLayer = this.map.getLayer(id);
      vectorLayer.getEChartsInstance &&
      vectorLayer.getEChartsInstance().clear();
      this.map.removeLayer(vectorLayer);
    },
    /*距离量算*/
    measureDistance: function () {
      this.distanceTool.addTo(this.map);
    },
    /*测面*/
    measureArea: function () {
      this.areaTool.addTo(this.map);
    },
    /*清除地图覆盖物*/
    clear: function () {
      if (drawLayer) {
        drawLayer.clear();
      }
      let allLayers = this.map.getLayers(e => true).map(e => e.getId());
      this.map.removeLayer(allLayers);
    },
    initPointLayer(geojson) {
      if (!geojson) return;
      let mask = new Polygon(this.boundary.geometry.coordinates);
      let symbol = {
        markerType: "ellipse",
        markerWidth: 10,
        markerHeight: 10,
        markerDx: 0,
        markerDy: 0,
        markerFill: geojson.color,
        markerLineOpacity: 0
      };
      let data = geojson.features.map(e => e.geometry.coordinates);

      var layer = new BigPointLayer("data" + geojson.name, data)
              .setStyle({
                filter: true,
                symbol: symbol
              })
              .addTo(this.map);
    },
    initBuildingLayer() {
      this.map.getLayer("data0") && this.map.removeLayer("data0");

      this.map.getLayer("extrudePolygonLayer") &&
        this.map.removeLayer("extrudePolygonLayer");
      this.map.getLayer("number") && this.map.removeLayer("number");
      this.map.getLayer("circle") && this.map.removeLayer("circle");
      this.removeCompanyMigrate();

      // this.map.getLayer("extrudePolygonLayer") &&
      //   this.map.removeLayer("extrudePolygonLayer");

      // this.map.removeLayer(
      //   this.map
      //     .getLayers(e => e.getId().indexOf("data") > -1)
      //     .map(e => e.getId())
      // );

      let symbol = {
        markerType: "ellipse",
        markerWidth: 10,
        markerHeight: 10,
        markerDx: 0,
        markerDy: 0,
        markerFill: "blue",
        markerLineOpacity: 0
      };
      let data = this.buildings.features.map(e => e.geometry.coordinates);

      var layer = new BigPointLayer("data0", data)
        .setStyle({
          filter: true,
          symbol: symbol
        })
        .addTo(this.map);
    },
    initMapVLayer(geojson) {
      let mask = new Polygon(this.boundary.geometry.coordinates);
      let data =
        geojson &&
        geojson.features.map(e => {
          return {
            geometry: e.geometry,
            count: 1
          };
        });
      let dataSet = new DataSet(data);
      let options = {
        fillStyle: "rgba(55, 50, 250, 0.8)",
        shadowColor: "rgba(255, 250, 50, 1)",
        shadowBlur: 20,
        max: 10,
        size: 30,
        label: {
          show: true,
          fillStyle: "white"
        },
        globalAlpha: 0.5,
        gradient: {
          0.25: "rgb(0,0,255)",
          0.55: "rgb(0,255,0)",
          0.85: "yellow",
          1.0: "rgb(255,0,0)"
        },
        draw: this.maptype
      };
      const mapvLayer = new MaptalksLayer("data", dataSet, options).addTo(
        this.map
      );
    },
    initExtrudePolygonLayer() {
      let that = this;
      var jiexiang17 = new maptalks.MultiPolygon(
        that.features[0].features.map(e => e.geometry.coordinates[0]),
        {
          visible: true,
          editable: true,
          cursor: null,
          shadowBlur: 0,
          shadowColor: "black",
          draggable: false,
          dragShadow: false, // display a shadow during dragging
          drawOnAxis: null, // force dragging stick on a axis, can be: x, y
          symbol: {
            lineColor: "#ff0",
            lineWidth: 2,
            polygonFill: "rgb(135,196,240)",
            polygonOpacity: 0.6
          }
        }
      );

      const jiexiang = new maptalks.VectorLayer("jiexiang", jiexiang17).addTo(
        that.map
      );

      /*this.map.getLayer("buildingLayer")
        ? this.map.getLayer("buildingLayer").remove()
        : new VectorLayer("buildingLayer", jiexiang17).addTo(this.map);*/

      const vector = new VectorLayer("number", {
        enableAltitude: true,
        altitudeProperty: "altitude"
      });

      const geometryForjiexiang = GeoJSON.toGeometry(that.features);

      const max = geometryForjiexiang.reduce(
              (p, c) =>
                      p > parseInt(c.properties[that.secondCurrentList.name])
                              ? p
                              : parseInt(c.properties[that.secondCurrentList.name]),
              0
      );
      const centerForjiexiang = geometryForjiexiang.map(e => {
        var height =
                (parseInt(e.properties[that.secondCurrentList.name]) * 1000) / max;

        var text = new Marker(Coordinate.toNumberArrays(e.getCenter()), {
          properties: {
            name: e.properties[that.secondCurrentList.name],
            altitude: height + 20
          },
          symbol: {
            textFaceName: "sans-serif",
            textName: "{name}", //value from name in geometry's properties
            textWeight: "normal", //'bold', 'bolder'
            textStyle: "normal", //'italic', 'oblique'
            textSize: 20,
            textFont: null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
            textFill: "#34495e",
            textOpacity: 1,
            textHaloFill: "#fff",
            textHaloRadius: 3,
            textWrapWidth: null,
            textWrapCharacter: "\n",
            textLineSpacing: 0,

            textDx: 0,
            textDy: 0,
            textHorizontalAlignment: "middle", //left | middle | right | auto
            textVerticalAlignment: "middle", // top | middle | bottom | auto
            textAlign: "center" //left | right | center | auto
          }
        }).addTo(vector);

        return new Circle(Coordinate.toNumberArrays(e.getCenter()), 200, {
          properties: {height: height}
        });
      });

      /*if (that.features[0].name === "buildings") {
        that.features.map(this.initPointLayer);
        return;
      }*/
      const v = new VectorLayer("circle", centerForjiexiang).addTo(that.map);

      const geoCircle = v.getGeometries().map(e => e.toGeoJSON());

      const buildingLayer = new ExtrudePolygonLayer(
              "extrudePolygonLayer",
              geoCircle,
              {
                forceRenderOnMoving: true,
                ambientLight: [0, 0, 0]
              }
      )
              .setStyle([{filter: true, symbol: {polygonFill: "#0ff"}}])
              .addTo(that.map);
      vector.addTo(that.map);
    },
    clearData() {
      if (drawLayer) {
        drawLayer.clear();
      }
      this.map.getLayer("data") && this.map.removeLayer("data");
      this.map.getLayer("number") && this.map.removeLayer("number");
      this.map.getLayer("circle") && this.map.removeLayer("circle");
      this.map.getLayer("jiexiang") && this.map.removeLayer("jiexiang");
      this.map.getLayer("data0") && this.map.removeLayer("data0");
      this.removeCompanyMigrate();

      this.map.getLayer("extrudePolygonLayer") &&
      this.map.removeLayer("extrudePolygonLayer");
      this.map.removeLayer(
              this.map
                      .getLayers(e => e.getId().indexOf("data") > -1)
                      .map(e => e.getId())
      );
      this.uimarkers.forEach(e => e.remove());
      this.uimarkers = [];
    },
    initEchartPieLayer() {
      var jiexiang17 = new maptalks.MultiPolygon(
              this.features[0].features.map(e => e.geometry.coordinates[0]),
              {
                visible: true,
                editable: true,
                cursor: null,
                shadowBlur: 0,
                shadowColor: "black",
                draggable: false,
                dragShadow: false, // display a shadow during dragging
                drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                symbol: {
                  lineColor: "#ff0",
                  lineWidth: 2,
                  polygonFill: "rgb(135,196,240)",
                  polygonOpacity: 0.6
                }
              }
      );
      const jiexiang = new maptalks.VectorLayer("jiexiang", jiexiang17).addTo(
              this.map
      );
      const geometryForjiexiang = GeoJSON.toGeometry(this.features);
      const centerForEcharts = geometryForjiexiang.map(e => {
        var chartDom = document.createElement("div");
        chartDom.style.cssText = "width:150px; height:150px;";
        createChart(chartDom, e.properties);
        var echartsUI = new maptalks.ui.UIMarker(
                maptalks.Coordinate.toNumberArrays(e.getCenter()),
                {
                  draggable: false,
                  content: chartDom
                }
        )
                .addTo(this.map)
                .show();

        this.uimarkers.push(echartsUI);

        // ECharts's chart creation
        function createChart(dom, properties) {
          var myChart = echarts.init(dom);
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: [
              "#f5222d",
              "#fa541c",
              "#fa8c16",
              "#faad14",
              "#fadb14",
              "#a0d911",
              "#52c41a"
            ],
            series: [
              {
                name: "企业行业占比",
                type: "pie",
                radius: [0, 50],
                center: ["50%", "50%"],
                roseType: "area",
                label: {
                  show: false
                },
                data: [
                  {
                    value: properties.商务和租赁服务业,
                    name: "商务和租赁服务业"
                  },
                  {value: properties.金融业, name: "金融业"},
                  {value: properties.批发和零售业, name: "批发和零售业"},
                  {value: properties.房地产业, name: "房地产业"},
                  {
                    value: properties.科学研究和技术服务业,
                    name: "科学研究和技术服务业"
                  },
                  {
                    value: properties.文化体育和娱乐业,
                    name: "文化体育和娱乐业"
                  },
                  {value: properties.其他, name: "其他"}
                ]
              }
            ]
          };
          myChart.setOption(option);
        }
      });
    },
    /* //task
    initBuildingLayer:function(){
      var jiexiang17 = new maptalks.MultiPolygon(
              this.features[0].features.map(e => e.geometry.coordinates[0]),
              {
                visible: true,
                editable: true,
                cursor: null,
                shadowBlur: 0,
                shadowColor: "black",
                draggable: false,
                dragShadow: false, // display a shadow during dragging
                drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                symbol: {
                  lineColor: "#ff0",
                  lineWidth: 2,
                  polygonFill: "rgb(135,196,240)",
                  polygonOpacity: 0.6
                }
              }
      );

      const jiexiang = new maptalks.VectorLayer("jiexiang", jiexiang17).addTo(
              this.map
      );
    },*/
    /*清除遮罩*/
    clearMaskLayer() {
      this.maskLayer && this.maskLayer.clear();
      let viewLayer =
              this.map.getLayer("viewLayer") ||
              new VectorLayer("viewLayer").addTo(this.map);
      viewLayer.clear();
    },
    setMask() {
      this.clearMaskLayer();
      const coordinates = this.boundary.geometry.coordinates.map(e => e);
      let viewLayer =
              this.map.getLayer("viewLayer") ||
              new VectorLayer("viewLayer").addTo(this.map);
      viewLayer.clear();
      this.map.fitExtent(
              new Polygon(coordinates, {
                symbol: {
                  polygonFill: "#fff",
                  polygonOpacity: 0,
                  lineColor: "#1bbc9b",
                  lineWidth: 5
                }
              })
                      .addTo(viewLayer)
                      .getExtent()
      );

      const {
        top,
        bottom,
        left,
        right
      } = this.option.spatialReference.fullExtent;
      coordinates.unshift([
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom],
        [left, bottom]
      ]);
      let mask = new Polygon(coordinates, {
        symbol: {
          polygonFill: "#fff",
          polygonOpacity: 0.5,
          lineColor: "#1bbc9b",
          lineWidth: 0
        }
      });
      this.maskLayer =
              this.map.getLayer("maskLayer") ||
              new VectorLayer("maskLayer").addTo(this.map);
      mask.addTo(this.maskLayer);
    },
    focus(c, n) {
      this.map.setCenter({
        x: c.x,
        y: c.y
      });
      this.map.setZoom(n);
    },
    setZoom(n) {
      this.map.setZoom(n);
    },
    /*企业迁徙*/
    companyMigrate() {
      let option = this.getCompanyMigrateOption();

      this.focus({x: 512947.14, y: 307836.72}, 2);
      if (!this.migrateLayer) {
        this.migrateLayer = new maptalks.E3Layer("企业迁徙", option).addTo(
                this.map
        );
      } else {
        /* if (this.migrateLayer.getEChartsOption()){
          this.migrateLayer.getEChartsInstance().clear();
        }else{
        }*/
        this.migrateLayer.show();
        this.migrateLayer.setEChartsOption(option);
      }
      console.log(this.map.getLayer("企业迁徙"));
    },
    removeCompanyMigrate() {
      this.migrateLayer && this.migrateLayer.getEChartsInstance().clear();
      this.migrateLayer && this.migrateLayer.hide();
    },
    /*企业迁徙echarts*/
    getCompanyMigrateOption() {
      let data = this.$store.state.migrateObjDM,
              geoCoordMap = {},
              color = data.color,
              series = [],
              path = data.style,
              objs = [];

      if (data.objs && data.objs.length > 0) {
        data.objs.forEach(function (item) {
          geoCoordMap[item[1]] = [item[3], item[4]];
          geoCoordMap[item[2]] = [item[5], item[6]];
          let p = [
            [
              {
                name: item[1]
              },
              {
                name: item[2],
                value: item[7]
              }
            ]
          ];

          objs.push([item[1], p]);
        });

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];

            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
              });
            }
          }
          return res;
        };
        objs.forEach(function (item, i) {
          series.push(
                  {
                    name: item[0],
                    type: "lines",
                    zlevel: 1,
                    effect: {
                      show: true,
                      period: 6,
                      trailLength: 0.7,
                      color: "#fff",
                      symbolSize: 3
                    },
                    lineStyle: {
                      normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                      }
                    },
                    data: convertData(item[1])
                  },
                  {
                    name: item[0],
                    type: "lines",
                    zlevel: 2,
                    effect: {
                      show: true,
                      period: 6,
                      trailLength: 0,
                      symbol: path,
                      symbolSize: 20
                    },
                    lineStyle: {
                      normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                      }
                    },
                    data: convertData(item[1])
                  },
                  {
                    name: item[0],
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    zlevel: 2,
                    rippleEffect: {
                      brushType: "stroke"
                    },
                    label: {
                      normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}"
                      }
                    },
                    symbolSize: function (val) {
                      return val[2] / 8;
                    },
                    itemStyle: {
                      normal: {
                        color: color[i]
                      }
                    },
                    data: item[1].map(function (dataItem) {
                      return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([
                          dataItem[1].value
                        ])
                      };
                    })
                  }
          );
        });
        return {
          tooltip: {
            trigger: "item"
          },
          series: series
        };
      }
    },
    //查询楼宇分布
    queryBuildingDistribution(polygon) {
      let url = config.resourceList[1].map_url;
      let layerName = `LY_CBD@CBDGIS`;

      // var geometryParam = new SuperMap.QueryByGeometryParameters({
      //   datasetNames: this.option.datasetNames,
      //   geometry: polygon,
      //   spatialQueryMode: "INTERSECT", // 相交空间查询模式
      //   fromIndex: 0,
      //   toIndex: 10000,
      //   customParams: {
      //     color: "red"
      //   }
      // });

      let param = new SuperMap.QueryByGeometryParameters({
        geometry: polygon,
        queryParams: new SuperMap.FilterParameter({
          name: layerName,
          // joinItems: [joinItem],
          // fields: fields,
          attributeFilter: "1=1"
        })
      });

      // 创建任意几何范围查询实例 getFeaturesByGeometry
      L.supermap.queryService(url).queryByGeometry(
              param,
              function (serviceResult) {
                // 获取服务器返回的结果
                if (!serviceResult.result) {
                  return;
                }

                this.$store.commit("clearBuildingFeature");
                let geojson = serviceResult.result.recordsets[0].features;
                geojson.color = "red";
                geojson.name = "buildings";
                this.$store.commit("setBuildings", geojson);

                // this.$store.commit("setBuildings", featuers);

                //         this.$store.commit('setFeatures',{
                //           name: "楼宇",
                //           color: "#DC143C",
                //           features:featuers
                //         });
              }.bind(this)
      );
    },
    queryBuildings(e) {
      let pl = null;
      let viewLayer = this.map.getLayer("buildingLayer"); //&&this.map.removeLayer("buildingLayer")
      this.features[0].features.forEach(
              function (i) {
                const coordinates = i.geometry.coordinates[0].map(e => e);
                pl = new Polygon(coordinates, {
                  symbol: {
                    polygonFill: "#fff",
                    polygonOpacity: 0,
                    lineColor: "#fff",
                    lineWidth: 0
                  }
                });
                viewLayer.addGeometry(pl);

                if (pl.containsPoint(e.coordinate)) {
                  this.queryBuildingDistribution(pl);
                  return;
                }
              }.bind(this)
      );

      // let t = this;
      // let s = this.$store.state.isShowBuildings;
      //
      //
      // if (!s) {
      //   return;
      // }
      // let viewLayer = new VectorLayer("buildingLayer").addTo(this.map);
      // const coordinates = this.boundary.geometry.coordinates.map(e => e);
      // let polygon = new Polygon(coordinates, {
      //   symbol: {
      //     polygonFill: "#fff",
      //     polygonOpacity: 0,
      //     lineColor: "#1bbc9b",
      //     lineWidth: 5
      //   }
      // }).addTo(viewLayer);
      // this.queryBuildingDistribution(polygon);
      // this.$store.commit("showBuildings", false);
    },

    clickMap(e) {
      if (
              this.$store.state.currentList.name == "综合分析" &&
              this.$store.state.isShowBuildings
      ) {
        this.queryBuildings(e);
      }
      let c = [];
      this.map.identify(
              {
                coordinate: e.coordinate,
                layers: this.map.getLayers(e => e.identify)
              },
              geos => {
                if (geos.length > 0) {
                  this.$store.dispatch("clickMap", geos[0]);
                }
              }
      );
    },
    drawQuery(res) {
      this.clearData();
      this.initPointLayer(res);
    },
    drawShape(shape) {
      this.drawTool.setMode(shape).enable();
    },

    initDrawTool() {
      drawLayer = new maptalks.VectorLayer("vector").addTo(this.map);
      this.drawTool = new maptalks.DrawTool({
        mode: "Point"
      })
              .addTo(this.map)
              .disable();


      this.drawTool.on("drawend", function (param) {
        EventBus.$emit("drawFinish", param);
        drawLayer.clear();
        drawLayer.addGeometry(param.geometry);
        this.disable();
      });
    },
    clearSearchMap() {
      this.clearData();
    },
    //  平移
    panMap() {
      this.drawTool && this.drawTool.disable();
      this.areaTool && this.areaTool.disable();
      this.distanceTool && this.distanceTool.disable();
      //取消地图点击事件
      // this.map.off("viewchange", this.getMapView);
      // this.map.off("click", this.clickMap);
    },
    //  全幅
    fullMap() {
      this.map.setZoom(1);
      this.map.setCenter({
        x:508925.06,
        y:305125.97
      })
    },
    //添加图层管理器
    addLayerSwither(){
      if (this.layerswither ) {
        this.map.removeControl(this.layerswither )
      }else{
      this.layerswither = new  Layerswither({
          position : {'top': '0', 'right': '0'}
        }).addTo(this.map);
      }
    },
    mapPrint() {
      let self = this;
      let content = document.getElementsByClassName("maptalks-canvas-layer")[0];
      html2canvas(content, {
        useCORS: true
      }).then(canvas => {
        let self = this
        let printWindow = window.open("")
        let strHeader = '<!DOCTYPE html><html lang="zh" dir="ltr"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"><title>地图打印</title></head>'
        let strScript = '<script type="text/javascript">'+ '\n' +'function printDiv(){var newuiPrint = document.getElementsByClassName("newuiPrint")[0];newuiPrint.style.display = "none";window.print();newuiPrint.style.display = "block";}<\/script>'
        let strBody = '<body><div class="print-header"><div id="superft"><div class="printClose"><input type="button" class="newuiPrint" onclick="printDiv()" value="打印"></div></div></div><div id="printMap"></div></body></html>'
        let strHTML = strHeader + strScript + strBody
        printWindow.document.write(strHTML)
        printWindow.document.getElementById("printMap").appendChild(canvas);
        printWindow.document.close();
      });
    }
  },
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
}
</style>
