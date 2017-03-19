import Vue from 'vue';
import Vuex from 'vuex';
import list from './list';
import topic from './topic';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        list,
        topic
    }
});

export default store;
