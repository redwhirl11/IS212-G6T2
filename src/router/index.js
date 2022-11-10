//declare route & path to be used internally
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/UserLogin.vue"),
    }, 
    {
      path: "/LJhome",
      name: "LJhome",
      component: () => import("../views/LJhome.vue"),
    }, 
    {
      path: "/editLJ",
      name: "editLJ",
      component: () => import("../views/editLJ.vue"),
    },
    {
      path: "/createLJ",
      name: "createLJ",
      component: () => import("../views/createLJ.vue"),
    },{
      path: "/LJrole",
      name: "LJrole",
      component: () => import("../views/LJrole.vue"),
    },
    {
      path: "/hrHome",
      name: "hrHome",
      component: () => import("../views/hrHome.vue"),
    },
    {
      path: "/hrRole",
      name: "hrRole",
      component: () => import("../views/hrRole.vue"),
    },
    {
      path: "/hrCreateRole",
      name: "hrCreateRole",
      component: () => import("../views/hrCreateRole.vue"),
    },
    {
      path: "/hrEditRole",
      name: "hrEditRole",
      component: () => import("../views/hrEditRole.vue"),
    }
    ,
    {
      path: "/hrSkill",
      name: "hrSkill",
      component: () => import("../views/hrSkill.vue"),
    },
    {
      path: "/hrEditSkill",
      name: "hrEditSkill",
      component: () => import("../views/hrEditSkill.vue"),
    },
    {
      path: "/hrCreateSkill",
      name: "hrCreateSkill",
      component: () => import("../views/hrCreateSkill.vue"),
    },
    {
      path: "/hrEditDeletedRole",
      name: "hrEditDeletedRole",
      component: () => import("../views/hrEditDeletedRole.vue"),
    },
    {
      path: "/hrEditDeletedSkill",
      name: "hrEditDeletedSkill",
      component: () => import("../views/hrEditDeletedSkill.vue"),
    }
  ],
});

export default router;
