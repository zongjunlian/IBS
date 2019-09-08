import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'babel-polyfill'
import $ from 'jquery'

Vue.config.productionTip = false

//注册自定义按钮  
import imgButton from './components/img-button'
Vue.use(imgButton)

//封装echarts
import MyCharts from './components/MyCharts'
Vue.use(MyCharts)

import WidthBarChart from './components/WidthBarChart'
Vue.use(WidthBarChart)

//注册删除组件  
import delModal from './components/delete'
Vue.use(delModal)

import imodal from './components/imodal'
Vue.use(imodal)

import MultiSelect from './components/MultiSelect'
Vue.use(MultiSelect)

import htmlPanel from './components/html-panel'
Vue.use(htmlPanel)

//时间组件
import DateGroup from './components/date-group'
Vue.use(DateGroup)

// Vue.use(VueRouter)
import common from './assets/css/common.less'
Vue.use(common)

//引用echarts
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
Vue.component('echarts', ECharts)

//vue-orgchart
import 'vue-orgchart/dist/style.min.css'
// import orgchart from 'vue-orgchart'
// Vue.use(orgchart)

//jointjs
window.$ = require('jquery')
window.joint = require('jointjs')

Vue.use(iView)

import VueSlimScroll from 'vue-slimscroll'
Vue.use(VueSlimScroll)

new Vue({
  router,
  store,
  beforeCreate () {
    Vue.prototype.bus = this
  },
  render: h => h(App)
}).$mount('#app')