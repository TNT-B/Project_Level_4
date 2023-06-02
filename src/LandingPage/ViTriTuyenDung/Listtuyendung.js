import { Button, Space, Card, Row, Col, Typography, Divider } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiConstants } from '../../Const/api';

const { Title } = Typography;
const Listtuyendung = (value) => {
    const { Text } = Typography;
    const Navigate = useNavigate();
    const { id } = useParams();
    const [danhSachViTri, setDSVT] = useState([]);
    // const getCTVT = async (id) => {
    //     const res = await axios.get(apiConstants.CHI_TIET_VI_TRI(id));
    //     console.log(res);
    //     let newData = res.data.data.danhsach.map(row => {
    //         return {
    //             _id: row._id,
    //             ten_vi_tri: row.ten_vi_tri,
    //             mo_ta: row.mo_ta,
    //             ma_vi_tri: row.ma_vi_tri,
    //         }
    //     })

    // };
    const getDSVT = async (id) => {
        const res = await axios.get(apiConstants.DANH_SACH_VI_TRI);
        console.log(res);
        let newData = res.data.data.danhsach.map(row => {
            return {
                _id: row._id,
                ten_vi_tri: row.ten_vi_tri,
                mo_ta: row.mo_ta,
                ma_vi_tri: row.ma_vi_tri,
            }
        })
        setDSVT(newData);
    };
    // useEffect(() => {
    //     if (id) {
    //     getDSVT(id);}
    // }, [id]);

    useEffect(() => {
        getDSVT();
    }, []);

    return (
        <Space
            id='vi-tri-tuyen-dung'
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
                paddingBottom: '10px',
            }}>
            <Divider><Title align="center">Vị trí tuyển dụng</Title></Divider>
            <Row
                gutter={[16, {
                    xs: 8,
                    sm: 16,
                    md: 32,
                    lg: 40,
                }]}
                align="middle"
            >
                {danhSachViTri.map(danhsach =>
                    <Col span={5}>
                        <Card
                            className='cardvitri'
                            style={{ marginBottom: '10px' }}

                            size="large"
                            align="center">
                            <Col>
                                <Row align="middle">
                                    <Title level={4}>
                                        {danhsach.ten_vi_tri}
                                    </Title>
                                </Row>
                                <Divider />
                                <Row align="middle">
                                    <Text style={{ fontSize: 18 }} type="secondary">
                                        {danhsach.mo_ta}
                                    </Text>
                                </Row>
                                <Row align="middle" style={{ paddingTop: '10px' }}>
                                    <Button onClick={() => Navigate(`chittiet/${danhsach._id}`)}>xem thêm
                                    </Button>
                                </Row>
                            </Col>
                        </Card>
                    </Col>
                )}
            </Row>
            <Divider />
        </Space>
    );
};
export default Listtuyendung;