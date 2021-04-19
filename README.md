# swagger-doc-preview

> 实时预览 Swagger 文档 ，您只需要输入一个 Swagger JSON 的文档地址即可渲染。项目主页：
> 
> https://github.com/run27017/swagger-doc-preview

主要特点：

- 历史记录
- 原生 SwaggerUI 配置对象
- 定时刷新

## 使用指南

既可作为库使用，亦可独立部署。

### 作为库使用

**前提：** 需要自己管理 Vue、ElementUI 和 SwaggerUI 库。

首先在自己的项目内安装依赖包：

```bash
$ yarn add vue element-ui swagger-ui swagger-doc-preview
```

然后在项目内初始化 `element-ui`

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

最后在页面内引入组件

```vue
<template>
  <SwaggerDocPreview />
</template>

<script>
import SwaggerDocPreview from 'swagger-doc-preview'

export default {
  components: {
    SwaggerDocPreview
  }
}
</script>
```

### 独立部署

安装依赖

```
$ yarn
```

构建静态文件目录

```
$ yarn run build
```

会生成一个 `dist` 目录。

## 组件列表

`SwaggerDocPreview` 是一个集历史列表、配置于一体的完整组件，其中的零部件可以单独引入。例如可单独引入 `CustomizeConfig`组件：

```vue
<template>
  <CustomizeConfig ref="customizeConfig" @change="onConfigChange" />
</template>

<script>
import { CustomizeConfig } from 'swagger-doc-preview'

export default {
  components: {
    CustomizeConfig
  },
  methods: {
    onConfigChange (config) {
      console.log('New config saved', config)
    }
  }
}
</script>
```

## License

MIT
