import { Button, Col, Row, Table, Tabs, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiConstants } from "../../Const/api";
import axios from "axios";
import { formatDate } from "../../Const/functions";
import './dotTuyenDung.css'

const ChiTietDotTuyenDung = () => {
    const params = useParams()
    const [chiTietDotTuyenDung, setChiTietDotTuyenDung] = useState({})
    const [danhSachUngVien, setDanhSachUngVien] = useState([])
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Tên vị trí',
            dataIndex: 'ten_vi_tri',
            key: 'ten_vi_tri',
        },
        {
            title: 'Số lượng',
            dataIndex: 'so_luong',
            key: 'so_luong',
        }
    ];
    const columnsUngVien = [
        {
            title: 'Họ và tên',
            dataIndex: ['ung_vien', 'ho_va_ten'],
            key: ['ung_vien', 'ho_va_ten'],
        },
        {
            title: 'Trạng thái',
            dataIndex: ['ung_vien', 'trang_thai'],
            key: ['ung_vien', 'trang_thai'],
        },
        {
            title: 'SĐT',
            dataIndex: ['ung_vien', 'sdt'],
            key: ['ung_vien', 'sdt'],
        },
        {
            title: 'CV',
            dataIndex: ['ung_vien', 'cv'],
            key: ['ung_vien', 'cv'],
            render: (_, record) => {
                console.log(record);
                const fileList = [
                    {
                      uid: '-1',
                      name: record.ung_vien.cv?"Download":"None",
                      status: 'done',
                      url: record.ung_vien.cv,
                    },
                  ]                
                    return (<Upload fileList={fileList}>
                        {/* <Button icon={<UploadOutlined />}></Button> */}
                    </Upload>)
                }
            ,
        },
        {
            title: 'Kết quả test đầu vào',
            dataIndex: ['ung_vien', 'diem_lam_test_dau_vao'],
            key: ['ung_vien', 'diem_lam_test_dau_vao'],
        },
        {
            title: 'Thời gian phỏng vấn',
            dataIndex: ['ung_vien', 'thoi_gian_pv'],
            key: ['ung_vien', 'thoi_gian_pv'],
        },
        {
            title: 'Hình thức phỏng vấn',
            dataIndex: ['ung_vien', 'hinh_thuc_pv'],
            key: ['ung_vien', 'hinh_thuc_pv'],
        },
        {
            title: 'Kết quả phỏng vấn',
            dataIndex: ['ung_vien', 'ket_qua_pv'],
            key: ['ung_vien', 'ket_qua_pv'],
        }
    ];
    const dotTuyenDungComponent = (
        <>
            <Row>
                <Col span={12}>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Tên đợt tuyển dụng:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ten}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày bắt đầu:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_bat_dau}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày kết thúc:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_ket_thuc}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Mô tả:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.mo_ta_khac}</Col>
                    </Row>
                    <Row style={{ margin: "30px 0px" }}>
                        <Button onClick={()=> navigate(`/admin/dottuyendung/edit/${params.idDotTuyenDung}`)}>Chỉnh sửa đợt tuyển dụng</Button>
                    </Row>
                </Col>
                <Col span={8}>
                    <Table columns={columns} dataSource={chiTietDotTuyenDung.vi_tri} />
                </Col>
            </Row>
        </>
    )
    const ungVienComponent = (
        <>
            <Row>
                <Col span={12}>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Tên đợt tuyển dụng:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ten}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày bắt đầu:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_bat_dau}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày kết thúc:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_ket_thuc}</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Table columns={columnsUngVien} dataSource={danhSachUngVien} style={{marginTop:"30px"}}/>
            </Row>
        </>
    )
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `Thông tin đợt tuyển dụng`,
            children: dotTuyenDungComponent,
        },
        {
            key: '2',
            label: `Danh sách ứng viên`,
            children: ungVienComponent,
        }
    ];

    const getDanhSach = async (idDotTuyenDung) => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.CHI_TIET_DOT_TUYEN_DUNG}/${idDotTuyenDung}`,
            data: null,
        })
        let danhsach = await res.data.data.danhsach
        danhsach.map(e => e.ngay_bat_dau = formatDate(e.ngay_bat_dau))
        danhsach.map(e => e.ngay_ket_thuc = formatDate(e.ngay_ket_thuc))
        console.log("call danh sách");
        await setChiTietDotTuyenDung(danhsach[0]);
    }

    const getUngVien = async (idDotTuyenDung) => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.DANH_SACH_UNG_VIEN}?term=&iddottuyendung=${idDotTuyenDung}`,
            data: null,
        })
        console.log(res);
        let danhsach = await res.data.data.danhsach
        console.log("call ứng viên");
        await setDanhSachUngVien(danhsach);
    }

    useEffect(() => {
        getDanhSach(params.idDotTuyenDung)
        getUngVien(params.idDotTuyenDung)
    }, [])
    return (
        <>
            <Row>
                <h1>Chi tiết đợt tuyển dụng</h1>
            </Row>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    )
}

export default ChiTietDotTuyenDung;