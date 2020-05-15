import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style.css';
// import './assets/css/hover.css';
// import './assets/css/hover.css.map';
import './assets/css/hover-min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
