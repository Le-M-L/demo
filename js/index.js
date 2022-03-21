const Promise = require("./promise");

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("111");
  }, 1000);
});

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2222");
  }, 2000);
});

Promise.race([p, p1]).then(
  (res) => {
    console.log(res,'2222222222');
  },
  (err) => {
    console.log(err,'1111111111111111');
  }
);
