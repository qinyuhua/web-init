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
          {
            path: '/demo/promiseDemo',
            name: 'Promise 学习',
            component: './Demo/PromiseDemo',
          },
          {
            path: '/demo/reactDemo',
            name: 'React 学习',
            component: './Demo/ReactDemo',
          },
          {
            path: '/demo/htmlCss',
            name: 'HtmlCss学习',
            component: './Demo/HtmlCss',
          },
        ],
      },
      {
        path: '/center',
        name: '配置中心',
        icon: 'setting',
        routes: [
          {
            path: 'center/account',
            name: '账号管理',
            component: './ManageCenter/AccountManager',
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
