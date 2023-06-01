import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme, Row, Button, Typography } from 'antd';
import React from 'react';
import Aboutus from './LDPComponents/Aboutus';
import Listtuyendung from './ViTriTuyenDung/Listtuyendung';
import Footerslider from './LDPComponents/Footerslider';


const LandingPage = () => {
    const { Header, Content, Footer } = Layout;
    const {Title} =Typography;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout">
            <Header>
                {/* <div className="logo" /> */}
                {/* <Menutop/> */}
            </Header>
            <Content>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}>
                    <Row className="imgheader">
                        <img className='imgheaderbackground' src='../img/8.jpg' />
                        <img className='imgheaderchitiet' src='../img/7.png' />
                        <Row style={{ paddingTop: '10px' }}>
                            <Title
                                level={1}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white' }}>
                                Hãy tham gia cùng chúng tôi
                            </Title>
                            <Title
                                level={2}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white', paddingTop: "10px" }}>
                                Hơn 10.000 vị trí đang chờ bạn
                            </Title>
                            <Button
                                className="Buttonchitiet"
                                align="center">
                                Xem ngay
                            </Button>
                        </Row>
                    </Row>
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
export default LandingPage;