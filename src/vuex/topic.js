import ajax from './ajaxInstance';

const tabMap = {
    share: '分享',
    ask: '问答',
    job: '招聘',
    good: '精华',
    top: '置顶'
};

const topic = {
    state: {
        topic: {
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
        }
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
                    upsLength: item.ups.length
                };
                return handledItem;
            });
            handledTopic.replies = handledReplies;
            state.topic = handledTopic;
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
        }
    }
};

export default topic;
