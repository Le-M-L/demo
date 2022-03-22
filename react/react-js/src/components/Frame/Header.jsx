import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Badge, Card } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import style from './Frame.module.less';
const { Header, Content, Sider } = Layout;

const menuItems = (item) => {
    console.log(item);
};

const menu = (
    <Menu style={{ minWidth: '150px' }} onClick={menuItems}>
        <Menu.Item icon={<UserOutlined />}>
            <span>个人中心</span>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>
            <span>个人设置</span>
        </Menu.Item>
        <div style={{ height: '1px', background: '#eee', margin: '2px 0' }}></div>
        <Menu.Item icon={<LogoutOutlined />} key="退出登录" title="退出登录">
            <span>退出登录</span>
        </Menu.Item>
    </Menu>
);

const callback = (val) => {
    console.log(val);
};

//消息通知模块
const Information = () => {
    const tabCKey = 'tab1';
    const tabList = [
        {
            key: 'tab1',
            tab: '通知',
        },
        {
            key: 'tab2',
            tab: '消息',
        },
        {
            key: 'tab3',
            tab: '待办',
        },
    ];
    const contentList = {
        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
        tab3: <p>content3</p>,
    };
    return (
        <div>
            <Card
                size="small"
                style={{ width: 300 }}
                tabList={tabList}
                tabProps={{
                    centered: true,
                    size: 'small',
                }}
                defaultActiveTabKey="tab1"
                onTabChange={(key) => {
                    console.log(key);
                }}
            >
                {contentList[tabCKey]}
            </Card>
        </div>
    );
};
//头部
const HeaderC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <Header className={style.Header}>
            <Layout>
                {/* 头部导航栏左边部分 */}
                <Sider width={200}>
                    <div className={style.HeaderLogo}>Header</div>
                </Sider>
                {/* 头部导航栏中间部分 */}
                <Content>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Content>
                {/* 头部导航栏右边部分 */}
                <Sider className={style.HeaderR} width="auto">
                    {/* 消息提醒 消息通知 */}
                    <Dropdown
                        trigger={['click']}
                        onVisibleChange={(flag) => setVisible(flag)}
                        placement="bottomRight"
                        overlay={Information}
                        visible={visible}
                    >
                        <span className={style.spanBlock}>
                            <Badge size="small" count={99} offset={[2, 0]}>
                                <BellOutlined style={{ fontSize: '16px', padding: '4px', color: '#fff' }} />
                            </Badge>
                        </span>
                    </Dropdown>
                    {/* 个人中心 个人设置 退出登录等等 */}
                    <Dropdown placement="bottomLeft" overlay={menu}>
                        <span className={`${style.myCenter} ${style.spanBlock}`}>
                            <img src={require('@/assets/images/user.png').default} alt="" />
                            <span>Admin</span>
                        </span>
                    </Dropdown>
                </Sider>
            </Layout>
        </Header>
    );
};

export default HeaderC;
