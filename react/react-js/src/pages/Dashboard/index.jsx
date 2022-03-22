import React from "react";
import {  Card } from "antd";

const Dashboard = () => {
    const tabCKey = "tab1";
    const tabList = [
        {
            key: "tab1",
            tab: "通知",
        },
        {
            key: "tab2",
            tab: "消息",
        },
        {
            key: "tab3",
            tab: "待办",
        },
    ];
    const contentList = {
        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
        tab3: <p>content3</p>,
    };
    return (
        <div>
            123
              <Card
               
                style={{ width: 300 }}
                tabList={tabList}
                tabProps={{
                    centered: true,
                    size:"small"
                }}
                size="small"
                defaultActiveTabKey="tab1"
                onTabChange={(key) => {
                    console.log(key);
                }}
            >
                {contentList[tabCKey]}
            </Card>
        </div>
    )
}
export default Dashboard