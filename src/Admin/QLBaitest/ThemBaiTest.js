import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Layout, theme, Form, Input, Select, Button,
    Checkbox,
    Row, Col, notification
} from 'antd';
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";


const Themmoibaitest = () => {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { Header, Content, Footer } = Layout;
    const [danhsachvitri, setDanhSachViTri] = useState([]);
    const [form] = useForm();
    const danhsachcauhoi = form.getFieldValue('danhSachCauHoi');
    const [render, setRender] = useState();
    const taoCauHoi = () => {
        const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
        form.setFieldValue('danhSachCauHoi', [...danhSachCauHoi, {
            so_diem_cau_hoi: '',
            noi_dung: '',
            dap_an: ['', '', '', ''],
            dap_an_dung: [],
        }])
        setRender(Math.random());
    }

    const postbaitest = async (value) => {
        const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
        const body = {
            ma_bai_test: form.getFieldValue('ma_bai_test'),
            mo_ta: form.getFieldValue('ma_bai_test'),
            so_diem_toi_thieu: form.getFieldValue('so_diem_toi_thieu'),
            ten_bai_test: form.getFieldValue('ten_bai_test'),
            thoi_luong: form.getFieldValue('thoi_luong'),
            ten_vi_tri: form.getFieldValue('ten_vi_tri'),
            vi_tri: form.getFieldValue('vi_tri'),
            danhSachCauHoi: danhSachCauHoi
        }
        await axios.post(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/createbaitest`, body)

            .then(response => console.log(response))
            .catch(err => console.log(err))
    };

    const getDanhSachViTri = async () => {
        const resp = await axios.get('https://quan-ly-tuyen-dung-be.onrender.com/vitri')
        setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({ value: vitri._id, label: vitri.ten_vi_tri })))
    }
    useEffect(() => {
        getDanhSachViTri()
        postbaitest()
    }, [])
   

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Thêm bài test thành công',
        });
    }
    return (
        <>
            {contextHolder}
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
                        <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>TẠO MỚI BÀI KIỂM TRA</h1>
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
                                <Col span={24} style={{ paddingBottom: 10 }} >
                                    <Form.Item  label="Mã bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống', },]} name='ma_bai_test'>
                                        <Input placeholder="Nhập mã bài kiểm tra" name='ma_bai_test' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Tên bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống' },]} name='ten_bai_test'>
                                        <Input placeholder="Nhập tên bài kiểm tra" name='ten_bai_test' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Mô tả" rules={[{ required: true, message: '${label} không được để trống' },]} name='mo_ta'>
                                        <TextArea placeholder="nhập mô tả" name='mo_ta' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Vị Trí" rules={[{ required: true, message: '${label} không được để trống' },]} name='vi_tri'>
                                        <Select placeholder="Nhập vị trí" mode="multiple" options={danhsachvitri} />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Điểm số tối thiểu" name='so_diem_toi_thieu' rules={[
                                        {
                                            required: true,
                                            message: '${label} phải là 1 số'
                                        },
                                        // {
                                        //   type: 'number',
                                        //   min: 0,
                                        //   max: 99,
                                        //   range: '${label} phải trong khoảng từ ${min} đến ${max}',
                                        // },
                                    ]}>
                                        <Input placeholder="nhập điểm" name='so_diem_toi_thieu' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Thời lượng" name='thoi_luong' rules={[{ required: true, message: '${label} không được để trống' },]} >
                                        <Input placeholder="nhập thời lượng" name='thoi_luong' />
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
                        <Form form={form} onSubmitCapture={postbaitest} >
                            {(fields, { remove }) => (
                                <Row>
                                    {danhsachcauhoi && danhsachcauhoi.map((cauhoi, index) => <Row>
                                        <Col span={24}>
                                            <Form.Item 
                                            label="nhập nội dung câu hỏi" 
                                            name={['danhSachCauHoi', index, 'noi_dung']} 
                                            rules={[{ 
                                                required: true, 
                                                message: '${label} không được để trống' },]}>
                                                <TextArea placeholder="nhập nội dung câu hỏi" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item 
                                            label="Điểm số" name={['danhSachCauHoi', index, 'so_diem_cau_hoi']} 
                                            rules={[{ 
                                                required: true, 
                                                message: '${label} không được để trống' },]}>
                                                <Input placeholder="số điểm câu hỏi" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name={['danhSachCauHoi', index, 'dap_an_dung']}>
                                                <Checkbox.Group>
                                                    <Row>
                                                        {cauhoi.dap_an.map((dap_an, index_dap_an) => <Col span={24}>
                                                            <Checkbox name="dap_an_dung" value={index_dap_an} /> <p></p>
                                                            <Form.Item label="Đáp án" 
                                                            name={['danhSachCauHoi', index, 'dap_an', index_dap_an]}
                                                            rules={[{ 
                                                                required: true, message: '${label} không được để trống' },]}>
                                                                <Input placeholder="nhập vào đáp án" name="dap_an" />
                                                            </Form.Item>
                                                        </Col>)}
                                                    </Row>
                                                </Checkbox.Group>
                                                {/* <MinusCircleOutlined onClick={() => remove(danhSachCauHoi)} /> */}
                                            </Form.Item>

                                        </Col>
                                    </Row>)}
                                    <Col span={24}>
                                        <Button type="dashed" onClick={taoCauHoi} name='danhSachCauHoi' block icon={<PlusOutlined />}> tạo mới câu hỏi </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button htmlType="submit" onClick={() => openNotificationWithIcon('success')}> Lưu</Button>
                                    </Col>
                                </Row>
                            )}
                        </Form>

                    </Col>
                    {/* </div> */}
                </Row>
                {/* </div> */}
            </Content>
        </>
    );
};

export default Themmoibaitest;
