# JavaScript 题解

### 1， 说一说 Vue 和 React 的区别

本质上 Vue 是 mvvm 框架，由 MVC 发展而来，react 本质是前端组件化框架，由后端组件发展而来。

1. 模板上的区别: vue 使用模板，最早是由 angular 提出来的，react 使用的是 jsx 语法。

2. 组件化区别： react 本身就是组件化，没有组件化就不是 react，vue 也支持组件化，不过是在 mvvm 上扩展。

共同点: 都支持组件化，都是数据驱动视图。

#### 1.1 mvvm 框架

Model-View-ViewModel 的缩写，即 模型-视图-视图模型

M- Model，模型，指的是后端传递的数据。

V- View, 视图，指的是所看到的的页面。

VM- ViewModel， 视图模型， mvvm 模型的核心，连接 view-model 的桥梁。

vm-两个方向

1. 将模型转化成视图，即将后端传递的数据转化成所看到的页面。 实现方式：数据绑定
2. 将视图转换成模型。即将所看到的页面转化成后端的数据。实现方式：DOM 事件监听。

两个方向都实现，称之为数据的双向绑定。

总结： 在 MVVM 的框架下视图和模型不能直接通信的。他们通过 ViewModel 来通信，ViewModel 通常要实现一个 observer 观察者，当数据发生变化，ViewModel 能够监听到数据的变化，然后通知对应的视图自动更新，而当用户操作视图，ViewModel 也能够监听到视图的变化，然后通知数据做改动，这实际上就实现了数据的双向绑定。

### 2，页面性能的提升方式

1. 资源压缩合并，减少 http 请求
2. 非核心代码异步加载
3. 利用浏览器的缓存（强缓存和协商缓存）
4. 使用 CDN 加载静态资源 ？？？
5. css 文件放到 `<head>` 标签中引用，js 文件在`<body>` 标签中引用，优化关键渲染路径
6. 预解析 DNS、减少 DNS 的请求次数。
7. 动画尽量使用 css3 动画属性来实现，开启 GPU 硬件加速
8. 减少 DOM 访问次数，可以将 dom 缓存到变量中，css 层级尽量扁平化，避免过多的层级嵌套。

#### 2.1 浏览器的强缓存和协商缓存

缓存 -- 指浏览器客户端在本地磁盘中对访问过的资源保存的副本文件。

浏览器缓存主要有以下几个有点：

1. 减少重复数据请求，避免通过网络再次加载资源，节省流量
2. 降低服务器的压力，提升网站性能。
3. 加快客户端加载网页的速度，提升用户体验。

> 浏览器在第一次请求发生后，再次请求时：
>
> 1.  浏览器会先获取该资源缓存的 header 信息，根据其中的 expires 和 cache-control 判断是否命中强缓存，若命中则直接从缓存中获取资源，包括缓存的 header 信息，本次请求不会与服务器进行通信；
> 2.  如果没用命中强缓存，浏览器会发送请求到服务器，该请求会携带第一次请求返回的有关缓存的 header 字段信息（Lase-Modified/IF-Modified-Since、Etag/IF-None-Match），由服务器根据请求中的相关 header 信息来对比结果是否命中协商缓存，若命中，则服务器返回新的响应 header 信息更新缓存中的对应 header 信息，但是并不返回资源内容，它会告知浏览器可以直接从缓存获取，否则返回最新的资源内容。

**强缓存**

强缓存是利用 http 头中的 Expires 或者 Cache-Control 两个字段来控制的，用来表示资源的缓存时间。

Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用时 Cache-Control 优先级高。

**协商缓存**

协商缓存就是由服务器来确定缓存资源是否可用，所以客户端与服务端要通过某种标识来进行通信，从而让服务器判断请求资源是否可以缓存访问，这主要涉及到下面两组 header 字段，这两组搭档都是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified 或者 Etag），则后续请求则会带上对应的请求字段（IF-Modified-Since 或者 If-None-Match），若响应头没有 Last-Modified 或者 Etag 字段，则请求头也不会有对应的字段。

