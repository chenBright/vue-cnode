<template>
    <section class="index">
        <img class="vue-logo" src="../assets/images/vue-logo.png">
    </section>
</template>

<script>
export default {
    name: 'index',
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
