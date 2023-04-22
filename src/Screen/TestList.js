import React from "react";
import 'antd/dist/reset.css';
import { Layout, theme } from 'antd';
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";
import Tabletestlist from "../Components/Tabletestlist";

const Testlist = () => {
    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menutop />
            </Header>
            <Content className="testlist-CTT"
                style={{
                    padding: '0 5px',
                }}
            >
                <Breadcrumbtop />
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >

                </div>
            </Content>
            <Content className="testlist-CTB"
                style={{
                    padding: '0 5px',
                }}
            >

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Tabletestlist />
                </div>
            </Content>
            <Footer

                style={{
                    textAlign: 'center',
                    theme: "dark"
                }}
            >

            </Footer>
        </Layout>
    )
}
export default Testlist;