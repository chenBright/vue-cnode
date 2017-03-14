function plugin(Vue) {
    // 如果插件已安装，则不重复安装
    if (plugin.installed) return;

    const events = new Vue({
        methods: {
            /**
             * 触发事件
             * @method emit
             * @param {string} event
             * @param {...*} args
             */
            emit(event, ...args) {
                this.$emit(event, ...args);
            },

            /**
             * 监听自定义事件
             * @method on
             * @param {string} event
             * @param {function} callback
             */
            on(event, callback) {
                this.$on(event, callback);
            },

            /**
             * 监听一个自定义事件，但是只触发一次
             * @method once
             * @param {string} event
             * @param {function} callback
             */
            once(event, callback) {
                this.$once(event, callback);
            },

            /**
             * 移除事件监听器
             * 如果没有提供参数，则移除所有的事件监听器；
             * 如果只提供了事件，则移除该事件所有的监听器；
             * 如果同时提供了事件与回调，则只移除这个回调的监听器。
             * @method off
             * @param {string} event
             * @param {function} callback
             */
            off(event, callback) {
                this.$off(event, callback);
            },
        }
    });

    // 将event bus添加到全局属性
    Object.defineProperty(Vue.prototype, '$events', {
        get() {
            return events;
        }
    });
}

// 如果 Vue 是全局变量则自动调用 Vue.use()，完成自动注册。
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
