import Router from "vue-router";
import Home from "./components/view/Home.vue";
import Index from "./components/view/Index.vue";
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/index",
      name: "index",
      component: Index
    }
  ]
});
