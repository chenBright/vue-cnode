<template>
    <section
        class="user"
        v-scroll="{
            enableCallback: true
        }"
    >
        <section v-show="userDetail.authorId !== ''">
            <section class="user__info">
                <img class="user__avatar" :src="userDetail.authorAvatar" alt="用户头像">
                <p class="user__name">{{ userDetail.authorName }}</p>
                <p class="user__score">积分：{{ userDetail.score }}</p>
            </section>
            <section class="topics">
                <ul class="topics__tabs">
                    <li
                        class="topics__tab topics__tab--br"
                        :class="{ 'topics__tab--active': tabType === 1 }"
                        v-tap.prevent="{ methods: toggleTab, type: 1 }"
                    >
                        最近回复
                    </li>
                    <li
                        class="topics__tab"
                        :class="{ 'topics__tab--active': tabType === 2 }"
                        v-tap.prevent="{ methods: toggleTab, type: 2 }"
                    >
                        最新发布
                    </li>
                </ul>
                <ul class="topics__list">
                    <li class="topic-item" v-for="userItem of topicsList" :key="userItem.id">
                        <router-link :to="{ name: 'user', params: { userName: userItem.authorName } }" events="'touchend'">
                            <img class="topic-item__avatar" :src="userItem.authorAvatar" alt="用户头像">
                        </router-link>
                        <router-link
                            class="topic-item__info"
                            :to="{ name:'topic', params:{ id: userItem.id } }"
                            events="'touchend'"
                        >
                                <h2 class="topic-item__title">{{ userItem.title }}</h2>
                                <span class="topic-item__author">{{ userItem.authorName }}</span>
                                <timeago
                                    class="topic-item__time"
                                    :since="userItem.lastReplyTime"
                                    :max-time="86400 * 365 * 10"
                                    :auto-update="60 * 5"
                                >
                                </timeago>
                        </router-link>
                    </li>
                </ul>
                <el-no-data v-if="topicsList.length === 0"></el-no-data>
            </section>
        </section>
        <el-loading  v-if="userDetail.authorId === ''"></el-loading>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import loading from '../components/loading';
import noData from '../components/no-data';

export default {
    name: 'user',
    components: {
        'el-no-data': noData,
        'el-loading': loading
    },
    data() {
        return {
            topicsList: [],
            tabType: 1
        };
    },
    computed: mapState({
        userDetail(state) {
            const userDetail = state.userDetail.userDetail;
            this.topicsList = userDetail.recentReplies;
            return userDetail;
        }
    }),
    created() {
        this.getUserDetail(this.$route.params.userName);
    },
    methods: {
        toggleTab({ type }) {
            this.tabType = type;
            if (type === 1) {
                this.topicsList = this.userDetail.recentReplies;
            } else {
                this.topicsList = this.userDetail.recentTopics;
            }
        },
        getUserDetail(userName) {
            this.$store.dispatch('getUserDetail', { userName });
        },
        resetUserDetail() {
            this.$store.dispatch('resetUserDetail');
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.getUserDetail(to.params.userName);
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.resetUserDetail();
        next();
    }
};
</script>

<style lang="scss" scoped>
.user {
    height: 100%;

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
