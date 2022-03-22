//管理数据 reducer
//暴露出去的是一个方法
const defaultState = {
    inputValue: '纯函数数据',
    list: [
        '数据1',
        '数据2',
        '数据3',
    ]
}

//dispatch 方法会触发 action
export default (state = defaultState, action) => {

    //reducer里只能接受state,不能改变state
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'changeInput':
            newState.inputValue = action.value;
            return newState;

        case 'addItem':
            newState.list.push(newState.inputValue)
            return newState;

        default:
            break;
    }
    return state
}