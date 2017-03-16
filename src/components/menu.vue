<template>
    <section class="el-menu" :class="{ 'el-menu--show': isShow }">
        <user-info></user-info>
        <nav>
            <router-link class="nav-link nav-link--adjust iconfont icon-all" :to="{ 'name':'list',query:{ tab:'all' } }">
                全部
            </router-link>
            <router-link class="nav-link iconfont icon-good" :to="{ 'name':'list',query:{ tab:'good' } }">
                精华
            </router-link>
            <router-link class="nav-link iconfont icon-share" :to="{ 'name':'list',query:{ tab:'share' } }">
                分享
            </router-link>
            <router-link class="nav-link iconfont icon-questionandanswer01" :to="{ 'name':'list',query:{ tab:'ask' } }">
                问答
            </router-link>
            <router-link class="nav-link nav-link--line iconfont icon-icon" :to="{ 'name':'list',query:{ tab:'job' } }">
                招聘
            </router-link>
            <router-link class="nav-link iconfont icon-msg line" :to="{ 'name':'message' }">
                消息
            </router-link>
        </nav>
    </section>
</template>

<script>
import userInfo from './user-info';

export default {
    name: 'el-menu',
    components: {
        'user-info': userInfo
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.el-menu {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    text-align: left;
    background: #ffffff;
    transition: all .3s ease;
    transform: translateX(-200px);

    &--show {
        transform: translateX(0);
    }
}
.nav-link {
    display: block;
    padding: 10px 0;
    font-weight: bold;

    &::before {
        margin-right: 20px;
    }
    &--adjust::before {
        vertical-align: sub;
    }
    &--line {
        border-bottom: 1px solid #d4d4d4;
    }
}
</style>
