<template>
    <div class="add-topic">
        <div class="line">选择分类：
            <select class="add-tab" v-model="tab">
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
            </select>
            <a class="add-btn" v-tap.prevent="{ methods: addTopic }">发布</a>
        </div>
        <div class="line">
            <input
                class="add-title"
                type="text"
                placeholder="标题，10个字以上"
                max-length="100"
                v-model="title"
            >
        </div>
        <textarea
            class="add-content"
            rows="35"
            placeholder='回复支持Markdown语法,请注意标记代码'
            v-model="content"
        >
        </textarea>
    </div>
</template>

<script>
/* eslint no-alert: "off" */
import { mapState } from 'vuex';
import ajax from '../vuex/ajax';

export default {
    name: 'newTopic',
    data() {
        return {
            title: '',
            tab: 'share',
            content: ''
        };
    },
    computed: mapState({
        // 用户信息
        userInfo: state => state.userInfo.userInfo
    }),
    methods: {
        addTopic() {
            if (this.title.length < 10) {
                alert('标题至少10个字');
                return;
            }
            if (this.content === '') {
                alert('内容不能为空');
                return;
            }
            ajax.post('/topics', {
                accesstoken: this.userInfo.token,
                title: this.title,
                tab: this.tab,
                content: this.content
            })
            .then((result) => {
                const data = result.data;
                if (data.success) {
                    this.$router.push({
                        name: 'topic',
                        params: { id: data.topic_id }
                    });
                } else {
                    alert(data.error_msg);
                }
            });
        }
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
    // 错误提示
    .error {
        border: 1px solid red;
    }
}
</style>
