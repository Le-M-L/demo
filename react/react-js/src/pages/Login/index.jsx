import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import { Form, Input, Button, Checkbox, Skeleton } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReactCanvasNest from "react-canvas-nest";
const rules = {
    username: [
        {
            required: true,
            message: "请输入用户名",
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
        },
    ],
};
//表单组件
const FormDom = ({childRef,history}) => {
    //验证成功
    const onFinish = (values) => {
        console.log("Success:", values,);
        history.push('/admin')

    };
    //验证失败
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useImperativeHandle(childRef, () =>( {
        // changeVal 就是暴露给父组件的方法
        changeVal: (newVal) => {
            console.log('父组件调用子组件',newVal)
        }
    }));

    useEffect(() => {
       
    }, []);

    return (
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="username" rules={rules.username}>
                <Input prefix={<UserOutlined style={{ fontSize: "16px", color: "#08c" }} />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={rules.password}>
                <Input
                    prefix={<LockOutlined style={{ fontSize: "16px", color: "#08c" }} />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox style={{ color: "#0ab5e4" }}>保存密码</Checkbox>
                </Form.Item>

                <a style={style.forget} href="#">
                    忘记密码
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" style={style.submit} htmlType="submit">
                    登 录
                </Button>
            </Form.Item>
        </Form>
    );
};

const Login = ({history}) => {
    let [loading, setLoading] = useState(true);
    
    const childRef = useRef(); //传递给子组件 
    const onClickRef = () => { //父组件调用子组件
        childRef.current.changeVal(666)
    };

    useEffect(() => {
        // useEffect 创建和更新会调用
        setLoading(false)
        return () => {
            //返回一个函数 在清除时执行
            console.log("返回一个函数 在清除时执行");
        };
    }, []); // useEffect 尾部传入一个数组 只在更新的时候更新

    return (
        <div style={{ width: "100%", height: "100%" }} className="content--canvas">
            <ReactCanvasNest
                className="canvasNest"
                config={{ pointColor: " 255, 255, 255 " }}
                style={{ width: "100%", height: "100%" }}
            />
            
            <div style={style.loginBox}>
                <Skeleton active  loading={loading}>
                    <h1 style={{ textAlign: "center", color: "#0ab5e4" }}>
                        <img
                            style={{ height: "44px", marginRight: 16 }}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        />
                        Ant Design
                    </h1>
                    <div style={{ marginTop: 12, textAlign: "center", marginBottom: 20, color: "#0ab5e4" }}>
                        Ant Design
                    </div>
                    {/* 登录页表单 */}
                    <FormDom childRef={childRef} history={history}  />
                </Skeleton>
            </div>
        </div>
    );
};

const style = {
    loginBox: {
        width: "300px",
        position: "fixed",
        left: "50%",
        top: "30%",
        transform: "translate(-50%,-50%)",
        zIndex: "11",
        color: "#0ab5e4 !important",
    },
    submit: {
        width: "100%",
    },
    forget: {
        float: "right",
    },
};

export default Login;
