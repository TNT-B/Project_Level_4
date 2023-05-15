import React, { useEffect, useState } from "react";
import {
  Layout, theme, Form, Input, Select, Button,
  DatePicker,
  Checkbox
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
  const [render,setRender] = useState();
  console.log(danhsachcauhoi);
  const taoCauHoi = () => {
    const danhSachCauHoi = form.getFieldValue('danhSachCauHoi')??[];

    form.setFieldValue('danhSachCauHoi', [...danhSachCauHoi, {
      so_diem_cau_hoi: 0,
      noi_dung: '',
      dap_an: ['', '', '', ''],
      dap_an_dung: [0],
    }])
    setRender(Math.random());
  }
  const submitHandlertest = async (value) => {
    // e.preventDefault();
    // console.log(ten_bai_test);
    // try {
    //   const resp = axios.post(
    //     `https://quan-ly-tuyen-dung-be.onrender.com/baitest/createbaitest`,
    //     {ten_bai_test:ten_bai_test});
    //     console.log((await resp).data);
    // } catch (error){
    //   console.log(error.response);
    // }
    console.log(value);
  };
  const getDanhSachViTri = async () => {
    const resp = await axios.get('https://quan-ly-tuyen-dung-be.onrender.com/vitri')
    console.log(resp);
    setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({ value: vitri._id, label: vitri.ten_vi_tri })))
  }
  useEffect(() => {
    getDanhSachViTri()
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
              ><Form form={form} onFinish={submitHandlertest} >
                  <Form.Item label="Tên bài kiểm tra" name='ten_bai_test'>
                    <Input placeholder="Tìm kiếm" style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item label="Mô tả" name='mo_ta'>
                    <Input placeholder="nhập mô tả" />
                  </Form.Item>
                  <Form.Item label="Vị Trí" name='vi_tri'>
                    <Select placeholder="Nhập vị trí" mode="multiple" options={danhsachvitri} style={{ width: 300, }} />
                  </Form.Item>
                  {/* <Form.Item label="Ngày chỉnh sửa gần nhất">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaychinhsuagannhat(e.target.value)} style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item label="Ngày tạo bài test">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaytaobaitest(e.target.value)} style={{ width: 300, }} />
                  </Form.Item> */}
                  <Form.Item label="Điểm số tối thiểu" name='diem_toi_thieu'>
                    <Input placeholder="nhập điểm" style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item label="Thời lượng" name='thoi_luong'>
                    <Input placeholder="nhập thời lượng" style={{ width: 300, }} />
                  </Form.Item>
                  <Button htmlType="submit"> Lưu</Button>
                </Form>
              </Content>
            </div>
            <div className="column middle">
              <div className="row1">Bài Kiểm tra đầu tiên</div>
              <div className="row2">Ngày tạo: 22/4/2023</div>
            </div>
            <div className="column middle">
              <Form form={form}>
                <Button onClick={taoCauHoi}> tạo mới câu hỏi </Button>
                {danhsachcauhoi && danhsachcauhoi.map(cauhoi => <div>
                  <TextArea placeholder="nhập nội dung câu hỏi"></TextArea>
                  <Input placeholder="số điểm câu hỏi"/>
                  {cauhoi.dap_an.map(dap_an => <div>
                    <Input placeholder="nhập vào đáp án"/><Checkbox></Checkbox> </div>)}
                </div>)}
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
