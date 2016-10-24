# a-demo-of-vue

> a-demo-of-vue

## 项目配置
```
# 安装依赖
cd paydayloan/
npm install

# 开启开发服务器，浏览器访问 http://localhost:8080
npm run dev

# 构建代码
npm run build
```

## 目录结构
* build: webpack 开发和构建配置
* config: 项目配置信息
* dist: 发布目录
* node_modules: node 模块安装目录
* src: 源文件
	* assets: 资源文件
	* components: 组件
	* sass: 公共样式文件
	* services: 公共方法
	* main.js: 主程序文件
* static: 静态资源（构建时不会被打包，直接拷贝）
* index.html: 应用入口文件

## 注意
* 使用 vue 官方推荐的 Webpack + vue-loader 构建应用
* 图片使用，引用放在 ./src/assets 中的图片会被转换为 base64 编码，而引用放在 ./static 文件夹中的图片不会被转换为 base64 编码
* 弹窗
	* 样式，layer 的样式使用 ./src/sass/layer.scss，npm install 环境安装完成之后，需注释掉文件 ./node_modules/layer.mobile/layer/layer.js 中的 require('./need/layer.css');
	* 封装的方法在文件 ./src/services/layer.js 中
* 全局使用工具对象
	* window.ajax ，数据请求对象
	* window.layer ，弹窗对象
* compass，如需使用 compass 的功能，.scss 文件中的引入语句如下，.vue 文件 style 节点中也可使用，需加属性 lang="scss"
```
@import "node_modules/compass-mixins/lib/compass";
@import "node_modules/compass-mixins/lib/animate";
```

## 参考
* [vuejs 中文文档](http://cn.vuejs.org/guide/)
* [vue-router 中文文档](http://router.vuejs.org/zh-cn/index.html)
* [Webpack + vue-loader 英文文档](http://vuejs-templates.github.io/webpack/)
* [compass-mixins](https://github.com/Igosuki/compass-mixins)
