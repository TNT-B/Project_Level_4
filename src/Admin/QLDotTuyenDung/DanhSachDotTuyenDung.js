import { Button, Checkbox, Col, Form, Input, Popconfirm, Row, Space, message, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import { apiConstants } from '../../Const/api';
import { formatDate } from '../../Const/functions';
import moment from 'moment';
import { useNavigate } from 'react-router';
import './dotTuyenDung.css';

const DanhSachDotTuyenDung = () => {
  const [danhSachDotTuyenDung, setDanhSachDotTuyenDung] = useState([]);
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
      url: `${apiConstants.DANH_SACH_DOT_TUYEN_DUNG}?term=${searchTerm}`,
      data: null,
    })
    console.log(`${apiConstants.DANH_SACH_DOT_TUYEN_DUNG}?term=${searchTerm}`);
    let danhsach = await res.data.data.danhsach
    console.log(danhsach);
    danhsach.map(e => e.ngay_bat_dau = formatDate(e.ngay_bat_dau))
    danhsach.map(e => e.ngay_ket_thuc = formatDate(e.ngay_ket_thuc))
    await setDanhSachDotTuyenDung(danhsach);
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
      title: 'Tên đợt tuyển dụng',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'ngay_bat_dau',
      key: 'ngay_bat_dau',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.ngay_bat_dau).unix() - moment(b.ngay_bat_dau).unix()
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'ngay_ket_thuc',
      key: 'ngay_ket_thuc',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.ngay_ket_thuc).unix() - moment(b.ngay_ket_thuc).unix()
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta_khac',
      key: 'mo_ta_khac'
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      let newSelected = selectedRows.map(e => { return e._id })
      setSelected(newSelected)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };


  useEffect(() => {
    getDanhSach(searchTerm)
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 1000,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: "25px", color: "#191970", marginBottom:"40px", marginTop:"10px"}}>DANH SÁCH ĐỢT TUYỂN DỤNG</h1>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item
            name="searchTerm"
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
          >
            <Input placeholder="Từ khóa tìm kiếm"/>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Col>
        <Col span={4} style={{ display: "flex" }}>
          {/* <Space> */}
            <Button  type="primary"  onClick={() => navigate("create")}>+ Thêm mới</Button>
            {/* <Popconfirm
              title="Bạn muốn xóa đợt tuyển dụng này?"
              okText="Yes"
              cancelText="No"
              onConfirm={confirm}
              onCancel={cancel}
            >
              <Button>Xóa</Button>
            </Popconfirm> */}
          {/* </Space> */}
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={danhSachDotTuyenDung}
            rowKey={(record) => record._id}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default DanhSachDotTuyenDung;
