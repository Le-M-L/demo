
// 依赖收集

export class Observer {
    value;
    // dep;
    // vmCount;
    constructor(value){
        this.value = value;
        // this.dep = new this.dep()
    }

    // 添加依赖收集
    walk(obj){
        const keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            defineReactive(obj, keys[i])
        }
    }
}

// 对象添加依赖收集
/**
 * 
 * @param {*} obj 需要依赖收集的对象
 * @param {*} key 需要依赖收集的Key
 * @param {*} val 依赖收集的value
 */
export function defineReactive(obj, key){

    val = obj[key];

    Object.defineProperty(obj,key,{
        enumerable:true,    // 是否可枚举 也就是遍历
        configurable:true,  // 是否可配置 也就是修改
        get(){
            console.log(val)
            return val;
        },
        set(newVal){
            val = obj[key]
        },
        
    })
}