export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: '初始页面',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/demo',
        name: 'Demo',
        icon: 'smile',
        routes: [
          {
            path: '/demo/parent',
            name: '父组件-子组件传递',
            component: './Demo/Parent',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
