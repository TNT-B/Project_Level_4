import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Table, Typography, Upload, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiConstants } from '../../Const/api';
import './dotTuyenDung.css'
import { Option } from 'antd/es/mentions';
import dayjs from 'dayjs';
const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const renderInputType = (inputType, record) => {
        let timeLamTest = false
        let timePv = false
        let hinhThucPv = false
        let ketQuaPv = false
        let ngayNhanViec = true

        if (!record?.ung_vien.diem_lam_test_dau_vao && record?.ung_vien.diem_lam_test_dau_vao != 0) {
            timePv = true
            hinhThucPv = true
            ketQuaPv = true
        }

        if ((record?.ung_vien.diem_lam_test_dau_vao || record?.ung_vien.diem_lam_test_dau_vao == 0) && record?.ung_vien.trang_thai == "Đang ứng tuyển" && !record?.ung_vien.hinh_thuc_pv) {
            timeLamTest = true
            timePv = false
            hinhThucPv = false
            ketQuaPv = true
        }

        if ((record?.ung_vien.diem_lam_test_dau_vao || record?.ung_vien.diem_lam_test_dau_vao == 0) && record?.ung_vien.trang_thai == "Đã lưu lại hồ sơ") {
            timeLamTest = true
            timePv = true
            hinhThucPv = true
            ketQuaPv = false
        }

        if ((record?.ung_vien.diem_lam_test_dau_vao || record?.ung_vien.diem_lam_test_dau_vao == 0) && record?.ung_vien.trang_thai == "Đang ứng tuyển" && record?.ung_vien.hinh_thuc_pv) {
            timeLamTest = true
            timePv = false
            hinhThucPv = false
            ketQuaPv = false
        }

        if(record?.ung_vien.ket_qua_pv == "Đậu"){
            ngayNhanViec = false
        }

        switch (inputType) {
            case 'time_lam_test':
                return (<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} disabled={timeLamTest} />)
            case 'time_pv':
                return (<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} disabled={timePv} />)
            case 'ngay_nhan_viec':
                return (<DatePicker disabled={ngayNhanViec} />)
            case 'hinh_thuc_option':
                return (
                    <Select
                        defaultValue=''
                        disabled={hinhThucPv}
                        options={[
                            { value: 'Online', label: 'Online' },
                            { value: 'Offline', label: 'Offline' },
                        ]}
                    />
                )
            case 'ket_qua_option':
                return (
                    <Select
                        defaultValue=''
                        disabled={ketQuaPv}
                        options={[
                            { value: 'Đậu', label: 'Đậu' },
                            { value: 'Rớt', label: 'Rớt' },
                        ]}
                    />
                )
        }
    }

    const inputNode = renderInputType(inputType, record)
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const YeuCauUngTuyen = ({ idDotTuyenDung }) => {
    const [danhSachUngVien, setDanhSachUngVien] = useState([])
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.ung_vien.id_yeu_cau_ung_tuyen === editingKey;
    const edit = (record) => {
        let temp = record
        if (temp.ung_vien.thoi_gian_lam_test) {
            temp.ung_vien.thoi_gian_lam_test = dayjs(temp.ung_vien.thoi_gian_lam_test)
        }

        if (temp.ung_vien.thoi_gian_pv) {
            temp.ung_vien.thoi_gian_pv = dayjs(temp.ung_vien.thoi_gian_pv)
        }

        console.log(record);

        form.setFieldsValue({
            ...temp,
        });

        setEditingKey(record.ung_vien.id_yeu_cau_ung_tuyen);
    };
    const cancel = (record) => {
        let temp = record
        if (temp.ung_vien.thoi_gian_lam_test) {
            temp.ung_vien.thoi_gian_lam_test = dayjs(temp.ung_vien.thoi_gian_lam_test).format("YYYY-MM-DD HH:mm:ss")
        }

        if (temp.ung_vien.thoi_gian_pv) {
            temp.ung_vien.thoi_gian_pv = dayjs(temp.ung_vien.thoi_gian_pv).format("YYYY-MM-DD HH:mm:ss")
        }
        form.setFieldsValue({
            ...temp,
        });
        setEditingKey('');
    };
    const save = async (key, record) => {
        try {
            console.log(record);
            const row = await form.validateFields();
            row.ung_vien._id = record?.ung_vien.id_yeu_cau_ung_tuyen

            // if(row.ung_vien.thoi_gian_lam_test){
            //     row.ung_vien.thoi_gian_lam_test = dayjs(row.ung_vien.thoi_gian_lam_test).format('YYYY-MM-DDHH:mm:ss') 
            // }

            console.log(row.ung_vien);
            const res = await axios({
                method: "PUT",
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
                url: `${apiConstants.CAP_NHAT_YEU_CAU_UNG_TUYEN}`,
                data: row.ung_vien,
            })

            console.log(res);
            if (res.data.status == "true") {
                getUngVien(idDotTuyenDung)
            }
            setEditingKey('');
            // const newData = [...data];
            // const index = newData.findIndex((item) => key === item.key);
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...row,
            //     });
            //     setData(newData);
            //     setEditingKey('');
            // } else {
            //     newData.push(row);
            //     setData(newData);
            //     setEditingKey('');
            // }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: ['ung_vien', 'ho_va_ten'],
        },
        {
            title: 'Trạng thái',
            dataIndex: ['ung_vien', 'trang_thai'],
        },
        {
            title: 'SĐT',
            dataIndex: ['ung_vien', 'sdt'],
        },
        {
            title: 'CV',
            dataIndex: ['ung_vien', 'cv'],
            key: ['ung_vien', 'cv'],
            render: (_, record) => {
                // const fileList = [
                //     {
                //         uid: '-1',
                //         name: record.ung_vien.cv ? "Download" : "None",
                //         status: 'done',
                //         url: record.ung_vien.cv,
                //     },
                // ]

                const handleClick = () => {
                    window.open(record.ung_vien.cv)
                }

                return (
                    <>
                        {(record.ung_vien.cv) ? (<a onClick={handleClick}>Xem CV</a>) : <div>None</div>}
                    </>

                    // <Upload fileList={fileList}>
                    //     <Button icon={<UploadOutlined />}></Button>
                    // </Upload>
                )
            }
            ,
        },
        {
            title: 'Thời gian test',
            dataIndex: ['ung_vien', 'thoi_gian_lam_test'],
            editable: true,
        },
        {
            title: 'Kết quả test',
            dataIndex: ['ung_vien', 'diem_lam_test_dau_vao'],
        },
        {
            title: 'Thời gian PV',
            dataIndex: ['ung_vien', 'thoi_gian_pv'],
            editable: true,
        },
        {
            title: 'Hình thức PV',
            dataIndex: ['ung_vien', 'hinh_thuc_pv'],
            editable: true,
        },
        {
            title: 'Kết quả PV',
            dataIndex: ['ung_vien', 'ket_qua_pv'],
            editable: true,
        },
        {
            title: 'Ngày nhận việc',
            dataIndex: ['ung_vien', 'ngay_nhan_viec'],
            editable: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'thao_tac',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key, record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={() => cancel(record)}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: checkInputType(col.dataIndex),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const checkInputType = (dataIndex) => {
        switch (dataIndex.toString()) {
            case 'ung_vien,thoi_gian_lam_test':
                return 'time_lam_test'
            case 'ung_vien,thoi_gian_pv':
                return 'time_pv'
            case 'ung_vien,thoi_gian_pv':
                return 'time'
            case 'ung_vien,hinh_thuc_pv':
                return 'hinh_thuc_option'
            case 'ung_vien,ket_qua_pv':
                return 'ket_qua_option'
            case 'ung_vien,ngay_nhan_viec':
                return 'ngay_nhan_viec'
            default:
                return 'text'
        }
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
        let danhsach = await res.data.data.danhsach
        console.log(danhsach);
        danhsach.map(e => {
            if (e.ung_vien.thoi_gian_lam_test) {
                e.ung_vien.thoi_gian_lam_test = dayjs(e.ung_vien.thoi_gian_lam_test).format("YYYY-MM-DD HH:mm:ss")
            }

            if (e.ung_vien.thoi_gian_pv) {
                e.ung_vien.thoi_gian_pv = dayjs(e.ung_vien.thoi_gian_pv).format("YYYY-MM-DD HH:mm:ss")
            }
        })
        // danhsach.map(e => e.ung_vien.thoi_gian_pv = dayjs(e.ung_vien.thoi_gian_pv).format('YYYY-MM-DD HH:mm:ss') )
        console.log(danhsach);
        await setDanhSachUngVien(danhsach);
    }

    useEffect(() => {
        getUngVien(idDotTuyenDung)
    }, [])

    return (
        <Form form={form} component={false} >
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={danhSachUngVien}
                className='table-yeu-cau-ung-tuyen'
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default YeuCauUngTuyen;