import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { makeStore } from './store';
import services from './services';

// Bootstrap Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.min.css';

Vue.use(Buefy);

// Bootstrap Monaco editor
import bootstrapMonaco from './bootstrap-monaco';
bootstrapMonaco(services.logger);

// Bootstrap xterm.js
import './bootstrap-xterm';

// Bootstrap logging
import './bootstrap-logging';
import { loggers } from 'winston';

Vue.config.productionTip = false;

const store = makeStore({
  modules: {
    sandbox: {
      services: {
        logger: services.logger,
        rusptServerService: services.rusptServerService
      }
    }
  }
});

new Vue({
  router,
  store,
  logger: services.logger,
  render: (h) => h(App),
}).$mount('#app');
