import Vue from 'vue';
import Vuex from 'vuex';
import list from './list';
import topic from './topic';
import userInfo from './user-info';
import userDetail from './user-detail';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        list,
        topic,
        userInfo,
        userDetail
    }
});

export default store;
