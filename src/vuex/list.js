import axios from 'axios';

const newAxios = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
});

const list = {
    state: {
        count: 0
    },
    mutations: {
        count(state) {
            state.count += 1;
        }
    },
    actions: {
        getList({ commit }) {
            newAxios.get('/topics?page=1&limit=20&tab=all&mdrender=true')
                .then((result) => {
                    console.log(result.data);
                });
            commit('count');
        }
    }
    // getters: { ... }
};

export default list;
