<template>
  <div class="scene">
    <CesiumScene @startQuery="startSceneQuery" ></CesiumScene>
    <SceneBar class="scene-bar" v-if="showSceneBar"></SceneBar>
    <SceneTree v-if="showSceneTree" class="scene-tree"></SceneTree>
    <GalleryQuery v-if="isGallery" @queryLZdata="getLZdata"></GalleryQuery>
    <InfoBox class="info-box" :infoData="galleryData" v-if="galleryData && isGallery"></InfoBox>
    <SceneSearch class="scene-search" v-if="isSearch" @closeSceneSearch="closeSceneSearch"></SceneSearch>
  </div>
</template>

<script>
import CesiumScene from "./CesiumScene";
import SceneBar from "./sceneTool/SceneBar";
import SceneTree from "./resourceTree/SceneTree";
import GalleryQuery from "./sceneTool/GalleryQuery";
import InfoBox from "./../common/InfoBox";
import SceneSearch from "./sceneTool/SceneSearch";
export default {
  name: "Scene",
  data() {
    return {
      isGallery: false,
      galleryData: null,
      showSceneBar: false,
      showSceneTree: false,
      isSearch: false
    };
  },
  components: {
    CesiumScene,
    SceneBar,
    SceneTree,
    GalleryQuery,
    InfoBox,
    SceneSearch
  },
  mounted() {
    this.showPanel();
    EventBus.$on("openSceneSearch", this.openSceneSearch);
  },
  beforeDestroy() {
    EventBus.$off("openSceneSearch", this.openSceneSearch);
  },
  methods: {
    showPanel() {
      this.showSceneBar = true;
      this.showSceneTree = true;
    },
    getLZdata(data) {
      this.galleryData = data;
    },
    startSceneQuery(bool) {
      this.isGallery = bool;
      this.galleryData = null;
      if (Viewer) {
        Viewer.entities.removeAll();
      }
    },
    openSceneSearch() {
      this.isSearch = !this.isSearch;
    },
    closeSceneSearch() {
      this.isSearch = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.scene {
  width: 100%;
  height: 100%;
  .scene-bar {
    position: absolute;
    top: 0.6rem;
    right: 0.16rem;
    z-index: 1000;
  }

  .scene-search {
    position: absolute;
    top: 1.1rem;
    right: 0.16rem;
    z-index: 1000;
  }

}
</style>
