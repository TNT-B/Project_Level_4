import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Layout, theme, Form, Input, Select, Button,
    DatePicker, Row, Col, Typography, Checkbox
} from 'antd';
import { useForm } from "antd/es/form/Form";
import axios from 'axios';



const ChiTietBaiTest = () => {
    const { Paragraph, Text } = Typography;
    const { TextArea } = Input;
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [editableStr, setEditableStr] = useState('This is an editable text.');

    const [data, setData] = useState();

    const getData = async () => {

        axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/cauhoi?idbaitest=6438f9da2ebb1a4ee038227e`).then(res => {
            let newData = res.data.data.map(row => {
                return {
                    ma_bai_test: row.ma_bai_test,
                    ten_bai_test: row.ten_bai_test,
                    mo_ta: row.mo_ta,
                    thoi_luong: row.thoi_luong,
                    so_diem_toi_thieu: row.so_diem_toi_thieu,
                    cau_hoi: row.cau_hoi.map(item => ({ value: item.noi_dung, })),
                }

            })
            setData(newData);

        })
    }
    // const putbaitest = async (value) => {
    //     const danhSachCauHoi = form.setFieldValue('danhSachCauHoi') ?? [];
    //     const body = {
    //         ma_bai_test: form.setFieldValue('ma_bai_test'),
    //         mo_ta: form.setFieldValue('ma_bai_test'),
    //         so_diem_toi_thieu: form.setFieldValue('so_diem_toi_thieu'),
    //         ten_bai_test: form.setFieldValue('ten_bai_test'),
    //         thoi_luong: form.setFieldValue('thoi_luong'),
    //         ten_vi_tri: form.setFieldValue('ten_vi_tri'),
    //         vi_tri: form.setFieldValue('vi_tri'),
    //         danhSachCauHoi: danhSachCauHoi
    //     }
    //     await axios.put(`https://quan-ly-tuyen-dung-be.onrender.com/baitest`, body)

    //         .then(response => console.log(response))
    //         .catch(err => console.log(err))
    // };



    useEffect(() => {
        getData()
    }, [])
    // useEffect(() => {
    //     putbaitest()
    // }, [])

    return (
        <>
            <Layout className="layout">

                <Content
                    style={{
                        padding: '0 5px',
                    }}>
                    <div
                        className="site-layout-content"
                        style={{
                            background: colorBgContainer,
                        }}>
                        <div className="column side">
                            <Content className="testlist-CTE"
                                style={{
                                    padding: '0 5px',
                                }}
                            ><Form>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label="Mã bài kiểm tra" name='ma_bai_test'>

                                                {data && data.map(data =>
                                                (<Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.ma_bai_test}</Text>
                                                ))}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Tên bài kiểm tra" name='ten_bai_test'>

                                                {data && data.map(data =>
                                                (<Text editable={{
                                                    onChange: (value) => {
                                                        setData(value);
                                                    },
                                                }}> {data.ten_bai_test}</Text>
                                                ))}

                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Mô tả" name='mo_ta'>
                                                {data && data.map(data =>
                                                (<Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.mo_ta}</Text>
                                                ))}

                                            </Form.Item>
                                        </Col>
                                        {/* <Col span={24}>
                                            <Form.Item strong label="Vị Trí" name='vi_tri'>
                                            <Text>
                                            {data && data.map(data =>
                                                (<Input value={data.ten_vi_tri}/>
                                                    ))}
                                                </Text>
                                            </Form.Item>
                                        </Col> */}
                                        {/* <Form.Item label="Ngày chỉnh sửa gần nhất">
                                            <Text
                                                editable={{
                                                    onChange: (data) => { setData(data); }, triggerType: 'text',
                                                }}>
                                                {data && data.map(data => (
                                                    <div>{data.ten_bai_test}</div>
                                                ))}
                                            </Text>
                                        </Form.Item>
                                        <Form.Item label="Ngày tạo bài test">
                                            <Text
                                                editable={{
                                                    onChange: (data) => { setData(data); }, triggerType: 'text',
                                                }}>
                                                {data && data.map(data => (
                                                    <div>{data.ten_bai_test}</div>
                                                ))}
                                            </Text>
                                        </Form.Item> */}
                                        <Col span={24}>
                                            <Form.Item label="Điểm số tối thiểu" name='so_diem_toi_thieu'>

                                                {data && data.map(data =>
                                                (<Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.so_diem_toi_thieu}</Text>
                                                ))}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Thời lượng" name='thoi_luong'>

                                                {data && data.map(data =>
                                                (<Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.thoi_luong}</Text>
                                                ))}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Button htmlType="submit"> Lưu</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Content>
                        </div>

                        <div className="column middle detail">
                            <Form  >
                                <Row>

                                    {data && data.map((cauhoi, index) => <Row>
                                        <Col span={24}>
                                            <Form.Item label="nội dung câu hỏi" name='noi_dung'>
                                                <Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.noi_dung}</Text>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Điểm số" name='so_diem_cau_hoi'>
                                                <Text editable={{
                                                    onChange: setEditableStr,
                                                }}> {data.so_diem_toi_thieu}</Text>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name='dap_an_dung'>
                                                <Checkbox.Group>
                                                    <Row>
                                                        {/* {cauhoi.dap_an.map((dap_an) => <Col span={24}>
                                                            <Checkbox name="dap_an_dung" /> <p></p>
                                                            <Form.Item label="Đáp án" name='dap_an'>
                                                                <Input placeholder="nhập vào đáp án" name="dap_an" />
                                                            </Form.Item>
                                                        </Col>)} */}
                                                    </Row>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>)}
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default ChiTietBaiTest;
