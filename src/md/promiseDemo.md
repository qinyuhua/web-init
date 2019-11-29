简单介绍：Promise 允许我们通过链式调用的方式来解决“回调地域”的问题，特别是在一步过程中，通过 Promise 可以保证代码的整洁性和可读性。本文主要解读 Promise、A+规范，并在此规范的基础上，自己实现一个 Promise。

### 一、Promise 的使用

在了解 Promise 规范之前，我们知道主流的高版本浏览器已经支持 ECMA 中的 Promise。

创建一个 promise 实例：

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});
p.then(x => {
  console.log(x);
});

// 输出：
// 创建一个新的promise
success;
```

上述是一个 promise 的实例，输入内容“创建一个 promise”，延迟 1000ms 后，输出"success"。

从上述的例子中可以看出，promise 方便处理异步操作，此外 promise 还可以链式的调用

```
const p = new Promise((resolve, reject) => {resolve()});
p.then(...).then(...).then(...)
```

此外，Promise 除了 then 方法外，还提供了 Promise.resolve 、Promise.all 、 Promise.race 等方法。

### 二、Promise/A+ 规范

Promise/A+规范扩展了早起的 Promise/A proposal 提案，我们来解读一下 Promise/A+规范

##### 1. 术语

（1） “promise” 是一个对象或者函数，该对象或者函数有一个 then 方法

（2） “thenable” 是一个对象或者函数，用来定义 then 方法

（3） “value” 是 promise 状态成功时的值

（4） “reason” 是 promise 状态失败时的值

我们明确术语的鸣笛，是为了在自己实现 promise 时，保持代码的规范性。

##### 2. 要求

（1） 一个 promise 必须有 3 种状态， pending、fulfilled(resolved)、rejected，rejected

当处于 pending 状态的时候，可以转移到 fulfilled(resolved)或者 rejected 状态

当处于 fulfilled(resolved)或者 rejected 状态时，不可以转变，这个过程是不可逆的。

（2） 一个 promise 必须有一个 then 方法，then 方法接受两个参数：

```
promise.then(onFulfilled, onRejected)
```

其中 onFilfilled 表示状态从 pending 转为 fulfilled(resolved) 状态时，所执行的方法

onRejected 表示状态从 pending 转为 rejected 状态所执行的方法

（3） 为了实现链式调用，then 方法必须返回一个 promise

```
promise2 = promise2.then(onFulfilled, onRejected)
```

### 三、实现一个符合 Promise/A+ 规范的 Promise

##### 如何实现一个 Promise

##### 1. v1.0 初始版本 myPromise

```javascript
function myPromise(constructor) {
  const self = this;
  self.status = 'pending'; // 定义状态改变前的初始状态
  self.value = undefined; // 定义状态为resolved 的时候的状态
  self.reason = undefined; // 定义状态为rejected 的时候的状态
  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.value = value;
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.value = reason;
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function(onFulfulled, onRejected) {
  const self = this;
  console.log(self);
  switch (self.status) {
    case 'resolved':
      onFulfulled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;
    default:
  }
};

export default myPromise;
```

上述就是一个初始版本的 myPromise，在 myPromise 里发生状态改变，然后在相应的 then 方法里面根据不同的状态可以执行不同的操作。

```javascript
const p = new myPromise((resolve, reject) => {
  resolve(1);
});
p.then(x => {
  console.log(x);
});
//输出1
```

但是这里 myPromise 无法处理异步的 resolve,比如

```javascript
const p = new myPromise((resolve, reject) => {
  // resolve(1);
  setTimeout(() => {
    resolve(2);
  }, 1000);
});
p.then(x => {
  console.log(x);
});
// 无输入 ???
```

##### 2. v2.0 基于观察模式实现 provise

为了处理异步 resolve， 我们修改 myPromise 的定义，用 2 个数组 onFulfilledArray 和 onRejectedArray 来保存异步的方法。在状态发生改变时，一次遍历执行数组中的方法。

```javascript
function myPromise(constructor) {
  const self = this;
  self.status = 'pending'; // 定义状态改变前的初始状态
  self.value = undefined; // 定义状态为resolved 的时候的状态
  self.reason = undefined; // 定义状态为rejected 的时候的状态

  self.onFulfilledArray = [];
  self.onRejectedArray = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.value = value;
      self.onFulfilledArray.forEach(function(f) {
        f(self.value);
        // 如果状态从pending 变为 resolved， 那么就遍历执行里面的异步方法
      });
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.value = reason;
      self.onRejectedArray.forEach(f => {
        f(self.reason);
      });
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function(onFulfulled, onRejected) {
  const self = this;
  console.log(self);
  switch (self.status) {
    case 'pending':
      self.onFulfilledArray.push(function() {
        onFulfulled(self.value);
      });
      self.onRejectedArray.push(function() {
        onRejected(self.reason);
      });
      break;
    case 'resolved':
      onFulfulled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;
    default:
  }
};

export default myPromise;
```

这样，通过两个数组，在状态发生改变之后再执行，这样可以处理异步 resolve 无法调用的问题。这个版本的 myPromise 就能处理所有的异步，那么这样做就完整了吗？

没有，我们做 Promise/A+规范的最大的特点就是链式调用，也就是说 then 方法返回的应该是一个 promise。

##### 3. v3.0 then 方法实现链式调用

要通过 then 方法实现链式调用，那么也就是说 then 方法每次调用需要返回一个 promise，同时在返回 promise 的构造体里面，增加错误处理函数，我们来改造 then 方法

```javascript
myPromise.prototype.then = function(onFulfulled, onRejected) {
  const self = this;
  console.log(self);
  let promise2;
  switch (self.status) {
    case 'pending':
      promise2 = new myPromise(function(resolve, reject) {
        self.onFulfilledArray.push(function() {
          try {
            const temple = onFulfulled(self.value);
            resolve(temple);
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedArray.push(function() {
          try {
            const temple = onRejected(self.reason);
            reject(temple);
          } catch (e) {
            reject(e);
          }
        });
      });
      break;
    case 'resolved':
      promise2 = new myPromise(function(resolve, reject) {
        try {
          const temple = onFullfilled(self.value);
          // 将上次一then里面的方法传递进下一个Promise的状态
          resolve(temple);
        } catch (e) {
          reject(e); // error catch
        }
      });
      break;
    case 'rejected':
      promise2 = new myPromise(function(resolve, reject) {
        try {
          const temple = onRejected(self.reason);
          // 将then里面的方法传递到下一个Promise的状态里
          resolve(temple);
        } catch (e) {
          reject(e);
        }
      });
      break;
    default:
  }
  return promise2;
};
```

这样通过 then 方法返回一个 promise 就可以实现链式的调用。

```javascript
p.then(function(x) {
  console.log(x);
})
  .then(function() {
    console.log('链式调用1');
  })
  .then(function() {
    console.log('链式调用2');
  });
//输出
1;
链式调用1;
链式调用2;
```

这样我们虽然实现了 then 函数的链式调用，但是还有一个问题，就是在 Promise/A+规范中 then 函数里面的 onFullfilled 方法和 onRejected 方法的返回值可以是对象，函数，甚至是另一个 promise。

##### 4. then 函数中的 onFulfilled 和 onRejected 方法的返回值问题

特别的为了解决 onFulfilled 和 onRejected 方法的返回值可能是一个 promise 的问题

(1) 首先来看 promise 中对于 onFulfilled 函数的返回值的要求

1） 如果 onFulfilled 函数返回的是该 promise 本身，那么会抛出类型错误

2） 如果 onFulfilled 函数返回的是一个不同的 promise，那么执行该 promise 的 then 函数，在 then 函数里将这个 promise 的状态转移给新的 promise

3）如果返回的是一个嵌套类型的 promise，那么需要递归

4）如果返回的是非 promise 的对象或者函数，那么会选择直接将该对象或者函数，给新的 promise

根据上述返回值的要求，我们要重新定义 resolve 函数，这里 Promise/A+规范里面称为：resolvePromise 函数，该函数接受当前的 promise、onFulfilled 函数或者 onRejected 函数的返回值、 resolve 和 reject 作为函数。

下面我们来看 resolvePromise 函数
