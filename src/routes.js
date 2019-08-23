import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '/',
      name: '',
      redirect:'/login',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
      name: '',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/404',
      component: () => import('@/components/404.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/home',
      component: () => import('@/components/Home.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/prj001',
      component: () => import('@/components/prj001/Prj001.vue'),
      name: 'Prj001',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj001/table',
          name: '数据列表',
          component: () => import('@/components/prj001/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj001/echarts',
          name: '数据分析',
          component: () => import('@/components/prj001/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        },
        { path: '/prj001/about',
          name: '关于',
          component: () => import('@/components/prj001/pages/About.vue'),
          iconCls: 'fa fa-id-card-o',
          leaf: false
        }
      ]
    },
    {
      path: '/prj002',
      component: () => import('@/components/prj002/Prj002.vue'),
      name: 'Prj002',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj002/table',
          name: '数据列表',
          component: () => import('@/components/prj002/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj002/echarts',
          name: '数据分析',
          component: () => import('@/components/prj002/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        },
        { path: '/prj002/vuex',
          name: 'Vuex',
          component: () => import('@/components/prj002/pages/Vuex.vue'),
          iconCls: 'fa fa-id-card-o',
          leaf: false
        }
      ]
    },
    {
      path: '/prj003',
      component: () => import('@/components/prj003/Prj003.vue'),
      name: 'Prj003',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj003/table',
          name: '数据列表',
          component: () => import('@/components/prj003/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj003/echarts',
          name: '数据分析',
          component: () => import('@/components/prj003/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        },
        { path: '/prj003/vuex',
          name: 'Vuex',
          component: () => import('@/components/prj003/pages/Vuex.vue'),
          iconCls: 'fa fa-id-card-o',
          leaf: false
        }
      ]
    },
  ]
})
