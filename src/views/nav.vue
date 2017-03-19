<template>
    <section class="el-nav">
        <el-header
            @clickMenuIcon="showMenu"
            :title="title"
            :isShowMenu="isShowMenu"
        >
        </el-header>
        <div
            class="page-shade"
            v-show="isShowMenu"
            v-tap.prevent="{ methods : hideMenu }"
        >
        </div>
        <el-menu :isShow="isShowMenu"></el-menu>
    </section>
</template>

<script>
import { mapState } from 'vuex';
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
    computed: mapState({
        // 路由信息
        title(state) {
            const route = state.route;
            const name = route.name;
            if (name !== 'list') {
                return route.meta.appTitle;
            }
            return route.meta.appTitle[route.query.tab];
        }
    }),
    methods: {
        showMenu() {
            this.isShowMenu = true;
        },
        hideMenu() {
            this.isShowMenu = false;
        }
    },
    watch: {
        $route() {
            if (this.isShowMenu) {
                this.hideMenu();
            }
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
    z-index: 2;
    background: rgba(0, 0, 0, 0.4);
}
.el-menu {
    z-index: 4;
}
</style>
