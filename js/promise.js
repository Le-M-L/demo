// 原生promise 简单的实现
function Promise(exector) {
  this.stats = "padding";
  this.value = undefined;
  this.onResolveCallBacks = []; // 用于存放成功的回调
  this.onRejectCallBacks = []; // 用于存放失败的回调
  let self = this;

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    if (self.stats === "padding") {
      self.stats = "fulfilled";
      self.value = value;
      self.onResolveCallBacks.forEach((cb) => cb && cb());
    }
    return value;
  }

  function reject(value) {
    if (self.stats === "padding") {
      self.stats = "rejected";
      self.value = value;
      self.onRejectCallBacks.forEach((cb) => cb && cb());
    }
    return value;
  }

  try {
    exector(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
// 链式调用.then
function resovePromise(promise2, x, resolve, reject) {
  try {
    if (promise2 === x) {
      return reject(new TypeError("重复引用"));
    } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
      let called;
      try {
        let then = x.then;
        if (typeof then === "function") {
          then.call(x,
            (r) => {
              if (called) return;
              called = true;
              // 如果resolve 的值还是一个 promise 那么就递归解析 直到为常量为止
              resovePromise(promise2, r, resolve, reject)
            },
            (err) => {
              if (called) return;
              called = true;
              reject(err)
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        reject(error);

      }
    } else {
      resolve(x);
    }
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (oldResolve, oldReject) {
  oldResolve = typeof oldResolve === 'function' ? oldResolve : val => val
  oldReject = typeof oldReject === 'function' ? oldReject : err => { throw err };
  let self = this;
  let promise2 = new Promise(function (resolve, reject) {
    if (self.stats === "fulfilled") {
      setTimeout(() => {
        try {
          let x = oldResolve(self.value);
          self.finally(x)
          resovePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }

    if (self.stats === "rejected") {
      setTimeout(() => {
        try {
          let x = oldReject(self.value);
          self.finally(x)
          resovePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }

    // 如果是异步方法 then会先执行 需要先将函数存起来
    if (self.stats === "padding") {
      try {
        self.onResolveCallBacks.push(() => {
          let x = oldResolve(self.value);
          resovePromise(promise2, x, resolve, reject);
        });
        self.onRejectCallBacks.push(() => {
          let x = oldReject(self.value);
          resovePromise(promise2, x, resolve, reject);
        });
      } catch (error) {
        oldReject(error);
      }
    }
  });
  return promise2;
};

Promise.prototype.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.prototype.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.prototype.catch = function (errCallback) {
  this.then(null, errCallback)
}

Promise.prototype.finally = function(onFinally) {
  return this.then(
    res => this.resolve(onFinally()).then(() => res),
    err => this.resolve(onFinally()).then(() => { throw err; })
  );
};
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let index = 0;
    function setData(i, val) {
      arr[i] = val;
      index++;
      if (index === promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      if (promises[i] instanceof Promise) {
        promises[i].then(
          (res) => {
            setData(i, res)
          },
          (err) => reject(err)
        );
      } else {
        setData(i, promises[i])
      }

    }
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let item of promises) {
      if (item instanceof Promise) {
        item.then(resolve, reject);
      } else {
        reject(item)
      }
    }
  });
};

// 延迟对象
// Promise.deferred = function () {
//   let dfd = {};
//   dfd = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       dfd.resolve = resolve;
//       dfd.reject = reject;
//     })
//   })
//   console.log(dfd);
//   return dfd
// }

module.exports = Promise;
