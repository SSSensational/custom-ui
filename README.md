<p align="center">
    <a href="http://www.barrenstar.cn" style="width:200px;height:200px;transform: rotate">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="200" style="transform: rotate(90deg);" height="200" viewBox="16.66699981689453 10 66.66600036621094 80"><g fill="url(#SvgjsLinearGradient1078)"><path d="M16.667 43.33C16.667 69.104 37.559 90 63.333 90v-6.667c-22.093 0-40-17.91-40-40.003h-6.666z"></path><path d="M63.333 16.667c-14.729 0-26.666 11.94-26.666 26.664C36.667 58.06 48.604 70 63.333 70v6.667C44.922 76.667 30 61.741 30 43.33 30 24.922 44.922 10 63.333 10v6.667z"></path><path d="M63.333 43.333v20c-11.048 0-20-8.955-20-20.003 0-11.045 8.952-19.997 20-19.997 11.049 0 20 8.952 20 19.997l-20 .003z"></path></g><defs><linearGradient gradientUnits="userSpaceOnUse" id="SvgjsLinearGradient1078" x1="13.333499908447276" y1="86.66650009155273" x2="86.66650009155273" y2="13.333499908447262"><stop stop-color="#525f59" offset="0"></stop><stop stop-color="#18ec6b" offset="1"></stop></linearGradient></defs></svg>
    </a>
</p>

<h1 align="center">Custom-UI</h1>

<div align="center">
    一个仅提供基本功能职责和动画效果的组件库.设计用于二次封装开发.
</div>

<div align="center">
    English(./README-en_US.md) | 简体中文
</div>


## 在线演示

[点击查看](http://www.barrenstar.cn)

## 特性

- 甚至可以不写css代码，组件内部根据传入属性用js生成够用的样式。
- 组件只提供基本的功能职责和动画，没有预定的功能区块强迫哪个区域应该干什么.
- 像使用原生HTML元素一样使用组件，组件支持了有原生属性包括data-属性.
- 富有弹性的动画和手势效果支持.
- Typescript类型提示.

## 环境支持

- 现代浏览器 (Chrome and Firefox)
- [Electron](https://www.electronjs.org/)

## 安装

```bash
npm install custom-ui
```

```bash
yarn add custom-ui
```

## 使用

custom-ui 默认支持基于 ES modules 的 tree shaking，直接如下引入就会有按需加载的效果。

```jsx
import { Button, Input } from 'custom-ui';

const App = () => (
  <>
    <Button variant="outlined">按钮</Button>
    <Input label="请输入 xxx" />
  </>
);
```

当你需要使用某组件的非默认导出功能，也可以如下单独引入。

```javascript
import Form, { useForm, FormProvider } from 'custom-ui/lib/Form';
```

## 调试

克隆本项目到本地，并运行如下命令:

```bash
$ git clone git@github.com:SSSensational/custom-ui.git
$ cd ant-design
$ npm install
$ npm start
```

打开你的浏览器，访问： http://localhost:3000 .