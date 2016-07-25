import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { configRouter } from './router-config'
import { Lazyload } from 'mint-ui';

Vue.directive(Lazyload.name, Lazyload);
Vue.use(VueRouter)
Vue.use(VueResource)
const router = new VueRouter({
  hash: true,
  saveScrollPosition: true
})
// Indicator.open('加载中...');
//  var ind=Indicator
// window.Indicator=ind
configRouter(router)
const App = Vue.extend(require('./App.vue'))
router.start(App, 'app')
window.router = router
document.getElementById('loading').style.display = 'none';

