import Vue from "vue";
import VueRouter from "vue-router";
import PairingView from "../views/PairingView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PairingView",
    component: PairingView
  }
];

const router = new VueRouter({
  routes
});

export default router;
