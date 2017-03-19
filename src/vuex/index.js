import Vue from 'vue';
import Vuex from 'vuex';
import list from './list';
import topic from './topic';
import user from './user';
import userDetail from './userDetail';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        list,
        topic,
        user,
        userDetail
    }
});

export default store;
