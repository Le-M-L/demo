const Promise = require("./promise");

let p = new Promise((resolve, reject) => {
    resolve("111");
    setTimeout(() => {
  }, 1000);
});

p.then(res => {
  console.log(res)
  return res
})
.finally(res => {
  console.log(res,'----')
})
.then(res => {
  console.log(res,'====')
})

