import axios from 'axios';

const newAxios = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
});

const tabMap = {
    share: '分享',
    ask: '问答',
    job: '招聘',
    good: '精华',
    top: '置顶'
};

const list = {
    state: {
        list: []
    },
    mutations: {
        HANDLE_LIST_DATA(state, listData) {
            const handledlist = listData.map((item) => {
                // 将精华和置顶处理为 tab
                if (item.good) {
                    item.tab = 'good';
                } else if (item.top) {
                    item.tab = 'top';
                }
                const handledItem = {
                    title: item.title,
                    tab: {
                        type: item.tab,
                        description: tabMap[item.tab]
                    },
                    authorId: item.author_id,
                    authorName: item.author.loginname,
                    authorAvatar: item.author.avatar_url,
                    createTime: item.create_at,
                    lastReplyTime: item.last_reply_at,
                    visitCount: item.visit_count,
                    replyCount: item.reply_count
                };
                return handledItem;
            });
            state.list = state.list.concat(handledlist);
        },
        RESET_LIST_DATA(state) {
            state.list = [];
        }
    },
    actions: {
        getList({ commit }, { page, tab, limit = 20, mdrender = true }) {
            const url = `/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`;
            newAxios.get(url)
                .then((result) => {
                    const data = result.data;
                    if (data.success) {
                        commit('HANDLE_LIST_DATA', data.data);
                    }
                });
        },
        resetList({ commit }) {
            commit('RESET_LIST_DATA');
        }
    }
    // getters: { ... }
};

export default list;
