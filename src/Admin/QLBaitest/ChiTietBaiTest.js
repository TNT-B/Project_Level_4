import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Layout, theme, Form, Input, Select, Button,
    DatePicker, Row, Col, Typography, Checkbox
} from 'antd';
import { useForm } from "antd/es/form/Form";
import axios from 'axios';



const ChiTietBaiTest = () => {
    const params = useParams()
    const [form] = useForm();
    const { Paragraph, Text } = Typography;
    const { TextArea } = Input;
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [editableStr, setEditableStr] = useState('This is an editable text.');

    const [data, setData] = useState();

    const getData = async (_id) => {
        axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/cauhoi?idbaitest=${_id}`).then(res => {
            console.log(_id);
            let newData = res.data.data.map(value => {
                
                return {
                    id: value._id,
                    ma_bai_test: value.ma_bai_test,
                    ten_bai_test: value.ten_bai_test,
                    mo_ta: value.mo_ta,
                    thoi_luong: value.thoi_luong,
                    so_diem_toi_thieu: value.so_diem_toi_thieu,
                    cau_hoi: value.cau_hoi.map(item => ({ value: item.noi_dung, })),
                }
            })
            setData(newData);
            
        })
    }
    useEffect(() => {
        getData(params._id)
    }, [])

    return (
        <>
          <Content
                style={{
                    padding: '0 5px',
                }}>
                {/* <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                > */}
                <Row>
                    <Col span={24}>
                        <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>CHI TIẾT BÀI KIỂM TRA</h1>
                    </Col>
                </Row>
                <Row>
                    {/* <div className="column side"> */}
                    {/* <Content className="testlist-CTE"
                        style={{
                            padding: '0 5px',
                        }}> */}
                    <Col span={11}>
                        <Form form={form}  >
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Mã bài kiểm tra" name='ma_bai_test'>
                                    {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.ma_bai_test}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Tên bài kiểm tra"  name='ten_bai_test'>
                                    {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.ten_bai_test}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả" name='mo_ta'>
                                    {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.mo_ta}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Vị Trí" name='vi_tri'>
                                    {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.vi_tri}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Điểm số tối thiểu" name='so_diem_toi_thieu'>
                                        {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.vi_tri}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Thời lượng" name='thoi_luong'>
                                    {data && data.map(data =>
                                        (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);}
                                                }}> {data.thoi_luong}</Text>
                                                ))}
                                    </Form.Item>
                                </Col>
                                {/* <Col span={6}>
                                    <Button htmlType="submit"> Lưu</Button>
                                </Col> */}
                                {/* <Col span={6}>
                                    <Button onClick={taoCauHoi} name='danhSachCauHoi'> tạo mới câu hỏi </Button>
                                </Col> */}
                            </Row>
                        </Form>
                    </Col>
                    {/* </Content> */}
                    {/* </div> */}
                    {/* <div className="column middle"> */}
                    <Col span={12} offset={1}>
                        <Form form={form} >
                           
                        </Form>

                    </Col>
                    {/* </div> */}
                </Row>
                {/* </div> */}
            </Content>
           
        </>
    );
};

export default ChiTietBaiTest;
