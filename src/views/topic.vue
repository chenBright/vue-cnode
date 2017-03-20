<template>
    <article
        class="topic"
        v-scroll="{
            enableCallback: true,
            instance: 300
        }"
    >
        <section>
            <template v-if="topic.title !== ''">
                <h2 class="topic__title">{{ topic.title }}</h2>
                <div class="topic__info">
                    <router-link :to="{ name: 'user', params: { userName: topic.authorName } }" events="'touchend'">
                        <img class="topic__avatar" :src="topic.authorAvatar" alt="用户头像">
                    </router-link>
                    <div class="topic__info--col">
                        <span class="topic__author">{{ topic.authorName }}</span>
                        <span class="topic__time">发布于
                            <timeago
                                :since="topic.createTime"
                                :max-time="86400 * 365 * 10"
                                :auto-update="60 * 5"
                            >
                            </timeago>
                        </span>
                    </div>
                    <div class="topic__info--right">
                        <span
                            class="topic__type"
                            :class="['topic__type--' + topic.tab.type]"
                        >
                            {{ topic.tab.description }}
                        </span>
                        <span class="topic__popularity">{{ topic.visitCount }}浏览</span>
                    </div>
                </div>
                <section class='markdown-body topic__content' v-html="topic.content"></section>
                <h3 class="topic__reply"><b class="topic__reply--emphasis">{{ topic.replies.length }}</b> 回复</h3>
                <ul class="reply-list" v-if="topic.length !== 0">
                    <li class="reply-item" v-for="(reply, index) in topic.replies" :key="reply.id">
                        <div class="user">
                            <router-link :to="{ name: 'user', params: { userName: reply.authorName } }" events="'touchend'">
                                <img class="user__avatar" :src="reply.authorAvatar" alt="用户头像">
                            </router-link>
                            <span class="user__info">
                                <span>{{ reply.authorName }}</span>
                                <span class="topic__time">发布于
                                    <timeago
                                        :since="topic.createTime"
                                        :max-time="86400 * 365 * 10"
                                        :auto-update="60 * 5"
                                    >
                                    </timeago>
                                </span>
                            </span>
                            <span class="user__operation">
                                <span
                                    class="iconfont icon-good"
                                    :class="{
                                        'icon-good--active': isUps(reply.ups)
                                    }"
                                    v-tap.prevent="{ methods: up, replyId: reply.id, index }"
                                >
                                </span>
                                    {{ reply.ups.length }}
                                <span
                                    class="iconfont icon-fenxiangbian"
                                    v-tap.prevent="{ methods: showReply, id: reply.id }"
                                >
                                </span>
                            </span>
                        </div>
                        <div class="markdown-body reply-item__content" v-html="reply.content"></div>
                        <el-reply
                            :user="`@${reply.authorName} `"
                            :replyId="reply.id"
                            v-if="reply.id === currentId"
                            @replyConfirm="addReply"
                            @replyCancel="hideReply"
                        >
                        </el-reply>
                    </li>
                </ul>
                <el-reply
                    @replyConfirm="addReply"
                    @replyCancel="hideReply"
                >
                </el-reply>
            </template>
        </section>
        <el-loading v-if="topic.title === ''"></el-loading>
    </article>
</template>

<script>
import { mapState } from 'vuex';
import { uniq } from 'lodash';
import { markdown } from 'markdown';
import 'github-markdown-css';
import loading from '../components/loading';
import reply from '../components/reply';

