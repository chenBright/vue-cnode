<template>
    <section class="user">
        <section class="user__info">
            <img class="user__avatar" src="https://avatars3.githubusercontent.com/u/12249635?v=3&s=120" alt="用户头像">
            <p class="user__name">chenBright</p>
            <p class="user__score">积分：220</p>
        </section>
        <section class="topics">
            <ul class="topics__tabs">
                <li class="topics__tab topics__tab--br">最近回复</li>
                <li class="topics__tab topics__tab--active">最新发布</li>
            </ul>
            <ul class="topics__list">
                <li class="topic-item">
                    <img class="topic-item__avatar" src="https://avatars3.githubusercontent.com/u/12249635?v=3&s=120" alt="用户头像">
                    <section class="topic-item__info">
                        <h2 class="topic-item__title">有人知道Google的closure这个东西吗？npm上的这个是怎么玩的？</h2>
                        <span class="topic-item__author">chenBright</span>
                        <span class="topic-item__time">1个月前</span>
                    </section>
                </li>
            </ul>
        </section>
        <el-no-data></el-no-data>
    </section>
</template>

<script>
import noData from '../components/no-data';

export default {
    name: 'user',
    components: {
        'el-no-data': noData
    },
    beforeRouteLeave(to, from, next) {
        this.$events.emit('routerChange');
        next();
    }
};
</script>

<style lang="scss" scoped>
.user {
    &__info {
        padding-top: 15px;
        height: 180px;
        font-size: 14px;
        background-color: #e7e7e7;
        text-align: center;
    }
    &__avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    &__name {
        color: #000000;
    }
    &__score {
        color: #80bd01;
    }
}
.topics {
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
.topic-item {
    display: flex;
    padding: 15px 5px;
    border-bottom: 1px solid #d4d4d4;

    &__avatar {
        width: 45px;
        height: 45px;
        border: 2px solid #fff6e6;
        border-radius: 50%;
    }
    &__info {
        flex: 1;
        margin-left: 15px;
        width: 100%;
        overflow: hidden;
    }
    &__title {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    &__author,
    &__time {
        display: inline-block;
        font-size: 12px;
    }
    &__author {
        width: 68%;
        color: #626262;
    }
    &__time {
        width: 30%;
        text-align: right;
        color: #80bd01;
    }
}
.el-no-data {
    margin-top: 15px;
}
</style>
