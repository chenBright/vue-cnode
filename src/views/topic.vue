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
                    <router-link :to="{ name: 'user', params: { loginName: topic.authorName } }" events="'touchend'">
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
                    <li class="reply-item" v-for="reply of topic.replies" :key="reply.id">
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
                                <span class="iconfont icon-good"></span>
                                0
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
            this.currentId = params.id;
        },
        hideReply() {
            this.currentId = '';
        },
        addReply() {
        },
        resetTopic() {
            this.$store.dispatch('resetTopic');
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
.reply-item {
    border-bottom: 1px solid #d4d4d4;

    &__content {
        margin-bottom: 15px;
        word-break: break-word;
    }
}
</style>
