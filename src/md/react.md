# React

## 1. React 优势

1. React 速度很快，他并不是直接对 DOM 进行操作，引入了一个叫虚拟 DOM 的概念，安插在 javaScript 逻辑和实际的 DOM 之间，性能好。
2. 跨浏览器兼容：虚拟 DOM 帮助我们解决了跨浏览器问题，它为我们提供了标准化的 API，甚至在 IE8 中都没有问题。
3. 一切都是 component:代码更加模块化，重用代码更容易，可维护性高。
4. 单向数据流。Flux 是一个用于在 JavaScipt 应用中创建的单向数据层的架构，它随着 React 视图库的开发而被 Facebook 概念化。
5. 同构、纯粹的 javaScript，
6. 兼容性好。

## 2. Hook 学习

> Hook 是 React16.8 的新增属性，可以再不编写 class 的情况下使用 state 以及其他 React 特性

```javascript
import React, { useState } from 'react';
import { Button } from 'antd';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>clickMe</Button>
    </div>
  );
}

export default Example;
```

备注： Hook 是完全可选的、100%向后兼容的、现在可用的。

##### 解决问题：

#### 2.1 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为附加到组件途径，如果你是用过 React 一段时间，你会熟悉一些解决此类问题的方案，例如 render props 和高阶组件。

但是这类方案需要重新组织组件接结构，还能能会很麻烦，很难理解，如果在 React DevTools 中观察 React 应用，你会发现由 providers、consumers、高阶组件、render props 等抽象层组成的组件会形成嵌套地域。

React 需要为共享状态逻辑提供更好的原生途径。

Hook 使无需修改组件结构的情况下复用状态逻辑。

#### 2.2 复杂组件变得很难理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据，但是同一个 componentDidMount 中可能也包含其他的逻辑，入设置事件监听，而之后需要 componentWillUNmount 中清除。

相互关联且需要对修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起，这样会容易产生 bug，并导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。

为了解决这一问题，**Hook 将组件中相互关联的部分拆分为更小的函数（比如设置订阅或者请求数据）**，而并非强制按照生命周期划分。

**Hook 使你在非 class 的情况下可以使用更多的 React 特性。**

#### 2.3 State Hook

下方代码用来显示一个计数器，当点击按钮，计数器就会增加：

```javascript
import React, { useState } from 'react';
import { Button } from 'antd';

/**
 * useState 就是一个hook,
 * useState 会返回一对值，当前状态和一个让你更新它的函数。
 * 类似class组件的this.setState,但是它不会把新的state和旧的state进行合并。
 * @returns {*}
 * @constructor
 *
 * useState的唯一参数就是初始化的state，
 */
function Example() {
  // 生命一个叫 count 的state 变量
  // useState 就是一个Hook
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>clickMe</Button>
    </div>
  );
}

export default Example;
```

上面代码等价于：

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
      </div>
    );
  }
}
```

useState 就是一个 hook,useState 会返回一对值，当前状态和一个让你更新它的函数。类似 class 组件的 this.setState,但是它不会把新的 state 和旧的 state 进行合并。

useState 的唯一参数就是初始化的 state，这里的 state 不一定是一个对象，可以是任何值。

##### 2.3.1 声明 state 变量

在 class 中，我们通过在构造函数中设置 this.state 为 {count: 0}来初始化 count，state

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
}
```

数组解构的语法让我们在调用 useState 时可以给 state 变量取不同的名字。当然，这些名字并不是 useState API 的一部分。 React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。后面我们会再次解释它是如何工作的以及在什么场景下使用。

在函数组件中，我们没有 this，所以我们不能分配或读取 this.state。我们直接在组件中调用 useState Hook：

```javascript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
}
```

**调用 useState 方法的时候做了什么？** 它定义了一个“state”变量。

##### 2.3.2 什么是 Hook？

Hook 是一些可以让你在函数组件中“钩入” React State 及生命周期等特性的函数。 Hook 不能在茶历史上组件中使用————这使得可以不使用 class 也能用 React。

React 内置了一些像 useState 这样的 Hook。可以创建自己的 Hook 来复用不同组件之间的状态逻辑。

### 2.4 Effect Hook

你之前可能已经在 React 中执行过数据获取、订阅或者手动修改过 DOM，我们统一把这些操作成为“副作用”，或者简称为“作用”。

useEffect 就是一个 Effect Hook， 给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUNmount 具有相同的用途，只不过被合并成一个 API。

