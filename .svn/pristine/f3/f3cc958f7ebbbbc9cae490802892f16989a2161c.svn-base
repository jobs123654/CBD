<template>
  <div class="link-map"></div>
</template>

<script>
export default {
  name: "LinkMap",
  props: {
    sceneBounds: Object,
    isLink: Boolean
  },
  watch: {
    sceneBounds: {
      handler(val, oldVal) {
        this.changeMapBounds(val);
      },
      deep: true
    }
  },
  data() {
    return {
      mapConfig: config.map,
      mapBaseLayerConfig: config.baseLayer,
      map: null
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.map = null;
    self.map.off("viewchange", self.viewChange);
    self.map.off("moving", self.moving);
  },
  methods: {
    init() {
      let self = this;
      self.mapConfig.baseLayer = new maptalks.TileLayer(
        "linkbase",
        self.mapBaseLayerConfig
      );
      self.map = new maptalks.Map(this.$el, self.mapConfig);
      // 视口监听
      self.map.on("viewchange", self.viewChange);
      // 移动监听
      self.map.on("moving", self.moving);
    },
    viewChange(e) {
      if (!this.isLink) {
        let bounds = this.map.getExtent();
        let points = {
          center: e.new.center,
          pitch: e.new.pitch,
          heading: e.new.bearing,
          bounds: bounds,
          type: e.type
        };
        this.$emit("changeMap", points);
      }
    },
    moving(e) {
      if (!this.isLink) {
        let points = {
          center: e.coordinate,
          type: e.type
        };
        this.$emit("changeMap", points);
      }
    },
    changeMapBounds(bounds) {
      let extent = new maptalks.Extent(bounds);
      this.map.fitExtent(extent);
    }
  }
};
</script>

<style lang='scss' scoped>
.link-map {
  width: 100%;
  height: 100%;
}
</style>