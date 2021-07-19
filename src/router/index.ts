import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home/Home.vue"),
  },
  {
    path: "/watch",
    name: "Watch",
    component: () =>
      import(/* webpackChunkName: "watch" */ "../views/Watch/Watch.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
