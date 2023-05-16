import React, { useEffect, useState } from "react";
import {
  Layout, theme, Form, Input, Select, Button,
  DatePicker,
  Checkbox,
  InputNumber, Row, Col
} from 'antd';
import Toast from "../Components/LoadingError/Toast";
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";

const Addnewtest = () => {
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
      so_diem_cau_hoi: 0,
      noi_dung: '',
      dap_an: ['', '', '', ''],
      dap_an_dung: [0],
    }])
    setRender(Math.random());
  }
  
  // const nhapBaitest = (e) => {
  //   setTaoBaiTest({ ...taoBaiTest, [e.target.name]: e.target.value })
  // }
  const postbaitest = async (value) => {
    const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
    const body = {
      ma_bai_test:form.getFieldValue('ma_bai_test'),
      mo_ta:form.getFieldValue('ma_bai_test'),
      so_diem_toi_thieu:form.getFieldValue('so_diem_toi_thieu'),
      ten_bai_test:form.getFieldValue('ten_bai_test'),
      thoi_luong:form.getFieldValue('thoi_luong'),
      ten_vi_tri:form.getFieldValue('ten_vi_tri'),
      vi_tri:form.getFieldValue('vi_tri'),
      danhSachCauHoi:danhSachCauHoi } 
    await axios.post(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/createbaitest`,body)

      .then(response => console.log(response))
      .catch(err => console.log(err))
  };


  const getDanhSachViTri = async () => {
    const resp = await axios.get('https://quan-ly-tuyen-dung-be.onrender.com/vitri')
    console.log(resp);
    setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({ value: vitri._id, label: vitri.ten_vi_tri })))
  }
  useEffect(() => {
    getDanhSachViTri()
  }, [])
  useEffect(() => {
    postbaitest()
  }, [])

  return (
    <>
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
          >
            <div className="column side">
              <Content className="testlist-CTE"
                style={{
                  padding: '0 5px',
                }}
              ><Form form={form} onSubmitCapture={postbaitest} >
                <Row>
                <Col span={24}>
                  <Form.Item label="Mã bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống', },]} name='ma_bai_test'>
                    <Input placeholder="Nhập mã bài kiểm tra"  name='ma_bai_test' />
                  </Form.Item>
                  </Col>
                  <Col span={24}>
                  <Form.Item label="Tên bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống' },]} name='ten_bai_test'>
                    <Input placeholder="Nhập tên bài kiểm tra"  name='ten_bai_test' />
                  </Form.Item>
                  </Col>
                  <Col span={24}>
                  <Form.Item label="Mô tả" rules={[{ required: true, message: '${label} không được để trống' },]} name='mo_ta'>
                    <TextArea placeholder="nhập mô tả" name='mo_ta' />
                  </Form.Item>
                  </Col>
                  <Col span={24}>
                  <Form.Item label="Vị Trí" name='vi_tri'>
                    <Select placeholder="Nhập vị trí" mode="multiple" options={danhsachvitri} />
                  </Form.Item>
                  </Col>
                  {/* <Form.Item label="Ngày chỉnh sửa gần nhất">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaychinhsuagannhat(e.target.value)} style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item label="Ngày tạo bài test">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaytaobaitest(e.target.value)} style={{ width: 300, }} />
                  </Form.Item> */}
                  <Col span={24}>
                  <Form.Item label="Điểm số tối thiểu" name='so_diem_toi_thieu' rules={[{ required: true, message: '${label} không được để trống' },]}>
                    <Input placeholder="nhập điểm" name='so_diem_toi_thieu'/>
                  </Form.Item>
                  </Col>
                  <Col span={24}>
                  <Form.Item label="Thời lượng" name='thoi_luong' rules={[{ required: true, message: '${label} không được để trống' },]} >
                    <Input placeholder="nhập thời lượng" name='thoi_luong' />
                  </Form.Item>
                  </Col>
                  <Col span={24}>
                  <Button htmlType="submit"> Lưu</Button>
                  </Col>
                  </Row>
                </Form>
              </Content>
            </div>
            <div className="column middle">
              <div className="row1">Bài Kiểm tra đầu tiên</div>
              <div className="row2">Ngày tạo: 22/4/2023</div>
            </div>
            <div className="column middle">
              <Form form={form} >
                <Row>
                  <Col span={24}>
                    <Button onClick={taoCauHoi} name='danhSachCauHoi'> tạo mới câu hỏi </Button></Col>
                  {danhsachcauhoi && danhsachcauhoi.map((cauhoi, index) => <Row>
                    <Col span={24}>
                      <Form.Item label="nhập nội dung câu hỏi" name={['danhSachCauHoi', index, 'noi_dung']}>
                        <TextArea placeholder="nhập nội dung câu hỏi" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Điểm số" name={['danhSachCauHoi', index, 'so_diem_cau_hoi']}>
                        <Input placeholder="số điểm câu hỏi" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name={['danhSachCauHoi', index, 'dap_an_dung']}>
                        <Checkbox.Group>
                          <Row>
                            {cauhoi.dap_an.map((dap_an, index_dap_an) => <Col span={24}>
                              <Checkbox name="dap_an_dung" value={index_dap_an} /> <p></p>
                              <Form.Item label="Đáp án" name={['danhSachCauHoi', index, 'dap_an', index_dap_an]}>
                                <Input placeholder="nhập vào đáp án" name="dap_an" />
                              </Form.Item>
                            </Col>)}
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
        <Footer

          style={{
            textAlign: 'center',
            theme: "dark"
          }}
        >

        </Footer>
      </Layout>
    </>
  );
};

export default Addnewtest;
