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

const { RangePicker } = DatePicker;
const { Title } = Typography;
const columns = [
    {
        title: 'Tên đợt tuyển dụng',
        dataIndex: 'ten',
        sorter: true,
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'ngay_bat_dau',
        render: (value) => moment(value).format("DD/MM/yyyy")
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'ngay_ket_thuc',
        render: (value) => moment(value).format("DD/MM/yyyy")
    },
    {
        title: 'Ngày chỉnh sửa gần nhất',
        dataIndex: 'ngay_chinh_sua_gan_nhat',
        render: (value) => moment(value).format("DD/MM/yyyy")
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta_khac',
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
const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const Tabletuyendung = () => {
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

    useEffect(() => {
        getData(keyword);
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
    const getData = async (keyword) => {
        keyword = keyword || ""
        axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/dottuyendung?term=${keyword}`).then(res => {

            setLoading(false)
            let newData = res.data.data.danhsach.map(row => { return { ten: row.ten, ngay_bat_dau: row.ngay_bat_dau, mo_ta_khac: row.mo_ta_khac, ngay_ket_thuc: row.ngay_ket_thuc, ngay_chinh_sua_gan_nhat: row.gay_chinh_sua_gan_nhat } })
            setData(newData);

        })
    }
    const { Header, Content, Footer } = Layout;

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
                    }}>
                    <Form.Item className="form-input" label="Chọn Ngày">
                        <RangePicker
                            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                            style={{ width: 500 }}
                            format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item className="form-button" >
                        <Button onClick={(e) => getData(keyword)} >Tìm Kiếm</Button>
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
                            <Title className="tiltle-table-item" level={2}>Danh sách đợt tuyển dụng</Title>
                            <Button className="button-to-newtest"><Link to={'/themmoituyendung'}>Tạo mới</Link></Button>
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
export default Tabletuyendung;


