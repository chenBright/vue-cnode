<template>
    <section class="index">
        <img class="vue-logo" src="../assets/images/vue-logo.png">
        <el-loading></el-loading>
    </section>
</template>

<script>
import loading from '../components/loading';

export default {
    name: 'index',
    components: {
        'el-loading': loading
    },
    beforeRouteLeave(to, from, next) {
        this.$events.emit('routerChange');
        next();
    }
};
</script>

<style lang="scss" scoped>
.vue-logo {
    display: block;
    margin: auto;
    margin-top: 60px;
}
.el-loading {
    display: block;
    margin: auto;
    margin-top: 20px;
}
</style>
