import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import provider from './plugins/vue-apollo';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: provider,
  render: h => h(App),
}).$mount('#app');
