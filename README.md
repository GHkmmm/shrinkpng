<h1 align="center">shrinkjs</h1>

<p align="center" style="color:#0066cc;font-size:18px">Compress the image files obtained by the front end</p>

<p align="center">
  🚀 <a href="https://www.npmjs.com/package/shrinkjs" target="_blank">npm</a>
</p>

## 安装

打开终端运行下列命令：

```
npm install shrinkjs
```

或

```
yarn add shrinkjs
```

## 开始使用

请先[下载]()本插件

然后在你的代码中引入 shrinkjs

```js
import { shrinkImage } from "shrinkjs";

...
const _file = await shrinkImage(file, {
  quality: 80
});
```

#### Vue 文件示例

代码示例

```vue
<template>
  <div id="app">
    <input
      type="file"
      class="file"
      id="imgUpFile"
      style="position: absolute; left: 0; top: 0; width: 100%; height: 100%"
    />
  </div>
</template>

<script>
import { shrinkImage } from "shrinkjs";

export default {
  name: "App",
  mounted() {
    document.getElementById("imgUpFile").addEventListener("change", (e) => {
      const file = e.target.files[0];
      const _file = await shrinkImage(file, {
        quality: 80
      }); // compress file
    });
  },
};
</script>
```
