<template>
        <header
            class="el-header"
            :class="{ 'el-header--show': isShow }"
        >
            <div
                class="el-header__menu-button iconfont icon-caidan"
                v-tap.prevent="{ methods : showMenu }"
            >
            </div>
            <h1 class="el-header__title">{{ title }}</h1>
            <router-link
                class="el-header__add-button iconfont icon-write"
                :to="{ name: 'newTopic' }"
            >
            </router-link>
        </header>
</template>

<script>
export default {
    name: 'el-header',
    props: {
        title: {
            type: String,
            default: '首页'
        },
        isShowMenu: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isShow() {
            return this.isShowMenu;
        }
    },
    methods: {
        showMenu() {
            this.$emit('clickMenuIcon');
        }
    }
};
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    background: #ffffff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    transition: all .3s ease;

    &__menu-button,
    &__add-button {
        width: 49px;
        height: 44px;
        line-height: 49px;
    }
    &__add-button {
        font-weight: 600;
        line-height: 43px;
    }
    &__title {
        flex: 1;
        line-height: 49px;
    }
    &--show {
        transform: translateX(200px);
    }
}
</style>
