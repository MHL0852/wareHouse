import Vue from 'vue'
import Router from 'vue-router'
import FirstWarehouse from '@/components/FirstWarehouse'
import SecondWarehouse from '@/components/SecondWarehouse'
import MonitorMap from '@/components/MonitorMap'
import BaiduMap from '@/components/baiduMap'
import trackMap from '@/components/trackMap'
import orderDetail from '@/components/orderDetail/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/firstwarehouse',
    },
    {
      path: '/monitormap',
      component: MonitorMap
    },
    {
      path: '/baidumap',
      component: BaiduMap
    },
    {
      path: '/firstwarehouse',
      component: FirstWarehouse,
      name:"firstwarehouse"
    },
    {
      path: '/secondwarehouse/:bid',
      component: SecondWarehouse,
      name:"wareDetail"
    },
    {
      path: '/trackMap',
      component: trackMap,
      name: "trackMap"
    },
    {
      path: '/orderDetail/:unikey/:id',
      component: orderDetail,
      name: "orderDetail"
    },
    {
      path:'*',
      redirect:'/firstwarehouse'
    }
  ]
})
