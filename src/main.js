import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css";
import router from "./router";
import L from "leaflet";
import "./../public/libs/iclient9-leaflet.js";

Vue.config.productionTip = false;

//全局事件总线
window.EventBus = new Vue();
Vue.use(iView);
Vue.use(Router);
Vue.use(L);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
