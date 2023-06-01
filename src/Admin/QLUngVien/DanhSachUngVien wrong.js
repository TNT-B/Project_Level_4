import { Button, Checkbox, Col, Form, Input, Popconfirm, Row, Space, message, Table, Tag, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import { apiConstants } from '../../Const/api';
import { formatDate } from '../../Const/functions';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import './dotTuyenDung.css';
import { Link } from 'react-router-dom';

const DanhSachUngVien = () => {
  const [danhSachUngVien, setDanhSachUngVien] = useState([]);
  // const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()
  const getDanhSach = async (searchTerm) => {
    // let token = sessionStorage.getItem("token");
    const res = await axios({
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
      url: `${apiConstants.DANH_SACH_THONG_TIN_UNG_VIEN}?term=${searchTerm}`,
      data: null,
    })

    console.log(res);

    if (res.data.status == "false") {
      message.error("Không tìm thấy danh sách ứng viên tương ứng")
      setDanhSachUngVien([])
      return
    }
    let danhsach = await res.data.data.danhsach
    danhsach.map(e => e.ngay_bat_dau = formatDate(e.ngay_bat_dau))
    danhsach.map(e => e.ngay_ket_thuc = formatDate(e.ngay_ket_thuc))
    await setDanhSachUngVien(danhsach);
  };

  const onFinish = (values) => {
    console.log(values.searchTerm);
    getDanhSach(values.searchTerm)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const confirm = async (e) => {
    console.log(e);
    var result = await axios({
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
      url: `${apiConstants.DANH_SACH_DOT_TUYEN_DUNG}`,
      data: {
        idList: selected
      },
    });

    await getDanhSach(searchTerm)
    // message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const columns = [
    {
      title: 'Họ và Tên',
      dataIndex: 'ho_va_ten',
      key: 'ho_va_ten',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioi_tinh',
      key: 'gioi_tinh'
    },
    {
      title: 'Năm sinh',
      dataIndex: 'nam_sinh',
      key: 'nam_sinh'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai'
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      key: 'cv',
      render: (_, record) => {
        const handleClick = () => {
          window.open(record.cv)
        }
        return (
          <>
            {(record.cv) ? (<a onClick={handleClick}>Xem CV</a>) : <div>None</div>}
          </>
        )
      }
      ,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`chitiet/${record._id}`)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getDanhSach(searchTerm)
  }, [])

  return (
    <>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item><Link to={'/admin'} >Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Danh sách đợt tuyển dụng</Link></Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col span={24}>
          <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>DANH SÁCH ĐỢT TUYỂN DỤNG</h1>
        </Col>
      </Row>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}

        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={10}>
            <Form.Item
              name="searchTerm"
              style={{ width: "100% !important" }}
              wrapperCol={{
                sm: 23
              }}
            >
              <Input placeholder="Từ khóa tìm kiếm" style={{ width: "100% !important" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
            >
              <Button type="primary" htmlType="submit" >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Space> */}
            <Button type="primary" onClick={() => navigate("create")}>+ Thêm mới</Button>
          </Col>
        </Row>
      </Form>
      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={danhSachUngVien}
            rowKey={(record) => record._id}
          />
        </Col>
      </Row>
    </>
  );
};
export default DanhSachUngVien;
