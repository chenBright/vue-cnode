<template>
    <div class="add-topic">
        <div class="line">选择分类：
            <select class="add-tab">
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
            </select>
            <a class="add-btn">发布</a>
        </div>
        <div class="line">
            <input
                class="add-title error"
                type="text"
                placeholder="标题，字数10字以上"
                max-length="100"
            >
        </div>
        <textarea
            class="add-content"
            rows="35"
            placeholder='回复支持Markdown语法,请注意标记代码'
        >
        </textarea>
    </div>
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
.add-topic {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding-bottom: 15px;
    height: 100%;
    background-color: #fff;
    .line {
        padding: 10px 15px;
        border-bottom: solid 1px #d4d4d4;
        .add-btn {
            color: #fff;
            background-color: #80bd01;
            padding: 5px 15px;
            border-radius: 5px;
        }
        .add-tab {
            display: inline-block;
            width: calc(100% - 140px);
            min-width: 50%;
            font-size: 16px;
            background: transparent;
             :after {
                content: 'xe60e';
            }
            ;
        }
        .add-title {
            font-size: 16px;
            border: none;
            width: 100%;
            background: transparent;
            height: 25px;
        }
        .error {
            border: 1px solid red;
        }
    }
    .add-content {
        flex: 1;
        margin: 15px;
        padding: 15px;
        color: #000;
        border-color: #d4d4d4;
        border-radius: 4px;
    }
    .error {
        border: 1px solid red;
    }
}
</style>
