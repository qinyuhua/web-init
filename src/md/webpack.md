## 1. 概念

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。

当 webpack 处理应用程序时，他会在内部构建一个依赖图，此依赖图会映射项目所需的每个模块，并生成一个或者多个 bundle。

**webpack 可以不用再引入一个配置文件**来打包项目，然而，但它仍然有着高度可配置性，可以满足需求。

#### 核心概念

1. 入口（entry）
2. 输出（output）
3. loader
4. 插件（plugin）
5. 模式（mode）
6. 浏览器兼容性（browser compatibility）

### 1.1 入口（entry）

入口起点，entry point 指示 webpack 应该使用哪些模块，用作为构建其内部。

```
module.exports = {
  entry: './src/index.js',
};
```

### 1.2 输出 （output）

```
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## 2. webpack 打包原理

webpack 只是一个打包模块的机制，只是把依赖的模块转化成可以代表这些包的静态文件。

将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源。

#### 2.1 主要功能

1.  打包。将多个文件打包成一个文件，减少服务器压力和下载带宽；
2.  转换。将预编译语言转换成 浏览器识别的语言
3.  优化。性能优化。

#### 2.2 webpack 特点

1.  代码拆分
2.  智能解析
3.  快速运行