export default {
    name: 'topic',
    components: {
        'el-loading': loading,
        'el-reply': reply
    },
    data() {
        return {
            currentId: ''
        };
    },
    computed: mapState({
        // 用户信息
        userInfo: state => state.userInfo.userInfo,
        // 话题数据
        topic: state => state.topic.topic
    }),
    mounted() {
        this.$store.dispatch('getTopic', {
            id: this.$route.params.id
        });
    },
    methods: {
        showReply(params) {
            if (!this.userInfo.userId) {
                this.$router.push({
                    name: 'login',
                    params: {
                        redirect: encodeURIComponent(this.$route.path)
                    }
                });
                return;
            }
            this.currentId = params.id;
        },
        hideReply() {
            this.currentId = '';
        },
        addReply(content, replyId) {
            const mdContent = this.linkUsers(content);
            let htmlContent = markdown.toHTML(mdContent);
            htmlContent = `<div class="markdown-text">${htmlContent}</div>`;
            const data = {
                topicId: this.topic.id,
                token: this.userInfo.token,
                content: {
                    mdContent,
                    htmlContent
                }
            };
            if (replyId) {
                data.replyId = replyId;
            }
            this.$store.dispatch('reply', data);
            this.hideReply();
        },
        resetTopic() {
            this.$store.dispatch('resetTopic');
        },
        isUps(ids) {
            return ids.indexOf(this.userInfo.userId) !== -1;
        },
        up({ replyId, index }) {
            if (!this.userInfo.userId) {
                this.$router.push({
                    name: 'login',
                    params: {
                        redirect: encodeURIComponent(this.$route.path)
                    }
                });
                return;
            }
            this.$store.dispatch('up', {
                replyIndex: index,
                replyId,
                userId: this.userInfo.userId,
                token: this.userInfo.token
            });
        },
        /**
         * 根据文本内容，替换为数据库中的数据
         * @param {String} text 文本内容
         * @param {Function} callback 回调函数
         */
        linkUsers(text) {
            const users = this.fetchUsers(text);
            let handledText = text;
            for (let i = 0, l = users.length; i < l; i += 1) {
                const name = users[i];
                handledText = handledText.replace(
                    new RegExp(`@${name}\\b(?!\\])`, 'g'), `[@${name}](/user/${name})`
                );
            }
            return handledText;
        },

        /**
         * 从文本中提取出@username 标记的用户名数组
         * @param {String} text 文本内容
         * @return {Array} 用户名数组
         */
        fetchUsers(text) {
            if (!text) {
                return [];
            }
            const ignoreRegexs = [
                /```.+?```/g, // 去除单行的 ```
                /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
                /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
                /^.*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
                /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
                /\[@.+?\\]\(\/.+?\)/g // 已经被 link 的 username
            ];

            let handledText = text;
            ignoreRegexs.forEach((ignoreRegex) => {
                handledText = handledText.replace(ignoreRegex, '');
            });

            const results = handledText.match(/@[a-z0-9\-_]+\b/igm);
            let names = [];
            if (results) {
                for (let i = 0, l = results.length; i < l; i += 1) {
                    let s = results[i];
                    // remove leading char @
                    s = s.slice(1);
                    names.push(s);
                }
            }
            names = uniq(names);
            return names;
        }
    },
    beforeRouteLeave(to, from, next) {
        this.resetTopic();
        next();
    }
};
</script>

<style lang="scss" scoped>
.topic {
    padding: 0 15px;
    height: 100%;

    &__title {
        margin: 15px 0;
        padding: 5px;
        line-height: 1.5;
        font-size: 18px;
        color: #2c3e50;
        background-color: #f0f0f0;
        border-radius: 5px;
    }
    &__info {
        display: flex;
        align-items: center;

        &--col {
            flex: 1;
        }
        &--right {
            text-align: right;
        }
    }
    &__avatar {
        display: block;
        margin-right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    &__author,
    &__time,
    &__type,
    &__popularity {
        display: block;
        padding: 5px 0;
        font-size: 12px;
        color: #34495e;
    }
    &__type {
        padding: 5px 6px;
        font-size: 10px;
        font-weight: 400;
        border-radius: 4px;
        background-color: #e7e7e7;
        color: #ffffff;
        text-align: center;
        vertical-align: middle;

        &--good {
            background: #E67E22;
        }
        &--top {
            background: #E74C3C;
        }
        &--share {
            background: #1ABC9C;
        }
        &--ask {
            background: #3498DB;
        }
        &--job {
            background: #9B59B6;
        }
    }
    &__content {
        margin-top: 15px;
        background: #ffffff;
        border-bottom: 1px solid #d4d4d4;
    }
    &__reply {
        padding: 15px 0;
        border-bottom: 1px solid #d4d4d4;

        &--emphasis {
            color: #80bd01;
        }
    }
}
.reply-list {
    margin-bottom: 15px;
}
.user {
    display: inline-flex;
    padding-top: 15px;
    width: 100%;

    &__avatar {
        margin-right: 10px;
        width: 45px;
        height: 45px;
        border-radius: 10px;
    }
    &__info {
        flex: 1;
        padding-top: 8px;
        font-size: 12px;
        vertical-align: top;
    }
    &__operation {
        margin-top: -5px;
    }
}
.icon-good--active {
    color: #80bd01;
}
.reply-item {
    border-bottom: 1px solid #d4d4d4;

    &__content {
        margin-bottom: 15px;
        word-break: break-word;
    }
}
</style>
