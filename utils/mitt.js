/**
 * https://github.com/developit/mitt
 */
/**
 * Mitt: Tiny (~200b) 功能事件发射器/ pubsub。
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt(all){
    all = all || new Map();
    return {
        all,
        // 注册事件
        on(type, handler){
            const handlers = all.get(type);
            const added = handlers && handlers.push(handler);
            if(!added){
                all.set(type, [handler])
            }
        },
        // 销毁事件
        off(type, handler){
            const handlers = all.get(type);
            if(handlers){
                if(handler){
                 handlers.splice(handlers.indexOf(handler) >>> 0, 1)
                }else{
                    all.set(type,[])
                }
            }
        },
        emit(type, evt){
            (all.get(type) || []).slice().map(handler => handler(evt));

            (all.get('*') || []).slice().map(handler => handler(type, evt))
        },
        clear(){
            this.all.clear()
        }
    }
}