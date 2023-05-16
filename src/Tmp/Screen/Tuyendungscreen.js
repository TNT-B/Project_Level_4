import React from "react";
import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme, Divider } from 'antd';
import Formtuyendung from "../Components/Formtuyendung";
import { Link } from "react-router-dom";
import Chitiettuyendung from "../Components/Chitiettuyendung";
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";

const Tuyendungscreen = () => {
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
            <Content
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
                ><img className='imgheaderslide' src='./img/4.jpg' />
                    <Chitiettuyendung />
                    <Divider>Nộp đon ứng tuyển cho công việc này</Divider>
                    <Formtuyendung />
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
export default Tuyendungscreen;