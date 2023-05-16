import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'antd/dist/reset.css';
import {
  Layout, theme, Select, Button,
  DatePicker,
  Form,
  Input,
  Typography, Table, Space, Row
} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";

const { Title } = Typography;
const vitri = [
  {
    dataIndex: '_id',
  },
  {
    dataIndex: 'ma_vi_tri',
  },
  {
    dataIndex: 'mo_ta',
  },
  {
    dataIndex: 'ten_vi_tri',
  },
];
const columns = [
  {
    title: 'Mã bài test',
    dataIndex: 'ma_bai_test',
  },
  {
    title: 'Tên bài test',
    dataIndex: 'ten_bai_test',
    sorter: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'mo_ta',
  },
  {
    title: 'Ngày chỉnh sữa gần nhất',
    dataIndex: 'ngay_chinh_sua_gan_nhat',
    render: (value) => moment(value).format("DD/MM/yyyy")
  },
  {
    title: 'Ngày tạo bài test',
    dataIndex: 'ngay_tao_bai_test',
    render: (value) => moment(value).format("DD/MM/yyyy")
  },
  {
    title: 'Thời lượng',
    dataIndex: 'thoi_luong',
  },
  {
    title: 'Số điểm tối thiểu',
    dataIndex: 'so_diem_toi_thieu',
  },
  {
    title: 'Vị trí',
    dataIndex: 'vi_tri',
  },
  {
    title: "Thao tác",
    render: () => (
      <Space size="middle">
        {/* <a>Invite {record.lastName}</a> */}
        <a>Xóa</a>
        <Link to="/chitietbaitest">Chi tiết</Link>
      </Space>
    )
  },
];
const Tabletestlist = () => {
  const [danhsachvitri, setDanhSachViTri] = useState([]);
  const [data, setData] = useState();
  const [idViTri, setIdViTri] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const getDanhSachViTri = async () => {
    const resp = await axios.get('https://quan-ly-tuyen-dung-be.onrender.com/vitri')
    setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({ 
      value: vitri._id, 
      label: vitri.ten_vi_tri })))
  }
  useEffect(() => {
    getDanhSachViTri()
  }, [])
  const getData = async (keyword, idViTri) => {
    keyword = keyword || ""
    idViTri = idViTri || ""
    axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/baitest?term=${keyword}&vitri=${idViTri}`).then(res => {

      setLoading(false)
      let newData = res.data.data.danhsach.map(row => {
        return {
          ma_bai_test: row.ma_bai_test,
          ten_bai_test: row.ten_bai_test,
          mo_ta: row.mo_ta,
          ngay_chinh_sua_gan_nhat: row.ngay_chinh_sua_gan_nhat,
          ngay_tao_bai_test: row.ngay_tao_bai_test,
          thoi_luong: row.thoi_luong,
          so_diem_toi_thieu: row.so_diem_toi_thieu,
          vi_tri: row.vi_tri.map(item => <span style={{ border: '1px solid black', margin: '5px', padding: '8px' }}>{item.ten_vi_tri}</span>)
        }
      })
      setData(newData);
    })
  }
  useEffect(() => {
    getData(keyword, idViTri);
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menutop />
        </Header>
        <Content className="testlist-CTT"
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
          </div>
        </Content>
        <Content className="testlist-CTE"
          style={{
            padding: '0 5px',
          }}
        >
          <Form.Item className="form-input" label="Tên bài kiểm tra" >
            <Input placeholder="Tìm kiếm" onChange={(e) => setKeyword(e.target.value)} style={{ width: 300, }} />
          </Form.Item>

          <Form.Item className="form-select" label="Vị trí tuyển dụng">
            <Select placeholder="Nhập vị trí"  options={danhsachvitri} style={{ width: 300, }} />
          </Form.Item>
          <Form.Item className="form-button" >
            <Button onClick={(e) => getData(keyword, idViTri)} >Tìm Kiếm</Button>
          </Form.Item>
        </Content>
        <Content className="testlist-CTB"
          style={{
            padding: '0 5px',
          }}>

          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}>
            <div className="tiltle-table">
              <Title className="tiltle-table-item" level={2}>Danh sách bài kiểm tra</Title>
              <Button className="button-to-newtest"><Link to={'/themmoibaitest'}>Tạo mới</Link></Button>
            </div>
            <Table
              columns={columns}
              // rowKey={(record) => record.login.uuid}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
            />
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
export default Tabletestlist;


