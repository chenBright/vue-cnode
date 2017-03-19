import Vue from 'vue';
import Vuex from 'vuex';
import list from './list';
import topic from './topic';
import userInfo from './user-info';
import userDetail from './user-detail';
import messages from './messages';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        list,
        topic,
        userInfo,
        userDetail,
        messages
    }
});

export default store;
