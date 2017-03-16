import Vue from 'vue';
import Router from 'vue-router';
import index from '../views/index';
import list from '../views/list';
import topic from '../views/topic';
import login from '../views/login';
import newTopic from '../views/newTopic';

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
        path: '/about',
        name: 'about'
    },
    {
        path: '/message',
        name: 'message',
        redirect: '/login'
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
