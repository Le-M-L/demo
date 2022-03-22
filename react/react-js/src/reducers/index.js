import { createStore } from 'redux';
//纯函数
import reducer from "./reducer";

//创建redux创建方法    将方法传入到创建里
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//配置调试工具
);
export default store