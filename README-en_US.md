<p align="center">
    <a href="http://www.barrenstar.cn" style="width:200px;height:200px;transform: rotate">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="200" style="transform: rotate(90deg);" height="200" viewBox="16.66699981689453 10 66.66600036621094 80"><g fill="url(#SvgjsLinearGradient1078)"><path d="M16.667 43.33C16.667 69.104 37.559 90 63.333 90v-6.667c-22.093 0-40-17.91-40-40.003h-6.666z"></path><path d="M63.333 16.667c-14.729 0-26.666 11.94-26.666 26.664C36.667 58.06 48.604 70 63.333 70v6.667C44.922 76.667 30 61.741 30 43.33 30 24.922 44.922 10 63.333 10v6.667z"></path><path d="M63.333 43.333v20c-11.048 0-20-8.955-20-20.003 0-11.045 8.952-19.997 20-19.997 11.049 0 20 8.952 20 19.997l-20 .003z"></path></g><defs><linearGradient gradientUnits="userSpaceOnUse" id="SvgjsLinearGradient1078" x1="13.333499908447276" y1="86.66650009155273" x2="86.66650009155273" y2="13.333499908447262"><stop stop-color="#525f59" offset="0"></stop><stop stop-color="#18ec6b" offset="1"></stop></linearGradient></defs></svg>
    </a>
</p>

<h1 align="center">Custom-UI</h1>

<div align="center">
    Some React UI Components with basic action and animation.Design for further devlop.
</div>

<div align="center">
    English | [简体中文](./README-zh_CN.md)
</div>


## Online Demo

[Click to see](http://www.barrenstar.cn)

## Features

- Less css code, auto generate style by js.
- Component only provide basic action and animation, no force required region.
- Using Component like HTMLElement, support all native prop includes data-Attritubes.
- Spring animation and spring gesture effect.
- Typescript support.

## Environment Support

- Modern browsers (Chrome and Firefox)
- [Electron](https://www.electronjs.org/)

## Install

```bash
npm install custom-ui
```

```bash
yarn add custom-ui
```

## Usage

custom-ui supports tree shaking of ES modules, so using import { Button } from 'custom-ui'; would drop js code you didn't use.

```jsx
import { Button, Input } from 'react-customize-ui';

const App = () => (
  <>
    <Button variant="outlined">Button</Button>
    <Input label="Input xxx" />
  </>
);
```

When you need to use other export function of a component, you can also import it separately as follows.

```javascript
import Checkbox, { CheckboxGroup } from 'react-customize-ui/es/Checkbox';
import Form, { useForm, FormProvider } from 'react-customize-ui/lib/Form';
```

## Development

Clone locally:

```bash
$ git clone git@github.com:SSSensational/custom-ui.git
$ cd ant-design
$ npm install
$ npm start
```

Open your browser and visit http://localhost:3000 .