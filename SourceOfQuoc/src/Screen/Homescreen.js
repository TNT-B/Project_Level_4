import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Footerslider from '../Components/Footerslider';
import Headerslider from '../Components/Headerslider';
import Listtuyendung from '../Components/Listtuyendung';
import Aboutus from '../Components/Aboutus';
import React from 'react';
import Menutop from '../Components/Menutop';


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