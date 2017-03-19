// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import vueTap from 'v-tap';
import VueTimeago from 'vue-timeago';
import timeageLocale from 'vue-timeago/locales/zh-CN.json';

import App from './App';
import router from './router';
import EventBus from './plugins/event-bus';
import VueScroll from './plugins/vue-scroll';
import store from './vuex/index';


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

sync(store, router);

Vue.config.productionTip = false;


// 处理刷新的时候vuex被清空但是用户已经登录的情况
const user = window.sessionStorage.user;
if (user) {
    store.dispatch('setUserInfo', JSON.parse(user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.userInfo.userInfo.userId) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
