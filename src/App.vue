<template>
    <div id="app">
        <el-nav></el-nav>
        <section class="page">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import nav from './views/nav';

export default {
    name: 'app',
    components: {
        'el-nav': nav
    }
};
</script>

<style lang="scss" scoped>
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: "Helvetica-Neue", "Helvetica", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow: hidden;
}
.page {
    flex: 1;
    overflow: hidden;
}
</style>
