import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Footerslider from '../../LandingPage/Footerslider';
import Headerslider from '../../LandingPage/Headerslider';
import Listtuyendung from '../../LandingPage/Listtuyendung';
import Aboutus from '../../LandingPage/Aboutus';
import React from 'react';
import Menutop from '../../LandingPage/Menutop';


const Homescreen = () => {
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
                }}>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                ><Headerslider />
                    <Aboutus />
                    <Listtuyendung />
                    <Footerslider />
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

    );
};

export default Homescreen;