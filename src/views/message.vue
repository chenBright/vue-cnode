<template>
    <section class="message">
        <ul class="message__tabs">
            <li class="message__tab message__tab--br">最近回复</li>
            <li class="message__tab message__tab--active">最新发布</li>
        </ul>
        <ul class="message-list" v-if="false">
            <li class="message-item">
                <div class="message-item__info">
                    <img class="message-item__avatar" src="https://avatars3.githubusercontent.com/u/12249635?v=3&s=120" alt="用户头像">
                    <span class="message-item__tips">
                        <span>chenBright</span>
                        <span v-if="true">在回复中@了您</span>
                        <span v-else>回复了您的话题</span>
                    </span>
                    <span class="message-item__time">1天前</span>
                </div>
                <div class="message-item__reply"></div>
                <h2 class="message-item__title">
                    话题：nodejs有哪些好用的mvc框架？
                </h2>
            </li>
        </ul>
        <el-no-data></el-no-data>
    </section>
</template>

<script>
import noData from '../components/no-data';

export default {
    name: 'message',
    components: {
        'el-no-data': noData
    }
};
</script>

<style lang="scss" scoped>
.message {
    &__tabs {
        display: flex;
    }
    &__tab {
        flex: 1;
        text-align: center;
        padding: 12.5px 0;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #d4d4d4;

        &--active {
            color: #ff5a5f;
            border-bottom: 2px solid #ff5a5f;
        }
        &--br {
            border-right: 1px solid #d4d4d4;
        }
    }
}
.message-item {
    padding: 15px 10px 25px;
    border-bottom: solid 1px #d4d4d4;

    &__info {
        display: inline-flex;
        margin-bottom: 15px;
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
