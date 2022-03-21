function Promise(exector) {
    this.stats = 'padding';
    this.value = undefined;
    this.onResolveCallBacks = [];   // 用于存放成功的回调
    this.onRejectCallBacks = [];    // 用于存放失败的回调
    let self = this;

    function resolve(value) {
        if (self.stats === 'padding') {
            self.stats = 'fulfilled';
            self.value = value;
            self.onResolveCallBacks.forEach(cb => cb())
        }
    }

    function reject(value) {
        if (self.stats === 'padding') {
            self.stats = 'rejected';
            self.value = value;
            self.onRejectCallBacks.forEach(cb => cb())
        }

    }

    try {
        exector(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

function rejectAll (x,resolve, reject){
    try {
        
    } catch (error) {
        
    }
}

Promise.prototype.then = function (resolve, reject) {
    let self = this;
    // 如果是异步方法 then会先执行 需要先将函数存起来
    if (this.stats === 'padding') {
        this.onResolveCallBacks.push(() => resolve(self.value))
        this.onRejectCallBacks.push(() => reject(self.value))
    }

    if (this.stats === 'fulfilled') {
        let x = self.value;
        rejectAll(x,resolve, reject)
    }

    if (this.stats === 'rejected') {
        let x = self.value;
        rejectAll(x,resolve, reject)
    }


}


module.exports = Promise