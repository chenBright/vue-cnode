import ajax from './ajaxInstance';

const user = {
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = {
                authorName: userInfo.loginname,
                authorAvatar: userInfo.avatar_url,
                authorId: userInfo.id
            };
        }
    },
    actions: {
        login({ commit, dispatch }, { token }) {
            ajax.post('/accesstoken', {
                accesstoken: token
            })
            .then((result) => {
                const data = result.data;
                if (data.success) {
                    window.sessionStorage.user = JSON.stringify(data);
                    dispatch('setUserInfo', { data });
                }
            });
        },
        setUserInfo({ commit }, { data }) {
            commit('SET_USER_INFO', data);
        }
    }
};

export default user;
