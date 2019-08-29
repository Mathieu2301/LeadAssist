import Vue from 'vue';
import Router from 'vue-router';
import io from 'socket.io-client';
import App from './app.vue';
import home from './vues/home.vue';
import game from './vues/game.vue';

Vue.config.productionTip = false;

Vue.use(Router);

const socket = io('https://cloud1.usp-3.fr:2180/');

Vue.prototype.events = {
  onData: data => data,
  set(func) {
    this.onData = func;
    socket.emit('fetch');
  },
};

socket.on('connect', () => {
  socket.on('data', data => Vue.prototype.events.onData(data));
});

new Vue({
  router: new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'LeadAssist',
        component: home,
      },
      {
        path: '/game/:gameid',
        name: 'Game',
        component: game,
      },

      { path: '*', redirect: '/' },
    ],
  }),
  render: h => h(App),
}).$mount('#app');
