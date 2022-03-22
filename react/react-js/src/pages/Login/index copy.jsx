import React, { useState, useEffect } from 'react'
import { Input, Button, List } from "antd"
import store from "@/reducers";

const Login = () => {
    let { inputValue, list } = store.getState();
    //触发方法
    let changeInputValue = (e) => {
        const action = {
            type: 'changeInput',
            value: e.target.value
        }
        //派遣方法  触发action
        store.dispatch(action);//
        //订阅store变化  受控组件必须订阅 等于vue的 watch
        store.subscribe(() => {
            let state = store.getState();
            inputValue = state.inputValue;
            list = state.list;
            console.log(state)
        });
    }

    let clickAdd = () => {
        const action = { type: 'addItem' };
        store.dispatch(action)
    }

    return (
        <div style={{ margin: '10px' }}>
            <div>
                <Input placeholder={inputValue} style={{ width: '250px', marginRight: '10px' }} onChange={changeInputValue}></Input>
                <Button type="primary" onClick={clickAdd}>添加</Button>
            </div>
            {inputValue}
            <div style={{ margin: '10px', width: '300px' }}>
                <List bordered
                    dataSource={list}
                    renderItem={item => <List.Item>{item}</List.Item>}>
                </List>

            </div>
        </div>
    )
};


// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = store.getState();
//         this.changeInputValue = this.changeInputValue.bind(this);
//         this.clickAdd = this.clickAdd.bind(this);
//         store.subscribe(() => {
//             this.setState(store.getState())
//         });
//         console.log(this.state)
//     }

//     changeInputValue = (e) => {
//         const action = {
//             type: 'changeInput',
//             value: e.target.value
//         }
//         //派遣方法  触发action
//         store.dispatch(action);//
//         //订阅store变化  受控组件必须订阅 等于vue的 watch
//     }

//     clickAdd() {
//         const action = { type: 'addItem' };
//         store.dispatch(action)
//     }
//     render() {
//         return (
//             <div style={{ margin: '10px' }}>
//                 <div>
//                     <Input placeholder={this.state.inputValue} style={{ width: '250px', marginRight: '10px' }} onChange={this.changeInputValue}></Input>
//                     <Button type="primary" onClick={this.clickAdd}>添加</Button>
//                 </div>
//                 {this.state.inputValue}
//                 <div style={{ margin: '10px', width: '300px' }}>
//                     <List bordered
//                         dataSource={this.state.list}
//                         renderItem={item => <List.Item>{item}</List.Item>}>
//                     </List>

//                 </div>
//             </div>
//         )
//     }
// }


export default Login