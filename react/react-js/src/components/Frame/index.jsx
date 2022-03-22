import React from "react";
import { withRouter } from "react-router-dom"; //使组件中内部可以使用路由跳转 高阶函数
import { Layout } from "antd";
import HeaderC from "./Header"
import ContentC from "./Content"
import style from "./Frame.module.less";

const { Footer } = Layout;

//组件
function Index(props) {
    return (
        <Layout  style={{minHeight: '100vh'}}>
            <HeaderC />
            <ContentC {...props} />
            <Footer className={style.Footer}>Footer</Footer>
        </Layout>
    );
}

export default withRouter(Index);
