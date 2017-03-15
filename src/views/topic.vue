<template>
    <article class="topic">
        <h2 class="topic__title">Node.js 2017年首场招聘专题</h2>
        <div class="topic__info">
            <img class="topic__avatar" src="https://avatars3.githubusercontent.com/u/12249635?v=3&s=120" alt="用户头像">
            <div class="topic__info--col">
                <span class="topic__author">chenBright</span>
                <time class="topic__time">发布于1天前</time>
            </div>
            <div class="topic__info--right">
                <span class="topic__type">精华</span>
                <span class="topic__popularity">229浏览</span>
            </div>
        </div>
        <section class='markdown-body topic__content'></section>
        <h3 class="topic__reply"><b class="topic__reply--emphasis">2</b> 回复</h3>
        <ul class="reply-list">
            <li class="reply-item">
                <div class="user">
                    <img class="user__avatar" src="https://avatars3.githubusercontent.com/u/12249635?v=3&s=120" alt="用户头像">
                    <span class="user__info">
                        <span>chenBright</span>
                        <span>发布于1天前</span>
                    </span>
                    <span class="user__operation">
                        <span class="iconfont icon-good"></span>
                        0
                        <span class="iconfont icon-fenxiangbian" v-tap.prevent="{ methods: showReply }"></span>
                    </span>
                </div>
                <div class="reply-item__content"></div>
                <el-reply
                    :user="'@chenBright '"
                    v-if="isReply"
                    @replyConfirm="addReply"
                    @replyCancel="hideReply"
                >
                </el-reply>
            </li>
        </ul>
        <el-reply
            v-if="isReply"
            @replyConfirm="addReply"
            @replyCancel="hideReply"
        >
        </el-reply>
    </article>
</template>

<script>
import 'github-markdown-css';
import reply from '../components/reply';

export default {
    name: 'topic',
    components: {
        'el-reply': reply
    },
    data() {
        return {
            isReply: false
        };
    },
    methods: {
        showReply() {
            this.isReply = true;
        },
        hideReply() {
            this.isReply = false;
        },
        addReply(content) {
            console.log(content);
        }
    }
};
</script>

<style lang="scss" scoped>
.topic {
    padding: 0 15px;

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
            color: #59ebff;
        }
    }
}
.reply-list {
    margin-top: 15px;
}
.user {
    display: inline-flex;
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
    }
}
</style>
