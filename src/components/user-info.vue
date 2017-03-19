<template>
    <div class="user-info">
        <div
            class="user-info--unlogin iconfont icon-denglu"
            v-tap.prevent="{ methods: login }"
            v-if="!user.authorId"
        >
            登录
        </div>
        <div class="user-info--login" v-tap.prevent="{ methods: toUser }" v-else>
            <img class="user-info__avatar" :src="user.authorAvatar" alt="用户头像">
            <span class="user-info__name">{{ user.authorName }}</span>
            <span class="user-info__more iconfont icon-right"></span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'user-info',
    computed: mapState({
        // 列表数据
        user: state => state.user.userInfo,
    }),
    methods: {
        login() {
            this.$router.push({ name: 'login' });
        },
        toUser() {
            const loginName = this.user.authorName;
            this.$router.push({ name: 'user', params: { loginName } });
        }
    }
};
</script>

<style lang="scss" scoped>
.user-info {
    position: relative;
    margin-bottom: 20px;
    padding: 15px 0;
    line-height: 40px;
    border-bottom: 1px solid #d4d4d4;

    &--unlogin {
        font-size: 16px;

        &::before {
            margin-right: 20px;
            vertical-align: bottom;
        }
    }
    &__avatar {
        overflow: hidden;
        width: 40px;
        height: 40px;
        background: url(../assets/images/user.png) no-repeat center center;
        background-size: 40px 40px;
        border-radius: 50%;
        vertical-align: sub;
    }
    &__name {
        display: inline-block;
        width: 85px;
        margin-left: 5px;
        font-size: 12px;
        font-weight: bolder;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    &__more {
        position: absolute;
        top: 16px;
        right: -5px;
        width: 16px;
        height: 16px;
    }
}

</style>
