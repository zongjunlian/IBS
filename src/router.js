import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/Main.vue'

Vue.use(Router)

export const routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login'),
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/login',
      children: [
        {
          path: '/accountList',
          name: 'accountList',
          meta: {
            fromTitle: 'accountList',
            title: '账户列表'
          },
          component: () => import('@/views/customservice/accountManage/accountList')
        },
        {
          path: '/openAccount',
          name: 'openAccount',
          meta: {
            fromTitle: 'accountList',
            title: '开户登记'
          },
          component: () => import('@/views/customservice/accountManage/openAccount')
        },
        {
          path: '/accountINF/:id/:applyNum/:serviceType',
          name: 'accountINF',
          meta: {
            fromTitle: 'accountList',
            title: '账户详情'
          },
          component: () => import('@/views/customservice/accountManage/accountInfo')
        },
        {
          path: '/editAccount/:id/:applyNum/:serviceType',
          name: 'editAccount',
          meta: {
            fromTitle: 'accountList',
            title: '账户信息修改'
          },
          component: () => import('@/views/customservice/accountManage/editAccount')
        },
        {
          path: '/reviewAccount/:id/:applyNum/',
          name: 'reviewAccount',
          meta: {
            fromTitle: 'accountList',
            title: '账户申请变更信息'
          },
          component: () => import('@/views/customservice/accountManage/reviewAccount')
        },
        {
          path: '/accountInfoList',
          name: 'accountInfoList',
          meta: {
            fromTitle: 'accountInfoList',
            title: '账户列表'
          },
          component: () => import('@/views/customservice/accountInfo/accountInfoList')
        },
        {
          path: '/accountInfo',
          name: 'accountInfo',
          meta: {
            fromTitle: 'accountInfoList',
            title: '账户信息查询'
          },
          component: () => import('@/views/customservice/accountInfo/accountInfo')
        },
        {
          path: '/announcementPush',
          name: 'announcementPush',
          meta: {
            fromTitle: 'announcementPush',
            title: '发布公告列表'
          },
          component: () => import('@/views/customservice/announcementPush')
        },
        {
          path: '/declarationManage',
          name: 'declarationManage',
          meta: {
            fromTitle: 'declarationManage',
            title: '账户申报信息列表'
          },
          component: () => import('@/views/customservice/accountDeclaration/declarationManage')
        },
        {
          path: '/declaraDetail',
          name: 'declaraDetail',
          meta: {
            fromTitle: 'declarationManage',
            title: '帐户申报详细信息'
          },
          component: () => import('@/views/customservice/accountDeclaration/declaraDetail')
        },
        {
          path: '/shutdownManage',
          name: 'shutdownManage',
          meta: {
            fromTitle: 'shutdownManage',
            twoTitle: 'shutdownManage',
            title: '停/复机状态列表'
          },
          component: () => import('@/views/customservice/shutdownManage/shutdownManage')
        },
        {
          path: '/historyList',
          name: 'historyList',
          meta: {
            fromTitle: 'shutdownManage',
            twoTitle: 'shutdownManage',
            title: '历史记录列表'
          },
          component: () => import('@/views/customservice/shutdownManage/historyList')
        },
        {
          path: '/orderShutdown',
          name: 'orderShutdown',
          meta: {
            fromTitle: 'shutdownManage',
            twoTitle: 'orderShutdown',
            title: '预约停/复机列表'
          },
          component: () => import('@/views/customservice/shutdownManage/orderShutdown')
        },
        {
          path: '/arrearsStandard',
          name: 'arrearsStandard',
          meta: {
            fromTitle: 'shutdownManage',
            twoTitle: 'arrearsStandard',
            title: '账户额度管理'
          },
          component: () => import('@/views/customservice/shutdownManage/arrearsStandard')
        },
        {
          path: '/sceneManage',
          name: 'sceneManage',
          meta: {
            fromTitle: 'sceneManage',
            twoTitle: 'sceneManage',
            title: '现场办理'
          },
          component: () => import('@/views/customservice/scene/sceneManage')
        },
        {
          path: '/sceneShutdown',
          name: 'sceneShutdown',
          meta: {
            fromTitle: 'sceneManage',
            twoTitle: 'sceneShutdown',
            title: '现场停复机'
          },
          component: () => import('@/views/customservice/scene/sceneShutdown')
        },
        {
          path: '/publicAccount',
          name: 'publicAccount',
          meta: {
            fromTitle: 'publicAccount',
            title: '公众号平台'
          },
          component: () => import('@/views/customservice/publicAccount')
        },
        {
          path: '/energy',
          name: 'energy',
          meta: {
            fromTitle: 'energy',
            twoTitle: 'energy',
            title: '采集器列表'
          },
          component: () => import('@/views/energyEnergyManage/deviceManage/energy')
        },
        {
          path: '/meterManage',
          name: 'meterManage',
          meta: {
            fromTitle: 'energy',
            twoTitle: 'meterManage',
            title: '计量仪表列表'
          },
          component: () => import('@/views/energyEnergyManage/deviceManage/meterManage')
        },
        {
          path: '/energyMonitor',
          name: 'energyMonitor',
          meta: {
            fromTitle: 'energyMonitor',
            twoTitle: 'energyMonitor',
            title: '能源站用能监测'
          },
          component: () => import('@/views/energyEnergyManage/energyMonitor/energyMonitor')
        },
        {
          path: '/equipmentList',
          name: 'equipmentList',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'equipmentList',
            title: '设备统计报表列表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/equipmentList')
        },
        {
          path: '/equipmentTemplate',
          name: 'equipmentTemplate',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'equipmentList',
            title: '统计报表模板列表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/equipmentTemplate')
        },
        {
          path: '/equipmentReport',
          name: 'equipmentReport',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'equipmentList',
            title: '设备统计报表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/equipmentReport')
        },
        {
          path: '/meterList',
          name: 'meterList',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'meterList',
            title: '监测数据统计报表列表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/meterList')
        },
        {
          path: '/meterTemplate',
          name: 'meterTemplate',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'meterList',
            title: '统计报表模板列表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/meterTemplate')
        },
        {
          path: '/meterReport',
          name: 'meterReport',
          meta: {
            fromTitle: 'equipmentList',
            twoTitle: 'meterList',
            title: '仪表监测数据统计报表'
          },
          component: () => import('@/views/energyEnergyManage/energyReport/meterReport')
        },
        {
          path: '/collector',
          name: 'collector',
          meta: {
            fromTitle: 'collector',
            twoTitle: 'collector',
            title: '采集器列表'
          },
          component: () => import('@/views/terminalControl/deviceManage/collector')
        },
        {
          path: '/metering',
          name: 'metering',
          meta: {
            fromTitle: 'collector',
            twoTitle: 'metering',
            title: '计量仪表列表'
          },
          component: () => import('@/views/terminalControl/deviceManage/metering')
        },
        {
          path: '/terminal',
          name: 'terminal',
          meta: {
            fromTitle: 'collector',
            twoTitle: 'terminal',
            title: '风机盘管设备列表'
          },
          component: () => import('@/views/terminalControl/deviceManage/terminal')
        },
        {
          path: '/setTerminal',
          name: 'setTerminal',
          meta: {
            fromTitle: 'collector',
            twoTitle: 'terminal',
            title: '风机盘管参数设置'
          },
          component: () => import('@/views/terminalControl/deviceManage/setTerminal')
        },
        {
          path: '/tempTerminal',
          name: 'tempTerminal',
          meta: {
            fromTitle: 'collector',
            twoTitle: 'terminal',
            title: '风机盘管模板列表'
          },
          component: () => import('@/views/terminalControl/deviceManage/tempTerminal')
        },
        {
          path: '/terminalRun',
          name: 'terminalRun',
          meta: {
            fromTitle: 'terminalRun',
            // twoTitle: 'terminalRun',
            title: '末端运行控制'
          },
          component: () => import('@/views/terminalControl/terminalRun')
        },
        {
          path: '/coldMonitor',
          name: 'coldMonitor',
          meta: {
            fromTitle: 'coldMonitor',
            twoTitle: 'coldMonitor',
            title: '用冷量检测'
          },
          component: () => import('@/views/terminalControl/terminalMonitor/coldMonitor')
        },
        {
          path: '/hotMonitor',
          name: 'hotMonitor',
          meta: {
            fromTitle: 'coldMonitor',
            twoTitle: 'hotMonitor',
            title: '用热量监测'
          },
          component: () => import('@/views/terminalControl/terminalMonitor/hotMonitor')
        },
        
        {
          path: '/terminalList',
          name: 'terminalList',
          meta: {
            fromTitle: 'terminalList',
            twoTitle: 'terminalList',
            title: '末端设备统计报表列表'
          },
          component: () => import('@/views/terminalControl/terminalReport/terminalList')
        },
        {
          path: '/terminalTemplate',
          name: 'terminalTemplate',
          meta: {
            fromTitle: 'terminalList',
            twoTitle: 'terminalList',
            title: '统计报表模板列表'
          },
          component: () => import('@/views/terminalControl/terminalReport/terminalTemplate')
        },
        {
          path: '/terminalReport',
          name: 'terminalReport',
          meta: {
            fromTitle: 'terminalList',
            twoTitle: 'terminalList',
            title: '风机盘管数据统计报表'
          },
          component: () => import('@/views/terminalControl/terminalReport/terminalReport')
        },
        //平台系统配置
        {
          path: '/tactics',
          name: 'tactics',
          meta: {
            // fromTitle: 'tactics',
            title: '平台系统配置'
          },
          component: () => import('@/views/tactics/tactics')
        },
        {
          path: '/home',
          name: 'home',
          meta: {
            // fromTitle: 'home',
            title: '首页'
          },
          component: () => import('@/views/home/home')
        },
        {
          path: '/alarm',
          name: 'alarm',
          meta: {
            // fromTitle: 'alarm',
            title: '应急及报警'
          },
          component: () => import('@/views/alarm/alarm')
        },
        {
          path: '/eneryRun',
          name: 'eneryRun',
          meta: {
            // fromTitle: 'daily',
            title: '能源站运行管理'
          },
          component: () => import('@/views/energyRunManage/eneryRun')
        },
        {
          path: '/analysis',
          name: 'analysis',
          meta: {
            // fromTitle: 'daily',
            title: '能源站能效分析'
          },
          component: () => import('@/views/energyAnalysis/analysis')
        },
        {
          path: '/operation',
          name: 'operation',
          meta: {
            // fromTitle: 'daily',
            title: '能源站运维管理'
          },
          component: () => import('@/views/operationManage/operation')
        },
      ]
    },
  ]
  const router = new Router({
    mode: 'hash',
    routes: routes
  })

  export default router
