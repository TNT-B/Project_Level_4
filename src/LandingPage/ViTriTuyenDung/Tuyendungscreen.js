import React from "react";
import 'antd/dist/reset.css';
import { Layout, theme, Divider, Row, Col, Typography } from 'antd';
import Formtuyendung from "./Formtuyendung";
import { useParams } from "react-router";
import { useState } from "react";
import { apiConstants } from "../../Const/api";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {DoubleLeftOutlined } from '@ant-design/icons';
import FooterLDP from "../LDPComponents/FooterLDP";
import Menutop from "../LDPComponents/Menutop";


const Tuyendungscreen = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const { Title, Text } = Typography;
    const { Header, Content, Footer } = Layout;
    const getCTVT = async (id) => {
        const res = await axios.get(apiConstants.CHI_TIET_VI_TRI(id));
        // console.log(res);
        const chiTietViTri = res.data.data
        setData(chiTietViTri);
    };
    useEffect(() => {
        if (id) {
            getCTVT(id);
        }
    }, [id]);


    return (
        <Layout className="layout">
            <Header>
                <Menutop/>
            </Header>
            <Content
                style={{
                    padding: '0 5px',
                }}
            >
                {/* <Breadcrumbtop /> */}
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                > <Row className="imgheader">
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
                                style={{ color: 'white', paddingTop:"10px" }}>
                                với cương vị là <Title 
                                style={{ color: 'yellow', paddingTop:"10px" }}>{data.ten_vi_tri}</Title> 
                            </Title>
                            {/* <Title
                                level={1}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white'}}>
                                Ngay hôm nay
                            </Title> */}
                        </Row>
                    </Row>
                    <Row style={{ paddingTop: '50px', paddingLeft:'50px', background: '#EEEEEE' }}>
                    <Link to={'/'}><DoubleLeftOutlined /> về trang chủ</Link>
                    </Row>
                    <Row style={{ padding: '50px', background: '#EEEEEE' }}>
                    
                        <Col span={12} style={{ background: 'white' }} >
                            <Title level={2} align="center">
                                {data.ten_vi_tri}
                            </Title>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }} >
                                <Col span={2} >
                                    <Text strong > Mã vị trí:</Text>
                                </Col>
                                <Col>
                                    <Text>{data.ma_vi_tri}</Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={2}>
                                    <Text strong > Mô tả:</Text>
                                </Col>
                                <Col >
                                    <Text> {data.mo_ta}</Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} style={{ background: 'white' }}>
                            <Divider>Nộp đơn ứng tuyển cho công việc này</Divider>
                            <Formtuyendung />
                        </Col>
                    </Row>
                </div>
            </Content>
            <FooterLDP/>
        </Layout>
    )
}
export default Tuyendungscreen;