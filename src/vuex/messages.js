import ajax from './ajax';

function handleMessageArray(item) {
    const message = {
        authorName: item.author.loginname,
        authorAvatar: item.author.avatar_url,
        replyTime: item.reply.create_at,
        replyId: item.reply.id,
        content: item.reply.content,
        title: item.topic.title,
        topicId: item.topic.id,
        replyType: item.type
    };
    return message;
}

const userDetail = {
    state: {
        messages: []
    },
    mutations: {
        SET_MESSAGE(state, message) {
            const allMessages = message.hasnot_read_messages.concat(message.has_read_messages);
            const handledMessages = allMessages.map(handleMessageArray);
            state.messages = handledMessages;
        },
        RESET_USER_DETAIL(state) {
            state.messages = [];
        }
    },
    actions: {
        getMessage({ commit }, { token, mdrender = true }) {
            ajax.get('/messages', {
                params: {
                    accesstoken: token,
                    mdrender
                }
            })
            .then((result) => {
                const data = result.data;
                if (data.success) {
                    commit('SET_MESSAGE', data.data);
                }
            });
        },
        resetUserDetail({ commit }) {
            commit('RESET_USER_DETAIL');
        }
    }
};

export default userDetail;