#### 2.2 CDN 加载静态资源

CND 内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

CDN 的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或者网络中，在用户访问网络时，利用全局负载技术将用户的访问指定距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

#### 2.3 DNS 预解析 与 域名解析

DNS 全称为 Domin Name System， 即域名系统，是域名和 IP 地址相互映射的一个分布式数据库。域名解析即通过主机名，最终得到该主机名对应的 IP 地址的过程。

> 浏览器对网站第一次的域名 DNS 解析查找流程依次是： `浏览器缓存——系统缓存——路有缓存——ISP DNS缓存——递归搜索`

- 解决方案 DNS 预解析是浏览器试图在用户访问连接之前解析域名，这是计算机的正常 DNS 解析机制。

域名解析后，如果用户却是访问该域名，那么 DNS 解析时间将不会有延迟。

遇到网页中的超链接，DNS prefetching 从中提取域名并将其解析为 IP 地址，这些工作在用户浏览网页时，使用最少的 CPU 和网络在后台进行解析。当用户点击这些已经预解析的域名，可以平均减少 200 毫秒耗时，

#### 2.4 异步加载

异步加载又叫非阻塞而加载，浏览器在下载执行 js 的同事，还会继续进行后续页面的处理。

##### 1. Script DOM Element _async_

async 属性是 HTML5 中新增的一部支持。 async function 关键字用来在表达式中定义一步函数。语法

```
/**
 * name 异步函数名称
 * @params 函数参数
 * statements 组成函数体的语句
 * @returns {Promise<any>}
 */

async function [name](parmas..., params) { statements }
```

异步函数表达式 与 `异步函数语句` 非常相似，语法也基本相同。他们之间的主要区别在于异步函数表达式可以省略函数名称来创建一个匿名函数。另外，异步函数表达式还可以用在 IIFE（立即执行函数表达式）中。

```
// 例如调用接口
export async function login(params) {
  return post('/loan/scf-server/login/in', params);
}
```

```javascript
import React from 'react';
import { Button } from 'antd';

function Example() {
  function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  const add1 = async function(x) {
    const a = await resolveAfter2Seconds(20);
    const b = await resolveAfter2Seconds(30);
    return x + a + b;
  };

  add1(10).then(v => {
    console.log(v);
  });

  (async function(x) {
    const a1 = resolveAfter2Seconds(20);
    const b1 = resolveAfter2Seconds(30);
    return x + a1 + b1;
  })(10).then(v => {
    console.log(v);
  });

  return (
    <div>
      <Button>clickMe</Button>
    </div>
  );
}

export default Example;
```

##### 1.1 await 操作符

##### 2. onload 异步加载

##### 3. 其他方法

### 3，讲一下 js 的同源策略

#### 3.1 同源策略

JavaScript 只能与同一个域中的页面进行通讯。

两个脚本被认为是同源的条件是：

`1、协议相同（http对http、https对https）`

`2、端口相同`

`3、域名相同`

如果三个条件有一条不满足，就不允许两个脚本进行交互。

- 同源策略带来的影响: 它影响了与 BOM、DOM 间的交互。

#### 3.2 跨域 主流跨域请求解决方案

##### 3.2.1 JSONP 实现跨域(jsonp 原理)

JSON 是一个轻量级的数据交换格式。

JSONP 是一个非官方的协议，他允许在服务器端集成 Script tags 返回至客户端，通过 JavaScript callback 的形式实现跨域访问。

- JSONP 实现原理？

##### 3.2.1 CORS 跨域

### 4，讲一下 jsonp 原理

### 5，讲一下 json 和 jsonp 的区别

### 6，js 的 eval 用法

### 7，浏览器是如何解析页面的，

### 8，在浏览器输入一个地址，是如何工作的？

### 9，说一下 cookie 和 session 的区别。

### 8，讲一下 cookie 的缺陷

### 9，Vue 如何实现双向绑定

### 10，实现跨域的方式有哪些

### 11，什么是闭包，有哪些用处

