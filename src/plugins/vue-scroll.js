import BScroll from 'better-scroll';

function plugin(Vue) {
    const scrollers = [];
    // 如果插件已安装，则不重复安装
    if (plugin.installed) return;
    Vue.directive('scroll', {
        inserted(el) {
            const length = scrollers.length;
            let index = length;
            for (let i = 0; i < length; i += 1) {
                if (scrollers[i] === null) {
                    index = i;
                }
            }
            el.setAttribute('data-scroller-index', index);
            scrollers[index] = new BScroll(el);
            console.log(scrollers);
        },
        componentUpdated(el) {
            const index = el.getAttribute('data-scroller-index');
            scrollers[index] = new BScroll(el);
        },
        unbind(el) {
            const index = el.getAttribute('data-scroller-index');
            scrollers[index] = null;
        }
    });
}

// 如果 Vue 是全局变量则自动调用 Vue.use()，完成自动注册。
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
