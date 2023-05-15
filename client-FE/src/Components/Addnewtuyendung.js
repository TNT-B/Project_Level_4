import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../Redux/Actions/Baitestaction";
import { toast } from "react-toastify";
import { BAITEST_CREATE_RESET } from "../Redux/Constants/BaitestConstants";
import {
  Layout, theme, Form, Input, Select, Button,
  DatePicker
} from 'antd';
import Toast from "../Components/LoadingError/Toast";
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";
import { Editor } from '@tinymce/tinymce-react';


const Addnewtuyendung = () => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const { TextArea } = Input;
  const { Header, Content, Footer } = Layout;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [ten_bai_test, setTenbaitest] = useState("");
  const [thoi_luong, setthoiluong] = useState(0);
  const [vi_tri, setVitri] = useState("");
  const [mo_ta, setMota] = useState("");
  const [ngay_chinh_sua_gan_nhat, setNgaychinhsuagannhat] = useState("");
  const [ngay_tao_bai_test, setNgaytaobaitest] = useState("");
  const [so_diem_toi_thieu, setsodiemtoithieu] = useState(0);

  const dispatch = useDispatch();

  const testCreate = useSelector((state) => state.testCreate);
  const { test } = testCreate;
  const [keyword, setKeyword] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (test) {
      toast.success("Bài kiễm tra đã được thêm", ToastObjects);
      dispatch({ type: BAITEST_CREATE_RESET });
      // setMabaitest("");
      setTenbaitest("");
      setMota("");
      setVitri("");
      setNgaychinhsuagannhat("");
      setNgaytaobaitest("");
      setsodiemtoithieu(0);
      setthoiluong(0);
    }
  }, [test, dispatch]);

  const submitHandlertest = (e) => {
    e.preventDefault();
    dispatch(createTest(mo_ta, ngay_chinh_sua_gan_nhat, ngay_tao_bai_test, so_diem_toi_thieu, ten_bai_test, thoi_luong, vi_tri));
  };

  return (
    <>
      <Toast />
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
              ><form onSubmit={submitHandlertest}>
                  <Form.Item label="Tên bài kiểm tra">
                    <Input placeholder="Tìm kiếm" onChange={(e) => setTenbaitest(e.target.value)} style={{ width: 300, }} />
                  </Form.Item>
                  <Form.Item >
                    <Button> Lưu</Button>
                  </Form.Item>
                </form>

              </Content>
            </div>
            <div className="column middle">
              <div className="row1">Bài Kiểm tra đầu tiên</div>
              <div className="row2">Ngày tạo: 22/4/2023</div>
              <Button><Link to="/themmoi"> Tạo bài test</Link></Button>
            </div>
            <div className="column middle">
              <div className="row1">Câu hỏi đầu tiên</div>
              
              <Form.Item label="TextArea">
                <TextArea rows={4} />
              </Form.Item>

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

export default Addnewtuyendung;
