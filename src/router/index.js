import Vue from 'vue'
import Router from 'vue-router'
import AnalyticCenter from '@/components/AnalyticCenter'
import FirstWarehouse from '@/components/FirstWarehouse'
import SecondWarehouse from '@/components/SecondWarehouse'
import MonitorMap from '@/components/MonitorMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/firstwarehouse',
    },
    {
      path: '/monitormap',
      component:()=>import('../components/MonitorMap'),
    },
    {
      path: '/analyticcenter',
      component:()=>import('../components/AnalyticCenter'),
    },
    {
      path: '/firstwarehouse',
      component:()=>import('../components/FirstWarehouse'),
    },
    {
      path: '/secondwarehouse/:bid',
      component:()=>import('../components/SecondWarehouse'),
      name:"wareDetail"
    },
    {
      path:'*',
      redirect:'/firstwarehouse'
    }
  ]
})
