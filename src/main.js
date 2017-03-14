// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueTap from 'v-tap';

import App from './App';
import router from './router';
import EventBus from './plugins/event-bus';


// scss css
import './assets/scss/iconfont/iconfont.css';
import './assets/scss/common/reset.scss';
import './assets/scss/common/common.scss';

// 安装插件
Vue.use(vueTap);
Vue.use(EventBus);

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//     EventBus.emit('routerChange');
//     next();
// });

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
