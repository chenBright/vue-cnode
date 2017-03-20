<template>
    <section class="index">
        <img class="vue-logo" src="https://cn.vuejs.org/images/logo.png">
    </section>
</template>

<script>
export default {
    name: 'index',
    mounted() {
        setTimeout(() => {
            this.$router.push({
                name: 'list',
                query: { tab: 'all' }
            });
        }, 1000);
    }
};
</script>

<style lang="scss" scoped>
.vue-logo {
    display: block;
    margin: auto;
    margin-top: 60px;
    width: 140px;
    height: 140pxk
}
.el-loading {
    display: block;
    margin: auto;
    margin-top: 20px;
}
</style>