**无需清除的 Effect**

```javascript
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

function Example() {
  // 生命一个叫 count 的state 变量
  // useState 就是一个Hook
  const [count, setCount] = useState(0);

  // 相当于componentDidMount 和 componentDidUpdate
  useEffect(() => {
    console.log(count);
    document.title = `you clicked ${count} times`;
  });

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>clickMe</Button>
    </div>
  );
}

export default Example;
```

**useEffect 做了什么？** 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数，并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document.title 属性，不过我们也可以执行数据获取或者调用其他命令式 API。

当你调用 useEffect 时，就是告诉 React 在完成对 DOM 的更改后运行你的函数。

由于副作用函数是在组件内生命的，所以他们可以访问到组件的 props 和 state。

默认情况下，React 会在每次渲染后调用副作用函数————包括第一次渲染的时候。

副作用函数还可以通过返回一个函数来制定如何清除副作用。

### 2.5 Hook 使用规则

Hook 就是 javaScript 函数，但是使用它们会有两个额外的规则：

1. 只能在函数最外层调用 Hook。不要再循环、条件判断或者子函数中调用。
2. 只能在 React 的函数组件中调用 Hook。 不要在其他 JavaScript 函数中调用。

## 3. Component 和 PureComponent 的区别

> React.PureComponent 与 React.Component 几乎完全相同，但是 React.PureComponent 通过 props 和 state 的浅对比来实现 shouldComponentUpdate()， 某些情况下可以用 PureComponent 提升性能。

> 参照 https://www.jianshu.com/p/b7733dc8f826

当 props 或者 state 改变时，PureComponent 将对 props 和 state 进行浅比较。

Component 不会比较当前装填和下一个状态的 pros 和 state，因此，每当 shouldComponentUpdate 被调用时，组件默认的会重新渲染。

#### 区别点：

1. PureComponent 自带通过 props 和 state 的浅比较来实现 shouldComponentUpdate()，而 Component 没有。

```
PureComponent不仅会影响本身，而且还会影响子组件，所以PureComponent最佳情况是展示组件。
```

#### 可以用 PureComponent 提升性能

## 4. 为什么虚拟 DOM 会提高性能？

虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提升性能。

用 JavaScript 对象结构表示 DOM 树的结构; 然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一颗新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异，然后把新的更新到旧的去重建真正的 DOM 树，视图就更新了。

## 5. 前端框架 Flux 架构简介

> Flux 是 Facebook 用户建立客户端 Web 应用的前端框架，它通过利用一个**单向的数据流补充了 React 的组合视图组件**，这更是一种模式而非正式框架。

### 5.1 Flux 思想

> 最大特点，就是数据的“单向流动”

1. 用户访问 View
2. View 发出用户端 Action
3. Dispatch 收到 Action，要求 Store 进行相应的更新。
4. Store 更新后，发出一个“change”事件
5. View 收到“change” 事件后，更新页面。

### 5.2 Flux 组成

Flux 应用有三个主要部分：Dispatcher 调度、存储 Store 和视图 View

### 6. React 之 diff 算法

Diff 算法的作用是用来计算出 Virtual DOM 中被改变的部分，然后针对该部分进行原生 DOM 操作，而不用重新渲染整个页面。

只有在 React 更新阶段才会有 Diff 算法的运用。

diff 算法是**调和的具体实现**

**调和** 是将 Virtual DOM 树转换成 actual DOM 树的最小操作单过程，称为调和。

#### 6.1 什么是 Diff 算法

- 传统 Diff. diff 算法即*差异查找算法*；对于 HTML DOM 结构即为 tree 的差异查找算法；二对于计算两棵树的差异时间复杂度为 O（n^3）, 显然成本太高， React 不可能采用传统算法。
- React Diff。
  1. React 采用虚拟 DOM 技术实现对真实 DOM 的映射，即 React Diff 算法的差异查找实质是对两个 JavaScript 对象的差异查找。
  2. 基于三个策略：[Diff 算法的三大策略]

#### 6.1.1 策略一、Tree Diff

> Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。

#### 6.1.2 策略二、Component Diff

> 拥有相同类的两个组件将会生成相似的树形结构。拥有不同类的两个组件将会生成不同的树形结构。

#### 6.1.3 策略三、Element Diff

> 对于同一层级的一组子节点，他们可以同构唯一 id 进行区分。
