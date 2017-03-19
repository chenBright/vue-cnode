<template>
    <section class="login">
        <input class="login__input" type="text" placeholder="Access Token" v-model="token">
        <button class="login__button" type="button" v-tap.prevent="{ methods: login }">登录</button>
    </section>
</template>

<script>
/* eslint no-alert: "off" */
import { mapState } from 'vuex';

export default {
    name: 'login',
    data() {
        return {
            token: '946b1563-10f4-4027-b757-4590d315c28e'
        };
    },
    computed: mapState({
        // 用户数据
        userInfo: state => state.userInfo.userInfo
    }),
    methods: {
        login() {
            if (this.token.length !== 36) {
                alert('令牌格式错误,应为36位UUID字符串');
            } else {
                this.$store.dispatch('login', { token: this.token });
            }
        }
    },
    watch: {
        userInfo(newValue) {
            if (newValue.userId) {
                const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    padding: 50px 15px;

    &__input {
        padding: 12px 0;
        border: none;
        border-bottom: 1px solid #4fc08d;
        background-color: transparent;
        width: 100%;
        font-size: 14px;
        color: #313131;
    }
    &__button {
        margin-top: 15px;
        width: 99%;
        height: 42px;
        line-height: 42px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
    }
}
</style>
