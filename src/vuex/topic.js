import Vue from 'vue';
import ajax from './ajax';

const tabMap = {
    share: '分享',
    ask: '问答',
    job: '招聘',
    good: '精华',
    top: '置顶'
};
const defaultTopic = {
    id: '',
    title: '',
    tab: {
        type: '',
        description: ''
    },
    authorId: '',
    authorName: '',
    authorAvatar: '',
    createTime: '',
    visitCount: '',
    content: '',
    replies: []
};

const topic = {
    state: {
        topic: defaultTopic
    },
    mutations: {
        HANDLE_TOPIC_DATA(state, topicData) {
            // 将精华和置顶处理为 tab
            if (topicData.good) {
                topicData.tab = 'good';
            } else if (topicData.top) {
                topicData.tab = 'top';
            }
            const handledTopic = {
                id: topicData.id,
                title: topicData.title,
                tab: {
                    type: topicData.tab,
                    description: tabMap[topicData.tab]
                },
                authorId: topicData.author_id,
                authorName: topicData.author.loginname,
                authorAvatar: topicData.author.avatar_url,
                createTime: topicData.create_at,
                visitCount: topicData.visit_count,
                content: topicData.content,
                replies: []
            };
            const handledReplies = topicData.replies.map((item) => {
                const handledItem = {
                    authorName: item.author.loginname,
                    authorAvatar: item.author.avatar_url,
                    id: item.id,
                    content: item.content,
                    ups: item.ups
                };
                return handledItem;
            });
            handledTopic.replies = handledReplies;
            state.topic = handledTopic;
        },
        RESET_TOPIC_DATA(state) {
            state.topic = defaultTopic;
        },
        UPS(state, { action, userId, replyIndex }) {
            let ups = state.topic.replies[replyIndex].ups;
            if (action === 'up') {
                Vue.set(state.topic.replies[replyIndex], 'ups', ups.concat(userId));
            } else {
                const len = ups.length;
                let i = len - 1;
                for (; i >= 0; i -= 1) {
                    if (ups[i] === userId) {
                        break;
                    }
                }
                ups = ups.splice(i, 1);
            }
        }
    },
    actions: {
        getTopic({ commit }, { id, mdrender = true }) {
            ajax.get(`/topic/${id}`, {
                params: {
                    mdrender
                }
            })
            .then((result) => {
                const data = result.data;
                if (data.success) {
                    commit('HANDLE_TOPIC_DATA', data.data);
                }
            });
        },
        resetTopic({ commit }) {
            commit('RESET_TOPIC_DATA');
        },
        up({ commit }, { replyIndex, replyId, token, userId }) {
            ajax.post(`/reply/${replyId}/ups`, {
                accesstoken: token
            })
            .then((result) => {
                const data = result.data;
                if (data.success) {
                    commit('UPS', {
                        action: data.action,
                        userId,
                        replyIndex
                    });
                }
            });
        }
    }
};

export default topic;
