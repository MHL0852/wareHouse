import Vue from 'vue'
import Router from 'vue-router'

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
      path: '/firstwarehouse',
      component:()=>import('../components/FirstWarehouse'),
      name:"firstwarehouse"
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
