import Vue from 'vue'
import Router from 'vue-router'
// import FirstWarehouse from '@/components/FirstWarehouse'
// import SecondWarehouse from '@/components/SecondWarehouse'
// import MonitorMap from '@/components/MonitorMap'
// import BaiduMap from '@/components/baiduMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/firstwarehouse',
    },
    {
      path: '/monitormap',
      component: resolve => require(['@/components/MonitorMap'], resolve)
    },
    {
      path: '/baidumap',
      component: resolve => require(['@/components/baiduMap'], resolve),
    },
    {
      path: '/firstwarehouse',
      component: resolve => require(['@/components/FirstWarehouse'], resolve),
      name:"firstwarehouse"
    },
    {
      path: '/secondwarehouse/:bid',
      component: resolve => require(['@/components/SecondWarehouse'], resolve),
      name:"wareDetail"
    },
    {
      path: '/trackMap',
      component: resolve => require(['@/components/trackMap'], resolve),
      name: "trackMap"
    },
    {
      path:'*',
      redirect:'/firstwarehouse'
    }
  ]
})
