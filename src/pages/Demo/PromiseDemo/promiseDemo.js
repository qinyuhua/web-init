/**
 *
 * @param constructor
 */
function MyPromise(constructor) {
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
      self.onFulfilledArray.forEach(f => {
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

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    throw new TypeError('type error');
  }
  let isUsed;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const { then } = x;
      if (typeof then === 'function') {
        // 是一个promise的情况
        then.call(
          x,
          y => {
            if (isUsed) return;
            isUsed = true;
            resolvePromise(promise, y, resolve, reject);
          },
          e => {
            if (isUsed) return;
            isUsed = true;
            reject(e);
          },
        );
      } else {
        // 仅仅是一个函数或者是对象
        resolve(x);
      }
    } catch (e) {
      if (isUsed) return;
      isUsed = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;
  let promise2;
  switch (self.status) {
    case 'pending':
      promise2 = new MyPromise((resolve, reject) => {
        self.onFulfilledArray.push(() => {
          setTimeout(() => {
            try {
              const temple = onFulfilled(self.value);
              resolve(temple);
            } catch (e) {
              reject(e);
            }
          });
        });
        self.onRejectedArray.push(() => {
          setTimeout(() => {
            try {
              const temple = onRejected(self.reason);
              reject(temple);
            } catch (e) {
              reject(e);
            }
          });
        });
      });
      break;
    case 'resolved':
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const temple = onFulfilled(self.value);
            // 将上次一then里面的方法传递进下一个Promise的状态
            resolvePromise(temple);
          } catch (e) {
            reject(e); // error catch
          }
        });
      });
      break;
    case 'rejected':
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const temple = onRejected(self.reason);
            // 将then里面的方法传递到下一个Promise的状态里
            resolvePromise(temple);
          } catch (e) {
            reject(e);
          }
        });
      });
      break;
    default:
  }
  return promise2;
};

export default MyPromise;
