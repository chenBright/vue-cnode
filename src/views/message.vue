<template>
    <section
        class="message"
        v-scroll="{
            enableCallback: true
        }"
    >
        <ul class="message-list" v-show="messages.length !== 0">
            <li class="message-item" v-for="message of messages" :key="message.replyId">
                <div class="message-item__info">
                    <router-link :to="{ name: 'user', params: { userName: message.authorName } }" events="'touchend'">
                        <img class="message-item__avatar" :src="message.authorAvatar" alt="用户头像">
                    </router-link>
                    <span class="message-item__tips">
                        <span>{{ message.authorName }}</span>
                        <span v-if="message.type === 'reply'">在回复中@了您</span>
                        <span v-else>回复了您的话题</span>
                    </span>
                    <timeago
                        class="message-item__time"
                        :since="message.replyTime"
                        :max-time="86400 * 365 * 10"
                        :auto-update="60 * 5"
                    >
                    </timeago>
                </div>
                <div class="markdown-body message-item__reply" v-html="message.content"></div>
                <router-link :to="{name:'topic', params:{ id: message.topicId } }" events="'touchend'">
                    <h2 class="message-item__title">{{ message.title }}</h2>
                </router-link>
            </li>
        </ul>
        <el-no-data v-if="messages.length === 0"></el-no-data>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import loading from '../components/loading';
import noData from '../components/no-data';

export default {
    name: 'message',
    components: {
        'el-loading': loading,
        'el-no-data': noData
    },
    computed: mapState({
        // 用户信息
        userInfo: state => state.userInfo.userInfo,
        // 消息信息
        messages: state => state.messages.messages
    }),
    created() {
        this.$store.dispatch('getMessage', {
            token: this.userInfo.token
        });
    }
};
</script>

<style lang="scss" scoped>
.message {
    height: 100%;

    &__tabs {
        display: flex;
    }
}
.message-item {
    padding: 15px 10px 25px;
    border-bottom: solid 1px #d4d4d4;

    &__info {
        display: inline-flex;
        width: 100%;
    }
    &__avatar {
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 10px;
    }
    &__tips,
    &__time {
        vertical-align: top;
    }
    &__tips {
        flex: 1;
        font-size: 14px;
        color: #626262;
    }
    &__time {
        width: 40px;
        font-size: 12px;
        text-align: right;
        color: #80bd01;
    }
    &__reply {
        margin-bottom: 15px;
        word-break: break-word;
    }
    &__title {
        padding: 5px;
        font-size: 18px;
        color: #2c3e50;
        line-height: 1.5;
        background-color: #f0f0f0;
        border-radius: 5px;
    }
}
.el-no-data {
    margin-top: 15px;
}
</style>
