const routes = [
  {
    path: "/",
    component: () => import("layouts/Login.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/house-rules-list",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/house-rules-list",
        component: () => import("pages/HouseRulesListPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // {
  //   path: "/home",
  //   component: HomePage,
  // },
  // {
  //   path: "/house-rules",
  //   component: HouseRulesListPage,
  // },
  // {
  //   path: "/house-rules/:id",
  //   component: HouseRuleDetailsPage,
  // },
  // // ...
];

export default routes;
