<template>
  <div class="root">
    <div class="item" @click="dropFly">
      <Icon type="ios-jet"/>场景飞行
    </div>
    <div class="item" @click="dropMeasure">
      <img src="../../../assets/images/工具箱.png" style="vertical-align: middle">工具箱
    </div>

    <SceneMeasure v-show="showMeasure" @closeMeasure="closeMeasure"></SceneMeasure>
    <SceneFly v-if="showFly" @closeFly="closeFly"></SceneFly>
  </div>
</template>

<script>
import SceneMeasure from "./SceneMeasure";
import SceneFly from "./SceneFly";
export default {
  name: "SceneBar",
  data() {
    return {
      showMeasure: false,
      showFly: false
    };
  },
  mounted() {
    EventBus.$on("openSceneSearch", this.openSceneSearch);
  },
  beforeDestroy() {
    EventBus.$off("openSceneSearch", this.openSceneSearch);
  },
  components: {
    SceneMeasure,
    SceneFly
  },
  methods: {
    dropMeasure() {
      this.showMeasure = !this.showMeasure;
    },
    closeMeasure() {
      this.showMeasure = false;
    },
    dropFly() {
      this.showFly = !this.showFly;
    },
    closeFly() {
      this.showFly = false;
    },
    openSceneSearch() {
      this.showMeasure = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.root {
  background: url(../../../assets/images/工具背景.png) center/100% 100%;
  color: #ffffff;
  display: flex;
  font-size: 0.14rem;
  .item {
    padding: 0 0.2rem;
    line-height: 0.4rem;
    background: url(../../../assets/images/面板间隔.png) right/1px 80% no-repeat;
    cursor: pointer;
  }
}
</style>
