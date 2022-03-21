const Promise = require('./promise')

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111')
    },1000)
})

p.then(null,err => {
    console.log(err,'err')
})
