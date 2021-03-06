# vue-cnode

> 基于vue.js的Cnodejs.org社区的webapp <br>
> [线上访问地址](https://chenbright.github.io/vue-cnode/)

### 安装

通过`git clone`将项目拷贝到本地

```shell
git clone git@github.com:chenBright/vue-cnode.git
```

通过`npm`安装本地服务第三方依赖模块（需要已安装[Node.js](https://nodejs.org/))

```
npm install
```

启动服务（http://localhost:8080）

```
npm run dev
```

发布代码

```
npm run build
```

发布代码，并查看包分析报告

```
npm run build --report
```

### 目录结构
```
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .postcssrc.js
├── LICENSE
├── README.md
├── build
|  ├── build.js
|  ├── check-versions.js
|  ├── dev-client.js
|  ├── dev-server.js
|  ├── utils.js
|  ├── vue-loader.conf.js
|  ├── webpack.base.conf.js
|  ├── webpack.dev.conf.js
|  └── webpack.prod.conf.js
├── config
|  ├── dev.env.js
|  ├── index.js
|  └── prod.env.js
├── index.html
├── package.json
├── src
|  ├── App.vue
|  ├── assets
|  |  ├── images
|  |  |  ├── loading.gif
|  |  |  └── user.png
|  |  └── scss
|  |     ├── common
|  |     |  ├── common.scss
|  |     |  └── reset.scss
|  |     └── iconfont
|  |        ├── demo.css
|  |        ├── demo_fontclass.html
|  |        ├── demo_symbol.html
|  |        ├── demo_unicode.html
|  |        ├── iconfont.css
|  |        ├── iconfont.eot
|  |        ├── iconfont.js
|  |        ├── iconfont.svg
|  |        ├── iconfont.ttf
|  |        └── iconfont.woff
|  ├── components
|  |  ├── header.vue
|  |  ├── loading.vue
|  |  ├── menu.vue
|  |  ├── no-data.vue
|  |  ├── reply.vue
|  |  └── user-info.vue
|  ├── main.js
|  ├── plugins
|  |  ├── event-bus.js
|  |  └── vue-scroll.js
|  ├── router
|  |  └── index.js
|  ├── views
|  |  ├── index.vue
|  |  ├── list.vue
|  |  ├── login.vue
|  |  ├── message.vue
|  |  ├── nav.vue
|  |  ├── new.vue
|  |  ├── topic.vue
|  |  └── user.vue
|  └── vuex
|     ├── ajax.js
|     ├── index.js
|     ├── list.js
|     ├── messages.js
|     ├── topic.js
|     ├── user-detail.js
|     └── user-info.js
└── static
   ├── .gitkeep
   └── cnode_icon_32.png

```