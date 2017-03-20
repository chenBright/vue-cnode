<template>
    <section class="reply">
        <textarea
            class="reply__content"
            rows="8"
            placeholder='回复支持Markdown语法,请注意标记代码'
            v-model="replyContent"
        >
        </textarea>
        <button class="reply__button reply__button--confirm" type="button" v-tap.prevent="{ methods: confirm }">确认</button>
        <button class="reply__button reply__button--cancel" type="button" v-tap.prevent="{ methods: cancel }">取消</button>
    </section>
</template>

<script>
export default {
    name: 'el-reply',
    props: {
        replyId: String,
        user: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            replyContent: this.user
        };
    },
    methods: {
        confirm() {
            this.$emit('replyConfirm', this.replyContent, this.replyId);
        },
        cancel() {
            this.$emit('replyCancel');
        }
    }
};
</script>

<style lang="scss" scoped>
.reply {
    width: 100%;
    overflow: auto;

    &__content {
        display: block;
        width: 100%;
        flex: 1;
        border: 1px solid #d5dbdb;
        background-color: #fff;
        font-size: 14px;
        padding: 15px;
        color: #313131;
    }
    &__button {
        width: 45%;
        height: 42px;
        margin: 15px 0;
        line-height: 42px;
        color: #fff;
        font-size: 16px;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;

        &--confirm {
            float: left;
        }
        &--cancel {
            float: right;
            background-color: #e7e7e7;
            border-bottom: 2px solid #e7e7e7;
        }
    }
}
</style>
