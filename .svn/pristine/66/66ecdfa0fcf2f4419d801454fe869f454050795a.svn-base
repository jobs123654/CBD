<template>
  <transition name="slide-fade-left">
    <div :class="$style.root" @click="hideSecondMenue">
      <div :class="active==8?$style.height:$style.normal" @click="showGridMenu()">
        <span>区划网格</span>
      </div>
      <div
        v-for="(item,i) in menu"
        :class="active==i?$style.height:$style.normal"
        :key="i"
        @click="showChildrenList(item,i)"
      >
        <span>{{item.name}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShowGrid: true,
      isdbclick: false,
      active: null
    };
  },
  props: {
    menu: Array
  },

  methods: {
    showChildrenList(item, i) {
      // alert(this.menu.length)
      // this.$store.commit("setInfoBoxData", {});

      // if (this.isdbclick) {
      //   this.$store.commit("setCurrentList", {});
      //   this.isdbclick = false;
      // } else {
      //
      //   this.$store.commit("setCurrentList", item);
      //   this.$emit("showGridMenu", false);
      //   this.isdbclick = true;
      //   if (item.name == "综合分析") {
      //     this.$store.dispatch("getAnalysisData");
      //   }
      // }

      this.$store.commit("setCurrentList", item);
      this.$emit("showGridMenu", false);
      if (item.name == "综合分析") {
        this.$store.dispatch("getAnalysisData");
      }
      this.active = i;
    },
    showGridMenu() {
      this.$store.commit("setCurrentList", {});
      this.$emit("showGridMenu", this.isShowGrid);
      // this.isShowGrid = !this.isShowGrid;
      this.active = 8;
    },
    //隐藏分析面板

    hideSecondMenue() {
      let o = this.$parent.$refs.CBDAnalysis;
      if (o) {
        o.visible = false;
      }
    }
  }
};
</script>

<style lang="scss" module>
.root {
  /*.item {
    width: 1.5rem;
    height: 0.49rem;
    margin: 0.1rem;
    font-size: 0.16rem;
    padding: 0.12rem 0 0 0.45rem;
    color: #f9feff;
    opacity: 0.9;
    cursor: pointer;

    background-size: 100% 100%;
    background: url(../../assets/images/企业分析.png) top/100% 100% ;
  }*/
  /*.item:nth-child(1) {*/
  /*background: url(../../assets/images/基础设施.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(2) {*/
  /*background: url(../../assets/images/综合分析.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(3) {*/
  /*background: url(../../assets/images/楼宇分析.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(4) {*/
  /*background: url(../../assets/images/企业分析.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(5) {*/
  /*background: url(../../assets/images/信用分析.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(6) {*/
  /*background: url(../../assets/images/信用分析.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  /*.item:nth-child(7) {*/
  /*background: url(../../assets/images/基础设施.png);*/
  /*background-size: 100% 100%;*/
  /*}*/
  @mixin style() {
    width: 1.5rem;
    height: 0.49rem;
    margin: 0.1rem;
    font-size: 0.16rem;
    padding: 0.12rem 0 0 0.45rem;
    color: #f9feff;
    opacity: 0.9;
    cursor: pointer;
  }
  .normal {
    @include style;
    background-size: 100% 100%;
    background: url("../../assets/images/企业分析.png") top/100% 100%;
  }
  .height {
    @include style;
    background: url("../../assets/images/企业分析@.png") top/100% 100%;
    background-size: 100% 100%;
  }
}
</style>
<style lang="scss">
.slide-fade-left-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-left-enter, .slide-fade-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
