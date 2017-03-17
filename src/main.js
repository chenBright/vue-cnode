// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueTap from 'v-tap';
import VueTimeago from 'vue-timeago';
import timeageLocale from 'vue-timeago/locales/zh-CN.json';

import App from './App';
import router from './router';
import EventBus from './plugins/event-bus';
import VueScroll from './plugins/vue-scroll';
import store from './vuex/store';


// scss css
import './assets/scss/iconfont/iconfont.css';
import './assets/scss/common/reset.scss';
import './assets/scss/common/common.scss';

// 安装插件
Vue.use(vueTap);
Vue.use(VueTimeago, {
    name: 'timeago',
    locale: 'zh-CN',
    locales: {
        'zh-CN': timeageLocale
    }
});
Vue.use(EventBus);
Vue.use(VueScroll);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
