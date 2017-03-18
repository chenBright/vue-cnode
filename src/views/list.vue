<template>
    <section
        class="list"
        :style="{ textAlign: listLength === 0 ? 'center' : 'left' }"
        v-scroll="{
            method: loadList,
            enableCallback: enableLoad,
            instance: 100,
            postionY: postionY
        }"
    >
        <section>
            <ul v-if="listLength !== 0" ref="ul">
                <li class="topics-item" v-for="item of list" :key="item.authorId + item.createTime">
                    <h2
                        class="topics-item__title"
                        :class="['topics-item__title--' + item.tab.type]"
                        :title="item.tab.description"
                    >
                        {{ item.title }}
                    </h2>
                    <div class="topics-item__info">
                        <img class="topics-item__avatar" :src="item.authorAvatar" alt="用户头像">
                        <div class="topics-item__info-wrapper">
                            <p class="topics-item__inline-info">
                                <span class="topics-item__name">{{ item.authorName }}</span>
                                <span class="topics-item__status">
                                    <b class="topics-item__status--emphasis">{{ item.replyCount }}</b>
                                     / {{ item.visitCount }}
                                </span>
                            </p>
                            <p class="topics-item__inline-info">
                                <timeago
                                    class="topics-item__public-time"
                                    :since="item.createTime"
                                    :max-time="86400 * 365 * 10"
                                    :auto-update="60 * 5"
                                >
                                </timeago>
                                <timeago
                                    class="topics-item__reply-time"
                                    :since="item.lastReplyTime"
                                    :max-time="86400 * 365 * 10"
                                    :auto-update="60 * 5"
                                >
                                </timeago>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <el-loading v-if="listLength === 0"></el-loading>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import loading from '../components/loading';

export default {
    name: 'list',
    components: {
        'el-loading': loading
    },
    data() {
        return {
            // 是否可以执行滚动回调函数
            enableLoad: true,
            postionY: 0,
            // 页数
            page: 1
        };
    },
    mounted() {
        this.enableLoad = false;
        this.getTopicsList();
    },
    computed: mapState({
        list: state => state.list.list,
        route(state) {
            return state.route;
        },
        listLength() {
            return this.list.length;
        }
    }),
    methods: {
        loadList() {
            this.enableLoad = false;
            this.page += 1;
            this.getTopicsList();
        },
        reloadList() {
            this.$store.dispatch('resetList');
            this.page = 1;
            this.getTopicsList();
        },
        getTopicsList() {
            this.$store.dispatch('getList', {
                page: this.page,
                tab: this.$route.query.tab
            });
        }
    },
    watch: {
        // 当列表数组变化时，即更新了列表，则可以执行滚动回调函数
        listLength() {
            this.enableLoad = true;
        },
        $route() {
            this.reloadList();
        }
    }
};
</script>

<style lang="scss" scoped>
.list {
    height: 100%;
}
.el-loading {
    margin-top: 15px;
}
.topics-item {
    padding: 10px 15px;
    border-bottom: 1px solid #d5dbdb;

    &__title {
        width: 100%;
        color: #2c3e50;
        font-size: 16px;
        line-height: 1.5;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &::before {
            padding: 5px 6px;
            margin-right: 10px;
            content: attr(title);
            text-align: center;
            font-size: 10px;
            border-radius: 4px;
            color: #ffffff;
            background: #e7e7e7;
            vertical-align: text-top;
        }
        &--good::before {
            background: #E67E22;
        }
        &--top::before {
            background: #E74C3C;
        }
        &--share::before {
            background: #1ABC9C;
        }
        &--ask::before {
            background: #3498DB;
        }
        &--job::before {
            background: #9B59B6;
        }
    }
    &__info {
        display: flex;
        padding-top: 10px;
    }
    &__avatar {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid #F3F3F3;
    }
    &__info-wrapper {
        flex: 1;
    }
    &__inline-info {
        display: flex;
        padding: 3px 0;
        color: #34495e;
        font-size: 12px;
        line-height: 12px;

        &:first-child {
            font-size: 14px;
        }
    }
    &__name,
    &__public-time {
        flex: 1;
        text-align: left;
    }
    &__status--emphasis {
        color: #80bd01;
    }
}
</style>
