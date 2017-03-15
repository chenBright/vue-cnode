<template>
    <section class="login">
        <input class="login__input" type="text" placeholder="Access Token">
        <button class="login__button" type="button">登录</button>
    </section>
</template>

<script>
export default {
    beforeRouteLeave(to, from, next) {
        this.$events.emit('routerChange');
        next();
    }
};
</script>

<style lang="scss" scoped>
.login {
    padding: 50px 15px;

    &__input {
        padding: 12px 0;
        border: none;
        border-bottom: 1px solid #4fc08d;
        background-color: transparent;
        width: 100%;
        font-size: 14px;
        color: #313131;
    }
    &__button {
        margin-top: 15px;
        width: 99%;
        height: 42px;
        line-height: 42px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
    }
}
</style>
