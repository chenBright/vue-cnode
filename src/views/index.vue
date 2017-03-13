<template>
    <div class="index">
        <img class="vue-logo" src="../assets/images/vue-logo.png">
        <el-loading></el-loading>
    </div>
</template>

<script>
import loading from '../components/loading';

export default {
    name: 'index',
    components: {
        'el-loading': loading
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
