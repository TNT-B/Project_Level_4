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

  const validateMessages = {
    required: '${label} không đươc bỏ trống',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        Phone: '${label} is not a valid Phonenumber!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    Phone: {
        range: '${label} must be at least 10 number',
    }

};
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
  const [taoBaiTest, setTaoBaiTest] = useState({
    ma_bai_test:'',
    ten_bai_test:'',
    thoi_luong:'',
    so_diem_toi_thieu:'',
    mo_ta:'',
    vi_tri:'',
    danhSachCauHoi:danhsachcauhoi,   
  });
  const nhapBaitest = (e) => {
    setTaoBaiTest({...taoBaiTest, [e.target.name]: e.target.value})
  }
  const postbaitest = async (value) => {
    console.log(taoBaiTest);
     await axios.post(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/createbaitest`,{taoBaiTest})
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
              ><Form form={form} onSubmitCapture={postbaitest} validateMessages={validateMessages} >
                <Form.Item label="Mã bài kiểm tra" rules={[{required: true,},]} name='ma_bai_test'>
                    <Input placeholder="Nhập mã bài kiểm tra" onChange={nhapBaitest} name='ma_bai_test'  />
                  </Form.Item>
                  <Form.Item label="Tên bài kiểm tra" rules={[{required: true,},]} name='ten_bai_test'>
                    <Input placeholder="Nhập tên bài kiểm tra" onChange={nhapBaitest} name='ten_bai_test' />
                  </Form.Item>
                  <Form.Item label="Mô tả" rules={[{required: true,},]} name='mo_ta'>
                  <TextArea placeholder="nhập mô tả" onChange={nhapBaitest} name='mo_ta'  />
                  </Form.Item>
                  <Form.Item label="Vị Trí" name='vi_tri'>
                    <Select placeholder="Nhập vị trí" mode="multiple" options={danhsachvitri}/>
                  </Form.Item>
                  {/* <Form.Item label="Ngày chỉnh sửa gần nhất">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaychinhsuagannhat(e.target.value)} style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item label="Ngày tạo bài test">
                    <DatePicker placeholder="nhập ngày" onChange={(e) => setNgaytaobaitest(e.target.value)} style={{ width: 300, }} />
                  </Form.Item> */}
                  <Form.Item label="Điểm số tối thiểu"  name='so_diem_toi_thieu'>
                    <Input placeholder="nhập điểm" onChange={nhapBaitest} name='so_diem_toi_thieu'/>
                  </Form.Item>
                  <Form.Item label="Thời lượng" name='thoi_luong'>
                    <Input placeholder="nhập thời lượng" onChange={nhapBaitest} name='thoi_luong'/>
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
              <Form form={form} >
                <Button onClick={taoCauHoi}> tạo mới câu hỏi </Button>
                {danhsachcauhoi && danhsachcauhoi.map(cauhoi => <div>
                  <Form.Item label="nhập nội dung câu hỏi">
                    <TextArea placeholder="nhập nội dung câu hỏi" style={{ width: 300, }} name="noi_dung"/>
                  </Form.Item>
                  <Form.Item label="Điểm số">
                    <Input placeholder="số điểm câu hỏi" style={{ width: 100, }} name="so_diem_cau_hoi" />
                  </Form.Item>
                  {cauhoi.dap_an.map(dap_an => <div>
                    <Form.Item label="Đáp án">
                      <Checkbox name="dap_an_dung" /> <p></p>
                      <Input placeholder="nhập vào đáp án" style={{ width: 300, }} name="dap_an" />
                    </Form.Item>
                  </div>)}
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
