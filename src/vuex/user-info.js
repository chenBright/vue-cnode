import ajax from './ajax';

const user = {
    state: {
        userInfo: {
            userName: '',
            userAvatar: '',
            userId: '',
            token: ''
        }
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = {
                userName: userInfo.loginname,
                userAvatar: userInfo.avatar_url,
                userId: userInfo.id,
                token: userInfo.token
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
                    data.token = token;
                    window.sessionStorage.user = JSON.stringify(data);
                    dispatch('setUserInfo', data);
                }
            });
        },
        setUserInfo({ commit }, data) {
            commit('SET_USER_INFO', data);
        }
    }
};

export default user;
