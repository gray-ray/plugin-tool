export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/platform',
    name: '工作台',
    icon: 'crown',
    // access: 'canAdmin',
    component: './Platform',
  },
  {
    path: '/platform/setting',
    name: '配置工作台',
    layout: false,
    hideInMenu: true,
    // access: 'canAdmin',
    component: './Platform/platformSetting',
  },
  {
    path: '/',
    redirect: '/platform',
  },
  {
    component: './404',
  },
];
