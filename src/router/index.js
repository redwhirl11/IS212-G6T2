//declare route & path to be used internally
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/LJhome",
      name: "LJhome",
      component: () => import("../components/LJhome.vue"),
    }, 
    {
      path: "/editLJ",
      name: "editLJ",
      component: () => import("../components/editLJ.vue"),
    },
    {
      //wth is this
      path: "/createLJ",
      name: "createLJ",
      component: () => import("../components/createLJ.vue"),
    },{
      path: "/LJrole",
      name: "LJrole",
      component: () => import("../components/LJrole.vue"),
    },
    {
      path: "/hrHome",
      name: "hrHome",
      component: () => import("../views/hrHome.vue"),
    },
    {
      path: "/hrRole",
      name: "hrRole",
      component: () => import("../components/hrRole.vue"),
    },
    {
      path: "/hrCreateRole",
      name: "hrCreateRole",
      component: () => import("../components/hrCreateRole.vue"),
    },
    {
      path: "/hrEditRole",
      name: "hrEditRole",
      component: () => import("../components/hrEditRole.vue"),
    }
    ,
    {
      path: "/hrSkill",
      name: "hrSkill",
      component: () => import("../components/hrSkill.vue"),
    },
    {
      path: "/hrEditSkill",
      name: "hrEditSkill",
      component: () => import("../components/hrEditSkill.vue"),
    },
    {
      path: "/hrCreateSkill",
      name: "hrCreateSkill",
      component: () => import("../components/hrCreateSkill.vue"),
    }
  ],
});

export default router;
