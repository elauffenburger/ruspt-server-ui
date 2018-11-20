import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Bootstrap Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.min.css';

Vue.use(Buefy);

// Bootstrap Monaco editor
import './bootstrap-monaco';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
