import React, { useState } from "react";
import { Layout, Menu } from "antd";
import TabsPages from "../TabsPages";
import { adminRoutes } from "@/routes";
import { Scrollbars } from 'react-custom-scrollbars';
const { Content, Sider } = Layout;

const routes = adminRoutes.filter((route) => route.isShow);

//中间主体内容
const ContentC = (props) => {
    let { location } = props;
    console.log(props.children)
    let [collapsed, setCollapsed] = useState(false);
    let selectKeys = routes.find((item) => item.path === location.pathname);
    return (
        <Layout>
            {routes.length !== 0 ? (
                <Sider
                    width={200}
                    breakpoint="lg"
                    collapsedWidth="80"
                    onBreakpoint={broken => {}}
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                >
                    {/* <div className="logo" /> */}
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={selectKeys && selectKeys.path}
                        defaultOpenKeys={["sub1"]}
                        style={{ borderRight: 0 }}
                    >
                        {/* 动态侧栏 */}
                        {routes.map((route) => {
                            return (
                                <Menu.Item
                                    icon={route.icon}
                                    key={route.path}
                                    onClick={(p) => props.history.push(p.key)}
                                >
                                    {route.title}
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
            ) : null}

            <Layout style={{ padding: "0 24px 24px" }}>
                {/* <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                {/* <TabsPages /> */}
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {/* <Scrollbars autoHide > */}
                        {props.children}
                    {/* </Scrollbars> */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ContentC;