### 12，如何实现一个原生的 Ajax

### 13,用原生 js 为一个按钮添加两个事件

### 14，怎么理解组件化

### 15，什么是事件委托

### 16，清除浮动有哪些方法

### 17，引用样式有 link 和@import，他们有什么区别

### 18，加载 js 模块有几种方式

### 19，websorket 讲一下

### 20，组件之间如何通信

### 21，子组件如何监听父组件

### 22，http 工作原理

超文本传输协议，用于从 www 服务器传输超文本到本地浏览器的传送协议。它可以使浏览器更加高效，使网络传输减少。

HTTP 是基于 TCP 协议之上的。

HTTPS 采用非对称加密进行传输。

### 23，403 具体代表什么

### 24，构造函数

构造函数，是一种特殊的方法。主要是用来在创建时初始化对象，即为对象成员变量赋初始值，总与 new 运算符一起使用在创建对象的语句中。特别的一个类可以有多个构造函数，可根据其参数个数的不同或者参数类型的不同来区分他们，即为构造函数的重载。

### 25，tcp 结构

### 26，es6 都用过哪些语法

### 27，讲一下 promise

### 28，箭头函数有哪些类型？

### 29，说一下 this 的指向问题

### 30，null 和 undefined 的区别是什么

### 31，手机端有哪些兼容性

### 32，H5 如何提升页面性能，和 pc 端有什么区别

### 33，CSRF 是什么，怎么解决的

### 34， 输入 url 到页面呈现发生了什么？

#### 34.1 输入网址

当你输入网址时，浏览器智能匹配可能的地址。

#### 34.2 浏览器查找域名的 IP 地址

