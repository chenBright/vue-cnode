import BScroll from 'better-scroll';
// 滚动设置数组
const scrolls = [];

const defaultSetting = {
    scroll: null,
    enableCallback: true,
    instance: 100
};
/**
 * 获取元素高度
 * @method getElementHeight
 * @param  {Object}         el 元素DOM对象
 * @return {Number}            元素高度值
 */
function getElementHeight(el) {
    return el.getBoundingClientRect().height;
}

function initScroll(el, binding) {
    const length = scrolls.length;
    // 新 scroll 实例的索引号
    let index = length;
    // 找到 scroll 实例数组第一个空的项
    for (let i = 0; i < length; i += 1) {
        if (!scrolls[i]) {
            index = i;
            break;
        }
    }
    // 设置 scroll 实例数组的索引号
    el.setAttribute('data-scroller-index', index);

    const setting = binding.value;
    // 初始位置
    // const postionX = setting.postionX || 0;
    // const postionY = setting.postiobY || 0;
    // BScroll 实例
    const scroller = new BScroll(el, {
        // startX: postionX,
        // startY: postionY,
        probeType: 3
    });

    const scrollObj = {
        // BScroll 实例
        scroller,
        // 是否执行滚动回调函数
        enableCallback: setting.enableCallback === undefined ?
            defaultSetting.enableCallback : setting.enableCallback,
        // 离底部的距离，小于该值时，会执行滚动回调函数
        instance: setting.instance === undefined ? defaultSetting.instance : setting.instance,
        // 滚动元素
        scrollerHeight: getElementHeight(scroller.scroller),
        // 容器元素
        wrapperHeight: getElementHeight(scroller.wrapper),
        // postionX,
        // postionY
    };
    // 传入的回调函数
    const callback = binding.value.method;
    if (callback) {
        scroller.on('scroll', (position) => {
            // 最大滚动高度
            const scrollTop = scrollObj.scrollerHeight - scrollObj.wrapperHeight;
            if (
                scrollObj.enableCallback &&
                scrollTop - (-position.y) <= scrollObj.instance
            ) {
                callback(position);
            }
        });
    }
    scrolls[index] = scrollObj;
}

function plugin(Vue) {
    // 如果插件已安装，则不重复安装
    if (plugin.installed) {
        return;
    }
    // 自定义指令
    Vue.directive('scroll', {
        inserted(el, binding) {
            initScroll(el, binding);
        },
        componentUpdated(el, binding) {
            // 设置 scroll 实例数组的索引号
            const index = el.getAttribute('data-scroller-index');
            const scrollObj = scrolls[index];

            const scroller = scrolls[index].scroller;
            scroller.refresh();

            const setting = binding.value;
            scrollObj.enableCallback = setting.enableCallback === undefined ?
                defaultSetting.enableCallback : setting.enableCallback;
            scrollObj.instance = setting.instance === undefined ?
                defaultSetting.instance : setting.instance;

            scrollObj.scrollerHeight = getElementHeight(scroller.scroller);
            scrollObj.wrapperHeight = getElementHeight(scroller.wrapper);
            // 初始位置
            // const postionX = setting.postionX || 0;
            // const postionY = setting.postiobY || 0;
            // 如果与存储的位置信息不相同，则滚动到相应位置
            // if (scrollObj.postionX !== postionX || scrollObj.postionY !== postionY) {
            //     scroller.scrollTo(postionX, postionY);
            //     scrollObj.postionX = postionX;
            //     scrollObj.postionY = postionY;
            // }
            console.log('componentUpdated');
        },
        unbind(el) {
            // 设置 scroll 实例数组的索引号
            const index = el.getAttribute('data-scroller-index');
            // 销毁 BScroll 实例
            scrolls[index].scroller.destroy();
            // 销毁 滚动设置对象
            scrolls[index] = null;
        }
    });
}

// 如果 Vue 是全局变量则自动调用 Vue.use()，完成自动注册。
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
