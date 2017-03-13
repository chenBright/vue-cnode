<template>
    <section class="el-nav">
        <div class="page-shade" v-show="isShowMenu" v-tap.prevent="{ methods : hideMenu }"></div>
        <el-header @clickMenuIcon="showMenu" :isShowMenu="isShowMenu"></el-header>
        <el-menu :isShow="isShowMenu"></el-menu>
    </section>
</template>

<script>
import header from '../components/header';
import menu from '../components/menu';

export default {
    name: 'el-nav',
    components: {
        'el-header': header,
        'el-menu': menu
    },
    data() {
        return {
            isShowMenu: false
        };
    },
    methods: {
        showMenu() {
            this.isShowMenu = true;
        },
        hideMenu() {
            this.isShowMenu = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.el-nav {
    height: 49px;
}
.page-shade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
}
</style>
