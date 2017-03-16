<template>
    <div class="el-no-data">
        <span class="iconfont icon-nodata"></span>
        <p class="el-no-data__tips">暂无数据！</p>
    </div>
</template>

<script>
export default {
    name: 'el-no-data'
};
</script>

<style lang="scss" scoped>
.el-no-data {
    text-align: center;
    color: #d4d4d4;

    &__tips {
        font-size: 18px;
    }
}
</style>
