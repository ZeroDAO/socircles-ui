// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './theme/element-variables.scss'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts-gl'

import App from './App'

import router from './router';

Vue.use(ElementUI);
Vue.component('v-chart', ECharts)

let isLoad = false;

Vue.config.productionTip = false
/*
router.afterEach(function(to) {
    if (window.ga) {
        window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
        window.ga('send', 'pageview')
    }
})
*/

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    template: '<App/>',
    components: {
        App
    }
})
