import Vue from 'vue';
import Router from 'vue-router';
import index from '../views/index';
import list from '../views/list';
import topic from '../views/topic';
import login from '../views/login';
import newTopic from '../views/newTopic';
import user from '../views/user';
import message from '../views/message';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: index,
        meta: {
            appTitle: '首页'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: list,
        meta: {
            appTitle: {
                all: '全部',
                good: '精华',
                ask: '问答',
                job: '招聘'
            }
        }
    },
    {
        path: '/topic/:id',
        name: 'topic',
        component: topic,
        meta: {
            appTitle: '主题'
        }
    },
    {
        path: '/user/:userName',
        name: 'user',
        component: user,
        meta: {
            appTitle: '用户信息'
        }
    },
    {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
            appTitle: '消息',
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            appTitle: '登录'
        }
    },
    {
        path: '/newTopic',
        name: 'newTopic',
        component: newTopic,
        meta: {
            appTitle: '新增主题',
            requiresAuth: true
        }
    }]
});
