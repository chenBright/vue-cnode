import ajax from './ajaxInstance';

const defaultUserDetail = {
    authorName: '',
    authorAvatar: '',
    score: 0,
    recentReplies: [],
    recentTopics: []
};

function handleUserDetailArray(item) {
    const detail = {
        id: item.id,
        authorName: item.author.loginname,
        authorAvatar: item.author.avatar_url,
        lastReplyTime: item.last_reply_at,
        title: item.title
    };
    return detail;
}

const userDetail = {
    state: {
        userDetail: defaultUserDetail
    },
    mutations: {
        SET_USER_DETAIL(state, userDetailData) {
            const recentReplies = userDetailData.recent_replies.map(handleUserDetailArray);
            const recentTopics = userDetailData.recent_topics.map(handleUserDetailArray);
            state.userDetail = {
                authorName: userDetailData.loginname,
                authorAvatar: userDetailData.avatar_url,
                score: userDetailData.score,
                recentReplies,
                recentTopics
            };
        },
        RESET_USER_DETAIL(state) {
            state.userDetail = defaultUserDetail;
        }
    },
    actions: {
        getUserDetail({ commit }, { userName }) {
            ajax.get(`/user/${userName}`)
                .then((result) => {
                    const data = result.data;
                    if (data.success) {
                        commit('SET_USER_DETAIL', data.data);
                    }
                });
        },
        resetUserDetail({ commit }) {
            commit('RESET_USER_DETAIL');
        }
    }
};

export default userDetail;
