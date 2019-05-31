// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'


Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  data:{
    isLoading: true
  },
  template: '<App/>'
})
