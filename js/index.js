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
// .finally(res => {
//   console.log(res,'----')
// })
.then(res => {
  console.log(res,'====')
})

let obj = {
  name:1,
  fn:function (){
    console.log(this.name)
    function dd(){
      console.log(this.name)
    }
    dd()
    dd.call(obj)
  }
}
obj.fn()