import ajax from './ajaxInstance';

function handleUserDetail(item) {
    const detail = {
        id: item.id,
        authorName: item.author.loginname,
        authorAvatar: item.author.avatar_url,
        lastReplyTime: item.last_reply_at,
        title: item.title
    };
    return detail;
}

const user = {
    state: {
        userInfo: {
            authorName: '',
            authorAvatar: '',
            authorId: ''
        },
        userDetail: {
            score: 0,
            recentReplies: [],
            recentTopics: []
        }
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = {
                authorName: userInfo.loginname,
                authorAvatar: userInfo.avatar_url,
                authorId: userInfo.id
            };
        },
        SET_USER_DETAIL(state, userDetail) {
            console.log(userDetail);
            const recentReplies = userDetail.recent_replies.map(handleUserDetail);
            const recentTopics = userDetail.recent_topics.map(handleUserDetail);
            state.userDetail = {
                score: userDetail.score,
                recentReplies,
                recentTopics
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
                    dispatch('setUserInfo', data);
                }
            });
        },
        setUserInfo({ commit }, data) {
            commit('SET_USER_INFO', data);
        },
        getUserDetail({ commit }, { loginName }) {
            ajax.get(`/user/${loginName}`)
                .then((result) => {
                    const data = result.data;
                    if (data.success) {
                        commit('SET_USER_DETAIL', data.data);
                    }
                });
        }
    }
};

export default user;
