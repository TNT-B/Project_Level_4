import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, message } from 'antd';
import { apiConstants } from '../../Const/api';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import { formatDate } from '../../Const/functions';
import dayjs from 'dayjs';

const CapNhatDotTuyenDung = () => {
    const [viTriList, setViTriList] = useState([])
    const [chiTietDotTuyenDung, setChiTietDotTuyenDung] = useState({})
    const [editDotTuyenDung, setEditDotTuyenDung] = useState(false);
    const params = useParams()
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Xin chọn thời gian!',
            },
        ],
    };
    const onFinish = async (values) => {
        values.ngay_bat_dau = values.ngay_bat_dau.format('YYYY-MM-DD')
        values.ngay_ket_thuc = values.ngay_ket_thuc.format('YYYY-MM-DD')
        console.log('Received values of form:', values);
    };

    const handleClickEdit = () => {
        setEditDotTuyenDung(!editDotTuyenDung)
    }

    const getViTri = async () => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.DANH_SACH_VI_TRI}`,
            data: null,
        })
        let danhsach = await res.data.data.danhsach
        await setViTriList(danhsach);
    };

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
        danhsach.map(e => e.ngay_bat_dau = dayjs(e.ngay_bat_dau))
        danhsach.map(e => e.ngay_ket_thuc = dayjs(e.ngay_ket_thuc))
        console.log(danhsach[0]);
        await setChiTietDotTuyenDung(danhsach[0]);
        await form.setFieldsValue(danhsach[0])
    }

    useEffect(() => {
        getViTri()
        getDanhSach(params.idDotTuyenDung)
    }, [])

    return (
        <>
            {/* <Row>
                <Col span={24}>
                    <h1>Chỉnh sửa đợt tuyển dụng</h1>
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        form={form}
                        style={{
                            width: "100%"
                            // maxWidth: 600,
                        }}
                        autoComplete="off"
                        initialValues={chiTietDotTuyenDung}
                        layout="vertical"

                    >
                        <Form.Item name="ten" label="Tên đợt tuyển dụng" rules={[{ required: true, message: "Thiếu tên đợt tuyển dụng" }]}>
                            <Input disabled={!editDotTuyenDung} />
                        </Form.Item>
                        <Row>
                            <Col span={11}>
                                <Form.Item name="ngay_bat_dau" label="Ngày bắt đầu" rules={[{ required: true }]} {...config}>
                                    <DatePicker style={{ width: "100%" }} disabled={!editDotTuyenDung} />
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <Form.Item name="ngay_ket_thuc" label="Ngày kết thúc" rules={[{ required: true }]} {...config}>
                                    <DatePicker style={{ width: "100%" }} disabled={!editDotTuyenDung} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="mo_ta_khac" label="Mô tả" >
                            <TextArea disabled={!editDotTuyenDung} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleClickEdit}>
                                {editDotTuyenDung ? "Cập nhật" : "Chỉnh sửa"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>

                <Col span={12} offset={2}>
                    <Form
                        form={form}
                        name="dynamic_form_item"
                        onFinish={onFinish}
                        initialValues={data}
                    >
                        <Form.Item name={["userlistName"]} label={"User List Name"}>
                            <Input placeholder="Please enter a name" style={{ width: "30%" }} />
                        </Form.Item>
                        <Form.List name="users">
                            {(users, { add, remove }) => (
                                // <EditableUsersTable
                                //     form={form}
                                //     users={users}
                                //     add={add}
                                //     remove={remove}
                                // />
                                <Table
                                    dataSource={users}
                                    pagination={false}
                                    footer={() => (
                                        <Button onClick={addUser}>
                                            <PlusOutlined /> Add User
                                        </Button>
                                    )}
                                >
                                    <Column
                                        dataIndex={"age"}
                                        title={"Age"}
                                        width={125}
                                        render={(value, row, index) => {
                                            return (
                                                <EditableFormItem
                                                    name={[index, "age"]}
                                                    editing={index === editingIndex}
                                                    className={"ant-form-item-no-bottom-margin"}
                                                >
                                                    <InputNumber placeholder="age" min={0} max={150} />
                                                </EditableFormItem>
                                            );
                                        }}
                                    />
                                    <Column
                                        dataIndex={"name"}
                                        title={"Name"}
                                        width={200}
                                        render={(value, row, index) => {
                                            return (
                                                <EditableFormItem
                                                    rules={[{ required: true, message: "Name is required" }]}
                                                    name={[index, "name"]}
                                                    editing={index === editingIndex}
                                                    className={"ant-form-item-no-bottom-margin"}
                                                >
                                                    <Input placeholder="name" />
                                                </EditableFormItem>
                                            );
                                        }}
                                    />
                                    <Column
                                        title={"Action"}
                                        render={(value, row, index) => {
                                            if (index === editingIndex) {
                                                return (
                                                    <React.Fragment>
                                                        <Button
                                                            icon={<SaveOutlined />}
                                                            shape={"circle"}
                                                            type={"primary"}
                                                            style={{ marginRight: 8 }}
                                                            onClick={onSave}
                                                        />
                                                        <Button
                                                            icon={<CloseOutlined />}
                                                            shape={"circle"}
                                                            onClick={() => onCancel(index)}
                                                        />
                                                    </React.Fragment>
                                                );
                                            } else {
                                                return (
                                                    <React.Fragment>
                                                        <Button
                                                            icon={<EditOutlined />}
                                                            shape={"circle"}
                                                            style={{ marginRight: 8 }}
                                                            disabled={editingIndex !== undefined}
                                                            onClick={() => setEditingIndex(index)}
                                                        />
                                                        <Popconfirm
                                                            title="Are you sure？"
                                                            okText="Yes"
                                                            cancelText="No"
                                                            onConfirm={() => remove(index)}
                                                        >
                                                            <Button
                                                                icon={<MinusOutlined />}
                                                                shape={"circle"}
                                                                type={"danger"}
                                                                disabled={editingIndex !== undefined}
                                                            />
                                                        </Popconfirm>
                                                    </React.Fragment>
                                                );
                                            }
                                        }}
                                    />
                                </Table>
                            )}
                        </Form.List>
                        <br />
                        <Row>
                            <Form.Item>
                                <Button type="default" onClick={onReset} icon={<ReloadOutlined />}>
                                    Reset
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    style={{ marginLeft: 8 }}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
            </Row> */}
        </>
    )
}

export default CapNhatDotTuyenDung;