1. 请求一旦发起，浏览器首先解析域名，一般来说，浏览器会首先查看本地硬盘的 hosts 文件，看看其中有没有和域名匹配的，如果有，直接使用 hosts 文件里面的 ip 地址。
2. 如果在本地 hosts 文件中没有能够找到对应的 ip 地址，浏览器会发出一个 DNS 请求到本地 DNS 服务器。本地 DNS 服务器一般都是网络接入服务器上提供。
3. 查询输入的网址的 DNS 请求到达本地 DNS 服务器之后，本地 DNS 服务器会首先查询他的缓存记录，如果缓存中有此条记录，就可以直接返回结果，此过程是递归的方式进行查询。如果没有，本地 DNS 服务器还要向 DNS 根服务器进行查询。
4. 根 DNS 服务器没有记录具体的域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，你可以到域服务器上去继续访问，并给出域服务器的地址。这种过程是迭代的过程。
5. 本地 DNS 服务器继续向与服务器发出请求，在这个例子中，请求的对象是 .com 域服务器。 .com 域服务器收到请求之后，也不会直接返回域名和 IP 地址的对应关系，而是高度本地 DNS 服务器，你的域名的解析服务器地址。
6. 最后，本地 DNS 服务器向域名的解析服务器发送请求，这时就能收到一个域名和 IP 地址对应关系，本地 DNS 服务器不仅要把 IP 地址返回给用户电脑，还要把这个对应关系保存在缓存中，以备下次别的用户查询时，可以直接返回结果，加快网络访问。 ![](https://user-gold-cdn.xitu.io/2019/12/26/16f417c046e96ec6?w=850&h=628&f=png&s=476670)

#### 34.3 建立 TCP 链接

##### tcp 三次握手 （建立连接协议）

> TCP 的连接需要三次握手，只要没有收到确认消息就要重新发
>
> 1. 主机向服务器发送一个建立连接的请求
> 2. 服务器接收到请求后，发送同意连接的信号。
> 3. 主机接收到同意连接的信号后，再次向服务器发送确认信号，自此主机与服务器建立连接。

1. (第一次握手)：客户端将标志位 SYN 置为 1，随机产生一个值 seq=J,并将该数据包发送个服务器，客户端进入 SYN_SENT 状态，等待服务器确认。
2. (第二次握手)：服务器收到数据包后由标志位 SYN=1 知道客户端请求建立连接，服务器将标志位 SYN 和 ACK 都置为 1，ack=J+1,随机产生一个值 seq=K,并将该数据包发送给客户端以确认连接请求，服务器进入 SYN——RCVD 状态
3. (第三次握手)：客户端收到确认后，检查 ack 是否为 J+1,ACK 是否为 1，如果正确则将标志位 ACK 置为 1，ack=K+1,并将该数据包发送给服务器，服务器检查 ack 为 k+1,ACK 是否为 1，如果正确则连接建立成功，客户端和服务器进入 EATABLISHED 状态，完成三次握手，随后客户端和服务器之间可以开始传输数据了。 ![](https://user-gold-cdn.xitu.io/2019/12/27/16f452489c6af3c6?w=673&h=394&f=png&s=37372)

SYN 攻击：

在三次握手过程中，Server 发送 SYN-ACK 之后，收到客户端的 ACK 之前的 TCP 连接称为半连接，此时服务器处于 SYN_RCVD 状态，当收到 ACK 后，服务器将状态转为 EATABLISHED 状态。

SYN 共计就是客户端在短时间内伪造大量不存在的 IP 地址，并向服务器不断地发送 SYN 包，服务器发送确认包，并等待客户端的确认，由于源地址是不存在的，因此服务器需要不断重发直至超时，这些伪造的 SYN 包将产时间占用未连接队列，导致正常的 SYN 请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。 SYN 攻击是一种典型的 DDOS 攻击，检测 SYN 攻击非常简单，当服务器上有大量半连接状态且源 IP 地址是随机的，则可以判定遭到了 SYN 攻击了。

### 35 内存泄漏

导致内存泄漏的原因：1. 全局变量过多 2. DOM 清空时还在调用 3. 在 IE 中使用闭包 4. 定时器未清理 5. 子元素存在引起内存泄漏

解决方案：减少不必要的全局变量或者生命周期较长的对象，及时对无用的数据进行垃圾回收避免创建过多的对象，减少层级过多的引用

### 36, JavaScript 中的 call、apply、bind 深入理解

```
import React, { useEffect } from 'react';
import { Button } from 'antd';

function Demo1() {
  useEffect(() => {});

  function test() {
    console.log('test');
  }

  test(); // 直接调用

  return (
    <div>
      <Button onClick={() => test()}>clickMe</Button>
    </div>
  );
}

export default Demo1;

```

#### 1. `call()` JS 中函数调用的其中一种

call() 方法使用一个指定的 this 值和单独给出一个或多个参数来调用一个函数。

注意：该方法的语法和作用与 apply()方法类似。区别：call()方法接受的是一个参数列表，applay()接受的是一个包含多个参数的数组。

```
import React, { useEffect } from 'react';


function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);

function Demo1() {
  useEffect(() => {});
  return (
    <div>
      测试
    </div>
  );
}

export default Demo1;

```

返回值： 使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined

描述

call() 允许为不同的对象分配和调用属于一个对象的函数/方法

call() 提供新的 this 值给当前调用的函数/方法。你可以使用 call 来实现继承： 写一个方法，然后让另外一个新的对象来继承它。

##### 1.1. 使用 call 方法调用父构造函数。

在一个子构造函数中，你可以通过调用父构造函数的 call 方法实现继承。

下面例子中：使用 Food 和 Toy 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 和 price 属性，但是 category 属性是在各自的构造函数中定义的

```
import React, { useEffect } from 'react';

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

const cheese = new Food('feta', 5);
const fun = new Toy('robot', 10);

console.log(cheese);
console.log(fun);

function Demo1() {
  useEffect(() => {});
  return (
    <div>
      测试
    </div>
  );
}

export default Demo1;
// 输出
// Food {name: "feta", price: 5, category: "food"}
// Demo1.js:22 Toy {name: "robot", price: 10, category: "toy"}

```

##### 1.2. 使用 call 方法调用匿名函数。

在下例中的 for 循环体内，创建了一个匿名函数，然后通过调用该函数的 call 方法，将每个数组元素作为指定的 this 值执行了匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个 print 方法，这个 print 方法可以打印信息。

```
import React, { useEffect } from 'react';

const animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' },
];

for (let i = 0; i < animals.length; i += 1) {
  (function(i) {
    this.print = function () {
      console.log(i, this.species, this.name);
    }
    this.print();
  }).call(animals[i], i);
}

function Demo1() {
  useEffect(() => {});
  return (
    <div>
      测试
    </div>
  );
}

export default Demo1;

// 输出
// 0 "Lion" "King"
// Demo1.js:11 1 "Whale" "Fail"

```

##### 1.3. 使用 call 方法调用函数，并指定上下文的 this

##### 1.4. 使用 call 方法调用函数并且不指定第一个参数。（this 的值默认被绑定为全局对象）

#### 2. apply() 调用一个具有给定 this 的函数，以及作为一个数组提供的参数(剩下用法和 call 类似)

语法： `func.apply(thisArg, [argArray])`

### 37, ajax 和 axios、fetch 的区别

#### 1. ajax

- 使用步骤

1. 创建 XmlHttpRequest 对象
2. 调用 open 方法设置基本请求信息
3. 设置发送的数据，发送请求
4. 注册监听的回调函数
5. 拿到返回值，对页面进行更新

```javascript
//1.创建Ajax对象
if (window.XMLHttpRequest) {
  var oAjax = new XMLHttpRequest();
} else {
  var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
}

//2.连接服务器（打开和服务器的连接）
oAjax.open('GET', url, true);

//3.发送
oAjax.send();

//4.接收
oAjax.onreadystatechange = function() {
  if (oAjax.readyState == 4) {
    if (oAjax.status == 200) {
      //alert('成功了：'+oAjax.responseText);
      fnSucc(oAjax.responseText);
    } else {
      //alert('失败了');
      if (fnFaild) {
        fnFaild();
      }
    }
  }
};
```

**优缺点：**

- 本身是针对 MVC 的编程，不符合现在前端 MVVM 的浪潮
- 基于原生的 XHR 开发，XHR 本身的架构不够清晰，已经有了 fetch 的替代方案

#### 2， axios

Axios 是一个基于 promise 的 HTTP 库，可以再浏览器和 Node.js 中使用。

特性

- 从浏览器中创建 XMLHttpRequests
- 从 Node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和相应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

```javascript
// 上面的请求也可以这样做
axios
  .get('/user', {
    params: {
      ID: 12345,
    },
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

```javascript
axios
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

多个 并发请求

```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function(acct, perms) {
    // 两个请求现在都执行完成
  }),
);
```

**优缺点：**

- 从 node.js 创建 http 请求
- 支持 Promise API
- 客户端支持防止 CSRF
- 提供了一些并发请求的接口

#### 3. fetch

Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的部分，例如请求和响应。

它提供了一个全局的`fetch()`方法，该方法提供了一种简单，合理的方式来跨网络以不获取资源。 fetch 是一种 HTTP 数据请求方式，是 XMLHTTPRequest 的一种替代方案。 fetch 不是 ajax 的进一步封装，而是原生 js。 Fetch 函数就是原生 js。

```javascript
fetch(url, option)
  .then(checkStatus) // 检查错误码
  .then(response => responseJson(response));
```

- 当接收到一个代表错误的 HTTP 状态码时，从`fetch()`返回的 Promise 不会被标记为 reject，即使该 HTTP 相应的状态码是 404 或者 500。相反，它会将 Promise 状态标记为 resolve,仅当网络故障时或请求被阻止时，才会标记为 reject。

```
// 因此可以多加一个判断，判断状态码
export const checkStatus = response => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    // 调用成功
    return response;
  }
  const errortext = codeMessage[status] || response.statusText;
  const error = new Error();
  error.name = status;
  error.response = response;
  error.errortext = errortext;
  throw error;
};
```

- 默认情况加， fetch 不会从服务端发送或接受任何 cookie，如果站点依赖于用户 session，则会导致未经认证的请求。

```javascript
/**
 * 处理response
 * @param response
 * @param type
 */
function responseJson(response, type) {
  if (response && isEmptyObject(response)) {
    // 初始化
    if (type && type === 'text') {
      return response.text();
    }
    if (type && type === 'blob') {
      return response.blob();
    }
    return response.json();
  }
  if (type && type === 'blob') {
    return response.blob();
  }
  errorCallback(response);
  return null;
}
```

**response** 这里的 response 只是一个 HTTP 响应，而不是真的 JSON。为了获取 JSON 的内容我们需要使用对应的 .json() 、.text() 、 .blob()方法。

**优缺点：**

- 符合关注分离，没有将输入、输出和用事件来跟踪的状态混在一个对象里。
- 更加底层，提供了 API 丰富（request、response）
- 脱离了 XHR，是 ES 规范里新的实现方式
- 1. fetch 只对网络请求报错，对 400/500 都当成功的请求，需要封装去处理
- 2. fetch 默认不会带 cookie，需要添加配置项
- 3. fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
- 4. fetch 没有办法原生检测请求的进度，而 XHR 可以

### 38 Vue-router 有哪几种模式，有什么区别

hash 模式和 history 模式，默认的是 hash 模式

#### 1 hash 模式

hash 模式背后的原理是 onhashchange 事件，可以在 window 对象上监听这个事件：

```
window.onhashchange = function(event) {
  console.log(event.oldURL, event.newURL);
  let hash = locaiton.hash.slice(1);
  document.body.style.color = hash;
}
```

hash 发生变化的 url 都会被浏览器记录下来，从而会发现浏览器的前进后退都可以用。

#### 2 history 路由

这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无需加载页面。

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

### 39 浏览器的渲染机制

1. 浏览器获取 html 文件对其解析形成 dom 树。
2. 与此同时，进行 css 解析，生成 style rules。
3. 接着 DOM Tree 和 Style rules 合成 render tree.
4. 进入布局 layout 阶段，为每一个节点分配一个应出现在屏幕上的坐标。
5. 随后调用 GPU 进行绘制，遍历 render tree 的节点，将元素展现出来。

### 40 理解浅拷贝和深拷贝

- 浅拷贝， 是指创建一个对象，这个对象有着原始对象属性值的一份精确拷贝，如果属性是基本类型，那么拷贝的就是基本类型的值。如果属性是应用类型，那么拷贝的是内存地址，如果其中一个对象修改了某些属性，另外一个对象也会改变。
- 深拷贝，是指从一个内存中完整的拷贝一个对象出来，并且在堆内存中为其分配一个新的内存区域来存放。并且修改该对象属性值，不会影响到原来的对象。

浅拷贝的方式： 对象扩展运算符(...、 ==) 、 数组的 slice 方法、数组的 concat

深拷贝的方式： 通过 JSON.Stringify 和 JSON.parse 方式来转换，还有用原生 JS 手动递归来实现。

```javascript
// 元素类型判断
const getType = obj => {
  // tostring会返回对应不同的标签的构造函数
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

// 深拷贝方法
export const deepClone = data => {
  const type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i += 1) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    Object.keys(data).map(d => {
      obj[d] = deepClone(data[d]);
      return d;
    });
  }
  return obj;
};
```

### 相同域名不同端口号的两个项目，cookie 相同名字会被覆盖

之前学习过同源策略，提及到：同一协议、同一域名、统一端口号，当其中一个不满足时，请求会发生跨域问题。

但是在实际项目中，遇到过本地启动两个项目遇到过 “协议相同，域名相同，端口号不同，但是在往 cookie 存放相同的一个字段 token 时，会发现 前一个存放的 token，会被后一个 token 覆盖掉” 这个问题。

### webSocket 服务器主动向 浏览器发送数据

WebSocket 是 THML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

WebScoket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 webScoket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

在 webSocket API 中，浏览器和服务器只需要做一次握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。
