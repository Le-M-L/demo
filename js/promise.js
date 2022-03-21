function Promise(exector) {
  this.stats = "padding";
  this.value = undefined;
  this.onResolveCallBacks = []; // 用于存放成功的回调
  this.onRejectCallBacks = []; // 用于存放失败的回调
  let self = this;

  function resolve(value) {
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
    } else if (
      x !== null &&
      (typeof x === "object" || typeof x === "function")
    ) {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (r) => resolve(r),
          (err) => reject(err)
        );
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (oldResolve, oldReject) {
  let self = this;
  let promise2 = new Promise(function (resolve, reject) {
    if (self.stats === "fulfilled") {
      setTimeout(() => {
        try {
          let x = oldResolve(self.value);
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

Promise.all = function (promises) {
  return new Promise((resove, reject) => {
    let arr = [];
    let index = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (res) => {
          arr[i] = res;
          index++;
          if (index === promises.length) {
            resove(arr);
          }
        },
        (err) => reject(err)
      );
    }
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let item of promises) {
      item.then(resolve, reject);
    }
  });
};

module.exports = Promise;
