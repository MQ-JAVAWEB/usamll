// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// store vuex模块
import store from "./store/index.js"

// element-ui UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 重置样式 reset.css
import "./assets/css/reset.css"

// 过滤器 filter
import Filters from "./filter/index.js"
for (let key in Filters) {
  Vue.filter(key,Filters[key])
}

// 公共组件 components
import Components from "./components/index.js"
for(let key in Components){
  Vue.component(key,Components[key])
}

Vue.prototype.$imgUrl = "http://localhost:3000"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
