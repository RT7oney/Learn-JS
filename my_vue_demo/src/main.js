/**
 * 主程序文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCarbon from 'vue-carbon'
import layer from './assets/js/layer'
import echarts from "echarts"
import 'vue-carbon/dist/vue-carbon.css' // 加载文件

Vue.use(VueCarbon)
var App = Vue.use(VueRouter).extend({})
var router = new VueRouter()

/**
 * 全局方法
 */
window.layer = layer
/**
 * 路由定义
 */
router.map({
  // 主页
  '/': {
    title: '主页',
    component(resolve) {
      require(['./components/App.vue'], resolve)
    },
  },
  '/xiaohu': {
    title: 'xiaohu',
    component(resolve) {
      require(['./components/demo/XiaoHu.vue'], resolve)
    },
  },
  '/echart': {
    title: 'Echart 测试',
    component(resolve) {
      require(['./components/demo/Chart.vue'], resolve)
    },
  },
})


router.start(App, '#app')
