import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/index';
import list from '@/views/list';

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
        path: '/about',
        name: 'about'
    },
    {
        path: '/message',
        name: 'message'
    }]
});
