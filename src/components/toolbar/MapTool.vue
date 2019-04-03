<template>
  <ul :class="$style.root" v-show="visible">
    <li :class="$style.item" @click="measureDistance" title="量距">
      <img src="../../assets/images/工具/量距.png" alt>
    </li>
    <li :class="$style.item" @click="measureArea" title="量面">
      <img src="../../assets/images/工具/量面.png" alt>
    </li>
    <li :class="$style.item" @click="clear" title="删除">
      <img src="../../assets/images/工具/删除.png" alt>
    </li>
    <li :class="$style.search" @click="openSearch" title="高级查询">
      <Icon type="ios-search"/>
    </li>
    <li :class="$style.search" @click="panMap" title="平移">
      <Icon type="ios-hand"/>
    </li>
    <li :class="$style.search" @click="fullMap" title="全幅">
      <Icon type="ios-expand"/>
    </li>
    <li :class="$style.search" @click="fullScreen" title="全屏">
      <Icon type="ios-albums-outline"/>
    </li>
    <li :class="$style.search" @click="print" title="截图打印">
      <Icon type="md-print"/>
    </li>
    <FullWindow></FullWindow>
  </ul>
</template>

<script>
import FullWindow from "./../common/FullWindow"
export default {
  name: "MapTool",
  data() {
    return {
      visible: true,
      map: this.$parent.$refs.map
    };
  },
  components: {
    FullWindow
  },
  methods: {
    measureDistance() {
      this.map.measureDistance();
    },
    measureArea() {
      this.map.measureArea();
    },
    clear() {
      this.map.clear();
    },
    openSearch() {
      this.$emit("openSearch");
    },
    print() {
      EventBus.$emit("mapPrint");
    },
    //平移
    panMap(){
      this.map.panMap();
      // e.style.cursor='hand'
    },
    fullMap(){
      this.map.fullMap();
    },
    fullScreen(){
      EventBus.$emit("fullScreen")
    },
    addLayerSwither(){
      this.map.addLayerSwither()
    }
  }
};
</script>

<style lang="scss" module>
.root {
  padding: 0.05rem;
  background: url(../../assets/images/工具面板.png) center/100% 100%;
  color: #ffffff;
  border: 1px solid #3260bd;
  font-size: 12px;
  text-align: center;

  .item {
    list-style: none;
    cursor: pointer;
  }
  .search {
    list-style: none;
    cursor: pointer;
    font-size: 20px;
    margin-top: -9px;
  }
}
</style>
