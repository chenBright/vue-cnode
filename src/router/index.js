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
        component: index
    },
    {
        path: '/list',
        name: 'list',
        component: list
    },
    {
        path: '/topic',
        name: 'topic',
        component: topic
    },
    {
        path: '/user',
        name: 'user',
        component: user
    },
    {
        path: '/message',
        name: 'message',
        component: message
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/newTopic',
        name: 'newTopic',
        component: newTopic
    }]
});
