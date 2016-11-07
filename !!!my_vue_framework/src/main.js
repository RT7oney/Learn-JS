/**
 * 主程序文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueCarbon from 'vue-carbon'
import layer from './assets/js/layer'
// import 'vue-carbon/dist/vue-carbon.css' // 加载文件
import './assets/css/xiaohu.css'

// Vue.use(VueCarbon)
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
  '/xiaohu': {
    title: 'xiaohu',
    component(resolve) {
      require(['./components/XiaoHu.vue'], resolve)
    },
  },
    '/draw': {
    title: 'draw',
    component(resolve) {
      require(['./components/Draw.vue'], resolve)
    },
  },
})


router.start(App, '#app')

