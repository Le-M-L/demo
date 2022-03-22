/**
 * @internal
 */
function createFilterWrapper(filter, fn) {
    function wrapper(...args) {
        filter(() => fn.apply(this, args), { fn, thisArg: this, args });
    }
    return wrapper;
}

/**
 * 创建一个限制事件的EventFilter
 *
 * @param ms
 * @param [trailing=true]
 */
function throttleFilter(ms, trailing = true) {
    let lastExec = 0;
    let timer;
    const clear = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
    };
    const filter = (invoke) => {
        const duration = ms;
        const elapsed = Date.now() - lastExec;
        clear();
        if (duration <= 0) {
            lastExec = Date.now();
            return invoke();
        }
        if (elapsed > duration) {
            lastExec = Date.now();
            invoke();
        } else if (trailing) {
            timer = setTimeout(() => {
                clear();
                invoke();
            }, duration);
        }
    };
    return filter;
}

// 节流
export const useThrottleFn = (fn, ms = 200, trailing = true) => {
    return createFilterWrapper(throttleFilter(ms, trailing), fn);
};


/**
 * 创建一个EventFilter来解除事件
 *
 * @param ms
 */
 function debounceFilter(ms) {
    let timer;
    const filter = (invoke) => {
        const duration = ms;
        if (timer)
            clearTimeout(timer);
        if (duration <= 0)
            return invoke();
        timer = setTimeout(invoke, duration);
    };
    return filter;
}

/**
 * 取消函数的执行。
 *
 * @param  fn          在延迟毫秒后执行的函数。
 * @param  ms          以毫秒为单位的零或更大延迟。对于事件回调，大约100或250(甚至更高)的值是最有用的。
 *
 * @return A new, debounce, function.
 */
 export const useDebounceFn = (fn, ms = 200) => {
    return createFilterWrapper(debounceFilter(ms), fn);
}